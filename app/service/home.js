/*
 * @Descripttion: aa
 * @version: 1.1.1
 * @Author: 张三
 * @Date: 2021-07-10 11:56:48
 * @LastEditors: WangPeng
 * @LastEditTime: 2021-12-28 17:56:33
 */
'use strict';

const Service = require('egg').Service;

class HomeService extends Service {
  async getPlayText() {
    // 获取文本数据
    const homeData = await this.app.mysql.select('homedata');

    return homeData;
  }

  async getMainData(obj) {
    // 获取博客作者信息
    const author = await this.app.mysql.get('author');
    // 获取文章类别
    const classes = await this.app.mysql.select('categories');

    // 获取类别以及其对应的文章
    const Categories = await Promise.all(classes.map(async item => {
      return (async () => {
        const essays = await this.app.mysql.select('essay', { where: { class: item.id } });
        return {
          classId: item.id,
          typename: item.typename,
          essays,
        };
      })();
    }));

    const list = Categories.map(item => (item.essays.map(item1 => ({ ...item1, className: item.typename }))));

    const authorObj = {
      ...author,
      document: [].concat.apply([], list).length,
      classes: Categories.length,
    };

    const essayList = [].concat.apply([], list);
    const essayListCount = essayList.length;

    const start = (obj.pageSize - 1) * obj.pageNum;
    const end = obj.pageSize * obj.pageNum;
    const lists = essayList.slice(start, end);

    return {
      authorObj,
      essayListCount,
      lists,
    };
  }

  async getEssays(obj) {
    // 获取文章类别
    const classes = await this.app.mysql.select('categories');

    // 获取类别以及其对应的文章
    const Categories = await Promise.all(classes.map(async item => {
      return (async () => {
        const essays = await this.app.mysql.select('essay', { where: { class: item.id } });
        return {
          classId: item.id,
          typename: item.typename,
          essays,
        };
      })();
    }));

    const list = Categories.map(item => (item.essays.map(item1 => ({ ...item1, className: item.typename }))));

    const essayList = [].concat.apply([], list);
    const essayListCount = essayList.length;

    const start = (obj.pageSize - 1) * obj.pageNum;
    const end = obj.pageSize * obj.pageNum;
    const lists = essayList.slice(start, end);

    return {
      essayListCount,
      lists,
    };
  }

  async getFooterData() {
    // 获取底部摘抄列表
    const excerpt = await this.app.mysql.select('excerpt');
    // 获取底部导航列表
    const footerRouter = await this.app.mysql.select('footerRouter');

    return {
      excerpt,
      footerRouter,
    };
  }
}

module.exports = HomeService;

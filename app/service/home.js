/*
 * @Descripttion: aa
 * @version: 1.1.1
 * @Author: 张三
 * @Date: 2021-07-10 11:56:48
 * @LastEditors: WangPeng
 * @LastEditTime: 2022-08-11 17:55:23
 */
'use strict';

const Service = require('egg').Service;

class HomeService extends Service {
  // 获取轮播的热点博文
  async _getSwiperBowenList() {
    const bowenList = await this.app.mysql.select('Bowen', {
      where: {
        selected: 1,
        isDelete: 0,
        type: 1,
      },
      columns: [
        'id',
        'time_str',
        'last_edit_time',
        'img',
        'author',
        'title',
        'desc',
      ],
      limit: 10,
      offset: 0,
    });

    return bowenList;
  }
  // 获取底部数据
  async _getFooterData() {
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

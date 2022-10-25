/*
 * @Descripttion: aa
 * @version: 1.1.1
 * @Author: 张三
 * @Date: 2021-07-10 11:56:48
 * @LastEditors: WangPeng
 * @LastEditTime: 2022-10-25 16:37:29
 */
'use strict';

const Service = require('egg').Service;

class HomeService extends Service {
  // 获取轮播的热点博文
  async _getSwiperBowenList() {
    const sql =
      'select a.*,json_object("id",b.uid,"name",b.name) as userInfo from Bowen a left join admin b on a.author_id = b.uid where a.type in (?) and a.selected=? and a.isDelete in (?)';

    const content = [ 1, 1, 0 ];
    const bowenList = await this.app.mysql.query(sql, content);

    return bowenList.map(v => ({ ...v, userInfo: JSON.parse(v.userInfo) }));
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

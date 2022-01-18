/*
 * @Descripttion:
 * @version: 1.1.1
 * @Author: 张三
 * @Date: 2021-07-09 15:47:47
 * @LastEditors: WangPeng
 * @LastEditTime: 2022-01-18 17:47:17
 */
'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  // 获取轮播的热点博文列表
  async getSwiperBowenList() {
    const { ctx } = this;

    try {
      const homeFooter = await ctx.service.home._getSwiperBowenList();

      ctx.body = {
        code: 200,
        msg: '轮播的热点博文列表获取成功',
        data: homeFooter,
      };
    } catch (e) {
      ctx.body = {
        code: 305,
        msg: '轮播的热点博文列表获取失败',
        data: e,
      };
    }
  }

  // 返回home页底部数据
  async getFooter() {
    const { ctx } = this;

    try {
      const homeFooter = await ctx.service.home._getFooterData();

      ctx.body = {
        code: 200,
        msg: 'home页底部数据获取成功',
        data: homeFooter,
      };
    } catch (e) {
      ctx.body = {
        code: 305,
        msg: 'home页底部数据获取失败',
        data: e,
      };
    }
  }
}

module.exports = HomeController;

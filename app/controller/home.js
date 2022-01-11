/*
 * @Descripttion:
 * @version: 1.1.1
 * @Author: 张三
 * @Date: 2021-07-09 15:47:47
 * @LastEditors: WangPeng
 * @LastEditTime: 2021-12-28 17:41:14
 */
'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  // 返回home页初始数据  文字信息
  async index() {
    const { ctx } = this;
    try {
      const homeData = await ctx.service.home.getPlayText();

      ctx.body = {
        code: 200,
        msg: '主页文字数据获取成功',
        data: homeData,
      };
    } catch (e) {
      ctx.body = {
        code: 305,
        msg: '主页文字数据获取失败',
        data: e,
      };
    }
  }

  // 返回home页列表数据和作者信息
  async getMain() {
    const { ctx } = this;

    const { pageSize = 1, pageNum = 10 } = ctx.request.query;

    try {
      const homeMain = await ctx.service.home.getMainData({ pageSize, pageNum });

      ctx.body = {
        code: 200,
        msg: '作者信息数据获取成功',
        data: homeMain,
      };
    } catch (e) {
      ctx.body = {
        code: 305,
        msg: '作者信息数据获取失败',
        data: e,
      };
    }
  }
  async getMainList() {
    const { ctx } = this;

    const { pageSize = 1, pageNum = 10 } = ctx.request.query;

    try {
      const homeMainEssay = await ctx.service.home.getEssays({ pageSize, pageNum });

      ctx.body = {
        code: 200,
        msg: '列表数据获取成功',
        data: homeMainEssay,
      };
    } catch (e) {
      ctx.body = {
        code: 305,
        msg: '列表数据获取失败',
        data: e,
      };
    }
  }
  // 返回home页底部数据
  async getFooter() {
    const { ctx } = this;

    try {
      const homeFooter = await ctx.service.home.getFooterData();

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

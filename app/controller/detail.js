/*
 * @Descripttion:
 * @version: 1.1.1
 * @Author: 王鹏
 * @Date: 2021-08-02 21:58:02
 * @LastEditors: WangPeng
 * @LastEditTime: 2021-09-18 11:00:16
 */
'use strict';

const Controller = require('egg').Controller;

class DetailController extends Controller {
  async getList() {
    const { ctx } = this;

    try {
      const titleList = await ctx.service.detail.getTitleList();

      ctx.body = {
        code: 200,
        msg: '文章列表数据获取成功',
        data: titleList,
      };
    } catch (e) {
      ctx.body = {
        code: 305,
        msg: '文章列表数据获取失败',
        data: e,
      };
    }
  }
  async getListObj() {
    const { ctx } = this;

    const { id } = ctx.request.query;

    try {
      const titleListObj = await ctx.service.detail.getListObj({ id });

      ctx.body = {
        code: 200,
        msg: '当前文章数据获取成功',
        data: titleListObj,
      };
    } catch (e) {
      ctx.body = {
        code: 305,
        msg: '当前文章数据获取失败',
        data: e,
      };
    }
  }
}

module.exports = DetailController;

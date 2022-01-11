/*
 * @Descripttion:
 * @version: 1.1.1
 * @Author: 王鹏
 * @Date: 2021-08-13 10:02:54
 * @LastEditors: WangPeng
 * @LastEditTime: 2021-09-18 11:00:05
 */
'use strict';

const Controller = require('egg').Controller;

class ClassifyController extends Controller {
  async getClassifyList() {
    const { ctx } = this;

    try {
      const classifyList = await ctx.service.classify._getClassifyList();

      ctx.body = {
        code: 200,
        msg: '分类列表数据获取成功',
        data: classifyList,
      };
    } catch (e) {
      ctx.body = {
        code: 305,
        msg: '分类列表数据获取失败',
        data: e,
      };
    }
  }

  async getCurrentList() {
    const { ctx } = this;

    const { id = 1 } = ctx.request.query;

    try {
      const currentList = await ctx.service.classify._getCurrentList({ id });

      ctx.body = {
        code: 200,
        msg: '分类文章列表数据获取成功',
        data: currentList,
      };
    } catch (e) {
      ctx.body = {
        code: 305,
        msg: '分类文章列表数据获取失败',
        data: e,
      };
    }
  }
}

module.exports = ClassifyController;

/*
 * @Descripttion:
 * @version: 1.1.1
 * @Author: 王鹏
 * @Date: 2021-08-13 10:02:54
 * @LastEditors: WangPeng
 * @LastEditTime: 2023-01-25 14:51:22
 */
'use strict';

const Controller = require('egg').Controller;

class ClassifyController extends Controller {
  // 获取博文分类数量
  async getClassifyNum() {
    const { ctx } = this;

    try {
      const data = await ctx.service.classify._getClassifyNum();

      ctx.body = {
        code: 200,
        msg: '文章分类数据获取成功',
        ...data,
      };
    } catch (e) {
      ctx.body = {
        code: 305,
        msg: '文章分类数据获取失败',
        // data: e,
      };
    }
  }
  // 获取博文页数，配合next分页路由
  async getClassifyListPage() {
    const { ctx } = this;

    const { id, page_size = 10 } = ctx.request.query;

    try {
      const data = await ctx.service.classify._getClassifyListPage({ id, page_size });

      ctx.body = {
        code: 200,
        msg: '分页数据获取成功',
        ...data,
      };
    } catch (e) {
      ctx.body = {
        code: 305,
        msg: '分页数据获取失败',
        // data: e,
      };
    }
  }
  // 获取博文列表
  async getClassifyList() {
    const { ctx } = this;

    const { id, page, page_size = 10 } = ctx.request.query;

    try {
      const data = await ctx.service.classify._getClassifyList({ id, page, page_size });

      ctx.body = {
        code: 200,
        msg: '分类列表数据获取成功',
        ...data,
      };
    } catch (e) {
      ctx.body = {
        code: 305,
        msg: '分类列表数据获取失败',
        // data: e,
      };
    }
  }

  // 获取二级类别的博文列表
  async getClassifySubList() {
    const { ctx } = this;

    const { id, page = 1, page_size = 10 } = ctx.request.query;

    if (!id) {
      // eslint-disable-next-line no-return-assign
      return ctx.body = {
        code: 304,
        msg: '缺失二级分类id',
      };
    }

    try {
      const data = await ctx.service.classify._getClassifySubList({ id, page, page_size });

      ctx.body = {
        code: 200,
        msg: '分类列表数据获取成功',
        ...data,
      };
    } catch (e) {
      ctx.body = {
        code: 305,
        msg: '分类列表数据获取失败',
        // data: e,
      };
    }
  }

  // 获取博文详情数据
  async getClassifyDetails() {
    const { ctx } = this;

    const { id } = ctx.request.query;

    if (!id) {
      // eslint-disable-next-line no-return-assign
      return ctx.body = {
        code: 304,
        msg: '缺失详情id',
      };
    }

    try {
      const classifyList = await ctx.service.classify._getClassifyDetails(id);

      ctx.body = {
        code: 200,
        msg: '博文详情数据获取成功',
        data: classifyList,
      };
    } catch (e) {
      ctx.body = {
        code: 305,
        msg: '博文详情数据获取失败',
        // data: e,
      };
    }
  }

  // 获取详情页的上一条和下一条列表
  async getClassifyDetailsFooter() {
    const { ctx } = this;

    const { id } = ctx.request.query;

    if (!id) {
      // eslint-disable-next-line no-return-assign
      return ctx.body = {
        code: 304,
        msg: '缺失详情id',
      };
    }

    try {
      const classifyFooterList = await ctx.service.classify._getClassifyDetailsFooter(id);

      ctx.body = {
        code: 200,
        msg: '博文详情上一条和下一条数据获取成功',
        data: classifyFooterList,
      };
    } catch (e) {
      ctx.body = {
        code: 305,
        msg: '博文详情上一条和下一条数据获取失败',
        // data: e,
      };
    }
  }
}

module.exports = ClassifyController;

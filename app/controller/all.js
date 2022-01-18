/*
 * @Descripttion: 1
 * @version: 1
 * @Author: WangPeng
 * @Date: 2021-12-28 17:59:54
 * @LastEditors: WangPeng
 * @LastEditTime: 2022-01-18 17:43:10
 */
'use strict';

const Controller = require('egg').Controller;

class AllController extends Controller {
  // 获取权限列表
  async getAuthority() {
    const { ctx } = this;

    const { userId = null } = ctx.query;

    try {
      const authorityList = await ctx.service.all._getAuthority(userId);

      ctx.body = {
        code: 200,
        msg: '权限列表数据获取成功',
        data: authorityList,
      };
    } catch (e) {
      ctx.body = {
        code: 305,
        msg: '权限列表数据获取失败',
        data: e,
      };
    }
  }

  // 获取博主信息
  async getUserData() {
    const { ctx } = this;

    const { id = 1 } = ctx.query;

    try {
      const authorityList = await ctx.service.all._getUserData(id);

      ctx.body = {
        code: 200,
        msg: '博主信息获取成功',
        data: authorityList,
      };
    } catch (e) {
      ctx.body = {
        code: 305,
        msg: '博主信息获取失败',
        data: e,
      };
    }
  }

  // 获取博文列表
  async getBowenList() {
    const { ctx } = this;

    const { id, page = 1, page_size = 10 } = ctx.query;

    try {
      const { data, total } = await ctx.service.all._getBowenList({ id, page, page_size });

      ctx.body = {
        code: 200,
        msg: '博文列表获取成功',
        data,
        meta: {
          total,
          page,
          page_size,
        },
      };
    } catch (e) {
      ctx.body = {
        code: 305,
        msg: '博文列表获取失败',
        data: e,
      };
    }
  }
}

module.exports = AllController;

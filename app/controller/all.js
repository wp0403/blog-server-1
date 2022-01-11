/*
 * @Descripttion: 1
 * @version: 1
 * @Author: WangPeng
 * @Date: 2021-12-28 17:59:54
 * @LastEditors: WangPeng
 * @LastEditTime: 2021-12-30 10:03:25
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
}

module.exports = AllController;

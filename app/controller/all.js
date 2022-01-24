/* eslint-disable no-eval */
/*
 * @Descripttion: 1
 * @version: 1
 * @Author: WangPeng
 * @Date: 2021-12-28 17:59:54
 * @LastEditors: WangPeng
 * @LastEditTime: 2022-01-24 10:09:13
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

  // 获取公网ip地址
  async getIp() {
    const { ctx } = this;

    const ip = ctx.req.connection.remoteAddress.split(':').pop();

    ctx.body = {
      code: 200,
      ip,
    };
  }

  // 获取字典对象
  async getDictList() {
    const { ctx } = this;

    const { id } = ctx.query;

    try {
      const data = await ctx.service.all._getDictList(id);

      if (data) {
        // eslint-disable-next-line no-return-assign
        Object.keys(data).map(item => data[item] = eval('(' + data[item] + ')'));
      }

      ctx.body = {
        code: 200,
        data,
        msg: '获取字典列表成功',
      };
    } catch (e) {
      ctx.body = {
        code: 305,
        data: e,
        msg: '获取字典列表失败',
      };
    }
  }
}

module.exports = AllController;

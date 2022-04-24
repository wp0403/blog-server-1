/*
 * @Descripttion:
 * @version:
 * @Author: WangPeng
 * @Date: 2022-01-21 15:15:34
 * @LastEditors: WangPeng
 * @LastEditTime: 2022-04-24 10:28:36
 */

'use strict';

const Controller = require('egg').Controller;

class SecretController extends Controller {
  async getSecretList() {
    const { ctx } = this;

    const { id, page = 1, page_size = 10 } = ctx.query;

    try {
      const { data, total } = await ctx.service.secret._getSecretList({ id, page, page_size });

      ctx.body = {
        code: 200,
        msg: '树洞列表获取成功',
        data,
        meta: {
          total,
          page,
          page_size,
          total_pages: Math.ceil(total / page_size),
        },
      };
    } catch (e) {
      ctx.body = {
        code: 305,
        msg: '树洞列表获取失败',
        // data: e,
      };
    }
  }
}

module.exports = SecretController;

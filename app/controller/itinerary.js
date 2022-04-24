/*
 * @Descripttion: playList
 * @version: 1.0.0
 * @Author: WangPeng
 * @Date: 2022-03-22 15:09:45
 * @LastEditors: WangPeng
 * @LastEditTime: 2022-04-24 10:26:16
 */
'use strict';

const Controller = require('egg').Controller;

class ItineraryController extends Controller {
  async getItineraryList() {
    const { ctx } = this;

    const { keyword = '', page = 1, page_size = 10 } = ctx.query;

    try {
      const { data, total } = await ctx.service.itinerary._getItineraryList({
        keyword,
        page,
        page_size,
      });

      ctx.body = {
        code: 200,
        msg: '旅行日记列表获取成功',
        data: data.map(item => ({
          ...item,
          // eslint-disable-next-line no-eval
          imgs: eval('(' + item.imgs + ')'),
        })),
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
        msg: '旅行日记列表获取失败',
        // data: e,
      };
    }
  }

  async getItineraryDetail() {
    const { ctx } = this;

    const { id } = ctx.query;

    try {
      const obj = await ctx.service.itinerary._getItineraryDetail(id);

      ctx.body = {
        code: 200,
        msg: '旅行日记详情获取成功',
        data: {
          ...obj,
          // eslint-disable-next-line no-eval
          imgs: eval('(' + obj.imgs + ')').map((v, ind) => ({
            id: ind,
            src: v,
          })),
        },
      };
    } catch (e) {
      ctx.body = {
        code: 305,
        msg: '旅行日记详情获取失败',
        // data: e,
      };
    }
  }
}

module.exports = ItineraryController;

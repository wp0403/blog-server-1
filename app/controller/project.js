/*
 * @Descripttion:
 * @version: 1.1.1
 * @Author: 王鹏
 * @Date: 2021-08-04 07:58:00
 * @LastEditors: WangPeng
 * @LastEditTime: 2021-09-18 11:00:31
 */
'use strict';

const Controller = require('egg').Controller;

class ProjectController extends Controller {
  // 获取导航列表
  async getRouter() {
    const { ctx } = this;

    try {
      const pathList = await ctx.service.project.getRouter();

      ctx.body = {
        code: 200,
        msg: '导航数据获取成功',
        data: pathList,
      };
    } catch (e) {
      ctx.body = {
        code: 305,
        msg: '导航数据获取失败',
        data: e,
      };
    }
  }
  // 获取项目列表
  async getProjectList() {
    const { ctx } = this;

    try {
      const projectList = await ctx.service.project.getProjectList();

      ctx.body = {
        code: 200,
        msg: '项目列表数据获取成功',
        data: projectList,
      };
    } catch (e) {
      ctx.body = {
        code: 305,
        msg: '项目列表数据获取失败',
        data: e,
      };
    }
  }
  // 搜索项目
  async searchProject() {
    const { ctx } = this;

    const { text } = ctx.request.query;

    try {
      const projectList = await ctx.service.project.searchProjectList({ text });

      ctx.body = {
        code: 200,
        msg: '搜索项目数据获取成功',
        data: projectList,
      };
    } catch (e) {
      ctx.body = {
        code: 305,
        msg: '搜索项目数据获取失败',
        data: e,
      };
    }
  }
}

module.exports = ProjectController;

/*
 * @Descripttion: aa
 * @version: 1.1.1
 * @Author: 王鹏
 * @Date: 2021-08-04 07:59:02
 * @LastEditors: WangPeng
 * @LastEditTime: 2021-09-18 10:58:35
 */
'use strict';

const Service = require('egg').Service;

class UserService extends Service {
  async getRouter() {
    // 获取路由信息
    const homeRouter = await this.app.mysql.select('pathlist');

    return homeRouter;
  }

  async getProjectList() {
    // 获取项目列表信息
    const projectList = await this.app.mysql.select('projectList');

    return projectList;
  }

  async searchProjectList(obj) {
    const sql = 'SELECT * FROM projectList WHERE keyword LIKE ?';
    const params = [ '%' + obj.text + '%' ];
    return await this.app.mysql.query(sql, params);
  }
}

module.exports = UserService;

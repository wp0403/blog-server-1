/*
 * @Descripttion: aa
 * @version: 1.1.1
 * @Author: 王鹏
 * @Date: 2021-08-02 21:56:27
 * @LastEditors: WangPeng
 * @LastEditTime: 2021-09-18 10:56:12
 */
'use strict';

const Service = require('egg').Service;

class DetailService extends Service {
  async getTitleList() {
    return await this.app.mysql.select('essay', { // 搜索 post 表
      columns: [ 'id', 'title' ], // 要查询的表字段
    });
  }
  async getListObj(obj) {
    const essayObj = await this.app.mysql.get('essay', obj);
    const className = await this.app.mysql.get('categories', { id: essayObj.class });
    essayObj.className = className.typename;
    return essayObj;
  }
}

module.exports = DetailService;

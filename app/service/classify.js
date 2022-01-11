/*
 * @Descripttion: aa
 * @version: 1.1.1
 * @Author: 王鹏
 * @Date: 2021-08-13 10:05:07
 * @LastEditors: WangPeng
 * @LastEditTime: 2021-09-18 10:55:40
 */
'use strict';

const Service = require('egg').Service;

class ClassifyService extends Service {
  async _getClassifyList() {
    return await this.app.mysql.select('categories');
  }

  async _getCurrentList(obj) {
    return await this.app.mysql.select('essay', { // 搜索 essay 表
      where: { class: obj.id }, // WHERE 条件
      columns: [ 'id', 'title', 'dataTime', 'fileType' ], // 要查询的表字段
    });
  }
}

module.exports = ClassifyService;

/*
 * @Descripttion: aa
 * @version: 1.1.1
 * @Author: 王鹏
 * @Date: 2021-08-13 10:05:07
 * @LastEditors: WangPeng
 * @LastEditTime: 2022-01-24 11:08:35
 */
'use strict';

const Service = require('egg').Service;

class ClassifyService extends Service {
  async _getClassifyList(id) {
    return await this.app.mysql.select('Bowen', {
      where: { classify_id: id },
      columns: [
        'id',
        'time_str',
        'last_edit_time',
        'img',
        'author',
        'classify',
        'classify_id',
        'title',
        'selected',
      ],
    });
  }

  async _getClassifySubList(id) {
    return await this.app.mysql.select('Bowen', {
      where: { classify_sub_id: id },
      columns: [
        'id',
        'time_str',
        'last_edit_time',
        'img',
        'author',
        'classify',
        'classify_id',
        'title',
        'selected',
      ],
    });
  }

  async _getClassifyDetails(id) {
    return await this.app.mysql.get('Bowen', { id });
  }
}

module.exports = ClassifyService;

/*
 * @Descripttion: aa
 * @version: 1.1.1
 * @Author: 王鹏
 * @Date: 2021-08-13 10:05:07
 * @LastEditors: WangPeng
 * @LastEditTime: 2022-01-26 15:33:10
 */
'use strict';

const Service = require('egg').Service;

class ClassifyService extends Service {
  async _getClassifyList(obj) {
    const bowenListNum = await this.app.mysql.query('select count(*) from Bowen where classify_id=?', [ obj.id ]);

    const bowenList = await this.app.mysql.select('Bowen', {
      where: { classify_id: obj.id },
      columns: [
        'id',
        'time_str',
        'last_edit_time',
        'img',
        'author',
        'classify',
        'classify_id',
        'classify_sub',
        'classify_sub_id',
        'title',
        'desc',
      ],
      limit: obj.page_size,
      offset: (obj.page - 1) * obj.page_size,
    });

    return {
      data: bowenList,
      meta: {
        page: obj.page,
        page_size: obj.page_size,
        total: bowenListNum[0]['count(*)'],
      },
    };
  }

  async _getClassifySubList(obj) {
    const bowenListNum = await this.app.mysql.query('select count(*) from Bowen where classify_sub_id=?', [ obj.id ]);

    const bowenList = await this.app.mysql.select('Bowen', {
      where: { classify_sub_id: obj.id },
      columns: [
        'id',
        'time_str',
        'last_edit_time',
        'img',
        'author',
        'classify',
        'classify_id',
        'classify_sub',
        'classify_sub_id',
        'title',
        'desc',
      ],
      limit: obj.page_size,
      offset: (obj.page - 1) * obj.page_size,
    });

    return {
      data: bowenList,
      meta: {
        page: obj.page,
        page_size: obj.page_size,
        total: bowenListNum[0]['count(*)'],
      },
    };
  }

  async _getClassifyDetails(id) {
    return await this.app.mysql.get('Bowen', { id });
  }
}

module.exports = ClassifyService;

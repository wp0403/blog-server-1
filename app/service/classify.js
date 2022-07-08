/*
 * @Descripttion: aa
 * @version: 1.1.1
 * @Author: 王鹏
 * @Date: 2021-08-13 10:05:07
 * @LastEditors: WangPeng
 * @LastEditTime: 2022-07-08 15:08:24
 */
'use strict';

const Service = require('egg').Service;

class ClassifyService extends Service {
  async _getClassifyList(obj) {
    const bowenListNum = await this.app.mysql.query('select count(*) from Bowen where classify_id=?', [ obj.id ]);

    const bowenList = await this.app.mysql.select('Bowen', {
      where: { classify_id: obj.id, type: 1 },
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
      limit: +obj.page_size,
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
      where: { classify_sub_id: obj.id, type: 1 },
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
      limit: +obj.page_size,
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
    return await this.app.mysql.get('Bowen', { id, type: 1 });
  }

  async _getClassifyDetailsFooter(id) {
    const bowenListNum = await this.app.mysql.query('select count(*) from Bowen where type in (1)');
    const bowenList = await this.app.mysql.select('Bowen', {
      where: { type: 1 },
      columns: [
        'id',
        'img',
        'title',
      ],
    });

    const index = bowenList.findIndex(v => +v.id === +id);

    return [
      {
        name: 'previous',
        obj: index > 0 ? bowenList[index - 1] : {},
      },
      {
        name: 'next',
        obj: index < bowenListNum[0]['count(*)'] - 1 ? bowenList[index + 1] : {},
      },
    ];
  }
}

module.exports = ClassifyService;

/*
 * @Descripttion:
 * @version:
 * @Author: WangPeng
 * @Date: 2022-01-21 15:21:38
 * @LastEditors: WangPeng
 * @LastEditTime: 2022-01-21 16:50:36
 */

'use strict';

const Service = require('egg').Service;

class SecretService extends Service {
  async _getSecretList(obj) {
    const { id, page, page_size } = obj;
    // 表的查询条件
    let where = {};
    // 表的总数据量
    let secretListNum = [];

    if (id) {
      where = { authorId: id };
    }

    if (Object.keys(where).length === 1) {
      secretListNum = await this.app.mysql.query(
        'select count(*) from secretList where authorId=?',
        [ id ]
      );
    } else {
      secretListNum = await this.app.mysql.query(
        'select count(*) from secretList'
      );
    }

    const secretList = await this.app.mysql.select('secretList', {
      where,
      columns: [
        'id',
        'time_str',
        'type',
        'content',
      ],
      orders: [[ 'id', 'desc' ]],
      limit: +page_size,
      offset: (page - 1) * page_size,
    });

    return {
      data: secretList,
      total: secretListNum[0]['count(*)'],
    };
  }
}

module.exports = SecretService;

/*
 * @Descripttion:
 * @version:
 * @Author: WangPeng
 * @Date: 2022-01-21 15:21:38
 * @LastEditors: WangPeng
 * @LastEditTime: 2023-03-24 14:19:49
 */

'use strict';

const Service = require('egg').Service;

const changeDate = d => {
  const date = new Date(d);
  const monthNames = [ 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec' ];

  const month = monthNames[date.getMonth()];
  let day = date.getDate();

  if (day < 10) {
    day = '0' + day;
  }

  return `${month} ${day}`;
};
class SecretService extends Service {
  async _getSecretList(obj) {
    const { id, page, page_size } = obj;
    // 表的查询条件
    let where = {
      secretType: 1,
      isDelete: 0,
    };
    // 表的总数据量
    let secretListNum = [];

    if (id) {
      where = { authorId: id };
    }

    if (Object.keys(where).length === 1) {
      secretListNum = await this.app.mysql.query(
        'select count(*) from secretList where authorId=? and secretType in (?) and isDelete in (?)',
        [ id, 1, 0 ]
      );
    } else {
      secretListNum = await this.app.mysql.query(
        'select count(*) from secretList where secretType in (?) and isDelete in (?)', [ 1, 0 ]
      );
    }

    let secretList = await this.app.mysql.select('secretList', {
      where,
      columns: [
        'id',
        'time_str',
        'type',
        'content',
        'isTop',
      ],
      orders: [[ 'isTop', 'desc' ], [ 'id', 'desc' ]],
      limit: +page_size,
      offset: (page - 1) * page_size,
    });

    secretList = secretList.map(v => ({
      ...v,
      date_str: changeDate(v.time_str),
      year: new Date(v.time_str).getFullYear(),
    }));

    return {
      data: secretList,
      total: secretListNum[0]['count(*)'],
    };
  }
}

module.exports = SecretService;

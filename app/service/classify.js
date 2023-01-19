/*
 * @Descripttion: aa
 * @version: 1.1.1
 * @Author: 王鹏
 * @Date: 2021-08-13 10:05:07
 * @LastEditors: WangPeng
 * @LastEditTime: 2023-01-19 11:37:13
 */
'use strict';

const Service = require('egg').Service;

class ClassifyService extends Service {
  async _getClassifyList(obj) {
    const bowenListNum = await this.app.mysql.query(
      'select count(*) from Bowen where classify_id=? and type in (?) and isDelete in (?)',
      [ obj.id, 1, 0 ]
    );

    let sql =
      'select a.*,json_object("id",b.uid,"name",b.name) as userInfo from Bowen a left join admin b on a.author_id = b.uid where a.type in (?) and a.classify_id=? and a.isDelete in (?)';

    const content = [ 1, obj.id, 0 ];

    // 开启分页
    if (obj.page || obj.page_size) {
      const current = obj.page; // 当前页码
      const pageSize = obj.page_size; // 一页展示多少条数据
      sql += ' limit ?,?';
      content.push((current - 1) * pageSize, parseInt(pageSize));
    }

    const bowenList = await this.app.mysql.query(sql, content);

    return {
      data: bowenList.map(v => ({ ...v, userInfo: JSON.parse(v.userInfo) })),
      meta: {
        page: obj.page,
        page_size: obj.page_size,
        total: bowenListNum[0]['count(*)'],
        totalPage: Math.ceil(bowenListNum[0]['count(*)'] / obj.page_size),
      },
    };
  }

  async _getClassifySubList(obj) {
    const bowenListNum = await this.app.mysql.query(
      'select count(*) from Bowen where classify_sub_id=? and type in (?) and isDelete in (?)',
      [ obj.id, 1, 0 ]
    );

    let sql =
      'select a.*,json_object("id",b.uid,"name",b.name) as userInfo from Bowen a left join admin b on a.author_id = b.uid where a.type in (?) and a.classify_sub_id=? and a.isDelete in (?)';

    const content = [ 1, obj.id, 0 ];

    // 开启分页
    if (obj.page || obj.page_size) {
      const current = obj.page; // 当前页码
      const pageSize = obj.page_size; // 一页展示多少条数据
      sql += ' limit ?,?';
      content.push((current - 1) * pageSize, parseInt(pageSize));
    }

    const bowenList = await this.app.mysql.query(sql, content);

    return {
      data: bowenList.map(v => ({ ...v, userInfo: JSON.parse(v.userInfo) })),
      meta: {
        page: obj.page,
        page_size: obj.page_size,
        total: bowenListNum[0]['count(*)'],
        totalPage: Math.ceil(bowenListNum[0]['count(*)'] / obj.page_size),
      },
    };
  }

  async _getClassifyDetails(id) {
    const sql =
      'select a.*,json_object("id",b.uid,"name",b.name) as userInfo from Bowen a left join admin b on a.author_id = b.uid where a.id = ? and type = ? and isDelete = ?';
    const list = await this.app.mysql.query(sql, [ id, 1, 0 ]);
    return list && list[0]
      ? { ...list[0], userInfo: JSON.parse(list[0].userInfo) }
      : {};
  }

  async _getClassifyDetailsFooter(id) {
    const bowenListNum = await this.app.mysql.query(
      'select count(*) from Bowen where type in (1) and isDelete in (0)'
    );
    const bowenList = await this.app.mysql.select('Bowen', {
      where: { type: 1, isDelete: 0 },
      columns: [ 'id', 'img', 'title' ],
    });

    const index = bowenList.findIndex(v => +v.id === +id);

    return [
      {
        name: 'previous',
        obj: index > 0 ? bowenList[index - 1] : {},
      },
      {
        name: 'next',
        obj:
          index < bowenListNum[0]['count(*)'] - 1 ? bowenList[index + 1] : {},
      },
    ];
  }
}

module.exports = ClassifyService;

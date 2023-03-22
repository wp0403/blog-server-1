/*
 * @Descripttion: aa
 * @version: 1.1.1
 * @Author: 王鹏
 * @Date: 2021-08-13 10:05:07
 * @LastEditors: WangPeng
 * @LastEditTime: 2023-03-22 22:18:27
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

class ClassifyService extends Service {
  // 获取分类的数量
  async _getClassifyNum() {
    const sql =
      'select classify,classify_id,classify_sub,classify_sub_id from Bowen';

    const bowenList = await this.app.mysql.query(sql);

    const classifyNum = [];
    const classifySubNum = [];

    bowenList.forEach(v => {
      const ind = classifyNum.findIndex(v1 => v1.type === v.classify_id);
      if (ind >= 0) {
        classifyNum[ind].count = classifyNum[ind].count += 1;
      } else {
        classifyNum.push({
          type: v.classify_id,
          label: v.classify,
          count: 1,
        });
      }
    });

    bowenList.forEach(v => {
      const ind = classifySubNum.findIndex(
        v1 => v1.type === v.classify_sub_id
      );
      if (ind >= 0) {
        classifySubNum[ind].count = classifySubNum[ind].count += 1;
      } else {
        classifySubNum.push({
          type: v.classify_sub_id,
          label: v.classify_sub,
          count: 1,
        });
      }
    });

    return {
      data: {
        classifyNum,
        classifySubNum,
      },
    };
  }
  // 获取文归档
  async _getArchive() {
    const sql = 'select id,title,time_str from Bowen';

    let bowenList = await this.app.mysql.query(sql);
    const newList = [];

    bowenList = bowenList.map(v => ({
      ...v,
      date_str: changeDate(v.time_str),
      year: new Date(v.time_str).getFullYear(),
    }));

    bowenList.forEach(v => {
      const ind = newList.findIndex(v1 => v1.year === v.year);
      if (ind >= 0) {
        newList[ind].children.push(v);
      } else {
        newList.push({
          year: v.year,
          children: [ v ],
        });
      }
    });

    return {
      data: newList.sort((a, b) => b.year - a.year),
    };
  }
  // 获取总页数
  async _getClassifyListPage(obj) {
    let sql = 'select count(*) from Bowen where ';

    if (!obj.id) {
      sql += 'type in (?) and isDelete in (?)';
    } else {
      sql += 'classify_id=? and type in (?) and isDelete in (?)';
    }
    const bowenListNum = await this.app.mysql.query(
      sql,
      obj.id ? [ obj.id, 1, 0 ] : [ 1, 0 ]
    );

    return {
      data: Math.ceil(bowenListNum[0]['count(*)'] / obj.page_size),
      meta: {
        page_size: obj.page_size,
        total: bowenListNum[0]['count(*)'],
        totalPage: Math.ceil(bowenListNum[0]['count(*)'] / obj.page_size),
      },
    };
  }

  // 获取当前页的列表数据
  async _getClassifyList(obj) {
    let sql =
      'select a.*,json_object("id",b.uid,"name",b.name) as userInfo from Bowen a left join admin b on a.author_id = b.uid where a.type in (?)';

    if (obj.id) {
      sql += ' and a.classify_id=? and a.isDelete in (?)';
    } else {
      sql += ' and a.isDelete in (?)';
    }
    const content = obj.id ? [ 1, obj.id, 0 ] : [ 1, 0 ];

    // 开启分页
    if (obj.page && obj.page_size) {
      const current = obj.page; // 当前页码
      const pageSize = obj.page_size; // 一页展示多少条数据
      sql += ' limit ?,?';
      content.push((current - 1) * pageSize, parseInt(pageSize));
    }

    const bowenList = await this.app.mysql.query(sql, content);

    return {
      data: bowenList.map(v => ({ ...v, userInfo: JSON.parse(v.userInfo) })),
      meta: {
        page: obj.page || 0,
        page_size: obj.page_size || 0,
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

  // 获取详情
  async _getClassifyDetails(id) {
    const sql =
      'select a.*,json_object("id",b.uid,"name",b.name) as userInfo from Bowen a left join admin b on a.author_id = b.uid where a.id = ? and type = ? and isDelete = ?';
    const list = await this.app.mysql.query(sql, [ id, 1, 0 ]);
    return list && list[0]
      ? { ...list[0], userInfo: JSON.parse(list[0].userInfo) }
      : {};
  }

  // 获取上一篇&下一篇的文章信息
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

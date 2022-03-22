/*
 * @Descripttion:
 * @version:
 * @Author: WangPeng
 * @Date: 2022-03-22 15:09:27
 * @LastEditors: WangPeng
 * @LastEditTime: 2022-03-22 16:23:59
 */
'use strict';

const Service = require('egg').Service;

class ItineraryService extends Service {
  async _getItineraryList(obj) {
    const { keyword, page, page_size } = obj;
    // 表的查询条件
    const where = {};
    // 表的总数据量
    let playListNum = [];

    if (Object.keys(where).length === 1) {
      playListNum = await this.app.mysql.query(
        'select count(*) from playList like %{?}%',
        [ keyword ]
      );
    } else {
      playListNum = await this.app.mysql.query('select count(*) from playList');
    }

    const playList = await this.app.mysql.query(
      `select * from playList where title like '%${keyword}%' limit ?,?`,
      [ (page - 1) * page_size, page * page_size ]
    );

    return {
      data: playList,
      total: playListNum[0]['count(*)'],
    };
  }

  async _getItineraryDetail(id) {
    return await this.app.mysql.get('playList', { id });
  }
}

module.exports = ItineraryService;

/*
 * @Descripttion: all
 * @version: 1
 * @Author: WangPeng
 * @Date: 2021-12-28 17:56:49
 * @LastEditors: WangPeng
 * @LastEditTime: 2022-01-24 10:07:10
 */
'use strict';

const Service = require('egg').Service;

class AllService extends Service {
  // 获取权限列表
  async _getAuthority(userId) {
    let rid = 1;

    if (userId) {
      const admin = await this.app.mysql.get('admin', { id: userId });

      if (admin) {
        const admin_role = await this.app.mysql.get('admin_role', {
          aid: admin.id,
        });

        rid = admin_role.rid;
      }
    }

    const role = await this.app.mysql.get('role', { id: rid });

    const role_permissions = await this.app.mysql.get('role_permissions', {
      rid: role.id,
    });

    const authList = role_permissions.pid
      ? role_permissions.pid.split(',')
      : [];

    const permissions = await this.app.mysql.select('permissions', {
      where: { id: authList },
    });

    return permissions;
  }

  // 获取博主信息
  async _getUserData(id) {
    let userData = await this.app.mysql.get('userData', { id });

    if (!userData) {
      userData = await this.app.mysql.get('userData', { id: 1 });
    }

    return userData;
  }

  // 获取博文列表
  async _getBowenList(obj) {
    const { id, page, page_size } = obj;
    // 表的查询条件
    let where = {};
    // 表的总数据量
    let bowenListNum = [];

    if (id) {
      where = { classify_id: id };
    }

    if (Object.keys(where).length === 1) {
      bowenListNum = await this.app.mysql.query('select count(*) from Bowen where classify_id=?', [ id ]);
    } else {
      bowenListNum = await this.app.mysql.query('select count(*) from Bowen');
    }

    const bowenList = await this.app.mysql.select('Bowen', {
      where,
      columns: [
        'id',
        'time_str',
        'last_edit_time',
        'img',
        'author',
        'classify',
        'classify_id',
        'title',
        'content',
        'storage_type',
        'selected',
      ],
      orders: [[ 'selected', 'asc' ]],
      limit: page_size,
      offset: (page - 1) * page_size,
    });

    return {
      data: bowenList,
      total: bowenListNum[0]['count(*)'],
    };
  }

  // 获取字典对象
  async _getDictList(id) {
    let dictList = [];
    if (id) {
      dictList = await this.app.mysql.get('dict_table', { authorId: id });
    } else {
      dictList = await this.app.mysql.select('dict_table');
    }

    return dictList && dictList[0];
  }
}

module.exports = AllService;

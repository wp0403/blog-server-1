/*
 * @Descripttion: all
 * @version: 1
 * @Author: WangPeng
 * @Date: 2021-12-28 17:56:49
 * @LastEditors: WangPeng
 * @LastEditTime: 2021-12-30 10:27:03
 */
'use strict';

const Service = require('egg').Service;

class AllService extends Service {
  // 获取权限列表
  async _getAuthority(userId) {
    let rid = 1;

    if (userId) {
      const admin = await this.app.mysql.get('admin', { id: userId });

      const admin_role = await this.app.mysql.get('admin_role', { aid: admin.id });

      rid = admin_role.rid;
    }

    const role = await this.app.mysql.get('role', { id: rid });

    const role_permissions = await this.app.mysql.get('role_permissions', { rid: role.id });

    const authList = role_permissions.pid ? role_permissions.pid.split(',') : [];

    const permissions = await this.app.mysql.select('permissions', { where: { id: authList } });

    return permissions;

  }
}

module.exports = AllService;

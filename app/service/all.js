/*
 * @Descripttion: all
 * @version: 1
 * @Author: WangPeng
 * @Date: 2021-12-28 17:56:49
 * @LastEditors: WangPeng
 * @LastEditTime: 2022-11-04 17:43:55
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

  // 获取用户详情
  async _getUserDetails(id) {
    const adminField = [ 'id', 'name', 'username', 'email', 'phone', 'qq', 'weixin', 'github', 'website', 'img', 'personal_tags', 'state', 'create_time', 'last_edit_time', 'role_id' ];
    const siteField = [ 'id', 'author_id', 'home_title', 'home_desc', 'home_about', 'personal_label', 'secret_guide', 'about_page' ];
    const sql =
        `select ${adminField.map(v => `a.${v}`).join(',')},json_object(${siteField.map(v => `"${v}",b.${v}`).join(',')}) as siteInfo from admin a left join site b on a.uid = b.author_id where a.id = ?`;
    const list = await this.app.mysql.query(sql, [ id ]);
    return list && list[0]
      ? { ...list[0], siteInfo: JSON.parse(list[0].siteInfo) }
      : {};
  }

  // 获取字典对象
  async _getDictList() {
    return await this.app.mysql.select('dictList');
  }
}

module.exports = AllService;

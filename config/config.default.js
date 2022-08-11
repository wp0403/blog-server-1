/*
 * @Descripttion: aa
 * @version: 1.1.1
 * @Author: 张三
 * @Date: 2021-07-09 15:47:47
 * @LastEditors: WangPeng
 * @LastEditTime: 2022-08-11 17:51:01
 */
/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1625816762852_9375';

  // add your middleware config here
  config.middleware = [ 'errorHandler', 'jwt' ];

  // 将public下的静态资源重定向到根目录下
  config.static = {
    prefix: '/',
  };

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
    mysql: {
      // 单数据库信息配置
      client: {
        // host
        host: '101.43.203.116',
        // 端口号
        port: '3306',
        // 用户名
        user: 'wp0403',
        // 密码
        password: 'Wp201314',
        // 数据库名
        database: 'bokemaster',
      },
      // 是否加载到 app 上，默认开启
      app: true,
      // 是否加载到 agent 上，默认关闭
      agent: false,
    },
  };

  return {
    ...config,
    ...userConfig,
  };
};

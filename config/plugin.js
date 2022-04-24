/*
 * @Descripttion: aa
 * @version: 1.1.1
 * @Author: 张三
 * @Date: 2021-07-09 15:47:47
 * @LastEditors: WangPeng
 * @LastEditTime: 2022-04-24 10:29:42
 */
'use strict';

/** @type Egg.EggPlugin */
module.exports = {
  // had enabled by egg
  // static: {
  //   enable: true,
  // }
  security: {
    // eslint-disable-next-line eggache/no-unexpected-plugin-keys
    csrf: false,
  },
  mysql: {
    enable: true,
    package: 'egg-mysql',
  },
};

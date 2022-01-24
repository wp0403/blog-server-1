/*
 * @Descripttion: aa
 * @version: 1.1.1
 * @Author: 张三
 * @Date: 2021-07-09 15:47:47
 * @LastEditors: WangPeng
 * @LastEditTime: 2022-01-24 10:33:40
 */
'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/getIp', controller.all.getIp);
  router.get('/getAuthority', controller.all.getAuthority);
  router.get('/getUserData', controller.all.getUserData);
  router.get('/getDictList', controller.all.getDictList);
  router.get('/getBowenList', controller.all.getBowenList);
  router.get('/homeFooter', controller.home.getFooter);
  router.get('/getSwiperBowenList', controller.home.getSwiperBowenList);
  router.get('/getSecretList', controller.secret.getSecretList);
  router.get('/getClassifyList', controller.classify.getClassifyList);
  router.get('/getClassifySubList', controller.classify.getClassifySubList);
  router.get('/getClassifyDetails', controller.classify.getClassifyDetails);
};

/*
 * @Descripttion: aa
 * @version: 1.1.1
 * @Author: 张三
 * @Date: 2021-07-09 15:47:47
 * @LastEditors: 王鹏
 * @LastEditTime: 2022-01-23 01:06:01
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

  router.get('/get/detail', controller.detail.getList);
  router.get('/get/detailObj', controller.detail.getListObj);
  router.get('/get/projectRouter', controller.project.getRouter);
  router.get('/get/projectList', controller.project.getProjectList);
  router.get('/get/searchProjectList', controller.project.searchProject);
  router.get('/get/classifyList', controller.classify.getClassifyList);
  router.get('/get/classify/currentList', controller.classify.getCurrentList);
};

/*
 * @Descripttion: aa
 * @version: 1.1.1
 * @Author: 张三
 * @Date: 2021-07-09 15:47:47
 * @LastEditors: WangPeng
 * @LastEditTime: 2021-12-29 16:44:37
 */
'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/getAuthority', controller.all.getAuthority);
  router.get('/homeText', controller.home.index);
  router.get('/homeMain', controller.home.getMain);
  router.get('/homeMainEssay', controller.home.getMainList);
  router.get('/homeFooter', controller.home.getFooter);
  router.get('/get/detail', controller.detail.getList);
  router.get('/get/detailObj', controller.detail.getListObj);
  router.get('/get/projectRouter', controller.project.getRouter);
  router.get('/get/projectList', controller.project.getProjectList);
  router.get('/get/searchProjectList', controller.project.searchProject);
  router.get('/get/classifyList', controller.classify.getClassifyList);
  router.get('/get/classify/currentList', controller.classify.getCurrentList);
};

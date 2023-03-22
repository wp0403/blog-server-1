/*
 * @Descripttion: aa
 * @version: 1.1.1
 * @Author: 张三
 * @Date: 2021-07-09 15:47:47
 * @LastEditors: WangPeng
 * @LastEditTime: 2023-03-22 21:57:19
 */
'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.page.index);
  router.get('/getIp', controller.all.getIp);
  router.get('/getAuthority', controller.all.getAuthority);
  router.get('/getUserData', controller.all.getUserData);
  router.get('/getUserDetails', controller.all.getUserDetails);
  router.get('/getDictList', controller.all.getDictList);
  router.get('/getHomeFooter', controller.home.getFooter);
  router.get('/getSwiperBowenList', controller.home.getSwiperBowenList);
  router.get('/getSecretList', controller.secret.getSecretList);
  router.get('/getArchive', controller.classify.getArchive);
  router.get('/getClassifyNum', controller.classify.getClassifyNum);
  router.get('/getClassifyListPage', controller.classify.getClassifyListPage);
  router.get('/getClassifyList', controller.classify.getClassifyList);
  router.get('/getClassifySubList', controller.classify.getClassifySubList);
  router.get('/getClassifyDetails', controller.classify.getClassifyDetails);
  router.get('/getItineraryList', controller.itinerary.getItineraryList);
  router.get('/getItineraryDetail', controller.itinerary.getItineraryDetail);
  router.get('/getClassifyDetailsFooter', controller.classify.getClassifyDetailsFooter);
};

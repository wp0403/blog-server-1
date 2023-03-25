/*
 * @Descripttion: aa
 * @version: 1.1.1
 * @Author: 张三
 * @Date: 2021-07-09 15:47:47
 * @LastEditors: WangPeng
 * @LastEditTime: 2023-03-25 11:02:17
 */
'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  require('./routes/all')(app);
  require('./routes/classify')(app);
  router.get('/getSwiperBowenList', controller.home.getSwiperBowenList);
  router.get('/getSecretList', controller.secret.getSecretList);
  router.get('/getItineraryList', controller.itinerary.getItineraryList);
  router.get('/getItineraryDetail', controller.itinerary.getItineraryDetail);
};

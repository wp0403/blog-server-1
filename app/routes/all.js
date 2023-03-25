'use strict';

module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.page.index);
  // 获取ip
  router.get('/getIp', controller.all.getIp);
  // 获取权限
  router.get('/getAuthority', controller.all.getAuthority);
  // 获取博主信息
  router.get('/getUserData', controller.all.getUserData);
  // 获取博主详情
  router.get('/getUserDetails', controller.all.getUserDetails);
  // 获取字典
  router.get('/getDictList', controller.all.getDictList);
  // 获取footer
  router.get('/getHomeFooter', controller.home.getFooter);
};

'use strict';

module.exports = app => {
  const { router, controller } = app;
  // 获取文归档
  router.get('/getArchive', controller.classify.getArchive);
  // 获取博文分类数量
  router.get('/getClassifyNum', controller.classify.getClassifyNum);
  // 获取博文页数，配合next分页路由
  router.get('/getClassifyListPage', controller.classify.getClassifyListPage);
  // 获取博文列表 可以传递分类一级id筛选
  router.get('/getClassifyList', controller.classify.getClassifyList);
  // 获取二级类别的博文列表 传递分类二级id筛选
  router.get('/getClassifySubList', controller.classify.getClassifySubList);
  // 获取关键字搜索的博文列表
  router.get('/getSearchClassifyList', controller.classify.getSearchClassifyList);
  // 获取博文详情数据
  router.get('/getClassifyDetails', controller.classify.getClassifyDetails);
  // 获取详情页的上一条和下一条列表
  router.get('/getClassifyDetailsFooter', controller.classify.getClassifyDetailsFooter);
};

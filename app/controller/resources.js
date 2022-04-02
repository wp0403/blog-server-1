// /*
//  * @Descripttion:
//  * @version:
//  * @Author: WangPeng
//  * @Date: 2022-03-28 11:09:47
//  * @LastEditors: WangPeng
//  * @LastEditTime: 2022-03-28 18:27:50
//  */
// 'use strict';

// const CosCloud = require('cos-js-sdk-v4');
// const Controller = require('egg').Controller;

// // 初始化逻辑
// // 特别注意: JS-SDK使用之前请先到console.cloud.tencent.com/cos 对相应的Bucket进行跨域设置
// const cos = new CosCloud({
//   appid: '1302605407', // APPID 必填参数
//   bucket: 'wp-1302605407', // bucketName 必填参数
//   region: 'tj', // 地域信息 必填参数 华南地区填gz 华东填sh 华北填tj
//   getAppSign(callback) { // 获取签名 必填参数

//     // 下面介绍获取签名的几种办法

//     // 1.搭建一个鉴权服务器，自己构造请求参数获取签名，推荐实际线上业务使用，优点是安全性好，不会暴露自己的私钥
//     // 拿到签名之后记得调用callback
//     /**
//              $.ajax('SIGN_URL').done(function (data) {
//                 var sig = data.sign;
//                 callback(sig);
//             });
//              **/

//     // 2.直接在浏览器前端计算签名，需要获取自己的accessKey和secretKey, 一般在调试阶段使用
//     // 拿到签名之后记得调用callback
//     // var res = getAuth(); //这个函数自己根据签名算法实现
//     // callback(res);


//     // 3.直接复用别人算好的签名字符串, 一般在调试阶段使用
//     // 拿到签名之后记得调用callback
//     // callback('YOUR_SIGN_STR')
//     //

//   },
//   getAppSignOnce(callback) { // 单次签名，必填参数，参考上面的注释即可
//     // 填上获取单次签名的逻辑
//   },
// });

// class ResourcesController extends Controller {
//   async getDribble() {
//     const { ctx } = this;

//     const { id, page = 1, page_size = 10 } = ctx.query;
//   }
// }

// module.exports = ResourcesController;

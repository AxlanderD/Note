//阿里云 dts api接口
let url = 'http://dts.aliyuncs.com/'
let http = require('http')
let dtsJson = require('D:/GitRepository/dts_api/aliyun-nodejs-sdk-dts/apis/dts-2016-08-01.json')
let crypto = require('crypto')//该模块为加密模块
// console.log(dtsJson)

let arrHash = {ab:1,b:2,c:3,d:4}
let s = Object.keys(arrHash).splice(0,2)
console.log(s)
console.log(s.indexOf('ab'))
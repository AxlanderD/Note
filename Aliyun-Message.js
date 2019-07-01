/**
 * 阿里云短信发送接口 nodejs 版本
 * 阿里云短信API官方文档: https://help.aliyun.com/document_detail/44364.html?spm=5176.8195934.507901.11.pLzahV
 */

const  http = require('http');
const querystring=require("querystring");
const crypto = require('crypto');

var AliyunSMS = {
    //配置
    config:{
        AccessKeyId: '***',             //阿里短信服务所用的密钥
        AccessKeySecret: "***",         //阿里短信服务所用的密钥值
        Format: 'JSON',
        SignatureMethod: 'HMAC-SHA1',
        SignatureVersion: '1.0',

        Action: 'SendSms',
        Version: '2017-05-25',
        RegionId: 'cn-hangzhou'
    },
    //发送POST请求
    POST: function (Data,callback){
        const postData = querystring.stringify(Data);
        const options = {host: 'dysmsapi.aliyuncs.com', port: 80, path: '', method: 'POST', headers: {'Content-Type': 'application/x-www-form-urlencoded', 'Content-Length': Buffer.byteLength(postData)}};
        const req = http.request(options, function(res){
        res.setEncoding('utf8');
        res.on('data', function(chunk){callback(chunk);});
        res.on('end', function() {console.log('end');});
    });
    req.on('error', function(e){callback({'error':e.message});});
    req.write(postData);
    req.end();
},
    //签名算法
    sign: function (param) {
        var json={},p=Object.keys(param).sort();
        for(var i=0;i<p.length;i++){json[p[i]]=param[p[i]];}
        return crypto.createHmac('sha1', param.AccessKeySecret + '&').update(new Buffer('POST&' + encodeURIComponent('/') + '&' + encodeURIComponent(querystring.stringify(json, '&', '=')), 'utf-8')).digest('base64');
    },
    //发送短信
    send: function (data,callback) {
        data.SignatureNonce=  Math.random().toString();
        data.Timestamp=new Date().toISOString();
        var param = Object.assign(data, this.config);
        param.Signature = this.sign(param);
        this.POST(param, function (data) {
            callback(data);
        });
    }

};


module.exports = AliyunSMS;

AliyunSMS.config.AccessKeyId= '***';                //阿里短信服务所用的密钥
AliyunSMS.config.AccessKeySecret= "****";         //阿里短信服务所用的密钥值

AliyunSMS.send({
    PhoneNumbers: '13411118888',    //接收短信的手机，逗号隔开，最多20个号码
    SignName: '阿里云短信',          //短信签名
    TemplateCode: 'SMS_11118888',       //短信模板
    TemplateParam: JSON.stringify({
        'code':'1111'
    }) //短信模板中参数指定
}, function (data) {
    console.log('返回data:'+data);
        //发送成功返回 {"Message":"OK","RequestId":"8AB21B6B-A92B-4110-A112-4F10A41511A5","BizId":"10876611111^1111773511111","Code":"OK"}
    // 失败没有OK，有具体错误提示，以此判断是否发送成功
});

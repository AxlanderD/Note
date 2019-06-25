let http = require('http')
let fs = require('fs')
let event = require('events').EventEmitter
emitter = new event()
//参数中为请求 返回的数据
http.createServer((request,response)=>{
  //写入HTTP头
  //状态值 200 为 OK
  //内容类型为 text/plain
  //'content-type':'text-plain' 这里应该就是<meta>标签中的元信息
response.writeHead(200,{'content-type':'text-plain','charset':'utf-8'})
let t1 = Date.now()
let data = fs.readFile('save.txt',(err,data)=>{
  if(err){
    console.log(err)
  }else{
    console.log('data :' + data.toString())
    return data.toString()
  }
  
})
let t2 = Date.now()
//写入响应数据
response.end(`NodeJs write data:\n${data}\ncost time:${t2-t1}`)

}).listen(8080) //监听端口

//http 请求头->请求内容->监听端口

console.log('控制台信息 console.log :127.0.0.1:8088 ')

const buf = Buffer.alloc(20)
buf.write('信息写write into buffer',0,15,'utf8')
console.log(buf)
console.log(buf.toString('utf8',0,10))
let dataJson = JSON.stringify({'name':'dd','age':12})
console.log(JSON.parse(dataJson))

let S = 1000
setInterval(()=>{
  let now = new Date()
  let Month = now.getMonth()
  let date = now.getDate()
  let Hour = now.getHours()
  let Minute = now.getMinutes()
  let Second = now.getSeconds(); 
  time = `${Month+1} 月 ${date} 日 ${Hour} 时 ${Minute} 分 ${Second} 秒`
  console.log(`统计时间:${time} 剩余内存:`+Number(require('os').freemem()/(1024*1024*1024)).toFixed(4)+' GB')
},S*60*2)
console.log(Object.prototype.toString.call(S))
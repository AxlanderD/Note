0625
===
**NodeJS基础**

NodeJs简单来说就是运行在服务端的JavaScript 基于 Google V8引擎创建 ,基于事件驱动 I/O 非阻塞

npm : 
- package.json 属性说明:
  - name : 包名
  - version : 包的版本号
  - description : 包的描述
  - homepage : 包的官网url
  - author : 包的作者姓名{'name':'xx','email':'xx'}
  - contributors : 包的其他贡献者
  - dependencies : 依赖包列表{'包名':'版本号'}
  - repository : 包代码存放的地方的类型,分为 git 或者是 svn {'type':'git','url':'XXXX'}
  - license : 证书
  - keywords : 关键字
  - engines : 引擎,需要的node版本
  - files : 包中的文件名
  - main : 指定程序的主入口文件
  - module : 模块名
  - script : 定义脚本命令 {'build':'node build.js'} node run build === node run build.js
  - bin : "bin" : { "npm" : "./cli.js" } } 字段对应Map,为{ 命令名：文件名 }形式


NodeJS 最基础的就是异步编程,基本所有函数都支持回调函数,当任务完成后调用回调函数.这样的话可以无需等待文件 I/O 操作.
```
function f1(arg1,arg2,callback){

}// callback 就是回调函数名

fs.readFile('filePath',function(err,data){
  if(err) {
    console.log('err:'+err)
  }
  console.log(data.toString())
})
```
NodeJs 是单进程单线程的应用.基本上所有事件机制都是基于设计模式中的观察者模式实现的.每一个异步操作设置一个事件观察者,当事件发生的时候调用回调函数,结束后观察者退出.事件循环机制图示
<center><img src = "https://www.runoob.com/wp-content/uploads/2015/09/event_loop.jpg" title = "NodeJs循环机制"><span><font color = '#006666' size = '2'>NodeJs循环机制</font></span></center>

所有的异步操作在完成的时候都会发送一个事件到事件队列.

**event** 模块:
- `event.EventEmitter()`: 实例化`EventEmitter`来绑定事件监听
- `eventEmitter.on('EventName',eventHandler)`:监听 **EventName** ,并且在发生的时候调用 **eventHandler**,可以在同一个事件上绑定多个监听器,构成一个监听器数组
- `eventEmitter.emit('EventName',[arg1],[arg2],...)`:用于触发事件
- `eventEmitter.addListener('EventName',eventHandler)`:添加一个事件监听器到监听器数组的末尾
- `eventEmitter.once('EventName,eventHandler')`:添加一个一次性的事件监听器
- `eventEmitter.removeListener('EventName,eventHandler')`:删除事件上的指定监听器
- `eventEmitter.removeAllListeners(['EventName'])`:若不指定参数,则移除所有事件的所有监听器,否则移除特定事件的所有监听器
- `eventEmitter.setMaxListeners(n)`:设置监听器的上限数目
- `eventEmitter.listeners('EventName')`:返回指定事件的监听器数组
- `eventEmitter.listenerCount('EventName')`:返回指定事件的监听器数目

- 可以被捕捉到的事件:
  - `newListener`
  - `removeListener`
  - `error`
  - 使用范例:
```
emitter.on('newListener',(event,listener)=>{
  console.log(`add NewListener eventName:${event} listener:${listener}`)
})
emitter.on('removeListener',(event,listener)=>{
  console.log(`remove listener ,eventName:${event} Listener:$ {listener`)
})
let Connect = function(){
  console.log('connect Function')
}
emitter.on('connect',Connect)
emitter.removeListener('connect',Connect)
emitter.removeAllListeners()
```

JavaScript中只有字符串数据类型,没有二进制数据类型,在处理TCP流和文件流的时候必须用到二进制数据,因此NodeJs中有一个Buffer,处理二进制数据
**Buffer**
- `Buffer.alloc(size[,fill[,encoding]])`:返回一个指定大小的Buffer实例,若是没有设置 fill 默认填满
- `Buffer.allocUnsafe(size)`:返回一个指定大小的Buffer实例,这里的 size 指的是字节数
- `Buffer.from(array)`:数组中的元素都必须为数字
- `Buffer.from(buffer)`:复制传入的Buffer实例的数据,并返回一个新的buffer实例
- `Buffer.from(string,编码格式)` 
  - 字符串格式: ascii;utf8;utf16le;base64;latin1;hex
- `buf.toString()`:转化为字符串
- `buf.write(string[,offset[,length]][,encoding])`:写入字符串,设置开始的索引,写入的长度,使用的编码格式
- `buf.toString([encoding[,start[,end]]])`:读取缓存区的数据,设置编码模式,开始的位置,结束的位置
- `buf.toJSON()`:将缓存区中的数据转换为JSON格式, JSON.stringify()隐式调用buf.toJSON()
- `buf.concat(list[,totalLength])`:list为指定的buffer对象列表,totalLength为合并后的Buffer对象总长
- `buf1.compare(buf2)`:比较buf1和buf2,返回一个数字,表示buf1在buf2之前(<0),之后(>0)或者相等(==0)
- `buf.copy(targetBuffer[,targetStart[,sourceStart[,sourceEnd]]])`:从数据源那里进行拷贝,指定数据源,buf复制到targetBuffer中指定的位置上,buf为sourceBuffer
- `buf.slice(start,end)`:将缓存区切片,返回原内存start到end的位置上的内容
- `buf.length`:缓冲区占用的内容长度
- `buf[index]`:返回指定的字节;`buf.equals(buf2)`:比较两个缓冲区是否相等
---
### JS基础常用方法
**标准库**
- Object对象:所有的对象都继承自Object对象,对象都是Object的实例,Object中分为静态方法和实例方法，静态方法是部署在Object对象自身的方法
  - **Object静态方法**
    - `Object.keys(o1)`:获取对象o1的属性值(PS:此方法对于类失效),只返回**可枚举属性**
    - `Object.getOwnPropertyNames(o1)`：获取对象o1的属性值(PS:此方法对于类失效)，可返回不可枚举属性
    - `Object.getOwnPropertyDescriptor()`
    - `Object.defineProperty()`
    - `Object.defineProperties()`
    - `Object.preventExtensions()`
    - `Object.isExtensible()`
    - `Object.seal()`
    - `Object.isSealed()`
    - `Object.freeze()`
    - `Object.isFrozen()`
    - `Object.create()`
    - `Object.getPrototypeOf()`
  - **Object实例方法**
    - `Object.prototype.valueOf()`
    - `Object.prototype.toString()`:判断数据类型很好用
    - `Object.prototype.toLocaleString()`
    - `Object.prototype.hasOwnProperty()`
    - `Object.prototype.isPrototypeOf()`
    - `Object.prototype.propertyIsEnumerable()`
- **原型链对象**：Object.prototype 上的属性和方法可以被所有的实例共享

[可枚举属性](#可枚举属性)：是否为可枚举属性取决于enumeration值，可枚举属性可以被遍历到
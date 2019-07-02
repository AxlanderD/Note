# Node子进程和集群
集群：在服务端编程中，通常会创建多个 node 实例来处理客户端的请求，以此提升系统的吞吐率。对这样多个 node 实例，我们称之为 cluster（集群）。<br>
`IPC`：Inter-Process Communication 进程间通讯<br>
`child_process`：创建子进程模块<br>
`cluster`：子进程管理模块

<center><img src = "https://img-blog.csdn.net/20180411162337266?watermark/2/text/aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2hvbmdjaGg=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70" title = "Master-Worker"></center>
<center><font size='2' color = '#006666'>Master-Worker</font></center>

>思路：子进程 集群管理
>>1.子进程：（1）创建（2）关闭（3）子进程间通信（4）父子进程间通信<br>
>>2.集群管理：（1）管理集群（2）控制进程执行顺序（3）任务分配调度（4）消息管理（5）几种集群模式

`child_process` 模块提供了 `span()`、`exec()`、 `execFile()`、`fork()` 这四个方法来创建子进程

`fork('xxx.js')`：输入模块名就可以创建子进程并执行该模块

Node 父子进程主要通过 `on('message')` 和 `send()` 来进行通信，前者监听 message 信息,后者则是用于向其它进程发送消息。 **matser** 进程在调用`child_process.fork()`后会返回子进程的**实例**，可以通过这个**实例**来监听子进程的消息或者向子进程发送消息。而 **worker** 则是通过`process`对象接口来接收父进程的消息或者向父进程传递消息。

> **master**：通过子进程实例进行信息交互<br>
  **worker**：子进程通过`process`对象接口进行信息交互
<br>
<center><img src = "https://img-blog.csdn.net/20180411162446285?watermark/2/text/aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2hvbmdjaGg=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70" title = "master-worker交互模型"></center>
<center><font size='2' color = '#006666'>master-worker交互</font></center>

具体代码范例参考<em>[试玩NodeJS多进程](https://blog.csdn.net/hongchh/article/details/79898816)</em>

进程通信使用的 `send()` 除了发送普通的对象外，还可以传送 **句柄** ，利用句柄传递，可以实现请求的分发。**master** 进程创建TCP服务器监听特定端口，收到请求后获得一个 **socket** 对象，通过这个对象可以跟客户端进行通信，**master** 可以通过句柄将该 **socket** 对象发送给 **worker** 进程，让子进程去处理请求，同时 **master** 上还可以通过特定的算法调度来实现负载均衡，将客户端的请求均衡地分发给 **worker** 处理

<center><img src = "https://img-blog.csdn.net/20180411162530412?watermark/2/text/aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2hvbmdjaGg=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70" title = "master-worker负载调度"></center>
<center><font size='2' color = '#006666'>master-worker负载调度</font></center>

**cluster** 模块用于管理子进程，实现单机服务器集群。为了充分利用多核系统，该模块可以用于处理需要启用一组Nodjs进程的负载任务。一般的集群方案有两个
- 方案一 :  多个 **Node** 实例 + 多个端口
  - 方案实现：集群内的 **node** 实例，各自监听不同的端口，再由反向代理实现请求到多个端口的转发
- 方案二 ： 主进程向子进程转发请求
  - 方案实现：集群内创建一个主进程，以及若干个子进程，由 **master** 监听客户端连接请求，并根据特定的策略转发给 **worker**
- 使用方法:
  虽然使用 **child_process** 能够简单实现单机 **Node** 集群的做法。**Nodejs** 提供了 **cluster** 模块。该模块封装了很多进程管理的细节。
  - **cluster**模块API：
    1. `.fork()` 函数用于创建子进程,主要是调用了child_process.fork() 方法
    2. `cluster.on('exit',(worker,code,signal)=> {console.log('worker pid:${worker.process.pid} 已经结束')})` 监听子进程结束事件，`code`为子进程正常退出的表示代码,`signal`为引发进程被kill的信号名
    3. `cluster.on('disconnect',()=>{})` 监听子进程结束事件?
    4. `cluster.on('error',()=>{})` 监听子进程错误事件
    5. `cluster.workers` 用于在主进程中获取worker对象
    6. `cluster.worker` 用于在工作进程中获取worker对象
    7. `cluster.isMaster` 判断是否为主进程
     
    

    
    



**nginx** ：用于在多台机器上进行负载调度，nginx 是一个开源的 HTTP server 和反向代理工具，尤其擅长处理静态文件，比如：CSS 和 HTML 。因此，**nginx** 常被用于处理站点的静态文件，和分发动态请求到 nodejs 的服务器上<br>
**forever** ：当 nodejs 崩溃的时候可以重启 node 进程

```
cpuNum = require('os').cpus().length//可以获取电脑的cpu数目
```

[句柄](#句柄)：句柄是一种引用，可以用来标识资源，例如通过句柄可以标识一个socket对象、一个server对象等<br>
[前向代理](#前向代理)：前向代理获取互联网上的资源返回给一个或者多个客户端，服务端只知道代理的IP地址，而不知道客户端地址<br>
[反向代理](#反向代理)：反向代理和前向代理相反，反向代理是在服务端使用的，客户端可以通过反向代理访问后端服务器，而不必知道来自哪台服务器。相当于 **客户端** <--> **代理** <--> **服务端**  


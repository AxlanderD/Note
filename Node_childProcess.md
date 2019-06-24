# Node子进程和集群
`IPC`：Inter-Process Communication 进程间通讯<br>
`child_process`：创建子进程<br>
`cluster`：子进程管理
<br><br>
![Master-Worker](https://img-blog.csdn.net/20180411162337266?watermark/2/text/aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2hvbmdjaGg=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70)
<center><font size='2' color = '#006666'>Master-Worker</font></center>

`child_process` 模块提供了 `span()`、`exec()`、 `execFile()`、`fork()` 这四个方法来创建子进程

`fork('xxx.js')`：输入模块名就可以创建子进程并执行该模块

Node 父子进程主要通过 `on('message')` 和 `send()` 来进行通信，前者监听 message 信息,后者则是用于向其它进程发送消息。 **matser** 进程在调用`child_process.fork()`后会返回子进程的**实例**，可以通过这个**实例**来监听子进程的消息或者向子进程发送消息。而 **worker** 则是通过`process`对象接口来接收父进程的消息或者向父进程传递消息。

> **master**：通过子进程实例进行信息交互<br>
  **worker**：子进程通过`process`对象接口进行信息交互

![master-worker交互模型](https://img-blog.csdn.net/20180411162446285?watermark/2/text/aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2hvbmdjaGg=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70)
<center><font size='2' color = '#006666'>master-worker交互</font></center>

具体代码范例参考<em>[试玩NodeJS多进程](https://blog.csdn.net/hongchh/article/details/79898816)</em>

进程通信使用的 `send()` 除了发送普通的对象外，还可以传送 **句柄** ，利用句柄传递，可以实现请求的分发。**master** 进程创建TCP服务器监听特定端口，收到请求后获得一个 **socket** 对象，通过这个对象可以跟客户端进行通信，**master** 可以通过句柄将该 **socket** 对象发送给 **worker** 进程，让子进程去处理请求，同时 **master** 上还可以通过特定的算法调度来实现负载均衡，将客户端的请求均衡地分发给 **worker** 处理

![master-worker负载调度](https://img-blog.csdn.net/20180411162530412?watermark/2/text/aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2hvbmdjaGg=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70)
<center><font size='2' color = '#006666'>master-worker负载调度</font></center>



[句柄](#句柄)：句柄是一种引用，可以用来标识资源，例如通过句柄可以标识一个socket对象、一个server对象等


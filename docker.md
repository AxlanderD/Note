资源：
[https://kitematic.com/](https://kitematic.com/)
[http://docker.com/](http://docker.com/)
win7 [https://download.docker.com/win/stable/DockerToolbox.exe](https://download.docker.com/win/stable/DockerToolbox.exe)
win10 [https://download.docker.com/win/stable/Docker%20for%20Windows%20Installer.exe](https://download.docker.com/win/stable/Docker%20for%20Windows%20Installer.exe)

简介：
docker属于进程级隔离，每个容器都直接使用物理硬件而非虚拟化的硬件；win服务器和win10自带hyper-v，BIOS打开虚拟化，win10打开hyper-v，直接用没毛病；而win7需要使用工具创建一个oracle的虚拟机，再在这个虚拟机上创建容器，所以性能上约等于是个five了，只是用来学习操作。
![图片](https://uploader.shimo.im/f/nEhy6o21hmsK1ttu.png!thumbnail)
（自动生成的战5渣虚拟机，以及工具组全家福）

kitematic是个可视化docker管理工具，用这个就可以少和cli打交道了！

目前肉眼可见的好处：
依赖一把梭，换个地方部署、批量部署比较方便；
环境隔离，你跑node6，我跑node12；
镜像生成容器后，可以按需再重新生成镜像，私有库需要实时生成的可以直接打包（指某Lib）；
瞎玩，反正镜像是不变的，容器内各种设置玩坏了删了就是，不需要考虑类似实机初始化问题；
帮助构建持续集成、分布式体系（饼）；

概念：
registry：服务提供商，比如默认的dockerHub（免费用户默认可以创建一个私有仓库），某里云registry.cn-hangzhou.aliyuncs.com；
namespace：仓库组命名空间，在同一registry下是唯一的，dockerHub似乎只有自己名字的命名空间，某里云最多5个；
repository：仓库，类似各种git的仓库，一般一个仓库存一个项目；
image：镜像，类似分支，一个仓库通过tag区分不同镜像，生成时不打tag默认为latest，拉取时不指定也默认为latest；
container：容器，镜像实例化得到可执行的容器；

常用命令：
docker info //版本信息，主要验证装没装上，以及内核选得对不对（Linux/windows二选一）
docker image ls //本地镜像列表
docker image rm -f imageId //强删某个镜像
docker container ls --all //本地容器列表，包括启动的和已停止的
docker run repo:tag //运行某个镜像，repo是仓库名，不指定tag默认运行latest的镜像；本地没有会试图从registry中找到这个repo:tag
docker push repo:tag //镜像发布

基操：
A：拉一个公共仓库；
B：从0开始锤一个仓库；
C：镜像更新；
D：关联一个git仓库，实时生成新的镜像（饼）；

B：
（0）新建一个文件夹，以下的操作都在文件夹内
（1）写一个能运行的app.js；
（2）写一个Dockerfile
from node:10 //以node10的image为基础
workdir /usr/src/app //指定在image中的工作区
copy . . //将文件夹内的所有文件从参数1路径复制到参数2路径
run npm install //在image内安装依赖，构建image时就会执行，而非实例化时执行
expose 80//指定容器运行时默认提供服务的端口
cmd ['node', 'app'] //容器运行时需要执行的命令
 （3）生成镜像docker build -t test3207/node_test .

todo：
1、kitematic管理起来比较直观，但是最大的问题在于只能走dockerHub的registry，目前没有发现直接设置其他registry的渠道。但是本身是开源的，可以考虑看下能不能手动改造。（难度中等往上，主要需要是配合阿里云仓库服务这块，包括登录鉴权、公共仓库，好像阿里云并没有类似的api指引）
2、git更新，镜像自动构建的流程还没有走通

资料参考：
[https://docs.docker.com/](https://docs.docker.com/)
[https://zhuanlan.zhihu.com/p/23599229](https://zhuanlan.zhihu.com/p/23599229)
[https://cr.console.aliyun.com/cn-hangzhou/instances/repositories](https://cr.console.aliyun.com/cn-hangzhou/instances/repositories)

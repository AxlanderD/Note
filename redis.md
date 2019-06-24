Redis官方给出了使用setnx实现分布式锁的方法： http://redis.io/topics/distlock
http://doc.redisfans.com/

String（字符串）
set
·nx：键必须不存在，才可以设置成功，用于添加
·xx：与nx相反，键必须存在，才可以设置成功，用于更新

如果有多个客户端同时执行setnx key value，
根据setnx的特性只有一个客户端能设置成功，setnx可以作为分布式锁的一种实现方案

mset
127.0.0.1:6379> mset a 1 b 2 c 3 d 4
OK

mget
127.0.0.1:6379> mget a b c f
1) "1"
2) "2"
3) "3"
4) (nil)

建议缓存数据量超过64字节，统一用String来存储
Redis提供了decr（自减）、incrby（自增指定数字）、decrby（自减指定数字）、incrbyfloat（自增浮点数）

常用：一个分布式Web服务将用户的Session信息（例如用户登录信息）保存在各自服务器中，这样会造成一个问题，出于负载均衡的考虑，
        分布式服务会将用户的访问均衡到不同服务器上，用户刷新一次访问可能会发现需要重新登录

       可以使用Redis将用户的Session进行集中管理,每次用户更新或者查询登录信息都直接从Redis中集中获取。

Hash（哈希表）

127.0.0.1:6379> hmset user:1 name mike age 12 city tianjin
OK
127.0.0.1:6379> hmget user:1 name city
1) "mike"
2) "tianjin"


SCAN 命令用于迭代当前数据库中的数据库键。
SSCAN 命令用于迭代集合键中的元素。
HSCAN 命令用于迭代哈希键中的键值对。
ZSCAN 命令用于迭代有序集合中的元素（包括元素成员和元素分值）。

SCAN、SSCAN、HSCAN、ZSCAN
每次执行都只会返回少量元素，所以这些命令可以用于生产环境，而不会出现像KEYS、SMEMBERS命令带来的问题，
当KEYS命令被用于处理一个大的数据库时，又或者SMEMBERS命令被用于处理一个大的集合键时，它们可能会阻塞服务器达数秒之久。

事务功能
将一组需要一起执行的命令放到multi和exec两个命令之间。
multi命令代表事务开始，exec命令代表事务结束，它们之间的命令是原子顺序执行的
如果要停止事务的执行，可以使用discard命令代替exec命令即可

如果出现 运行时错误 是无法回滚	误把sadd命令写成了zadd命令，这种就是运行时命令，因为语法是正确的

127.0.0.1:6379> multi
OK
127.0.0.1:6379> sadd user:a:follow user:b
QUEUED
127.0.0.1:6379> zadd user:b:fans 1 user:a
QUEUED
127.0.0.1:6379> exec
1) (integer) 1
2) (error) WRONGTYPE Operation against a key holding the wrong kind of value
127.0.0.1:6379> sismember user:a:follow user:b
(integer) 1

Redis并不支持回滚功能

有些应用场景需要在事务之前，确保事务中的key没有被其他客户端修改过，才执行事务，
否则不执行（类似乐观锁）。Redis提供了watch命令来解决这类问题

####T1 ：客户端 1
127.0.0.1:6379> set key "java"
OK
####T2 ：客户端 1
127.0.0.1:6379> watch key
OK
####T3 ：客户端 1
127.0.0.1:6379> multi
OK

####4 ：客户端 2
127.0.0.1:6379> append key python
(integer) 11

####T5 ：客户端 1
202
127.0.0.1:6379> append key jedis
QUEUED
####T6 ：客户端 1
127.0.0.1:6379> exec
(nil)
####T7 ：客户端 1
127.0.0.1:6379> get key
"javapython"


发布订阅
1.发布消息
publish channel message
127.0.0.1:6379> publish channel:sports "Tim won the championship"
(integer) 0

2.订阅消息
subscribe channel [channel ...]
127.0.0.1:6379> subscribe channel:sports
Reading messages... (press Ctrl-C to quit)
1) "subscribe"
2) "channel:sports"
3) (integer) 1

发布者
127.0.0.1:6379> publish channel:sports "James lost the championship"
(integer) 1
订阅者
127.0.0.1:6379> subscribe channel:sports
Reading messages... (press Ctrl-C to quit)
...
1) "message"
2) "channel:sports"
3) "James lost the championship"

3.取消订阅
unsubscribe [channel [channel ...]]
127.0.0.1:6379> unsubscribe channel:sports
1) "unsubscribe"
2) "channel:sports"
3) (integer) 0

4.按照模式订阅和取消订阅 支持glob风格
psubscribe pattern [pattern...]
127.0.0.1:6379> psubscribe it*
Reading messages... (press Ctrl-C to quit)
1) "psubscribe"
2) "it*"

5.查询订阅
查看活跃的频道
pubsub channels [pattern]

127.0.0.1:6379> pubsub channels
1) "channel:sports"
2) "channel:it"
3) "channel:travel"
127.0.0.1:6379> pubsub channels channel:*r*
1) "channel:sports"
2) "channel:travel"

查看频道订阅数
pubsub numsub [channel ...]
当前channel：sports频道的订阅数为2：
127.0.0.1:6379> pubsub numsub channel:sports
1) "channel:sports"
2) (integer) 2


GEO功能
1.增加地理位置信息
geoadd key longitude latitude member [longitude latitude member ...]

127.0.0.1:6379> geoadd cities:locations 116.28 39.55 beijing
(integer) 1

geoadd命令可以同时添加多个地理位置信息：
127.0.0.1:6379> geoadd cities:locations 117.12 39.08 tianjin 114.29 38.02 shijiazhuang 118.01 39.38 tangshan 115.29 38.51 baoding
(integer) 4

2.获取地理位置信息
geopos key member [member ...]

127.0.0.1:6379> geopos cities:locations tianjin
1) "117.12000042200088501"
2) "39.0800000535766543"

3.获取两个地理位置的距离

geodist key member1 member2 [unit]
unit代表返回结果的单位
m（meters）代表米。
km（kilometers）代表公里。
mi（miles）代表英里。
ft（feet）代表尺。

例：计算天津到北京的距离，并以公里为单位：
127.0.0.1:6379> geodist cities:locations tianjin beijing km
"89.2061"

4.获取指定位置范围内的地理信息位置集合

georadius key longitude latitude radiusm|km|ft|mi [withcoord] [withdist] [withhash] [COUNT count] [asc|desc] [store key] [storedist key]

georadiusbymember key member radiusm|km|ft|mi [withcoord] [withdist] [withhash] [COUNT count] [asc|desc] [store key] [storedist key]

georadius和georadiusbymember两个命令的作用是一样的，都是以一个地理位置为中心算出指定半径内的其他地理信息位置，
不同的是georadius命令的中心位置给出了具体的经纬度，
georadiusbymember只需给出成员即可。

其中radiusm|km|ft|mi是必需参数，指定了半径（带单位），这两个命令有很多
可选参数，如下所示：
withcoord：返回结果中包含经纬度。
withdist：返回结果中包含离中心节点位置的距离。
withhash：返回结果中包含geohash，有关geohash后面介绍。
COUNT count：指定返回结果的数量。
asc|desc：返回结果按照离中心节点的距离做升序或者降序。
store key：将返回结果的地理位置信息保存到指定键。

storedist key：将返回结果离中心节点的距离保存到指定键。
下面操作计算五座城市中，距离北京150公里以内的城市：
127.0.0.1:6379> georadiusbymember cities:locations beijing 150 km
1) "beijing"
2) "tianjin"
3) "tangshan"
4) "baoding"

5.获取geohash
geohash key member [member ...]
Redis使用geohash 将二维经纬度转换为一维字符串，
下面操作会返回beijing的geohash值。

127.0.0.1:6379> geohash cities:locations beijing
1) "wx4ww02w070"

geohash有如下特点：
·GEO的数据类型为zset，Redis将所有地理位置信息的geohash存放在zset中。
SortedSet（有序集合）

Redis利用字符串前缀匹配 算法实现相关的命令。
geohash编码和经纬度是可以相互转换的。
Redis正是使用有序集合并结合geohash的特性实现了GEO的若干命令。
具体百度：Redis GEO & 实现原理深度分析

127.0.0.1:6379> type cities:locations
zset

6.删除地理位置信息
zrem key member

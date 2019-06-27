## 0604 
# 读书笔记Start

## 0605 

### JS
js基本数据类型：<br>
`Undefine` `boolean` `Number` `String` `function` `Object`<br>
基本类型检测方法  
变量 `m`<br>
`typeof m` 判断基本数据类型，遇到引用数据类型不起作用
`m instanceof typeString[数据类型]` 判断引用
`m.constructor`  
`Object.prototype.toString.call(m)` 返回一个 string ‘[object 类型名]’ 这种是JQuery中使用的类型判断方法最准确，通过原型链进行判断
     
**注意：** `Null`的类型通过`typeof`读出来是`object`；`Undefine`的类型通过`typeof`读出来是`Undefined`，最准确的是第四种方法<br>

`sort()`函数主要用于对于数组的元素进行排序（按照字符编码的顺序进行排序）js中的sort实现算法是冒泡算法，直接在原数组上进行排序，不会生成副本
```
arr.sort(sortby)//其中sortby可以用于选择排序的顺序 必须使用函数
arr.sort((a,b)=>(){return a - b;})//当返回值为正数的时候交换两个形参在数组中的位置 ，这样写的话是从小到大进行排序。比较传入两个参数
arr.sort(()=>{ return Math.random - 0.5;})//Math.random是生成0-1的随机函数 -0.5 后将会有一半的概率<0,也就是是相邻的数字会有一半的概率进行交换从而达到随机的效果

n.toFixed(0-20) //保留小数点后多少位
Math.ceil(n) //向上取整
Math.floor(n) //向下取整
Math.round(n) //四舍五入
parseInt(n) //舍去小数
```
### MySql

`ON DUPLICATE KEY UPDATE` <br>
如果在insert语句后面带上这句话，当插入的行与表中的记录的唯一索引或者主键不产生重复值，那么会进行插入，否则会将旧行进行更新

---
## 0606 
### js
```
(function(){
  doList();
}());
```
IIFE函数 立即执行函数表达式

### ES6：
     let关键字 定义了一个块定义域；而且禁止了变量提升；可能会造成暂时性死区（即在后面定义的变量，未执行到定义之前不可使用）；不允许重复声明
     块级定义域中，优先使用函数表达式(形如：{ let f = function(){...}; } )而不是函数定义
     
     const关键字 声明一个只读的常量，声明后不可改变；只在当前块作用域生效；禁止变量提升；不可重复声明；
     指向 变量地址 ，若是指向的是一个 对象地址 ，则可以对对象的属性进行改变，增加属性或者改变属性的变量，但是不可以改变对象的引用。
     Object.freeze(obj) 将对象冻结这样的话，就不可以对对象进行属性操作了
     
     6种声明方法：1.let 2.function 3.var 4.const 5.class 6.import
     
     顶层对象的属性和全局变量：顶层对象（在浏览器中指的是window对象，Node中指的是global对象）
     ES6 中var和function定义的全局变量仍然为顶层对象的属性。const、let、class、import 这里的设计是为了将全局变量和顶层对象属性逐渐脱离.
     顶层对象提供全局作用域。浏览器中顶层对象为window
                           Node 中顶层对象为global
                           Web Worker （多线程操作）中顶层对象为self
     但是因为不同环境中的顶层对象指向不同，因此需要进行判断是否可以取到顶层对象。

     解构赋值：
          解构失败，等于undefined
          1.数组的解构赋值
          2.对象的解构赋值(如{bar,foo } = {foo:'aaa',bar:'bbb'})
            对象先找到同名属性，再将值赋给属性后面的变量
            形如：{bar：bar,foo:foo} = {foo:'aaa',bar:'bbb'}
            若：{bar：b,foo:f} = {foo:'aaa',bar:'bbb'}
            //b:“bbb” f：“aaa”
            对象的解构赋值可以很方便的把对象的方法赋值到某个变量
            例 const{log} = console;
               log('hello') //将console.log赋值给了log
     
-----
     sql:
     union
     limit
     USING BTREE
     `name` like '%{$name}%'
-----
     js:
     charAt() 返回特定位置的字符
0609     
=====
     sql:
     关联在原表的基础上加入另一张表的字段值
     左关联；右关联；等值连接；
     左关联：left join ：select * from A 
                         left join B
                         on A.brandId = B.brandId
          取得左边的A表全表，以及右表B.brandId和A.brandId值相等的字段。记录不足的地方用Null补全
     右关联：right join ：select * from A 
                         right join B
                         on A.brandId = B.brandId
          取得左边的A表A.brandId和B.brandId相等的记录，以及右表B表全表。记录不足的地方用Null补全
     等值连接：inner join：select * from A 
                          inner join B
                          on A.brandId = B.brandId
          只会出现两者brandId字段值相等的记录
     完整外部连接： FULL   JOIN：连接所有行，当有一张表的行数不足时，另一张表空值补全
     交叉连接（笛卡尔积）：
     A表中的每一行都和B表中的每一行进行连接 
     A有n行，B有m行，则最后产生m*n行记录，即将A表和B表进行组合

     连接查询：
     标准形式: from a [join_type] b [on] condition
     自连接   对一个表的操作称为自连接
     等值连接 使用 = 建立查询关系
     不等连接 使用 <>（不等于的意思）,<,>,!=,!<,!>建立查询关系
     null只能通过 is null 和 is not null 进行判断
     
     大体上分三类连接：
     内连接：inner join
     外连接：left join，right join，full join（左连接，右连接，全连接）
     交叉连接：

     查询结果中再查询
     形式：
     select *from 
     （select *from tableA where condition）[table_name] 
     where condition ...
     table_name是一个不重复的表名

     选择不重复:select distinct
     更新表中字段:update tableName set 列名 = 值
     删除数据;delete from tablename condition

     bettwen  范围
     like  匹配模式 :前面含有g% 末尾含有%g 中间含有%g%
  
ES6
---
- 插入的地方使用${变量名}
- 字符串模板：let num = 123
                let str = `this is a module ${num}`
                使用反单引号，esc键下方
0611
=====
ES6:
---
`promise`:异步流程控制<br>
`co模块`:            <br>
`redis迁移`:         <br>

0617
=====
js
---
`Object.keys(obj)`:返回可枚举的属性 例如：{ 100: 'a', 2: 'b', 7: 'c' } 返回 {100,2,7}<br>
`map`关系：key—value键值对，也可以称之为映射<br>
`co模块`的使用：
- `function *`：这种声明方式会定义一个生成器函数，返回一个Generater对象
- `json.parse()`:解析为javascript对象
- `json.stringify()`:将javascript值转换为string字符串

sql
---
`union`：用于合并两个或多个 SELECT 语句的结果集<br>
`limit`：用于限制查询结果的条数 如 limit 2,4 其中第一个参数2是跳过的行数，第二个参数4是取得4条记录

0619
=====
js
-----
`concat()`:
       作用：将数组进行连接，不改变原来的数组，返回一个副本
       用法：arr = arr1.concat(arr2,arr3,arr4,...)

`.join('')`:
例如:
```
arr=['a','b,'c']
arr.join() = a,b,c
arr.join('-') = a-b-c
```
**for in** 和 **for of**遍历数组的区别:
  - for in遍历字符串索引
  - for in遍历顺序可能不是按照实际数组的内部顺序
  - for in会遍历所有可枚举属性，包括原型

**for in**适合遍历对象/迭代器/字符串/map/set等拥有迭代器对象的集合：如遍历hash表 for(let key in hash)

**for of**适合遍历数组:如遍历数组 for(let item of list)

`toUpperCase()`:将字符串转换为大写<br>
`subStr(start[,length])`:从指定的开始下标抽取length长度的字符串<br>
`Date.now()`:返回1970年1月1日 00:00:00 UTC到当前时间的毫秒数<br>
`Date.UTC()`:返回从1970-1-1 00:00:00 UTC到指定日期的的毫秒数<br>
使用范例：Date.UTC(year,month[,date[,hrs[,min[,sec[,ms]]]]]) //年，月，日，小时，分钟，秒，毫秒<br>
`Date.parse()`:<br>

**原型链**：

0620
=====
JS
---
怎么获得一个对象中的所有方法名，使用原型链么?

SQL
---
`HAVING` 关键字
用于对group by之后的结果进行筛选

0621
=====
### 正则表达式
#### 限定符号：
`+` 号代表前面的子表达式至少出现一次（可以出现1次或多次） 如lee+t 可以匹配 leeeet leeet等<br>
`*` 号代表前面的子表达式可以出现任意次数（包括0次）<br>
`?` 号代表前面的子表达式最多出现一次（可以出现0次或1次）如 colou?r 可以匹配color colour<br>
`{n}` 确定匹配前面的子表达式n次<br>
`{n,}` 匹配前面的子表达式至少n次<br>
`{n,m}` 匹配前面的子表达式至少n次，最多m次<br>

#### 特殊字符：
`()`<br>
`*`<br>
`+`<br>
`.`<br>
`[]`<br>
`?`<br>
`\`<br>
`{}`<br>
`|`<br>
#### 定位符:
`^` 匹配输入字符串开始的位置
`$` 匹配输入字符串结尾的位置
`\b` 匹配一个单词边界（字符和空格之间的位置）
`\B` 非单词边界匹配
#### 特别的用法：
在 '*'、'+' 、或 '?' 限定符之后放置 '?' ,表示从贪心表达式转换为非贪心表达式
***
MarkDown写法
------
* 强调：

**Heading** ：** **加粗

*斜体*：* *斜体

~~删除线~~：~~ ~~删除线

*** ：分隔线
   
--- ：分隔线

>引用：> 引用符号
         >> 二级引用
         >>> 三级引用

**排序**
```
范例： - 文本
```
`
 []中写入文字
 ()中写入链接
`   
[文字链接]()   
![TianMa](http://pic37.nipic.com/20140113/8800276_184927469000_2.png '天马')
```
代码块的写法：
    1.前面空4格
    2.使用``` content ```
```
`形成小的代码块`

**注脚写法**[1]

[1]:https://www.runoob.com/markdown/md-image.html

# H1
## H2
### H3
#### H4
##### H5

***
**表格写法**[2]
cap1|cap2|cap3
:--|:--:|--:
content1|content2|content3|
[2]:https://www.runoob.com/markdown/md-image.html

**Ps：** 可以在markdown文档中使用html标签 如`<kdb>` `<b>` `<i>` `<em>` `<sup>` `<sub>` `<br>` `<a>` `<img>` 等
[跳转至markdown](#MarkDown写法)&nbsp;&nbsp;&nbsp;&nbsp;
[注脚](#注脚写法)

---

0624
===
### JS
fs模块：
- `writeFileSync(filename,data[,options])`：写入文件路径，写入内容，Options为Object数组对象，包括encoding（string）写入格式、mode（Number）文件读写权限、flag（String）<br>
- `unlink(filepath,callfunction())`：删除指定路径的文件，然后调用回调函数<br>
  - `unlinkSync(filepath)[同步版本]`：删除指定路径文件，无返回值<br>
- `mkdir(dirpath,callfunction())`：创建文件夹，完成操作后调用回调函数<br>
  - `mkdirSync(filepath)[同步版本]`：指定路径创建文件夹，无返回值<br>
- `rmdir(dirpath,callfunction())`：删除文件夹，完成操作后调用回调函数<br>
  - `rmdirSync(filepath)[同步版本]`：删除指定路径文件夹，无返回值<br>

`const { spawn } = require('child_process')`: 使用该模块中的一个方法
`require('child_process')()`:该模块暴露出来的为一个方法，可以自执行 

### 概念
**并发**：在 <strong>一段时间间隔</strong> 中运行多个任务<br>
**并行**：在 <strong>同一时刻</strong> 运行多个任务

0625
===
### 概念
**事务流**: 

0626
===
### 概念
**接口（Interface）**：
概念：
- 接口是抽象方法的集合，一个**类**通过继承接口的方式，从而继承接口的抽象方法。接口只能被类实现，接口中只有抽象方法，无构造方法。类可以实现多个接口，但是只能继承一个类
##### 接口的特点：
- 接口不能被实例化
- 接口只能包含方法声明
- 接口的成员包括 方法，属性，索引器，事件
- 接口中不能包含常量，字段阈，构造函数，析构函数，静态成员
- 接口允许多继承接口 关键字 **extends**
- 接口中的方法都是共有的
- 声明接口关键字 **interface**

**抽象类（abstract）**：抽象类是具体类中的抽象，是一个父类，可以作为<strong>子类</strong>的模板。特点如下：
- 抽象方法只能作为声明，但是不包含实现
- 抽象类不能被实例化，而是只能作为类的模板存在
- 抽象类不一定有抽象属性和抽象方法，但是一旦有了抽象方法，那么该类就一定被声明为抽象类
其抽象方法的实现和覆盖必须由其子类和具体类实现

接口和抽象类的区别：
- 抽象类可以有构造方法，接口中不能有构造方法
- 抽象类中可以有普通成员变量，接口中没有普通成员变量
- 抽象类中可以包含静态方法，接口中不能包含静态方法
- 一个类可以实现<font size = 3 color = '#'> 多个 </font>接口，但只能继承<font size = 3> 一个 </font>抽象类
- 如果抽象类实现接口，则可以把接口中方法映射到抽象类中作为抽象方法而不必实现，而在抽象类的子类中实现接口中方法

接口和抽象类的相同点：
- 都可以被继承
- 都不能被实例化
- 都可以包含方法声明
- 派生类必须实现未实现的方法 实现关键字 **implements**

0627
===

### 一种在Object后面增加成员方法的写法
```
// 定义一个类
let temp2 = {
  a:[1,2,3],
  b:2,
  f1:function(){
    console.log(`a: ${this.a}`)
  }
}

temp2['aFunction'] = function(){
     console.log(`this is aFunction`)
}

console.log(temp2)//{ a: [ 1, 2, 3 ],
                      b: 2,
                     f1: [Function: f1],
          aFunction: [Function] }
//这说明对象中的方法和属性，是存在一个hash表中的，可以直接通过hash表添加新方法和新属性
```



     

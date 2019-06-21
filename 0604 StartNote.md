## 0604 
# 读书笔记Start
---
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






       

     

0619
======
### ES6

基础语法:

**关键字**
  - const :
    常量，类似于指针，指向一个引用.初始化时就需要进行赋值
    不可以重新赋值。但是指向数据结构的时候，可以对数据结果进行更改。
  - let :
    定义一个在作用域才生效的变量。该变量不会变量提升。因此若是在声明之前使用，会造成暂时性死区。导致程序报错 
**写法**
  - ( )=>:
    这个写法是箭头函数，即函数的简写。括号中为参数。
    箭头函数的作用 1.简化函数写法 2.可以使得函数中的this总是指向对象自身。
    例: `let price = ()=> 4.1` 这里箭头函数简化函数写法，省略了return等同于 
    ```
        let price = function f(){
            return 4.1
        }
    ```
      
  - 操作符
    ... :
    这个符号在不同的上下文语境中代表不同的意思
    spread/reset 操作符：
    构造字面量数组，例如
    ```
    let part1 = ['a','b']
    let part2 = ['c','d']
    let part3 = [...part1,...part2]//可以将part1和part2合并在一起
    ```
    表示多个参数传参，例如
    ```
    args = [0,1,2,3]
    function(...args){}//将args展开
    ```
    就是说可以通过...将数组拆分为多个参数，或者将多个参数合成一个数组

0624
===
### ES6
`async-await`: 异步 - 等待 ，主要用于使用同步写法进行异步操作<br>
`promise`:.all()/.catch()/
```
// resolve,reject 分别代表异步操作执行成功后的回调函数和异步操作
/* resolve是将Promise的状态置为1.pending2.fullfiled(完成)3.reject(拒绝)则是将Promise  状态置为reject(失败)*/
let p = new Promise((resolve,reject)=>{
  do...
  resolve(...)
})
// new Promise后会直接执行 因此要包含在函数中使用

function futureDo(){
  return p = new Promise((resolve,reject)=>{
      do...
  })
}
```



      
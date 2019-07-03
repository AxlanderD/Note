2019/07/01
===
## 原型链 prototype/__proto__
JS中所有的对象都是Object的实例，并且继承Object.prototype的属性和方法。
凡是对象都有自己的 __proto__ (指向构造函数的 prototype 属性) 而 __proto__ 最后都指向 **prototype**  (即Object.prototype)原型链就是A.__proto__ ->A.__proto__.prototype ->A.__proto__.prototype.__proto__->Object.prototype(最后指向Object对象，这样形成的一条链关系就是原型链)

Object.prototype中的属性都是不可遍历的

## 基础
`Object` 的属性描述对象
`Object` 的主要方法 ：
- `**Object.keys()**` ：遍历对象的属性，只返回可以枚举的属性
- `Object.getOwnPropertyNames()` ：遍历对象的属性，也可以返回不可枚举的属性，例如length
- `Object.prototype.valueOf()` ：返回对象自身的值
- `**Object.prototype.toString()**` ：返回一个对象的字符串形式，默认情况下返回类型字符串，但是很多时候都会进行函数覆盖
- `Object.prototype.toLocaleString()` ：返回对象的类型字符串.主要是为了和toString方法相区别，针对不同的地域增加特定的值
- `Object.prototype.hasOwnProperty()` ：一个字符串作为参数，返回一个布尔值，表示该实例对象自身是否具有该属性
- `Object.prototype.isPrototypeOf()` : 判断当前对象是否为另一个对象的原型
- `Object.prototype.propertyIsEnumerable()` ：判断某个属性是否可枚举
`.valueOf` : 用于返回对象的值。可以用在JavaScript自动类型转换的时候，默认调用这个方法

其他方法
  - `Object.getOwnPropertyDescriptor()` ：获取某个属性的描述对象
  - `Object.defineProperty()` : 通过描述对象，定义某个属性
  - `Object.defineProperties()` : 通过描述对象，定义多个属性
  - `Object.freeze()` : 冻结一个对象,使其不能被修改
  - `Object.isFrozen()` : 判断一个对象是否被冻结
  - `Object.create()` : 可以指定原型对象和属性，返回一个新的对象
  - `Object.getPrototypeOf()` : 获取对象的Prototype对象
```
Object.valueOf = function(){
  return `something you want`
}
```
`Object.prototype.toString.call(object)` : 返回对象类型字符串

`Object.prototype.hasOwnProperty('属性名')` ：检测Object自身是否具有该属性，不包括继承的属性
### 属性的元属性
JavaScript 提供了一个内部数据结构，用来描述对象的属性，控制它的行为。比如确定该属性是否可写，是否可以遍历。这个内部结构被称为 **属性描述对象** 
```
//如以下例子，为属性的6个元属性
{
  value: 123,//数据值
  writable: false,//属性值是否可以改变
  enumerable: true,//是否可以遍历
  configurable: false,//可配置性，控制属性对象是否可以被改写
  get: undefined,//表示取值函数默认 undefined
  set: undefined//表示存值函数默认 undefined
}
```

`Object.getOwnPropertyDescriptor(对象,属性名)`：取得对象的属性描述对象,且只能获取自身属性，不能获取继承属性<br>
例：
```
let obj = {a:'nas'}
console.log(Object.getOwnPropertyDescriptor(obj,'a'))
输出：
{ value: 'nas',
  writable: true,
  enumerable: true,
  configurable: true }
```
`Object.getOwnPropertyNames(对象)`：返回对象的所有属性属性名,不管属性是否可以遍历，Object.keys(对象) 则返回对象中可以遍历的属性名

`Object.defineProperty(对象,属性，属性描述对象)`：
```
Object.defineProperty({},'p',{
  value:1,
  writeable:false,

})
```
`Object.defineProperties(对象,{属性名：{属性描述对象}})`：一次性定义更改对象中多个属性的描述对象
```
Object.definePropertied(obj,{
  'a':{
    value:'11',
    enumerable:false,
    writable:false,
    configurable:false},
  'g':{
    get:function(){
      return (this.a + this.a) 
    }
  }
})
/*这里需要注意的是，属性的描述对象一旦定义了set函数或者get函数，那么writable属性就不能设置为true，同时不能设置value。get函数设置了以后每次读取值都会调用这个函数*/
```

`对象.proptotype.propertyIsEnumerable(属性名)`：判断该对象的该属性是否为可遍历属性（可枚举性）

for in:遍历对象中的属性，包括继承的属性<br>
Object.keys():遍历不包括继承的属性，但必须是可遍历属性的值<br>
Object.getOwnPropertyNames:获取自身的所有属性，包括不可遍历的属性<br>

存取器：就是属性描述对象中的 set/get 函数，存取的时候都将自动执行存取函数除了上面那种存取器的写法，下面这种写法的应用更加广泛
```
let obj = {
  get file(){
    todo...
  }
  set name(){
    todo...
  }
}
obj.name = 1 //这里会调用set函数
obj.file //这里会调用get函数
```
b为a的复制体
深拷贝和浅拷贝：
对象的拷贝：


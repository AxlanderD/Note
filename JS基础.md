2019/07/01
===
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


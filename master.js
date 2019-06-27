// let clustor = require('cluster')

// class temp {
// constructor(){
//   this.a = 'a'
//   this.b = 'b'
//   this.f1
//   this.f2
// }
// f1(){
// console.log(`a:${this.a}`)
// }
// f2(){
//   console.log(`b:${this.b}`)
// }
// }

let temp2 = {
  a:[1,2,3],
  b:2,
  f1:function(){
    console.log(`a: ${this.a}`)
  }
}

// let t1 = new temp()
// t1.f1()
// t1.a = 'master'
// t1.f1()
// t1.f3 = function(){
//   console.log(`${this.a}+${this.b}`)
// }
// t1.a = 'alpha'
// t1.b = 'belta'
// t1.f3()
// t1.f2()
// t1.f1()
// console.log(Object.getOwnPropertyNames(temp2))
// console.log(Object.keys(temp2))
// temp2.f1()
// let t2 = temp2
// t2.a = 'new a'
// console.log(temp2.a)
// let t3 = new Object(temp2)
// console.log(Object.prototype.toString.call(t2))


var type = function (o){
  var s = Object.prototype.toString.call(o);
  return s.match(/\[object (.*?)\]/)[1].toLowerCase();
};

['Null',
 'Undefined',
 'Object',
 'Array',
 'String',
 'Number',
 'Boolean',
 'Function',
 'RegExp',
 'suibian'
].forEach(function (t) {
  type['is' + t] = function (o) {
    return type(o) === t.toLowerCase();
  };
});

console.log(type)
console.log(temp2)
console.log(temp2['a'])



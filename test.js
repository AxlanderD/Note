`use strict`
const a = []
const b = 1
let c = b + 1 
a.push({a:1,b:2})
a.push(2)
a.push(3)
a[0].d = 4

function f(a,b,c,d,e){
  console.log(a,b,c,d,e)
}

f(...a)
let arr = ['a','b','c','d','e','f']
console.log(arr.join('*'))
let string = 'abcdefg'
console.log(string.indexOf('a'))
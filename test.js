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

for(let n = 0;n<6;n++){
top:
  console.log('second Label')
second:
  for (let i = 0;i<6;i++){
    console.log(`i:${i}`)
    for(let j = 0;j<6;j++){
      console.log(`j:${j}`)
      if(i ===2&&j===4)
      console.log('thread over')
      break second
    }
  }

  
}

function f2(){
    console.log('Outside func Over')

}
f2()
let obj = {a:'1',name:'c'}
let e = obj.age || {}
console.log(e)
console.log(require('os').cpus().length)
console.log(require('os').cpus())

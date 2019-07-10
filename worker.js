
let completeNum = 0
let recieveMsg
let ToDoLength
let event = require('events')
let emitter = new event.EventEmitter()
console.log('[worker] childprocess  pid:' + process.pid)
process.on('message',(msg)=>{
  console.log('[worker] msg:'+msg)
  recieveMsg = msg
  ToDoLength = recieveMsg.length
  for(let i of recieveMsg){
    console.log('[worker] '+i + ' have done')
    emitter.emit('complete')
  }
  
})
emitter.on(`complete`,()=>{
  completeNum = completeNum + 1 
  if(completeNum === ToDoLength){
    // process.send('StepList Complete')
    process.exit(0)
  }
  else process.send(`[worker ${process.pid}] HAVE DONE`)
})





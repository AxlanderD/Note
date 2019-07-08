
let completeNum = 0
let recieveMsg
let ToDoLength
process.send('[worker] childprocess  pid:' + process.pid)
process.on('message',(msg)=>{
  console.log('[worker] msg:'+msg)
  recieveMsg = msg
  ToDoLength = recieveMsg.length
  for(let i of recieveMsg){
  console.log(i + 'have done')
  process.emit('complete')
}
})
process.on(`complete`,()=>{
  completeNum = completeNum + 1 
  if(completeNum === ToDoLength)process.send('StepList Complete')
  else process.send(`[worker ${process.pid}] HAVE DONE`)
})




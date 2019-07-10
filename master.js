let cluster = require('cluster')
let co = require('co')
let cp = require('child_process')
let os = require('os')

// if(cluster.isMaster){
//   process.env.NODE_ENV = 'Master'
//   try{
//     for (let i = 0;i<os.cpus().length;i++){
//     let child_process = cluster.fork('./worker.js')
//     child_process.send('[master] create worker id: '+child_process.pid)
//   }
//   cluster.on('fork',(worker)=>{
//     console.log(`[master] fork process pid: ${worker.id}`)
//   })
//   cluster.on('message',(worker)=>{
//     console.log('[master] worker-pid:'+worker.process.pid+' worker-id:'+worker.id)
//   })
//   cluster.on('exit',(worker,code,signal)=>{
//     console.log(`[master] worker exit:${worker.id},code:${code},signal:${signal}`)
//   })
//   }catch(e){
//     console.log(e.code)
//   }
  
// }else if(cluster.isWorker){
//   process.env.NODE_ENV = 'Worker'
//   try{
//     process.send('[worker] this process pid :'+process.pid)
//     process.exit(0)
//   }catch(e){
//     console.log('[worker] error:'+e)
//   }
// }
// console.log(process.env.NODE_ENV)
//多进程 cluster事件 :1.fork  2.online  3.listening  4.disconnect  5.exit(worker,code,signal)  6.uncaughtException(未捕获的异常)


// let todoList = []
// var getmsg = function (a){
//   console.log(a)
// }
// if(cluster.isMaster){
//   let cpuNums = os.cpus().length
//   let worker1 = cluster.fork()
//   let worker2 = cluster.fork()
//   let list = [[1,2],[3,4,5],[10,12]]
//   worker1.send(list[0])
//   worker2.send(list[1])
//   cluster.on('message',(worker)=>{
//     console.log('[master] recive msg from cp:'+worker.process.pid)
//     worker.emit('complete')
//   })
//   cluster.on('exit',(worker,code,signal)=>{
//     console.log('[master] worker '+ worker.id +' exit; code:'+code)
//   })
// }else if(cluster.isWorker&&cluster.worker.id===1){
//   process.on('message',(msg)=>{
//     this.getmsg(msg)
//     console.log('[worker] msg:'+msg)
//     console.log('[worker] child_process_id:'+process.pid)
//     process.on('complete',()=>{
//       console.log('[worker] childprocess complete')
//       process.exit(0)
//     })
//     process.send('[worker] Complete done...')
    
//     })
// }else if(cluster.isWorker&&cluster.worker.id===2){
//   process.on('message',(msg)=>{
//     this.getmsg(msg)
//     console.log('[worker2]:recive msg:'+msg)
//   })
// }

//使用child_process模块进行（不使用cluster）

let worker1 = cp.fork('./worker.js')
let worker2
let worker3
let worker4
let em = require('events').EventEmitter
let emitter = new em()
let cpuNum = os.cpus().length
let workList = [[1,2,3],[4,5,6],[11,12],[13,26],[10]]
worker1.send([1,2,3])
worker1.on('message',(msg)=>{
  if(msg==='StepList Complete'){
    console.log(`${worker1.pid} has done all thing`)
    
  }
  else console.log('continue msg:'+msg)
})
worker1.on('exit',(code,signal)=>{
  console.log('code:'+code+' signal:'+signal)
  emitter.emit('step1 complete')
})
emitter.on('step1 complete',()=>{
  worker2 = cp.fork('./worker.js')
  worker2.send(workList[0])
  worker2.on('message',(msg)=>{
    console.log(`${worker2.pid} has done all thing`)
    emitter.emit('step2 complete')
  })
  worker2.on('exit',(code,signal)=>{
    console.log('code:'+code+' signal:'+signal)
    emitter.emit('step2 complete')
  })
})
emitter.on('step2 complete',()=>{
  while(workList.length>0){
    for (let i = 0;i < cpuNum;i++){
      let worker_child = cp.fork('./worker.js')
      worker_child.send(workList.shift())
      worker_child.on('message',()=>{
        console.log(1)
      })
    }
  }
  
})


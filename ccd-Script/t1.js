
let process = require('process')
let fs = require('fs')
/**
 * chachadian-DataTeam auto Update BrandLogo Script
 */
/**
 *这个主要是用于批量更新数据库中的Logo url连接
 *上传到 OSS的操作还没做,其实手动也很快。。
 */
// const uname
// const pwd
// const db
let basePath = 'https://system.chachadian.cn/assets/brandLogo/'
let brandId
let filepath
let targetPath = './assert/brandLogo/'
let sql = `update static.static_brand set logo = "@" where brandId = $`
process.stdout.write('输入文件夹路径...')
process.stdin.on('data', (path) => {
  path = Buffer.from(path).toString()
  path = path.slice(0, -2)
  console.log('path :' + path)
  let dir
  try {
    dir = fs.readdirSync(path, 'utf8')
    dir.forEach((data) => {
      console.log('data:'+data)
      data2 = data.replace(/\.+?.*/g,'.jpg')
      console.log('dataJPG:'+data2)
      brandId = data.replace(/.png/, '')
      filepath = basePath + data
      let sqlQuery = sql.replace(/\$/, brandId)
      sqlQuery = sqlQuery.replace(/\@/, filepath)
      console.log(sqlQuery)
      
    })
  } catch (err) {
    if (err)console.log(err)
  }
  
})

function sqlOpt(host,port,user,pwd,sql){
  return new Promise((resolve,reject)=>{
    let db = mysql.createConnection({host:host,port:port,user:user,password:pwd})
    db.query(sql,(err,data)=>{
      if(err){
        reject(err)
      }else{
        console.log('data:',data)
        resolve('sql:'+sql)
      }
    })
  })
  
}

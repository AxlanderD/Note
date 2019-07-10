let process = require('process')
let fs = require('fs')
let mysql = require('mysql')
/**
 * chachadian-DataTeam auto Update BrandLogo Script
 */
/**
 *这个主要是用于批量更新数据库中的Logo url连接
 *上传到 OSS的操作还没做,其实手动也很快。。
 *本来还应该做一个根据品牌名检索到 brandId 的功能，但是感觉可有可无就先不写了。数据量如果大的话再改脚本即可（sql+fs.rename）
 */
// const uname
// const pwd
// const db

// let sqlConfig = ['118.31.95.228','3306','dongweijian','Dongweijian123']
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
    //先给文件进行重命名
    renameFiles(path,'.png')
    dir = fs.readdirSync(path, 'utf8')
    dir.forEach((data) => {
      brandId = data.replace(/.png/, '')
      filepath = basePath + data
      let sqlQuery = sql.replace(/\$/, brandId)
      sqlQuery = sqlQuery.replace(/\@/, filepath)
      console.log('filepath:'+path+'\\'+data)
      sqlOpt(...sqlConfig,sqlQuery).then(()=>{
        upload2OSS = function (basePath,data){
            console.log('upload to '+basePath+data+'\n')
        }
        upload2OSS(basePath,data)
        process.exit(0)
      }).catch((e)=>{
        console.log(e)
      })
      
    })
  } catch (err) {
    if (err)console.log(err)
  }
  
})
function renameFiles(path,parttern){
  dir = fs.readdirSync(path, 'utf8')
  dir.forEach((fileName)=>{
    if(fileName.match(/.DS_Store/))
    {
      fs.unlinkSync(path+'/'+fileName)
    }else{
      //这里修改一下所有的文件名，把所有的图像文件都改成.png后缀的（记得删除非图像文件）
      if(fs.statSync(path+'/'+fileName).isFile()){
        let oldName =  path + '/'+ fileName
        let newName =  path + '/'+ fileName.replace(/\.+?.*/,parttern) 
        fs.renameSync(oldName,newName)
      }else{
        console.log(path+'/'+fileName+' 是违法文件路径.')
      }
    }
    
  })
}
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

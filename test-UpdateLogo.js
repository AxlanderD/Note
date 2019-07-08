// let g = require('nodeLib')
let process = require('process')
let fs = require('fs')
/**
 * chachadian-DataTeam auto Update BrandLogo Script
 */
/**
 *这个主要是用于批量更新数据库中的Logo url连接
 *其中连接到数据库的操作还没有写.
 *
 */
// const uname
// const pwd
// const db
let basePath = 'https://system.chachadian.cn/assets/brandLogo/'
let brandId
let filepath
let targetPath = './assert/brandLogo/'
let sql = 'update static.static_brand set logo = @ where brandId = $'
process.stdout.write('输入文件夹路径...')
process.stdin.on('data', (path) => {
  path = Buffer.from(path).toString()
  path = path.slice(0, -2)
  console.log('path :' + path)
  let dir
  try {
    dir = fs.readdirSync(path, 'utf8')
    dir.forEach((data) => {
      brandId = data.replace(/.png/, '')
      filepath = basePath + data
      let sqlQuery = sql.replace(/\$/, brandId)
      sqlQuery = sqlQuery.replace(/\@/, filepath)
      console.log('sql:', sqlQuery)
      upload2OSS = function (basePath,data){
        console.log('upload to '+basePath+data+'\n')
      }
      upload2OSS(basePath,data)
    })
    
  } catch (err) {
    if (err)console.log(err)
  }
  process.exit(0)
})

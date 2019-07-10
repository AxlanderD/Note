//还有两个问题待解决 1.数据读出来的时候存在 品牌1/品牌2 这种格式 ，2.是库里存在 brand ！= id 的品牌 这样的品牌的 id 如何确认？
// 依赖区
const xlsx = require('node-xlsx')
const fs = require('fs')
const mysql = require('mysql')
const event = require('events').EventEmitter
// 变量定义
let emitter = new event() 
let targetBasePath = 'C:/Users/Administrator/Desktop/excel/'
let basepath = 'C:/Users/Administrator/Desktop/需要改变的头像/'
let filename = ['品牌名单20190708.xlsx','品牌整理表加ID（非完整版）.xlsx']
let brand_name_id = []
let brand_name = []
let field = []
let topicLength
//sql
let sqlConfig = ['rm-bp10q546c825h72115o.mysql.rds.aliyuncs.com','3306','dongweijian','Dongweijian123']
let sql1 = `SELECT brandId,name FROM static.static_brand WHERE brandId = id AND name LIKE "%{$name}%";` //查出品牌ID
let sql2 = `SELECT brandId,total,plat FROM static.base_brand WHERE brandId = {$};`//查公网的店铺数
let sql3 = `SELECT count.count_brand.brandId,SUM(soldNum) FROM count.count_brand WHERE plat = 1 AND brandId = {$};`//查两个平台的月销量
let sql4 = `SELECT count.count_brand.brandId,SUM(soldNum) FROM count.count_brand WHERE plat = 2 AND brandId = {$};`//查两个平台的月销量
let sql5 = `SELECT id,count(*) FROM brand_center.base_group WHERE name like "%{$name}%";`//拿到授权id 即groupId
let sql6 = `select shopId,originId,count(*) from brand_center.base_shop where groupId = '{$}' and plat = 1;`//获取饿了么平台上的品牌店铺数
let sql7 = `select shopId,originId,count(*) from brand_center.base_shop where groupId = '{$}' and plat = 2;`//获取美图骄平台上的品牌店铺数
let sql8 = `select count(*) from wxapp.shop_order_1 where shopId = '{$shopId}' or originId = '{$originId}';`//统计饿了么接口授权月销量
let sql9 = `select count(*) from wxapp.shop_order_2 where shopId = '{$shopId}' or originId = '{$originId}';`//统计美团接口授权月销量
// 逻辑区
let xlsxObj_1 = xlsx.parse(basepath + filename[0])//解析excel表
let xlsxObj_2 = xlsx.parse(basepath + filename[1])
let xlsx_data_1 = xlsxObj_1[0].data//第一个sheet中的数据
let xlsx_data_2 = xlsxObj_2[0].data

let topic = xlsx_data_2[1]
// topicLength = xlsx_data_2[0].length/2//因为表里是 品牌ID|地名 这样两列一组的 因此(0,1)(2,3)(4,5)对应

replaceUndefined(xlsx_data_1)
replaceUndefined(xlsx_data_2)
for(let i = 1;i<xlsx_data_1.length;i++){
  brand_name.push(xlsx_data_1[i][0])
}

let num = brand_name.length

for(let i = 0 ;i<brand_name.length;i++){
  let brandName = brand_name[i]
  let query = format(sql1,brandName)
  sqlQuery(...sqlConfig,query).then((data)=>{
    if((data[0])){
      data = data[0]
      brand_name_id.push({brandId:data['brandId'],brandName:brandName})
    }else{
      brand_name_id.push({brandId:-1,brandName:brandName})
    }
    num = num -1
    if(num === 0)
    {
      emitter.emit('complete')
    }
  },(e)=>{
    console.log('出错了'+e)
  }).catch((e)=>{
    console.log(e)
  })
}
for(let i =0 ;i<xlsx_data_1[0].length;i++){
  field.push(xlsx_data_1[0][i])
}
let brand_data_list = []
let getUndefined = []
emitter.on('complete',()=>{
  console.log(brand_name_id)
  for(let vk of brand_name_id){
    let query2 = format(sql2,vk['brandId'])
    let query3= format(sql3,vk['brandId'])
    let query4= format(sql4,vk['brandId'])
    let query5= format(sql5,vk['brandName'])//拿到授权ID
    sqlQuery(...sqlConfig,query2).then((data)=>{   
      console.log(data)
      return sqlQuery(...sqlConfig,query3).then((data3)=>{
        return sqlQuery(...sqlConfig,query4).then((data4)=>{
          return sqlQuery(...sqlConfig,query5).then((data5)=>{
            if(data.length===0){
              data[0] = 0
              data[1] = 0
              data3[0] = 0
              data4[0] = 0
            }
            return {brandId:vk['brandId'],饿了么公网店铺数:data[0],美团公网店铺数:data[1],饿了么公网销量:data3[0],美团公网销量:data4[0],groupId:data5[0]}
          })
          
      })})
      
    }).then((dataAll)=>{
        if(dataAll['groupId']['id']!==null){
          console.log(`取得数据:`,dataAll['groupId']['id'])
          let query6 = format(sql6,dataAll['groupId']['id'])
          let query7 = format(sql7,dataAll['groupId']['id'])
          return sqlQuery(...sqlConfig,query6).then((data6)=>{
            //data6是饿了么接口授权店铺相关信息，shopId，originId，count
            if(data6.length===0)
              data6 = 0
            return sqlQuery(...sqlConfig,query7).then((data7)=>{
              //data7是美团接口授权店铺数相关信息，shopId，originId，count
              if(data7.length===0)
                data7 = 0
              if(!data6&&data7){
                return {
                  brandName:vk['brandName'],
                  brandId:vk['brandId'],
                  饿了么公网店铺数:dataAll['饿了么公网店铺数'],
                  美团公网店铺数:dataAll['美团公网店铺数'],
                  饿了么公网销量:dataAll['饿了么公网销量'],
                  美团公网销量:dataAll['美团公网销量'],
                  groupId:dataAll['groupId'],
                  饿了么接口授权店铺数:0,
                  美团接口授权店铺数:0,
                  饿了么接口授权月销量:0,
                  美团接口授权月销量:0
                }
              }else{
                data6_shopId = data6[0]['shopId']
                data6_originId = data6[0]['originId']
                data7_shopId = data7[0]['shopId']
                data7_originId = data7[0]['originId']
                let query8 = ''
                let query9 = ''
                if(data6_shopId&&data6_originId){
                  query8 = format(sql8,data6_shopId)
                  query8 = format(query8,data6_originId)
                }else{
                  query8 = sql8
                }
                if(data7_shopId&&data7_originId){
                  query9 = format(sql9,data7_shopId)
                  query9 = format(query9,data7_originId)
                }else{
                  query9 = sql9
                }
                  return sqlQuery(...sqlConfig,query8).then((data8)=>{
                    return sqlQuery(...sqlConfig,query9).then((data9)=>{
                      return {
                        brandName:vk['brandName'],
                        brandId:vk['brandId'],
                        饿了么公网店铺数:dataAll['饿了么公网店铺数'],
                        美团公网店铺数:dataAll['美团公网店铺数'],
                        饿了么公网销量:dataAll['饿了么公网销量'],
                        美团公网销量:dataAll['美团公网销量'],
                        groupId:dataAll['groupId'],
                        饿了么接口授权店铺数:data6[0]['count(*)'],
                        美团接口授权店铺数:data7[0]['count(*)'],
                        饿了么接口授权月销量:data8[0]['count(*)'],
                        美团接口授权月销量:data9[0]['count(*)']
                      }
                    })
                  })
                
              }
            })
          })
        }
        else{
          console.log('groupId 为空')
          return {
                  brandName:vk['brandName'],
                  brandId:vk['brandId'],
                  饿了么公网店铺数:dataAll['饿了么公网店铺数'],
                  美团公网店铺数:dataAll['美团公网店铺数'],
                  饿了么公网销量:dataAll['饿了么公网销量'],
                  美团公网销量:dataAll['美团公网销量'],
                  groupId:dataAll['groupId'],
                  饿了么接口授权店铺数:0,
                  美团接口授权店铺数:0,
                  饿了么接口授权月销量:0,
                  美团接口授权月销量:0
                }
        }
    }).then((msg)=>{
      brand_data_list.push(msg)
      console.log('Data_list:',brand_data_list)
      if(brand_data_list.length === brand_name_id.length){
        emitter.emit('completeAll')
      }
    }).catch((e)=>{
      console.log(e)
    })
  }
})
//全部数据读取完毕后调用
emitter.on('completeAll',()=>{
  console.log('====查询结束=====')
  let t1 = Date.now()
  console.log(brand_data_list)
  try{
    
    let data = []
    data.push(field)
    for(let hash of brand_data_list){
      let h = []
      for(let key in hash){
        if(!hash[key]){
          hash[key] = 0
          hash[key].total = 0
          hash[key]['SUM(soldNum)'] = 0
        }
      }
      // console.log('Hash:',hash)
      h.push(hash['brandName'])
      h.push(hash['饿了么公网店铺数'].total)
      h.push(hash['美团公网店铺数'].total)
      h.push(hash['饿了么公网销量']['SUM(soldNum)'])
      h.push(hash['美团公网销量']['SUM(soldNum)'])
      h.push(hash['饿了么接口授权店铺数'])
      h.push(hash['美团接口授权店铺数'])
      h.push(hash['饿了么接口授权月销量'])
      h.push(hash['美团接口授权月销量'])
      data.push(h)
    }
    console.log('====write data end====')
    writeXlsx(data,targetBasePath,'品牌名单20190709Script')
    let t2 = Date.now()
    console.log(`写入数据 ${data.length} 条,耗时: ${Math.floor((t2-t1)/60)} min`)
  }catch(e){
    console.log(e)
  }
  
})






//方法区
function format(temp,key){
  let newTemp = temp.replace(/\{.*?\}/,key)
  return newTemp
}
//计算时间差 返回天数
function calTimeDiff(unixTime1,unixTime2){
  if(unixTime1 < unixTime2){
    // unixTime1 = unixTime2 + unixTime1
    // unixTime2 = unixTime1 - unixTime2
    // unixTime1 = unixTime1 - unixTime2
    unixTime1,unixTime2 = unixTime2,unixTime1
  }
  let time = unixTime1-unixTime2
  if(time!==0){
     time = Math.floor(time/(60*60*24))//这里time的单位为秒 换算为天
  }
  return time
}
//把 undefined 换成空 去掉（战略合作）
function replaceUndefined(xlsx_data){
for(let i = 0;i < xlsx_data.length;i++){
  for(let m = 0;m < xlsx_data[i].length;m++){
    if(xlsx_data[i][m]==undefined||xlsx_data[i][m]=='无'){
       xlsx_data[i][m] = ''
    }
    xlsx_data[i][m] = String(xlsx_data[i][m]).replace(/\s+/g,'')
    xlsx_data[i][m] = String(xlsx_data[i][m]).replace(/\(战略合作\)/g,'')
    xlsx_data[i][m] = String(xlsx_data[i][m]).replace(/\（战略合作\）/g,'')
    xlsx_data[i][m] = String(xlsx_data[i][m]).replace(/\（战略合作\)/g,'')
    xlsx_data[i][m] = String(xlsx_data[i][m]).replace(/\(战略合作\）/g,'')
  }
    
}
return xlsx_data
}
//写入xlsx
function writeXlsx(data,targetPath,targetName){
  let buffer = xlsx.build([{
    name:'Sheet1',
    data:data
  }])
  fs.writeFileSync(targetPath+targetName+'.xlsx',buffer)

}
//数据查询
function sqlQuery(host,port,user,pwd,sql){
  return p = new Promise(function (resovle,reject){
    let db = mysql.createConnection({host:host,port:port,user:user,password:pwd})
      db.query(sql,(err,data)=>{
      if(err){
        reject('数据库连接出错:'+err)
      }else {
        // console.log('数据库连接成功')
        data = JSON.stringify(data)
        if(data.length===0)
          reject('数据为空')
        resovle(JSON.parse(data)) 
      }
    })
  })
}


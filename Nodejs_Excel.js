const xlsx = require('node-xlsx')
const fs = require('fs')
let targetBasePath = 'C:/Users/Administrator/Desktop/excel/'
let basepath = 'C:/Users/Administrator/Desktop/需要改变的头像/'
let filename = ['品牌名单20190708.xlsx','品牌整理表加ID（非完整版）.xlsx']
let xlsxObj_1 = xlsx.parse(basepath + filename[0])
let xlsxObj_2 = xlsx.parse(basepath + filename[1])
let xlsx_data_1 = xlsxObj_1[0].data//第一个sheet中的数据
let xlsx_data_2 = xlsxObj_2[0].data
console.log('data1:'+xlsx_data_1[0])
replaceUndefined(xlsx_data_1)
replaceUndefined(xlsx_data_2)
writeXlsx(xlsx_data_1,targetBasePath,'newExcel')
writeXlsx(xlsx_data_2,targetBasePath,'newExcel2')
for(let i = 2;i<xlsx_data_2.length;i++){
    console.log('data2:'+xlsx_data_2[i][0])
}

//把 undefined 换成空
function replaceUndefined(xlsx_data_1){
for(let i = 0;i < xlsx_data_1.length;i++){
  for(let m = 0;m < xlsx_data_1[i].length;m++){
    if(xlsx_data_1[i][m]==undefined||xlsx_data_1[i][m]=='无'){
       xlsx_data_1[i][m] = ''
    }
     
  }
    
}
}
function writeXlsx(data,targetPath,targetName){
  let buffer = xlsx.build([{
    name:'Sheet',
    data:data
  }])
  fs.writeFileSync(targetPath+targetName+'.xlsx',buffer)

}

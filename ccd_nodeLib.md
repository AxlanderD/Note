# 函数
`.resolve` ： 用于查询完整的路径名
```
console.log(require.resolve('./test.js'))
```
返回：
```
D:\GitRepository\Note\test.js
```
`.existsSync` ：用于判断在存在该路径文件，若不存在则返回false，存在则返回true 
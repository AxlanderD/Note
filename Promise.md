0704
===
## ES6的 callbakc|Promise|co|pify|

因为工作中遇到了坑所以特此记录一下。

**Promise**：promise表示承诺，即将来执行的动作。在程序中表示当条件满足时做的动作。因此可以写成链式写法
```
condition.ifSuccess(doSomething)
         .ifFail(doSomething)
```
根据条件成功或者失败执行不同的行为
# 微信小程序实现类似Vue的watch属性监听器
之前在开发微信小程序相关业务时候发现小程序不支持像vue的watch类似的监听器，但小程序的自定义组件里面却又有着类似watch的监听器observer（不知道为啥不在页面page也搞一个？搞不懂...）。于是乎模仿vue，用`Object.defineProperty`实现了差不多的功能，用来提高开发效率。

## 使用方法
    下载仓库里面watch文件夹下的watch.js文件导入小程序下的文件夹，在需要使用的小程序页面里引入文件即可。由于小程序一个页面一个实例，不像vue只有一个实例，所以使用前需要在页面生命周期钩子`onload()`方法里面初始化一下watch监听器`watch.init()`，并吧当前页面实例作为参数传入即可。
```
const watch = require('watch.js') //文件所在的相对路径

page({

  data:{
    a:1,
    b:{
      c:2,
      f:3
    },
  },

  onload:function{

    /**
    * @param {object} page
    * @return {void} 无返回值
    */
    watch.init(this) 
  },

  watch:{
    a:function(newValue,oldValue){
      console.log(newValue,oldValue)
    },
    b:{
      handler(newValue, oldValue) {
        console.log(newValue, oldValue)
      },
      deep: true
    },
    'b.f'(newValue, oldValue) {
       console.log(newValue, oldValue)
    },
  },
  }
})

```

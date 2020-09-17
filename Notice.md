# 1 菜单menu的激活项 可通过$route.path  :default-active="$route.path" 
# 2 路由配置中，想携带自定义的信息，可添加一个 meta
# 3 Table-column Scoped Slot 表格中也存在slot -自定义列的内容，参数为 { row, column, $index } row就是行数据
# 4 删除数据 axios.delete() 
# 5 删除数据需要获取id，可通过slot插槽中的row，获取
# 6 组件中的click是自定义事件(在组件中定义的)，但能触发是因为人家在创建组件时用的是$emit("click")  用原生的点击事件，触发自定义事件 
# 7 this.$route.matched 可获取子路由及其父路由、祖先路由的相关信息
# 8 想要对elementui中的默认标签样式进行重置，可以找到对应类名进行设置(注意权重),也可自定义样式文件，通过import引入即可
# 9 返回上一个历史路由，可使用this.$router.back()  跳转(this.$router.push() 和 this.router.replace())
# 10 判断数组中是否有某个值，可使用some方法 
```javascript
//存在就不再向数组中添加
  if (!this.tabMsg.some(item => item.path === to.path)) {
          this.tabMsg.push({
            path: to.path,
            title: to.meta.title
          });
     }
```
# 11 获取数组的下标，可通过findIndex()方法 返回值是 返回符合测试条件的第一个数组元素索引，如果没有符合条件的则返回 -1。
```javascript removeTag(name) {
      console.log(name); //被删除的标签的 name
      //根据name找的tabMsg符合条件的index
      //可通过对应的下标，通过数组的splic方法进行删除
      //通过数组的findIndex()方法
      const index = this.tabMsg.findIndex(item => item.path === name);
      console.log(index);
    }
  }
```
# 12 json-server中如果想自定义排序,可添加属性 _sort 和 _order
```javascript
  _sort:'id',//通过id排序
 _order:'desc',//递减  asc是递增
```
# 13 分页中如果要自定义每页显示的数量(不是10条),需要在<el-pagination>设置 :pagesize="自定义数量"

# 14 折叠展开菜单，如果需要动画
```html
<!-- 组件标签 中自定义某个类名 -->
 <el-menu class="xxx"></el-menu>
 <!-- 菜单折叠时el-menu会自动添加类名el-menu--collapse  -->
```
```css
/* 判断组件标签中自带的类名 el-menu--collapse是否存在 */
 .xxx:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }
```

# 15 隐藏的组件标签 -滚动条 el-scroolbar 使用时设置一下高度(eg:height:100%)

# 16 导航进度条 npm i nprogress --save
```javascript
import Nprogress from "nprogress"
import 'nprogress/nprogress.css'
const router = new VueRouter({...})

router.beforeEach(function(to,from,next){
  Nprogress.start();
  next()
})

router.afterEach(function(){
  Nprogress.done()
})
```

# 17  使用token登录  token会有过期时间，每次需要验证token是否存在，因此在请求数据时可携带一下header参数
```javascript 
  //get请求中是和params同级
  //适用于比较少的数据请求 
  //固定写法 headers:{}  authorization是后台定义的
    headers:{
          authorization:localStorage.getItem("token"),//单个请求
    } 
```
```javascript
//统一给所有的请求都添加headers ---使用axios的请求拦截器
// http://www.axios-js.com/zh-cn/docs/#%E6%8B%A6%E6%88%AA%E5%99%A8

//添加请求拦截器
axios.interceptors.request.use(config=>{
    console.log(config)//config中有headers
    const token=localStorage.getItem("token")
    if(token){
        config.headers.authorization=token
    }
    // 在发送请求之前做些什么
    return config;
  },error=>{
    // 对请求错误做些什么
    return Promise.reject(error);
  });

//添加响应拦截器
axios.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    return response;
  }, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
  });
```   

# 18 添加动画属性  给要出现动画的地方包裹一个transition
```
  <transition name="el-fade-in-linear" mode="out-in"></transiton>
```
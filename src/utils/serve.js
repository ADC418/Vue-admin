import axios from "axios"
import router from "@/router"
import { Message } from "element-ui"

/* 
    开发模式
       localhost:3000
    生产模式
     172.16.5.100:3000 

   因此要进行 环境变量配置
   pageage.json文件下的 serve默认是开发模式  build是生产模式 当然也可自定义模式(eg:test)
   "test": "vue-cli-service build --mode test"
*/
const _axios = axios.create({
  //baseURL:"http://localhost:3000"
   baseURL: process.env.VUE_APP_BASEURL
}
)

_axios.interceptors.request.use(config => {
  //console.log(config)//config中有headers
  const token = localStorage.getItem("token")
  if (token) {
    config.headers.authorization = token
  }
  // 在发送请求之前做些什么
  return config;
}, error => {
  // 对请求错误做些什么
  return Promise.reject(error);
});

// 添加响应拦截器
_axios.interceptors.response.use(response => {
  // 对响应数据做点什么
  return response;
}, error => {
  // 对响应错误做点什么 如果token出错，跳转到登录
  //console.log([error])
  if (error.response.status === 401) {
    router.push("/login");//在js中 跳转使用到router，从router的index导入
    Message.success("token出错");//在js中 使用message提示，从element-ui导入即可
  }
  return Promise.reject(error);
});
export default _axios
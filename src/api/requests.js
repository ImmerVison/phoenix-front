import axios from "axios";
import {ElMessage} from "element-plus";


const isDev = () => import.meta.env.MODE === 'development';
let baseURL = () => isDev() ? (import.meta.env.VITE_API_BASE_URL ?? 'https://ciallo.link') : `${location.origin}`;

axios.defaults.headers.post['Content-Type'] = 'application/json';
//创建axios实例
const request = axios.create({
  timeout: 10000,
  // baseURL: baseURL(),
});
//请求拦截器
request.interceptors.request.use(
    //发送之前想要做些什么
    config => {
      // token是否过期，是否重新登陆等等
      // 此处可修改一些基本数据
      // config[baseURL,[data,[headers,[method,[timeout,[url]   等
      //        基础地址,请求参数,头部, 请求方式, 超时,  请求地址  等

      // config.headers.Cookie = "110110110110110110";
      return config;
    },
    //方法返回一个带有拒绝原因的 Promise 对象。
    error => Promise.reject(error.response.data)
);
/**************移除拦截器****************/
// 动态移除
// const me = axios.interceptors.request.use(function () {/*...*/});
// axios.interceptors.request.eject(me);
/***************************************/

//响应拦截器（对请求结束后进行一些操作，，例如:统一收集报错）
request.interceptors.response.use(
    res => {
      if (res.config.alertMessage) {
        ElMessage({
          message: res.config.alertMessage,
          type: 'success',
        })
      }
      return res;
     // res.status === 200 ? Promise.resolve(res.data) : Promise.reject(res.data)
    },
    error => {
      // 对响应错误做点什么
      ElMessage({
        message: error.response?.data?.detail ?? error.message,
        type: 'error',
      })
      return Promise.reject(error.response.data);

    }
);

export default request

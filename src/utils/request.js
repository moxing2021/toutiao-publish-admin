/* 
    基于 axios 的请求模块
*/
//加载 axios
import axios from 'axios'
//创建一个axios实例
const request = axios.create({
    baseURL: 'http://api-toutiao-web.itheima.net'
})
//导出 request 请求方法
export default request
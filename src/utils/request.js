/* 
    基于 axios 的请求模块
*/
//加载 axios
import axios from 'axios'
//创建一个axios实例
const request = axios.create({
    baseURL: 'http://api-toutiao-web.itheima.net'
})
//axios请求拦截器
request.interceptors.request.use(
    //任何所有请求经过这里
    function (config) {
        const user = JSON.parse(window.localStorage.getItem('user'))
        if(user){
           config.headers.Authorization = `Bearer ${user.token}`
        }
            //console.log(config)        
    return config;
}, 
//请求失败经过这里
function (error) {

    return Promise.reject(error);
});

//导出 request 请求方法
export default request
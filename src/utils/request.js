/* 
    基于 axios 的请求模块
*/
//加载 axios
import axios from 'axios'
import JSONbig from 'json-bigint'//加载处理js超出安全数据范围的插件json-bigint包
//创建一个axios实例
const request = axios.create({
    baseURL: 'http://api-toutiao-web.itheima.net',
    //配置超出js超出安全数据范围的插件---定义后端原始数据的返回处理
    transformResponse: [function (data) {
        // 参数data代表后端返回的原始数据
        //后端返回的数据可能不是一个JSON格式的字符串
        //如果不是的话，那么JSONbig.pars这个方法就会报错，所以我们使用 try-catch来捕获异常 处理异常的发生
        try {
            //如果转换成功直接把结果返回
            return JSONbig.parse(data)
        } catch (error) {
            //如果转换失败，则直接返回给请求使用
            return data
        }
      }]
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
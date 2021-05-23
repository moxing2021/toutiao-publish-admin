/* 
    用户请求相关模块
*/
//用户登录
import request from '@/utils/request'
//拿到用户登录成功存储的用户信息

export const login = data =>{
   return request({
        //请求方法
        method: "POST",
        url: "/mp/v1_0/authorizations",
        //data用来设置post请求体
        data
      })
}
//用户信息
export const getUserProfile = () =>{
    const user = JSON.parse(window.localStorage.setItem('user'))

    return request({
        method: 'PATCH',
        url: '/mp/v1_0/user/profile',
        
        headers:{
            Authorization: `Bearer ${user.token}`
        }
        
    })
}
//修改用户信息
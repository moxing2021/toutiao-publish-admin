/* 
文章请求
*/
import request from '@/utils/request'

export const getArticle = params =>{
    return request({
        method: 'GET',
        url: '/mp/v1_0/articles',
        //body 参数使用 data 设置
        //Query 参数使用 params 设置
        params
    })
}
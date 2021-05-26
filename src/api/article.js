/* 
文章请求
*/
import request from '@/utils/request'
//获取文章信息
export const getArticle = params =>{
    return request({
        method: 'GET',
        url: '/mp/v1_0/articles',
        //body 参数使用 data 设置
        //Query 参数使用 params 设置
        params:params
    })
}

//获取文章频道 channels
export const getArticleChannels = () =>{
    return request({
        method: 'GET',
        url: '/mp/v1_0/channels',
    
        //这个接口没有参数
        
    })
}

//删除文章
export const deleteArticle = articleId =>{
    return request({
        method: 'DELETE',
        //接口文档中写的路径参数需要在 url中传递
        url: `/mp/v1_0/articles/${articleId}`,
    
        //这个接口没有参数
        
    })
}
import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/login'
import Layout from '@/views/layout'
import Home from '@/views/home'
import Img from '@/views/img'
import ArticleTitle from '@/views/articletitle'



Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/',
    component: Layout,
    children:[
      {
        path: '',
        name: 'home',
        component: Home,
      },
      {
        path: '/articletitle',
        name: 'articletitle',
        component: ArticleTitle
      },
      {
        path: '/img',
        name: 'img',
        component: Img

      }
      
    ]
  }
]

const router = new VueRouter({
  routes
})
//路由守卫
router.beforeEach((to,from,next) =>{
  const user = JSON.parse(window.localStorage.getItem('user'))
  //校验非登录页面的状态
  if(to.path !== '/login'){
    if(user){
      //已登录允许通过
      next()
    }else{
      //没有登录就跳转到登录页面
      next('/login')
    }
  }else{
    //正常页面允许通过
    next()
  }
  
})


export default router

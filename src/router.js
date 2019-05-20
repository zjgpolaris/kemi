import Vue from 'vue'
import Router from 'vue-router'


Vue.use(Router)

export default new Router({
  routes: [
    {path:'/',redirect:'/home'},
    {path:'/login',name:'login',component:()=>import(/*webpackChunkName:'login' */ "@/components/login/login")},
    {path:'/home',name:'home',component:()=>import(/*webpackChunkName:'home' */ "@/components/home/home")}
  ]
})

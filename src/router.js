import Vue from 'vue'
import Router from 'vue-router'


Vue.use(Router)

export default new Router({
  routes: [
    {path:'/',redirect:'/home'},
    {path:'/login',name:'login',component:()=>import(/*webpackChunkName:'login' */ "@/components/login/login")},
    {path:'/home',name:'home',component:()=>import(/*webpackChunkName:'home' */ "@/components/home/home"),
      children :[
        {path:'RoleManage',name:'RoleManage',component:()=>import(/*webpackChunkName:'RoleManage' */ '@/components/System/RoleManage/RoleManage')},
        {path:'accountManager',name:'accountManager',component:()=>import(/*webpackChunkName:'accountManager' */ '@/components/System/accountManager/accountManager')},
        {path:'PermissionManage',name:'PermissionManage',component:()=>import(/*webpackChunkName:'PermissionManage' */ '@/components/System/PermissionManage/PermissionManage')},
        {path:'LotteryList',name:'LotteryList',component:()=>import(/*webpackChunkName:'LotteryList' */ '@/components/Lottery/LotteryList/LotteryList'),
          children : [
            {path:'LotteryGame',name:'LotteryGame',component:()=>import(/*webpackChunkName:'LotteryGame' */ '@/components/Lottery/LotteryList/LotteryGame')}
          ]
        },
        {path:'LotteryNews',name:'LotteryNews',component:()=>import(/*webpackChunkName:'LotteryNews' */ '@/components/Lottery/LotteryNews/LotteryNews')},
      ] 
    }
  ]
})

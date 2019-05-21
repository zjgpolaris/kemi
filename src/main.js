import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/utils/jgaxios'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI);
import '@/mixin';
import './apis/apis';
import jgTable from '@/components/common/jgTable';
Vue.component('jg-table',jgTable)

Vue.config.productionTip = false

//设置全局守卫
router.beforeEach((to,from,next)=>{
    if(to.path=="/login"){
        next()
    }else{
      var token = localStorage.getItem('token')
      if(token){
        next()
      }else{
        next({path:'/login',query:{redirect:to.path}})
      }
    }
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

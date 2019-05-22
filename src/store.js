import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import apis from '@/apis/apis'

Vue.use(Vuex)
const loadAction = (commit,payload,mutationName)=>{
  axios.get(payload.api,{pageNo:payload.pageNo,pageSize:payload.pageSize})
  .then((resp)=>{
     resp = resp.data;
     commit(mutationName,resp)
  })
}

export default new Vuex.Store({
  state: {
    allPermission: {},
    allRoles : []
  },
  getters:{
    allPermission(state){
      var allPermission = []
      if(state.allPermission.allPermission){
        allPermission = state.allPermission.allPermission;
        var arr= []
        for(var i=0;i<allPermission.length;i++){
          if(allPermission[i].parentid==0){
              allPermission[i].children=[]
              arr.push(allPermission[i]);
          }
        }
        for(var i=0;i<allPermission.length;i++){
            for(var j=0;j<arr.length;j++){
                if(allPermission[i].parentid==arr[j]._id){
                    arr[j].children.push(allPermission[i])
                }
            }
        }
        return arr;
      }
    },
    allRoles(state){
      if(state.allRoles.allRoles){
        return state.allRoles.allRoles
      }
    }
  },
  mutations: {
    LOADALLPERMISSION(state,payload){
      state.allPermission = payload;
    },
    LOADALLROLES(state,payload){
      state.allRoles = payload
    }
  },
  actions: {
    loadAllPermission({commit},payload={}){
      payload.api = apis.showAllPermission;
      loadAction(commit,payload,'LOADALLPERMISSION')
    },
    loadAllRoles({commit},paylaod={}){
      paylaod.api = apis.findAllRoles;
      loadAction(commit,paylaod,'LOADALLROLES')
    }
  }
})

<template>
    <div id="home">
        <div id="header">
            <el-button type="danger" icon="el-icon-switch-button" @click="cancel">注销</el-button>
        </div>
        <div id="footer">
            <div id="navBar">
                <el-menu
                default-active="2"
                class="el-menu-vertical-demo"
                background-color="#545c64"
                text-color="#fff"
                active-text-color="#ffd04b">
                    <template v-for="(item,index) in arr" >
                        <el-submenu :index="index+''" :key="index">
                            <template slot="title">
                            <i class="el-icon-location"></i>
                            <span>{{item.permissionDesc}}</span>
                            </template>
                            <template v-for="(value,key) in item.children">
                                <el-menu-item :index="index+'-'+key" :key="index+value.permissionName" @click="pushView({name:value.permissionName})">{{value.permissionDesc}}</el-menu-item>
                            </template>
                        </el-submenu>
                    </template>
                </el-menu>
            </div>
            <div id="content">
                <router-view></router-view>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return {
            permissions : [],
            arr : []
        }
    },
    methods: {
      cancel(){
          var action = ()=>{
              localStorage.clear();
              this.$router.push({name:'login'})
          }
          this.operatorConfirm('退出',action)
      },
    },
    created(){
        this.$store.dispatch('loadAllPermission')
        this.$store.dispatch('loadAllRoles')
    },
    mounted(){
        var response = JSON.parse(localStorage.response);
        this.permissions = response.permissions;
        for(var i=0;i<this.permissions.length;i++){
            if(this.permissions[i].parentid==0){
                this.permissions[i].children=[]
                this.arr.push(this.permissions[i]);
            }
        }
        for(var i=0;i<this.permissions.length;i++){
            for(var j=0;j<this.arr.length;j++){
                if(this.permissions[i].parentid==this.arr[j]._id){
                    this.arr[j].children.push(this.permissions[i])
                }
            }
        }
    }
}
</script>

<style lang="scss" scoped>
    #home{
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
    }
    #header{
        width: 100%;
        height: 8%;
        background: #9DD9E7;
        display: flex;
        align-items: center;
        padding-left: 10px;
        box-sizing: border-box;
    }
    #footer{
        width: 100%;
        height: 92%;
        display: flex
    }
    #navBar{
        width: 16%;
        min-width: 220px;
        background: #525C64
    }
    #content{
        width: 84%;
    }
</style>

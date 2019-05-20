<template>
    <div id="home">
        <div id="header">
            <el-button type="danger" icon="el-icon-switch-button">注销</el-button>
        </div>
        <div id="footer">
            <div id="navBar">
                <el-menu
                default-active="2"
                class="el-menu-vertical-demo"
                @open="handleOpen"
                @close="handleClose"
                background-color="#545c64"
                text-color="#fff"
                active-text-color="#ffd04b">
                <el-submenu index="1">
                    <template slot="title">
                    <i class="el-icon-location"></i>
                    <span>导航一</span>
                    </template>
                    <el-menu-item index="1-1">选项1</el-menu-item>
                    <el-menu-item index="1-2">选项2</el-menu-item>
                    <el-menu-item index="1-3">选项3</el-menu-item>
                    <el-menu-item index="1-4">选项4</el-menu-item>
                </el-submenu>
                <el-menu-item index="2">
                    <i class="el-icon-menu"></i>
                    <span slot="title">导航二</span>
                </el-menu-item>
                <el-menu-item index="3">
                    <i class="el-icon-document"></i>
                    <span slot="title">导航三</span>
                </el-menu-item>
                <el-menu-item index="4">
                    <i class="el-icon-setting"></i>
                    <span slot="title">导航四</span>
                </el-menu-item>
                </el-menu>
            </div>
            <div id="content"></div>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return {
            permissions : []
        }
    },
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      }
    },
    mounted(){
        var response = JSON.parse(localStorage.response);
        console.log(response);
        this.permissions = response.permissions
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
        background: lightgreen
    }
</style>

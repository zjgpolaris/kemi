<template>
    <div id="login">
        <div id="loginBar">
            <h1>可米彩票</h1>
            <div style="width:80%">
                <el-form :model="loginInfo" status-icon :rules="rules"  ref="loginInfo">
                    <el-form-item prop="accountName">
                        <el-input placeholder="用户名" v-model="loginInfo.accountName"></el-input>
                    </el-form-item>
                    <el-form-item prop="password">
                        <el-input type="password" placeholder="密码" v-model="loginInfo.password"></el-input>
                    </el-form-item>
                </el-form>
                <button @click="login">登录</button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return{
            loginInfo : {
                accountName : '',
                password : ''
            },
            rules : {
                accountName : [
                    {required :true ,message:"用户名不能为空", trigger:"blur"},
                    {min:3,max:10,message:'用户名长度大于3小于10',trigger:'blur'}
                ],
                password : [
                    {required :true ,message:"密码不能为空", trigger:"blur"},
                    {min:3,max:10,message:'密码长度大于3小于10',trigger:'blur'}
                ],
            }
        }
    },
    methods : {
        login(){
            this.$refs['loginInfo'].validate((valid)=>{
                if(valid){
                    this.$http.post(this.$apis.signin,this.loginInfo)
                    .then((resp)=>{
                        resp = resp.data;
                        var token = resp.token;
                        var success = resp.success;
                        var response = JSON.stringify(resp.response);
                        if(success){
                            localStorage.setItem("token",token);
                            localStorage.setItem('response',response)
                            var query = this.$route.query;
                            // 判断是否需要重定向，如果不需要重定向，直接跳转
                            // 到home组件
                            if(!query.redirect){
                                this.$router.push({name:'home',params:{response}})
                            }else{
                                this.$router.push({path:query.redirect})
                            }
                        }else{
                            this.$message.error('登录失败，请检查用户名和密码');
                        }
                    })
                }else{
                    console.log('error submit!!');
                    return false;
                }
            })
        }
    }
}
</script>

<style lang="scss" scoped>
    #login{
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        background: url(http://img1.imgtn.bdimg.com/it/u=2266948452,1197874603&fm=26&gp=0.jpg) no-repeat;
        background-size: cover
    }
    #loginBar{
        position: absolute;
        right: 0;
        top: 0;
        bottom: 0;
        width: 360px;
        background: rgba(1,1,1,.5);
        color: rgba(255, 255, 255, 0.966);
        display: flex;
        flex-direction: column;
        align-items: center;
        button{
            width: 100%;
            height: 36px;
            background: #409EFF;
            outline: none;
            border: none;
            color: white;
            font-size : 18px;
            border-radius: 5px
        }
    }
    h1{
        text-align: center;
        font-size: 50px
    }
</style>

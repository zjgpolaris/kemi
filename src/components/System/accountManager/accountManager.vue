<template>
    <div id="accountManager">
        <jg-table width="60%" title="用户管理">
            <template slot="jgTable-head">
                <el-button type="primary" size="mini" @click="addNewUser">新增账号</el-button>
            </template>
            <template slot="jgTable-content">
                <el-table
                :data="allUsers"
                style="width: 100%">
                <el-table-column
                label="账号名"
                width="180">
                <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.username }}</span>
                </template>
                </el-table-column>
                <el-table-column
                label="角色列表"
                width="360">
                <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.roles }}</span>
                </template>
                </el-table-column>
                <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button
                    size="mini"
                    @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                    <el-button
                    size="mini"
                    type="danger"
                    @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                </template>
                </el-table-column>
                </el-table>
            </template>
        </jg-table>
        <el-dialog
        :title="isUpdataUser?'更新账号':'新增账号'"
        :visible.sync="dialogVisible"
        width="30%"
        :before-close="handleClose">
        <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="80px">
            <el-form-item label="用户名" prop="username">
                <el-input v-model="ruleForm.username"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
                <el-input type="password" v-model="ruleForm.password"></el-input>
            </el-form-item>
            <el-form-item label="角色">
                <el-checkbox-group v-model="ruleForm.roles">
                        <el-checkbox v-for="(item,index) in allRoles" :key="index" :label="item._id">{{item.roleName}}</el-checkbox>
                </el-checkbox-group>
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button @click="cancel">取 消</el-button>
            <el-button type="primary" @click="addNew">{{isUpdataUser?'更 新':'新 增'}}</el-button>
        </span>
        </el-dialog>
    </div>
</template>

<script>
import {mapGetters} from 'vuex'
export default {
    data(){
        return{
            allUsers : [],
            isUpdataUser : false,
            dialogVisible : false,
            ruleForm : {
                username : '',
                password : '',
                roles : []
            },
            rules : {
                username :[
                    {required : true,message:'用户名不能为空', trigger:'blur'}
                ],
                password :[
                    {required : true,message:'密码不能为空', trigger:'blur'}
                ]
            }
        }
    },
    methods:{
        handleEdit(index, row) { //编辑
            console.log(index, row);
            this.isUpdataUser = true
            this.ruleForm.username = row.username;
            this.ruleForm.password = row.password;
            this.ruleForm.roles = row.roles;
            this.ruleForm._id = row._id;
            this.dialogVisible = true

        },
        handleDelete(index, row) {  //删除
            console.log(index, row);
            var action = ()=>{
                this.post(this.$apis.deleteUser,row).then(()=>{
                    this.Refresh()
                })
            }
            this.operatorConfirm('删除',action)
        },
        handleClose(done) {   //关闭
        this.$confirm('确认关闭？')
            .then(_ => {
                this.ruleForm = {};
                this.ruleForm.roles = []
                done();
            })
            .catch(_ => {});
        },
        cancel(){   //取消
            this.ruleForm ={};
            this.ruleForm.roles = []
            this.dialogVisible=false
        },
        addNewUser(){  //新增用户
            this.dialogVisible = true;
            this.isUpdataUser = false
        },
        addNew(){          //确定按钮
            console.log(this.$refs);
            this.$refs.ruleForm.validate((valid)=>{
                if(valid){
                    if(!this.isUpdataUser){
                        this.post(this.$apis.addNewUser,this.ruleForm).then((resp)=>{
                            console.log(resp)
                            this.dialogVisible = false;
                            this.Refresh()
                        })
                    }else{
                        this.post(this.$apis.updateUserInfo,this.ruleForm).then((resp)=>{
                            console.log(this.ruleForm)
                            console.log(resp)
                            this.dialogVisible = false;
                            this.Refresh()
                        })
                    }
                   
                }
            })
        }
    },
    computed:{
        ...mapGetters(['allRoles'])
    },
    mounted(){
        this.$http.get(this.$apis.findAllUsers).then((resp)=>{
            this.allUsers = resp.data.allUsers
        });
    }
}
</script>

<style lang="scss" scoped>
    #accountManager{
        width: 100%;
        height: 100%;
        padding: 10px;
        box-sizing: border-box  
    }
</style>

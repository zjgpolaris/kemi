<template>
    <div id="accountManager">
        <jg-table width="60%" title="用户管理">
            <template slot="jgTable-head">
                <el-button type="primary" size="mini" @click="dialogVisible=true">新增账号</el-button>
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
        title="新增账号"
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
                <el-radio-group v-model="ruleForm.type">
                        <el-radio v-for="(item,index) in allRoles" :key="index" :label="item.roleName"></el-radio>
                </el-radio-group>
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button @click="cancel">取 消</el-button>
            <el-button type="primary" @click="addNewUser">确 定</el-button>
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
            dialogVisible : false,
            ruleForm : {
                username : '',
                password : '',
                type : []
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
        handleEdit(index, row) {
            console.log(index, row);
            this.ruleForm = row;
            this.dialogVisible = true

        },
        handleDelete(index, row) {
            console.log(index, row);
            this.$http.post(this.$apis.deleteUser,row).then(()=>{
                console.log('删除了')
                this.Refresh()
            })
        },
        handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
      },
      cancel(){
          this.ruleForm ={};
          this.ruleForm.type = [];
          this.dialogVisible=false
      },
      addNewUser(){
          console.log(this.$refs);
          this.$refs.ruleForm.validate((valid)=>{
              if(valid){
                this.dialogVisible = false
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

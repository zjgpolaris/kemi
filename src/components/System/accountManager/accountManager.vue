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
        title="提示"
        :visible.sync="dialogVisible"
        width="30%"
        :before-close="handleClose">
        <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="80px">
            <el-form-item label="用户名" prop="username">
                <el-input v-model="ruleForm.username"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
                <el-input v-model="ruleForm.password"></el-input>
            </el-form-item>
            <el-form-item label="角色">
                <el-checkbox-group v-model="ruleForm.type">
                <el-checkbox label="admin" name="type"></el-checkbox>
                </el-checkbox-group>
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
        </span>
        </el-dialog>
    </div>
</template>

<script>
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
        },
        handleDelete(index, row) {
            console.log(index, row);
        },
        handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
      }
    },
    mounted(){
        this.$http.get(this.$apis.findAllUsers).then((resp)=>{
            console.log(resp);
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

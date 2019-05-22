<template>
    <div id="RoleManage">
        <jg-table width="60%" title="角色管理">
            <template slot="jgTable-head">
                <el-button type="primary" size="mini" @click="dialogVisible=true">新增角色</el-button>
            </template>
            <template slot="jgTable-content">
                <el-table
                    :data="allRoles"
                    style="width: 100%">
                    <el-table-column
                    prop="roleName"
                    label="角色名称"
                    width="180">
                    </el-table-column>
                    <el-table-column
                    prop="roleDesc"
                    label="角色描述"
                    width="180">
                    </el-table-column>
                    <el-table-column
                    label="详情">
                    </el-table-column>
                    <el-table-column
                    label="操作">
                    <template slot-scope="scope">
                        <el-button type="primary" icon="el-icon-edit" size="mini" @click="handleEdit(scope.row)"></el-button>
                        <el-button type="danger" icon="el-icon-delete" size="mini" @click="handleDelete(scope.row)"></el-button>
                    </template>
                    </el-table-column>
                </el-table>
            </template>
        </jg-table>
        <el-dialog
        title="新增角色"
        :visible.sync="dialogVisible"
        width="30%"
        :before-close="handleClose">
            <el-form :model="addNewRoleInfo" status-icon :rules="rules" ref="addNewRoleInfo" label-width="80px">
                <el-form-item label="角色名称" prop="roleName">
                    <el-input v-model="addNewRoleInfo.roleName"></el-input>
                </el-form-item>
                <el-form-item label="角色描述" prop="roleDesc">
                    <el-input v-model="addNewRoleInfo.roleDesc"></el-input>
                </el-form-item>
                <el-form-item label="权限">
                    <el-tree
                        :data="allPermission"
                        show-checkbox
                        node-key="permissionDesc"
                        ref="permissions"
                        :props="defaultProps">
                        </el-tree>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="addNewRole">确 定</el-button>
            </span>
        </el-dialog>
        <el-dialog
        title="提示"
        :visible.sync="dialogVisible2"
        width="30%"
        :before-close="handleClose2">
            <span>这是一段信息</span>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible2 = false">取 消</el-button>
                <el-button type="primary" @click="dialogVisible2 = false">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
import {mapGetters} from 'vuex'
export default {
    data(){
        return {
            dialogVisible: false,
            dialogVisible2: false,
            addNewRoleInfo : {
                roleName : '',
                roleDesc : '',
                permissions : []
            },
            defaultProps:{
                children: 'children',
                label: 'permissionDesc'
            },
            rules : {
                roleName :[
                    {required : true,message:'用户名不能为空', trigger:'blur'}
                ],
                roleDesc :[
                    {required : true,message:'密码不能为空', trigger:'blur'}
                ]
            }
        }
    },
    computed:{
        ...mapGetters(['allPermission','allRoles'])
    },
    methods: {
        handleClose(done) {
            this.$confirm('确认关闭？')
            .then(_ => {
                done();
            })
            .catch(_ => {});
        },
        handleClose2(done) {
            this.$confirm('确认关闭？')
            .then(_ => {
                done();
            })
            .catch(_ => {});
        },

        addNewRole(){
            this.$refs.addNewRoleInfo.validate((valid)=>{
                if(valid){
                    this.dialogVisible=false;
                    var permisssions = this.$refs.permissions.getCheckedNodes();
                    for(var i=0;i<permisssions.length;i++){
                        this.addNewRoleInfo.permissions.push(permisssions[i]._id)
                    }
                    console.log(this.addNewRoleInfo.permissions);
                    this.$http.post(this.$apis.addNewRole,this.addNewRoleInfo)
                    .then((resp)=>{
                        console.log(resp)
                    });
                    this.Refresh()
                }
            })
        },
        handleDelete(row){
            var action = ()=>{
                this.$http.post(this.$apis.deleteRole,{_id:row._id})
            }
            this.operatorConfirm('删除',action).then(()=>{
                this.Refresh()
            })
        },
        handleEdit(row){
            this.dialogVisible2 = true
            console.log(row)
        }
    },
}
</script>

<style lang="scss" scoped>
    #RoleManage{
        width: 100%;
        height: 100%;
        padding: 10px;
        box-sizing: border-box        
    }
</style>

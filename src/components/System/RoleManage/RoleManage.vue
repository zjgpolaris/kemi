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
            <table width="100%" border="1"  cellspacing="0" cellpadding="5">
                <tr>
                    <td>角色名称</td>
                    <td><input type="text" v-model="addNewRoleInfo.roleName"></td>
                </tr>
                <tr>
                    <td>角色描述</td>
                    <td><input type="text" v-model="addNewRoleInfo.roleDesc"></td>
                </tr>
                <tr>
                    <td colspan="2">
                        <el-tree
                        :data="allPermission"
                        show-checkbox
                        node-key="permissionDesc"
                        :default-expanded-keys="[2, 3]"
                        :default-checked-keys="[5]"
                        ref="permissions"
                        :props="defaultProps">
                        </el-tree>
                    </td>
                </tr>
            </table>
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
            allRoles: [],
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
            }
        }
    },
     computed:{
        ...mapGetters(['allPermission'])
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
            this.dialogVisible=false;
            var permisssions = this.$refs.permissions.getCheckedNodes();
            console.log(this.addNewRoleInfo.permissions)
            for(var i=0;i<permisssions.length;i++){
                this.addNewRoleInfo.permissions.push(permisssions[i]._id)
            }
            console.log(this.addNewRoleInfo.permissions);
            this.$http.post(this.$apis.addNewRole,this.addNewRoleInfo)
            .then((resp)=>{
                console.log(resp)
            })
        },
        handleDelete(row){
            var action = ()=>{
                this.$http.post(this.$apis.deleteRole,{_id:row._id})
            }
            this.operatorConfirm('删除',action)
        },
        handleEdit(row){
            this.dialogVisible2 = true
            console.log(row)
        }
    },
    mounted(){
        this.$http.get(this.$apis.findAllRoles).then((resp)=>{
            console.log(resp);
            this.allRoles = resp.data.allRoles
        });
    }
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

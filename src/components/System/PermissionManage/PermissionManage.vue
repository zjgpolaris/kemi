<template>
    <div id="PermissionManage">
        <jg-table width="60%" title="权限管理">
            <template slot="jgTable-head">
                <el-button type="primary" size="mini" @click="dialogVisible=true">新增权限</el-button>
            </template>
            <template slot="jgTable-content">
                <el-tree
                :data="allPermission"
                :props="defaultProps"
                :render-content="renderContent"
                accordion>
                </el-tree>
            </template>
        </jg-table>
        <template v-if="dialogVisible">
            <div id="view">
                <jg-table width="40%" title="新增权限">
                    <template slot="jgTable-content">
                        <el-form ref="newPermission" status-icon :model="newPermission" :rules="rules" label-width="80px">
                            <el-form-item label="权限名称" prop="permissionName">
                                <el-input v-model="newPermission.permissionName"></el-input>
                            </el-form-item>
                            <el-form-item label="权限等级" prop="permissionLeve">
                                <el-input v-model="newPermission.permissionLeve"></el-input>
                            </el-form-item>
                            <el-form-item label="权限描述" prop="permissionDesc">
                                <el-input v-model="newPermission.permissionDesc"></el-input>
                            </el-form-item>
                            <el-form-item label="权限排序" prop="sortNum">
                                <el-input v-model="newPermission.sortNum"></el-input>
                            </el-form-item>
                            <el-form-item label="父级权限" prop="parentid">
                                <el-input v-model="newPermission.parentid"></el-input>
                            </el-form-item>
                        </el-form>
                    </template>
                    <template slot="jgTable-foot">
                        <el-button type="danger" size="mini" @click="cancel">取消</el-button>
                        <el-button type="primary" size="mini" @click="addPermission">提交</el-button>
                    </template>
                </jg-table>
            </div>
        </template>
    </div>
</template>

<script>
import {mapGetters} from 'vuex'
export default {
    data () {
        return {
            dialogVisible :false,
            defaultProps: {
                children: 'children',
                label: 'permissionDesc'
            },
            newPermission : {},
            rules : {
                permissionName :[
                    {required:true ,message : '权限名称不能为空' , trigger:'blur'}
                ],
                permissionLeve :[
                    {required:true ,message : '权限名称不能为空' , trigger:'blur'}
                ],
                permissionDesc :[
                    {required:true ,message : '权限名称不能为空' , trigger:'blur'}
                ],
                sortNum :[
                    {required:true ,message : '权限名称不能为空' , trigger:'blur'}
                ],
                parentid :[
                    {required:true ,message : '权限名称不能为空' , trigger:'blur'}
                ],
            }
        }
    },
    methods: {
        cancel(){
            this.dialogVisible = false;
            this.newPermission = {};
        },
        addPermission(){
            this.$refs.newPermission.validate((valid)=>{
                if(valid){
                    this.post(this.$apis.addNewPersmission,this.newPermission).then((resp)=>{
                        console.log(resp);
                        this.Refresh()
                    })
                }
            })
        },
        remove(node, data) {
            console.log(data)
            var action = ()=>{
                if(data.children){
                    for(let i =0;i<data.children.length;i++){
                        this.post(this.$apis.deletePermission,{_id:data.children[i]._id})
                    }
                }
    
                this.post(this.$apis.deletePermission,data).then((resp)=>{
                    console.log(resp)
                })
            }
            this.operatorConfirm('删除'+data.permissionDesc,action)
        },

        renderContent(h, { node, data, store }) {
            return (
            <span style="flex: 1; display: flex; align-items: center; justify-content: space-between; font-size: 14px; padding-right: 8px;">
                <span>
                <span>{node.label}</span>
                </span>
                <span>
                <el-button style="font-size: 12px;" type="text" on-click={ () => this.remove(node, data) }>Delete</el-button>
                </span>
            </span>);
        }
    },
    computed: {
        ...mapGetters(['allPermission'])
    }
}
</script>

<style lang="scss" scoped>
    #PermissionManage{
        width: 100%;
        height: 100%;
        padding: 10px;
        box-sizing: border-box;
        position: relative;
    }
    #view{
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        background: white;
        padding: 10px
    }

</style>

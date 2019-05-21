<template>
    <div id="RoleManage">
        <jg-table width="60%" title="角色管理">
            <template slot="jgTable-head">
                <el-button type="primary" size="mini">新增角色</el-button>
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
                    <el-button type="primary" size="mini">编辑</el-button>
                    <el-button type="danger" size="mini">删除</el-button>
                    </el-table-column>
                </el-table>
            </template>
        </jg-table>
    </div>
</template>

<script>
export default {
    data(){
        return {
            allRoles: []
        }
    },
    mounted(){
        this.$http.get(this.$apis.findAllRoles).then((resp)=>{
            console.log(resp);
            this.allRoles = resp.data.allRoles
        })
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

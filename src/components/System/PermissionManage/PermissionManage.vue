<template>
    <div id="PermissionManage">
        <jg-table width="60%" title="权限管理">
            <template slot="jgTable-head">
                <el-button type="primary" size="mini" @click="dialogVisible=true">新增权限</el-button>
            </template>
            <template slot="jgTable-content">

            </template>
        </jg-table>
    </div>
</template>

<script>
import {mapGetters} from 'vuex'
export default {
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
        box-sizing: border-box  
    }
</style>

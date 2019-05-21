import Vue from 'vue';
Vue.mixin({
    methods : {
        pushView(item){
            this.$router.push({path:item.path,name:item.name,query:item.query,params:item.params})
        },
        operatorConfirm(message,action){
            return this.$confirm('您确定要'+message+"么？", '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'danger'
            }).then(() => {
                return action();
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '取消'+message
                });          
            });
        }
    }
})
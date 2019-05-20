import Vue from 'vue';
Vue.mixin({
    methods : {
        pushView(item){
            this.$router.push({path:item.path,name:item.name,query:item.query,params:item.params})
        },
        
    }
})
<template>
    <div id="lotterygame">
        lotterygame
    </div>
</template>

<script>
export default {
    data () {
        return {
            gamelist:[],
            total : ''
        }
    },
    mounted () {
        console.log(this.$route.query);
        this.$http.get(this.$apis.findByGameName,{gameName:this.$route.query,pageNo:1,pageSize:10}).then((resp)=>{
            console.log(resp);
            this.gamelist = resp.data.data.data
            this.total = resp.data.total
        })
    }
}
</script>

<style lang="scss" scoped>
    #lotterygame{
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        background: lightgreen
    }
</style>

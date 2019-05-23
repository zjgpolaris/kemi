<template>
    <div id="lotterygame">
        <table border="1" cellspacing="0">
            <tr>
                <td>旗号</td>
                <td v-for="(item,index) in 49" :key="index+'蓝球'">{{item<10?'0'+item:item}}</td>
                <td v-for="(item,index) in 7" :key="index+'红球'">{{'0'+item}}</td>
            </tr>
            <tr v-for="(item,index) in gamelist" :key="index+'旗号'">
                <td>{{item.period}}</td>
                <td v-for="(item,index) in item.missNumber.general" :key="index+'lan'">{{item}}</td>
                <td v-for="(item,index) in item.winnerNumber" :key="index+'lan'">{{item}}</td>
            </tr>
        </table>
        <el-pagination
        background
        layout="prev, pager, next"
        :total="1000">
        </el-pagination>
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
        this.$http.get(this.$apis.findByGameName,{gameName:this.$route.query,pageNo:1,pageSize:20}).then((resp)=>{
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
        background: white;
        overflow: auto
    }
</style>

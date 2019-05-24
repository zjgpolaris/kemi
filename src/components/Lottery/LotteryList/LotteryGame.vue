<template>
    <div id="lotterygame">
        <table border="1" cellspacing="0" style="text-align:center">
            <tr>
                <td>旗号</td>
                <td v-for="(item,index) in 33" :key="index+'蓝球'">{{item>=10?item:'0'+item}}</td>
                <td v-for="(item,index) in 16" :key="index+'红球'">{{item>=10?item:'0'+item}}</td>
            </tr>
            <tr v-for="(item,index) in gamelist" :key="index+'旗号'">
                <td>{{item.period}}</td>
                <td v-for="(val,index) in item.missNumber.general" :key="index+'全'"
                    :class="[index+1>33?val>0?'':'blue':val>0?'':'red']"
                >{{val>0?val:index+1>33?index+1-33:index+1}}</td>
            </tr>
        </table>
        <el-pagination
        background
        layout="prev, pager, next"
        @current-change="loadMore"
        :page-size = pageSize
        :total="total">
        </el-pagination>
    </div>
</template>

<script>
export default {
    data () {
        return {
            gamelist:[],
            total : 0,
            num :0,
            pageSize:20
        }
    },
    methods: {
      loadMore(pageNo){
          this.$http.get(this.$apis.findByGameName,{gameName:this.$route.query,pageNo:pageNo,pageSize:20}).then((resp)=>{
            console.log(resp);
            this.gamelist = resp.data.data.data
            this.total = resp.data.total
        })
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
        overflow: auto;
        padding: 10px;
        box-sizing: border-box;
    }
    table tr:first-child{
        background: lightcoral
    }
    .red{
        background: url(http://img3.imgtn.bdimg.com/it/u=343864881,3091840116&fm=26&gp=0.jpg) no-repeat;
        background-size:23px;
    }
    .blue{
        background: url(http://img0.imgtn.bdimg.com/it/u=2174689914,946910442&fm=26&gp=0.jpg) no-repeat -2px -3px;
        background-size: 27px;
    }
</style>

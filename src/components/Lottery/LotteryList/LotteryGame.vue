<template>
    <div id="lotterygame">
        <table border="1" cellspacing="0" style="text-align:center" ref="dataTable">
            <tr>
                <td>旗号</td>
                <td v-for="(item,index) in 33" :key="index+'蓝球'">{{item>=10?item:'0'+item}}</td>
                <td v-for="(item,index) in 16" :key="index+'红球'">{{item>=10?item:'0'+item}}</td>
            </tr>
            <tr v-for="(item,index) in gamelist" :key="index+'旗号'">
                <td>{{item.period}}</td>
                <td v-for="(val,index) in item.missNumber.general" :key="index+'全'"
                    :class="[index+1>33?val>0?'':'blue':val>0?'':'red']"
                    :ref="[index+1>33?val>0?'':'blue':val>0?'':'red']"
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
        <canvas id="canvas" ref="canvas"></canvas>
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
      },
      lineToAllBlue(){
                /*
                    this.$refs.canvas: 获取画布元素
                    this.$refs.dataTable: 获取表格
                */
                var canvas = this.$refs.canvas;
                var dataTable = this.$refs.dataTable;
                // 设置画布的宽高等于dataTable的宽高
                canvas.width = dataTable.clientWidth;
                canvas.height = dataTable.clientHeight;
                // 设置画布的定位
                canvas.style.position = "absolute";
                // 设置画布和顶部的距离,+19px的原因是首行的高度
                canvas.style.top = dataTable.offsetTop+19+'px';
                //创建2d绘图工具
                var context = canvas.getContext('2d');
                // 获取所有存储在this.$refs对象中的篮球选项
                var blueBalls = this.$refs['blue'];
                // 遍历所有的蓝球选项
                    for(var i=0;i<blueBalls.length;i++){
                        // 获取蓝球的坐标x轴和y轴
                        var x = blueBalls[i].offsetLeft+15;
                        var y = blueBalls[i].offsetTop-10;
                        // 如果i=0,代表的是第一行,那就是作为线条的起点
                        if(i==0){
                            // 将笔触移动到该位置上
                            context.moveTo(x,y);
                        }else{
                            // 开始对每一个篮球进行前后连线
                            context.lineTo(x,y)
                        }
                    }
                    // 设置连线的颜色
                    context.strokeStyle = "blue";
                    //设置线条的宽度
                    context.lineWidth = 1;
                    //绘制路径(显示线条)
                    context.stroke();
                
            }  
    },
    mounted () {
        console.log(this.$route.query);
        this.$http.get(this.$apis.findByGameName,{gameName:this.$route.query,pageNo:1,pageSize:20}).then((resp)=>{
            console.log(resp);
            this.gamelist = resp.data.data.data
            this.total = resp.data.total
        })
    },
    updated(){
            // 在界面的内容发生变化之后,再对篮球进行连线
            // 否则篮球还没有出来,连线的函数就已经执行完
            // 导致连线失败
            var _this = this
            setTimeout(()=>{
                _this.lineToAllBlue();
            },30)
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

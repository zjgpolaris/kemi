<template>
    <div id="LotteryNews">
        <div class="icon" v-for="(item,index) in games" :key="index" @click="goToLottery(item)">
            <img :src="item.icon2" alt="">
        </div>
        <div class="addgame el-icon-plus" @click="dialogVisible=true"></div>
        <el-dialog
        title="新增彩票"
        :visible.sync="dialogVisible"
        width="30%"
        :before-close="handleClose">
            <el-form ref="addNewGame" status-icon :rules="rules" :model="addNewGame" label-width="100px">
                <el-form-item label="彩票英文名" prop="en">
                    <el-input v-model="addNewGame.en"></el-input>
                </el-form-item>
                <el-form-item label="彩票中文名" prop="cn">
                    <el-input v-model="addNewGame.cn"></el-input>
                </el-form-item>
                <el-form-item label="small-icons">
                    <span  class="upload">
                        <i class="el-icon-plus add"></i>
                        <input type="file" @change="getFile($event,1)">
                    </span>
                </el-form-item>
                <el-form-item label="big-icons">
                    <span  class="upload">
                        <span class="el-icon-plus add"></span>
                        <input type="file" @change="getFile($event,2)">
                    </span>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="submitForm($event)">确 定</el-button>
            </span>
        </el-dialog>
        <transition 
        enter-active-class="animated rotateInUpLeft"
        leave-active-class="animated bounceOutRight"
        >
            <router-view></router-view>
        </transition>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    data () {
        return {
            list : [],
            games : [],
            dialogVisible : false,
            addNewGame : {
                en : '',
                cn : '',
                file : []
            },
            rules : {
                en : [
                    {required:true,message:'英文名不能为空',trigger:'blur'}
                ],
                cn : [
                    {required:true,message:'中文名不能为空',trigger:'blur'}
                ]
            } 
        }
    },
    methods: {
        goToLottery(item){
            console.log(item)
            this.pushView({name:'LotteryGame',query:item.en})
        },
        handleClose(done) {
            this.$confirm('确认关闭？')
            .then(_ => {
                done();
            })
            .catch(_ => {});
        },
        getFile(event,num) {
            console.log(event.target.files)
            if(num==1){
                this.addNewGame.file[0]=event.target.files[0]
            }else if(num==2){
                this.addNewGame.file[1]=event.target.files[0]
            }
            console.log(this.addNewGame.file);
        },
        submitForm(event) {
            event.preventDefault();
            this.$refs.addNewGame.validate((valid)=>{
                if(valid){
                    let formData = new FormData();
                    formData.append('en', this.addNewGame.en);
                    formData.append('cn', this.addNewGame.cn);
                    for(var i=0;i<this.addNewGame.file.length;i++){
                        formData.append('file', this.addNewGame.file[i]);
                    }
        
                    let config = {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                    }
                    var url = process.env.VUE_APP_BaseURL.slice(0,-1) + this.$apis.addNewGame
                    console.log(url);
                    console.log(axios)
                    axios.post(url,formData,config).then((resp)=>{
                        console.log(resp)
                    })
                }else{
                    return false
                }
            })
        }
    },
    mounted () {
        this.$http.get(this.$apis.findAllGames).then((resp)=>{
            this.list = resp.data.data;
            var baseUrl = process.env.VUE_APP_BaseURL.slice(0,-1)
            this.games = this.list[0].games;
            for(var i=0;i<this.games.length;i++){
                this.games[i].icon = baseUrl + this.games[i].icon;
                this.games[i].icon2 = baseUrl + this.games[i].icon2;
            }
        })
    }
}
</script>

<style lang="scss" scoped>
    #LotteryNews{
        width: 100%;
        height: 100%;
        padding: 20px;
        box-sizing: border-box;
        display: flex;
        position: relative;
        .icon{
            width: 80px;
            height: 80px;
            border-radius: 50%;
            border: 1px solid lightgray;
            margin-right: 20px;
            overflow: hidden;
            img{
                width: 100%;
            }
        }
        .addgame{
            width: 80px;
            height: 80px;
            text-align: center;
            line-height: 80px;
            border-radius: 5px;
            border: 1px dashed #000;
            font-size: 25px
        }
        .upload{
            position: relative;
            display: inline-block;
            overflow: hidden;
            border: 1px dashed black;
            input{
                position:absolute;
                right: 0;
                top: 0;
                bottom: 0;
                left: 0;
                opacity: 0;
            }
        }
        .add{
            display: block;
            width: 40px;
            height: 40px;
            line-height: 40px;
            text-align: center
        }
        
    }
</style>

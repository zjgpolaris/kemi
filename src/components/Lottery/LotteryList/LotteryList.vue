<template>
    <div id="LotteryNews">
        <div class="icon" v-for="(item,index) in games" :key="index" @click="goToLottery(item)">
            <img :src="item.icon" alt="">
        </div>
        <div class="addgame el-icon-plus" @click="dialogVisible=true"></div>
        <el-dialog
        title="新增彩票"
        :visible.sync="dialogVisible"
        width="30%"
        :before-close="handleClose">
            <el-form ref="addNewGame" :model="addNewGame" label-width="100px">
                <el-form-item label="彩票英文名">
                    <el-input v-model="addNewGame.en"></el-input>
                </el-form-item>
                <el-form-item label="彩票中文名">
                    <el-input v-model="addNewGame.cn"></el-input>
                </el-form-item>
                <el-form-item label="small-icons">
                    <el-upload
                    class="avatar-uploader"
                    action="http://localhost:3000/public/images/"
                    :show-file-list="false"
                    :on-success="handleAvatarSuccess"
                    :before-upload="beforeAvatarUpload">
                    <img v-if="addNewGame.icon" :src="addNewGame.icon" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                </el-form-item>
                <el-form-item label="big-icons">
                    <el-upload
                    class="avatar-uploader2"
                    action="http://localhost:3000/public/images/"
                    :show-file-list="false"
                    :on-success="handleAvatarSuccess2"
                    :before-upload="beforeAvatarUpload2">
                    <img v-if="addNewGame.icon2" :src="addNewGame.icon2" class="avatar2">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
            </span>
        </el-dialog>
        <router-view></router-view>
    </div>
</template>

<script>
export default {
    data () {
        return {
            list : [],
            games : [],
            dialogVisible : false,
            addNewGame : {}, 
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
        handleAvatarSuccess(res, file) {
            this.imageUrl = URL.createObjectURL(file.raw);
        },
        beforeAvatarUpload(file) {
            const isJPG = file.type === 'image/jpeg';
            const isLt2M = file.size / 40 / 40 < 2;

            if (!isJPG) {
            this.$message.error('上传头像图片只能是 JPG 格式!');
            }
            if (!isLt2M) {
            this.$message.error('上传头像图片大小不能超过 2MB!');
            }
            return isJPG && isLt2M;
        },
        handleAvatarSuccess2(res, file) {
            this.imageUrl = URL.createObjectURL(file.raw);
        },
        beforeAvatarUpload2(file) {
            const isJPG = file.type === 'image/jpeg';
            const isLt2M = file.size / 80 / 80 < 2;

            if (!isJPG) {
            this.$message.error('上传头像图片只能是 JPG 格式!');
            }
            if (!isLt2M) {
            this.$message.error('上传头像图片大小不能超过 2MB!');
            }
            return isJPG && isLt2M;
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
    }
    .avatar-uploader  {
        border: 1px dashed #000;
        width: 40px;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }
    .avatar-uploader .el-upload:hover {
        border-color: #409EFF;
    }
    .avatar-uploader-icon {
        font-size: 20px;
        color: #8c939d;
        width: 40px;
        height: 40px;
        line-height: 40px;
        text-align: center;
    }
    .avatar {
        width: 40px;
        height: 40px;
        display: block;
    }
    .avatar-uploader2  {
        border: 1px dashed #000;
        width: 80px;
        height: 80px;
        text-align: center;
        line-height: 80px;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }
    .avatar-uploader2 .el-upload2:hover {
        border-color: #409EFF;
    }
    .avatar-uploader-icon:last-child {
        font-size: 30px;
        color: #8c939d;
        width: 80px;
        height: 80px;
        line-height: 80px;
        text-align: center;
    }
    .avatar2 {
        width: 80px;
        height: 80px;
        display: block;
    }
</style>

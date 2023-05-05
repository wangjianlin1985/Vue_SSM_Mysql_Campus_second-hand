<template>
    <div id="oldLevel">
        <nav-bar class="nav">
            <template v-slot:left><van-icon name="arrow-left" size="25"  @click.stop="back" /></template>
            <template v-slot:center>编辑新旧程度</template>
            <template v-slot:right></template>
        </nav-bar>

        <scroll class="content" top="1" bottom="50" ref="scroll" style="padding: 0px 5px">
            <van-form @submit="onSubmit">
                <van-field readonly name="oldLevel.levelId" v-model="levelId" label="新旧程度id：" placeholder="请输入新旧程度id" :rules="[{ required: true, message: '请填写新旧程度id' }]" />
                <van-field autosize clearable name="oldLevel.levelName" v-model="levelName" label="新旧程度名称：" placeholder="请输入新旧程度名称" :rules="[{ required: true, message: '请填写新旧程度名称' }]" />
                <div style="margin: 16px;">
                    <van-button round block type="info" native-type="submit">更新</van-button>
                </div>
            </van-form>
        </scroll>
    </div>
</template>

<script>
    import NavBar from '../../components/common/navbar/NavBar'
    import Scroll from '../../components/common/scroll/Scroll'
    import { updateOldLevel} from "../../network/OldLevel";
    import { getOldLevel } from "../../network/OldLevel";
    export default {
        name: "OldLevelAdd",
        components: {
            NavBar,
            Scroll,
        },
        data() {
            return {
                levelId: "",  //新旧程度id
                levelName: "", //新旧程度名称
            }
        },

        mounted() {

        },

        created() {
            this.levelId = this.$route.params.levelId;  //接收新旧程度id参数
            //向后端请求单条新旧程度记录
            getOldLevel(this.levelId).then(res => {
                var oldLevel = res.data;
                this.levelId = oldLevel.levelId; //新旧程度id
                this.levelName = oldLevel.levelName;  //新旧程度名称
            })
            document.getElementById("tabbar").style.display = "flex";
        },

        methods: {
            back() {
                this.$router.go(-1);
            },

            onSubmit(oldLevel) {  //向后台请求更新新旧程度
                updateOldLevel(oldLevel).then(res => {
                    console.log(res)
                    this.$notify.success('更新成功~')
                }).catch(error => { this.$notify.error(error)})
            },
        },
    }
</script>

<style scoped>
    .nav {
        background-color: #54bf8e;
        color: #fff;
    }

    .back {
        font-family: 'icomoon';
        font-size: 30px;
    }

    #oldLevel {
        height: 100vh;
        width: 100vw;
        position: relative;
    }

    .content {
        position: fixed;
        top: 50px;
        left: 0;
        right: 0px;
        bottom: 49px;
    }

    .van-dropdown-menu {  width: 100%; }

    .avatar {
        width: 100px;
        height: 100px;
        background-color: #f3f3f3;
        float: left;
        top: 5px;
        right: 5px;
        border-radius: 3px;
       margin-bottom: 26px;
    }
</style>


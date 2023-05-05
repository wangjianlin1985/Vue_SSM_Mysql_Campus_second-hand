<template>
    <div id="notice">
        <nav-bar class="nav">
            <template v-slot:left><van-icon name="arrow-left" size="25"  @click.stop="back" /></template>
            <template v-slot:center>编辑新闻公告</template>
            <template v-slot:right></template>
        </nav-bar>

        <scroll class="content" top="1" bottom="50" ref="scroll" style="padding: 0px 5px">
            <van-form @submit="onSubmit">
                <van-field readonly name="notice.noticeId" v-model="noticeId" label="公告id：" placeholder="请输入公告id" :rules="[{ required: true, message: '请填写公告id' }]" />
                <van-field autosize clearable name="notice.title" v-model="title" label="标题：" placeholder="请输入标题" :rules="[{ required: true, message: '请填写标题' }]" />
                <div class="van-cell van-field" style="pointer-events: auto;">
                    <div class="van-cell__title van-field__label"><span>公告内容：</span></div>
                    <div class="van-cell__value van-field__value">
                        <div class="van-field__body"></div>
                    </div>
                </div>
                <van-field  v-show="false" name="notice.content" v-model="content" rows="5" label="公告内容" type="textarea" maxlength="8000"  placeholder="请输入公告内容" show-word-limit />
                <VueUeditorWrap  v-model="content" :config="editorConfig" />
                <van-field readonly name="notice.publishDate" label="发布时间" :value="publishDate"   placeholder="选择发布时间" @click="showPublishDatePicker = true" :rules="[{ required: true, message: '发布时间' }]">
                    <template #button>
                        <van-button size="small" type="warning" @click.stop="clearPublishDate">清除</van-button>
                    </template>
                </van-field>
                <van-datetime-picker v-if="showPublishDatePicker"  v-model="picker_publishDate" type="date" @cancel="showPublishDatePicker = false" title="选择发布时间" @confirm="onConfirmPublishDate" />
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
    import VueUeditorWrap from 'vue-ueditor-wrap'
    import { updateNotice} from "../../network/Notice";
    import { getNotice } from "../../network/Notice";
    export default {
        name: "NoticeAdd",
        components: {
            NavBar,
            Scroll,
            VueUeditorWrap
        },
        data() {
            return {
                noticeId: "",  //公告id
                title: "", //标题
                content: "", //公告内容
                showPublishDatePicker:false, //是否显示发布时间Picker
                publishDate: '', //发布时间
                picker_publishDate: new Date(), //发布时间Picker的日期
                // 简单配置
                editorConfig: {
                    // 编辑器不自动被内容撑高
                    autoHeightEnabled: false,
                    // 初始容器高度
                    initialFrameHeight: 280,
                    // 初始容器宽度
                    initialFrameWidth: '100%',
                    // 上传文件接口
                    //serverUrl: 'http://localhost:8080/JavaWebProject/ueditor1_4_3/jsp/controller.jsp',
                }
            }
        },

        mounted() {

        },

        created() {
            this.noticeId = this.$route.params.noticeId;  //接收公告id参数
            //向后端请求单条新闻公告记录
            getNotice(this.noticeId).then(res => {
                var notice = res.data;
                this.noticeId = notice.noticeId; //公告id
                this.title = notice.title;  //标题
                this.content = notice.content;  //公告内容
                this.publishDate = notice.publishDate; //发布时间
                this.picker_publishDate = new Date(this.publishDate.replace(/-/g, '/'))
            })
            document.getElementById("tabbar").style.display = "flex";
        },

        methods: {
            back() {
                this.$router.go(-1);
            },

            onSubmit(notice) {  //向后台请求更新新闻公告
                updateNotice(notice).then(res => {
                    console.log(res)
                    this.$notify.success('更新成功~')
                }).catch(error => { this.$notify.error(error)})
            },
            onConfirmPublishDate(value) {  //选中某个发布时间后的响应
                var year = value.getFullYear();
                var month = (value.getMonth()+1)<10?'0'+ (value.getMonth()+1): (value.getMonth()+1);
                var day = value.getDate()<10?'0'+value.getDate():value.getDate();
                this.publishDate = year + "-" +  month + "-" + day ;
                this.showPublishDatePicker = false;
            },
            clearPublishDate() { //清空发布时间
                this.publishDate='';
                this.showPublishDatePicker=false;
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

    #notice {
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


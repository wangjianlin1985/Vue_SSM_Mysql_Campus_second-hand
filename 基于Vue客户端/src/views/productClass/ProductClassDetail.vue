<template>
    <div id="productClass">
        <nav-bar class="nav">
            <template v-slot:left><van-icon name="arrow-left" size="25"  @click.stop="back" /></template>
            <template v-slot:center>商品类别详情</template>
            <template v-slot:right></template>
        </nav-bar>

        <scroll class="content" top="1" bottom="50" ref="scroll" style="padding: 0px 5px">
            <div class="main-box">
                <div class="info-bar">
                    <span class="title2">&nbsp;类别id：</span>
                    <span class="title3">{{classId}}</span>
                </div>
                <div class="info-bar">
                    <span class="title2">&nbsp;类别名称：</span>
                    <span class="title3">{{className}}</span>
                </div>
                <div class="info-bar">
                    <span class="title2">&nbsp;类别描述：</span>
                    <span class="title3">{{classDesc}}</span>
                </div>
            </div>
            <div style="margin: 16px;">
                <van-button round block type="info" native-type="submit" @click.stop="back">返回</van-button>
            </div>

        </scroll>
    </div>
</template>

<script>
    import NavBar from '../../components/common/navbar/NavBar'
    import Scroll from '../../components/common/scroll/Scroll'
    import { getProductClass } from "../../network/ProductClass";

    export default {
        name: "ProductClassDetail",
        components: {
            NavBar,
            Scroll,
        },
        data() {
            return {
                classId: "", //类别id
                className: "", //类别名称
                classDesc: "", //类别描述
            }
        },
        created() {
            this.classId = this.$route.params.classId; //接收到的类别id
            //向后端请求单条商品类别记录
            getProductClass(this.classId).then(res => {
                var productClass = res.data;
                this.className = productClass.className;
                this.classDesc = productClass.classDesc;
            })
          document.getElementById("tabbar").style.display = "flex";
        },
        methods: {
            back() {
                this.$router.replace('/productClass/list')
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

    #productClass {
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

    .header {
        background-color: #fff;
        position: relative;
        padding: 0 15px;
        padding-bottom: 10px;
        overflow-x: scroll;
        box-shadow: 0 1px 6px rgba(0, 0, 0, .08);
    }

    .header p{
        margin-top: 40px;
        color: #3c3c3c;
        line-height: 25px;
        text-indent: 25px;
    }

    .main-box {
        background-color: #fff;
        margin: 10px 0;
        box-shadow: 0 1px 6px rgba(0, 0, 0, .08);
    }

    .info-bar {
        height: auto;
        border-bottom: 1px solid #f3f3f3;
        padding: 0 15px;
        display: block;
        clear:both;
    }

    .title2 {
        width:35%;
        line-height: 46px;
        font-weight: 600;
        font-family: 'icomoon';
    }

    .title3 {
        width: auto;
        height: 100%;
        text-align: right;
        line-height: 46px;
        color: #3c3c3c;
        float: right;
    }

    .desc {
        width: 100%;
        line-height: 25px;
        color: #3c3c3c;
        clear:both;
    }

    .avatar {
        width: 100px;
        height: 100px;
        background-color: #f3f3f3;
        border-radius: 3px;
    }
</style>

<template>
    <div id="productClass">
        <nav-bar class="nav">
            <template v-slot:left><van-icon name="arrow-left" size="25"  @click.stop="back" /></template>
            <template v-slot:center>添加商品类别</template>
            <template v-slot:right></template>
        </nav-bar>

        <scroll class="content" top="1" bottom="50" ref="scroll" style="padding: 0px 5px">
            <van-form @submit="onSubmit">
                <van-field autosize clearable name="productClass.className" v-model="className" label="类别名称：" placeholder="请输入类别名称" :rules="[{ required: true, message: '请填写类别名称' }]" />
                <van-field autosize clearable name="productClass.classDesc" v-model="classDesc" label="类别描述：" placeholder="请输入类别描述" :rules="[{ required: true, message: '请填写类别描述' }]" />
                <div style="margin: 16px;">
                    <van-button round block type="info" native-type="submit">提交</van-button>
                </div>
            </van-form>
        </scroll>
    </div>
</template>

<script>
    import NavBar from '../../components/common/navbar/NavBar'
    import Scroll from '../../components/common/scroll/Scroll'
    import { addProductClass} from "../../network/ProductClass";

    export default {
        name: "ProductClassAdd",
        components: {
            NavBar,
            Scroll,
        },
        data() {
            return {
                className: "", //类别名称
                classDesc: "", //类别描述
            }
        },

        mounted() {

        },

        created() {
            document.getElementById("tabbar").style.display = "flex";
        },

        methods: {
            back() {
                this.$router.go(-1);
            },

            onSubmit(productClass) {  //向后台请求添加商品类别
                addProductClass(productClass).then(res => {
                    console.log(res)
                    this.$notify.success('添加成功~')
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

    .van-dropdown-menu {  width: 100%; }

</style>

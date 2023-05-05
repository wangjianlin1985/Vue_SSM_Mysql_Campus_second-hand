<template>
    <div id="priceRegion">
        <nav-bar class="nav">
            <template v-slot:left><van-icon name="arrow-left" size="25"  @click.stop="back" /></template>
            <template v-slot:center>编辑价格区间</template>
            <template v-slot:right></template>
        </nav-bar>

        <scroll class="content" top="1" bottom="50" ref="scroll" style="padding: 0px 5px">
            <van-form @submit="onSubmit">
                <van-field readonly name="priceRegion.regionId" v-model="regionId" label="区间id：" placeholder="请输入区间id" :rules="[{ required: true, message: '请填写区间id' }]" />
                <van-field autosize clearable name="priceRegion.regionName" v-model="regionName" label="区间名称：" placeholder="请输入区间名称" :rules="[{ required: true, message: '请填写区间名称' }]" />
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
    import { updatePriceRegion} from "../../network/PriceRegion";
    import { getPriceRegion } from "../../network/PriceRegion";
    export default {
        name: "PriceRegionAdd",
        components: {
            NavBar,
            Scroll,
        },
        data() {
            return {
                regionId: "",  //区间id
                regionName: "", //区间名称
            }
        },

        mounted() {

        },

        created() {
            this.regionId = this.$route.params.regionId;  //接收区间id参数
            //向后端请求单条价格区间记录
            getPriceRegion(this.regionId).then(res => {
                var priceRegion = res.data;
                this.regionId = priceRegion.regionId; //区间id
                this.regionName = priceRegion.regionName;  //区间名称
            })
            document.getElementById("tabbar").style.display = "flex";
        },

        methods: {
            back() {
                this.$router.go(-1);
            },

            onSubmit(priceRegion) {  //向后台请求更新价格区间
                updatePriceRegion(priceRegion).then(res => {
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

    #priceRegion {
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


<template>
    <div id="priceRegion">
        <van-popup v-model="showQueryPriceRegionForm"  closeable position="top" :style="{ height: 'auto' }">
            <div class="priceRegionQueryForm">
                <h3>价格区间查询</h3>
                <div class="queryBtn">
                    <van-button round  size= small type="primary" @click="queryPriceRegion">查询</van-button>
                </div>
            </div>
        </van-popup>

        <nav-bar class="nav" ref="nav" >
            <template v-slot:left><van-icon name="plus" size="25" v-show="false" @click.stop="priceRegionAdd" /></template>
            <template v-slot:center>价格区间列表</template>
            <template v-slot:right><van-icon name="search" size="25"  @click.stop="showQueryPriceRegionForm=true" /></template>
        </nav-bar>

        <scroll class="content" top="1" bottom="50" ref="scroll" :isPullDown="true" @pullingDown="pullingDown" :isPullUp="true" @pullingUp="pullingUp"  @iscroll="contentScroll">
            <div class="ignore-pull-down1" ref="pull" v-show="pullFlag">下拉更新</div>
            <div class="ignore-pull-down2" ref="pull" v-show="!pullFlag">
                <span class="ball1"></span><span class="ball2"></span><span class="ball3"></span>
            </div>
            <div class="priceRegionList">
                <template v-for="priceRegion in priceRegionList">
                    <div class="priceRegionItem" :key="priceRegion.regionId" @click.stop="priceRegionDetailClick(`${priceRegion.regionId}`)">
                        <div class="content_view">
                            <div class="priceRegionText">
                                <div>区间id：{{priceRegion.regionId}}</div>
                                <div>区间名称：{{priceRegion.regionName}}</div>
                            </div>
                        </div>
                        <div class="opt_view" v-show="false">
                            <van-button round  size= small type="primary"  @click.stop="priceRegionEditClick(`${priceRegion.regionId}`)" >编辑</van-button>
                            <van-button round  size= small type="warning" @click.stop="priceRegionDeleteClick(`${priceRegion.regionId}`)" style="margin-left:10px;">删除</van-button>
                        </div>
                    </div>
                </template>
            </div>
            <div class="block"></div>
        </scroll>
        <return-top @returnTop="returnTop" v-show="isReturnTop"></return-top>
    </div>
</template>

<script>
    import NavBar from '../../components/common/navbar/NavBar'
    import Scroll from '../../components/common/scroll/Scroll'
    import ReturnTop from '../../components/common/returntop/ReturnTop'

    import {queryPriceRegion,deletePriceRegion} from '../../network/PriceRegion'
    export default {
        name: 'PriceRegionList',
        components: {
            NavBar,
            Scroll,
            ReturnTop
        },
        data() {
            return {
                priceRegionList: [],  //界面需要展示的价格区间列表数据

                pullFlag: true,  //是否允许下拉刷新标志
                page: 1, //默认显示结果第1页
                showQueryPriceRegionForm: false, //是否显示查询价格区间表单
                isReturnTop: false,
            }
        },

        created() {
            //查询价格区间信息
            this.priceRegionQuery("");
            document.getElementById("tabbar").style.display = "flex";
        },

        methods: {
            priceRegionAdd() {
                this.$router.push('/priceRegion/add');  //打开价格区间添加页面
            },

            queryPriceRegion() {
                this.page = 1;
                this.priceRegionList = [];
                this.pullFlag = false;
                this.showQueryPriceRegionForm = false;
                this.priceRegionQuery("QUERY");
            },

            priceRegionQuery(action) {
                queryPriceRegion(this.page).then(res => {
                    //this.priceRegionList.push(...res.data)
                    this.priceRegionList = this.priceRegionList.concat(res.data.list)
                    if(action == "QUERY") {
                        this.$notify.success('查询成功~');
                        this.$refs.scroll.refresh();
                    }
                    if(action == "UP") {  //上拉加载操作
                        if(res.data.list.length < 10){
                            this.$notify.error('没有更多数据了~')
                            return;
                        }
                        this.$refs.scroll.refresh();
                    }
                    if(action == "DOWN") {  //下拉刷新操作
                        this.$notify.success('刷新成功~');
                        this.$refs.scroll.finishPullDown();
                        this.$refs.scroll.refresh();
                        this.pullFlag = true
                    }
                })
            },

            priceRegionDetailClick(regionId) {
                this.$router.push('/priceRegion/detail/' + regionId); //跳转到价格区间详情页
            },
            priceRegionEditClick(regionId) {
                this.$router.push('/priceRegion/modify/' + regionId); //跳转到价格区间修改页
            },
            priceRegionDeleteClick(regionId) {
                this.$dialog.confirm({
                    title: '删除价格区间:' + regionId,
                    message: '确定删除吗？'
                }).then(() => {
                    deletePriceRegion(regionId).then(res => {
                        console.log(res)
                        this.priceRegionList.forEach(function(priceRegion, index, arr) {
                            if(priceRegion.regionId == regionId) arr.splice(index, 1);
                        });
                    });
                });
            },

            pullingDown() {  //下拉刷新
                this.page = 1;
                this.priceRegionList = [];
                this.pullFlag = false;
                this.priceRegionQuery("DOWN");
            },

            pullingUp() {  //上拉加载
                console.log("上拉加载")
                this.page = this.page + 1;
                this.$refs.scroll.finishPullUp();
                this.priceRegionQuery("UP");
            },

            returnTop() {
                this.$refs.scroll.scrollTo(0, 0)
            },

            //滚动事件
            contentScroll(position) {
                this.isReturnTop = position.y < -800
            },
        }
    }
</script>

<style scoped>
    @import "../../assets/css/list_base.css";
    @import "PriceRegionList.css";
    #priceRegion {
        height: 100vh;
        width: 100vw;
        position: relative;
    }
</style>

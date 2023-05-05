<template>
    <div id="areaInfo">
        <van-popup v-model="showQueryAreaInfoForm"  closeable position="top" :style="{ height: 'auto' }">
            <div class="areaInfoQueryForm">
                <h3>所在区域查询</h3>
                <div class="queryBtn">
                    <van-button round  size= small type="primary" @click="queryAreaInfo">查询</van-button>
                </div>
            </div>
        </van-popup>

        <nav-bar class="nav" ref="nav" >
            <template v-slot:left><van-icon name="plus" size="25" v-show="false" @click.stop="areaInfoAdd" /></template>
            <template v-slot:center>所在区域列表</template>
            <template v-slot:right><van-icon name="search" size="25"  @click.stop="showQueryAreaInfoForm=true" /></template>
        </nav-bar>

        <scroll class="content" top="1" bottom="50" ref="scroll" :isPullDown="true" @pullingDown="pullingDown" :isPullUp="true" @pullingUp="pullingUp"  @iscroll="contentScroll">
            <div class="ignore-pull-down1" ref="pull" v-show="pullFlag">下拉更新</div>
            <div class="ignore-pull-down2" ref="pull" v-show="!pullFlag">
                <span class="ball1"></span><span class="ball2"></span><span class="ball3"></span>
            </div>
            <div class="areaInfoList">
                <template v-for="areaInfo in areaInfoList">
                    <div class="areaInfoItem" :key="areaInfo.areaId" @click.stop="areaInfoDetailClick(`${areaInfo.areaId}`)">
                        <div class="content_view">
                            <div class="areaInfoText">
                                <div>区域id：{{areaInfo.areaId}}</div>
                                <div>区域名称：{{areaInfo.areaName}}</div>
                            </div>
                        </div>
                        <div class="opt_view" v-show="false">
                            <van-button round  size= small type="primary"  @click.stop="areaInfoEditClick(`${areaInfo.areaId}`)" >编辑</van-button>
                            <van-button round  size= small type="warning" @click.stop="areaInfoDeleteClick(`${areaInfo.areaId}`)" style="margin-left:10px;">删除</van-button>
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

    import {queryAreaInfo,deleteAreaInfo} from '../../network/AreaInfo'
    export default {
        name: 'AreaInfoList',
        components: {
            NavBar,
            Scroll,
            ReturnTop
        },
        data() {
            return {
                areaInfoList: [],  //界面需要展示的所在区域列表数据

                pullFlag: true,  //是否允许下拉刷新标志
                page: 1, //默认显示结果第1页
                showQueryAreaInfoForm: false, //是否显示查询所在区域表单
                isReturnTop: false,
            }
        },

        created() {
            //查询所在区域信息
            this.areaInfoQuery("");
            document.getElementById("tabbar").style.display = "flex";
        },

        methods: {
            areaInfoAdd() {
                this.$router.push('/areaInfo/add');  //打开所在区域添加页面
            },

            queryAreaInfo() {
                this.page = 1;
                this.areaInfoList = [];
                this.pullFlag = false;
                this.showQueryAreaInfoForm = false;
                this.areaInfoQuery("QUERY");
            },

            areaInfoQuery(action) {
                queryAreaInfo(this.page).then(res => {
                    //this.areaInfoList.push(...res.data)
                    this.areaInfoList = this.areaInfoList.concat(res.data.list)
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

            areaInfoDetailClick(areaId) {
                this.$router.push('/areaInfo/detail/' + areaId); //跳转到所在区域详情页
            },
            areaInfoEditClick(areaId) {
                this.$router.push('/areaInfo/modify/' + areaId); //跳转到所在区域修改页
            },
            areaInfoDeleteClick(areaId) {
                this.$dialog.confirm({
                    title: '删除所在区域:' + areaId,
                    message: '确定删除吗？'
                }).then(() => {
                    deleteAreaInfo(areaId).then(res => {
                        console.log(res)
                        this.areaInfoList.forEach(function(areaInfo, index, arr) {
                            if(areaInfo.areaId == areaId) arr.splice(index, 1);
                        });
                    });
                });
            },

            pullingDown() {  //下拉刷新
                this.page = 1;
                this.areaInfoList = [];
                this.pullFlag = false;
                this.areaInfoQuery("DOWN");
            },

            pullingUp() {  //上拉加载
                console.log("上拉加载")
                this.page = this.page + 1;
                this.$refs.scroll.finishPullUp();
                this.areaInfoQuery("UP");
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
    @import "AreaInfoList.css";
    #areaInfo {
        height: 100vh;
        width: 100vw;
        position: relative;
    }
</style>

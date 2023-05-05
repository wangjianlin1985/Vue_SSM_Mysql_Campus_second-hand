<template>
    <div id="oldLevel">
        <van-popup v-model="showQueryOldLevelForm"  closeable position="top" :style="{ height: 'auto' }">
            <div class="oldLevelQueryForm">
                <h3>新旧程度查询</h3>
                <div class="queryBtn">
                    <van-button round  size= small type="primary" @click="queryOldLevel">查询</van-button>
                </div>
            </div>
        </van-popup>

        <nav-bar class="nav" ref="nav" >
            <template v-slot:left><van-icon name="plus" size="25" v-show="false" @click.stop="oldLevelAdd" /></template>
            <template v-slot:center>新旧程度列表</template>
            <template v-slot:right><van-icon name="search" size="25"  @click.stop="showQueryOldLevelForm=true" /></template>
        </nav-bar>

        <scroll class="content" top="1" bottom="50" ref="scroll" :isPullDown="true" @pullingDown="pullingDown" :isPullUp="true" @pullingUp="pullingUp"  @iscroll="contentScroll">
            <div class="ignore-pull-down1" ref="pull" v-show="pullFlag">下拉更新</div>
            <div class="ignore-pull-down2" ref="pull" v-show="!pullFlag">
                <span class="ball1"></span><span class="ball2"></span><span class="ball3"></span>
            </div>
            <div class="oldLevelList">
                <template v-for="oldLevel in oldLevelList">
                    <div class="oldLevelItem" :key="oldLevel.levelId" @click.stop="oldLevelDetailClick(`${oldLevel.levelId}`)">
                        <div class="content_view">
                            <div class="oldLevelText">
                                <div>新旧程度id：{{oldLevel.levelId}}</div>
                                <div>新旧程度名称：{{oldLevel.levelName}}</div>
                            </div>
                        </div>
                        <div class="opt_view" v-show="false">
                            <van-button round  size= small type="primary"  @click.stop="oldLevelEditClick(`${oldLevel.levelId}`)" >编辑</van-button>
                            <van-button round  size= small type="warning" @click.stop="oldLevelDeleteClick(`${oldLevel.levelId}`)" style="margin-left:10px;">删除</van-button>
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

    import {queryOldLevel,deleteOldLevel} from '../../network/OldLevel'
    export default {
        name: 'OldLevelList',
        components: {
            NavBar,
            Scroll,
            ReturnTop
        },
        data() {
            return {
                oldLevelList: [],  //界面需要展示的新旧程度列表数据

                pullFlag: true,  //是否允许下拉刷新标志
                page: 1, //默认显示结果第1页
                showQueryOldLevelForm: false, //是否显示查询新旧程度表单
                isReturnTop: false,
            }
        },

        created() {
            //查询新旧程度信息
            this.oldLevelQuery("");
            document.getElementById("tabbar").style.display = "flex";
        },

        methods: {
            oldLevelAdd() {
                this.$router.push('/oldLevel/add');  //打开新旧程度添加页面
            },

            queryOldLevel() {
                this.page = 1;
                this.oldLevelList = [];
                this.pullFlag = false;
                this.showQueryOldLevelForm = false;
                this.oldLevelQuery("QUERY");
            },

            oldLevelQuery(action) {
                queryOldLevel(this.page).then(res => {
                    //this.oldLevelList.push(...res.data)
                    this.oldLevelList = this.oldLevelList.concat(res.data.list)
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

            oldLevelDetailClick(levelId) {
                this.$router.push('/oldLevel/detail/' + levelId); //跳转到新旧程度详情页
            },
            oldLevelEditClick(levelId) {
                this.$router.push('/oldLevel/modify/' + levelId); //跳转到新旧程度修改页
            },
            oldLevelDeleteClick(levelId) {
                this.$dialog.confirm({
                    title: '删除新旧程度:' + levelId,
                    message: '确定删除吗？'
                }).then(() => {
                    deleteOldLevel(levelId).then(res => {
                        console.log(res)
                        this.oldLevelList.forEach(function(oldLevel, index, arr) {
                            if(oldLevel.levelId == levelId) arr.splice(index, 1);
                        });
                    });
                });
            },

            pullingDown() {  //下拉刷新
                this.page = 1;
                this.oldLevelList = [];
                this.pullFlag = false;
                this.oldLevelQuery("DOWN");
            },

            pullingUp() {  //上拉加载
                console.log("上拉加载")
                this.page = this.page + 1;
                this.$refs.scroll.finishPullUp();
                this.oldLevelQuery("UP");
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
    @import "OldLevelList.css";
    #oldLevel {
        height: 100vh;
        width: 100vw;
        position: relative;
    }
</style>

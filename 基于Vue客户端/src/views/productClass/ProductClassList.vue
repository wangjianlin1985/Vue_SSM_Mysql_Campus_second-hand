<template>
    <div id="productClass">
        <van-popup v-model="showQueryProductClassForm"  closeable position="top" :style="{ height: 'auto' }">
            <div class="productClassQueryForm">
                <h3>商品类别查询</h3>
                <div class="queryBtn">
                    <van-button round  size= small type="primary" @click="queryProductClass">查询</van-button>
                </div>
            </div>
        </van-popup>

        <nav-bar class="nav" ref="nav" >
            <template v-slot:left><van-icon name="plus" size="25" v-show="false" @click.stop="productClassAdd" /></template>
            <template v-slot:center>商品类别列表</template>
            <template v-slot:right><van-icon name="search" size="25"  @click.stop="showQueryProductClassForm=true" /></template>
        </nav-bar>

        <scroll class="content" top="1" bottom="50" ref="scroll" :isPullDown="true" @pullingDown="pullingDown" :isPullUp="true" @pullingUp="pullingUp"  @iscroll="contentScroll">
            <div class="ignore-pull-down1" ref="pull" v-show="pullFlag">下拉更新</div>
            <div class="ignore-pull-down2" ref="pull" v-show="!pullFlag">
                <span class="ball1"></span><span class="ball2"></span><span class="ball3"></span>
            </div>
            <div class="productClassList">
                <template v-for="productClass in productClassList">
                    <div class="productClassItem" :key="productClass.classId" @click.stop="productClassDetailClick(`${productClass.classId}`)">
                        <div class="content_view">
                            <div class="productClassText">
                                <div>类别id：{{productClass.classId}}</div>
                                <div>类别名称：{{productClass.className}}</div>
                            </div>
                        </div>
                        <div class="opt_view" v-show="false">
                            <van-button round  size= small type="primary"  @click.stop="productClassEditClick(`${productClass.classId}`)" >编辑</van-button>
                            <van-button round  size= small type="warning" @click.stop="productClassDeleteClick(`${productClass.classId}`)" style="margin-left:10px;">删除</van-button>
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

    import {queryProductClass,deleteProductClass} from '../../network/ProductClass'
    export default {
        name: 'ProductClassList',
        components: {
            NavBar,
            Scroll,
            ReturnTop
        },
        data() {
            return {
                productClassList: [],  //界面需要展示的商品类别列表数据

                pullFlag: true,  //是否允许下拉刷新标志
                page: 1, //默认显示结果第1页
                showQueryProductClassForm: false, //是否显示查询商品类别表单
                isReturnTop: false,
            }
        },

        created() {
            //查询商品类别信息
            this.productClassQuery("");
            document.getElementById("tabbar").style.display = "flex";
        },

        methods: {
            productClassAdd() {
                this.$router.push('/productClass/add');  //打开商品类别添加页面
            },

            queryProductClass() {
                this.page = 1;
                this.productClassList = [];
                this.pullFlag = false;
                this.showQueryProductClassForm = false;
                this.productClassQuery("QUERY");
            },

            productClassQuery(action) {
                queryProductClass(this.page).then(res => {
                    //this.productClassList.push(...res.data)
                    this.productClassList = this.productClassList.concat(res.data.list)
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

            productClassDetailClick(classId) {
                this.$router.push('/productClass/detail/' + classId); //跳转到商品类别详情页
            },
            productClassEditClick(classId) {
                this.$router.push('/productClass/modify/' + classId); //跳转到商品类别修改页
            },
            productClassDeleteClick(classId) {
                this.$dialog.confirm({
                    title: '删除商品类别:' + classId,
                    message: '确定删除吗？'
                }).then(() => {
                    deleteProductClass(classId).then(res => {
                        console.log(res)
                        this.productClassList.forEach(function(productClass, index, arr) {
                            if(productClass.classId == classId) arr.splice(index, 1);
                        });
                    });
                });
            },

            pullingDown() {  //下拉刷新
                this.page = 1;
                this.productClassList = [];
                this.pullFlag = false;
                this.productClassQuery("DOWN");
            },

            pullingUp() {  //上拉加载
                console.log("上拉加载")
                this.page = this.page + 1;
                this.$refs.scroll.finishPullUp();
                this.productClassQuery("UP");
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
    @import "ProductClassList.css";
    #productClass {
        height: 100vh;
        width: 100vw;
        position: relative;
    }
</style>

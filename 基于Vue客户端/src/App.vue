<template>  <div id="app">
    <keep-alive include="UserInfoList,ProductClassList,ProductList,PriceRegionList,OldLevelList,AreaInfoList,LeavewordList,NoticeList">
      <router-view></router-view>
    </keep-alive>
    <!-- tab-bar -->
    <main-tab-bar class="tab" v-show="this.show"></main-tab-bar>
  </div>
</template>

<script>
import MainTabBar from './components/content/mainTabBar/MainTabBar'

export default {
  name: 'App',
  components: {
    MainTabBar
  },
  data() {
    return {
      show: true,
      path: [ '/home',
              '/userInfo/list',
              '/productClass/list',
              '/product/list',
              '/priceRegion/list',
              '/oldLevel/list',
              '/areaInfo/list',
              '/leaveword/list',
              '/notice/list',
              '/profile'
            ]
    }
  },
  methods: {
  },
  watch: {
    $route() {
      if(this.path.indexOf(this.$route.path) != -1) {
        this.show = true
      }else {
        this.show = false
      }
    }
  },
  mounted() {
    console.log('Vue App Start ...')
  }
}
</script>

<style>
@import './assets/css/base.css';
@import './assets/css/resetVant.css';

#app {
  width: 100vw;
}

.tab {
  position: fixed;
  bottom: 0;
}
</style>

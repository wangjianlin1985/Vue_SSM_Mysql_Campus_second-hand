//前端路由代码
import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

/**
 * 重写路由的push方法
 */
// const routerPush = Router.prototype.push
// Router.prototype.push = function push(location) {
//     return routerPush.call(this, location).catch(error => error)
// }

const Home = () => import ('../views/home/Home') //引入首页组件页
const UserInfoList = () => import('../views/userInfo/UserInfoList.vue') //引入用户列表组件页
const UserInfoAdd = () => import('../views/userInfo/UserInfoAdd') //引入用户添加组件页
const UserInfoModify = () => import('../views/userInfo/UserInfoModify') //引入用户修改组件页
const UserInfoDetail = () => import('../views/userInfo/UserInfoDetail') //引入用户详情组件页

const ProductClassList = () => import('../views/productClass/ProductClassList.vue') //引入商品类别列表组件页
const ProductClassAdd = () => import('../views/productClass/ProductClassAdd') //引入商品类别添加组件页
const ProductClassModify = () => import('../views/productClass/ProductClassModify') //引入商品类别修改组件页
const ProductClassDetail = () => import('../views/productClass/ProductClassDetail') //引入商品类别详情组件页

const ProductList = () => import('../views/product/ProductList.vue') //引入商品列表组件页
const ProductUserList = () => import('../views/product/ProductUserList.vue') //引入商品列表组件页
const ProductAdd = () => import('../views/product/ProductAdd') //引入商品添加组件页
const ProductModify = () => import('../views/product/ProductModify') //引入商品修改组件页
const ProductDetail = () => import('../views/product/ProductDetail') //引入商品详情组件页

const PriceRegionList = () => import('../views/priceRegion/PriceRegionList.vue') //引入价格区间列表组件页
const PriceRegionAdd = () => import('../views/priceRegion/PriceRegionAdd') //引入价格区间添加组件页
const PriceRegionModify = () => import('../views/priceRegion/PriceRegionModify') //引入价格区间修改组件页
const PriceRegionDetail = () => import('../views/priceRegion/PriceRegionDetail') //引入价格区间详情组件页

const OldLevelList = () => import('../views/oldLevel/OldLevelList.vue') //引入新旧程度列表组件页
const OldLevelAdd = () => import('../views/oldLevel/OldLevelAdd') //引入新旧程度添加组件页
const OldLevelModify = () => import('../views/oldLevel/OldLevelModify') //引入新旧程度修改组件页
const OldLevelDetail = () => import('../views/oldLevel/OldLevelDetail') //引入新旧程度详情组件页

const AreaInfoList = () => import('../views/areaInfo/AreaInfoList.vue') //引入所在区域列表组件页
const AreaInfoAdd = () => import('../views/areaInfo/AreaInfoAdd') //引入所在区域添加组件页
const AreaInfoModify = () => import('../views/areaInfo/AreaInfoModify') //引入所在区域修改组件页
const AreaInfoDetail = () => import('../views/areaInfo/AreaInfoDetail') //引入所在区域详情组件页

const LeavewordList = () => import('../views/leaveword/LeavewordList.vue') //引入留言列表组件页
const LeavewordAdd = () => import('../views/leaveword/LeavewordAdd') //引入留言添加组件页
const LeavewordModify = () => import('../views/leaveword/LeavewordModify') //引入留言修改组件页
const LeavewordDetail = () => import('../views/leaveword/LeavewordDetail') //引入留言详情组件页

const NoticeList = () => import('../views/notice/NoticeList.vue') //引入新闻公告列表组件页
const NoticeAdd = () => import('../views/notice/NoticeAdd') //引入新闻公告添加组件页
const NoticeModify = () => import('../views/notice/NoticeModify') //引入新闻公告修改组件页
const NoticeDetail = () => import('../views/notice/NoticeDetail') //引入新闻公告详情组件页

const Profile = () => import ('../views/profile/Profile') //引入个人中心组件页
const Login = () => import ('../views/login/Login') //引入登录组件页
const CreateAccount = () => import ('../views/login/CreateAccount') //引入创建账号组件页
const Coupon = () => import ('../views/profile/CouponExchange') //引入优惠卷组件页
const About = () => import ('../views/profile/About') //引入关于我们组件页

const routes = [{
    path: '',  // 根路径跳到登录页路由
    redirect: '/login'
  },
  {
    path: '/login', // 系统登录页路由
    component: Login
  },
  {
    path: '/register', // 创建新账号页路由
    component: CreateAccount
  },
  {
    path: '/home',   // 首页路由
    component: Home
  },

  {
    path: '/userInfo/add', // 添加用户页路由
    component: UserInfoAdd
  },
  {
    path: '/userInfo/modify/:user_name', // 修改用户页路由
    component: UserInfoModify
  },
  {
    path: '/userInfo/list', // 用户查询页路由
    component: UserInfoList
  },
  {
    path: '/userInfo/detail/:user_name', // 用户详情页路由
    component: UserInfoDetail
  },
  {
    path: '/productClass/add', // 添加商品类别页路由
    component: ProductClassAdd
  },
  {
    path: '/productClass/modify/:classId', // 修改商品类别页路由
    component: ProductClassModify
  },
  {
    path: '/productClass/list', // 商品类别查询页路由
    component: ProductClassList
  },
  {
    path: '/productClass/detail/:classId', // 商品类别详情页路由
    component: ProductClassDetail
  },
  {
    path: '/product/add', // 添加商品页路由
    component: ProductAdd
  },
  {
    path: '/product/modify/:productId', // 修改商品页路由
    component: ProductModify
  },
  {
    path: '/product/list', // 商品查询页路由
    component: ProductList
  },
  {
    path: '/product/userList', // 商品查询页路由
    component: ProductUserList
  },
  {
    path: '/product/detail/:productId', // 商品详情页路由
    component: ProductDetail
  },
  {
    path: '/priceRegion/add', // 添加价格区间页路由
    component: PriceRegionAdd
  },
  {
    path: '/priceRegion/modify/:regionId', // 修改价格区间页路由
    component: PriceRegionModify
  },
  {
    path: '/priceRegion/list', // 价格区间查询页路由
    component: PriceRegionList
  },
  {
    path: '/priceRegion/detail/:regionId', // 价格区间详情页路由
    component: PriceRegionDetail
  },
  {
    path: '/oldLevel/add', // 添加新旧程度页路由
    component: OldLevelAdd
  },
  {
    path: '/oldLevel/modify/:levelId', // 修改新旧程度页路由
    component: OldLevelModify
  },
  {
    path: '/oldLevel/list', // 新旧程度查询页路由
    component: OldLevelList
  },
  {
    path: '/oldLevel/detail/:levelId', // 新旧程度详情页路由
    component: OldLevelDetail
  },
  {
    path: '/areaInfo/add', // 添加所在区域页路由
    component: AreaInfoAdd
  },
  {
    path: '/areaInfo/modify/:areaId', // 修改所在区域页路由
    component: AreaInfoModify
  },
  {
    path: '/areaInfo/list', // 所在区域查询页路由
    component: AreaInfoList
  },
  {
    path: '/areaInfo/detail/:areaId', // 所在区域详情页路由
    component: AreaInfoDetail
  },
  {
    path: '/leaveword/add', // 添加留言页路由
    component: LeavewordAdd
  },
  {
    path: '/leaveword/modify/:leaveWordId', // 修改留言页路由
    component: LeavewordModify
  },
  {
    path: '/leaveword/list', // 留言查询页路由
    component: LeavewordList
  },
  {
    path: '/leaveword/detail/:leaveWordId', // 留言详情页路由
    component: LeavewordDetail
  },
  {
    path: '/notice/add', // 添加新闻公告页路由
    component: NoticeAdd
  },
  {
    path: '/notice/modify/:noticeId', // 修改新闻公告页路由
    component: NoticeModify
  },
  {
    path: '/notice/list', // 新闻公告查询页路由
    component: NoticeList
  },
  {
    path: '/notice/detail/:noticeId', // 新闻公告详情页路由
    component: NoticeDetail
  },

  {
    path: '/Profile', // 个人中心页路由
    component: Profile,
  },
  {
    path: '/about', //关于我们页路由
    component: About
  },
  {
    path: '/coupon', // 优惠卷页路由
    component: Coupon
  }
]

const router = new Router({
  routes,
  mode: 'history'
})

export default router


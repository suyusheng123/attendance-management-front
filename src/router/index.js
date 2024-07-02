import Vue from 'vue'
import Router from 'vue-router'
/* 引入login组件 */
import login from '../components/login'
/* 引入index组件 */
import index from '../components/index'




/* 引入leave组件 */
import audit from '../components/leaveManagement/audit';
import leave from "../components/leaveManagement/leave";
import business from "../components/leaveManagement/business";
import overtime from '../components/leaveManagement/overtime.vue';
import overtimeaudit from '../components/leaveManagement/overtimeaudit.vue';

/* 引入attendanceInformation组件 */
import aInforList from "../components/attendanceInformation/attendanceInformationList"
import pAInfor from "../components/attendanceInformation/personAttendanceInformation";

/* 引入system组件 */
import userInfo from '../components/system/userInfo';
import roleInfo from '../components/system/roleInfo';
import deptInfo from '../components/system/deptInfo';
import xitong from '../components/xitong';

/* 引入dataEcharts组件 */
import chucai from '../components/dataEcharts/chucai';
import qingjia from '../components/dataEcharts/qingjia';
import queqing from '../components/dataEcharts/queqing';
import jiaban from '../components/dataEcharts/overtime';

/* 引入employee组件 */
import employee from '../components/employee';




Vue.use(Router)


const routes = [
  //在路由设置的每个页面路径下增加meta，通过这个字段来判断该路由是否需要登录权限，
  // isLogin:false表示不需要验证权限即可进入的页面，isLogin:true是需要登录权限验证才能进入的页面
  // meta: { requireAuth: true}  : 拦截
  {
    path: '/',
    name: 'login',
    component: login
  },
  {
    path: '/index',
    name: 'index',
    component: index,
    meta: {isLogin: true},// 定义meta，是定义这个页面必须才能访问
    children: [
      {
        path: 'audit',
        name: 'audit',
        component: audit,
        meta: {isLogin: true},// 定义meta，是定义这个页面必须才能访问
      },
      {
        path: 'leave',
        name: 'leave',
        component: leave,
        meta: {isLogin: true},// 定义meta，是定义这个页面必须才能访问
      },
      {
        path: 'business',
        name: 'business',
        component: business,
        meta: {isLogin: true},// 定义meta，是定义这个页面必须才能访问
      },
      {
        path: 'aInforList',
        name: 'aInforList',
        component: aInforList,
        meta: {isLogin: true},// 定义meta，是定义这个页面必须才能访问
      },
      {
        path: 'pAInfor',
        name: 'pAInfor',
        component: pAInfor,
        meta: {isLogin: true},// 定义meta，是定义这个页面必须才能访问

      },
      {
        path: 'employee',
        name: 'employee',
        component: employee,
        meta: {isLogin: true},// 定义meta，是定义这个页面必须才能访问
      },
      {
        path: 'userInfo',
        name: 'userInfo',
        component: userInfo
        ,meta: {isLogin: true},// 定义meta，是定义这个页面必须才能访问
      }, {
        path: 'roleInfo',
        name: 'roleInfo',
        component: roleInfo,
        meta: {isLogin: true},// 定义meta，是定义这个页面必须才能访问
      }, {
        path: 'deptInfo',
        name: 'deptInfo',
        component: deptInfo,
        meta: {isLogin: true},// 定义meta，是定义这个页面必须才能访问
      }, {
        path: 'chucai',
        name: 'chucai',
        component: chucai,
        meta: {isLogin: true},// 定义meta，是定义这个页面必须才能访问
      }, {
        path: 'qingjia',
        name: 'qingjia',
        component: qingjia,
        meta: {isLogin: true},// 定义meta，是定义这个页面必须才能访问
      }, {
        path: 'queqing',
        name: 'queqing',
        component: queqing,
        meta: {isLogin: true},// 定义meta，是定义这个页面必须才能访问
      },{
        path: 'xitong',
        name: 'xitong',
        component: xitong,
        meta: {isLogin: true},// 定义meta，是定义这个页面必须才能访问
      },
      {
        path: 'overtime',
        name: 'overtime',
        component: overtime,
        meta: {isLogin: true},// 定义meta，是定义这个页面必须才能访问
      },
      // 加班审核记录
      {
        path: 'overtimeaudit',
        name: 'overtimeaudit',
        component: overtimeaudit,
        meta: {isLogin: true},// 定义meta，是定义这个页面必须才能访问
      },
      // 加班统计
      {
         path: 'jiaban',
         name: 'jiaban',
         component: jiaban,
        meta: {isLogin: true},// 定义meta，是定义这个页面必须才能访问
      }
    ]
  }];

let router = new Router({
  mode: 'history',
  //base: '/app/', //默认值: "/",项目打包部署的时候使用，取了一个项目名称
  routes
});


export default router;


router.beforeEach((to, from, next) => {
  if (to.meta.isLogin) { // 判断该路由是否需要登录权限
    if (sessionStorage.getItem("token") === 'true') { // 判断本地是否存在token
      next()
    } else {
      // 未登录,跳转到登陆页面
      next({
        path: '/'
      });
      window.alert("请先登录");
    }
  } else {
    if (sessionStorage.getItem("token") === 'true') {
      next('/index');
    } else {
      next();
    }
  }
});



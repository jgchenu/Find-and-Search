// 引入api
import {
  subCode,
  getCodeUrl,
  getCookie
} from '@/api/tool.js'
import auth from "@/api/auth";
import {
  redirectUrl
}
from '@/api/variable'


//引入路由加载的组件
import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/pages/home'
import getFound from '@/pages/getFound'
import history from '@/pages/history'
import listDetail from '@/components/home/list-detail'
import release from '@/components/home/release'
import getMessage from '@/components/home/getMessage'
import hasSolve from '@/components/history/hasSolve'
import noSolve from '@/components/history/noSolve'
import edit from '@/components/history/edit'
import axios from 'axios'
Vue.use(VueRouter);
const router = new VueRouter({
  routes: [{
    path: '/',
    redirect: '/home'
  }, {
    path: '/home',
    component: Home,
    meta: {
      keepAlive: true
    },
    beforeEnter(to, from, next) {
      document.body.style.backgroundColor = "#fff";
      document.body.scrollTop = 0;
      next();
    }
  }, {
    path: '/getFound',
    component: getFound,
    meta: {
      keepAlive: true
    },
    beforeEnter(to, from, next) {
      document.body.style.backgroundColor = "#fff";
      document.body.scrollTop = 0;
      next();
    }
  }, {
    path: '/history',
    component: history,
    meta: {
      keepAlive: true
    },
    children: [{
        path: 'hasSolve',
        component: hasSolve
      },
      {
        path: 'noSolve',
        component: noSolve
      }
    ],
    beforeEnter(to, from, next) {
      document.body.scrollTop = 0;
      document.body.style.backgroundColor = "#ddd";
      next();
    }
  }, {
    path: '/listDetail',
    name: 'listDetail',
    component: listDetail
  }, {
    path: '/release',
    component: release,
    beforeEnter(to, from, next) {
      document.body.scrollTop = 10;
      document.body.style.backgroundColor = "#ddd";
      next();
    }
  }, {
    path: '/edit',
    name: 'edit',
    component: edit
  }, {
    path: '/getMessage',
    component: getMessage
  }, {
    path: '*',
    redirect: '/'
  }]
});


//调用auth函数，对每次进入路由页面进行验证
router.beforeEach((to, from, next) => {


  if (getCookie("lzs_token")) {
    next();
  } else {
    if (subCode('code')) {
      let code = subCode('code');
      axios.get(
        "/lixun/auth/authorize?request_type=token&code=" + code
      ).then(response => {
        console.log(response);
        let path = window.localStorage.getItem('lx_router') || '/home';
        router.push({
          path: path
        });
        
        window.localStorage.setItem('lx_router','');
        window.location.reload();
      }).catch(error => {
        console.log("没有换到token");
        let code = error.response.data.code;
        let message=error.response.data.message;
        auth(code,message);
      });
    } else {
      window.location.href = getCodeUrl(redirectUrl, "wx0c6e2f0a288033bc", 2);
    }
  }
});
export default router;

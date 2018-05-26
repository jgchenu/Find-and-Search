// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import ajax from 'api/ajax'
import router from '@/router'
import auth from 'api/auth'
import store from "@/vuex/store.js";
import { Lazyload } from 'mint-ui';
Vue.use(Lazyload);
import { Loadmore } from 'mint-ui';
Vue.component(Loadmore.name, Loadmore);
import { InfiniteScroll } from 'mint-ui';
Vue.use(InfiniteScroll);
import { Popup } from 'mint-ui';
Vue.component(Popup.name, Popup);
import 'lib-flexible';
// import Vconsole from 'vconsole'
// let vConsole = new Vconsole()

// Vue.prototype.$http = axios;
Vue.config.productionTip = false;
Vue.prototype.$ajax = ajax;
Vue.prototype.$auth = auth;
Vue.prototype.$store = store;
Vue.directive('scroll', {
    bind: function() {
        document.body.scrollTop = 0;
    },
    unbind: function() {
        document.body.scrollTop = sessionStorage.getItem("scroll");
    }
})

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    template: '<App/>',
    components: {
        App
    }
})
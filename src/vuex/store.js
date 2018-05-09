import Vuex from 'vuex'
import Vue from 'vue'
Vue.use(Vuex);

const state = {
    listDetail: {},
    buttonUrl: "http://chenjianguang.com/static/lixun/getter.png",
    scrollTop: 0
};
const mutations = {
    pushList(state, list) {
        state.listDetail = list;
    },
    changeUrl(state, url) {
        state.buttonUrl = url;
    },
    setScrollTop(state, scrollTop) {
        state.scrollTop = scrollTop;
    }
};
export default new Vuex.Store({
    state,
    mutations
})
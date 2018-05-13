<template>
<div class="history-container">
  <div class="history">
    <h2 class="title">历史记录</h2>
    <ul>  
            <router-link to="/history/noSolve" tag="li" replace>
                <i class="icon-shalou iconfont"></i>
                <span>待解决</span>
            </router-link>
            <router-link to="/history/hasSolve" tag="li" replace>
                <i class="icon-right iconfont"></i>
                <span>已解决</span>
            </router-link>
      </ul>
  </div>
  <div class="taber">
         <keep-alive><transition name="fade" mode="out-in"><router-view></router-view></transition></keep-alive>
  </div>
  </div>
</template>
<script>

export default {
  created(){

  },
  data() {
    return {

    };
  },
  methods: {
  },
};
</script>
<style lang="scss" scoped>
@import "../assets/variable.scss";
.selected,.router-link-active {
  border-bottom: 5px solid #ffffff;
}
.history-container {
  overflow: hidden;
  width: 100%;
  .taber {
    background-color: #ddd;
    padding-top: 20px;
    padding-bottom: 160px;
    width: 100%;
  }
  .history {
    position: relative;
    top: 0;
    z-index: 1;
    width: 100%;
    .title {
      width: 100%;
      height: 80px;
      background-color: $lizhiColor;
      text-align: center;
      line-height: 80px;
      color: #fff;
      font-size: 38px;
    }
    ul {
      display: flex;
      padding: 0;
      margin: 0;
      background-color: $lizhiColor;
      width: 100%;
      .line {
        width: 2px;
        height: 40px;
        background-color: #fff;
        position: relative;
      }
      li {
        color: #fff;
        text-align: center;
        flex-grow: 1;
        height: 50px;
        .iconfont {
          font-size: 30px;
        }
        span {
          font-size: 30px;
          padding-left: 3px;
        }
      }
    }
  }
}
</style>
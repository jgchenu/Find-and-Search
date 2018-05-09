<template>
    <div class="footer-nav-container" id="footer-nav">
        <ul class="footer-nav">
            <router-link to="/home" tag="li" replace>
                <i class="icon-search1 iconfont"></i><br>
                <span>寻物</span>
            </router-link>
            <router-link to="/getFound" tag="li" replace>
                <i class="icon-detail iconfont"></i><br>
                <span>招领</span>
            </router-link>
            <router-link to="/history/noSolve" tag="li" replace>
                <i class="icon-lishi iconfont"></i><br>
                <span>历史</span>
            </router-link>
        </ul>
    </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  mounted: function() {}
};
</script>
<style lang="scss" scoped>
.router-link-active {
  color: #fd0909 !important;
}
.footer-nav-container {
  position: fixed;
  bottom: 0;
  width: 100%;
  z-index: 1;
  ul.footer-nav {
    display: -webkit-flex;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0;
    margin: 0;
    background-color: #f4f4f4;
    li {
      border-top: 1px solid #ddd;
      text-align: center;
      flex-grow: 1;
      padding: 10px 0 20px 0;
      color: #aaaaaa;
      .iconfont {
        font-size: 60px;
      }
      span {
        font-size: 18px;
        text-align: center;
      }
    }
  }
}
</style>



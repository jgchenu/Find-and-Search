<template>
  <div id="app">
    <transition name="fade" mode="out-in">
      <keep-alive> 
      <router-view v-if="$route.meta.keepAlive"></router-view>
      </keep-alive>
    </transition>
    <transition name="fade" mode="out-in">
      <router-view v-if="!$route.meta.keepAlive"></router-view>
    </transition>
    <footerNav></footerNav>
  </div>
</template>

<script>
import footerNav from "@/components/footer-nav";
export default {
  name: "app",
  components: {
    footerNav
  },
  created() {},
  data() {
    return { code: "" };
  },
  mounted: function() {
    
  },

  methods: {}
};
</script>

<style  lang="scss" >
@import "./assets/base.scss";
$url:"//at.alicdn.com/t/font_437285_udl679lmotfkcsor.css";
@import url($url);

</style>



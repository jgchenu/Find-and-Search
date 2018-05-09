<template>
<!-- 搜索框组件 -->
      <div class="search-for">
        <input type="text" placeholder="搜索物品和丢失地点"><span class="icon-search iconfont" @click="search"></span>
      </div>
</template>
<script>

export default {
  data() {
    return {

    }
  },
  methods:{
    search(){
      this.$router.push({path:'/getFound'});
    }
  }

}
</script>
<style lang="scss" scoped>
@import '../../assets/mixin.scss';
  div.search-for {
    width: 70%;
    line-height: 4rem;
    input {
      width: 85%;
      height: 2rem;
      border-radius: 1.5rem;
      outline: none;
      font-size: 15px;
      border: none;
      padding-left: 1rem;
    }
    .icon-search{
      color: #c54844;
      font-size: 18px;
      position: relative;
      cursor: pointer;
      right: 2.2rem;
      top: 2px;
    }
    @include change-placeholder(#ccc,12px);
  }

</style>

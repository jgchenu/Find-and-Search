<template>
      <div class="select">
        <i class="iconfont icon-biaoqian biaoqian"></i>
        <span>选择标签</span> 
          <i class="iconfont icon-unfold"></i>

      </div>
</template>
<script>

export default {
  name:'selectPlace',
  data() {
    return {

    }
  }
}
</script>
<style lang="scss" scoped>
@import '../../assets/mixin.scss';

  div.select {
    width: 200px;
    text-align: center;
    .biaoqian,span,.icon-unfold {
      display: inline-block;
      font-size:24px;
      color: #ffffff;
      cursor: pointer;
      line-height: 100px;
    }
  }


</style>

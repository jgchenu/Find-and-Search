<template>
<!-- checkbox组件 -->
  <div class="my-checkbox" v-bind:class="{isSelect:isSelect}">
    <span>
      <slot></slot>
    </span>
  </div>
</template>
<script>
export default {
  props: {
    isSelect: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
    }
  }
}
</script>
<style lang="scss" scoped>
@import '../../assets/variable';
.my-checkbox {
  display: inline-block;
  height: 40px;
  border: 1px solid $lizhiColor;
  border-radius: 10px;
  line-height: 40px;
  margin: 12px 10px;
  padding: 2px 12px;
  font-size: 18px;
}

.isSelect {
  background-color: $lizhiColor;
  color: #ffffff;
}
</style>



<template>
<!-- 寻物列表 -->
    <div class="search-list">
        <div class="img-left">
            <img v-lazy="imgUrl" alt="缩略图" class="img-small" title="缩略图" lazy="loading">
        </div>
        <div class="message-right">
            <h3 class="search-list-title">{{list.title}}</h3>
            <p class="search-list-detail">{{computedContent}}</p>
            <p class="search-tips">
                <i class="iconfont icon-coordinates place"></i><span class="place">{{list.wheretag||"不确定"}}</span>
                <span class="time">{{date||"不确定"}}</span><i class="iconfont icon-lishi time"></i>
            </p>
        </div>
    </div>
</template>
<script>
import {insteadUrl} from '@/api/variable.js'
export default {
  props: {
    list: {
      type: Object,
      default: {}
    }
  },
  mounted() {},
  data() {
    return {};
  },
  computed: {
    imgUrl() {
      return this.list.picurl
        ? this.list.picurl.thumb[0]
        : insteadUrl;
    },
    date() {
      let date = new Date(this.list.lasttime * 1000);
      let month = date.getMonth() + 1;
      let day = date.getDate();
      return month + "月" + day + "日";
    },
    computedContent() {
      let str = this.list.content;
      if (str.length > 45) {
        str = str.substr(0, 44) + "......";
      }
      return str;
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../../assets/variable";
.search-list {
  margin: 0 auto 20px;
  width: 90%;
  box-shadow: 0 0 20px #bbb;
  padding: 0;
  display: flex;
  height: 240px;
  background-color: #ffffff;
  border-radius: 18px;
  overflow: hidden;
  justify-content: center;
  align-items: center;
  .img-left {
    margin: 0;
    padding: 0 10px;
    width: 250px;
    margin-right: 0;
    .img-small {
      height: 220px;
      width: 220px;
      border-radius: 22px;
      margin-top: 6px;
    }
    img[lazy="loading"] {
      height: 220px;
      width: 220px;
      margin: auto;
      background: url($gifUrl)
        no-repeat;
      background-position: center center;
      background-size: cover;
    }
  }
  .message-right {
    width: 400px;
    margin-left: 0;
    .search-list-title {
      color: #0F0F0F;
      text-align: left;
      font-size: 36px;
      margin-bottom: 10px;
    }
    .search-list-detail {
      height: 100px;
      font-size: 22px;
      text-overflow: ellipsis;
      overflow: hidden;
      text-align: left;
      padding-right: 10px;
      margin-bottom: 10px;
      line-height: 32px;
    }
    .search-tips {
      margin-top: 20px;
      color: #555555;
      .iconfont {
        font-size: 24px;
      }
      .time {
        float: right;
        font-size: 24px;
        margin-right: 10px;
      }
      i.time {
        position: relative;
        top: 2px;
      }
    }
  }
}
</style>



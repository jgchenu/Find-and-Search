<template>
    <div class="search-list" @click="toEdit">
        <div class="img-left">
            <img v-lazy="imgUrl" alt="缩略图" class="img-small" title="缩略图" >
        </div>
        <div class="message-right">
            <h3 class="search-list-title">{{list.title}}</h3>
            <p class="search-list-detail">{{list.content}}</p>
            <p class="search-tips">
                <span class="iconfont icon-coordinates place">{{list.wheretag||"其他"}}</span>
                <span class="iconfont icon-lishi time">{{date||"不确定"}}</span>
                <span class="iconfont icon-bofang" v-if="list.state==2">进行中</span>
                <span class="iconfont icon-success" v-if="list.state==4">已解决</span>
                <span class="iconfont icon icon-f14" v-if="list.state==3" @click.stop="resub">重新发布</span>
            </p>
        </div>
    </div>
</template>
<script>
import { MessageBox,Toast } from "mint-ui";
export default {
  props: {
    list: {
      type: Object,
      default: {}
    }
  },
  data() {
    return {};
  },
  computed: {
    date() {
      if (!this.list.lasttime) {
        return;
      }
      let date = new Date(this.list.lasttime * 1000);
      let month = date.getMonth() + 1;
      let day = date.getDate();
      return month + "月" + day + "日";
    },
    imgUrl() {
      return this.list.picurl ? this.list.picurl.thumb[0] : "http://chenjianguang.com/static/lixun/instead.png";
    }
  },
  methods: {
    toEdit() {
      this.$emit("toEdit");
    },
    resub(){
        MessageBox.confirm("确定是否重新发布？").then(
        success => {
          let id=this.list.id;
          let lixun = sessionStorage.getItem("lixun");
          this.$ajax({
            method: "post",
            url: "/info/" + id+"/renew"
          })
            .then(res => {
              setTimeout(() => {
                window.location.reload();
              }, 1000);
              Toast({
                message: "发布成功，进入历史页面",
                iconClass: "iconfont icon-xiaolianchenggong",
                duration: 800
              });
              console.log(res);
            })
            .catch(err => {
              console.log(err);
            });
        },
        cancel => {
          Toast({
            message: "你取消了重新发布",
            iconClass: "iconfont icon-xiaolianchenggong",
            duration: 800
          });
        }
      );

    }
  }
};
</script>
<style lang="scss" scoped>
@import "../../assets/variable";
.search-list {
  margin: 0 auto 20px;
  width: 690px;
  box-shadow: 0 0 5px #fff;
  padding: 0;
  display: flex;
  height: 240px;
  background-color: #ffffff;
  border-radius: 22px;
  overflow: hidden;
  justify-content: center;
  align-items: center;
  .img-left {
    margin: 0;
    padding: 0 10px;
    width: 240px;
    .img-small {
      height: 210px;
      width: 210px;
      border-radius: 16px;
    }
  }
  .message-right {
    width: 400px;
    .search-list-title {
      color: $lizhiColor;
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
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      span.iconfont {
        float: left;
        color: $lizhiColor;
        font-size: 24px;
        margin-right: 2px;
      }
      span.time,span.icon-bofang {
        margin-left: 10px;
      }
      span.icon-bofang {
        color: green;
      }
      span.icon-success {
        color: green;
      }
      span.icon-f14 {
        color: #ffffff;
        background-color: orange;
        border-radius: 10px;
      }
    }
  }
}
</style>



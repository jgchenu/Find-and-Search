<template>
  <div class="get-message-container">
    <div class="get-message">
         <i class="iconfont icon-back" @click="goback"></i><span class="title">{{message.username||"无"}}的联系方式</span>
        <div class="message">
          <p> <i class="iconfont icon-p"></i><span class="name">{{message.username||"无"}}</span></p>
           <p>   <i class="icon-call iconfont"></i><span class="iphone">{{message.phone||"无"}}</span></p>
            <p>  <i class="icon-weixin iconfont"></i><span class="weixin">{{message.wechat||"无"}}</span></p>
        </div>
    </div>
    <div class="triangle"></div>
    <img :src="messageUrl" alt="logo" class="message-logo">
  </div>
</template>
<script>
import { wxFn } from "@/api/tool.js";
import { messageUrl } from "@/api/variable.js";
export default {
  mounted() {
    let lixun = sessionStorage.getItem("lixun");
    let id = this.$route.query.id;
    // console.log(id);
    this.$ajax({
      method: "get",
      url: "/info/" + id
    })
      .then(res => {
        // console.log("getMessage", res);
        this.message = res.data.data.info;
      })
      .catch(err => {
        this.$auth(err.response.data.code, err.response.data.message);
        // console.log(err.response.data.code);
      });
  },
  data() {
    return {
      message:{},
      messageUrl:messageUrl
    };
  },
  methods: {
    goback() {
      this.$router.go(-1);
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../../assets/variable";
.get-message-container {
  background-color: #ddd;
  width: 100%;
  height: 100%;
  overflow: hidden;
  .get-message {
    width: 90%;
    position: relative;
    background-color: #ffffff;
    height: 700px;
    margin:20px auto 0;
    border-radius: 30px;
    box-shadow: 0 0 15px #bbb;
    .icon-back {
      font-size: 60px;
      color: $lizhiColor;
      position: relative;
      top: 30px;
      left: 20px;
    }
    .title{
      font-weight: bolder;
      font-size: 40px;
      position: relative;
      top: 26px;
      left: 80px;
      color: $lizhiColor;
    }
    .message {
      position: relative;
      top: 20%;
      left: 100px;
      height: 300px;
      border-left: 2px solid $lizhiColor;
      margin: 0 auto;
      p{
          margin-bottom: 8%;
      }
      .icon-p,
      .icon-call,
      .icon-weixin,
      .icon-qq {
        color: $lizhiColor;
        margin-left: 10%;
        position: relative;
        top: 6px;
        right: 10px;
      }
      .icon-p{
          font-size: 50px;
          top: 1px;
      }
      .icon-call{
          font-size: 50px;
          top: 3px;
      }
      .icon-weixin{
          font-size: 50px;
      }
      span{
          font-size: 40px;
          color: $lizhiColor;
          font-weight: bolder;
      }
    }

  }
  .triangle {
    width: 0;
    height: 0;
    border: 60px solid #ffffff;
    border-color: #fff transparent transparent transparent;
    position: relative;
    margin: 0 auto;
    margin-top: -20px;
  }
  .message-logo{
    width: 200px;
    height: 200px;
    display: block;
    margin: 0 auto;
  }

}
</style>


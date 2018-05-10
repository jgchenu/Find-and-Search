<template>
  <!-- 列表详情 -->
  <div class="list-detail" v-scroll>
    <div class="detail-container">
      <i class="iconfont icon-back" @click="goback"></i>
      <h3 class="detail-title">{{listDetail.title}}</h3>
      <div class="detail">
        <div class="detail-img">
          <img :src="imgurl" alt="原图" @click="popupVisible=true" lazy="loading">
          <div class="message">
            <p>地点:{{listDetail.wheretag||"其他"}}</p>
            <p>类型:{{listDetail.whattag||"其他"}}</p>
            <p>时间:{{date||"不确定"}}</p>
            <p>人物:{{listDetail.username||"未知人物"}}</p>
          </div>
        </div>
        <div class="describe">{{listDetail.content}}</div>
      </div>
    </div>
    <div class="circle-1"></div>
    <div class="circle-2"></div>
    <div class="circle-3"></div>
    <div class="get-message-button" @click="goChat" :style="{background:'url('+$store.state.buttonUrl+')',backgroundSize:'100% 100%'}"></div>
    <mt-popup
    v-model="popupVisible" popup-transition="popup-fade" class="mint-popup-1">
     <img :src="imgurl" alt="原图">
  </mt-popup>
  </div>
</template>
<script>
import myButton from "@/components/comm/my-button";
import store from "@/vuex/store.js";
import axios from "axios";
export default {
  name: "listDetail",
  mounted() {
    let lixun = sessionStorage.getItem("lixun");
    let id = this.$route.query.id;
    if (!this.$store.state.buttonUrl) {
      this.$store.commit(
        "changeUrl",
        "http://chenjianguang.com/static/lixun/getter.png"
      );
    }
    this.$ajax({
      method: "get",
      url: "/info/" + id
    })
      .then(res => {
        console.log("list-detail", res);
        this.listDetail = res.data.data.info;
        this.imgurl = this.listDetail.picurl
          ? this.listDetail.picurl.master[0]
          : "http://chenjianguang.com/static/lixun/instead.png";
      })
      .catch(err => {
        console.log(err);
      });
    this.wx();
  },
  data() {
    return {
      listDetail: {},
      popupVisible: false,
      imgurl: "",
      share: {}
    };
  },
  components: {
    myButton
  },
  methods: {
    goback() {
      this.$router.go(-1);
    },
    goChat() {
      this.$router.push({
        path: "/getMessage",
        query: { id: this.$route.query.id }
      });
    },
    wx() {
      this.$ajax({
        url: `/wechat/sign`,
        method: "post",
        data: {
          url: window.location.href.split("#")[0]
        }
      })
        .then(res => {
          this.share = res.data.data;
          console.log(res);

          wx.config({
            debug: false,
            appId: "wx0c6e2f0a288033bc",
            timestamp: this.share.timestamp,
            nonceStr: this.share.noncestr,
            signature: this.share.signature,
            jsApiList: [
              "checkJsApi",
              "onMenuShareTimeline",
              "onMenuShareAppMessage",
              "onMenuShareQQ",
              "onMenuShareWeibo",
              "onMenuShareQZone"
            ]
          });
          let self = this;
          wx.ready(function() {
            // let host = "http://192.168.1.113:8080";
            // let host="http://chenjianguang.com/lixun";
            let host = "http://jwwo.szer.me/lx/index.html";
            var shareData = {
              title: self.listDetail.title,
              desc: self.listDetail.content,
              link: `${host}#/listDetail?id=${self.listDetail.id}`,
              imgUrl: self.imgurl
                ? self.imgurl
                : "http://chenjianguang.com/static/lixun/instead.png"
            };
            wx.onMenuShareAppMessage(shareData);
            wx.onMenuShareTimeline(shareData);
            wx.onMenuShareQQ(shareData);
            wx.onMenuShareWeibo(shareData);
            wx.onMenuShareQZone(shareData);
          });
        })
        .catch(err => {
          console.log(err.response);
        });
    }
  },
  store,
  computed: {
    date() {
      let date = new Date(this.listDetail.lasttime * 1000);
      let month = date.getMonth() + 1;
      let day = date.getDate();
      return month + "月" + day + "日";
    }
  },
  meta: {
    keepAlive: false
  }
};
</script>
<style lang="scss" scoped>
@import "../../assets/variable";
.mint-popup-1 {
  height: 600px;
  img {
    width: 600px;
    height: 600px;
    text-align: center;
    margin: 0;
    padding: 0;
    border-radius: 10px;
  }
}

.list-detail {
  background-color: #ddd;
  width: 100%;
  height: 100%;
  overflow: hidden;
  .circle-1,
  .circle-2,
  .circle-3 {
    width: 80px;
    height: 40px;
    border-radius: 50%;
    background-color: #ffffff;
    border: 1px solid $lizhiColor;
    margin-left: 180px;
  }
  .circle-2 {
    width: 60px;
    height: 30px;
    border-radius: 50%;
    margin-left: 220px;
  }
  .circle-3 {
    width: 40px;
    height: 20px;
    border-radius: 50%;
    margin-left: 260px;
  }
  .get-message-button {
    height: 180px;
    width: 400px;
    margin: 20px auto;
    // background: url('http://chenjianguang.com/static/lixun/getter.png') no-repeat;
    // background-size:100% 100%;
  }
  .detail-container {
    border: 1px solid #eab1af;
    width: 700px;
    position: relative;
    background-color: #eee;
    margin: 30px auto;
    border-radius: 30px;
    box-shadow: 0 0 15px #bbb;
    overflow: hidden;
    .icon-back {
      font-size: 60px;
      color: $lizhiColor;
      position: relative;
      top: 20px;
      left: 20px;
    }
    .detail-title {
      color: $lizhiColor;
      width: 80%;
      height: 60px;
      text-align: center;
      margin: 0 auto;
      font-size: 40px;
      display: inline-block;
      line-height: 60px;
    }
    .detail {
      margin-top: 30px;
      display: flex;
      align-items: flex-start;
      width: 100%;
      height: 100%;
      .detail-img {
        flex-grow: 1;
        border-radius: 16px;
        margin: 0 10px;
        display: flex;
        flex-direction: column;
        align-items: center;
        img {
          height: 300px;
          width: 300px;
          border-radius: 10px;
        }
        img[lazy="loading"] {
          height: 300px;
          width: 300px;
          margin: auto;
          background: url("http://chenjianguang.com/static/lixun/loading.gif")
            no-repeat;
          background-position: center center;
          background-size: cover;
        }
        .message {
          margin: 20px 0;
          text-indent: 20px;
          width: 300px;
          height: 160px;
          border-radius: 20px;
          color: $lizhiColor;
          text-align: left;
          p {
            line-height: 40px;
            color: $lizhiColor;
          }
        }
      }
      .describe {
        flex-grow: 1;
        width: 80%;
        height: 78%;
        font-size: #000;
        margin-right: 10px;
        line-height: 36px;
        font-size: 30px;
        text-overflow: ellipsis;
        overflow: hidden;
      }
    }
  }
}
</style>



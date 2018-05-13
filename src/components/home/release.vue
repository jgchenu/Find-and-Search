<template>
<!-- 发布页 -->
  <div class="release-container">
    <div class="release">
      <!-- 头部 -->
      <div class="header">
        <i class="iconfont icon-back" @click="goback"></i>
        <input type="text" id="title" v-model="title" placeholder="填写标题">
      </div>

    <!-- <label for="title" class="title-label">标题:</label> -->

    <!-- <span class="iconfont icon-biaoqian" @click="showSelect=!showSelect">选择标签</span> -->
    <!-- <transition name="select-fade" mode="out-in"> <selects v-show="showSelect" class="white-select-detail" @selectSure="selectSure($event)"></selects></transition> -->
    <textarea name="describe" id="describe" cols="41" rows="10" placeholder="详细描述..." v-model="content"></textarea>
    <div class="message">
    <!-- 左边添加图片 -->
      <div class="left">    
        <label class="iconfont icon-add" for="file"  v-show="fileImage==''"></label>
        <input type="file" id="file" @change="showImage()" accept="image/*">
          <div class="cancel" @click="cancel" v-show="fileImage!=''">x</div>
          <img :src="fileImage" alt="上传图" class="file-image" v-show="fileImage!=''" @click="popupVisible=true">
        <mt-popup
        v-model="popupVisible" popup-transition="popup-fade" class="mint-popup-1">
        <img :src="fileImage" alt="原图">
        </mt-popup>
      </div>
        <!-- 中间填写信息 -->
      <div class="center">
        <div class="selects">
          <select class="places" v-model="wheretag">
            <option disabled value="">丢失地点</option>
            <option value="桂庙">桂庙</option>
            <option value="文山湖">文山湖</option>
            <option value="文科楼">文科楼</option>
            <option value="西南">西南</option>
            <option value="南区">南区</option>
            <option value="斋区">斋区</option>
            <option value="西南">西南</option>
            <option value="元平体育馆">元平体育馆</option>
            <option value="科技楼">科技楼</option>
            <option value="图书馆">图书馆</option>
            <option value="西丽">西丽</option>
            <option value="其他">其他</option>
          </select>

          <select class="things" v-model="whattag">
            <option disabled value="">物品类型</option>
            <option value="校卡">校卡</option>
            <option value="钱包">钱包</option>
            <option value="书包">书包</option>
            <option value="衣物">衣物</option>
            <option value="文件书本">文件书本</option>
            <option value="数码产品">数码产品</option>
            <option value="其他">其他</option>
          </select>

        </div>
        <input type="text" id="weixin" v-model="wechat" placeholder="微信">
        <input type="text" id="phone" v-model="phone" placeholder="手机">
      </div>
        <!-- 右边选择分类 -->
      <div class="right">
        <template v-for="(item,index) in selectType">
        <myCheckbox :key="item.id" :isSelect="item.isSelect" @click.native="changeType(index)">{{item.name}}</myCheckbox>
        </template>
      </div>
    </div>
    </div>
    <div class="Triangle"></div>
    <img src="http://chenjianguang.com/static/lixun/sub.png" alt="点击提交" class="subButton" @click.prevent="subMessage">
  </div>
</template>
<script>
import lrz from "../../../node_modules/lrz/dist/lrz.all.bundle";
import myCheckbox from "@/components/comm/my-checkbox";
import ajax from "api/ajax";
import axios from "axios";
import { Toast } from "mint-ui";
import { MessageBox } from "mint-ui";
import { Indicator } from "mint-ui";
import auth from "@/api/auth";
export default {
  mounted() {
    document.body.scrollTop = 0;
    document.getElementById("footer-nav").style.display = "none";
  },
  beforeDestroy() {
    document.getElementById("footer-nav").style.display = "block";
  },
  data() {
    return {
      files: [],
      fileImage: "",
      popupVisible: false,
      selected: "",
      selectType: [
        { type: 1, name: "寻物", isSelect: false, id: 1 },
        { type: 2, name: "招领", isSelect: false, id: 2 }
      ],
      title: "",
      phone: "",
      content: "",
      name: "",
      wechat: "",
      upImage: [],
      type: null,
      whattag: "",
      wheretag: ""
    };
  },
  methods: {
    goback() {
      this.$router.go(-1);
    },
    showImage() {
      let file = document.getElementById("file").files[0];
      let _this = this;
      lrz(file)
        .then(function(rst) {
          Toast({
            message: "添加成功",
            iconClass: "iconfont icon-success1",
            duration: 1000
          });
          // 处理成功会执行
          // console.log(rst.formData);
          _this.fileImage = rst.base64;
          // _this.upImage=_this.upImage.concat(file);
          _this.upImage = rst.origin;
          // 13434998099
          // console.log(_this.upImage);
          // console.log(_this.fileImage);
        })
        .catch(function(err) {
          // 处理失败会执行
          Toast({
            message: "添加失败",
            iconClass: "iconfont icon-fail"
          });
        })
        .always(function() {
          // 不管是成功失败，都会执行
          console.log("调用上传图片");
        });
    },
    changeType(index) {
      this.selectType.forEach((element, num) => {
        index == num ? (element.isSelect = true) : (element.isSelect = false);
        index == num ? (this.type = index + 1) : null;
      });
    },
    subMessage() {
      let lixun = sessionStorage.getItem("lixun");
      new Promise((resolve, reject) => {
        if (!this.title || this.title.length >= 10) {
          this.title ? reject("标题字数应该小于10") : reject("要填写标题哦");
        } else if (!this.content || this.content.length >= 200) {
          this.content
            ? reject("内容的字数应该小于200")
            : reject("要填写内容哦");
        } else if (!this.wechat || this.wechat.length >= 20) {
          this.wechat ? reject("微信字数应该小于20") : reject("要填写微信哦");
        } else if (!this.phone || this.phone.length != 11) {
          this.phone ? reject("手机格式不对") : reject("要填写手机哦");
        } else if (!this.whattag || !this.wheretag) {
          !this.wheretag ? reject("要选择地点标签哦") : "";
          !this.whattag ? reject("要选择物品标签哦") : "";
        } else if (!this.type) {
          reject("要选择寻物或者招领哦");
        } else {
          MessageBox.confirm("确定发布？").then(
            success => {
              resolve("发布成功，页面跳转中");
            },
            cancel => {
              reject("你取消了发布");
            }
          );
        }
      }).then(
        tip => {
          let formdata = new FormData();
          formdata.append("title", this.title);
          formdata.append("content", this.content);
          formdata.append("phone", this.phone);
          formdata.append("wechat", this.wechat);
          formdata.append("type", this.type);
          formdata.append("wheretag", this.wheretag);
          formdata.append("whattag", this.whattag);
          formdata.append("image[]", this.upImage);
          Indicator.open("努力发布中");
          axios
            .post("/lixun/info", formdata)
            .then(res => {
              Indicator.close();
              console.log("res", res);
              Toast({
                message: tip,
                iconClass: "iconfont icon-xiaolianchenggong",
                duration: 1000
              });
              setTimeout(() => {
                if (this.selectType[0].isSelect) {
                  this.$router.replace({ path: "/home" });
                } else {
                  this.$router.replace({ path: "/getFound" });
                }
                window.location.reload();
              }, 1000);
            })
            .catch(err => {
              Indicator.close();
              auth(err.response.data.code, err.response.data.message);
              Toast({
                message: err.response.data.message,
                iconClass: "iconfont icon-xiaolianchenggong",
                duration: 800
              });
            });
        },
        tip => {
          Toast({
            message: tip,
            iconClass: "iconfont icon-xiaolianchenggong",
            duration: 800
          });
        }
      );
    },
    cancel() {
      this.fileImage = "";
      document.getElementById("file").value = "";
      this.upImage = [];
    }
  },
  components: {
    myCheckbox,
    Toast
  }
};
</script>
<style lang="scss" scoped>
@import "../../assets/release.scss";
</style>



const getCodeUrl = (url, appid, type) => {
  let encodeurl = encodeURI(url),
    wx, scope;
  type == 1 ? scope = "snsapi_base" : scope = "snsapi_userinfo";
  wx = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=" + appid + "&redirect_uri=" + encodeurl + "&response_type=code&scope=" + scope + "&state=STATE#wechat_redirect";
  return wx;
};
const subCode = name => {
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
  var r = window.location.search.substr(1).match(reg);
  if (r != null) {
    return unescape(r[2]);
  }
  return null;
};

function getCookie(name) {
  var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");

  if (arr = document.cookie.match(reg))

    return unescape(arr[2]);
  else
    return null;
}

function wx() {
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
      let url =
        (this.router.history.pending &&
          this.router.history.pending.fullPath) ||
        this.router.history.current.fullPath;
      let that = this
      wx.ready(() => {
        // let host = "http://192.168.1.113:8080";
        // let host="http://chenjianguang.com/lixun";
        let host = "http://jwwo.szer.me/lx/index.html";
        var shareData = {
          title: that.listDetail.title,

          desc: that.listDetail.content,

          link: `${host}#${url}`,
          imgUrl: that.imgurl &&
            that.imgurl || "http://chenjianguang.com/static/lixun/instead.png"
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

export {
  getCodeUrl,
  subCode,
  getCookie,
  wx
}

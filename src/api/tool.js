import {host} from "./variable"
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

function delCookie(name) {
  var exp = new Date();
  exp.setTime(exp.getTime() - 1);
  var cval = getCookie(name);
  if (cval != null)
    document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString() + ";path=/";
}


function wxFn() {
  console.log(this);
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
      let routerUrl = this.$router.history.pending && this.$router.pending.fullPath || this.$router.history.current.fullPath
      wx.ready(function () {
        var shareData = {
          title: `小荔寻`,
          desc: `深大荔知的寻物平台`,
          link: `${host}#${routerUrl}`,
          imgUrl: "http://chenjianguang.com/static/lixun/instead.png"
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
  delCookie,
  wxFn
}

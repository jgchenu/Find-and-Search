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

export {
  getCodeUrl,
  subCode,
  getCookie
}

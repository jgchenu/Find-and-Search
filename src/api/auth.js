import {
  subCode,
  getCodeUrl
} from '@/api/tool.js'
import {
  Toast
} from "mint-ui";
import router from '@/router';
var auth = (status, message = null) => {
  // let url = "http://192.168.137.1:8080";
  // let url = "http://192.168.1.141:8080";
  // let url = "http://192.168.1.113:8080";
  // let url = "http://chenjianguang.com/lixun";
  let url = "http://jwwo.szer.me/lx/index.html";
  // let url = window.location.href;
  // let url = "http://172.29.24.102:8080";

  switch (status) {
    case 40102:
    case 40005:
      console.log(router);
      window.localStorage.setItem('lx_router', router.history.pending && router.history.pending.fullPath || router.history.current.fullPath);
      Toast({
        message: message,
        iconClass: "iconfont icon-xiaolianchenggong",
        duration: 800
      });
      setTimeout(() => {
        window.location.href = getCodeUrl(url, "wx0c6e2f0a288033bc", 2);
      }, 1000);
      break;
    case 40402:
      Toast({
        message: "暂无资源~",
        iconClass: "iconfont icon-xiaolianchenggong",
        duration: 800
      });
      break;
    case 40302:
    case 40003:
    default:
      message ? Toast({
        message: message,
        iconClass: "iconfont icon-xiaolianchenggong",
        duration: 800
      }) : null;
      break;
  }
};
export default auth;

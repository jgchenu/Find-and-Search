import {
  subCode,
  getCodeUrl,
  delCookie,
  getCookie

} from '@/api/tool.js'
import {
  redirectUrl,
  appId
} from './variable'
import {
  Toast
} from "mint-ui";
import router from '@/router';
var auth = (status, message = null) => {
  switch (status) {
    case 40102:
    case 40005:
      // console.log(router);
      delCookie('lzs_token');
      window.localStorage.setItem('lx_router', router.history.pending && router.history.pending.fullPath || router.history.current.fullPath);
      Toast({
        message: message,
        iconClass: "iconfont icon-xiaolianchenggong",
        duration: 800
      });
      setTimeout(() => {
        window.location.href = getCodeUrl(redirectUrl, appId, 2);
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

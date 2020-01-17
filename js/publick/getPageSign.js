
let getPageSign = function () {
  console.log("getPageSign-----------授权的地址")
  console.log(window.location.href)
  $.ajax({
    type: "get",
    // url: "http://v.boaov.org/boaokt/syswx/getsign.do",
    url: "http://ad.boaov.org/boaoweb/syswx/getsign.do",
    data: {
      xsid: localStorage.getItem("ba_xsid"),
      url: window.location.href
    },
    dataType: "json",
    success: function (res) {
      const data = res.data;
      if (res.code == "Y") {
        console.log("网页授权：")
        console.log(data)
          wx.config({
            debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
            appId: 'wx81c0e876250529e8', // 必填，公众号的唯一标识
            timestamp: data.timestamp, // 必填，生成签名的时间戳
            nonceStr: data.nonceStr, // 必填，生成签名的随机串
            signature: data.signature, // 必填，签名
            jsApiList: [
              'onMenuShareTimeline',
              'onMenuShareAppMessage',
              'onMenuShareQQ',
              'onMenuShareWeibo',
              'onMenuShareQZone',
              'startRecord',
              'stopRecord',
              'onVoiceRecordEnd',
              'playVoice',
              'pauseVoice',
              'stopVoice',
              'onVoicePlayEnd',
              'uploadVoice',
              'downloadVoice',
              'chooseImage',
              'previewImage',
              'uploadImage',
              'downloadImage',
              'translateVoice',
              'getNetworkType',
              'openLocation',
              'getLocation',
              'hideOptionMenu',
              'showOptionMenu',
              'hideMenuItems',
              'showMenuItems',
              'hideAllNonBaseMenuItem',
              'showAllNonBaseMenuItem',
              'closeWindow',
              'scanQRCode',
              'chooseWXPay',
              'openProductSpecificView',
              'addCard',
              'chooseCard',
              'openCard'
            ] // 必填，需要使用的JS接口列表
          });
      }
    }
  });
}

const doubleGetPageSign = function (data) {
  $.ajax({
    type: "get",
    // url: "http://v.boaov.org/boaokt/sysbapay/gethd20181111client.do",
    url: "http://ad.boaov.org/boaoweb/sysbapay/gethd20181111client.do",
    data: {
      xsid: localStorage.getItem("ba_xsid"),
      browserlx:"wx"
    },
    dataType: "json",
    success: function (res) {
      const data = res.data;
      buydata = res.data;
      if (res.code == "Y") {
        console.log("bouble----------网页授权：")
        console.log(data)
        wx.config({
          debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
          appId: 'wx81c0e876250529e8', // 必填，公众号的唯一标识
          timestamp: data.timestamp, // 必填，生成签名的时间戳
          nonceStr: data.nonceStr, // 必填，生成签名的随机串
          signature: data.signature, // 必填，签名
          jsApiList: [
            'onMenuShareTimeline',
            'onMenuShareAppMessage',
            'onMenuShareQQ',
            'onMenuShareWeibo',
            'onMenuShareQZone',
            'startRecord',
            'stopRecord',
            'onVoiceRecordEnd',
            'playVoice',
            'pauseVoice',
            'stopVoice',
            'onVoicePlayEnd',
            'uploadVoice',
            'downloadVoice',
            'chooseImage',
            'previewImage',
            'uploadImage',
            'downloadImage',
            'translateVoice',
            'getNetworkType',
            'openLocation',
            'getLocation',
            'hideOptionMenu',
            'showOptionMenu',
            'hideMenuItems',
            'showMenuItems',
            'hideAllNonBaseMenuItem',
            'showAllNonBaseMenuItem',
            'closeWindow',
            'scanQRCode',
            'chooseWXPay',
            'openProductSpecificView',
            'addCard',
            'chooseCard',
            'openCard'
          ] // 必填，需要使用的JS接口列表
        });
      }
    }
  });
}
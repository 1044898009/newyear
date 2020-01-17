console.log("sss");
let ShareTimeline = function () {
  console.log("分享函数调用")
  wx.ready(function () {   //分享到朋友圈
    wx.onMenuShareTimeline({
      title: `你有一份春节现金红包待领取，可立即提现！`, // 分享标题
      // title: `2019护考考试题目及答案解析(各场次) 博傲金题`,
      desc: '春节发钱了，博傲教育10万元现金红包正在发放中，可立即提现，先到先得，发完为止！', // 分享描述
      link: "http://c.boaov.org/boaohtml/Festival/components/home.html?yqxsid="+localStorage.getItem("ba_xsid"), // 分享链接
      imgUrl: "http://c.boaov.org/boaohtml/lrvideo/img/logo.png", // 分享图标
      success: function () {
        // 用户确认分享后执行的回调函数
      },
      cancel: function (data) {
        // 用户取消分享后执行的回调函数
        console.log("退出朋友圈");
      },
      fail: function (res) {
        alert(
          "wx.onMenuShareTimeline:fail: " +
          JSON.stringify(res)
        );
      }
    });

    // 分享给朋友
    wx.onMenuShareAppMessage({
      title: `你有一份春节现金红包待领取，可立即提现！`, // 分享标题
      desc: `春节发钱了，博傲教育10万元现金红包正在发放中，可立即提现，先到先得，发完为止！`, // 分享描述
      link: "http://c.boaov.org/boaohtml/Festival/components/home.html?yqxsid=" + localStorage.getItem("ba_xsid"), // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
      imgUrl: "http://c.boaov.org/boaohtml/lrvideo/img/logo.png", // 分享图标
      type: "", // 分享类型,music、video或link，不填默认为link
      dataUrl: "" // 如果type是music或video，则要提供数据链接，默认为空
    });
    // 分享到qq
    wx.onMenuShareQQ({
      title: '你有一份春节现金红包待领取，可立即提现！', // 分享标题
      desc: "春节发钱了，博傲教育10万元现金红包正在发放中，可立即提现，先到先得，发完为止！", // 分享描述
      link: "http://c.boaov.org/boaohtml/Festival/components/home.html?yqxsid=" + localStorage.getItem("ba_xsid"), // 分享链接
      imgUrl: "http://c.boaov.org/boaohtml/lrvideo/img/logo.png", // 分享图标
    });
    //“分享到腾讯微博”
    wx.onMenuShareWeibo({
      title: '你有一份春节现金红包待领取，可立即提现！', // 分享标题
        desc: "春节发钱了，博傲教育10万元现金红包正在发放中，可立即提现，先到先得，发完为止！", // 分享描述
        link: "http://c.boaov.org/boaohtml/Festival/components/home.html?yqxsid=" + localStorage.getItem("ba_xsid"), // 分享链接
        imgUrl: "http://c.boaov.org/boaohtml/lrvideo/img/logo.png", // 分享图标
    });
    //“分享到QQ空间
    wx.onMenuShareQZone({
      title: '你有一份春节现金红包待领取，可立即提现！', // 分享标题
        desc: "春节发钱了，博傲教育10万元现金红包正在发放中，可立即提现，先到先得，发完为止！", // 分享描述
        link: "http://c.boaov.org/boaohtml/Festival/components/home.html?yqxsid=" + localStorage.getItem("ba_xsid"), // 分享链接
        imgUrl: "http://c.boaov.org/boaohtml/lrvideo/img/logo.png", // 分享图标
    });
  });
}

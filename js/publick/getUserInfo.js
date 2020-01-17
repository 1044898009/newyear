const getUserInfo = function(callback){
    function GetQueryString(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg); //search,查询？后面的参数，并匹配正则
        if (r != null) return unescape(r[2]);
        return null;
    }
    let code = GetQueryString("code");
    if (!localStorage.getItem("wxid") || localStorage.getItem("wxid") == "") {
        if (code == null || code == "null" || code == "") {
            location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx81c0e876250529e8&redirect_uri=${encodeURIComponent(window.location.href)}&response_type=code&scope=snsapi_userinfo&state=123#wechat_redirect`;
        } else {
            console.log("走到 请求用户信息")
            $.ajax({
                type: "get",
                url: "http://c.boaov.org/boaoweb/syswx/getwxyhinfo.do",
                data: {
                    code: code
                },
                dataType: "json",
                success: function (res) {
                    // alert("1")
                    console.log("用户信息：");
                    console.log(res);
                    // const xsinfo = res.data.xsinfo;
                   if (res.code=="Y") {
                       localStorage.setItem("ba_dh", res.data.dh);
                       localStorage.setItem("ba_nc", res.data.nc);
                       localStorage.setItem("ba_url", res.data.url);
                       localStorage.setItem("ba_wxid", res.data.wxid);
                       localStorage.setItem("ba_xb", res.data.xb);
                       localStorage.setItem("ba_xsid", res.data.xsid);
                       if (isFn(localStorage.getItem("yqxsid"))) {
                            localStorage.setItem("yqxsid", res.data.yqxsid);
                       }
                   }else{
                       alert(res.msg)
                   }
                    callback();
                },
                error: function (err) {
                    alert(err);
                }
            });
        }
    }
}
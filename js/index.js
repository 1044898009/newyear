getPageSign();
ShareTimeline();
if (isFn(localStorage.getItem("ba_wxid"))) {
    location.href = "./home.html?yqxsid=" + localStorage.getItem("yqxsid");
}
$(".btn_url>li").eq(1).children("dl").children("dt").children(".img_nav").show().parent().parent().parent().siblings().children("dl").children("dt").children(".img_nav").hide();
$(".btn_url>li").eq(1).children("dl").children("dt").children(".index_img").hide().parent().parent().parent().siblings().children("dl").children("dt").children(".index_img").show();
var time_sj = "";
var datas = [];
var isks = "";
var arr = [
    {
        "img_one":"../img/ljlq_one.png",
        "img_two":"../img/ljlq_two.png"
    },{
        "img_one": "../img/index_one.png",
        "img_two": "../img/index_two.png"
    },{
        "img_one": "../img/ljtx_one.png",
        "img_two": "../img/ljtx_two.png"
    }
]
var btn = document.querySelectorAll("dd");
console.log(btn);
if (isFn(localStorage.getItem("ba_dh"))) {
    $(".ljtx_tel").hide();
    $(".ljtx_money").css({
        "margin-top":"0.8rem"
    });
}else{
    $(".shoujihao").html(localStorage.getItem("ba_dh"));
}
function ajax(){
    $.ajax({
        type: "get",
        url: url + "hdorder1/getydhdindex3.do",
        data: {
            wxid: localStorage.getItem("ba_wxid")
        },
        dataType: "json",
        success: function (res) {
            // alert("2")
            console.log(res);
            if (res.code=="Y") {
                fun_getindex(res);
            }else if(res.code=="N"){
                alert(res.msg);
            }
        }
    });
}
ajax();
var num;
for (let i = 0; i < btn.length; i++) {
    // console.log(i);
    $(".btn_url>li").eq(i).click(function (e) {
        e.preventDefault();
        // if (isks == "Y") {
        //     $(".huodong_tan").show();
        //     // alert("活动已结束，除夕见！")
        // }else{
            if (time_sj == "N") {
                $(".gksp_tan").show();
            } else {
                var vid = document.querySelector("video");
                vid.pause();
                console.log();
                $(".btn_url>li").eq(i).css({
                    "color": "red"
                }).siblings().css({
                    "color": "#bcbfd2"
                })
                // console.log($(".btn_url>li").eq(i).children("dl").children("dt").children("img"));
                $(".btn_url>li").eq(i).children("dl").children("dt").children(".img_nav").show().parent().parent().parent().siblings().children("dl").children("dt").children(".img_nav").hide()
                $(".btn_url>li").eq(i).children("dl").children("dt").children(".index_img").hide().parent().parent().parent().siblings().children("dl").children("dt").children(".index_img").show()
                
                num = i
                if (i == 2) {
                    i = 0
                }
                $(".list_page").eq(i).show().siblings().hide();
                i = num
                return;
            }
        // }
    });
}
let yzmcode = null;
let time = null;
$('.sendYzm').click(function () {
    let telInput = $.trim($('.phoneInp').val());
    const reg = /^1(?:3\d|4[4-9]|5[0-35-9]|6[67]|7[013-8]|8\d|9\d)\d{8}$/;
    if (telInput == '') {
        alert("请输入手机号");
    } else if (!reg.test(telInput)) {
        alert("请输入正确手机号码");
    } else {
        let n = 120;
        $('.sendYzm').attr("disabled", true); // 不能点击
        time = setInterval(() => {
            console.log("定时器");
            n--;
            $('.sendYzm').html(n + "s")
            if (n == 0) {
                $('.sendYzm').html("发送验证码");
                clearInterval(time);
                $('.sendYzm').attr("disabled", false);
            }
        }, 1000);
        // console.log("发送验证码事件触发");
        $.ajax({
            type: "get",
            // url: "http://v.boaov.org/boaokt/wxbooksp/getyzmcode.do",
            url: "http://c.boaov.org/boaoweb/hdorder1/getyzmcode2.do",
            data: {
                wxid:localStorage.getItem("ba_wxid"),
                xsid:localStorage.getItem("ba_xsid"),
                dh:telInput
            },
            dataType: "json",
            success: function (res) {
                console.log(res);
                if (res.code == "N") {
                    $('.sendYzm').html("发送验证码");
                    clearInterval(time);
                    alert(res.msg)
                    $('.sendYzm').attr("disabled", false);
                } else if (res.code == "Y") {
                    yzmcode = res.data.yzmcode;
                } 
                // else if (res.code == "L") {
                //     window.location.href = "./home.html?yqxsid=" + localStorage.getItem("yqxsid")
                // }
            }
        });
    }
});
$('.BTN').click(function (e) {
    e.preventDefault();
    console.log("确认按钮触发");
    let telInput = $.trim($('.phoneInp').val());
    if (yzmcode == null && telInput == '') {
        alert("请输入手机号");
    } else {
        if (parseInt($('.yzmInp').val()) == parseInt(yzmcode)) {
            clearInterval(time);
            console.log("输入验证码和后台验证码一样");
            $.ajax({
                type:"get",
                // url: "http://v.boaov.org/boaokt/wxbooksp/updatexstel.do",
                url:"http://c.boaov.org/boaoweb/hdorder1/updatexstel2.do",
                data:{
                    wxid:localStorage.getItem("ba_wxid"),
                    xsid:localStorage.getItem("ba_xsid"),
                    yqxsid:localStorage.getItem("yqxsid"),
                    yzmcode:yzmcode,
                    dh:telInput,
                },
                dataType:"json",
                success:function (res){
                    console.log(res);
                    if (res.code == "Y"){
                        $(".wsxx_tan").hide();
                        localStorage.setItem("ba_nc", res.data.nc);
                        localStorage.setItem("ba_dh", res.data.dh);
                        localStorage.setItem("ba_url", res.data.url);
                        localStorage.setItem("ba_wxid", res.data.wxid);
                        localStorage.setItem("ba_xb", res.data.xb);
                        localStorage.setItem("ba_xsid", res.data.xsid);
                        $(".ljtx_tel").show();
                        $(".shoujihao").html(res.data.dh);
                        $(".ljtx_money").css({
                            "margin-top":"0"
                        });
                    } else if (res.code == "N") {
                        alert(res.msg);
                    } 
                    // else if(res.code == "L"){                   
                    //     window.location.href = "./home.html?yqxsid=" + localStorage.getItem("yqxsid")
                    // }
                }
            });
        } else {
            alert("验证码输入错误");
        }
    }
});
$(".ljtx_btn").click(function (e) {
    e.preventDefault();
    if (isFn(localStorage.getItem("ba_dh"))) {
        $(".wsxx_tan").show();
    }else{
        if (datas.txjeinfo.jeall == 0 && datas.txjeinfo.jektx == 0) {
            $(".two_tx_tan").show();
        } else if (datas.txjeinfo.jektx == 0 && datas.txjeinfo.jeall != 0) {
            $(".ze").html(datas.txmin);
            $(".one_tx_tan").show();
        } else if (datas.txjeinfo.jektx != 0) {
            fun_ajax()
        }
    }
});
// document.body.parentNode.style.overflowX = "hidden"; //隐藏横向滚动条
$(".ljlq_btn").click(function (e) {
    e.preventDefault();
    $(".fxhy_tan").show();
});
$(".wsxx_close").click(function (e) {
    e.preventDefault();
    $(".wsxx_tan").hide();
});
$(".gksp_close").click(function (e) {
    e.preventDefault();
    $(".gksp_tan").hide();
});

$(".gksp_BTN").click(function (e) {
    e.preventDefault();
    $(".gksp_tan").hide();
});
$(".txcg_close").click(function (e) {
    e.preventDefault();
    $(".txcg_tan").hide();
});
$(".txcg_BTN").click(function (e) {
    e.preventDefault();
    $(".txcg_tan").hide();
});
$(".one_tx_close").click(function (e) {
    e.preventDefault();
    $(".one_tx_tan").hide();
});
$(".one_tx_BTN").click(function (e) {
    e.preventDefault();
    $(".one_tx_tan").hide();
});
$(".two_tx_close").click(function (e) {
    e.preventDefault();
    $(".two_tx_tan").hide();
});
$(".two_tx_BTN").click(function (e) {
    e.preventDefault();
    $(".two_tx_tan").hide();
});
$(".fxhy_close").click(function (e) {
    e.preventDefault();
    $(".fxhy_tan").hide();
});
$(".fxhy_BTN").click(function (e) {
    e.preventDefault();
    $(".fxhy_tan").hide();
});
$(".guiz_close").click(function (e) {
    e.preventDefault();
    $(".guiz_tan").hide();
});
$(".guiz_BTN").click(function (e) {
    e.preventDefault();
    $.ajax({
        type: "get",
        url: "http://v.boaov.org/boaokt/ktindex/geteccustomerlink.do",
        data:{
            lx:"xstel",
            tel:localStorage.getItem("ba_dh")
        },
        dataType: "json",
        success: function (res) {
            console.log(res);
            console.log(res.data.link);
            window.location.href = res.data.link;
        }
    });
});
$(".huodong_close").click(function (e) {
    e.preventDefault();
    $(".huodong_tan").hide();
});
$(".banner_con").click(function (e) {
    e.preventDefault();
    console.log(time_sj);
    console.log(datas);
});
function getJeNumber(je) {
    var s = (Math.round(je * 100) / 100).toString();
    var rs = s.indexOf('.');
    if (rs < 0) {
        rs = s.length;
        s += '.';
    }
    while (s.length <= rs + 2) {
        s += '0';
    }
    return s;
};
function fun_getindex(res){
    console.log(res);
    var data = res.data;
    datas = data;
    time_sj = data.txjeinfo.isspok;
    $(".time_con").html(data.begindt);
    $(".cu").html(data.enddt);
    var video_bf = `
        <video id="video_id" controls="controls" src="${data.spurl}" poster="${data.tpurl}" style="object-fit:fill"controls="controls" x-webkit-airplay="true" webkit-playsinline="true" preload="none"></video>
    `
    $(".video_bf").html(video_bf);
    var hbjl = data.hbmxlist;
    var str = "";
    $(".money").eq(0).html(data.txjeinfo.jektx);
    $(".money").eq(1).html(data.txjeinfo.jeall);
    // if (!isFns(data.txjeinfo.jeall)) {
        for (let i = 0; i < hbjl.length; i++) {
            console.log(hbjl[i]);
            var text;
            str += `
                <div class="hbjl_con">
                    <div class="hbjl_time">${hbjl[i].dt}</div>
                    <div class="hbjl_wenben">${hbjl[i].lx == 1?'领取':hbjl[i].lx == 2?'好友注册':hbjl[i].lx == 3?'提现':""}</div>
                    <div class="hbjl_je">${hbjl[i].lx == 1?"+"+getJeNumber(hbjl[i].je):hbjl[i].lx == 2?"+"+getJeNumber(hbjl[i].je):hbjl[i].lx == 3?"-"+getJeNumber(hbjl[i].je):""}元</div>
                </div>
            `
        }
        $(".hbjl_content").html(str);
        for (let i = 0; i < hbjl.length; i++) {
            if (hbjl[i].lx == 3) {
                $(".hbjl_wenben").eq(i).css({
                    "color": "rgb(227,41,33)"
                });
                $(".hbjl_je").eq(i).css({
                    "color": "rgb(0,125,252)"
                });
            } else {
                $(".hbjl_wenben").eq(i).css({
                    "color": "rgb(102,102,102)"
                });
                $(".hbjl_je").eq(i).css({
                    "color": "rgb(227,41,33)"
                });
            }
        }
    // }
    // var newDate = new Date(data.begindt);
    // var newDate2 = new Date(data.enddt);
    // var nowDate = new Date();
    // if (nowDate<newDate) {
    //     $(".huodong_tan").show();
    // } 
    // if (data.isjs=="Y") {
    //     var sjTime = `活动已结束`;
    //     $(".huodong_tan").html(sjTime);
    //     $(".huodong_tan").show();
    // }
    var vid = document.querySelector("video");
    setTimeout(function () {
        vid.ontimeupdate = function () {
            var timeere = vid.duration - 20;
            if (vid.currentTime >= vid.duration - 20) {
                // alert("磊哥哥");
                // console.log(timeere);
                // setTimeout(() => {
                    if (time_sj == "N") {
                        time_sj = "Y";
                        $.ajax({
                            type: "get",
                            url: url + "hdorder1/updateydhdisspok2.do",
                            data: {
                                xsid: localStorage.getItem("ba_xsid")
                            },
                            dataType: "json",
                            success: function (res) {
                                if (res.code == "N") {
                                    alert(res.msg);
                                }
                            }
                        });
                    }
                // }, timeere);
            }
        };
        var sym;
        setInterval(() => {
            var time = vid.currentTime;
            if (time - sym > 1) {
                vid.currentTime = sym;
            }
            sym = vid.currentTime;
        }, 500);
    }, 500)
}
function fun_ajax(){
    $.ajax({
        type: "get",
        url: url + "hdorder1/updateydhdtx3.do",
        data: {
            wxid: localStorage.getItem("ba_wxid"),
            xsid: localStorage.getItem("ba_xsid")
        },
        dataType: "json",
        success: function (res) {
            console.log(res);
            if (res.code == "Y") {
                if (res.isorderje=="Y") {
                    ajax();
                    $(".txcg_tan").show();
                }else{
                    $(".guiz_tan").show();
                }
                
            } else {
                $(".huodong_text").html(res.msg);
                $(".huodong_tan").show();
            }
        }
    });
}
var winHeight = $(window).height(); //获取当前页面高度
$(window).resize(function () {
    var thisHeight = $(this).height();
    if (winHeight - thisHeight > 140) {
        //键盘弹出
        $('.wsxx_con').css({
            "margin": "10% auto 0.4rem"
        });
        $(".btn_url").css({
            "position": "static"
        });
    } else {
        //键盘收起
        $('.wsxx_con').css({
            "margin": "30% auto 0.4rem"
        });
        $(".btn_url").css({
            "position": "fixed",
            "left": "0",
            "bottom": "0"
        });
    }
})
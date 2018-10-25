var app = getApp();
var serverUrl = require('../lib/js/main.js');

function formatTime(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()

  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()


  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}

function cutString(str, len) {
  if (!str) { return '' }
  //length属性读出来的汉字长度为1 
  if (str.length * 2 <= len) {
    return str;
  }
  var strlen = 0;
  var s = "";
  for (var i = 0; i < str.length; i++) {
    s = s + str.charAt(i);
    if (str.charCodeAt(i) > 128) {
      strlen = strlen + 2;
      if (strlen >= len) {
        return s.substring(0, s.length - 1) + "...";
      }
    } else {
      strlen = strlen + 1;
      if (strlen >= len) {
        return s.substring(0, s.length - 2) + "...";
      }
    }
  }
  return s;
}
// 百度地图逆向解析地址
function showBMap(latitude, longitude, callback) {
  var wxMarkerData = [];
}
// 购买接口
function pay(token, parentOrderId, recommendId, recommendTimeId, isCollage, price, formId, callback) {
  wx.request({
    url: serverUrl.serverUrl + "/mini/program/order/buy?token=" + token + "&parentOrderId=" + parentOrderId + "&recommendId=" + recommendId + "&recommendTimeId=" + recommendTimeId + "&isCollage=" + isCollage + "&price=" + price + "&formId=" + formId,
    data: {
      // token:"110",
      // parentOrderId:"0198900C00AB4E56B3E5300BE37D56FE",
      // recommendId:"8DF08F2F-7B46-4719-A8E5-F6CCFBB4B34E",
      // recommendTimeId:"2D9B74C3BF8240D18FA6BE723EFC9700",
      // isCollage:"1",
      // price:"50.0"
    },
    method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT  
    // header: {}, // 设置请求的 header  

    success: function (res) {
      console.log(res)
      wx.hideLoading();
      if (res.data.status == '200') {
        var orderId = res.data.data;
        wxPay(token, orderId, isCollage,callback)
      } else {
        wx.showToast({
          title: res.data.errorMsg,
          icon: 'none',
        })
      }

    },
    fail: function (res) {
      wx.hideLoading();
      wx.showToast({
        title: '网络错误，请稍后重试',
        icon: 'none',
      })
    }
  });
}
//调用微信支付
function wxPay(token, orderId, isCollage ,callback) {
  console.log(orderId)
  wx.request({
    url: serverUrl.serverUrl + "mini/program/pay/unifiedorder?token=" + token+"&orderId=" + orderId,
    data: {

    },
    method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT  
    // header: {}, // 设置请求的 header  

    success: function (res) {
      console.log(res)
      if (res.data.status=='200'){
        var appid = res.data.data.appId;
        wx.requestPayment({
          'timeStamp': res.data.data.timeStamp,
          'nonceStr': res.data.data.nonceStr,
          'package': res.data.data.exPackage,
          'signType': 'MD5',
          'paySign': res.data.data.paySign,
          'success': function (res) {
            // wx.navigateTo({
            //   url: '../pages/uclickSecTab/uclickOrder/index'

            // })
            callback(isCollage, orderId)
          },
          'fail': function (res) {
            console.log('支付失败' + res)
            wx.navigateTo({
              url: '../pages/uclickSecTab/uclickOrder/index'

            })
          }
        })

      } else {
        wx.showToast({
          title: res.data.errorMsg,
          icon: 'none',
        })
      }
      wx.hideLoading();

    },
    fail: function (res) {
      wx.hideLoading();
      wx.showToast({
        title: '网络错误，请稍后重试',
        icon: 'none',
      })
    }
  });
}
function login(e, callback) {
  console.log('login++++' + e)
  // if (e.detail.userInfo != null) {    //用户点击允许授权
  //     app.globalData.imageUrl = e.detail.userInfo.avatarUrl,
  //     app.globalData.nickNasme = e.detail.userInfo.nickName,
  //     app.globalData.authorize = true;
  // }
  wx.login({
    success: res => {
      app.globalData.nickName = '1234'
      console.log(res);
      console.log(serverUrl);
      if (res.code) {
        wx.request({
          url: serverUrl.serverUrl + 'mini/program/onLogin',
          data: { 'js_code': res.code },
          method: 'GET',
          success: function (respones) {
            console.log(respones)
            if (respones.data.status == 200) {
              var token = respones.data.data;
              wx.request({
                url: serverUrl.serverUrl + 'mini/program/signIn',
                data: {
                  'token': token,
                  'rawData': e.detail.rawData,
                  'signature': e.detail.signature,
                  'encryptedData': e.detail.encryptedData,
                  'iv': e.detail.iv
                },
                method: 'GET',
                success: function (respones) {
                  if (respones.data.status == 200) {
                    wx.showToast({
                      icon: 'none',
                      title: '授权成功',
                    })
                    console.log('111:' + respones);
                    wx.setStorageSync('token', token);
                    wx.setStorageSync('userId', respones.data.data.userId);
                    wx.setStorageSync('nickName', respones.data.data.nickName);
                    wx.setStorageSync('headImgUrl', respones.data.data.headImgUrl);
                    if (respones.data.data.mobile){
                      wx.setStorageSync('phone', respones.data.data.mobile);
                    }
                    wx.setStorageSync('isAuthor', true);
                    callback();
                  }
                  else {
                    wx.showToast({
                      icon: 'none',
                      title: respones.data.errorMsg,
                    })
                  }
                },
                fail: function (res) {
                }
              })
            } else {
              wx.showToast({
                icon: 'none',
                title: respones.data.errorMsg,
              })
            }
          },
          fail: function (res) {
            console.log(res)
          }
        })
      } else {
        console.log('登录失败！' + res.errMsg)
      }
      // 发送 res.code 到后台换取 openId, sessionKey, unionId
    }
  })
}
//校验用户是否绑定收好 下单前校验
function checkIsBindPhone(token,callback) {
  wx.request({
    url: serverUrl.serverUrl + "mini/program/check/isBindPhone?token=" + token,
    data: {

    },
    method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT  
    // header: {}, // 设置请求的 header  

    success: function (res) {
      if (res.data.status == 200) {
        if (res.data.data != '') {
          wx.setStorageSync('phone', res.data.data)
        }
      }
      console.log(res)
      wx.hideLoading();
      callback(res);
    },
    fail: function (res) {
      wx.hideLoading();
      wx.showToast({
        title: '网络错误，请稍后重试',
        icon: 'none',
      })
    }
  });
}

module.exports = {
  formatTime: formatTime,
  cutString: cutString,
  showBMap: showBMap,
  pay: pay,
  wxPay: wxPay,
  login: login,
  checkIsBindPhone: checkIsBindPhone,
}

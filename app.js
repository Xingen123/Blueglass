//app.js

var serverUrl = require('/lib/js/main.js');

App({
  globalData: {
    userInfo: null,
    imageUrl: '',
    nickName: '点击登录',
    isAuthor:false
  },
  onload:function(){
    var that = this;
    this.setData({
      imageUrl: wx.getStorageSync('headImgUrl'),
      nickName: wx.getStorageSync('nickName'),
      isAuthor: wx.getStorageSync('isAuthor'),
    })
  },
  onLaunch: function () {
    // wx.setStorageSync('userId', 'respones.data.userId');
    // wx.setStorageSync('nickName', 'respones.data.nickName');
    // wx.setStorageSync('headImgUrl', 'respones.data.headImgUrl');
    // wx.setStorageSync('isAuthor', true);
    // 展示本地存储能力
    // var logs = wx.getStorageSync('logs') || []
    // logs.unshift(Date.now())
    // wx.setStorageSync('logs', logs)
    // // 登录
    // wx.login({
    //   success: res => {
    //     console.log(serverUrl);
    //     if (res.errMsg == 'login:ok'){
    //       wx.request({
    //         url: serverUrl.serverUrl + 'mini/program/onLogin',
    //         data: {'js_code' : res.code},
    //         method: 'GET', 
    //         success:function(respones){
    //           console.log(respones)
    //           wx.setStorageSync('token', respones.data.data);
    //         },
    //         fail:function(res){

    //         }
    //       })
    //     }
    //     // 发送 res.code 到后台换取 openId, sessionKey, unionId
    //   }
    // })
 
  }
})
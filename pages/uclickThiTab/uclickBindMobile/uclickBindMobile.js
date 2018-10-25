// pages/uclickThiTab/uclickBindMobile/uclickBindMobile.js
var interval = null //倒计时函数

var serverUrl = require('../../../lib/js/main.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    date: '请选择日期',
    fun_id: 2,
    time: '获取验证码', //倒计时 
    currentTime: 61,
    phone:null,
    code:null
  },

  phoneInput: function (e) {
    const that = this;
    that.setData({
      phone: e.detail.value,
    })
  },
  codeInput: function (e) {
    const that = this;
    that.setData({
      code: e.detail.value
    })
  },
  getBindCode:function(res){

    if (this.data.phone) {
      this.getCode();
      var that = this
      that.setData({
        disabled: true
      })
      wx.showToast({
        title: '获取验证码',
      })

      wx.request({
        url: serverUrl.serverUrl + 'mini/program/sendSm',
        data: { 'phone': that.data.phone },
        method: 'GET',
        success: function (respones) {
          console.log(respones)
        },
        fail: function (res) {

        }
      })
    }
    else {
      wx.showToast({
        title: '请输入正确的手机号',
        icon: 'none',
      })
    }

  

  },



  sureAction:function(res){
    
    var that = this
    wx.request({
      url: serverUrl.serverUrl + 'mini/program/bindPhone',
      data: {
        'phone': that.data.phone,
        'token': wx.getStorageSync('token'),
        'verifyCode': that.data.code
      },
      method: 'GET',
      success: function (respones) {
        console.log(respones)
        if (respones.data.status == 200) {
          wx.setStorageSync('phone', that.data.phone);
          wx.navigateBack({
            delta: 1
          })
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
   

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },
  getCode: function (options) {
    var that = this;
    var currentTime = that.data.currentTime
    interval = setInterval(function () {
      currentTime--;
      that.setData({
        time: currentTime + '秒'
      })
      if (currentTime <= 0) {
        clearInterval(interval)
        that.interval = !1;
        that.setData({
          time: '重新发送',
          currentTime: 61,
          disabled: false
        })
      }
    }, 1000)
  },
})
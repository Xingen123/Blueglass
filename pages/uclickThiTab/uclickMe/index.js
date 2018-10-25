// pages/uclickThiTab/uclickMe/index.js
var app = getApp();
var utils = require('../../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userinfo: {},
    canIUse: false,
    avatarUrl: '../../images/default/mrtx@2x.png',
    nickName: '点击登录',
    phoneNumber: '点击绑定手机号'
  },

  onGotUserInfo: function(e) {
    var that = this;
    utils.login(e, function() {
      that.setData({
        canIUse: wx.getStorageSync('isAuthor'),
        nickName: wx.getStorageSync('nickName'),
        avatarUrl: wx.getStorageSync('headImgUrl'),
      })
      if (wx.getStorageSync('phone')) {
        that.setData({
          phoneNumber: wx.getStorageSync('phone')
        })
      }
    });

  },
  bindMobileAction: function() {
    if (wx.getStorageSync('phone')) {

    } else {
      wx.navigateTo({
        url: '../uclickBindMobile/uclickBindMobile',
        success: function(res) {},
        fail: function(res) {},
        complete: function(res) {},
      });
    }
  },

  myCouponAction: function() {
    wx.navigateTo({
      url: '../uclickMyCoupon/uclickMyCoupon',
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    });
  },

  aboutUsAction: function() {
    wx.navigateTo({
      url: '../uclickAboutBefriend/uclickAboutBefriend',
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    });
  },

  BecomeAction: function() {
    wx.navigateTo({
      url: '../uclickBecomePage/uclickBecomePage',
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // console.log(wx.getStorageSync(key))
    if (wx.getStorageSync('isAuthor')) {
      console.log(wx.getStorageSync('isAuthor'))
      console.log(wx.getStorageSync('nickName'))
      console.log(wx.getStorageSync('headImgUrl'))
      this.setData({
        canIUse: wx.getStorageSync('isAuthor'),
        nickName: wx.getStorageSync('nickName'),
        avatarUrl: wx.getStorageSync('headImgUrl')
      })
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

    if (wx.getStorageSync('phone')) {
      this.setData({
        phoneNumber: wx.getStorageSync('phone')
      })
    }
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})
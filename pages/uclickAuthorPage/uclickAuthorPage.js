// pages/login/login.js
const app = getApp()

var serverUrl = require('../../lib/js/main.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },

  /**
   * 生命周期函数--监听页面加载
   */

  login: function (e) {
    console.log(e.detail.userInfo);
    if (e.detail.userInfo) {
      app.globalData.userInfo = e.detail.userInfo
      wx.request({
        url: serverUrl.serverUrl + 'mini/program/signIn',
        data: { 'token': wx.getStorageSync('token'),
          'rawData': e.detail.userInfo.rawData,
          'signature': e.detail.userInfo.signature,
          'encryptedData': e.detail.userInfo.encryptedData,
          'iv': e.detail.userInfo.iv },
        method: 'GET',
        success: function (respones) {
          console.log(respones)
          wx.navigateBack({
            delta: 1
          })
        },
        fail: function (res) {

        }
      })
    }
  },
  
  onLoad: function (options) {
    this.login();
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

})
// pages/uclickFirTab/changeUserInfo/changeUserInfo.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  getNickName: function(e) {
    var val = e.detail.value;
    this.setData({
      nickName: val
    });
  },

  getPhone: function(e) {
    var val = e.detail.value;
    this.setData({
      telphone: val
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  sureAction: function(res) {

    if (this.data.telphone.length != 11) {
      wx.showToast({
        title: '请输入正确的手机号',
        icon: 'none',
      })
      return;
    }
    if (this.data.nickName.length < 1) {
      wx.showToast({
        title: '请输入昵称',
        icon: 'none',
      })
      return;
    }
    var pages = getCurrentPages(); //  获取页面栈
    var currPage = pages[pages.length - 1]; // 当前页面
    var prevPage = pages[pages.length - 2]; // 上一个页面
    prevPage.setData({
      phoneNumber: this.data.telphone,
      userName: this.data.nickName,
    })
    wx.navigateBack({
      delta: 1
    })
  },

  onLoad: function(options) {

    this.setData({
      nickName: options.userName,
      telphone: options.phoneNumber
    })

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
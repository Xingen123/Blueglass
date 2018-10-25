// pages/uclickSecTab/share/index.js
var utils = require('../../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    defaultheaderImg: "../../images/default/mrtx@2x.png", //默认图片
    defaultSamllScrollImg: "../../images/default/180-120.png", //默认图片
    recommendData: '',
    recommendDetail: '',
    isCollage: 0, //0 不拼团   1拼团
    parentOrderId: '', //是否拼团
  },
  headerErrorFunction: function(e) {

    if (e.type == "error") {
      headImgUrl = this.data.defaultheaderImg; //错误图片替换为默认图片
      this.setData({
        headImgUrl: headImgUrl
      })
    }
  },

  recErrorFunction: function(e) {

    if (e.type == "error") {
      var recommendDetail = this.data.recommendDetail;

      recommendDetail.imgsUrl[0] = this.data.defaultSamllScrollImg; //错误图片替换为默认图片
      this.setData({
        recommendDetail: recommendDetail
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(options.recommendDetail)

    this.data.recommendDetail = JSON.parse(options.recommendDetail.replace(/tengyujisnclldkg/g, '&'));
    console.log(this.data.recommendDetail)
    var isAlone = true;
    if (options.isAlone == 'NO') {
      isAlone = false;
      this.setData({
        isCollage: '1'
      })
    } else {
      this.setData({
        isCollage: '0'
      })
    }
    var phoneNumber = wx.getStorageSync('phone'); //wx.getStorageSync(key)，获取本地缓存
    var nickName = wx.getStorageSync('nickName'); //wx.getStorageSync(key)，获取本地缓存
    var headImgUrl = wx.getStorageSync('headImgUrl'); //wx.getStorageSync(key)，获取本地缓存
    if (headImgUrl == '') {
      headImgUrl = this.data.defaultheaderImg;
    }
    this.setData({
      isAlone: isAlone,
      recommendDetail: this.data.recommendDetail,
      experTime: this.data.recommendDetail.timeInfos[0],
      phoneNumber: phoneNumber,
      userName: nickName,
      headerUrl: headImgUrl
    })
  },
  /**
   * 选择时间
   */
  pushTimeSelect: function(event) {
    var chooseId = event.currentTarget.dataset.timeid;
    console.log(event)
    wx.navigateTo({
      url: '../selectTime/selectTime?timeStr=' + JSON.stringify(this.data.recommendDetail.timeInfos) + '&isSelect=YES&chooseId=' + chooseId,

    })
  },

  changeUserInfo: function(event) {
    wx.navigateTo({
      url: '../changeUserInfo/changeUserInfo?phoneNumber=' + this.data.phoneNumber + '&userName=' + this.data.userName,

    })
  },
  pay: function(e) {
    var that = this;
    console.log(e)
    var formId = e.detail.formId;
    var token = wx.getStorageSync('token');
    var bindPhone = wx.getStorageSync('phone');
    if (!token) {
      utils.login();
    } else if (!bindPhone) {
      utils.checkIsBindPhone(token, function(res) {
        if (res.data.status == 200 ) {
          if(res.data.data == ''){
            wx.navigateTo({
              url: '../../uclickThiTab/uclickBindMobile/uclickBindMobile',
              success: function (res) { },
              fail: function (res) { },
              complete: function (res) { },
            });
          }
          else
          {
            utils.pay(token, that.data.parentOrderId, that.data.recommendDetail.recommendId, that.data.experTime.timeId, that.data.isCollage, that.data.isCollage == "1" ? that.data.recommendDetail.collagePrice : that.data.recommendDetail.price, formId, function (isCollage, orderId) {
              // console.log('callback ' + resd);
              if (isCollage == "1") {
                wx.navigateTo({
                  url: '../../uclickSecTab/collageDetail/index?orderId=' + orderId + '&backlevel=3',
                })
              } else {
                wx.navigateTo({
                  url: '../../uclickSecTab/haveInHand/index?orderId=' + orderId + '&backlevel=3',
                })
              }
            });
          }

        } else {
          wx.showToast({
            title: res.data.errorMsg,
            icon: 'none',
          })
        }
      })
    } else {
      // console.log('recommendTimeId:' + e.target.dataset.timeid)
      // console.log(this.data.isCollage)
      // console.log(this.data.recommendDetail.recommendId)
      // console.log(this.data.recommendDetail.timeInfos[0].timeId)
      // console.log(this.data.recommendDetail.price);
      // console.log(typeof(this.data.isCollage))
      utils.pay(token, this.data.parentOrderId, this.data.recommendDetail.recommendId, this.data.experTime.timeId, this.data.isCollage, this.data.isCollage == "1" ? this.data.recommendDetail.collagePrice : this.data.recommendDetail.price, formId, function(isCollage, orderId) {
        // console.log('callback ' + resd);
        if (isCollage == "1") {
          wx.navigateTo({
            url: '../../uclickSecTab/collageDetail/index?orderId=' + orderId + '&backlevel=3',
          })
        } else {
          wx.navigateTo({
            url: '../../uclickSecTab/haveInHand/index?orderId=' + orderId + '&backlevel=3',
          })
        }
      });
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
  // onShareAppMessage: function() {

  // },
  share: function() {
    wx.navigateTo({
      url: '../share/index',
    })
  }
})
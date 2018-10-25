// pages/uclickSecTab/share/index.js
var serverUrl = require('../../../lib/js/main.js');
var utils = require('../../../utils/util.js');


/* 毫秒级倒计时 */
function countdown(that) {
  // 渲染倒计时时钟
  that.setData({
    clock: dateformat(that.data.total_micro_second)
  });

  if (that.data.total_micro_second <= 0) {
    that.setData({
      clock: "已经截止",
      isHiddenPay: true
    });
    // timeout则跳出递归
    return;
  }
  setTimeout(function() {
    // 放在最后--
    that.data.total_micro_second -= 1;
    countdown(that);
  }, 1000)
}

// 时间格式化输出，如3:25:19 86。每10ms都会调用一次
function dateformat(micro_second) {
  // 秒数
  var second = Math.floor(micro_second);
  // 小时位
  var hr = Math.floor(second / 3600);
  if (parseInt(hr) < 10) {
    hr = '0' + hr
  }
  // 分钟位
  var min = Math.floor((second - hr * 3600) / 60);
  if (parseInt(min) < 10) {
    min = '0' + min
  }
  // 秒位
  var sec = (second - hr * 3600 - min * 60);// equal to => var sec = second % 60;
  if (parseInt(sec) < 10) {
    sec = '0' + sec
  }
  // 毫秒位，保留2位
  var micro_sec = Math.floor((micro_second % 1000) / 10);
  return hr + ":" + min + ":" + sec;
}
Page({

  /**
   * 页面的初始数据
   */
  data: {
    defaultheaderImg: "../../images/default/mrtx@2x.png", //默认图片
    defaultSamllScrollImg: "../../images/default/180-120.png", //默认图片
    token: '110',
    isHiddenPay: false,
    isAuthor: false,
    orderId: 0,
    // token: wx.getStorageSync("token"),
  },

  push_experience: function(event) {
    var experId = this.data.collagingOrderInfo.recommendId;

    wx.navigateTo({
      url: '../../uclickFirTab/experience/index?experId=' + experId,
    })
  },
  onGotUserInfo: function(e) {
    var that = this;
    utils.login(e, function() {
      that.setData({
        isAuthor: wx.getStorageSync('isAuthor'),
      })
    });

  },

  completedErrorFunction: function(e) {
    if (e.type == "error") {
      var collagingOrderInfo = this.data.collagingOrderInfo;　　　　　　　 //将图片列表数据绑定到变量
      collagingOrderInfo.recommendImg = this.data.defaultSamllScrollImg; //错误图片替换为默认图片
      this.setData({
        collagingOrderInfo: collagingOrderInfo
      })
    }
  },
  headerErrorFunction: function(e) {
    if (e.type == "error") {
      var errorImgIndex = e.target.dataset.errorimg; //获取错误图片循环的下标
      var collagingOrderInfo = this.data.collagingOrderInfo;　　　　　　　 //将图片列表数据绑定到变量
      collagingOrderInfo.groupMembers[errorImgIndex].memberIconUrl = this.data.defaultheaderImg; //错误图片替换为默认图片
      this.setData({
        collagingOrderInfo: collagingOrderInfo
      })
    }
  },
  requestNetWork: function(orderId) {
    var that = this;
    wx.showLoading({
        title: '正在加载',
      }),
      wx.request({
      url: serverUrl.serverUrl + 'mini/program/order/shareInfo?token=' + that.data.token + '&orderId=' + orderId,
        data: {},
        method: 'GET',
        success: function(res) {
          wx.hideLoading();

          if (res.data.status == 200) {
            that.setData({
              collagingOrderInfo: res.data.data,
              total_micro_second: res.data.data.remainSencods,
              isHiddenPay: res.data.data.groupMembers.length >= res.data.data.collageCount ? true:false
            })
            countdown(that);


          } else {
            wx.showToast({
              title: res.data.errorMsg,
              icon: 'none',
            })
          }

        },
        fail: function(res) {
          wx.hideLoading();
          wx.showToast({
            title: '网络错误，请稍后重试',
            icon: 'none',
          })
        }
      });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      isAuthor: wx.getStorageSync('isAuthor')
    })

    this.setData({
      token: wx.getStorageSync('token'),
      orderId: options.orderId
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
    this.requestNetWork(this.data.orderId);

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

  },

  shareClick: function(e) {
    console.log(this.data.collagingOrderInfo)
    var that = this;
    if (this.data.collagingOrderInfo.loginUserJoinGroup) {
      // wx.showToast({
      //   title: '跳转订单列表拼团中',
      // })
      wx.navigateTo({
        url: '../collageDetail/index?orderId=' + this.data.collagingOrderInfo.orderId,
        success: function(res) {
          console.log(res);
        },
        fail: function(res) {
          console.log(res);
        },
        complete: function(res) {},
      })
    } else {
      console.log(e)
      var formId = e.detail.formId;
      var token = wx.getStorageSync('token');
      var bindPhone = wx.getStorageSync('phone');
      console.log('=========formId' + formId);
      console.log('=========token' + token);
      console.log('=========phone' + bindPhone);
      if (!token) {
        utils.login();
      } else if (!bindPhone) {
        utils.checkIsBindPhone(token, function(res) {
          if (res.data.status == 200) {
            if (res.data.data == '') {
              wx.navigateTo({
                url: '../../uclickThiTab/uclickBindMobile/uclickBindMobile',
                success: function(res) {},
                fail: function(res) {},
                complete: function(res) {},
              });
            } else {
              utils.pay(token, that.data.collagingOrderInfo.orderId, that.data.collagingOrderInfo.recommendId, that.data.collagingOrderInfo.recommendTimeId, '1', that.data.collagingOrderInfo.payedAmount, formId, function(isCollage, orderId) {
                if (isCollage == "1") {
                  wx.navigateTo({
                    url: '../../uclickSecTab/collageDetail/index?orderId=' + orderId,
                  })
                } else {
                  wx.navigateTo({
                    url: '../../uclickSecTab/haveInHand/index?orderId=' + orderId,
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
        // console.log(typeof (this.data.isCollage))
        utils.pay(token, this.data.collagingOrderInfo.orderId, this.data.collagingOrderInfo.recommendId, this.data.collagingOrderInfo.recommendTimeId, '1', this.data.collagingOrderInfo.payedAmount, formId, function(isCollage, orderId) {
          if (isCollage == "1") {
            wx.navigateTo({
              url: '../../uclickSecTab/collageDetail/index?orderId=' + orderId,
            })
          } else {
            wx.navigateTo({
              url: '../../uclickSecTab/haveInHand/index?orderId=' + orderId,
            })
          }
        });
      }
    }


  }
})
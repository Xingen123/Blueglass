var serverUrl = require('../../../lib/js/main.js');

var tabs = [{
    name: "拼团中"
  },
  {
    name: "进行中"
  },
  {
    name: "已完成"
  }
];
Page({



  /**
   * 页面的初始数据
   */
  data: {
    imgUrls: [
      'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg'
    ],
    indicatorDots: true,
    indicatorColor: 'rgba(255, 255, 255, 0.8)',
    indicatorActiveColor: '#0082bf',
    circular: true,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    navScrollLeft: 0,
    currentTab: 0,
    currentType: 0,
    tabs: tabs, //展示的数据
    slideOffset: 0, //指示器每次移动的距离
    activeIndex: 0, //当前展示的Tab项索引
    sliderWidth: 96, //指示器的宽度,计算得到
    contentHeight: 0, //页面除去头部Tabbar后，内容区的总高度，计算得到
    clientHeight: 400,
    token: wx.getStorageSync('token'),
    // token: wx.getStorageSync("token"),
    defaultScrollImg: "../../images/default/690-460.png", //默认图片

  },

  collageErrorFunction: function(e) {
    if (e.type == "error") {
      var errorImgIndex = e.target.dataset.errorimg; //获取错误图片循环的下标
      var collagingOrderlist = this.data.collagingOrderlist;　　　　　　　 //将图片列表数据绑定到变量
      collagingOrderlist[errorImgIndex].orderImgUrl = this.data.defaultScrollImg; //错误图片替换为默认图片
      this.setData({
        collagingOrderlist: collagingOrderlist
      })
    }
  },
  underWayErrorFunction: function(e) {
    if (e.type == "error") {
      var errorImgIndex = e.target.dataset.errorimg; //获取错误图片循环的下标
      var underWayOrderlist = this.data.underWayOrderlist;　　　　　　　 //将图片列表数据绑定到变量
      underWayOrderlist[errorImgIndex].orderImgUrl = this.data.defaultScrollImg; //错误图片替换为默认图片
      this.setData({
        underWayOrderlist: underWayOrderlist
      })
    }
  },
  completedErrorFunction: function(e) {
    if (e.type == "error") {
      var errorImgIndex = e.target.dataset.errorimg; //获取错误图片循环的下标
      var completeOrderlist = this.data.completeOrderlist;　　　　　　　 //将图片列表数据绑定到变量
      completeOrderlist[errorImgIndex].orderImgUrl = this.data.defaultScrollImg; //错误图片替换为默认图片
      this.setData({
        completeOrderlist: completeOrderlist
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  requestNetWork: function(taptype) {
    var that = this;
    
    wx.showLoading({
      title: '正在加载',
    })
    wx.request({
      url: serverUrl.serverUrl + 'mini/program/user/orders?token=' + that.data.token + '&status=' + taptype,
      data: {},
      method: 'GET',
      success: function(res) {
        wx.hideLoading();

        if (res.data.status == 200) {
          if (taptype == 'collaging') {
            that.setData({
              collagingOrderlist: res.data.data,

            });
            if (that.data.collagingOrderlist.length > 0) {
              that.beginTimer();
            }

            // 默认获取拼团中内容高度


          } else if (taptype == 'underWay') {
            that.setData({
              underWayOrderlist: res.data.data,

            })
          } else if (taptype == 'complete') {
            that.setData({
              completeOrderlist: res.data.data,

            })
          }
          var typeStr;
          if (that.data.currentType == 0) {
            typeStr = '.collage';
          } else if (that.data.currentType == 1) {
            typeStr = '.have_in_hand';

          } else {
            typeStr = '.completed';

          }
          var query = wx.createSelectorQuery();
          query.select(typeStr).boundingClientRect();
          query.exec(function(res) {
            //res就是 所有标签为mjltest的元素的信息 的数组
            console.log(res);
            //取高度
            if (!res[0]) {
              that.setData({
                clientHeight: 400
              })
            } else {
              that.setData({
                clientHeight: res[0].height
              })
            }
          })



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
  beginTimer: function() {
    clearInterval(this.timer);
    let that = this;
    var collagingOrderlist = that.data.collagingOrderlist;
    var len = collagingOrderlist.length; //时间数据长度
    function nowTime() { //时间函数
      // console.log(a)
      for (var i = 0; i < len; i++) {
        var intDiff = collagingOrderlist[i].remainSeconds; //获取数据中的时间戳
        // console.log(intDiff)
        var day = 0,
          hour = 0,
          minute = 0,
          second = 0;
        if (intDiff > 0) { //转换时间
          day = Math.floor(intDiff / (60 * 60 * 24));
          hour = Math.floor(intDiff / (60 * 60));
          minute = Math.floor(intDiff / 60) - (hour * 60);
          second = Math.floor(intDiff) - (hour * 60 * 60) - (minute * 60);
          if (hour <= 9) hour = '0' + hour;
          if (minute <= 9) minute = '0' + minute;
          if (second <= 9) second = '0' + second;
          collagingOrderlist[i].remainSeconds--;
          var str = hour + ':' + minute + ':' + second
          // console.log(str)    
        } else {
          var str = "已结束！";
          clearInterval(this.timer);
          that.requestNetWork('collaging');
          that.requestNetWork('underWay');
          that.requestNetWork('complete');
          return;
        }
        // console.log(str);
        collagingOrderlist[i].difftime = str; //在数据中添加difftime参数名，把时间放进去

      }
      that.setData({
        collagingOrderlist: collagingOrderlist
      })
    }

    nowTime();
    this.timer = setInterval(nowTime, 1000);
  },
  onLoad: function(options) {
    var that = this;
    this.setData({
      token: wx.getStorageSync('token')
    })
    wx.getSystemInfo({
      success: function(res) {
        console.log(res)
        that.setData({
          //计算相关宽度
          clientHeight: res.windowHeight,
          sliderWidth: res.windowWidth / that.data.tabs.length,
          sliderOffset: res.windowWidth / that.data.tabs.length * that.data.activeIndex,
          contentHeight: res.windowHeight - res.windowWidth / 750 * 68 //计算内容区高度，rpx -> px计算
        });
      }
    });


  },
  bindChange: function(e) {
    var that = this;

    var current = e.detail.current;
    that.setData({
      currentType: current
    });
    //创建节点选择器


    this.setData({
      activeIndex: current,
      sliderOffset: this.data.sliderWidth * current,
    });
    var typeStr;
    if (that.data.currentType == 0) {
      typeStr = '.collage';
    } else if (that.data.currentType == 1) {
      typeStr = '.have_in_hand';

    } else {
      typeStr = '.completed';

    }
    var query = wx.createSelectorQuery();
    query.select(typeStr).boundingClientRect();
    query.exec(function(res) {
      //res就是 所有标签为mjltest的元素的信息 的数组
      console.log(res);
      //取高度
      if (!res[0]){
        that.setData({
          clientHeight: 400
        })
      }else{
        that.setData({
          clientHeight: res[0].height
        })
      }
      
    })
  },

  navTabClick: function(e) {

    this.setData({
      sliderOffset: e.currentTarget.offsetLeft,
      activeIndex: e.currentTarget.id,
    });


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
    var that = this;
    this.setData({
      token: wx.getStorageSync('token')
    })
    if(this.data.token){
      that.requestNetWork('collaging');
      that.requestNetWork('underWay');
      that.requestNetWork('complete');
    }
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {
    clearInterval(this.timer);
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
  // onShareAppMessage: function (res) {
  //   if (res.from == "button") {
  //     //分享为按键中的求助即id=1

  //     var collagingOrderlist = this.data.collagingOrderlist;　　　　　　　 //将图片列表数据绑定到变量
  //     var orderInfo = collagingOrderlist[res.target.id];

  //       return {
  //         title: orderInfo.recommendTitle,
  //         path: 'pages/uclickSecTab/share/index?orderId=' + orderInfo.orderId,
  //         desc: '邀请体验',
  //         imageUrl: orderInfo.orderImgUrl,
  //         success: function (res) {
  //           if (this.data.savedId === orderInfo.orderId) {
  //             return;
  //           }

  //           this.saveData().then(() => {
  //             this.setData({
  //               savedId: orderInfo.orderId
  //             });
  //             // todo 如果跳转到其他页面，删除this.data.id
  //           });
  //         }
  //       };
     
  //   }

  // },
  /**
   * 进行中
   */
  collage: function(event) {
    var orderId = event.currentTarget.dataset.orderid;

    wx.navigateTo({
      url: '../collageDetail/index?orderId=' + orderId,
    })
  },
  HaveInHand: function(event) {
    var orderId = event.currentTarget.dataset.orderid;

    wx.navigateTo({
      url: '../haveInHand/index?orderId=' + orderId,
    })
  },
  finishDetail: function(event) {
    var orderId = event.currentTarget.dataset.orderid;

    wx.navigateTo({
      url: '../finishDetail/index?orderId=' + orderId,
    })
  },

})
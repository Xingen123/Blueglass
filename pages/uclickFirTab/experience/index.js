var detailData = require('../../myJsonData/recommendDetail.js')
var serverUrl = require('../../../lib/js/main.js');
var utils = require('../../../utils/util.js');


var QQMapWX = require('../../../lib/js/qqmap-wx-jssdk.js');

var qqmapsdk;




var tabs = [{
    name: "达人介绍"
  },
  {
    name: "体验详情"
  },
  {
    name: "精选评论"
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
    defaultScrollImg: "../../images/default/750-1000.png", //默认图片
    defaultheaderImg: "../../images/default/mrtx@2x.png", //默认图片
    defaultSamllScrollImg: "../../images/default/180-120.png", //默认图片
    coverVideoSrc: '',

    tabs: tabs, //展示的数据
    slideOffset: 0, //指示器每次移动的距离
    activeIndex: 0, //当前展示的Tab项索引
    sliderWidth: 96, //指示器的宽度,计算得到
    contentHeight: 0, //页面除去头部Tabbar后，内容区的总高度，计算得到
    clientHeight: 0,
    windowHeight: 0,
    watchBtnStr: '查看更多',
    user_webkit_line_clamp: 3,
    isAuthor: false, //是否授权按钮
    showVideo: false
  },

  listenSwiper: function(e) {
    //打印信息
    console.log(e);
    this.videoContext.pause();

  },
  videopaly: function(e) {
    console.log(e)
    var that = this;
    that.setData({
      showVideo: true,
    })
    wx.navigateTo({
      url: '../video/index?coverVideoSrc=' + that.data.coverVideoSrc
    })

  },
  detailWatchBtnAction: function(event) {
    var index = event.currentTarget.dataset.detailid;
    var detailItems = this.data.detailItems;
    var detailItem = detailItems[index];

    var watchid = event.currentTarget.dataset.watchid;
    if (watchid == '查看更多') {

      detailItem.watchBtnStr = '收起';
      detailItem.user_webkit_line_clamp = 0;

    } else {

      detailItem.watchBtnStr = '查看更多';
      detailItem.user_webkit_line_clamp = 3;
    }

    this.setData({
      detailItems: detailItems
    })
    var that = this;
    var query = wx.createSelectorQuery();
    query.select('.experience').boundingClientRect();
    query.exec(function(res) {
      //res就是 所有标签为mjltest的元素的信息 的数组
      console.log(res);
      //取高度
      console.log(res[0].height);
      that.setData({
        clientHeight: res[0].height + 80
      })
    });

  },
  watchBtnAction: function(event) {
    var watchid = event.currentTarget.dataset.watchid;
    if (watchid == '查看更多') {
      this.setData({
        watchBtnStr: '收起',
        user_webkit_line_clamp: 0

      })
    } else {
      this.setData({
        watchBtnStr: '查看更多',
        user_webkit_line_clamp: 3

      })
    }
    var that = this;
    var query = wx.createSelectorQuery();
    query.select('.aMan').boundingClientRect();
    query.exec(function(res) {
      //res就是 所有标签为mjltest的元素的信息 的数组
      console.log(res);
      //取高度
      console.log(res[0].height);
      that.setData({
        clientHeight: res[0].height + 80
      })
    });

  },
  onGotUserInfo: function(e) {
    var that = this;
    utils.login(e, function() {
      that.setData({
        isAuthor: wx.getStorageSync('isAuthor'),
      })
    });

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

    var that = this;
    var experId = options.experId;
    qqmapsdk = new QQMapWX({
      key: 'JJOBZ-MLT6P-E3WDJ-LDZ42-5FEAS-BHFS5'
    });

    this.setData({
      isAuthor: wx.getStorageSync('isAuthor')
    })

    wx.showLoading({
        title: '正在加载',
      }),
      wx.request({
        url: serverUrl.serverUrl + 'recommend/index?recommendId=' + experId,
        data: {},
        method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT  
        // header: {}, // 设置请求的 header  
        success: function(res) {
          wx.hideLoading();

          if (res.data.status == 200) {
            var allStarAr = [];
            for (var i = 0; i < res.data.data.commentFullInfo.totalStars; i++) {
              allStarAr.push('../../images/home/dxx@2x.png');
            }
            var commentInfo = [];
            if (res.data.data.commentFullInfo.commentInfos.length > 0) {
              for (var i = 0; i < res.data.data.commentFullInfo.commentInfos.length; i++) {
                var comDic = res.data.data.commentFullInfo.commentInfos[i];
                var allStarArr = [];
                if (comDic.stars > 0) {
                  for (var i = 0; i < comDic.stars; i++) {
                    allStarArr.push('../../images/home/dxx@2x.png');
                  }
                }
                comDic.allStarArr = allStarArr;
                commentInfo.push(comDic);
              }
            }


            wx.getSystemInfo({
              success: function(res) {
                console.log(res)
                that.setData({
                  //计算相关宽度
                  windowHeight: res.windowHeight,
                  sliderWidth: res.windowWidth / that.data.tabs.length,
                  sliderOffset: res.windowWidth / that.data.tabs.length * that.data.activeIndex,
                  contentHeight: res.windowHeight - res.windowWidth / 750 * 68 //计算内容区高度，rpx -> px计算
                });
              }
            });

            var swiperArr = [];

            if (res.data.data.videoUrl.length > 0) {
              var swiperDic = {};
              swiperDic.url = res.data.data.videoUrl[0];
              swiperDic.isImage = false;
              swiperDic.isVideo = true;

              that.showVideo(swiperDic.url);
              swiperArr.push(swiperDic);

            }
            if (res.data.data.imgsUrl.length > 0) {
              for (var i = 0; i < res.data.data.imgsUrl.length; i++) {
                var swiperDic = {};
                swiperDic.url = res.data.data.imgsUrl[i];
                swiperDic.isImage = true;
                swiperDic.isVideo = false;

                swiperArr.push(swiperDic);
              }
            }
            // res.data.data.authorInfo.introduction ='美国总统特朗普也通过社交媒体表示，收到了金正恩的信件，他对此表示感谢，并期待很快和金正恩再会面。据悉，朝鲜最高领导人金正恩与美国总统特朗普6月12日在新加坡圣淘沙岛嘉佩嘉佩1';
            var wordWidth = 0
            var wordLabelWidth = wx.getSystemInfoSync().windowWidth - 30;
            if (res.data.data.authorInfo.introduction) {
              wordWidth = res.data.data.authorInfo.introduction.length * 12;
            }
            var numLine = wordWidth / wordLabelWidth;
            var floatNumber = wordWidth % wordLabelWidth;
            var isshowbtn = false;
            if (numLine > 3) {
              isshowbtn = true;
            }
            if (numLine == 3 && floatNumber > 0) {
              isshowbtn = true;
            }
            console.log(isshowbtn);

            var detailItems = [];

            if (res.data.data.detailInfo.detailItems.length > 0) {
              for (var i = 0; i < res.data.data.detailInfo.detailItems.length; i++) {
                var detailItem = res.data.data.detailInfo.detailItems[i];
                // detailItem.itemDetail ='美国总统特朗普也通过社交媒体表示，收到了金正恩的信件，他对此表示感谢，并期待很快和金正恩再会面。据悉，朝鲜最高领导人金正恩与美国总统特朗普6月12日在新加坡圣淘沙岛嘉佩嘉11';
                var wordLabelWidth = wx.getSystemInfoSync().windowWidth - 30;
                var wordWidth = detailItem.itemDetail.length * 12;
                var numLine = wordWidth / wordLabelWidth;
                var floatNumber = wordWidth % wordLabelWidth;
                detailItem.isshowBtn = false;
                if (numLine > 3) {
                  detailItem.isshowBtn = true;
                }
                if (numLine == 3 && floatNumber > 0) {
                  detailItem.isshowBtn = true;
                }
                detailItem.watchBtnStr = '查看更多';
                detailItem.user_webkit_line_clamp = 3;
                detailItems.push(detailItem);
              }
            }

            that.setData({
              recommendDetail: res.data.data,
              allStarAr: allStarAr,
              isVideo: res.data.data.videoUrl.length > 0 ? true : false,
              isImage: res.data.data.imgsUrl.length > 0 ? true : false,
              commentInfos: commentInfo,
              swiperArr: swiperArr,
              isshowBtn: isshowbtn,
              detailItems: detailItems
            });
            var query = wx.createSelectorQuery();
            query.select('.aMan').boundingClientRect();
            query.exec(function(res) {
              //res就是 所有标签为mjltest的元素的信息 的数组
              console.log(res);
              //取高度
              console.log(res[0].height);
              that.setData({
                clientHeight: res[0].height + 80
              })
            });

            console.log(that.data.allStarAr);

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
        },
      });
  },

  bindChange: function(e) {
    var that = this;
    var current = e.detail.current;
    //创建节点选择器
    var query = wx.createSelectorQuery();
    if (current == 0) {
      //选择id
      query.select('.aMan').boundingClientRect();
      query.exec(function(res) {
        //res就是 所有标签为mjltest的元素的信息 的数组
        console.log(res);
        //取高度
        console.log(res[0].height);
        that.setData({
          clientHeight: res[0].height + 80
        })
      })
    } else if (current == 1) {
      //选择id
      query.select('.experience').boundingClientRect();
      query.exec(function(res) {
        //res就是 所有标签为mjltest的元素的信息 的数组
        console.log(res);
        //取高度
        console.log(res[0].height);
        that.setData({
          clientHeight: res[0].height + 80
        })
      })
    } else {
      //选择id
      query.select('.comment_3').boundingClientRect();
      query.exec(function(res) {
        //res就是 所有标签为mjltest的元素的信息 的数组
        console.log(res);
        //取高度
        console.log(res[0].height);
        that.setData({
          clientHeight: res[0].height + 80
        })
      })
    }

    this.setData({
      activeIndex: current,
      sliderOffset: this.data.sliderWidth * current,
    });
    console.log("bindChange:" + current);
  },

  navTabClick: function(e) {
    this.setData({
      sliderOffset: e.currentTarget.offsetLeft,
      activeIndex: e.currentTarget.id
    });
    console.log("navTabClick:" + e.currentTarget.id);
    //网络请求
  },


  // 加载视频
  showVideo: function(videoUrl) {
    var that = this
    that.setData({
      coverVideoSrc: videoUrl,
      autoplay: false
    }, function() {
      that.videoContext.play()
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    this.videoContext = wx.createVideoContext('myVideo')
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
    this.videoContext.pause();
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
  expClick: function(event) {
    var experId = event.currentTarget.dataset.experid;

    wx.navigateTo({
      url: '../experience/index?experId=' + experId,
    })
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },
  openMap: function() {
    var that = this;
    qqmapsdk.reverseGeocoder({
      location: {
        latitude: that.data.recommendDetail.recommendAddress.addressLat,
        longitude: that.data.recommendDetail.recommendAddress.adressLng
      },
      coord_type: 3, //baidu经纬度
      success: function(resp) {
        var location = resp.result.location;
        wx.openLocation({
          latitude: location.lat * 1, // 纬度，范围为-90~90，负数表示南纬
          longitude: location.lng * 1, // 经度，范围为-180~180，负数表示西经
          scale: 28, // 缩放比例
        })
      },
      fail: function(resp) {
        console.log(resp);
      },
      complete: function(resp) {
        console.log(resp);
      }
    })


  },
  pushTimeSelect: function() {
    wx.navigateTo({
      url: '../selectTime/selectTime?timeStr=' + JSON.stringify(this.data.recommendDetail.timeInfos) + '&isSelect=No',

    })
  },

  alonePay: function() {
    var token = wx.getStorageSync('token');
    var bindPhone = wx.getStorageSync('phone');
    var that = this;
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
            var recommendDetail = that.data.recommendDetail

            recommendDetail.detailInfo = ''

            wx.navigateTo({
              url: '../pay/index?recommendDetail=' + JSON.stringify(that.data.recommendDetail).replace(/&/g, 'tengyujisnclldkg') + '&isAlone=YES',
            })
          }
        } else {
          wx.showToast({
            title: res.data.errorMsg,
            icon: 'none',
          })
        }
      })
    } else {
      var recommendDetail = that.data.recommendDetail

      recommendDetail.detailInfo = ''

      wx.navigateTo({
        url: '../pay/index?recommendDetail=' + JSON.stringify(that.data.recommendDetail).replace(/&/g, 'tengyujisnclldkg') + '&isAlone=YES',
      })
    }
  },
  groupBuy: function() {
    var token = wx.getStorageSync('token');
    var bindPhone = wx.getStorageSync('phone');
    var that = this;
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
            var recommendDetail = that.data.recommendDetail

            recommendDetail.detailInfo = ''

            wx.navigateTo({
              url: '../pay/index?recommendDetail=' + JSON.stringify(that.data.recommendDetail).replace(/&/g, 'tengyujisnclldkg') + '&isAlone=NO',
            })
          }
        } else {
          wx.showToast({
            title: res.data.errorMsg,
            icon: 'none',
          })
        }
      })
    } else {
      console.log(JSON.stringify(that.data.recommendDetail))
      var recommendDetail = that.data.recommendDetail

      recommendDetail.detailInfo = ''

      wx.navigateTo({
        url: '../pay/index?recommendDetail=' + JSON.stringify(that.data.recommendDetail).replace(/&/g, 'tengyujisnclldkg') + '&isAlone=NO',
      })
    }

  },
  onShareAppMessage: function(res) {
    if (res.from == "button") {
      //分享为按键中的求助即id=1
      if (res.target.id == 1) {

        return {
          title: this.data.recommendDetail.title,
          path: 'pages/uclickFirTab/experience/index?experId=' + this.data.recommendDetail.recommendId,
          desc: this.data.recommendDetail.subTitle,
          imageUrl: this.data.recommendDetail.imgsUrl[0],
          success: function(res) {
            if (this.data.savedId === this.data.recommendDetail.recommendId) {
              return;
            }

            this.saveData().then(() => {
              this.setData({
                savedId: this.data.recommendDetail.recommendId
              });
              // todo 如果跳转到其他页面，删除this.data.id
            });
          }
        };
      }
    } else {
      return {
        title: this.data.recommendDetail.title,
        path: 'pages/uclickFirTab/experience/index?experId=' + this.data.recommendDetail.recommendId,
        desc: this.data.recommendDetail.subTitle,
        imageUrl: this.data.recommendDetail.imgsUrl[0],
        success: function(res) {
          if (this.data.savedId === this.data.recommendDetail.recommendId) {
            return;
          }

          this.saveData().then(() => {
            this.setData({
              savedId: this.data.recommendDetail.recommendId
            });
            // todo 如果跳转到其他页面，删除this.data.id
          });
        }
      };
    }


  },

  lunboerrorFunction: function(e) {

    if (e.type == "error") {
      var errorImgIndex = e.target.dataset.errorimg; //获取错误图片循环的下标
      var swiperArr = this.data.swiperArr;　　　　　　　 //将图片列表数据绑定到变量

      swiperArr[errorImgIndex].url = this.data.defaultScrollImg; //错误图片替换为默认图片
      this.setData({
        swiperArr: swiperArr
      })
    }
  },
  footerErrorFunction: function(e) {

    if (e.type == "error") {
      var errorImgIndex = e.target.dataset.errorimg; //获取错误图片循环的下标
      var recommendDetail = this.data.recommendDetail;　　　　　　　 //将图片列表数据绑定到变量

      recommendDetail.detailInfo.wantRecommends[errorImgIndex].homeImgUrl = this.data.defaultSamllScrollImg; //错误图片替换为默认图片
      this.setData({
        recommendDetail: recommendDetail
      })
    }
  },
  headerErrorFunction: function(e) {

    if (e.type == "error") {
      var errorImgIndex = e.target.dataset.errorimg; //获取错误图片循环的下标
      var recommendDetail = this.data.recommendDetail;　　　　　　　 //将图片列表数据绑定到变量
      recommendDetail.authorInfo.authorIconUrl = this.data.defaultheaderImg; //错误图片替换为默认图片
      this.setData({
        recommendDetail: recommendDetail
      })
    }
  },

  pinglunErrorFunction: function(e) {

    if (e.type == "error") {
      var errorImgIndex = e.target.dataset.errorimg; //获取错误图片循环的下标
      var commentInfos = this.data.commentInfos;　　　　　　　 //将图片列表数据绑定到变量
      commentInfos[errorImgIndex].iconUrl = this.data.defaultheaderImg; //错误图片替换为默认图片
      this.setData({
        commentInfos: commentInfos
      })
    }
  },
})
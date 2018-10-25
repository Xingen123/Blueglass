// pages/uclickFirTab/selectTime/selectTime.js
Page({

  /**
   * 页面的初始数据
   */


  selectTime: function (event){

    console.log(this.data.isSelect);
    if (this.data.isSelect=='YES')
{
      var select_id = event.currentTarget.dataset.selectid;
      console.log(select_id);
      var new_timeStrArr = this.data.timeStrArr;
      for (var i = 0; i < new_timeStrArr.length; i++) {
        if (i == select_id) {
          new_timeStrArr[i].isShow = true;

          var pages = getCurrentPages();             //  获取页面栈
           var currPage = pages[pages.length - 1];    // 当前页面
          var prevPage = pages[pages.length - 2];    // 上一个页面
          prevPage.setData({
            experTime: new_timeStrArr[i]                       
             })
          wx.navigateBack({
           delta : 1 
          })
        }
        else {
          new_timeStrArr[i].isShow = false;
        }
      }
      this.setData({
        timeStrArr: new_timeStrArr
      });

}
   
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      isSelect: options.isSelect,
    })
    var tempArr = JSON.parse(options.timeStr);
    var timerArr = [];
    
    for(var i = 0;i<tempArr.length;i++)
    {
      var timeDic = tempArr[i];
      timeDic.isShow = false;
      if (this.data.isSelect == 'YES')
      {
        if (options.chooseId == timeDic.timeId)
        {
          timeDic.isShow = true;
        }
      }
      timerArr.push(timeDic);
    }

    this.setData({
        timeStrArr: timerArr,
    })
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
  
  }
})
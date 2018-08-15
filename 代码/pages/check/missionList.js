// pages/check/missionList.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 任务列表数据
    missionList : [
      {
        'rwid' : '1',                     // 任务ID
        'rwmc' : '上海歌略软件科技有限公司',  // 任务名称
        'sffc' : 'false'                  // 是否复查
      }
    ],
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

  // 跳转任务页面
  jumpMission: function (e) {
    wx.navigateTo({
      url: '../danger/danger'
    })
  },
})
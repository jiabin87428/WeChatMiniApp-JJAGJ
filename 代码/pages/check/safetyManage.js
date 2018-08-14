// pages/check/safetyManage.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 是否可编辑
    editable: 'true',

    // 生产安全事故应急预案编制并备案
    sgyaba: {
      'sfba' : 'false',   // 是否备案
      'time' : ''         // 时间
    },
    // 安全生产标准化达标及时间等级
    bzdb: {
      'sfdb' : 'false',   // 是否达标
      'level' : '一级',    // 等级
      'time' : ''         // 时间
    },
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
  
  }
})
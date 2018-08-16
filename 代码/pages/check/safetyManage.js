// pages/check/safetyManage.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 是否可编辑
    editable : 'true',
    // 对象数组
    params : {},
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var params = options.data
    this.setData({
      params: JSON.parse(params)
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
    console.log('1111')
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
  
  // 跳转编辑页面
  jumpEdit: function (e) {
    var viewId = e.currentTarget.id;
    var data = this.data.params[viewId];
    if (data == null) {
      data = {}
    }
    wx.navigateTo({
      url: '../check/editPage?id=' + viewId + '&data=' + JSON.stringify(data)
    })
  }
})
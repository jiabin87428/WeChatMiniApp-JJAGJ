// pages/check/dangerDetailSelect.js
var request = require('../../utils/request.js')
var config = require('../../utils/config.js')
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    scrollHeight: 0,
    searchName: "",
    type: "",
    repCjwt: [],

    pageNum: 0,
    pageRows: 15,
    shouldRefresh: false,
    refreshText: "下拉刷新",
    loadMoreText: "上拉加载更多",
    sfcj: ''  // 是否常见隐患
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    wx.getSystemInfo({
      success: function (res) {
        console.info(res.windowHeight);
        that.setData({
          scrollHeight: res.windowHeight
        });
      }
    });

    var type = options.type == null ? "" : options.type
    var searchName = options.searchName == null ? "" : options.searchName
    var sfcj = options.sfcj == null ? "" : options.sfcj
    this.setData({
      type: type,
      searchName: searchName,
      sfcj: sfcj
    })
    this.getDangerDetails(true)
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
  // 查询常见隐患
  searchYH: function (e) {
    this.setData({
      searchName: e.detail.value
    })
    this.getDangerDetails(true)
  },
  // 获取隐患详细列表
  getDangerDetails: function (isRefresh) {
    var that = this
    var param = {
      "pageNum": that.data.pageNum,
      "pageRows": that.data.pageRows,
      "lb": that.data.type,
      "searchName": that.data.searchName,
      "sfcj": that.data.sfcj
    }
    console.log(that.data.pageNum)
    //调用接口
    request.requestLoading(config.getDangerType, param, '正在加载数据', function (res) {
      // console.log(res)
      if (isRefresh == true) {
        that.setData({
          repCjwt: []
        })
      }
      if (res.repCjwt != null) {
        var datas = that.data.repCjwt
        datas = datas.concat(res.repCjwt)
        var num = that.data.pageNum
        num += 1
        that.setData({
          repCjwt: datas,
          pageNum: num
        })
      }
    }, function () {
      wx.showToast({
        title: '加载数据失败',
        icon: 'none'
      })
    })
  },

  // 选择并返回赋值
  selectItem: function (e) {
    var dataPage = 3
    var backNum = 2
    if (this.data.type == "") {
      dataPage = 2
      backNum = 1
    }
    var pages = getCurrentPages();             //  获取页面栈
    var prevPage = pages[pages.length - dataPage];   // 上2个页面
    var item = e.currentTarget.dataset.item
    prevPage.setData({
      desc: item.cjwt,
      clause: item.dytk,
      clauseInfo: item.tknr,
      advise: item.zgjy
    })
    wx.navigateBack({
      delta: backNum
    })
  },
  // scrollerView下拉刷新
  refreshLoad: function (e) {

    // this.getDangerDetails(true)
  },

  // scrollerView上拉加载更多
  loadMoreLoad: function (e) {
    this.getDangerDetails(false)
  },

  // scrollview正在滚动
  isScrolling: function (e) {
    console.log(e)
    if (e.detail.scrollTop <= -50) {
      this.setData({
        refreshText: '松开刷新',
        shouldRefresh: true,
      })
    }else {
      this.setData({
        refreshText: '下拉刷新',
        shouldRefresh: false,
      })
    }
  },

  // scrollview触摸结束
  scrollTouchEnd: function(e) {
    if (this.data.shouldRefresh == true) {
      this.getDangerDetails(true)
    }
  },
})
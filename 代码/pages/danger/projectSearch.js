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
    searchText: "",
    userid: "",
    repXmlist: [],

    editIndex: 0,
    delBtnWidth: 80,  //删除按钮宽度单位（rpx）m
    
    region: ['上海市', '上海市', ''],
    currentDistrict: "",  // 当前筛选地区
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    var userid = options.userid
    that.setData({
      userid: userid
    });
    wx.getSystemInfo({
      success: function (res) {
        console.info(res.windowHeight);
        that.setData({
          scrollHeight: res.windowHeight
        });
      }
    });
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
  // 查询关键字
  searchProject: function (e) {
    this.setData({
      searchText: e.detail.value
    })
    this.getProjectList()
  },
  // 获取项目列表
  getProjectList: function () {
    var that = this
    var param = {
      "userid": that.data.userid,
      "searchText": that.data.searchText,
      "searchQy": that.data.currentDistrict
    }
    //调用接口
    request.requestLoading(config.getProjectList, param, '正在加载数据', function (res) {
      console.log(res)
      if (res.repXmlist != null) {
        that.setData({
          repXmlist: res.repXmlist
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
    var item = e.currentTarget.dataset.item
    wx.navigateTo({
      url: '../danger/danger4JG?item=' + JSON.stringify(item)
    })
  },

  // 删除项目
  deleteProject: function (e) {
    var item = e.currentTarget.dataset.item
    var that = this
    var param = {
      "xmid": item.xmid,
    }
    //调用接口
    request.requestLoading(config.deleteProject, param, '正在加载数据', function (res) {
      console.log(res)
      if (res.repCode == "200") {
        var newList = that.data.repXmlist
        newList.splice(e.currentTarget.dataset.index, 1)
        that.setData({
          repXmlist: newList
        })
        wx.showToast({
          title: res.repMsg
        })
      }
    }, function () {
      wx.showToast({
        title: '加载数据失败',
        icon: 'none'
      })
    })
  },
  //手指刚放到屏幕触发
  touchS: function (e) {
    console.log("touchS" + e);
    //判断是否只有一个触摸点
    if (e.touches.length == 1) {
      this.setData({
        //记录触摸起始位置的X坐标
        startX: e.touches[0].clientX
      });
    }
  },
  //触摸时触发，手指在屏幕上每移动一次，触发一次
  touchM: function (e) {
    console.log("touchM:" + e);
    var that = this
    if (e.touches.length == 1) {
      //记录触摸点位置的X坐标
      var moveX = e.touches[0].clientX;
      //计算手指起始点的X坐标与当前触摸点的X坐标的差值
      var disX = that.data.startX - moveX;
      //delBtnWidth 为右侧按钮区域的宽度
      var delBtnWidth = that.data.delBtnWidth;
      var txtStyle = "";
      if (disX == 0 || disX < 0) {//如果移动距离小于等于0，文本层位置不变
        txtStyle = "margin-left:0px";
      } else if (disX > 0) {//移动距离大于0，文本层left值等于手指移动距离
        txtStyle = "margin-left:-" + disX + "px";
        if (disX >= delBtnWidth) {
          //控制手指移动距离最大值为删除按钮的宽度
          txtStyle = "margin-left:-" + delBtnWidth + "px";
        }
      }
      //获取手指触摸的是哪一个item
      var index = e.currentTarget.dataset.index;
      var list = that.data.repXmlist;
      //将拼接好的样式设置到当前item中
      list[index].txtStyle = txtStyle;
      //更新列表的状态
      this.setData({
        repXmlist: list
      });
    }
  },
  touchE: function (e) {
    console.log("touchE" + e);
    var that = this
    if (e.changedTouches.length == 1) {
      //手指移动结束后触摸点位置的X坐标
      var endX = e.changedTouches[0].clientX;
      //触摸开始与结束，手指移动的距离
      var disX = that.data.startX - endX;
      var delBtnWidth = that.data.delBtnWidth;
      //如果距离小于删除按钮的1/2，不显示删除按钮
      var txtStyle = disX > delBtnWidth / 2 ? "margin-left:-" + delBtnWidth + "px" : "margin-left:0px";
      //获取手指触摸的是哪一项
      var index = e.currentTarget.dataset.index;
      var list = that.data.repXmlist;
      list[index].txtStyle = txtStyle;
      //更新列表的状态
      that.setData({
        repXmlist: list
      });
    }
  },
  bindRegionChange(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      region: e.detail.value,
      currentDistrict: e.detail.value[2]
    })
    this.getProjectList()
  }
})
var request = require('../../utils/request.js')
var config = require('../../utils/config.js')
var app = getApp()
// pages/common/selectRadioList.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 搜否需要搜索栏
    needSearch: true,
    // 搜索栏高度
    searchHeight: 40,
    // 列表高度
    scrollHeight: 0,
    viewId: "",
    // 数据源
    sourceList: null,
    // 选中的项
    selected: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var viewId = options.id
    var data = options.data
    var selected = {}
    if (options.selected != null) {
      selected = options.selected
    }
    this.setData({
      viewId: viewId,
      sourceList: JSON.parse(data),
      selected: selected
    })

    if (viewId == 'companyType1' || viewId == 'companyType2' || viewId == 'local' || viewId == 'local2' || viewId == 'local3') {
      this.setData({
        needSearch: false,
        searchHeight: 0
      })
    }

    var that = this
    wx.getSystemInfo({
      success: function (res) {
        console.info(res.windowHeight);
        that.setData({
          scrollHeight: res.windowHeight - that.data.searchHeight
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
  /**
   * radio发生change事件
   */
  radioChange: function (e) {
    // console.log('radio发生change事件，携带value值为：', e.detail.name)
    var pages = getCurrentPages();             //  获取页面栈
    var prevPage = pages[pages.length - 2];   // 上一个页面
    if (this.data.viewId == "companyName") {
      prevPage.setData({
        companyName: this.data.sourceList[e.detail.value]
      })
    } else if (this.data.viewId == "rectifyType") {
      prevPage.setData({
        rectifyType: this.data.sourceList[e.detail.value]
      })
    } else if (this.data.viewId == "companyPlace") {
      prevPage.setData({
        companyPlace: this.data.sourceList[e.detail.value]
      })
    } else if (this.data.viewId == "companyType1") {
      prevPage.setData({
        companyType1: this.data.sourceList[e.detail.value]
      })
      //调用应用实例的方法获取全局数据
      app.getCompanyType({ "typeId": prevPage.data.companyType1.id}, function (companyType) {
        wx.navigateTo({
          url: '../common/selectRadioList?id=' + "companyType2" + '&data=' + JSON.stringify(companyType) + '&selected=' + JSON.stringify(prevPage.data.companyType1)
        })
      })
      return
    } else if (this.data.viewId == "companyType2") {
      prevPage = pages[pages.length - 3]
      prevPage.setData({
        companyType2: this.data.sourceList[e.detail.value]
      })
    } else if (this.data.viewId == "local") {
      var orgid = this.data.sourceList[e.detail.value].id
      prevPage = pages[pages.length - 2]
      prevPage.setData({
        orgname: this.data.sourceList[e.detail.value].name
      })
      this.getLocal(orgid,"local2")
      return
    } else if (this.data.viewId == "local2") {
      var orgid = this.data.sourceList[e.detail.value].id
      prevPage = pages[pages.length - 3]
      prevPage.setData({
        orgname: prevPage.data.orgname + '-' + this.data.sourceList[e.detail.value].name
      })
      this.getLocal(orgid, "local3")
      return
    } else if (this.data.viewId == "local3") {
      prevPage = pages[pages.length - 4]
      prevPage.setData({
        orgid: this.data.sourceList[e.detail.value].id,
        orgname: prevPage.data.orgname + '-' + this.data.sourceList[e.detail.value].name
      })
    }

    if (this.data.viewId == "companyType2") {
      wx.navigateBack({
        delta: 2
      })
    } if (this.data.viewId == "local3") {
      wx.navigateBack({
        delta: 4
      })
    }else{
      wx.navigateBack({
        delta: 1
      })
    }
  },
  // 搜索
  searchClick: function (e) {
    var that = this
    if (this.data.viewId == "companyName") {
      app.getCompanyName({"companyName":e.detail.value}, function (companyName) {
        that.setData({
          sourceList: companyName
        })
      })
    } else if (this.data.viewId == "companyPlace") {
      //调用应用实例的方法获取全局数据
      app.getCompanyPlace({ "localName": e.detail.value }, function (companyPlace) {
        that.setData({
          sourceList: companyPlace
        })
      })
    }
  },
  // 获取Local
  getLocal: function(orgid,viewId) {
    request.requestLoading(config.getLocal + orgid, null, '正在加载数据', function (res) {
      //res就是我们请求接口返回的数据
      console.log(res)
      if (res.repCode != null && res.repCode == 500) {
        return
      }
      wx.navigateTo({
        url: '../common/selectRadioList?id=' + viewId + '&data=' + JSON.stringify(res.repOrg)
      })
    }, function () {
      wx.showToast({
        title: '加载数据失败',
        icon: 'none'
      })
    })
    return
  },
})
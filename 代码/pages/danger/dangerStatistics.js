// pages/danger/dangerStatistics.js
var wxCharts = require('../../utils/wx-charts.js');
var request = require('../../utils/request.js')
var config = require('../../utils/config.js')
var app = getApp();
var ringChart = null;
var columnChart = null;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    windowsWidth: 0,
    windowsHeight: 0,
    userid: "",
    // 当前选中tab页 0-隐患分类 1-隐患级别 2-企业隐患的排名
    currentTab: 0,

    classChart: null,
    rankingChart: null,
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
          windowsWidth: res.windowWidth,
          windowsHeight: res.windowHeight
        });
      }
    });
    that.updateDatas()
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
  // 切换Tab页面
  changeTap: function (e) {
    var that = this
    var viewId = e.currentTarget.id;
    that.setData({
      currentTab: viewId
    })
    this.updateDatas()
  },
  touchHandler: function (e) {
    console.log(ringChart.getCurrentDataIndex(e));
  },

  // 刷新统计图
  updateDatas: function () {
    var that = this
    var url = ''
    if (that.data.currentTab == 0) {// 隐患分类
      url = config.getYhfltj
    } else if (that.data.currentTab == 1) {// 隐患级别
      url = config.getYhjbtj
    } else if (that.data.currentTab == 2) {// 企业隐患的排名
      url = config.getYhpm
    }
    let param = {
      userid: that.data.userid
    }
    //调用接口
    request.requestLoading(url, param, '正在加载统计数据', function (res) {
      console.log(res)
      if (res.repCode == '200') {
        that.refreshTJData(that.data.currentTab, res)
      }else {
        wx.showToast({
          title: '加载数据失败',
          icon: 'none'
        })
      }
    }, function () {
      wx.showToast({
        title: '加载数据失败',
        icon: 'none'
      })
    })
  },
  // 刷新数据
  refreshTJData: function(tab, result) {
    if (tab == 0 || tab == 1) {// 隐患分类 隐患级别
      var ringSeries = []
      var totalCount = 0
      // 第一次循环，计算总数
      for (var i = 0; i < result.list.length; i++) {
        let item = result.list[i]
        totalCount = totalCount + parseInt(item.value)
      }
      // 第二次循环，计算百分比
      for (var i = 0; i < result.list.length; i++) {
        let item = result.list[i]
        let data = {
          name: item.name,
          data: parseInt(item.value) / totalCount * 100,
          stroke: false
        }
        ringSeries.push(data)
      }
      ringChart = new wxCharts({
        animation: true,
        canvasId: 'classCanvas',
        type: 'ring',
        extra: {
          ringWidth: 25,
          pie: {
            offsetAngle: -45
          }
        },
        title: {
          name: totalCount + '条',
          color: '#7cb5ec',
          fontSize: 14
        },
        subtitle: {
          name: '隐患总数',
          color: '#666666',
          fontSize: 12
        },
        series: ringSeries,
        disablePieStroke: true,
        width: this.data.windowsWidth,
        height: 250,
        dataLabel: true,
        legend: true,
        background: '#f5f5f5',
        padding: 0
      });
      this.setData({
        classChart: ringChart
      })
      this.data.classChart.addEventListener('renderComplete', () => {
        console.log('renderComplete');
      });
    } else if (tab == 2) { // 企业隐患的排名

      var chartData = {
        main: {
          title: '企业隐患排名',
          data: result.data,
          categories: result.categories
        }
      }
      columnChart = new wxCharts({
        canvasId: 'rankingCanvas',
        type: 'column',
        animation: true,
        categories: chartData.main.categories,
        series: [{
          name: '隐患数',
          data: chartData.main.data,
          format: function (val, name) {
            return val + '条';
          }
        }],
        yAxis: {
          format: function (val) {
            return val + '条';
          },
          title: '隐患排名',
          min: 0
        },
        xAxis: {
          disableGrid: false,
          type: 'calibration'
        },
        extra: {
          column: {
            width: 15
          }
        },
        width: this.data.windowsWidth,
        height: 250,
      })
      this.setData({
        rankingChart: columnChart
      })
    }
  }
})
// pages/me/companyEdit.js
var request = require('../../utils/request.js')
var config = require('../../utils/config.js')
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userid: "",

    qyid: "",
    longitude: 0,
    latitude: 0,
    address: "",

    // 企业名称
    qymc: "",
    // 主要负责人
    zyfzr: "",
    // 主要负责人电话
    zyfzrdh: "",

    // 省
    province: "省",
    // 市
    city: "市",
    // 区
    district: "区",

    // 风险等级
    level: "",
    // 风险对应传给后台的值
    fxdj: "",
    items: ['重大风险', '较大风险', '一般风险', '低风险'],

    // 基本信息和安全管理信息对象
    baseAndSaftyObj: {},

    // 账号列表
    zhlist: [],

    // 组织机构id
    orgid: "",
    orgname: "",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    var userid = options.userid
    that.setData({
      userid: userid,
    })

    if (options.item == null) {
      return
    }
    var item = JSON.parse(options.item)
    if (item != null) {
      that.setData({
        qyid: item.id,
        qymc: item.name,
        longitude: item.mapx,
        latitude: item.mapy,
        address: item.qydz,
        zyfzr: item.zyfzr,
        zyfzrdh: item.zyfzrdh,
        province: item.province,
        city: item.city,
        district: item.district,
        fxdj: item.fxdj,
        zhlist: item.zhlist,
        orgid: item.qysdid,
        orgname: item.qysdmc
      })
      var level = ""
      if (item.fxdj == 'A(红色)') {
        level = that.data.items[0]
      } else if (item.fxdj == 'B(橙色)') {
        level = that.data.items[1]
      } else if (item.fxdj == 'C(黄色)') {
        level = that.data.items[2]
      } else if (item.fxdj == 'D(蓝色)') {
        level = that.data.items[3]
      }
      that.setData({
        level: level
      })
    }
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
  // 获取企业基本信息和安全生产管理现状信息
  getBaseAndSaftyInfo: function () {
    var that = this
    //调用接口
    request.requestLoading(config.getBaseAndSaftyInfo + that.data.qyid, null, '正在加载数据', function (res) {
      console.log(res)
      if (res != null) {
        that.setData({
          baseAndSaftyObj: res
        })
        wx.navigateTo({
          url: '../check/safetyManage?data=' + JSON.stringify(that.data.baseAndSaftyObj) + '&qyid=' + that.data.qyid
        })
      } else {
        wx.showToast({
          title: res.repMsg,
        })
      }
    }, function () {
      wx.showToast({
        title: '加载数据失败',
      })
    })
  },
  // 跳转输入页面
  jumpInput: function (e) {
    var viewId = e.currentTarget.id;
    var placeholder = ""
    var inputstring = ""
    if (viewId == "qymc") {
      placeholder = "请输入企业名称"
      inputstring = this.data.qymc
    } else if (viewId == "zyfzr") {
      placeholder = "请输入主要负责人姓名"
      inputstring = this.data.zyfzr
    } else if (viewId == "zyfzrdh") {
      placeholder = "请输入主要负责人电话"
      inputstring = this.data.zyfzrdh
    }
    wx.navigateTo({
      url: '../common/inputPage?id=' + viewId + '&placeholder=' + placeholder + '&inputstring=' + inputstring
    })
  },
  // 跳转信息编辑
  jumpSafteyManage: function (e) {
    this.getBaseAndSaftyInfo()
  },
  // 跳转地图坐标选择
  jumpLocation: function (e) {
    wx.navigateTo({
      url: '../common/chooseLocation'
    })
  },
  // 跳转企业报告列表
  jumpReport: function (e){
    wx.navigateTo({
      url: '../me/companyReportList?qyid=' + this.data.qyid
    })
  },
  // 点击了所属区域
  choosePlace: function (e) {
    wx.showToast({
      title: '所属区域会根据所选企业地址自动匹配',
      icon: 'none'
    })
  },
  // 选择风险等级
  chooseLevel: function (e) {
    var that = this
    wx.showActionSheet({
      itemList: that.data.items,
      success: function (res) {
        var level = that.data.items[res.tapIndex]
        var fxdj = ""
        if (res.tapIndex == 0) {// 重大风险[红色]
          fxdj = "A(红色)"
        }else if (res.tapIndex == 1) {// 较大风险[橙色]
          fxdj = "B(橙色)"
        }else if (res.tapIndex == 2) {// 一般风险[黄色]
          fxdj = "C(黄色)"
        }else if (res.tapIndex == 3) {// 低风险[蓝色]
          fxdj = "D(蓝色)"
        }
        that.setData({
          level: level,
          fxdj: fxdj
        })
      },
      fail: function (res) {
        console.log(res.errMsg)
      }
    })
  },
  // 保存
  saveClick: function (e) {
    var that = this
    var params = {
      "userid": that.data.userid,
      "qyid": that.data.qyid,
      "qymc": that.data.qymc,
      "zyfzr": that.data.zyfzr,
      "zyfzrdh": that.data.zyfzrdh,
      "qydz": that.data.address,
      "mapx": that.data.longitude,
      "mapy": that.data.latitude,
      "province": that.data.province,
      "city": that.data.city,
      "district": that.data.district,
      "fxdj": that.data.fxdj,
      "qysdid": that.data.orgid,
      "qysdmc": that.data.orgname,
    }
    request.requestLoading(config.editCompany, params, '正在加载数据', function (res) {
      //res就是我们请求接口返回的数据
      console.log(res)
      if (res.repCode == '200') {
        wx.showToast({
          title: res.repMsg,
          complete: setTimeout(function () {
            wx.navigateBack({
              delta: 1
            })
          }, 1500)
        })
      } else {
        wx.showToast({
          title: res.repMsg,
          icon: 'none'
        })
      }
    }, function () {
      wx.showToast({
        title: '编辑失败',
      })
    })
  },

  // 重置密码点击事件
  resetPasswordClick: function (e) {
    var that = this
    wx.showModal({
      title: '提示',
      content: '是否确认将' + that.data.qymc + '的密码重制为111111？',
      success: function (res) {
        if (res.confirm) {
          that.resetPassword()
        } else if (res.cancel) {

        }
      }
    })
  },
  // 重置密码事件
  resetPassword: function () {
    var that = this
    var params = {
      "qymc": that.data.qymc,
    }
    request.requestLoading(config.resetCompanyPassword, params, '正在加载数据', function (res) {
      //res就是我们请求接口返回的数据
      console.log(res)
      if (res.repCode == '200') {
        wx.showToast({
          title: res.repMsg,
        })
      } else {
        wx.showToast({
          title: res.repMsg,
          icon: 'none'
        })
      }
    }, function () {
      wx.showToast({
        title: '重置密码失败',
      })
    })
  },


  // 跳转企业账号页面
  jumpAccount: function (e) {

    wx.navigateTo({
      url: '../me/companyAccounts?qyid=' + this.data.qyid + '&zhlist=' + JSON.stringify(this.data.zhlist)
    })
  },

  // 跳转组织机构筛选
  jumpOrgChoose: function (e) {
    wx.navigateTo({
      url: '../index/fliter'
    })
  },
})
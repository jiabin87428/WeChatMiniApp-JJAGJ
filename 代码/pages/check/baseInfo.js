// pages/check/baseInfo.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 是否可编辑
    editable: 'true',
    // 企业名称
    qymc: '上海歌略软件科技有限公司',
    // 企业地址
    qydz: '上海市浦东新区XX路XX号101室',
    // 占地面积
    zdmj: '',
    // 建筑面积
    jzmj: '',
    // 企业人数
    qyrs: '',
    // 安全管理人数
    aqglrs: '',
    // 产品描述（描述主要产品及产量）
    cpms: '',
    // 设备描述（描述主要设施设备）
    sbms: '',
    // 主要负责人
    zyfzr: '',
    // 主要负责人电话
    zyfzrdh: '',
    // 安全负责人
    aqfzr: '',
    // 安全负责人电话
    aqfzrdh: '',
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
  // 跳转输入页面
  jumpInput: function (e) {
    if (this.data.editable == 'false') {
      return
    }
    var viewId = e.currentTarget.id;
    var placeholder = ""
    var inputstring = ""
    if (viewId == "qydz") {
      placeholder = "请输入公司地址"
      inputstring = this.data.qydz
    } else if (viewId == "zdmj") {
      placeholder = "请输入企业占地面积（平方米）"
      inputstring = this.data.zdmj
    } else if (viewId == "phone") {
      placeholder = "请输入联系方式"
      inputstring = this.data.phone
    } else if (viewId == "email") {
      placeholder = "请输入邮箱"
      inputstring = this.data.email
    } else if (viewId == "address") {
      placeholder = "请输入企业地址"
      inputstring = this.data.address
    } else if (viewId == "name") {
      placeholder = "请输入姓名"
      inputstring = this.data.name
    } else if (viewId == "sex") {
      placeholder = "请输入性别"
      inputstring = this.data.sex
    } else if (viewId == "job") {
      placeholder = "请输入岗位"
      inputstring = this.data.job
    } else if (viewId == "dep") {
      placeholder = "请输入所在部门"
      inputstring = this.data.dep
    } else if (viewId == "jgEmail") {
      placeholder = "请输入邮箱"
      inputstring = this.data.email
    } else if (viewId == "mobile") {
      placeholder = "请输入联系手机"
      inputstring = this.data.mobile
    }
    wx.navigateTo({
      url: '../common/inputPage?id=' + viewId + '&placeholder=' + placeholder + '&inputstring=' + inputstring
    })
  },
  // 保存信息
  submit: function () {
    if (this.validateData() == true) {
      
    }
  },
  // 校验信息是否都填写
  validateData: function () {
    if (this.data.qymc == '') {
      wx.showToast({
        title: '请完善企业名称',
        icon: 'none'
      })
      return false
    } else if (this.data.qydz == ''){
      wx.showToast({
        title: '请完善企业地址',
        icon: 'none'
      })
      return false
    } else if (this.data.zdmj == '') {
      wx.showToast({
        title: '请完善占地面积',
        icon: 'none'
      })
      return false
    } else if (this.data.jzmj == '') {
      wx.showToast({
        title: '请完善建筑面积',
        icon: 'none'
      })
      return false
    } else if (this.data.qyrs == '') {
      wx.showToast({
        title: '请完善企业人数',
        icon: 'none'
      })
      return false
    } else if (this.data.aqglrs == '') {
      wx.showToast({
        title: '请完善安全管理人数',
        icon: 'none'
      })
      return false
    } else if (this.data.cpms == '') {
      wx.showToast({
        title: '请完善产品描述',
        icon: 'none'
      })
      return false
    } else if (this.data.sbms == '') {
      wx.showToast({
        title: '请完善设备描述',
        icon: 'none'
      })
      return false
    } else if (this.data.zyfzr == '') {
      wx.showToast({
        title: '请完善主要负责人',
        icon: 'none'
      })
      return false
    } else if (this.data.zyfzrdh == '') {
      wx.showToast({
        title: '请完善主要负责人电话',
        icon: 'none'
      })
      return false
    } else if (this.data.aqfzr == '') {
      wx.showToast({
        title: '请完善安全负责人',
        icon: 'none'
      })
      return false
    } else if (this.data.aqfzrdh == '') {
      wx.showToast({
        title: '请完善安全负责人电话',
        icon: 'none'
      })
      return false
    }
    return true
  }
})
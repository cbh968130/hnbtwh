const db = wx.cloud.database()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    inputValue: '',
    inputDetail: [],
    inputList: [],
    type:"CiTiao"
  },

  keyInput(e) {
    this.setData({
      inputValue: e.detail.value,
      inputDetail: [],
      inputList: []
    })
  },
  
  changeType(e){
    this.setData({
      type:e.detail.value,
      inputDetail: [],
      inputList: []
    })
  },

  find() {
    var input = this.data.inputValue

    const col = db.collection("ShiYiC")

/**
 * 根据勾选搜索词条和释义
 */
    if (this.data.type == "CiTiao"){

      col.where({
        cha:{
          $regex:'.*'+input,
          $options:'i'
        }
      }).get().then(res=>{
        if (typeof(res.data)!="undefined"){
          this.setData({
            inputDetail:[],
            inputList:res.data
          })
        }
      })
    } 
    else{
      col.where({
        shiyi2: {
          $regex: '.*' + input,
          $options: 'i'
        }
      }).get().then(res => {
        if (typeof (res.data) != "undefined") {
          this.setData({
            inputDetail:[],
            inputList: res.data
          })
        }
      })
    }


  },

  showDetail(e){
    this.setData({
      inputDetail:[e.detail],
      inputCache: this.data.inputList
    })
    this.setData({
      inputList: []
    })
  },

  returnList(e){
    this.setData({
      inputList:this.data.inputCache,
      inputDetail:[]
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;

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
   * 用户分享到朋友圈
   */
  onShareTimeline: function () {

  }
})
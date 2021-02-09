const db = wx.cloud.database()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    inputValue: '',
    inputDetail: [],
    inputList: [],
    type:"CiTiao",
    ifRes:[]
  },

  keyInput(e) {
    this.setData({
      inputValue: e.detail.value,
      inputDetail: [],
      inputList: [],
      ifRes: []
    })

  },
  
  changeType(e){
    this.setData({
      type:e.detail.value,
      inputDetail: [],
      inputList: []
    })

    if (this.data.inputValue != ''){
      this.find()
    }

  },

  find() {

    if (this.data.inputValue != ''){

      var input = this.data.inputValue

      const col = db.collection("ShiYiC")

      this.setData({
        inputDetail: [],
        inputList: []
      })

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

          console.log(res.data.length)

          if (res.data.length != 0){
            this.setData({
              inputDetail:[],
              inputList:res.data
            })
          }

          else{
            this.setData({
              ifRes: ["没有查询到结果"]
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

          console.log(res.data.length)

          if (res.data.length != 0) {
            this.setData({
              inputDetail:[],
              inputList: res.data
            })
          }
          
          else{
            this.setData({
              ifRes: ["没有查询到结果"]
            })
          }
        })
      }

    }


  },

  showDetail(e){
    this.setData({
      inputDetail:[e.detail],
    })

    wx.pageScrollTo({ //回到顶部
      scrollTop: 200
    })
  },

  returnList(e){
    this.setData({
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
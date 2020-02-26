const cnchar = require('cnchar')
const trad = require('cnchar-trad')
cnchar.use(trad)

Page({

  /**
   * 页面的初始数据
   */
  data: {
    inputValue:'',
    inputSplit:[],
    inputLetter:[]
  },

  keyInput(e){
    this.setData({
      inputValue: e.detail.value,
      inputSplit: [],
      inputLetter: []
    })
  },

  /**
   * 若输入内容有英文则认为是字音反查
   */
  find() {
    var input = this.data.inputValue
    var con = /[A-Za-z]+/
    var res = con.test(input)
    if (res){
      this.setData({
        inputLetter: [input]
      })
    }
    else {
      var outText = ""
      var text = input.split("")
      var len = text.length
      var hanzi = ""
      var result = ""
      for (var i = 0; i < len; i++) {
        hanzi = text[i]
        result = this.data.ajson[hanzi]
        if (typeof (result) == "undefined") {
          outText = outText + hanzi.convertSimpleToTrad()
        }
        else {
          outText = outText + result
        }
        if (i < len - 1){
          outText = outText + ","
        }
      }

      this.setData({
        inputSplit: outText.split(",")
      })

    }
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
    wx.cloud.downloadFile({
      fileID: 'cloud://wugniu-n4jmh.7775-wugniu-n4jmh-1301204702/ajson.txt', // 文件 ID
      success: res => {
        // 返回临时文件路径
        wx.getFileSystemManager().readFile({
          filePath: res.tempFilePath,
          encoding: 'utf-8',
          success: res => {
            this.setData({
              ajson: JSON.parse(res.data)
            })
          }
        })
      },
      fail: console.error
    })
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
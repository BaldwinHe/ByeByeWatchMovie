// pages/edit-comment/edit-comment.js
const qcloud = require('../../vendor/wafer2-client-sdk/index')
const config = require('../../config')
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    movie: {},
    operation:1,
    userInfo:null,
    locationAuthType: app.data.locationAuthType,
    content:"",
    contentLength:0,
    Timestart:0,
  },

  onTapLogin() {
    app.login({
      success: ({ userInfo }) => {
        this.setData({
          userInfo,
          locationAuthType: app.data.locationAuthType
        })
      },
      error: () => {
        this.setData({
          locationAuthType: app.data.locationAuthType
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      operation: options.id,
      movie: JSON.parse(options.movie)
    })
  },
  editDone: function(){
    let userinfo = this.data.userInfo
    let content = this.data.content
    let operation = this.data.operation
    let movie = this.data.movie
    console.log(content)
    let last = content.length
    while(content[last]!='='){
      last--;
    }
    let piece = content.substring(last + 1)
    wx.navigateTo({
      url: '/pages/preview-comment/preview-comment?userinfo=' + JSON.stringify(userinfo) + '&movie=' + JSON.stringify(movie) + '&operation=' + operation + '&content=' + content + '&completion=' + piece
    })
  },
  bindInputText: function (e) {
    this.setData({
      content: e.detail.value,
      contentLength: e.detail.cursor
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  startGet: function(input) {
    console.log("H")
    var Timestart = input.timeStamp
    var recorderManager = wx.getRecorderManager();
    const options = {
      duration: Timestart,
      sampleRate: 16000,
      numberOfChannels: 1,
      encodeBitRate: 96000,
      format: 'mp3',
      frameSize: 50
    }
    recorderManager.start(options) 
    this.setData({ Timestart: Timestart })
  },

  endGet: function (input){
    console.log("S")
    var recorderManager = wx.getRecorderManager();//获取全局唯一的录音管理器
    var Timestart = this.data.Timestart;
    var Timeout = input.timeStamp;
    var TimeIng = 0;//录音的时长
    TimeIng = Timeout - Timestart;
    let newVoice = {
      length: 0,
      path: ""
    }
    newVoice.length = TimeIng
    console.log(TimeIng)
    recorderManager.onError((res) => {
      console.log('小伙砸你录音失败了！')
    })
    recorderManager.stop();
    recorderManager.onStop((res) => {
      var tempFilePath = res.tempFilePath;// 文件临时路径
      var temp = tempFilePath.replace('.mp3', '')
      console.log(tempFilePath)
      this.setData({
        content: tempFilePath,
        contentLength: 1
      })
      console.log('劳资获取到文件了，开始上传')
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.setData({
      locationAuthType: app.data.locationAuthType
    })
    app.checkSession({
      success: ({ userInfo }) => {
        this.setData({
          userInfo
        })
      }
    })
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
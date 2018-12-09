// pages/preview-comment/preview-comment.js
const qcloud = require('../../vendor/wafer2-client-sdk/index')
const config = require('../../config')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    movie: {},
    userInfo:null,
    comment:'',
    images: ["a", "b", "c", "d", "e"],
    operation:1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.innerAudioContext = wx.createInnerAudioContext()
    let content = ""
    if (options.operation == 1){
      content = options.content + '=' + options.completion
      this.innerAudioContext.src = content
    }else {
      content = options.content
    }
    this.setData({     
      userInfo: JSON.parse(options.userinfo),
      movie: JSON.parse(options.movie),
      operation: options.operation,
      comment: content,
    })
  },

  navBack() {
    let operation = this.data.operation
    let movie = this.data.movie
    wx.navigateTo({
      url: '/pages/edit-comment/edit-comment?id=' + operation + '&movie=' + JSON.stringify(movie),
    })
  },
  upLoadVoice(cb) {
    let ans = null;
    console.log(this.data.comment)
    wx.uploadFile({
      url: config.service.uploadUrl,
      filePath: this.data.comment,
      name: 'file',
      success: res => {
        let data = JSON.parse(res.data)
        if (!data.code) {
          ans = data.data
          cb && cb(ans)
        }
      },
      fail: res => {
        console.log(res)
        console.log("Uploading voice fail")
      }
    })
  },
  sendComment(){
    if (this.data.operation == 1){
      this.upLoadVoice( content =>{
        console.log(content)
        wx.showLoading({
          title: '正在发表影评'
        })
        qcloud.request({
          url: config.service.addComment,
          login: true,
          method: 'PUT',
          data: {
            Type: this.data.operation,
            content: content.imgUrl,
            movie_id: this.data.movie.id
          },
          success: result => {
            wx.hideLoading()
            let data = result.data
            if (!data.code) {
              wx.showToast({
                title: '发表影评成功'
              })
              let movie = this.data.movie
              let movieID = this.data.movie.id
              wx.navigateTo({
                url: '/pages/list-comment/list-comment?id=' + movieID + '&movie=' + JSON.stringify(movie)
              })

            } else {
              wx.showToast({
                icon: 'none',
                title: '发表影评失败'
              })
            }
          },
          fail: () => {
            wx.hideLoading()
            wx.showToast({
              icon: 'none',
              title: '发表影评失败'
            })
          }
        })
      })
    }
    else{
        wx.showLoading({
        title: '正在发表影评'
      })
      qcloud.request({
        url: config.service.addComment,
        login: true,
        method: 'PUT',
        data: {
          type: this.data.operation,
          content: this.data.comment,
          movie_id: this.data.movie.id
        },
        success: result => {
          wx.hideLoading()
          let data = result.data
          if (!data.code) {
            wx.showToast({
              title: '发表影评成功'
            })
            let movie = this.data.movie
            let movieID = this.data.movie.id
            wx.navigateTo({
              url: '/pages/list-comment/list-comment?id=' + movieID + '&movie=' + JSON.stringify(movie)
            })
            
          } else {
            wx.showToast({
              icon: 'none',
              title: '发表影评失败'
            })
          }
        },
        fail: () => {
          wx.hideLoading()
          wx.showToast({
            icon: 'none',
            title: '发表影评失败'
          })
        }
      })
    }
  },
  playRecord: function () {
    console.log(this.innerAudioContext)
    this.innerAudioContext.play()
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

  }
})
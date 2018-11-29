// pages/hot-movie/hot-movie.js
const qcloud = require('../../vendor/wafer2-client-sdk/index')
const config = require('../../config.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    movieList: [],
  },

  getHotMovieList() {
    wx.showLoading({
      title: '火爆电影加载中...',
    })
    qcloud.request({
      url: config.service.movieList,
      success: result => {
        wx.hideLoading()
        console.log(result.data.data)
        if (!result.data.code) {
          this.setData({
            movieList: result.data.data
          })
        } else {
          wx.showToast({
            title: '火爆电影加载失败!',
          })
        }
      },
      fail: result => {
        wx.hideLoading()
        wx.showToast({
          title: '火爆电影加载失败!',
        })
        console.log("Error!")
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getHotMovieList()
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

  getMovieDetail:function(event){
    let ID = event.currentTarget.dataset.id; 
    wx.navigateTo({
      url: '/pages/movie-detail/movie-detail?id=' + ID,
    })
  }
})
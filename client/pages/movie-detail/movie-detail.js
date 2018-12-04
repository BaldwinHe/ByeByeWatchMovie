// pages/movie-detail/movie-detail.js

const qcloud = require('../../vendor/wafer2-client-sdk/index')
const config = require('../../config')
const _ = require('../../utils/util')


Page({

  /**
   * 页面的初始数据
   */
  data: {
    movie:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getMovie(options.id);
  },

  getMovie(id) {
    wx.showLoading({
      title: '电影数据加载中...',
    })
    qcloud.request({
      url: config.service.movieDetail + id,
      success: result => {
        wx.hideLoading()
        let data = result.data;
        if (!data.code) {
          this.setData({
            movie: data.data
          })
        } else {
          setTimeout(() => {
            wx.navigateBack()
          }, 2000)
        }
      },
      fail: result => {
        wx.hideLoading()
        console.log("Error!")
        setTimeout(() => {
          wx.navigateBack()
        }, 2000)
      }
    })
  },
  openActionsheet: function () {
    let movie = this.data.movie;
    wx.showActionSheet({
      itemList: ["文字","音频"],
      success(res) {
        if (res.tapIndex === 0) {
          wx.navigateTo({
            url: '/pages/edit-comment/edit-comment?id=' + 0 + '&movie=' + JSON.stringify(movie)
          })
        } else if (res.tapIndex === 1){
          wx.navigateTo({
            url: '/pages/edit-comment/edit-comment?id=' + 1 + '&movie=' + JSON.stringify(movie)
          })
        }
      }
    })
  },

  toCommentDetail: function() {
    let movie = this.data.movie
    let movieID = this.data.movie.id
    wx.navigateTo({
      url: '/pages/list-comment/list-comment?id=' + movieID + '&movie=' + JSON.stringify(movie)
    })
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
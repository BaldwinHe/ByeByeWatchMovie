// pages/first/first.js
const qcloud = require('../../vendor/wafer2-client-sdk/index')
const config = require('../../config')
const _ = require('../../utils/util')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    commentInfo:{},
    movieData: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getFirstMovie()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  randInt(n,m) {
    var random = Math.floor(Math.random() * (m - n + 1) + n);
    return random;
  },
  getFirstMovie(callback) {
    let select = {}
    let temp = []
    wx.showLoading({
      title: '首页加载中...',
    })
    qcloud.request({
      url: config.service.getList,
      success: result => {
        wx.hideLoading()
        if (!result.data.code) {
          temp = result.data.data
          let num = this.randInt(0, temp.length-1)
          select = temp[num];
          this.setData({
            commentInfo: select
          })
          this.getMovie(select.movie_id)
        } else {
          wx.showToast({
            title: '首页加载失败!',
          })
        }
      },
      fail: result => {
        wx.hideLoading()
        wx.showToast({
          title: '首页加载失败!',
        })
        console.log("Error!")
      },
      complete: () => {
        callback && callback()
      }
    })
  },

  getMovie(id) {
    wx.showLoading({
      title: '首页电影数据加载中...',
    })
    qcloud.request({
      url: config.service.movieDetail + id,
      success: result => {
        wx.hideLoading()
        let data = result.data;
        if (!data.code) {
          this.setData({
            movieData: data.data
          })
        } else {
          console.log("Error!")
        }
      },
      fail: result => {
        wx.hideLoading()
        console.log("Error!")
      }
    })
  },

  getMovieDetail(){
    let ID = this.data.commentInfo.movie_id;
    wx.navigateTo({
      url: '/pages/movie-detail/movie-detail?id=' + ID,
    })
  },
  getCommentDetail() {
    let movieID = this.data.commentInfo.movie_id;
    let movie = this.data.movieData;
    let thing = this.data.commentInfo;
    wx.navigateTo({
      url: '/pages/comment-detail/comment-detail?thing=' + JSON.stringify(thing) + '&movie_id=' + movieID + '&movie=' + JSON.stringify(movie),
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
    wx.showNavigationBarLoading()
    this.getFirstMovie()
    wx.hideNavigationBarLoading()
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
  getMyLoveComment: function(){
    wx.navigateTo({
      url: '/pages/users/users',
    })
  },
  getHotMovie:function(){
    wx.navigateTo({
      url: '/pages/hot-movie/hot-movie',
    })
  }
})
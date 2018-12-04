// pages/list-comment/list-comment.js
const qcloud = require('../../vendor/wafer2-client-sdk/index')
const config = require('../../config')
const _ = require('../../utils/util')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    movieID:0,
    commentList: [],
    oriCommentList: [],
    movie:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      movieID: options.id,
      movie:JSON.parse(options.movie)
    })
    this.getCommentList(this.data.movieID)
    console.log(this.data.commentList)
    console.log(this.data.commentList)
  },

  getCommentList(id) {
    qcloud.request({
      url: config.service.commentList + id,
      success: result => {
        let data = result.data
        if (!data.code) {
          this.setData({
            oriCommentList: data.data,
            commentList: data.data
          })
          var newcomment = this.data.commentList;
          for (var i = 0; i < newcomment.length; i++) {
            var nowcomment = newcomment[i];
            if (nowcomment.content.length > 20) {
              nowcomment.content = nowcomment.content.substring(0, 20) + '...';
            }
            newcomment[i] = nowcomment;
          }
          this.setData({
            commentList: newcomment
          })
          console.log(this.data.commentList)
        }
      },
    })
  },

  getCommentDetail: function (event) {
    let thing = this.data.oriCommentList[event.currentTarget.dataset.idx];
    let movieID = this.data.movieID
    let movie = this.data.movie
    wx.navigateTo({
      url: '/pages/comment-detail/comment-detail?thing=' + JSON.stringify(thing) + '&movie_id=' + movieID + '&movie=' + JSON.stringify(movie),
    })
  },
  goToFirstPage: function(){
    wx.navigateTo({
      url: '/pages/first/first'
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
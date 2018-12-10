// pages/users/users.js
const app = getApp()
const qcloud = require('../../vendor/wafer2-client-sdk/index')
const config = require('../../config')
const _ = require('../../utils/util')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: null,
    locationAuthType: app.data.locationAuthType,
    movie: {},
    detail:[]
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
  },

  getMyLove: function(){
    let tempArray = ""
    wx.showLoading({
      title: '获取影评收藏数据...',
    })
    qcloud.request({
      url: config.service.getCollect,
      login: true,
      success: result => {
        wx.hideLoading()

        let data = result.data
        for (let i = 0; i < data.data.length;i++){
          data.data[i].comment = JSON.parse(data.data[i].comment)
          data.data[i].movie = JSON.parse(data.data[i].movie)
          tempArray = data.data[i].comment.content
          if (data.data[i].comment.types == 0 && tempArray.length > 10){
            data.data[i]["showOff"] = tempArray.substring(0,10) + "..."
          }else{
            data.data[i]["showOff"] = tempArray
          }
        }
        if (!data.code) {
          this.setData({
            detail: tempArray,
            movie: data.data
          })
        } else {
          wx.showToast({
            icon: 'none',
            title: '获取数据失败',
          })
        }
      },
      fail: () => {
        wx.hideLoading()
        wx.showToast({
          icon: 'none',
          title: '获取数据失败',
        })
      }
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
    this.setData({
      locationAuthType: app.data.locationAuthType
    })
    app.checkSession({
      success: ({ userInfo }) => {
        this.setData({
          userInfo
        })
        this.getMyLove();
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

  },

  getCommentDetail: function (event) {
    let data = event.currentTarget.dataset.data;
    let thing = data.comment;
    let movieID = data.movie.id
    let movie = data.movie
    wx.navigateTo({
      url: '/pages/comment-detail/comment-detail?thing=' + JSON.stringify(thing) + '&movie_id=' + movieID + '&movie=' + JSON.stringify(movie),
    })
  },

  returnHomepage: function () {
    wx.navigateTo({
      url: '/pages/first/first',
    })
  }
})
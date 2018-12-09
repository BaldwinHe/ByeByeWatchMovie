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
    movie: {}
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
    wx.showLoading({
      title: '获取影评收藏数据...',
    })
    qcloud.request({
      url: config.service.getCollect,
      login: true,
      success: result => {
        wx.hideLoading()

        let data = result.data
        console.log(data.data.length)
        for (let i = 0; i < data.data.length;i++){
          data.data[i].comment = JSON.parse(data.data[i].comment)
          data.data[i].movie = JSON.parse(data.data[i].movie)
        }
        if (!data.code) {
          console.log(data)
          this.setData({
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

  returnHomepage: function () {
    wx.navigateTo({
      url: '/pages/first/first',
    })
  }
})
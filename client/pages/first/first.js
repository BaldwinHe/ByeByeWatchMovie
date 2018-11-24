// pages/first/first.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    moviename:"",
    movieimg:'',
    username:"",
    userheadimg:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      moviename: "复仇者联盟3：无限战争",
      movieimg: '/images/movie-img.png',
      username: "柏柏",
      userheadimg: '/images/head-img.png'
    })
    console.log(this.data.movieimg)
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
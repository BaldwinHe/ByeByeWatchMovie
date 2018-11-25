// pages/movie-detail/movie-detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    movie:{
      img:'/images/movie-img.png',
      name:'复仇者联盟3：无限战争',
      detail: '《复仇者联盟3：无限战争》是由漫威电影制作的的科幻片。该片由安东尼·罗素、乔·罗素执导，小罗伯特·唐尼、乔什·布洛林、克里斯·埃文斯、克里斯·海姆斯沃斯、斯嘉丽·约翰逊、马克·鲁法洛等主演，于2018年4月27日在美国上映，2018年5月11日在中国大陆上映。该片是《复仇者联盟》系列电影的第三部，是漫威电影宇宙的第19部电影，该片与《雷神3：诸神黄昏》剧情连接，讲述了复仇者联盟和他们的超级英雄盟友们牺牲一切，阻止灭霸毁灭一半宇宙的故事'
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if(this.data.movie.detail.length > 100){
      let theMovie = this.data.movie;
      let theDetail = theMovie.detail;
      theDetail = theDetail.substring(0,100) + '...';
      theMovie.detail = theDetail;
      this.setData({
        movie: theMovie
      })
    }
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
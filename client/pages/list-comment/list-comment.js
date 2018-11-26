// pages/list-comment/list-comment.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    comment: [
      {
        userimg: '/images/head-img.png',
        username: '柏柏',
        commentdetail: '开场阿斯加德人遭到了灭霸的袭击，他们对附近发出了求救讯号，抵抗已经失败，乌木喉跨过死者，受伤的海姆达尔躺在地上，洛基被黑暗教团包围，灭霸一个人船首把托尔带到他面前，问是要他哥的头还是空间宝石。 过程中灭霸说了他失败的感受，索尔喷他话太多'
      },
      {
        userimg: '/images/head-img.png',
        username: '板栗',
        commentdetail: '老实市民为何在头上镶钻？ 性感少妇为何羊癫疯发作？ 为什么她去做了头发，他就绿了？ 为什么雷神在《雷神3》看了整整一集绿巨人，不但没让视力变得更好，反而还瞎了一只眼睛？说好的多看绿色可以改善视力呢？ 雷神单眼开飞船，是否违反宇宙交通管理条例'
      },
      {
        userimg: '/images/head-img.png',
        username: '猪',
        commentdetail: '不剧透是不可能不剧透的，这辈子都不可能不剧透的，正儿八经的影评嘛又不会'
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var newcomment = this.data.comment;
    for(var i = 0;i<newcomment.length;i++){
      var nowcomment = newcomment[i];
      if(nowcomment.commentdetail.length > 10){
        nowcomment.commentdetail = nowcomment.commentdetail.substring(0, 20) + '...';
      }
      newcomment[i] = nowcomment;
    }
    this.setData({
      comment:newcomment
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
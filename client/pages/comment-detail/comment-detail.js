// pages/comment-detail/comment-detail.js
const qcloud = require('../../vendor/wafer2-client-sdk/index')
const config = require('../../config')
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: null,
    locationAuthType: app.data.locationAuthType,
    movie_id:0,
    movie: {
      img: '/images/movie-img.png',
      name: '复仇者联盟3：无限战争'
    },
    comment:{},
    username: "柏柏",
    userheadimg: '/images/head-img.png',
    commentword: '索尔：嗨，大家好，我是雷神索尔，上一集中我没了锤子还没了右眼，那还玩个锤子？所以这一集中我改用斧子了。虽然我遭受的创伤是所有人中最多的，但是放心吧，我可是男主角，哦不，我是说放心吧我可是一个神，所以我不会这么轻易地狗带的。抱歉各位，最后一斧子没劈到灭霸的头，让他打了个响指，但我真的已经尽力了。',
    hadComment: 0,
    isMine: 0
  },

  returnHomepage: function () {
    wx.navigateTo({
      url: '/pages/first/first',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let nowThings = JSON.parse(options.thing);
    let movie = JSON.parse(options.movie);
    let movie_id = options.movie_id;
    this.setData({
      username: nowThings.username,
      userheadimg: nowThings.avatar,
      commentword: nowThings.content,
      movie:movie,
      movie_id:movie_id,
      comment: nowThings
    })
    if(this.data.comment.types == 1){
      this.innerAudioContext = wx.createInnerAudioContext()
      this.innerAudioContext.src = this.data.comment.content
    }
  },
  openActionsheet: function () {
    let movie = this.data.movie
    wx.showActionSheet({
      itemList: ["文字", "音频"],
      success(res) {
        if (res.tapIndex === 0) {
          wx.navigateTo({
            url: '/pages/edit-comment/edit-comment?id=' + 0 + '&movie=' + JSON.stringify(movie),
          })
        } else if (res.tapIndex === 1) {
          wx.navigateTo({
            url: '/pages/edit-comment/edit-comment?id=' + 1 + '&movie=' + JSON.stringify(movie),
          })
        }
      }
    })
  },


  addCollectMovie(){
    let content = this.data.comment
    wx.showLoading({
      title: '正在收藏影评...'
    })
    qcloud.request({
      url: config.service.addCollect,
      login: true,
      method: 'PUT',
      data: {
        moviedata: JSON.stringify(this.data.movie),
        commentdata: JSON.stringify(this.data.comment)
      },
      success: result => {
        wx.hideLoading()
        let data = result.data
        if (!data.code) {
          if(data.data){
            wx.showToast({
              title: '该影评已收藏过'
            })
          }
          else{
              wx.showToast({
              title: '该影评成功收藏'
            })
          }
        } else {
          wx.showToast({
            icon: 'none',
            title: '收藏影评失败'
          })
        }
      },
      fail: () => {
        wx.hideLoading()
        wx.showToast({
          icon: 'none',
          title: '收藏影评失败'
        })
      }
    })
  },

  playRecord: function () {
    console.log(this.innerAudioContext)
    this.innerAudioContext.play()
  },

  hadSeen(id) {
    qcloud.request({
      url: config.service.getCommentUserMovie + id,
      login: true,
      success: result => {
        let data = result.data;
        console.log(data)
        if (!data.code) {
          if (data.data.length > 0) {
            this.setData({
              hadComment: 1
            })
            if (data.data[0].user == this.data.userInfo.openId){
              this.setData({
                isMine: 1
              })
            }else{
              this.setData({
                isMine: 0
              })
            }
          } else {
            this.setData({
              hadComment: 0
            })
          }
        } else {
          console.log("Error!")
        }
      },
      fail: result => {
        console.log(result)
        console.log("Error!")
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
        this.hadSeen(this.data.movie_id);
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

  }
})
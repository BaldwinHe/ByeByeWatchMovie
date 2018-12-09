const DB = require('../utils/db')

module.exports = {

  /**
   * 添加评论
   */
  add: async ctx => {
    let user = ctx.state.$wxInfo.userinfo.openId
    let username = ctx.state.$wxInfo.userinfo.nickName
    let avatar = ctx.state.$wxInfo.userinfo.avatarUrl

    let movieId = +ctx.request.body.movie_id
    let content = ctx.request.body.content || null

    let types = ctx.request.body.Type


    if (!isNaN(movieId)) {
      await DB.query('INSERT INTO comment(user, username, avatar, content, types, movie_id) VALUES (?, ?, ?, ?, ?, ?)', [user, username, avatar, content, types, movieId])
    }

    ctx.state.data = {}
  },

  /**
   * 获取电影评论列表
   */
  movieList: async ctx => {
    let movieId = + ctx.params.id

    if (!isNaN(movieId)) {
      ctx.state.data = await DB.query('select * from comment where comment.movie_id = ?', [movieId])
    } else {
      ctx.state.data = []
    }
  },
  
  getList: async ctx => {
    ctx.state.data = await DB.query("SELECT * FROM comment;")
  },
  
  userLoveList: async ctx => {
    let movieId = +ctx.request.query.movie_id
    let userId = +ctx.request.query.user

    if (!isNaN(movieId) && !isNaN(userId)) {
      ctx.state.data = await DB.query('select * from comment where comment.movie_id = ? AND comment.user = ?', [movieId,userId])
    } else {
      ctx.state.data = []
    }
  },
}
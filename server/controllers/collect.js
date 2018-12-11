const DB = require('../utils/db')

module.exports = {

  add: async ctx => {
    let user = ctx.state.$wxInfo.userinfo.openId
    let username = ctx.state.$wxInfo.userinfo.nickName
    let avatar = ctx.state.$wxInfo.userinfo.avatarUrl

    let movieData = ctx.request.body.moviedata || null
    let commentData = ctx.request.body.commentdata || null

    let list = await DB.query('SELECT * FROM collect WHERE collect.movie = ? AND collect.comment = ?', [movieData, commentData])

    if(!list.length){
      await DB.query('INSERT INTO collect(user, username, avatar, movie,comment) VALUES (?, ?, ?, ?, ?)', [user, username, avatar, movieData, commentData])
      ctx.state.data = 0
    }else{
      ctx.state.data = 1
    }

    
  },

  list: async ctx => {
    let user = ctx.state.$wxInfo.userinfo.openId

    ctx.state.data = await DB.query("SELECT * FROM collect where collect.user = ?", [user])

  },

  isLike: async ctx => {
    let user = ctx.state.$wxInfo.userinfo.openId
    let movieData = ctx.request.body.moviedata || null
    let commentData = ctx.request.body.commentdata || null

    let list = await DB.query('SELECT * FROM collect WHERE collect.movie = ? AND collect.comment = ? AND collect.user = ?', [movieData, commentData, user])

    if (!list.length) {
      ctx.state.data = 0
    } else {
      ctx.state.data = 1
    }
  },

  dislike: async ctx => {
    let user = ctx.state.$wxInfo.userinfo.openId
    let movieData = ctx.request.body.moviedata || null
    let commentData = ctx.request.body.commentdata || null

    await DB.query('DELETE FROM collect WHERE collect.movie = ? AND collect.comment = ? AND collect.user = ?', [movieData, commentData, user])

  },
}
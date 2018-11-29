const DB = require('../utils/db.js')

module.exports = {
  list: async ctx => {
    ctx.state.data = await DB.query("SELECT * FROM movies;")
  },

  detail: async ctx => {
    let movieID = + ctx.params.id;
    let movie;
    if (!isNaN(movieID)) {
      movie = (await DB.query('select * from movies where movies.id= ?', [movieID]))[0];
    } else {
      movie = {};
    }
    ctx.state.data = movie;
  }
}
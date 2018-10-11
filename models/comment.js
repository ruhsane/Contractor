const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Comment = mongoose.model('Comment', {
  title: String,
  content: String,
  blogId: { type: Schema.Types.ObjectId, ref: 'Blog' }
});


module.exports = Comment

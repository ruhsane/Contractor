const mongoose = require('mongoose');

const Blog = mongoose.model('Blog', {
  title: String,
  description: String,
});

module.exports = Blog;

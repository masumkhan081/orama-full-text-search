
const mongoose = require('mongoose');
// 
const blogSchema = new mongoose.Schema({
      title: String,
      introduction: String,
      author: String,
      body: String,
});
// 
const Blog = mongoose.model('Blog', blogSchema);
module.exports = Blog;
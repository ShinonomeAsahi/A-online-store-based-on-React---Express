const mongoose = require('../config/mongoose');

const userPostsSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  post_content: {
    type: String,
    required: true,
  },
  post_images: {
    type: Array,
    required: true,
  },
  post_likes: {
    type: Number,
    required: true,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  updated_at: {
    type: Date,
    default: Date.now,
  },
});

const UserPosts = mongoose.model('UserPosts', userPostsSchema);
module.exports = UserPosts;

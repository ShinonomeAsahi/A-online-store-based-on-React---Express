const mongoose = require('../config/mongoose');

const commentSchema = new mongoose.Schema({
  user_post_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'UserPosts',
    required: true,
  },
  user_post_comment_user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  user_post_comment_body: {
    type: String,
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

const UserPostsComment = mongoose.model('UserPostsComment', commentSchema);
module.exports = UserPostsComment;
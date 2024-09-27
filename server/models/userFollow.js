const mongoose = require('../config/mongoose');

const userFollowsSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  // 用户关注的用户id
  followed_user_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    unique: true,
  },
  // 关注状态 0：关注 1：取消关注
  follow_status: {
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

const UserFollows = mongoose.model('UserFollows', userFollowsSchema);
module.exports = UserFollows;

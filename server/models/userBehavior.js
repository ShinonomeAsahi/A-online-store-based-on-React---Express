const mongoose = require('../config/mongoose');

const userBehaviorSchema = new mongoose.Schema({
  behavior_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  // 行为类型包括注册、登录、登出、浏览、搜索、点赞、评论、收藏、购买
  behavior_type: {
    type: String,
    required: true,
  },
  behavior_data: mongoose.Schema.Types.Mixed,
  created_at: {
    type: Date,
    default: Date.now,
  },
  updated_at: {
    type: Date,
    default: Date.now,
  },
});

const UserBehavior = mongoose.model('UserBehavior', userBehaviorSchema);
module.exports = UserBehavior;
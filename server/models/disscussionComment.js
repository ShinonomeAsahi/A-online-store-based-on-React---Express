const mongoose = require('../config/mongoose');

const disscussionCommentSchema = new mongoose.Schema({
  discussion_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Discussion',
    required: true,
    unique: true,
  },
  discussion_comment_user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  discussion_comment_parent_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'DiscussionComment',
    default: null,
  },
  discussion_comment_content: {
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

const DiscussionComment = mongoose.model('DiscussionComment', disscussionCommentSchema);
module.exports = DiscussionComment;

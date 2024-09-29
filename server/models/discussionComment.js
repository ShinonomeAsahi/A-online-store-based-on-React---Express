const mongoose = require('../config/mongoose');

const discussionCommentSchema = new mongoose.Schema({
  articleId: { type: mongoose.Schema.Types.ObjectId, required: true },
  parentCommentId: { type: mongoose.Schema.Types.ObjectId, default: null },
  userId: { type: mongoose.Schema.Types.ObjectId,ref: 'User', required: true },
  content: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

const DiscussionComment = mongoose.model('DiscussionComment', discussionCommentSchema);
module.exports = DiscussionComment;



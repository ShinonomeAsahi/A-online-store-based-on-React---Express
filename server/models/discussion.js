const mongoose = require('../config/mongoose');

const discussionSchema = new mongoose.Schema({
  discussion_title: {
    type: String,
    required: true,
  },
  content_body: String,
  discussion_category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'DiscussionCategory',
    required: true,
  },
  created_by: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
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

const Discussion = mongoose.model('Discussion', discussionSchema);
module.exports = Discussion;

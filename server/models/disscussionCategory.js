const mongoose = require('../config/mongoose');

const discussionCategorySchema = new mongoose.Schema({
  category_name: {
    type: String,
    required: true,
  },
  category_admin: {
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

const DiscussionCategory = mongoose.model('DiscussionCategory', discussionCategorySchema);
module.exports = DiscussionCategory;

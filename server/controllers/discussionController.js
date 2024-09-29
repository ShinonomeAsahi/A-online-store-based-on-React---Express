const { Discussion, DiscussionComment, DiscussionCategory, User } = require('../models');

exports.createDiscussion = async (req, res) => {
  const { discussion_title, discussion_category, discussion_body, created_by } = req.body;
  try {
    const discussion = new Discussion({ discussion_title, discussion_category, discussion_body, created_by: created_by });
    await discussion.save();
    res.status(201).json({ message: 'Discussion created successfully', discussion });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createDiscussionCategory = async (req, res) => {
  const { category_name, category_admin } = req.body;
  try {
    const category = new DiscussionCategory({ category_name, category_admin });
    await category.save();
    res.status(201).json({ message: 'Discussion category created successfully', category });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getNewDiscussion = async (req, res) => {
  const { number } = req.query;
  try {
    const discussions = await Discussion.find({}).populate({
      path: 'created_by',
      select: 'user_name' // 只选择 user_name 字段
    }).sort({ created_at: -1 }).limit(number);
    res.status(200).json(discussions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getDiscussionList = async (req, res) => {
  try {
    const discussions = await Discussion.find({})
      .populate({
        path: 'created_by',
        select: 'user_name' // 只选择 user_name 字段
      })
      .populate({
        path: 'discussion_category',
        select: 'category_name' // 只选择 category_name 字段
      });
    res.status(200).json(discussions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getDiscussionById = async (req, res) => {
  const { discussion_id } = req.query;
  try {
    const discussion = await Discussion.findById(discussion_id).populate({
      path: 'created_by',
      select: 'user_name'
    });
    if (!discussion) {
      return res.status(404).json({ message: 'Discussion not found' });
    }
    res.status(200).json(discussion);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getDiscussionByUserId = async (req, res) => {
  const { user_id } = req.query;
  try {
    const discussion = await Discussion.find({ created_by: user_id })
    if (!discussion) {
      return res.status(404).json({ message: 'Discussion not found' });
    }
    res.status(200).json(discussion);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getCommentByUserId = async (req, res) => {
  const { user_id } = req.query;
  try {
    const comments = await DiscussionComment.find({ discussion_comment_user_id: user_id })
    .populate({
      path: 'discussion_id',
      select: 'discussion_title'
    });
    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
  

exports.createDiscussionComment = async (req, res) => {
  const { discussion_id, discussion_comment_user_id, discussion_comment_content } = req.body;
  try {
    const comment = new DiscussionComment({ discussion_id, discussion_comment_user_id, discussion_comment_content });
    await comment.save();
    res.status(201).json({ message: 'Comment created successfully', comment });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getDiscussionCommentByDiscussionId = async (req, res) => {
  const { discussion_id } = req.query;
  try {
    const comments = await DiscussionComment.find({ discussion_id }).populate({
      path: 'discussion_comment_user_id',
      select: 'user_name'
    });
    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getDiscussionCategory = async (req, res) => {
  try {
    const categories = await DiscussionCategory.find({});
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getDiscussionByCategory = async (req, res) => {
  const { category_id } = req.query;
  try {
    const discussions = await Discussion.find({ discussion_category: category_id }).populate({
      path: 'created_by',
      select: 'user_name' // 只选择 user_name 字段
    });
    res.status(200).json(discussions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


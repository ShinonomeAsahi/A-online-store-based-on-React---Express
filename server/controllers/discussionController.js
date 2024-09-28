const { Discussion, DiscussionComment, User } = require('../models');

exports.createDiscussion = async (req, res) => {
  const { discussion_title, discussion_body, user_id } = req.body;
  try {
    const discussion = new Discussion({ discussion_title, discussion_body, user_id });
    await discussion.save();
    res.status(201).json({ message: 'Discussion created successfully', discussion });
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

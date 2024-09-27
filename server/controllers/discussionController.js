const { Discussion, DiscussionComment, User } = require('../models');

exports.createDiscussion = async (req, res) => {
  const { discussion_title, discussion_body, user_id } = req.body;
  try {
    const discussion = await Discussion.create({ discussion_title, discussion_body, user_id });
    res.status(201).json({ message: 'Discussion created successfully', discussion });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getDiscussionList = async (req, res) => {
  try {
    const discussions = await Discussion.find({});
    res.status(200).json(discussions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getDiscussionById = async (req, res) => {
  const { discussion_id } = req.query;
  try {
    const discussion = await Discussion.findOne({ where: { discussion_id }, include: [DiscussionComment] });
    if (!discussion) {
      return res.status(404).json({ message: 'Discussion not found' });
    }
    res.status(200).json(discussion);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

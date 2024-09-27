const { Content, Comment, User } = require('../models');

exports.createTopic = async (req, res) => {
  const { content_title, content_body, user_id } = req.body;
  try {
    const topic = await Content.create({ content_title, content_body, user_id });
    res.status(201).json({ message: 'Topic created successfully', topic });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getTopicList = async (req, res) => {
  try {
    const topics = await Content.find({});
    res.status(200).json(topics);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getTopicById = async (req, res) => {
  const { content_id } = req.query;
  try {
    const topic = await Content.findOne({ where: { content_id }, include: [Comment] });
    if (!topic) {
      return res.status(404).json({ message: 'Topic not found' });
    }
    res.status(200).json(topic);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

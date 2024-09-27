const bcrypt = require('bcrypt');
const { User, UserDetail } = require('../models');

// 获取用户姓名的接口
const getUserName = async (req, res) => {
  try {
    const user = await User.findById(req.user.user_id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({ user_name: user.user_name });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const checkRepeatUserName = async (req, res) => {
  try {
    const { user_name } = req.body;
    const user = await User.findOne({ where: { user_name: user_name } });
    if (user) {
      res.status(200).json({ message: 'User name already exists' });
    } else {
      res.status(200).json({ message: 'User name available' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updateUserPassword = async (req, res) => {
  try {
    const { user_id, user_password } = req.body;
    const hashedPassword = await bcrypt.hash(user_password, 10);
    const user = await User.update({ user_password: hashedPassword }, 
      { where: { user_id: user_id } });
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getUserInfo = async (req, res) => {
  try {
    // 获取_id
    const userId = req.query.user_id;
    if(userId == null){
      return res.status(400).json({ message: 'User id is required' });
    }
    const userDetail = await UserDetail.findOne({ user_id: userId });
    if (!userDetail) {
      return res.status(404).json({ message: 'User detail not found' });
    }
    res.status(200).json({ userDetail });
  } catch (error) {
    console.error('Error in getUserInfo:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const updateUserInfo = async (req, res) => {
  try {
    const { user_id, user_first_name, user_last_name, user_date_of_birth, user_gender, user_address, user_phone_number } = req.body;
    const user = await UserDetail.update({ user_id, user_first_name, user_last_name, user_date_of_birth, user_gender, user_address, user_phone_number })
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const followUser = async (req, res) => {
  const { followerId, followingId } = req.body;
  try {
    const follower = await User.findByPk(followerId);
    const following = await User.findByPk(followingId);
    await follower.addFollowing(following);
    res.status(200).json({ message: 'Successfully followed user' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { getUserName, checkRepeatUserName, updateUserPassword, updateUserInfo, getUserInfo, followUser };

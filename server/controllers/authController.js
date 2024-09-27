const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const UserDetail = require('../models/userDetail');

// const secretKey = process.env.JWT_SECRET;
const secretKey = 'xiaozuoshizhu';

const register = async (req, res) => {
  const { user_name, user_password, user_email } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(user_password, 10);
    const user = new User({ user_name, user_password: hashedPassword, user_email });
    const userDetail = new UserDetail({ user_id: user._id, user_first_name: '', user_last_name: '', user_date_of_birth: '', user_gender: '', user_address: '', user_phone_number: '' });
    await user.save();
    await userDetail.save();
    res.status(201).json({ message: 'User registered successfully', user, userDetail });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const login = async (req, res) => {
  const { user_name, user_password } = req.body;
  try {
    const user = await User.findOne({ user_name });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    const isPasswordValid = await bcrypt.compare(user_password, user.user_password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid password' });
    }
    const token = jwt.sign({ user_id: user._id, user_name: user.user_name }, secretKey, { expiresIn: '1h' });
    res.status(200).json({ message: 'Login successful', token: 'Bearer ' + token, user_id: user._id, user_name: user.user_name });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const logout = (req, res) => {
  // JWT 是无状态的，前端只需删除token
  res.status(200).json({ message: 'Logged out successfully' });
};

// test
const getUserInfo = async (req, res) => {
  try {
    const userId = parseInt(req.query.user_id);
    const userDetail = await UserDetail.find({ user_id: userId });
    if (!userDetail) {
      return res.status(404).json({ message: 'User detail not found' });
    }
    res.status(200).json({ userDetail });
  } catch (error) {
    console.error('Error in getUserInfo:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = { register, login, logout, getUserInfo };

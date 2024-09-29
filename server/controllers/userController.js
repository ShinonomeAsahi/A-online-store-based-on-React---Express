const bcrypt = require("bcrypt");
const { User, UserDetail, UserFollow } = require("../models");

// 获取用户姓名的接口
const getUserName = async (req, res) => {
  try {
    const user = await User.findById(req.user.user_id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
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
      res.status(200).json({ message: "User name already exists" });
    } else {
      res.status(200).json({ message: "User name available" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updateUserPassword = async (req, res) => {
  try {
    const { user_id, user_password } = req.body;
    const hashedPassword = await bcrypt.hash(user_password, 10);
    const user = await User.findOneAndUpdate(
      { user_id: user_id },
      { user_password: hashedPassword },
      { new: true }
    );
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getUserInfo = async (req, res) => {
  try {
    // 获取_id
    const userId = req.query.user_id;
    if (userId == null) {
      return res.status(400).json({ message: "User id is required" });
    }
    const userDetail = await UserDetail.findOne({ user_id: userId });
    res.status(200).json({ userDetail });
  } catch (error) {
    console.error("Error in getUserInfo:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const updateUserInfo = async (req, res) => {
  try {
    const {
      user_id,
      user_first_name,
      user_last_name,
      user_date_of_birth,
      user_gender,
      user_address,
      user_phone_number,
    } = req.body;
    const userDetail = await UserDetail.findOneAndUpdate(
      { user_id: user_id },
      {
        user_first_name,
        user_last_name,
        user_date_of_birth,
        user_gender,
        user_address,
        user_phone_number,
      },
      { new: true }
    );
    if (!userDetail) {
      return res.status(404).json({ message: "User not found" });
    }
    userDetail.user_first_name = user_first_name;
    userDetail.user_last_name = user_last_name;
    userDetail.user_date_of_birth = user_date_of_birth;
    userDetail.user_gender = user_gender;
    userDetail.user_address = user_address;
    res.status(201).json(userDetail);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const followUser = async (req, res) => {
  const { followerId, followingId } = req.body;
  try {
    const userFollow = await UserFollow.findOne({ user_id: followerId, followed_user_id: followingId });
    if (userFollow) {
      return res.status(400).json({ message: "User already followed" });
    }
    const newUserFollow = new UserFollow({ user_id: followerId, followed_user_id: followingId, follow_status: 0 });
    await newUserFollow.save();
    res.status(200).json({ message: "Successfully followed user" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getUserFollow = async (req, res) => {
  const { user_id } = req.query;
  try {
    const userFollow = await UserFollow.find({ user_id: user_id })
    .populate({path: 'followed_user_id', select: 'user_name'})
    .select('followed_user_id user_name created_at');
    res.status(200).json(userFollow);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getUserFollowed = async (req, res) => {
  const { user_id } = req.query;
  try {
    const userFollowed = await UserFollow.find({ followed_user_id: user_id }).populate({path: 'user_id', select: 'user_name'});
    res.status(200).json(userFollowed);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getNewUser = async (req, res) => {
  const { number } = req.query;
  try {
    const users = await User.find({}).sort({ created_at: -1 }).limit(number).select('user_name _id');
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getUserName,
  checkRepeatUserName,
  updateUserPassword,
  updateUserInfo,
  getUserInfo,
  followUser,
  getUserFollow,
  getUserFollowed,
  getNewUser,
};

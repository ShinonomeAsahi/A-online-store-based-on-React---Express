const mongoose = require('../config/mongoose');

const userDetailSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  user_first_name: String,
  user_last_name: String,
  user_date_of_birth: Date,
  user_gender: String,
  user_address: String,
  user_phone_number: String,
});

const UserDetail = mongoose.model('UserDetail', userDetailSchema);
module.exports = UserDetail;

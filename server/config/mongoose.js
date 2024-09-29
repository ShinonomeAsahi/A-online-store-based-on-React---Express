// 连接到MongoDB数据库
const mongoose = require('mongoose');

mongoose.connect('mongodb://your_username:your_pass@your_host:27017/your_database', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('MongoDB connected');
}).catch((err) => {
  console.error('Error connecting to MongoDB:', err);
});

module.exports = mongoose;

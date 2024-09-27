// 连接到MongoDB数据库
const mongoose = require('mongoose');

mongoose.connect('mongodb://shop:123456@112.74.108.71:27017/shop', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('MongoDB connected');
}).catch((err) => {
  console.error('Error connecting to MongoDB:', err);
});

module.exports = mongoose;
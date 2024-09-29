const mongoose = require('../config/mongoose');

const orderDetailsSchema = new mongoose.Schema({
  order_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Order',
    required: true,
  },
  product_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true,
  },
  order_quantity: {
    type: Number,
    required: true,
  },
  order_discount: {
    type: Number,
    required: true,
  },
  product_order_price: {
    type: Number,
    required: true,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  updated_at: {
    type: Date,
    default: Date.now,
  },
});

const OrderDetail = mongoose.model('OrderDetail', orderDetailsSchema);
module.exports = OrderDetail;

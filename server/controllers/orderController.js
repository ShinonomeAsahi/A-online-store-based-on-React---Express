const { Order, OrderDetail } = require('../models');

const createOrder = async (req, res) => {
  try {
    const { user_id,  order_type,  order_total_amount,  order_status } = req.body;
    const order = await Order.create({ user_id,  order_type,  order_total_amount,  order_status });
    res.status(201).json(order);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getOrdersByUser = async (req, res) => {
  const { order_id } = req.query;
  try {
    // 关联order和order_detail表
    const orders = await OrderDetail.find({ order_id: order_id }).populate('order_id');
    res.status(200).json({ orders });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateOrder = async (req, res) => {
    try {
        const { order_id } = req.body.order_id;
        const order = await Order.findByIdAndUpdate(order_id);
        res.status(200).json(order);
      } catch (error) {
        res.status(400).json({ error: error.message });
      }
};

const deleteOrder = async (req, res) => { 
    try {
        const { order_id } = req.body.order_id;
        const order = await Order.findByIdAndDelete(order_id);
        res.status(200).json(order);
      } catch (error) {
        res.status(400).json({ error: error.message });
      }
};

module.exports = { createOrder, deleteOrder, getOrdersByUser, updateOrder };

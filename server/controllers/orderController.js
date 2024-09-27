const { Order } = require('../models');

const createOrder = async (req, res) => {
  try {
    const { user_id,  order_type,  order_total_amount,  order_status } = req.body;
    const event = await Order.create({ user_id,  order_type,  order_total_amount,  order_status });
    res.status(201).json(event);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.findAll();
        res.status(200).json(orders);
      } catch (error) {
        res.status(400).json({ error: error.message });
      }
  };

const getOrdersByUser = async (req, res) => {
  try {
    const { user_id } = req.body.user_id;
    const orders = await Order.findOne({ where: { user_id: user_id } });
    res.status(200).json(orders);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { createOrder, getAllOrders, getOrdersByUser };

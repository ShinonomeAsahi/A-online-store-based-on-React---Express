const { Event, Order, EventOrderDetail, User } = require('../models');
// const db = require('../backend/models/index');
// const Event = db.Event;

const createEvent = async (req, res) => {
  try {
    const { event_title,  event_description,  event_date,  event_price } = req.body;
    const event = await Event.create({  event_title,  event_description,  event_date,  event_price });
    res.status(201).json(event);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getEventList = async (req, res) => {
  try {
    const eventList = await Event.findAll(
       {attributes: ['event_id', 'event_title', 'created_at'] }
    );
    res.status(200).json(eventList);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getEventById = async (req, res) => {
  try {
    const { event_id } = req.query;
    if (!event_id) {
      return res.status(400).json({ error: 'Event ID is required' });
    }
    const eventDetail = await Event.findOne({ where: { event_id: event_id } });
    if (eventDetail) {
      return res.status(200).json(eventDetail);
    } else {
      return res.status(404).json({ message: 'Event not found' });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const getEvents = async (req, res) => {
  try {
    const events = await Event.findAll();
    res.status(200).json(events);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const checkoutEvent = async (req, res) => {
  const { user_name } = req.session.user;  // 从 session 中获取用户名
  const { event_id, quantity } = req.body;

  if (!event_id || !quantity) {
    return res.status(400).json({ success: false, message: 'Event ID and quantity are required' });
  }

  try {
    // 检查活动是否存在
    const event = await Event.findOne({ where: { event_id: event_id } });

    if (!event) {
      return res.status(404).json({ success: false, message: 'Event not found' });
    }

    // 查找用户
    const user = await User.findOne({ where: { user_name: user_name } });
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    // 创建订单
    const order = await Order.create({
      user_id: user.user_id,
      order_type: 'event',
      order_total_amount: event.event_price * quantity,
      order_status: 'pending'
    });

    // 创建订单详情
    await EventOrderDetail.create({
      order_id: order.order_id,
      event_id: event.event_id,
      order_quantity: quantity,
      order_price: event.event_price
    });

    res.status(200).json({ message: 'Order placed successfully', order });
  } catch (error) {
    console.error('Error placing order:', error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = { createEvent, getEventList, getEventById, getEvents, checkoutEvent };

const { Order, OrderDetail, UserCart } = require("../models");

// 用户点击支付按钮后，创建订单
const createOrder = async (req, res) => {
  try {
    const { user_id, order_total_amount, order_status, order_items } = req.body;

    // 创建订单
    const order = new Order({
      user_id,
      order_total_amount,
      order_status,
    });
    await order.save();

    // 准备订单详情数据
    const orderDetails = order_items.map((item) => ({
      order_id: order._id,
      product_id: item.product_id,
      order_quantity: item.quantity,
      order_discount: item.discount || 0,
      product_order_price: item.price,
    }));

    // 使用 insertMany 创建订单详情
    if (!OrderDetail || typeof OrderDetail.insertMany !== "function") {
      throw new Error("OrderDetail model is not properly defined or imported");
    }
    await OrderDetail.insertMany(orderDetails);

    res.status(201).json(order);
  } catch (error) {
    console.error("Order creation error:", error);
    res.status(400).json({ error: error.message });
  }
};

// 支付成功后，更新订单状态
const paymentSuccess = async (req, res) => {
  try {
    const { order_id, user_id } = req.body;

    // 更新订单状态
    const order = await Order.findOneAndUpdate(
      { _id: order_id, user_id: user_id },
      { order_status: "paid" },
      { new: true }
    );

    if (!order) {
      throw new Error("订单不存在或不属于该用户");
    }

    // 清空用户购物车
    await UserCart.deleteMany({ user_id: user_id });

    res.status(200).json(order);
  } catch (error) {
    console.error("Payment success error:", error);
    res.status(400).json({ error: error.message });
  }
};

// 获取用户订单
const getOrdersByUser = async (req, res) => {
  const { user_id } = req.body;
  try {
    // 关联order和order_detail表
    const orders = await Order.find({ user_id: user_id });
    res.status(200).json( orders );
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 获取订单信息
const getOrderInfo = async (req, res) => {
  const { order_id } = req.body;
  try {
    const order = await Order.find({ _id: order_id });
    res.status(200).json( order );
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// 更新订单状态
const updateOrder = async (req, res) => {
  try {
    const { user_id } = req.body.user_id;
    const order = await Order.find({ user_id: user_id });
    res.status(200).json(order);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// 删除订单
const deleteOrder = async (req, res) => {
  try {
    const { order_id } = req.body.order_id;
    const order = await Order.find({ order_id: order_id });
    res.status(200).json(order);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// 根据order_id获取该订单下的所有订单详情
const getOrderDetailsByOrderId = async (req, res) => {
  try {
    const { order_id } = req.body;
    const orderDetails = await OrderDetail.find({ order_id: order_id }).populate("product_id");
    res.status(200).json(orderDetails);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  createOrder,
  deleteOrder,
  getOrderInfo,
  getOrdersByUser,
  updateOrder,
  paymentSuccess,
  getOrderDetailsByOrderId,
};

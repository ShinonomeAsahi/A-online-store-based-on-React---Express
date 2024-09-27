const { userCart, Order, Product, ProductOrderDetail } = require('../models');

exports.addToCart = async (req, res) => {
  const { user_id, product_id, cart_quantity } = req.body;
  try {
    const cartItem = await userCart.findOne({ user_id, product_id });
    if (cartItem) {
      cartItem.user_cart_quantity += cart_quantity;
      await cartItem.save();
    } else {
      await userCart.create({ user_id, product_id, user_cart_quantity: cart_quantity });
    }
    res.status(200).json({ message: 'Item added to cart' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.reduceFromCart = async (req, res) => {
  const { user_id, product_id, cart_quantity } = req.body;
  try {
    const cartItem = await userCart.findOne({ user_id, product_id });
    if (cartItem) {
      cartItem.user_cart_quantity -= cart_quantity;
      if (cartItem.user_cart_quantity <= 0) {
        await cartItem.destroy();
      } else {
        await cartItem.save();
      }
    }
    res.status(200).json({ message: 'Item quantity reduced' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.removeFromCart = async (req, res) => {
  const { user_id, product_id } = req.body;
  try {
    const cartItem = await userCart.findOne({ user_id, product_id });
    if (cartItem) {
      await cartItem.destroy();
    }
    res.status(200).json({ message: 'Item removed from cart' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getUserCart = async (req, res) => {
  const { user_id } = req.query;
  try {
    const cartItems = await userCart.findAll({ user_id, include: [Product] });
    res.status(200).json(cartItems);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.checkout = async (req, res) => {
  const { user_id } = req.body;
  try {
    const cartItems = await userCart.findAll({ user_id, include: [Product] });
    if (!cartItems.length) {
      return res.status(400).json({ message: 'No items in cart' });
    }

    const order = await Order.create({
      user_id,
      order_total_amount: cartItems.reduce((total, item) => total + item.user_cart_quantity * item.Product.product_price, 0),
      order_status: 'pending'
    });

    for (const item of cartItems) {
      await OrderDetail.create({
        order_id: order.order_id,
        product_id: item.product_id,
        order_quantity: item.user_cart_quantity,
        order_price: item.Product.product_price
      });
      await item.destroy();  // Clear the cart
    }

    res.status(200).json({ message: 'Order placed successfully', order });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

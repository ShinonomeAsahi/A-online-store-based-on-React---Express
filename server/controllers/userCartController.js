const { UserCart, Order, Product, ProductOrderDetail } = require('../models');

exports.addToCart = async (req, res) => {
  const { user_id, product_id, cart_quantity } = req.body;
  try {
    const result = await UserCart.findOneAndUpdate(
      { user_id, product_id },
      { $inc: { user_cart_quantity: cart_quantity } },
      { new: true, upsert: true }
    );

    console.log('Cart item updated/created:', result);

    res.status(200).json({ message: 'Item added to cart successfully', cartItem: result });
  } catch (error) {
    console.error('Error adding item to cart:', error);
    res.status(500).json({ error: error.message });
  }
};

exports.updateQuantity = async (req, res) => {
  const { user_id, product_id, cart_quantity } = req.body;
  const new_cart_quantity = parseInt(cart_quantity, 10);

  // Log the input values
  console.log('Updating cart quantity:', { user_id, product_id, new_cart_quantity });

  try {
    const result = await UserCart.findOneAndUpdate(
      { user_id, product_id },
      { user_cart_quantity: new_cart_quantity },
      { new: true, upsert: true }
    );

    if (!result) {
      return res.status(404).json({ error: 'Cart item not found' });
    }

    // 若数量减少到0或以下，则删除该项
    if (parseInt(result.user_cart_quantity) <= 0) {
      await UserCart.findOneAndDelete({ user_id, product_id });
      console.log('Cart item removed due to zero or negative quantity');
      return res.status(200).json({ message: 'Item removed from cart' });
    }

    console.log('Cart item updated:', result);
    res.status(200).json({ message: 'Item quantity reduced in cart', cartItem: result });
  } catch (error) {
    console.error('Error reducing item from cart:', error);
    res.status(500).json({ error: error.message });
  }
};

exports.removeFromCart = async (req, res) => {
  const { product_id } = req.body;
  const user_id = req.user.id;

  console.log('Attempting to remove from cart:', { user_id, product_id });

  try {
    const result = await UserCart.findOneAndDelete({ user_id, product_id });

    if (!result) {
      return res.status(404).json({ error: 'Cart item not found' });
    }

    console.log('Cart item removed:', result);
    res.status(200).json({ message: 'Item removed from cart', removedItem: result });
  } catch (error) {
    console.error('Error removing item from cart:', error);
    res.status(500).json({ error: error.message });
  }
};

exports.getUserCart = async (req, res) => {
  const { user_id } = req.query;
  try {
    const cartItems = await UserCart.find({ user_id }).populate('product_id');
    res.status(200).json({ cartItems });
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

const { Product } = require('../models');
const { Order } = require('../models');
// const db = require('../backend/models/index');
// const Product = db.Product;

const createProduct = async (req, res) => {
  try {
    const { product_name, product_description, product_price, product_stock } = req.body;
    const product = await Product.create({ product_name, product_description, product_price, product_stock });
    res.status(201).json(product);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json(products);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getProductById = async (req, res) => {
  try {
    const product_id = req.query.product_id;
    if (!product_id) {
      return res.status(400).json({ error: 'Product ID is required:' + product_id });
    }
    // 需要将 product_id 转换为数字，否则返回404
    // const productId = parseInt(product_id, 10); 
    const productDetail = await Product.findOne({ _id: product_id });
    if (productDetail) {
      return res.status(200).json(productDetail);
    } else {
      return res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const getProductByCategory = async (req, res) => {
  try {
    const { product_category } = req.query;
    if (!product_category) {
      return res.status(400).json({ error: 'Product category is required' });
    }
    const products = await Product.find({ product_category: product_category });
    if (products) {
      res.status(200).json(products);
    } else {
      return res.status(404).json({ message: 'no product found' });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// 通过订单表join订单详情表获取销量前十的商品，作为未登录用户的商品推荐
const getTopTenProducts = async (req, res) => {
  try {
    const topProducts = await Order.find({}).sort({ sales: -1 }).limit(10);
    res.status(200).json(topProducts);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { createProduct, getProducts, getProductById, getProductByCategory, getTopTenProducts };

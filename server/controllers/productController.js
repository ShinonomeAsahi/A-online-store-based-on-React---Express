const { Product } = require('../models');
const { Order } = require('../models');
const OrderDetail = require('../models/orderDetail');
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

// 通过商品名称模糊搜索商品
const getProductBySearch = async (req, res) => {
  const { search } = req.query;
  try {
    const products = await Product.find({ product_name: { $regex: search, $options: 'i' } });
    res.status(200).json(products);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// 通过订单表join订单详情表获取销量前十的商品，作为未登录用户的商品推荐
const getTopTenProducts = async (req, res) => {
  try {
    const topProducts = await OrderDetail.aggregate([
      {
        // 聚合
        $group: {
          _id: "$product_id",
          totalQuantity: { $sum: "$order_quantity" }
        }
      },
      {
        // 排序
        $sort: { totalQuantity: -1 }
      },
      {
        // 取前十
        $limit: 10
      },
      {
        // 关联product表
        $lookup: {
          from: "products",
          localField: "_id",
          foreignField: "_id",
          as: "product"
        }
      },
      {
        // 展开数组
        $unwind: "$product"
      },
      {
        // 只返回商品数据，保护数据安全
        $project: {
          _id: 0,
          product_name: "$product.product_name",
          product_description: "$product.product_description",
          product_price: "$product.product_price",
          product_stock: "$product.product_stock",
          product_image: "$product.product_img_url",
          totalQuantity: 1
        }
      }
    ]);

    res.status(200).json(topProducts);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { createProduct, getProducts, getProductById, getProductByCategory, getTopTenProducts, getProductBySearch };

module.exports = { createProduct, getProducts, getProductById, getProductByCategory, getTopTenProducts, getProductBySearch };

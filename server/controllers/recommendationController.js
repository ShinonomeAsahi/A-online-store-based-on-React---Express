const { Product, UserBehavior } = require('../models');

// 为用户推荐最近搜索分类中销量最高的商品，如果用户已经购买过，则按照销量向下顺延
exports.getRecoFromRecentSearchBySales = async (req, res) => {
  const { user_id } = req.query;
  try {
    const behaviors = await UserBehavior.findAll({ where: { user_id } });
    // 获取最近搜索分类
    const recentSearchCategory = behaviors.map(behavior => behavior.category).filter(category => category !== null);
    // 获取最近搜索分类的销量
    const recentSearchSales = await Product.findAll({ where: { category: recentSearchCategory } });
    // 获取最近搜索分类的销量最高的商品
    const recommendedProducts = recentSearchSales.sort((a, b) => b.sales - a.sales).slice(0, 10);
    res.status(200).json(recommendedProducts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 为用户推荐最近搜索分类中关注用户购买过的商品，如果用户已经购买过，则寻找下一个
exports.getRecoFromRecentSearchByFollowedUser = async (req, res) => {
  const { user_id } = req.query;
  try {
    const behaviors = await UserBehavior.findAll({ where: { user_id } });
    // 获取最近搜索分类
    const recentSearchCategory = behaviors.map(behavior => behavior.category).filter(category => category !== null);
    // 获取最近搜索分类的销量
    const recentSearchSales = await Product.findAll({ where: { category: recentSearchCategory } });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 为用户推荐最近最多次购买分类中销量最高的商品
exports.getRecoFromRecentSearchBySales = async (req, res) => {
  const { user_id } = req.query;
  try {
    const behaviors = await UserBehavior.findAll({ where: { user_id } });
    // 获取最近搜索分类
    const recentSearchCategory = behaviors.map(behavior => behavior.category).filter(category => category !== null);
    // 获取最近搜索分类的销量
    const recentSearchSales = await Product.findAll({ where: { category: recentSearchCategory } });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 为用户推荐所有关注用户中被购买最频繁的商品，如果用户已经购买过，则寻找下一个
exports.getRecoFromFollowedUserBySales = async (req, res) => {
  const { user_id } = req.query;
  try {
    const behaviors = await UserBehavior.findAll({ where: { user_id } });
    // 获取最近搜索分类
    const recentSearchCategory = behaviors.map(behavior => behavior.category).filter(category => category !== null);
    // 获取最近搜索分类的销量
    const recentSearchSales = await Product.findAll({ where: { category: recentSearchCategory } });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};






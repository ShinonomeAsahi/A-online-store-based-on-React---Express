const express = require('express');
const { createProduct, getProducts, getProductById, getProductByCategory, getTopTenProducts, getProductBySearch } = require('../controllers/productController');
const router = express.Router();

/**,
 * @swagger
 * /api/products/create:
 *   post:
 *     tags:
 *       - 商品管理
 *     summary: 新增商品
 *     produces:
 *       - application/json
 *     requestBody:
 *       description: User object
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               product_name:
 *                 type: string
 *               product_description:
 *                 type: string
 *               product_img_url:
 *                 type: string
 *               product_price:
 *                  type: number
 *               product_stock:
 *                  type: number
 *     responses:
 *       200:
 *         description: successful operation
 *       400:
 *         description: Invalid input
 */
router.post('/create', createProduct);

/**,
 * @swagger
 * /api/products:
 *   get:
 *     tags:
 *       - 商品管理
 *     summary: 查询商品
 *     responses:
 *       200:
 *         description: successful operation
 *       400:
 *         description: Invalid input
 */
router.get('/', getProducts);

/**,
 * @swagger
 * /api/products/getProductById:
 *   get:
 *     tags:
 *       - 商品管理
 *     summary: 根据Id获取详情商品详情
 *     parameters:
 *       - name: product_id
 *         in: query
 *         required: true
 *         description: 商品ID
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: successful operation
 *       400:
 *         description: Invalid input
 */
router.get('/getProductById', getProductById);

/**,
 * @swagger
 * /api/products/getProductByCategory:
 *   get:
 *     tags:
 *       - 商品管理
 *     summary: 根据商品类别获取详情商品详情
 *     parameters:
 *       - name: product_category
 *         in: query
 *         required: true
 *         description: 商品ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: successful operation
 *       400:
 *         description: Invalid input
 */
router.get('/getProductByCategory', getProductByCategory);

/**,
 * @swagger
 * /api/products/getProductBySearch:
 *   get:
 *     tags:
 *       - 商品管理
 *     summary: 通过商品名称模糊搜索商品
 *     parameters:
 *       - name: search
 *         in: query
 *         required: true
 *         description: 商品名称
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: successful operation
 *       400:
 *         description: Invalid input
 */
router.get('/getProductBySearch', getProductBySearch);



/**,
 * @swagger
 * /api/products/getTopTenProducts:
 *   get:
 *     tags:
 *       - 商品管理
 *     summary: 获取销量前十的商品
 *     responses:
 *       200:
 *         description: successful operation
 *       400:
 *         description: Invalid input
 */
router.get('/getTopTenProducts', getTopTenProducts);

module.exports = router;

const express = require('express');
const router = express.Router();
// const { authenticateToken } = require('../middleware/authMiddleware');
// router.use(authenticateToken);
const { addToCart, updateQuantity, removeFromCart, getUserCart, checkout } = require('../controllers/userCartController');

/**,
 * @swagger
 * /api/userCarts/addToCart:
 *   post:
 *     tags:
 *       - 购物车管理
 *     summary: 添加商品到购物车
 *     produces:
 *       - application/json
 *     requestBody:
 *       description: UserCart object
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user_id:
 *                 type: integer
 *               product_id:
 *                 type: integer
 *               cart_quantity:
 *                 type: integer
 *     responses:
 *       200:
 *         description: successful operation
 *       400:
 *         description: Invalid input
 */
router.post('/addToCart', addToCart);

/**,
 * @swagger
 * /api/userCarts/updateQuantity:
 *   post:
 *     tags:
 *       - 购物车管理
 *     summary: 更新购物车商品数量
 *     produces:
 *       - application/json
 *     requestBody:
 *       description: UserCart object
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user_id:
 *                 type: integer
 *               product_id:
 *                 type: integer
 *               cart_quantity:
 *                 type: integer
 *     responses:
 *       200:
 *         description: successful operation
 *       400:
 *         description: Invalid input
 */
router.post('/updateQuantity', updateQuantity);

/**,
 * @swagger
 * /api/userCarts/removeFromCart:
 *   post:
 *     tags:
 *       - 购物车管理
 *     summary: 移除购物车商品
 *     produces:
 *       - application/json
 *     requestBody:
 *       description: UserCart object
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user_id:
 *                 type: integer
 *               product_id:
 *                 type: integer
 *     responses:
 *       200:
 *         description: successful operation
 *       400:
 *         description: Invalid input
 */
router.post('/removeFromCart', removeFromCart);

/**,
 * @swagger
 * /api/userCarts/getUserCart:
 *   get:
 *     tags:
 *       - 购物车管理
 *     summary: 获取用户购物车
 *     parameters:
 *       - name: user_id
 *         in: query
 *         required: true
 *         description: 用户ID
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: successful operation
 *       400:
 *         description: Invalid input
 */
router.get('/getUserCart', getUserCart);

/**,
 * @swagger
 * /api/userCarts/checkout:
 *   post:
 *     tags:
 *       - 购物车管理
 *     summary: 结算购物车
 *     produces:
 *       - application/json
 *     requestBody:
 *       description: UserCart object
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user_id:
 *                 type: integer
 *     responses:
 *       200:
 *         description: successful operation
 *       400:
 *         description: Invalid input
 */
router.post('/checkout', checkout);

module.exports = router;

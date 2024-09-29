const express = require('express');
const router = express.Router();
const { createOrder, deleteOrder, getOrdersByUser, updateOrder } = require('../controllers/orderController');

/**,
 * @swagger
 * /api/orders/createOrder:
 *   post:
 *     tags:
 *       - 订单管理
 *     summary: 创建订单
 *     produces:
 *       - application/json
 *     requestBody:
 *       description: Order object
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
router.post('/createOrder', createOrder);

/**,
 * @swagger
 * /api/orders/getOrdersByUser:
 *   get:
 *     tags:
 *       - 订单管理
 *     summary: 获取用户订单
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: user_id
 *         in: query
 *         required: true
 *         description: 用户ID
 *         schema:
 *           type: integer
 *     responses:
 *             type: object
 *             properties:
 *               order_id: 
 *                 type: string
 *               product_id:
 *                 type: string
 *               order_quantity:
 *                 type: string
 *     responses:
 *       200:
 *         description: successful operation
 *       400:
 *         description: Invalid input
 */
router.post('/getOrdersByUser', getOrdersByUser);

/**,
 * @swagger
 * /api/orders/updateOrder:
 *   post:
 *     tags:
 *       - 订单管理
 *     summary: 更新订单
 *     produces:
 *       - application/json
 *     requestBody:
 *       description: Order object
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
router.post('/updateOrder', updateOrder);

/**,
 * @swagger
 * /api/orders/deleteOrder:
 *   post:
 *     tags:
 *       - 订单管理
 *     summary: 删除订单
 *     parameters:
 *       - name: user_id
 *         in: query
 *         required: true
 *         description: 订单ID
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: successful operation
 *       400:
 *         description: Invalid input
 */
router.post('/deleteOrder', deleteOrder);

module.exports = router;

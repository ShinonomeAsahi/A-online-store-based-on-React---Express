const express = require('express');
const { register, login, logout, getUserInfo } = require('../controllers/authController');
const router = express.Router();

/**,
 * @swagger
 * /api/auth/register:
 *   post:
 *     tags:
 *       - 用户认证管理
 *     summary: 用户注册
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
 *               user_name:
 *                 type: string
 *               user_password:
 *                 type: string
 *                 minLength: 6
 *               user_email:
 *                 type: string
 *     responses:
 *       200:
 *         description: successful operation
 *       400:
 *         description: Invalid input
 */
router.post('/register', register);

/**,
 * @swagger
 * /api/auth/login:
 *   post:
 *     tags:
 *       - 用户认证管理
 *     summary: 用户登录
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
 *               user_name:
 *                 type: string
 *               user_password:
 *                 type: string
 *     responses:
 *       200:
 *         description: successful operation
 *       400:
 *         description: Invalid input
 */
router.post('/login', login);

/**,
 * @swagger
 * /api/auth/logout:
 *   post:
 *     tags:
 *       - 用户认证管理
 *     summary: 用户登出
 *     responses:
 *       200:
 *         description: successful operation
 *       400:
 *         description: Invalid input
 */
router.post('/logout', logout);

/**,
 * @swagger
 * /api/auth/getUserInfo:
 *   get:
 *     parameters:
 *       - name: user_id
 *         in: query
 *         required: true
 *         description: 用户ID
 *         schema:
 *           type: integer
 *     tags:
 *       - 用户认证管理
 *     summary: 获取受保护的用户信息
 *     responses:
 *       200:
 *         description: successful operation
 *       400:
 *         description: Invalid input
 */
router.get('/getUserInfo', getUserInfo);

module.exports = router;

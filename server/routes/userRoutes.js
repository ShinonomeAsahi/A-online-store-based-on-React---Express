const express = require("express");
const {
  getUserName,
  checkRepeatUserName,
  updateUserPassword,
  addUserInfo,
  updateUserInfo,
  getUserInfo,
  followUser,
  getUserFollow,
  getUserFollowed,
  getNewUser,
} = require("../controllers/userController");
const router = express.Router();

/**
 * @swagger
 * /api/users/getUserName:
 *   get:
 *     tags:
 *       - 用户管理
 *     summary: 获取当前登录用户名
 *     responses:
 *       200:
 *         description: successful operation
 *       400:
 *         description: Invalid input
 */
router.get("/getUserName", getUserName);

/**
 * @swagger
 * /api/users/checkRepeatUserName:
 *   post:
 *     tags:
 *       - 用户管理
 *     summary: 用户名查重
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
 *     responses:
 *       200:
 *         description: successful operation
 *       400:
 *         description: Invalid input
 */
router.post("/checkRepeatUserName", checkRepeatUserName);

/**,
 * @swagger
 * /api/users/resetPassword:
 *   post:
 *     tags:
 *       - 用户管理
 *     summary: 修改密码
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
 *               user_id:
 *                 type: string
 *               user_new_password:
 *                 type: string
 *     responses:
 *       200:
 *         description: successful operation
 *       400:
 *         description: Invalid input
 */
router.post("/resetPassword", updateUserPassword);

/**,
 * @swagger
 * /api/users/updateUserInfo:
 *   post:
 *     tags:
 *       - 用户管理
 *     summary: 更新用户信息
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
 *               user_id:
 *                 type: string
 *               user_first_name:
 *                 type: string
 *               user_last_name:
 *                 type: string
 *               user_date_of_birth:
 *                 type: string
 *                 format: date
 *               user_gender:
 *                 type: string
 *               user_address:
 *                  type: string
 *               user_phone_number:
 *                  type: string
 *     responses:
 *       200:
 *         description: successful operation
 *       400:
 *         description: Invalid input
 */
router.post("/updateUserInfo", updateUserInfo);

/**,
 * @swagger
 * /api/users/getUserInfo:
 *   get:
 *     tags:
 *       - 用户管理
 *     summary: 获取用户信息
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
router.get("/getUserInfo", getUserInfo);

/**,
 * @swagger
 * /api/users/followUser:
 *   post:
 *     tags:
 *       - 用户管理
 *     summary: 关注用户
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
 *               user_id:
 *                 type: string
 *               follow_user_id:
 *                 type: string
 *     responses:
 *       200:
 *         description: successful operation
 *       400:
 *         description: Invalid input
 */
router.post("/followUser", followUser);

/**,
 * @swagger
 * /api/users/getUserFollow:
 *   get:
 *     tags:
 *       - 用户管理
 *     summary: 获取用户关注
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
router.get("/getUserFollow", getUserFollow);

/**,
 * @swagger
 * /api/users/getUserFollowed:
 *   get:
 *     tags:
 *       - 用户管理
 *     summary: 获取用户关注
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
router.get("/getUserFollowed", getUserFollowed);

/**,
 * @swagger
 * /api/users/getUserFollowed:
 *   get:
 *     tags:
 *       - 用户管理
 *     summary: 获取用户被关注


/**,
 * @swagger
 * /api/users/getNewUser:
 *   get:
 *     tags:
 *       - 用户管理
 *     summary: 获取最新用户
 *     parameters:
 *       - name: number
 *         in: query
 *         required: true
 *         description: 获取数量
 *     responses:
 *       200:
 *         description: successful operation
 *       400:
 *         description: Invalid input
 */
router.get("/getNewUser", getNewUser);

module.exports = router;

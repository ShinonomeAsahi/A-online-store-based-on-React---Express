const express = require("express");
const {
  createDiscussion,
  createDiscussionCategory,
  getDiscussionList,
  getNewDiscussion,
  getDiscussionById,
  createDiscussionComment,
  getDiscussionByUserId,
  getCommentByUserId,
  getDiscussionCategory,
  getDiscussionCommentByDiscussionId,
  getDiscussionByCategory,
} = require("../controllers/discussionController");
const router = express.Router();

/**,
 * @swagger
 * /api/discussions/createDiscussion:
 *   post:
 *     tags:
 *       - 讨论管理
 *     summary: 新增讨论
 *     requestBody:
 *       description: User object
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               discussion_title:
 *                 type: string
 *               discussion_body:
 *                 type: string
 *               discussion_category:
 *                 type: string
 *               user_id:
 *                  type: string
 *     responses:
 *       200:
 *         description: successful operation
 *       400:
 *         description: Invalid input
 */
router.post("/createDiscussion", createDiscussion);

/**,
 * @swagger
 * /api/discussions/createDiscussionCategory:
 *   post:
 *     tags:
 *       - 讨论管理
 *     summary: 新增讨论分类
 *     requestBody:
 *       description: User object
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               category_name:
 *                 type: string
 *               category_admin:
 *                 type: string
 *     responses:
 *       200:
 *         description: successful operation
 *       400:
 *         description: Invalid input
 */
router.post("/createDiscussionCategory", createDiscussionCategory);

/**,
 * @swagger
 * /api/discussions/getDiscussionList:
 *   get:
 *     tags:
 *       - 讨论管理
 *     summary: 获取讨论预览
 *     responses:
 *       200:
 *         description: successful operation
 *       400:
 *         description: Invalid input
 */
router.get("/getDiscussionList", getDiscussionList);

/**
 * @swagger
 * /api/discussions/getNewDiscussion:
 *   get:
 *     tags:
 *       - 讨论管理
 *     summary: 获取最新讨论
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
router.get("/getNewDiscussion", getNewDiscussion);

/**,
 * @swagger
 * /api/discussions/getDiscussionById:
 *   get:
 *     tags:
 *       - 讨论管理
 *     summary: 根据Id获取详情讨论详情
 *     parameters:
 *       - name: discussion_id
 *         in: query
 *         required: true
 *         description: 讨论ID
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: successful operation
 *       400:
 *         description: Invalid input
 */
router.get("/getDiscussionById", getDiscussionById);

/**,
 * @swagger
 * /api/discussions/getCommentByUserId:
 *   get:
 *     tags:
 *       - 讨论管理
 *     summary: 根据用户ID获取讨论评论
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
router.get("/getCommentByUserId", getCommentByUserId);

/**,
 * @swagger
 * /api/discussions/createDiscussionComment:
 *   post:
 *     tags:
 *       - 讨论管理
 *     summary: 新增讨论评论
 *     requestBody:
 *       description: User object
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               discussion_id:
 *                 type: string
 *               discussion_comment_user_id:
 *                 type: string
 *               discussion_comment_content:
 *                 type: string
 *     responses:
 *       200:
 *         description: successful operation
 *       400:
 *         description: Invalid input
 */
router.post("/createDiscussionComment", createDiscussionComment);

/**,
 * @swagger
 * /api/discussions/getDiscussionByUserId:
 *   get:
 *     tags:
 *       - 讨论管理
 *     summary: 根据用户ID获取讨论
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
router.get("/getDiscussionByUserId", getDiscussionByUserId);

/**,
 * @swagger
 * /api/discussions/getDiscussionCategory:
 *   get:
 *     tags:
 *       - 讨论管理
 *     summary: 获取讨论分类
 *     responses:
 *       200:
 *         description: successful operation
 *       400:
 *         description: Invalid input
 */
router.get("/getDiscussionCategory", getDiscussionCategory);

/**,
 * @swagger
 * /api/discussions/getDiscussionCommentByDiscussionId:
 *   get:
 *     tags:
 *       - 讨论管理
 *     summary: 根据讨论ID获取讨论评论
 *     parameters:
 *       - name: discussion_id
 *         in: query
 *         required: true
 *         description: 讨论ID
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: successful operation
 *       400:
 *         description: Invalid input
 */
router.get(
  "/getDiscussionCommentByDiscussionId",
  getDiscussionCommentByDiscussionId
);

/**
 * @swagger
 * /api/discussions/getDiscussionByCategory:
 *   get:
 *     tags:
 *       - 讨论管理
 *     summary: 根据分类获取讨论
 *     parameters:
 *       - name: category_id
 *         in: query
 *         required: true
 *         description: 分类ID
 *     responses:
 *       200:
 *         description: successful operation
 *       400:
 *         description: Invalid input
 */
router.get(
    "/getDiscussionByCategory",
    getDiscussionByCategory
  );

module.exports = router;
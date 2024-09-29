const express = require('express');
const { createDiscussion, getDiscussionList, getDiscussionById,createComment } = require('../controllers/discussionController');
const router = express.Router();

/**,
 * @swagger
 * /api/discussions/createDiscussion:
 *   post:
 *     tags:
 *       - 讨论管理
 *     summary: 新增讨论
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
 *               content_title:
 *                 type: string
 *               content_body:
 *                 type: string
 *               content_imageUrl:
 *                 type: string
 *               content_videoUrl:
 *                  type: string
 *     responses:
 *       200:
 *         description: successful operation
 *       400:
 *         description: Invalid input
 */
router.post('/createDiscussion', createDiscussion);

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
router.get('/getDiscussionList', getDiscussionList);

/**,
 * @swagger
 * /api/discussions/getDiscussionById:
 *   get:
 *     tags:
 *       - 内容管理
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
router.get('/getDiscussionById', getDiscussionById);

// 创建评论
router.post('/createComment', createComment);
module.exports = router;

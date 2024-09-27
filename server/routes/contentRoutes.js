const express = require('express');
const { createTopic, getTopicList, getTopicById } = require('../controllers/contentController');
const router = express.Router();

/**,
 * @swagger
 * /api/contents/create:
 *   post:
 *     tags:
 *       - 内容管理
 *     summary: 新增内容
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
// router.post('/create', createContent);

/**,
 * @swagger
 * /api/contents/getContentList:
 *   get:
 *     tags:
 *       - 内容管理
 *     summary: 获取内容预览
 *     responses:
 *       200:
 *         description: successful operation
 *       400:
 *         description: Invalid input
 */
// router.get('/getContentList', getContentList);

/**,
 * @swagger
 * /api/contents/getContentById:
 *   get:
 *     tags:
 *       - 内容管理
 *     summary: 根据Id获取详情内容详情
 *     parameters:
 *       - name: content_id
 *         in: query
 *         required: true
 *         description: 内容ID
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: successful operation
 *       400:
 *         description: Invalid input
 */
// router.get('/getContentById', getContentById);

/**,
 * @swagger
 * /api/contents:
 *   get:
 *     tags:
 *       - 内容管理
 *     summary: 查询内容
 *     responses:
 *       200:
 *         description: successful operation
 *       400:
 *         description: Invalid input
 */
// router.get('/', getContents);

router.post('/createTopic', createTopic);
router.get('/getTopicList', getTopicList);
router.get('/getTopicById', getTopicById);

module.exports = router;

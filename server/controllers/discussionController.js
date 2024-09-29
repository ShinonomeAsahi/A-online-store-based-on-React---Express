const { Discussion, DiscussionComment, User } = require('../models');

exports.createDiscussion = async (req, res) => {
  const { discussion_title, discussion_body, user_id } = req.body;
  try {
    const discussion = await Discussion.create({ discussion_title, discussion_body, user_id });
    res.status(201).json({ message: 'Discussion created successfully', discussion });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getDiscussionList = async (req, res) => {
  try {
    const discussions = await Discussion.aggregate([
      {
        $lookup: {
          from: 'users', // 联合的集合名称
          localField: 'created_by', // Discussion 中的 created_by 字段
          foreignField: '_id', // users 中的 _id 字段
          as: 'user' // 返回的用户数组字段名
        }
      },
      {
        $unwind: { path: '$user', preserveNullAndEmptyArrays: true } // 展开用户信息
      },
      {
        $lookup: {
          from: 'discussioncomments', // 联合的集合名称
          localField: '_id', // Discussion 的 _id 字段
          foreignField: 'articleId', // discussioncomments 中的 articleId 字段
          as: 'comments' // 返回的评论数组字段名
        }
      },
      {
        $addFields: {
          commentsCount: { $size: '$comments' } // 添加评论数量字段
        }
      },
      {
        $project: {
            comments: 0 // 删除 comments 字段
        }
    },

      {
        $replaceRoot: {
          newRoot: {
            $mergeObjects: ["$$ROOT", { created_by: {
              id: '$user._id', // 用户的 ID
              username: '$user.user_name' // 用户的用户名
          },  commentsCount: '$commentsCount' }]
          }
        }
      }
    ]);

    res.status(200).json(discussions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }

};

// 辅助函数：构建评论树
const buildCommentTree = (comments) => {
  const map = {};
  const roots = [];

  // 将每个评论放入 map 中，以便快速查找
  comments.forEach(comment => {
      map[comment._id] = { ...comment._doc, replies: [] }; // 初始化 replies 数组
  });
  // 根据 parentCommentId 关联评论
  comments.forEach(comment => {
      if (comment.parentCommentId) {
          const parentComment = map[comment.parentCommentId];
          if (parentComment) {
              // 如果找到父级评论，则将当前评论添加到父级评论的 replies 数组中
              parentComment.replies.push(map[comment._id]);
          } else {
              console.warn(`Parent comment with ID ${comment.parentCommentId} not found for comment ID ${comment._id}`);
          }
      } else {
          // 否则视为根评论
          roots.push(map[comment._id]);
      }
  });

  return roots;
};

exports.getDiscussionById = async (req, res) => {
  const { discussion_id } = req.query;
  try {
      // 查找讨论
      const discussion = await Discussion.findById(discussion_id).populate({
          path: 'created_by',
          select: 'user_name'
      });

      if (!discussion) {
          return res.status(404).json({ message: 'Discussion not found' });
      }
      // console.log(discussion_id)
      // 查找与该讨论相关的评论，获取所有字段
      const comments = await DiscussionComment.find({ articleId: discussion_id }).populate({
          path: 'userId',
          select: 'user_name'
      })
      // console.log(comments)
      const commentTree = buildCommentTree(comments);
      // console.log(commentTree)
      const discussionObj = discussion.toObject(); 
      // 将评论添加到讨论对象中
      discussionObj.comments = commentTree;
    //  console.log(discussion)
      res.status(200).json(discussionObj);
  } catch (error) {
    // console.log(error)
      res.status(500).json({ error: error.message });
  }
};

// 创建评论
exports.createComment = async (req, res) => {
  // console.log(req.body)
  try {
    const comment = new DiscussionComment({
      articleId: req.body.articleId,
      parentCommentId: req.body.parentCommentId,
      userId: req.body.userId,
      content: req.body.content,
    });
    await comment.save();
    // console.log(comment)
    res.status(201).json(comment);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
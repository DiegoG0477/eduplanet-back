const express = require('express');
const router = express.Router();

const commentController = require("../controllers/comments.controller")
const {verifyToken} = require("../middlewares/auth.middleware")

router.get("/blogs/:id", commentController.getAllCommentBlog)
router.get("/:id",verifyToken,commentController.getById)
router.post("/:id", verifyToken,commentController.postComment)
router.delete("/:id",verifyToken,commentController.deletedComment)
module.exports = router;
const express = require("express");
const router = express.Router();
const blogControllers = require("../controllers/blogs.controller");
const middlewares = require("../middlewares/auth.middleware");

router.post("/", middlewares.verifyToken, blogControllers.postBlog);
router.get("/", blogControllers.getBlogs);
router.put("/:id", middlewares.verifyToken,blogControllers.putBlog);
router.delete("/:id", middlewares.verifyToken,blogControllers.deleteBlog);
router.get("/:id", middlewares.verifyToken, blogControllers.getByIdBlog);

module.exports = router;

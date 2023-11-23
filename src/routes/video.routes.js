const express = require('express');
const router = express.Router();
const videoController = require("../controllers/video.controller")
const middlewares = require("../middlewares/auth.middleware")


router.get("/:id", videoController.getVideos)
router.post("/", middlewares.verifyToken, videoController.createVideo)
router.delete("/:id", middlewares.verifyToken, videoController.deleteVideo)
router.put("/:id", middlewares.verifyToken, videoController.putVideo)
router.get("/byId/:id", videoController.getById)

module.exports = router;
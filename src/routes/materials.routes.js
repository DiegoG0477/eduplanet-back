const express= require("express");
const router = express.Router();
const materialsController = require('../controllers/materials.controller');
const middlewares = require('../middlewares/auth.middleware');

router.get("/", materialsController.index);
router.get("/:id", materialsController.showMaterial);
router.post("/", middlewares.verifyToken, materialsController.uploadMaterial);
router.patch("/:id", middlewares.verifyToken, materialsController.updateMaterial);

module.exports = router;
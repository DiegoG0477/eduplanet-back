const express= require("express");
const router = express.Router();
const usersController = require('../controllers/users.controller');
const middlewares = require('../middlewares/auth.middleware');

router.get("/", middlewares.verifyToken, usersController.index);
router.get("/:id", middlewares.verifyToken, usersController.getById);
router.delete("/:id", middlewares.verifyToken, usersController.deleteUser);
router.patch('/user/:id', middlewares.verifyToken, usersController.updateUser);
router.put('/user/:id', middlewares.verifyToken, usersController.completeUpdate);
router.get("/get/IdToken", middlewares.verifyToken, usersController.getTokenId);
module.exports = router;
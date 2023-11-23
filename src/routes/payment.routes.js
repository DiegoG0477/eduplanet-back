const express= require("express");
const router = express.Router();
const middlewares = require('../middlewares/auth.middleware');
const paymentController = require('../controllers/buys.controller');

router.post("/create-order", paymentController.create);
router.get("/capture-order", paymentController.captureOrder);
router.get("/cancel-payment", paymentController.cancelPayment);

module.exports = router;
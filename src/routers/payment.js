const express = require("express")
const { userAuth } = require("../middleware/auth")
const { createOrderController, getPaymentStatusController } = require("../controller/paymentController")
const paymentRouter = express.Router()
paymentRouter.post("/payment/create-order", userAuth, createOrderController)
paymentRouter.get(
  "/payment/status/:orderId",
  userAuth,
  getPaymentStatusController
);
module.exports = paymentRouter

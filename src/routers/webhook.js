const express = require("express");
const { webhookController } = require("../controller/webhookController");

const webhookRouter = express.Router();

// Razorpay webhook endpoint
webhookRouter.post("/", webhookController);

module.exports = webhookRouter;

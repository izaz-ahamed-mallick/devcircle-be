const Razorpay = require("razorpay");
const Payment = require("../models/payment");
const User = require("../models/user");

const webhookController = async (req, res) => {
  try {

    if (!Buffer.isBuffer(req.body)) {
      return res.status(400).json({
        message: "Invalid webhook body.",
      });
    }
    const webhookSignature = req.headers["x-razorpay-signature"];

    if (!webhookSignature) {
      return res.status(400).json({
        message: "Missing webhook signature.",
      });
    }

    // Verify webhook signature using Razorpay SDK
    const isValid = Razorpay.validateWebhookSignature(
      req.body.toString(),
      webhookSignature,
      process.env.RAZORPAY_WEBHOOK_SECRET
    );

    if (!isValid) {
      return res.status(400).json({
        message: "Invalid webhook signature.",
      });
    }

    // Parse body only after signature verification
    const webhookData = JSON.parse(req.body.toString());

    const event = webhookData.event;
    if (event === "payment.captured") {
      const paymentEntity = webhookData.payload.payment.entity;

      const {
        id: razorpayPaymentId,
        order_id: razorpayOrderId,
        amount,
        currency,
        status,
      } = paymentEntity;

      if (status !== "captured") {
        return res.status(400).json({
          message: "Payment is not captured.",
        });
      }

      const updatedPayment = await Payment.findOneAndUpdate(
        {
          razorpayOrderId,
          status: "created",
          amount: amount / 100,
          currency,
        },
        {
          $set: {
            razorpayPaymentId,
            status: "paid",
          },
        },
        { new: true }
      );

      if (!updatedPayment) {
        const existingPayment = await Payment.findOne({
          razorpayOrderId,
        });

        if (!existingPayment) {
          return res.status(404).json({
            message: "Payment record not found.",
          });
        }

        if (
          existingPayment.status === "paid" &&
          existingPayment.razorpayPaymentId === razorpayPaymentId
        ) {
          return res.status(200).json({
            message: "Payment already processed.",
          });
        }


        return res.status(400).json({
          message: "Payment details mismatch or invalid payment state.",
        });
      }

      const planStartDate = new Date();

      const planExpiryDate = new Date(planStartDate);
      planExpiryDate.setMonth(planExpiryDate.getMonth() + 1);
      await User.findByIdAndUpdate(updatedPayment.userId, {
        $set: {
          isUserHavePlan: true,
          currentPlan: updatedPayment.planId,
          planExpiryDate
        }
      })
    }


    return res.status(200).json({
      message: "Webhook processed successfully."
    });
  } catch (error) {
    console.error("Webhook error:", error.message);

    return res.status(500).json({
      message: "Webhook processing failed.",
    });
  }
};

module.exports = { webhookController };

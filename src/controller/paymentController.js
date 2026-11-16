const PLANS = require("../config/plans");
const RazorapayInstance = require("../config/razorpay");
const Payment = require("../models/payment");


const createOrderController = async (req, res) => {
  try {
    const { planId } = req.body;
    const userId = req.user._id;
    const plan = PLANS[planId];

    if (!plan) {
      return res.status(400).json({
        message: "Invalid subscription plan.",
      });
    }
    const amount = plan.amount;
    const currency = plan.currency;

    if (!amount) {
      return res.status(400).json({
        message: "Invalid subscription plan.",
      });
    }
    const options = {
      amount: amount * 100,
      currency,
      receipt: `receipt_${Date.now()}`,

      notes: {
        userId: userId.toString(),
        planId,
        planName: planId.toUpperCase(),
        purpose: "DevCircle Premium Membership",
      },
    };

    const order = await RazorapayInstance.orders.create(options);
    const payment = await Payment.create({
      userId,
      planId,
      amount,
      currency: order.currency,
      razorpayOrderId: order.id,
      status: "created",
      notes: options.notes,
    });

    return res.status(201).json({
      message: "Order created successfully.",
      keyId: process.env.RAZORPAY_API_KEY,

      user: {
        firstName: req.user.firstName,
        lastName: req.user.lastName,
        emailId: req.user.emailId,
      },

      order: {
        id: order.id,
        amount: order.amount,
        currency: order.currency,
        receipt: order.receipt,
      },

      payment: {
        id: payment._id,
        orderId: payment.razorpayOrderId,
        amount: payment.amount,
        currency: payment.currency,
        status: payment.status,
      },
    });

  } catch (error) {
    console.error("Create order error:", error.message);

    return res.status(500).json({
      message: "Unable to create payment order.",
    });
  }
};



const getPaymentStatusController = async (req, res) => {
  try {
    const { orderId } = req.params;

    if (!orderId) {
      return res.status(400).json({
        success: false,
        message: "Order ID is required.",
      });
    }

    // Find the payment belonging to the authenticated user
    const payment = await Payment.findOne({
      razorpayOrderId: orderId,
      userId: req.user._id,
    });

    if (!payment) {
      return res.status(404).json({
        success: false,
        message: "Payment record not found.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Payment status fetched successfully.",
      payment: {
        orderId: payment.razorpayOrderId,
        paymentId: payment.razorpayPaymentId,
        amount: payment.amount,
        currency: payment.currency,
        status: payment.status,
      },
    });
  } catch (error) {
    console.error("Payment status error:", error.message);

    return res.status(500).json({
      success: false,
      message: "Unable to fetch payment status.",
    });
  }
};


module.exports = { createOrderController, getPaymentStatusController };

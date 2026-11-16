const Razorapay = require("razorpay")
const RazorapayInstance = new Razorapay({
  key_id: process.env.RAZORPAY_API_KEY,
  key_secret: process.env.RAZORPAY_SECRET_KEY
})
module.exports = RazorapayInstance

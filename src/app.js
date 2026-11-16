require("dotenv").config();

const express = require("express")
const app = express()
const { connectDB } = require("./config/database")

const cookieParser = require("cookie-parser");

const authRouter = require("./routers/auth");
const profileRouter = require("./routers/profile");
const userRouter = require("./routers/user");
const { requestRouter } = require("./routers/request");
const cors = require("cors");
const paymentRouter = require("./routers/payment");
const webhookRouter = require("./routers/webhook");
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
)
app.use(
  "/webhook/razorpay",
  express.raw({ type: "application/json" }),
  webhookRouter
);


app.use(express.json())
app.use(cookieParser())


app.use("/", authRouter)
app.use("/", profileRouter)
app.use("/", userRouter)
app.use("/", requestRouter)
app.use("/", paymentRouter)



connectDB().then((connection) => {
  console.log("Database connection is established...");

  app.listen(process.env.PORT, () => {
    console.log("Server start successfully!");
  });
}).catch((err) => {
  console.error("Database cannot be connected!");
  console.error(err);
});

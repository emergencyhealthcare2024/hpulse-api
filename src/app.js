const express = require("express");
const Razorpay = require("razorpay");
const dotenv = require("dotenv");
const cors = require("cors");

// Load environment variables
dotenv.config();

console.log("RAZORPAY_KEY_ID:", process.env.RAZORPAY_KEY_ID);
console.log("RAZORPAY_KEY_SECRET:", process.env.RAZORPAY_KEY_SECRET);

// Initialize Razorpay instance
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

const app = express();
app.use(cors());
app.use(express.json());

// Create a payment order API
app.post("/create-order", async (req, res) => {
  try {
    const { amount, currency, receipt, payment_capture } = req.body;

    // Prepare the order options
    const options = {
      amount: amount * 100, // Amount is in paise (1 INR = 100 paise)
      currency: currency || "INR",
      receipt: receipt || "order_receipt",
      payment_capture: payment_capture || 1, // Auto-capture payment
    };

    // Create the Razorpay order
    const order = await razorpay.orders.create(options);

    // Return the order_id to the frontend for further processing
    res.json({
      success: true,
      order_id: order.id, // The generated order ID
    });
  } catch (error) {
    console.error("Error creating Razorpay order:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Server setup
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

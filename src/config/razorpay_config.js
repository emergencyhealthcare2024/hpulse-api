const Razorpay = require("razorpay");

// Initialize Razorpay instance
const razorpay = new Razorpay({
  key_id: "rzp_live_amIyo5XZmakZUK",
  key_secret: "LcsKwsb7c3CgCOXyiEDx17BZ",
});

module.exports = razorpay;

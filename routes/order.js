const Order = require("../models/order.js");
const { verifyToken, verifyTokenAndAuthorization,
} = require("./verifyToken");

const router = require("express").Router();


router.post("/", async (req, res) => {
    const newOrder = new Order(req.body);
  
    try {
      const savedOrder = await newOrder.save();
      res.status(200).json(savedOrder);
    } catch (err) {
      res.status(500).json(err);
    }
  });

  router.put("/cancel/:id", async (req, res) => {
    try {
      const updatedOrder = await Order.findByIdAndUpdate(
        req.params.id,
        {
          status: "cancelled",
        },
        { new: true }
      );
      res.status(200).json(updatedOrder);
  
    } catch (err) {
      res.status(500).json(err);
    }
  });

  //UPDATE
router.put("/:id",verifyToken, async (req, res) => {
    try {
      const updatedOrder = await Order.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(updatedOrder);
    } catch (err) {
      res.status(500).json(err);
    }
  })

  router.delete("/:id", async (req, res) => {
    try {
      await Order.findByIdAndDelete(req.params.id);
      res.status(200).json("Order has been Canceld by users...");
    } catch (err) {
      res.status(500).json(err);
    }
  });

  router.get("/find/:userId",async (req, res) => {
    try {
      const orders = await Order.find({ userId: req.params.userId }).sort('-createdAt');
      res.status(200).json(orders);
    } catch (err) {
      res.status(500).json(err);
    }
  });

  router.get("/singleOrders/:id", async (req, res) => {
  
    try {
      const orders = await Order.find({ orderID: req.params.id });
      res.status(200).json(orders);
    } catch (err) {
      res.status(500).json(err);
    }
  });

  router.get("/", async (req, res) => {
    try {
      const orders = await Order.find();
      res.status(200).json(orders);
    } catch (err) {
      res.status(500).json(err);
    }
  });
  
  module.exports = router;

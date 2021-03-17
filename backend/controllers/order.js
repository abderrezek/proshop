import asyncHandler from "express-async-handler";

import Order from "../models/order";

// @desc    Create new Order
// @route   Post /
// @access  Private
export const addOrderItems = asyncHandler(async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  res.setHeader("Content-Type", "text/json");

  if (orderItems && orderItems.length === 0) {
    res.status(404);
    return res.json({ message: "No order items." });
  } else {
    const order = new Order({
      orderItems,
      user: req.user._id,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    });

    const createdOrder = await order.save();

    res.status(201).json(createdOrder);
  }
});

// @desc    Get order by id
// @route   Post /:id
// @access  Private
export const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate(
    "user",
    "name email"
  );

  if (order) {
    res.json(order);
  } else {
    res.status(404);
    return res.json({ message: "Order not found." });
  }
});

// @desc    Update order to paid
// @route   Post /:id/pay
// @access  Private
export const updateOrderToPaid = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (order) {
    order.isPaid = true;
    order.paidAt = Date.now();
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      update_time: req.body.update_time,
      email_address: req.body.payer.email_address,
    };

    const updatedOrder = await order.save();

    res.json(updatedOrder);
  } else {
    res.status(404);
    return res.json({ message: "Order not found." });
  }
});

// @desc    Get logged in user orders
// @route   Post /myorders
// @access  Private
export const getMyOrders = asyncHandler(async (req, res) => {
  let q = {
    skip: parseInt(req.query.skip || 0, 0),
    limit: parseInt(req.query.limit || 5, 0),
    id: req.user._id,
  };
  const orders = await Order.list(q);
  const ordersLength = await Order.countDocuments(
    { user: req.user._id },
    (err, count) => count
  );

  res.json({
    orders,
    pages: Math.ceil(ordersLength / q.limit),
  });
});

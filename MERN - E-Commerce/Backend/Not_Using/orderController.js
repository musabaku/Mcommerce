// const Order = require("../models/orderModel");
// const Product = require("../models/productModels");
// const catchAsyncErrors = require("../middleware/catchasynerror");
// const ErrorHandler = require("../utils/errorhandler");
// const orderModel = require("../models/orderModel");

// exports.newOrder = catchAsyncErrors(async (req, res, next) => {
//   const {
//     shippingInfo,
//     orderItems,
//     paymentInfo,
//     itemsPrice,
//     shippingPrice,
//     taxPrice,
//     totalPrice,
//   } = req.body;
//   const order = await Order.create({
//     shippingInfo,
//     orderItems,
//     paymentInfo,
//     itemsPrice,
//     shippingPrice,
//     taxPrice,
//     totalPrice,
//     paidAt: Date.now(),
//     user: req.user._id,
//   });

//   res.status(201).json({
//     success: true,
//     order,
//   });
// });

// exports.getSingleOrder = catchAsyncErrors(async (req, res, next) => {
//   const order = await Order.findById(req.params.id).populate(
//     "user",
//     "name email"
//   );
//   if (!order) {
//     return next(new ErrorHandler("Order not found", 400));
//   }

//   res.status(200).json({
//     success: true,
//     order,
//   });
// });
// exports.myOrders = catchAsyncErrors(async (req, res, next) => {
//   const order = await Order.find({ user: req.user._id });

//   res.status(200).json({
//     success: true,
//     order,
//   });
// });

// exports.getAllOrders = catchAsyncErrors(async (req, res, next) => {
//   const order = await Order.find();

//   let totalAmount = 0;

//   order.orderItems.forEach((order) => {
//     totalAmount += order.totalPrice;
//   });

//   res.status(200).json({
//     success: true,
//     order,
//     totalAmount,
//   });
// });

// exports.updateOrders = catchAsyncErrors(async (req, res, next) => {
//   const order = await Order.findById(req.params.id);


//   if (!order) {
//     return next(new ErrorHandler("Order not found", 400));
//   }
//   if (order.orderStatus === "Delivered") {
//     return next(new ErrorHandler("Order has alerady been delivered", 400));
//   }
//   order.orderItems.forEach(async (product) => {
//     await updateStock(order.product, order.quantity);
//   });

//   await order.save({ validateBeforeSave: false });
//   res.status(200).json({
//     success: true,
//     order,
//   });
// });

// async function updateStock(id, quantity) {
//   const product = await Product.findById(id);
//   product.Stock -= quantity;

//   await product.save({ validateBeforeSave: false });
// }

// exports.deleteOrder = catchAsyncErrors(async (req, res, next) => {
//   const order = await Order.findById(req.params.id);

//   if (!order) {
//     return next(new ErrorHandler("Order not found", 400));
//   }
//   await order.remove()
//   await order.save({ validateBeforeSave: false });

//   res.status(200).json({
//     success: true,
//     message: "Order deleted successfully",
//   });
// });

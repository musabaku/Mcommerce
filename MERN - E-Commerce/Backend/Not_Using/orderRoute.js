// const express = require("express");
// const {
//   newOrder,
//   getSingleOrder,
//   myOrders,
//   getAllOrders,
//   updateOrders,
//   deleteOrder,
// } = require("../controllers/orderController");
// const { isAuthenticatedUser, authorizeRole } = require("../middleware/auth");

// const router = express.Router();

// router.route("/order/new").post(isAuthenticatedUser, newOrder);
// router.route("/order/:id").get(isAuthenticatedUser, getSingleOrder);

// router.route("/order/me").post(isAuthenticatedUser, myOrders);
// router;

// router
//   .route("/admin/order")
//   .post(isAuthenticatedUser, authorizeRole("admin"), getAllOrders);
  
//   router
//   .route("/admin/order/:id")
//   .delete(authorizeRole("admin"), deleteOrder)
//   .put(authorizeRole("admin"), updateOrders);

// module.exports = router;

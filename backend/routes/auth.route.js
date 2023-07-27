const express = require("express");
const router = express.Router();
const { register, login, deleteAccount } = require("../controller/account");
const {
  menu,
  addItem,
  removeItem,
  editItem,
  addCategory,
  removeCategory,
  categoriesFromId,
  getCategories,
} = require("../controller/menu");
const {
  viewOrders,
  createOrder,
  setNewTable,
  getOrdersForTableId,
  viewOrdersByStatus,
  updateOrderItemStatus,
  updateOrderPayStatus,
  deleteTableOrders,
} = require("../controller/order");
const {
  createRequest,
  getRequest,
  updateRequest,
} = require("../controller/request");
const multer = require("multer");
const {
  createBooking,
  viewBooking,
  deleteBooking,
  deleteBookingByAccountId,
  getBooking,
} = require("../controller/booking");
const {
  joinLoyalty,
  getLoyaltyStatus,
  updateLoyalty,
} = require("../controller/loyalty");
const upload = multer({ dest: "uploads/" });

/**
 * @swagger
 * /login:
 *   post:
 *     summary: User login
 *     tags: [Auth]
 *     parameters:
 *       name: body
 *       in: body
 *       schema:
 *          type: object
 *          properties:
 *            email:
 *              example: "any"
 *            password:
 *              example: "any"
 *     responses:
 *       200:
 *         description: Successful login
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: JWT token
 *       401:
 *         description: Invalid credentials
 */

// account endpoints
router.post("/register", register);
router.post("/login", login);
router.delete("/account/delete", deleteAccount);
// menu endpoints
router.get("/menu", menu);
router.put("/menu/edit", upload.single("thumbnail"), editItem);
router.post("/menu/add", upload.single("thumbnail"), addItem);
router.delete("/menu/remove", removeItem);
router.get("/categories", getCategories);
router.get("/categories/:itemid", categoriesFromId);
router.post("/categories/add", addCategory);
router.delete("/categories/remove", removeCategory);
// order endpoints
router.get("/orders", viewOrders);
router.post("/orders/create", createOrder);
router.delete("/orders/delete", deleteTableOrders);
router.post("/tables/create", setNewTable);
router.get("/orders/tables/:tableid", getOrdersForTableId);
router.get("/orders/:status", viewOrdersByStatus);
router.put("/orders/update", updateOrderItemStatus);
router.put("/orders/pay", updateOrderPayStatus);
// booking endpoints
router.post("/bookings/create", createBooking);
router.get("/bookings", viewBooking);
router.get("/bookings/:bookingId", getBooking);
router.delete("/bookings/delete", deleteBooking);
router.delete("/bookings/deleteAccount", deleteBookingByAccountId);
// notifications endpoints
router.post("/request/create", createRequest);
router.get("/request/", getRequest);
router.put("/request/complete", updateRequest);
// loyalty endpoints
router.post("/loyalty/join", joinLoyalty);
router.get("/loyalty/status", getLoyaltyStatus);
router.post("/loyalty/update", updateLoyalty);

module.exports = router;

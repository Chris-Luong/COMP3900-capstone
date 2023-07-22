const express = require("express");
const router = express.Router();
const register = require("../controller/register");
const login = require("../controller/login");
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
  deleteOrder,
  setNewTable,
  getOrdersForTableId,
  viewOrdersByStatus,
  updateOrderItemStatus,
  updateOrderPayStatus
} = require("../controller/order");
const multer = require("multer");
const { createBooking, viewBooking } = require("../controller/booking");
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

router.post("/register", register);
router.post("/login", login);
router.get("/menu", menu);
router.put("/menu/edit", upload.single("thumbnail"), editItem);
router.post("/menu/add", upload.single("thumbnail"), addItem);
router.delete("/menu/remove", removeItem);
router.get("/categories", getCategories);
router.get("/categories/:itemid", categoriesFromId);
router.post("/categories/add", addCategory);
router.delete("/categories/remove", removeCategory);
router.get('/orders', viewOrders);
router.post('/orders/create', createOrder);
router.delete('/orders/delete', deleteOrder);
router.post('/tables/create', setNewTable);
router.get("/orders/tables/:tableid", getOrdersForTableId);
router.get("/orders/:status", viewOrdersByStatus);
router.put("/orders/update", updateOrderItemStatus);
router.put("/orders/pay", updateOrderPayStatus);
router.post("/bookings/create", createBooking);
router.get("/bookings/:date", viewBooking)
module.exports = router;

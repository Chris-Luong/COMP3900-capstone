const express = require('express');
const router = express.Router();
const register = require('../controller/register')
const login = require('../controller/login');
const {menu, addItem, removeItem, editItem} = require('../controller/menu');
const categories = require('../controller/categories');
const { viewOrders, createOrder } = require('../controller/order');

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


router.post('/register', register);
router.post('/login', login);
router.get('/menu', menu);
router.put('/menu/edit', editItem);
router.post('/menu/add', addItem);
router.delete('/menu/remove', removeItem);
router.get('/categories', categories);
 /**
 * @swagger
 * /orderItems/createOrder:
 *   post:
 *     summary: Create A New Order
 *     tags: [Order]
 *     parameters:
 *       name: body
 *       in: body
 *       schema:
 *          type: object
 *          properties:
 *            accountId:
 *              example: "any"
 *            tableId:
 *              example: "any"
 *     responses:
 *       200:
 *         description: Successful Creation
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 orderId:
 *                   type: string
 *                   description: The created order id
 *       400:
 *         description: Failed to Create
 */
router.get('/orders', viewOrders);
router.post('/orders/create', createOrder);

module.exports = router;
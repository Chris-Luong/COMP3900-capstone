const express = require('express');
const router = express.Router();
const register = require('../controller/register')
const login = require('../controller/login');
const {menu, addItem, removeItem, editItem, categoriesFromId} = require('../controller/menu');
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
router.get("/categories/:itemid", categoriesFromId);
router.get('/orders', viewOrders);
router.post('/orders/create', createOrder);
module.exports = router;
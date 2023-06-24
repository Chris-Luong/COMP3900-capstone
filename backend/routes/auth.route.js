const express = require('express');
const loginRoute = express.Router();
const login = require('../controller/login');

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

loginRoute.post('/login', login);
module.exports = loginRoute;
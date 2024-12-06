"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_middleware_1 = require("./../../common/middlewares/auth.middleware");
const task_categories_controller_1 = require("../../modules/company-structure/task-categories/task-categories.controller");
const router = (0, express_1.Router)();
/**
 * @swagger
 * /task-categories:
 *   get:
 *     summary: Get all task categories
 *     tags:
 *       - Task Categories
 *     security:
 *       - bearerAuth: []  # Autenticación requerida
 *     responses:
 *       200:
 *         description: A list of task categories.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     description: The ID of the category.
 *                   name:
 *                     type: string
 *                     description: The name of the task category.
 *                   description:
 *                     type: string
 *                     description: The description of the task category.
 *       401:
 *         description: Unauthorized, invalid or missing token.
 *       500:
 *         description: Server error.
 */
router.get('/', auth_middleware_1.authenticate, task_categories_controller_1.taskCategoriesController.getCategories);
exports.default = router;

import express from "express";
import { generateUsers, generateProducts } from "../utils/mocking.js";
import User from "../models/User.js";
import Product from "../models/Product.js";
import logger from "../utils/logger.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Mocks
 *   description: Endpoints para pruebas con usuarios y productos.
 */

/**
 * Middleware para validar parámetros numéricos
 */
const validateParams = (req, res, next) => {
  const { users, products } = req.params;
  if (isNaN(users) || isNaN(products)) {
    logger.warn("⚠️ Parámetros inválidos en la solicitud");
    return res.status(400).json({ message: "Los parámetros deben ser números." });
  }
  next();
};

/**
 * @swagger
 * /api/mocks:
 *   get:
 *     summary: Obtener todos los usuarios y productos
 *     tags: [Mocks]
 *     responses:
 *       200:
 *         description: Lista de usuarios y productos.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 users:
 *                   type: array
 *                   items:
 *                     type: object
 *                 products:
 *                   type: array
 *                   items:
 *                     type: object
 */
router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    const products = await Product.find();

    logger.info(`📌 Se obtuvieron ${users.length} usuarios y ${products.length} productos.`);
    res.json({ users, products });
  } catch (error) {
    logger.error(`❌ Error al obtener los datos: ${error.message}`);
    res.status(500).json({ message: "Error al obtener los datos", error: error.message });
  }
});

/**
 * @swagger
 * /api/mocks/{users}/{products}:
 *   get:
 *     summary: Obtener un número específico de usuarios y productos
 *     tags: [Mocks]
 *     parameters:
 *       - in: path
 *         name: users
 *         required: true
 *         description: El número de usuarios a obtener.
 *         schema:
 *           type: integer
 *           example: 5
 *       - in: path
 *         name: products
 *         required: true
 *         description: El número de productos a obtener.
 *         schema:
 *           type: integer
 *           example: 5
 *     responses:
 *       200:
 *         description: Usuarios y productos obtenidos exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 users:
 *                   type: array
 *                   items:
 *                     type: object
 *                 products:
 *                   type: array
 *                   items:
 *                     type: object
 */
router.get("/:users/:products", validateParams, async (req, res) => {
  try {
    const numUsers = parseInt(req.params.users);
    const numProducts = parseInt(req.params.products);

    const users = await User.find().limit(numUsers);
    const products = await Product.find().limit(numProducts);

    logger.info(`✅ Se encontraron ${users.length} usuarios y ${products.length} productos.`);
    res.json({ users, products });
  } catch (error) {
    logger.error(`❌ Error al obtener los datos: ${error.message}`);
    res.status(500).json({ message: "Error al obtener los datos", error: error.message });
  }
});

/**
 * @swagger
 * /api/mocks/{users}/{products}:
 *   post:
 *     summary: Generar usuarios y productos
 *     tags: [Mocks]
 *     parameters:
 *       - in: path
 *         name: users
 *         required: true
 *         description: El número de usuarios a generar.
 *         schema:
 *           type: integer
 *           example: 5
 *       - in: path
 *         name: products
 *         required: true
 *         description: El número de productos a generar.
 *         schema:
 *           type: integer
 *           example: 10
 *     responses:
 *       200:
 *         description: Usuarios y productos generados exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Datos generados exitosamente"
 *                 users:
 *                   type: array
 *                   items:
 *                     type: object
 *                 products:
 *                   type: array
 *                   items:
 *                     type: object
 */
router.post("/:users/:products", validateParams, async (req, res) => {
  try {
    const numUsers = parseInt(req.params.users);
    const numProducts = parseInt(req.params.products);

    const users = await generateUsers(numUsers);
    const products = await generateProducts(numProducts);

    logger.info(`✅ Generación completada: ${users.length} usuarios y ${products.length} productos.`);
    res.json({ message: "Datos generados exitosamente", users, products });
  } catch (error) {
    logger.error(`❌ Error al generar los datos: ${error.message}`);
    res.status(500).json({ message: "Error al generar datos", error: error.message });
  }
});

/**
 * @swagger
 * /api/mocks:
 *   delete:
 *     summary: Eliminar todos los usuarios y productos
 *     tags: [Mocks]
 *     responses:
 *       200:
 *         description: Usuarios y productos eliminados correctamente.
 */
router.delete("/", async (req, res) => {
  try {
    await User.deleteMany();
    await Product.deleteMany();

    logger.info("🗑️ Todos los usuarios y productos eliminados.");
    res.json({ message: "Usuarios y productos eliminados correctamente" });
  } catch (error) {
    logger.error(`❌ Error al eliminar: ${error.message}`);
    res.status(500).json({ message: "Error al eliminar", error: error.message });
  }
});

export default router;

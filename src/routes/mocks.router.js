import express from 'express';
import { generateUsers, generateProducts } from '../utils/mocking.js';
import User from '../models/User.js';
import Product from '../models/Product.js';
import logger from '../utils/logger.js';  

const router = express.Router();

router.post('/:users/:products', async (req, res) => {
    try {
        const numUsers = parseInt(req.params.users);
        const numProducts = parseInt(req.params.products);

        if (isNaN(numUsers) || isNaN(numProducts)) {
            return res.status(400).json({ message: "Los parámetros deben ser números." });
        }

        logger.info(`Generando ${numUsers} usuarios y ${numProducts} productos...`);

        const users = await generateUsers(numUsers);
        const products = await generateProducts(numProducts);

        logger.info(`Datos generados: ${users.length} usuarios y ${products.length} productos`);

        res.json({ message: "Datos generados exitosamente", users, products });
    } catch (error) {
        logger.error(`Error al generar los datos: ${error.message}`);
        res.status(500).json({ message: "Error al generar datos", error: error.message });
    }
});

router.get('/', async (req, res) => {
    try {
        const users = await User.find();      
        const products = await Product.find(); 

        logger.info('Datos obtenidos correctamente desde la base de datos.');

        res.json({ users, products });
    } catch (error) {
        logger.error(`Error al obtener los datos: ${error.message}`);
        res.status(500).json({ message: "Error al obtener los datos", error: error.message });
    }
});

export default router;

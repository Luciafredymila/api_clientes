// productos.js
const express = require('express');
const router = express.Router();
const Producto = require('../models/producto');

// Ruta para crear un producto
router.post('/productos', async (req, res) => {
    try {
        const { tipo, marca, id, cantidad } = req.body;
        const producto = new Producto({ tipo, marca, id, cantidad });
        await producto.save();
        res.status(201).json(producto);
      } catch (error) {
        res.status(500).json({ error: 'No se pudo crear el producto' });
      }
    });

module.exports = router;
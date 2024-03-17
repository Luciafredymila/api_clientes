// ventas.js
const express = require('express');
const router = express.Router();
const Venta = require('../models/venta');

// Ruta para crear una venta
router.post('/ventas', async (req, res) => {
    try {
        const { fecha, tipo, marca, cantidad, total } = req.body;
        const venta = new Venta({ fecha, tipo, marca, cantidad, total });
        await venta.save();
        res.status(201).json(venta);
      } catch (error) {
        res.status(500).json({ error: 'No se pudo crear la venta' });
      }
    });

module.exports = router;
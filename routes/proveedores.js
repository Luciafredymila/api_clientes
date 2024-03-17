// proveedores.js
const express = require('express');
const router = express.Router();
const Proveedor = require('../models/proveedor');

// Ruta para crear un proveedor
router.post('/proveedores', async (req, res) => {
    try {
      const { nombre, apellido, email, telefono } = req.body;
      const proveedor = new Proveedor({ nombre, apellido, email, telefono });
      await proveedor.save();
      res.status(201).json(proveedor);
    } catch (error) {
      res.status(500).json({ error: 'No se pudo crear el proveedor' });
    }
  });

module.exports = router;
// clientes.js
const express = require('express');
const router = express.Router();
const Cliente = require('../models/cliente');

// Ruta para crear un cliente
router.post('/clientes', async (req, res) => {
    try {
      const { nombre, apellido, email, telefono } = req.body;
      const cliente = new Cliente({ nombre, apellido, email, telefono });
      await cliente.save();
      res.status(201).json(cliente);
    } catch (error) {
      res.status(500).json({ error: 'No se pudo crear el cliente' });
    }
  });

module.exports = router;
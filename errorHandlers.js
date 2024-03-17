const errorHandler = require('./errorHandlers');

// errorHandlers.js

// Manejador de errores para clientes
const clienteErrorHandler = (err, req, res, next) => {
    console.error('Error en ruta de clientes:', err);
    res.status(500).json({ error: 'Error en ruta de clientes' });
  };
  
  // Manejador de errores para productos
  const productoErrorHandler = (err, req, res, next) => {
    console.error('Error en ruta de productos:', err);
    res.status(500).json({ error: 'Error en ruta de productos' });
  };
  
  // Manejador de errores para proveedores
  const proveedorErrorHandler = (err, req, res, next) => {
    console.error('Error en ruta de proveedores:', err);
    res.status(500).json({ error: 'Error en ruta de proveedores' });
  };
  
  // Exportar el middleware de manejo de errores centralizado
  module.exports = (err, req, res, next) => {
    // Lógica para determinar qué middleware de manejo de errores usar según el tipo de ruta
    if (err.cliente) {
      clienteErrorHandler(err, req, res, next);
    } else if (err.producto) {
      productoErrorHandler(err, req, res, next);
    } else if (err.proveedor) {
      proveedorErrorHandler(err, req, res, next);
    } else {
      console.error('Error desconocido:', err);
      res.status(500).json({ error: 'Error desconocido' });
    }
  };
  
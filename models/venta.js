const mongoose = require('mongoose');

const ventaSchema = new mongoose.Schema({
  cliente: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Cliente'
  },
  productos: [{
    producto: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Producto'
    },
    cantidad: {
      type: Number,
      required: true
    }
  }],
  total: {
    type: Number,
    required: true
  },
  // Otros campos específicos de ventas
});

module.exports = mongoose.model('Venta', ventaSchema);

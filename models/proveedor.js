const mongoose = require('mongoose');

const proveedorSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true
  },
  direccion: String,
  telefono: String
  // Otros campos específicos de proveedores
});

module.exports = mongoose.model('Proveedor', proveedorSchema);

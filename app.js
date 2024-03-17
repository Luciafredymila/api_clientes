// app.js
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const clientesRoutes = require('./routes/clientes');
const proveedoresRoutes = require('./routes/proveedores');
const productosRoutes = require('./routes/productos');
const ventasRoutes = require('./routes/ventas');
const errorHandler = require('./errorHandlers');
const { auth } = require("express-oauth2-jwt-bearer");

const app = express();
const PORT = process.env.PORT || 3000;

// Configuracion Middleware con el Servidor de Autorización
const autenticacion = auth({
    audience: "http://localhost:3000/api/productos",
    issuerBaseURL: "https://dev-utn-frc-iaew.auth0.com/",
    tokenSigningAlg: "RS256",
    });    

// Middleware
app.use(bodyParser.json());

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/api_clientes', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Conexión exitosa a MongoDB'))
  .catch(err => console.error('Error de conexión a MongoDB:', err));

// Importar los modelos
const Cliente = require('./models/cliente');
const Proveedor = require('./models/proveedor');
const Producto = require('./models/producto');
const Venta = require('./models/venta');

// Rutas
app.use('/clientes', clientesRoutes);
app.use('/proveedores', proveedoresRoutes);
app.use('/productos', productosRoutes);
app.use('/ventas', ventasRoutes);

// Usar el middleware de manejo de errores centralizado
app.use(errorHandler);

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor iniciado en el puerto ${PORT}`);
});

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
const jwt = require('express-jwt');
const jwksRsa = require('jwks-rsa');

// Definir el esquema de seguridad
const securityOptions = {
  algorithms: ['RS256'], // Algoritmo de firma del token
  audience: 'http://localhost:3000/api/productos', // Audiencia del token (normalmente la URL de tu API)
  issuer: 'https://dev-utn-frc-iaew.auth0.com/', // Emisor del token
};

// Validar el token JWT utilizando express-jwt y jwks-rsa
app.use(jwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: 'https://dev-utn-frc-iaew.auth0.com/.well-known/jwks.json'
  }),
  ...securityOptions
}).unless({ path: ['/public', '/login'] })); // Especifica rutas que no requieren un token de autorización

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

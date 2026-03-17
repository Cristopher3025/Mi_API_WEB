const express = require('express');
const cors    = require('cors');

const usuarioRoutes  = require('./routes/usuario.routes');
const productoRoutes = require('./routes/producto.routes');
const clienteRoutes  = require('./routes/cliente.routes');
const proveedorRoutes = require('./routes/proveedor.routes');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/api', (req, res) => {
  res.json({ mensaje: 'API funcionando correctamente' });
});

app.use('/api/usuarios',   usuarioRoutes);
app.use('/api/productos',  productoRoutes);
app.use('/api/clientes',   clienteRoutes);
app.use('/api/proveedores', proveedorRoutes);

module.exports = app;
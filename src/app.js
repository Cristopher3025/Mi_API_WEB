const express = require('express');  
const cors = require('cors');  
  
const usuarioRoutes = require('./routes/usuario.routes');  
const productoRoutes = require('./routes/producto.routes');  
  
const app = express();  
  
app.use(cors());  
app.use(express.json());  
  
app.get('/api', (req, res) => {  
  res.json({ mensaje: 'API funcionando correctamente' });  
});  
  
app.use('/api/usuarios', usuarioRoutes);  
app.use('/api/productos', productoRoutes);  
  
module.exports = app;
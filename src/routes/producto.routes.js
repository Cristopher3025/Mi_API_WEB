const express = require('express');  
const router = express.Router();  
const productoController = require('../controllers/producto.controller');  
  
router.get('/', productoController.listarProductos);  
router.get('/:id', productoController.obtenerProducto);  
router.post('/', productoController.crearProducto);  
  
module.exports = router;
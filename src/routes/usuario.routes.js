const express = require('express');  
const router = express.Router();  
const usuarioController = require('../controllers/usuario.controller');  
  
router.get('/', usuarioController.listarUsuarios);  
router.get('/:id', usuarioController.obtenerUsuario);  
router.post('/', usuarioController.crearUsuario);  
  
module.exports = router;
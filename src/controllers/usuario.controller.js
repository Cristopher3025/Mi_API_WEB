const usuarioService = require('../services/usuario.service');  
  
function listarUsuarios(req, res) {  
  const usuarios = usuarioService.obtenerTodos();  
  res.json(usuarios);  
}  
  
function obtenerUsuario(req, res) {  
  const id = parseInt(req.params.id);  
  const usuario = usuarioService.obtenerPorId(id);  
  
  if (!usuario) {  
    return res.status(404).json({ error: 'Usuario no encontrado' });  
  }  
  
  res.json(usuario);  
}  
  
function crearUsuario(req, res) {  
  const { nombre, correo } = req.body;  
  
  if (!nombre || !correo) {  
    return res.status(400).json({  
      error: 'Los campos nombre y correo son obligatorios'  
    });  
  }  
  
  const nuevoUsuario = usuarioService.crear({ nombre, correo });  
  res.status(201).json(nuevoUsuario);  
}  
  
module.exports = {  
  listarUsuarios,  
  obtenerUsuario,  
  crearUsuario  
};
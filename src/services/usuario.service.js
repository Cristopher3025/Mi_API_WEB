const usuarios = require('../data/usuarios');  
  
function obtenerTodos() {  
  return usuarios;  
}  
  
function obtenerPorId(id) {  
  return usuarios.find(usuario => usuario.id === id);  
}  
  
function crear(usuarioNuevo) {  
  const nuevoUsuario = {  
    id: usuarios.length + 1,  
    ...usuarioNuevo  
  };  
  
  usuarios.push(nuevoUsuario);  
  return nuevoUsuario;  
}  
  
module.exports = {  
  obtenerTodos,  
  obtenerPorId,  
  crear  
};

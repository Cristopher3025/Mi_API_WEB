const productos = require('../data/productos');  
  
function obtenerTodos() {  
  return productos;  
}  
  
function obtenerPorId(id) {  
  return productos.find(producto => producto.id === id);  
}  
  
function crear(productoNuevo) {  
  const nuevoProducto = {  
    id: productos.length + 1,  
    ...productoNuevo  
  };  
  
  productos.push(nuevoProducto);  
  return nuevoProducto;  
}  
  
module.exports = {  
  obtenerTodos,  
  obtenerPorId,  
  crear  
};
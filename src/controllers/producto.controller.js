const productoService = require('../services/producto.service');  
  
function listarProductos(req, res) {  
  const productos = productoService.obtenerTodos();  
  res.json(productos);  
}  
  
function obtenerProducto(req, res) {  
  const id = parseInt(req.params.id);  
  const producto = productoService.obtenerPorId(id);  
  
  if (!producto) {  
    return res.status(404).json({ error: 'Producto no encontrado' });  
  }  
  
  res.json(producto);  
}  
  
function crearProducto(req, res) {  
  const { nombre, precio } = req.body;  
  
  if (!nombre || precio === undefined) {  
    return res.status(400).json({  
      error: 'Los campos nombre y precio son obligatorios'  
    });  
  }  
  
  const nuevoProducto = productoService.crear({ nombre, precio });  
  res.status(201).json(nuevoProducto);  
}  
  
module.exports = {  
  listarProductos,  
  obtenerProducto,  
  crearProducto  
};

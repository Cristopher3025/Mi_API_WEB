const productoService = require('../services/producto.service');

async function listarProductos(req, res) {
  try {
    const productos = await productoService.obtenerTodos();
    res.json(productos);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener productos' });
  }
}

async function obtenerProducto(req, res) {
  try {
    const id = parseInt(req.params.id);
    const producto = await productoService.obtenerPorId(id);
    if (!producto) return res.status(404).json({ error: 'Producto no encontrado' });
    res.json(producto);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener el producto' });
  }
}

async function crearProducto(req, res) {
  try {
    const { nombre, descripcion, precio, stock, id_proveedor } = req.body;
    if (!nombre || precio === undefined) {
      return res.status(400).json({ error: 'Los campos nombre y precio son obligatorios' });
    }
    const nuevoProducto = await productoService.crear({ nombre, descripcion, precio, stock, id_proveedor });
    res.status(201).json(nuevoProducto);
  } catch (err) {
    res.status(500).json({ error: 'Error al crear el producto' });
  }
}

async function actualizarProducto(req, res) {
  try {
    const id = parseInt(req.params.id);
    const { nombre, descripcion, precio, stock, id_proveedor } = req.body;
    if (!nombre || precio === undefined) {
      return res.status(400).json({ error: 'Los campos nombre y precio son obligatorios' });
    }
    const producto = await productoService.actualizar(id, { nombre, descripcion, precio, stock, id_proveedor });
    if (!producto) return res.status(404).json({ error: 'Producto no encontrado' });
    res.json(producto);
  } catch (err) {
    res.status(500).json({ error: 'Error al actualizar el producto' });
  }
}

async function eliminarProducto(req, res) {
  try {
    const id = parseInt(req.params.id);
    const eliminado = await productoService.eliminar(id);
    if (!eliminado) return res.status(404).json({ error: 'Producto no encontrado' });
    res.json({ mensaje: 'Producto eliminado correctamente' });
  } catch (err) {
    res.status(500).json({ error: 'Error al eliminar el producto' });
  }
}

module.exports = { listarProductos, obtenerProducto, crearProducto, actualizarProducto, eliminarProducto };

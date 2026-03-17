const proveedorService = require('../services/proveedor.service');

async function listarProveedores(req, res) {
  try {
    const proveedores = await proveedorService.obtenerTodos();
    res.json(proveedores);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener proveedores' });
  }
}

async function obtenerProveedor(req, res) {
  try {
    const id = parseInt(req.params.id);
    const proveedor = await proveedorService.obtenerPorId(id);
    if (!proveedor) return res.status(404).json({ error: 'Proveedor no encontrado' });
    res.json(proveedor);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener el proveedor' });
  }
}

async function crearProveedor(req, res) {
  try {
    const { nombre, contacto, correo, telefono, direccion } = req.body;
    if (!nombre) {
      return res.status(400).json({ error: 'El campo nombre es obligatorio' });
    }
    const nuevoProveedor = await proveedorService.crear({ nombre, contacto, correo, telefono, direccion });
    res.status(201).json(nuevoProveedor);
  } catch (err) {
    res.status(500).json({ error: 'Error al crear el proveedor' });
  }
}

async function actualizarProveedor(req, res) {
  try {
    const id = parseInt(req.params.id);
    const { nombre, contacto, correo, telefono, direccion } = req.body;
    if (!nombre) {
      return res.status(400).json({ error: 'El campo nombre es obligatorio' });
    }
    const proveedor = await proveedorService.actualizar(id, { nombre, contacto, correo, telefono, direccion });
    if (!proveedor) return res.status(404).json({ error: 'Proveedor no encontrado' });
    res.json(proveedor);
  } catch (err) {
    res.status(500).json({ error: 'Error al actualizar el proveedor' });
  }
}

async function eliminarProveedor(req, res) {
  try {
    const id = parseInt(req.params.id);
    const eliminado = await proveedorService.eliminar(id);
    if (!eliminado) return res.status(404).json({ error: 'Proveedor no encontrado' });
    res.json({ mensaje: 'Proveedor eliminado correctamente' });
  } catch (err) {
    res.status(500).json({ error: 'Error al eliminar el proveedor' });
  }
}

module.exports = { listarProveedores, obtenerProveedor, crearProveedor, actualizarProveedor, eliminarProveedor };

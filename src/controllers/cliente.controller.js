const clienteService = require('../services/cliente.service');

async function listarClientes(req, res) {
  try {
    const clientes = await clienteService.obtenerTodos();
    res.json(clientes);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener clientes' });
  }
}

async function obtenerCliente(req, res) {
  try {
    const id = parseInt(req.params.id);
    const cliente = await clienteService.obtenerPorId(id);
    if (!cliente) return res.status(404).json({ error: 'Cliente no encontrado' });
    res.json(cliente);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener el cliente' });
  }
}

async function crearCliente(req, res) {
  try {
    const { nombre, apellido, correo, telefono, direccion } = req.body;
    if (!nombre || !apellido) {
      return res.status(400).json({ error: 'Los campos nombre y apellido son obligatorios' });
    }
    const nuevoCliente = await clienteService.crear({ nombre, apellido, correo, telefono, direccion });
    res.status(201).json(nuevoCliente);
  } catch (err) {
    res.status(500).json({ error: 'Error al crear el cliente' });
  }
}

async function actualizarCliente(req, res) {
  try {
    const id = parseInt(req.params.id);
    const { nombre, apellido, correo, telefono, direccion } = req.body;
    if (!nombre || !apellido) {
      return res.status(400).json({ error: 'Los campos nombre y apellido son obligatorios' });
    }
    const cliente = await clienteService.actualizar(id, { nombre, apellido, correo, telefono, direccion });
    if (!cliente) return res.status(404).json({ error: 'Cliente no encontrado' });
    res.json(cliente);
  } catch (err) {
    res.status(500).json({ error: 'Error al actualizar el cliente' });
  }
}

async function eliminarCliente(req, res) {
  try {
    const id = parseInt(req.params.id);
    const eliminado = await clienteService.eliminar(id);
    if (!eliminado) return res.status(404).json({ error: 'Cliente no encontrado' });
    res.json({ mensaje: 'Cliente eliminado correctamente' });
  } catch (err) {
    res.status(500).json({ error: 'Error al eliminar el cliente' });
  }
}

module.exports = { listarClientes, obtenerCliente, crearCliente, actualizarCliente, eliminarCliente };

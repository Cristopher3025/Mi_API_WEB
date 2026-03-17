const usuarioService = require('../services/usuario.service');

async function listarUsuarios(req, res) {
  try {
    const usuarios = await usuarioService.obtenerTodos();
    res.json(usuarios);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener usuarios' });
  }
}

async function obtenerUsuario(req, res) {
  try {
    const id = parseInt(req.params.id);
    const usuario = await usuarioService.obtenerPorId(id);
    if (!usuario) return res.status(404).json({ error: 'Usuario no encontrado' });
    res.json(usuario);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener el usuario' });
  }
}

async function crearUsuario(req, res) {
  try {
    const { nombre, correo, password, rol } = req.body;
    if (!nombre || !correo || !password) {
      return res.status(400).json({ error: 'Los campos nombre, correo y password son obligatorios' });
    }
    const nuevoUsuario = await usuarioService.crear({ nombre, correo, password, rol });
    res.status(201).json(nuevoUsuario);
  } catch (err) {
    res.status(500).json({ error: 'Error al crear el usuario' });
  }
}

async function actualizarUsuario(req, res) {
  try {
    const id = parseInt(req.params.id);
    const { nombre, correo, rol } = req.body;
    if (!nombre || !correo) {
      return res.status(400).json({ error: 'Los campos nombre y correo son obligatorios' });
    }
    const usuario = await usuarioService.actualizar(id, { nombre, correo, rol });
    if (!usuario) return res.status(404).json({ error: 'Usuario no encontrado' });
    res.json(usuario);
  } catch (err) {
    res.status(500).json({ error: 'Error al actualizar el usuario' });
  }
}

async function eliminarUsuario(req, res) {
  try {
    const id = parseInt(req.params.id);
    const eliminado = await usuarioService.eliminar(id);
    if (!eliminado) return res.status(404).json({ error: 'Usuario no encontrado' });
    res.json({ mensaje: 'Usuario eliminado correctamente' });
  } catch (err) {
    res.status(500).json({ error: 'Error al eliminar el usuario' });
  }
}

module.exports = { listarUsuarios, obtenerUsuario, crearUsuario, actualizarUsuario, eliminarUsuario };
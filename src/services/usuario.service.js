const pool = require('../db/connection');

async function obtenerTodos() {
  const [rows] = await pool.query(
    'SELECT id, nombre, correo, rol, activo, creado_en FROM usuarios WHERE activo = 1'
  );
  return rows;
}

async function obtenerPorId(id) {
  const [rows] = await pool.query(
    'SELECT id, nombre, correo, rol, activo, creado_en FROM usuarios WHERE id = ?',
    [id]
  );
  return rows[0] || null;
}

async function crear(datos) {
  const { nombre, correo, activo = 1, rol = 'user', creado_en = new Date(), actualizado_en = new Date() } = datos;
  const [result] = await pool.query(
    'INSERT INTO usuarios (nombre, correo, activo, rol, creado_en, actualizado_en) VALUES (?, ?, ?, ?, ?, ?)',
    [nombre, correo, activo, rol, creado_en, actualizado_en]
  );
  return obtenerPorId(result.insertId);
}

async function actualizar(id, datos) {
  const { nombre, correo, rol } = datos;
  const [result] = await pool.query(
    'UPDATE usuarios SET nombre = ?, correo = ?, rol = ? WHERE id = ? AND activo = 1',
    [nombre, correo, rol, id]
  );
  if (result.affectedRows === 0) return null;
  return obtenerPorId(id);
}

async function eliminar(id) {
  const [result] = await pool.query(
    'UPDATE usuarios SET activo = 0 WHERE id = ? AND activo = 1',
    [id]
  );
  return result.affectedRows > 0;
}

module.exports = { obtenerTodos, obtenerPorId, crear, actualizar, eliminar };

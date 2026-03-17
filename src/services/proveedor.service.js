const pool = require('../db/connection');

async function obtenerTodos() {
  const [rows] = await pool.query(
    'SELECT id, nombre, contacto, correo, telefono, direccion, activo, creado_en FROM proveedores WHERE activo = 1'
  );
  return rows;
}

async function obtenerPorId(id) {
  const [rows] = await pool.query(
    'SELECT id, nombre, contacto, correo, telefono, direccion, activo, creado_en FROM proveedores WHERE id = ?',
    [id]
  );
  return rows[0] || null;
}

async function crear(datos) {
  const { nombre, contacto = null, correo = null, telefono = null, direccion = null } = datos;
  const [result] = await pool.query(
    'INSERT INTO proveedores (nombre, contacto, correo, telefono, direccion) VALUES (?, ?, ?, ?, ?)',
    [nombre, contacto, correo, telefono, direccion]
  );
  return obtenerPorId(result.insertId);
}

async function actualizar(id, datos) {
  const { nombre, contacto, correo, telefono, direccion } = datos;
  const [result] = await pool.query(
    'UPDATE proveedores SET nombre = ?, contacto = ?, correo = ?, telefono = ?, direccion = ? WHERE id = ? AND activo = 1',
    [nombre, contacto ?? null, correo ?? null, telefono ?? null, direccion ?? null, id]
  );
  if (result.affectedRows === 0) return null;
  return obtenerPorId(id);
}

async function eliminar(id) {
  const [result] = await pool.query(
    'UPDATE proveedores SET activo = 0 WHERE id = ? AND activo = 1',
    [id]
  );
  return result.affectedRows > 0;
}

module.exports = { obtenerTodos, obtenerPorId, crear, actualizar, eliminar };

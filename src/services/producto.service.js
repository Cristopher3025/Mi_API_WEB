const pool = require('../db/connection');

const SELECT_BASE =
  `SELECT p.id, p.nombre, p.descripcion, p.precio, p.stock,
          p.id_proveedor, pr.nombre AS proveedor,
          p.activo, p.creado_en
   FROM   productos p
   LEFT JOIN proveedores pr ON pr.id = p.id_proveedor`;

async function obtenerTodos() {
  const [rows] = await pool.query(`${SELECT_BASE} WHERE p.activo = 1`);
  return rows;
}

async function obtenerPorId(id) {
  const [rows] = await pool.query(`${SELECT_BASE} WHERE p.id = ?`, [id]);
  return rows[0] || null;
}

async function crear(datos) {
  const { nombre, descripcion = null, precio, stock = 0, id_proveedor = null } = datos;
  const [result] = await pool.query(
    'INSERT INTO productos (nombre, descripcion, precio, stock, id_proveedor) VALUES (?, ?, ?, ?, ?)',
    [nombre, descripcion, precio, stock, id_proveedor]
  );
  return obtenerPorId(result.insertId);
}

async function actualizar(id, datos) {
  const { nombre, descripcion, precio, stock, id_proveedor } = datos;
  const [result] = await pool.query(
    'UPDATE productos SET nombre = ?, descripcion = ?, precio = ?, stock = ?, id_proveedor = ? WHERE id = ? AND activo = 1',
    [nombre, descripcion ?? null, precio, stock, id_proveedor ?? null, id]
  );
  if (result.affectedRows === 0) return null;
  return obtenerPorId(id);
}

async function eliminar(id) {
  const [result] = await pool.query(
    'UPDATE productos SET activo = 0 WHERE id = ? AND activo = 1',
    [id]
  );
  return result.affectedRows > 0;
}

module.exports = { obtenerTodos, obtenerPorId, crear, actualizar, eliminar };
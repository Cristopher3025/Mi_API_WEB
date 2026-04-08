import { API_BASE_URL } from './config';

export async function getProveedores() {
  const res = await fetch(`${API_BASE_URL}/proveedores`);
  if (!res.ok) throw new Error('Error al obtener proveedores');
  return res.json();
}

export async function createProveedor(data) {
  const res = await fetch(`${API_BASE_URL}/proveedores`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Error al crear proveedor');
  return res.json();
}

export async function updateProveedor(id, data) {
  const res = await fetch(`${API_BASE_URL}/proveedores/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Error al actualizar proveedor');
  return res.json();
}

export async function deleteProveedor(id) {
  const res = await fetch(`${API_BASE_URL}/proveedores/${id}`, {
    method: 'DELETE',
  });
  if (!res.ok) throw new Error('Error al eliminar proveedor');
  return res.json();
}
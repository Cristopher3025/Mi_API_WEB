import { API_BASE_URL } from './config';

export async function getClientes() {
  const res = await fetch(`${API_BASE_URL}/clientes`);
  if (!res.ok) throw new Error('Error al obtener clientes');
  return res.json();
}

export async function createCliente(data) {
  const res = await fetch(`${API_BASE_URL}/clientes`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Error al crear cliente');
  return res.json();
}

export async function updateCliente(id, data) {
  const res = await fetch(`${API_BASE_URL}/clientes/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Error al actualizar cliente');
  return res.json();
}

export async function deleteCliente(id) {
  const res = await fetch(`${API_BASE_URL}/clientes/${id}`, {
    method: 'DELETE',
  });
  if (!res.ok) throw new Error('Error al eliminar cliente');
  return res.json();
}
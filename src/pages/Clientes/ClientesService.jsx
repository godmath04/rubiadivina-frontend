const API_URL = import.meta.env.VITE_API_URL;

export async function getClientes() {
  const res = await fetch(`${API_URL}/ClientesBD`);
  if (!res.ok) throw new Error('Error al obtener clientes');
  return res.json();
}

export async function createCliente(cliente) {
  const res = await fetch(`${API_URL}/ClientesBD`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(cliente),
  });
  if (!res.ok) throw new Error('Error al crear cliente');
  return res.json();
}

export async function updateCliente(id, cliente) {
  const res = await fetch(`${API_URL}/ClientesBD/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(cliente),
  });

  if (!res.ok) throw new Error('Error al actualizar cliente');

  // ✅ Solo parsea JSON si hay contenido
  const contentType = res.headers.get('content-type');
  if (contentType && contentType.includes('application/json')) {
    return res.json();
  }

  return null; // No hay contenido, pero fue exitoso
}

export async function deleteCliente(id) {
  const res = await fetch(`${API_URL}/ClientesBD/${id}`, { method: 'DELETE' });
  if (!res.ok) throw new Error('Error al eliminar cliente');
}

export async function findClienteByEmail(email) {
  const res = await fetch(`${API_URL}/ClientesBD/buscar-email/${encodeURIComponent(email)}`);
  if (!res.ok) return null;
  return res.json();
}

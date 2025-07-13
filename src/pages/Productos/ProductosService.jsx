const API_URL = import.meta.env.VITE_API_URL;

export async function getProductos() {
  const res = await fetch(`${API_URL}/ProductosBD`);
  if (!res.ok) throw new Error('Error al obtener productos');
  return res.json();
}

export async function createProducto(producto) {
  const res = await fetch(`${API_URL}/ProductosBD`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(producto),
  });
  if (!res.ok) throw new Error('Error al crear producto');
  return res.json();
}

export async function updateProducto(id, producto) {
  const res = await fetch(`${API_URL}/ProductosBD/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(producto),
  });
  if (!res.ok) throw new Error('Error al actualizar producto');
  return null;
}

export async function deleteProducto(id) {
  const res = await fetch(`${API_URL}/ProductosBD/${id}`, { method: 'DELETE' });
  if (!res.ok) throw new Error('Error al eliminar producto');
}

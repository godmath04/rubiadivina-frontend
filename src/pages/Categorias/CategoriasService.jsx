const API_URL = import.meta.env.VITE_API_URL;

export async function getCategorias() {
  const res = await fetch(`${API_URL}/CategoriasBD`);
  if (!res.ok) throw new Error('Error al obtener categorías');
  return res.json();
}

export async function createCategoria(categoria) {
  const res = await fetch(`${API_URL}/CategoriasBD`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(categoria),
  });
  if (!res.ok) throw new Error('Error al crear categoría');

  const contentType = res.headers.get('content-type');
  if (contentType && contentType.includes('application/json')) {
    return res.json();
  }

  return null;
}

export async function updateCategoria(id, categoria) {
  const res = await fetch(`${API_URL}/CategoriasBD/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(categoria),
  });

  if (!res.ok) throw new Error('Error al actualizar categoría');

  const contentType = res.headers.get('content-type');
  if (contentType && contentType.includes('application/json')) {
    return res.json();
  }

  return null;
}

export async function deleteCategoria(id) {
  const res = await fetch(`${API_URL}/CategoriasBD/${id}`, {
    method: 'DELETE',
  });

  if (!res.ok) throw new Error('Error al eliminar categoría');
}




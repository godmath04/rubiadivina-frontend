const API_URL = import.meta.env.VITE_API_URL;

export async function getFacturas() {
  const res = await fetch(`${API_URL}/FacturaBD`);
  if (!res.ok) throw new Error('Error al obtener facturas');
  return res.json();
}

export async function createFactura(factura) {
  const res = await fetch(`${API_URL}/FacturaBD`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(factura),
  });
  if (!res.ok) throw new Error('Error al crear factura');
  return res.json();
}

export async function updateFactura(id, factura) {
  const res = await fetch(`${API_URL}/FacturaBD/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(factura),
  });
  if (!res.ok) throw new Error('Error al actualizar factura');
  const contentType = res.headers.get('content-type');
  if (contentType && contentType.includes('application/json')) return res.json();
  return null;
}

export async function deleteFactura(id) {
  const res = await fetch(`${API_URL}/FacturaBD/${id}`, { method: 'DELETE' });
  if (!res.ok) throw new Error('Error al eliminar factura');
}

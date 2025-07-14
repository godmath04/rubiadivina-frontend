const API_URL = import.meta.env.VITE_API_URL;

export async function getPedidos() {
  const res = await fetch(`${API_URL}/PedidoBD`);
  if (!res.ok) throw new Error('Error al obtener pedidos');
  return res.json();
}

export async function createPedido(pedido) {
  const res = await fetch(`${API_URL}/PedidoBD`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(pedido),
  });
  if (!res.ok) throw new Error('Error al crear pedido');
  return res.json();
}

export async function updatePedido(id, pedido) {
  const res = await fetch(`${API_URL}/PedidoBD/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(pedido),
  });
  if (!res.ok) throw new Error('Error al actualizar pedido');
  return null;
}

export async function deletePedido(id) {
  const res = await fetch(`${API_URL}/PedidoBD/${id}`, { method: 'DELETE' });
  if (!res.ok) throw new Error('Error al eliminar pedido');
}

export async function pagarPedido(id) {
  const res = await fetch(`${API_URL}/PedidoBD/${id}/pagar`, { method: 'PATCH' });
  if (!res.ok) throw new Error('Error al pagar pedido');
}

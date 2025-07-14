import React, { useState, useEffect } from 'react';
import MainLayout from '../../layouts/MainLayout';
import PedidosForm from './PedidosForm';
import PedidosTable from './PedidosTable';
import { getPedidos, deletePedido, pagarPedido } from './pedidosService';

export default function PedidosPage() {
  const [pedidos, setPedidos] = useState([]);
  const [pedidoEdit, setPedidoEdit] = useState(null);

  const load = async () => {
    const data = await getPedidos().catch(console.error);
    setPedidos(Array.isArray(data) ? data : []);
  };

  useEffect(() => { load(); }, []);

  const handleDelete = async id => { await deletePedido(id); load(); };
  const handleEdit = p => { setPedidoEdit(p); window.scrollTo({ top: 0, behavior: 'smooth' }); };
  const handlePagar = async id => { await pagarPedido(id); load(); };

  return (
    <MainLayout>
      <section className="app-main" style={{ maxWidth: '900px', margin: '0 auto' }}>
        <h2 style={{ color: 'var(--color-primary-dark)' }}>Pedidos</h2>
        <PedidosForm onSuccess={() => { setPedidoEdit(null); load(); }} pedidoToEdit={pedidoEdit} />
        <PedidosTable data={pedidos} onEdit={handleEdit} onDelete={handleDelete} onPagar={handlePagar} />
      </section>
    </MainLayout>
  );
}

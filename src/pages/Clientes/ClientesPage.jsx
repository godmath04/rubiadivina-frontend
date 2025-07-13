import React, { useEffect, useState } from 'react';
import ClientesForm from './ClientesForm';
import ClientesTable from './ClientesTable';
import { getClientes, deleteCliente } from './ClientesService';
import MainLayout from '../../layouts/MainLayout';

export default function ClientesPage() {
  const [clientes, setClientes] = useState([]);
  const [clienteEdit, setClienteEdit] = useState(null);

  const load = async () => {
    try {
      const data = await getClientes();
      setClientes(data);
    } catch (err) {
      console.error('Error al cargar clientes:', err);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const handleDelete = async (id) => {
    await deleteCliente(id);
    load();
  };

  const handleEdit = (cliente) => {
    setClienteEdit(cliente);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <MainLayout>
      <section style={{ padding: '1rem', maxWidth: '800px', margin: '0 auto' }}>
        <h2 style={{ color: 'var(--color-primary-dark)' }}>Clientes</h2>
        <ClientesForm
          onSuccess={async () => {
            setClienteEdit(null);
            await load();
          }}
          clienteToEdit={clienteEdit}
        />
        <ClientesTable
          data={clientes}
          onDelete={handleDelete}
          onEdit={handleEdit}
        />
      </section>
    </MainLayout>
  );
}

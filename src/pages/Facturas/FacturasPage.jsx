import React, { useState, useEffect } from 'react';
import MainLayout from '../../layouts/MainLayout';
import FacturasForm from './FacturasForm';
import FacturasTable from './FacturasTable';
import { getFacturas, deleteFactura } from './facturasService';

export default function FacturasPage() {
  const [facturas, setFacturas] = useState([]);
  const [facturaEdit, setFacturaEdit] = useState(null);

  const load = async () => setFacturas(await getFacturas().catch(console.error));

  useEffect(() => { load(); }, []);

  return (
    <MainLayout>
      <section className="app-main" style={{ maxWidth: '900px', margin: '0 auto' }}>
        <h2 style={{ color: 'var(--color-primary-dark)' }}>Facturas</h2>
        <FacturasForm onSuccess={() => { setFacturaEdit(null); load(); }} facturaToEdit={facturaEdit} />
        <FacturasTable data={facturas} onEdit={setFacturaEdit} onDelete={async id => { await deleteFactura(id); load(); }} />
      </section>
    </MainLayout>
  );
}

import React, { useEffect, useState } from 'react';
import MainLayout from '../../layouts/MainLayout';
import ProductosForm from './ProductosForm';
import ProductosTable from './ProductosTable';
import { getProductos, deleteProducto } from './productosService';
import { getCategorias } from '../Categorias/categoriasService';

export default function ProductosPage() {
  const [productos, setProductos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [prodEdit, setProdEdit] = useState(null);

  const load = async () => {
    setCategorias(await getCategorias().catch(console.error));
    setProductos(await getProductos().catch(console.error));
  };

  useEffect(() => { load(); }, []);

  const handleEdit = p => { setProdEdit(p); window.scrollTo({ top: 0, behavior: 'smooth' }); };
  const handleDelete = async id => { await deleteProducto(id); load(); };

  return (
    <MainLayout>
      <section style={{ padding: '1rem', maxWidth: '900px', margin: '0 auto' }}>
        <h2 style={{ color: 'var(--color-primary-dark)' }}>Productos</h2>
        <ProductosForm onSuccess={() => { setProdEdit(null); load(); }} productoToEdit={prodEdit} categorias={categorias} />
        <ProductosTable data={productos} onEdit={handleEdit} onDelete={handleDelete} />
      </section>
    </MainLayout>
  );
}

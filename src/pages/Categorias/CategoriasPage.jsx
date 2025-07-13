import React, { useEffect, useState } from 'react';
import MainLayout from '../../layouts/MainLayout';
import CategoriasForm from './CategoriasForm';
import CategoriasTable from './CategoriasTable';
import { getCategorias, deleteCategoria } from './CategoriasService';

export default function CategoriasPage() {
  const [categorias, setCategorias] = useState([]);
  const [categoriaEdit, setCategoriaEdit] = useState(null);

  const load = async () => {
    try {
      const data = await getCategorias();
      setCategorias(data);
    } catch (err) {
      console.error('Error al cargar categorías:', err);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const handleDelete = async (id) => {
    await deleteCategoria(id);
    load();
  };

  const handleEdit = (categoria) => {
    setCategoriaEdit(categoria);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <MainLayout>
      <section style={{ padding: '1rem', maxWidth: '800px', margin: '0 auto' }}>
        <h2 style={{ color: 'var(--color-primary-dark)' }}>Categorías</h2>
        <CategoriasForm
          onSuccess={() => {
            setCategoriaEdit(null);
            load();
          }}
          categoriaToEdit={categoriaEdit}
        />
        <CategoriasTable
          data={categorias}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </section>
    </MainLayout>
  );
}

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { createProducto, updateProducto } from './productosService';

export default function ProductosForm({ onSuccess, productoToEdit, categorias }) {
  const [prod, setProd] = useState({ Nombre: '', Precio: '', Stock: '', CategoriaId: '' });

  useEffect(() => {
    if (productoToEdit) {
      setProd({
        Nombre: productoToEdit.Nombre,
        Precio: productoToEdit.Precio,
        Stock: productoToEdit.Stock,
        CategoriaId: productoToEdit.CategoriaId,
      });
    } else {
      setProd({ Nombre: '', Precio: '', Stock: '', CategoriaId: '' });
    }
  }, [productoToEdit]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (productoToEdit?.Id) {
      await updateProducto(productoToEdit.Id, { Id: productoToEdit.Id, ...prod });
    } else {
      await createProducto(prod);
    }
    onSuccess();
  };

  return (
    <form className="form-horizontal" onSubmit={handleSubmit}>
      <input
        type="text"
        className="input"
        value={prod.Nombre}
        placeholder="Nombre"
        required
        onChange={e => setProd({ ...prod, Nombre: e.target.value })}
      />
      <input
        type="number"
        className="input"
        value={prod.Precio}
        placeholder="Precio"
        required
        onChange={e => setProd({ ...prod, Precio: parseFloat(e.target.value) })}
      />
      <input
        type="number"
        className="input"
        value={prod.Stock}
        placeholder="Stock"
        required
        onChange={e => setProd({ ...prod, Stock: parseInt(e.target.value) })}
      />
      <select
        className="input"
        value={prod.CategoriaId}
        required
        onChange={e => setProd({ ...prod, CategoriaId: parseInt(e.target.value) })}
      >
        <option value="">Categoría</option>
        {categorias.map(c => <option key={c.Id} value={c.Id}>{c.Nombre}</option>)}
      </select>
      <button type="submit" className="btn-primary">
        {productoToEdit ? 'Actualizar' : 'Crear'}
      </button>
    </form>
  );
}

ProductosForm.propTypes = {
  onSuccess: PropTypes.func.isRequired,
  productoToEdit: PropTypes.object,
  categorias: PropTypes.array.isRequired,
};

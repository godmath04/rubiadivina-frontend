import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { createCategoria, updateCategoria } from './CategoriasService';

export default function CategoriasForm({ onSuccess, categoriaToEdit }) {
  const [nombre, setNombre] = useState('');

  useEffect(() => {
    if (categoriaToEdit) setNombre(categoriaToEdit.Nombre);
    else setNombre('');
  }, [categoriaToEdit]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = { Nombre: nombre };
    if (categoriaToEdit?.Id) {
      await updateCategoria(categoriaToEdit.Id, { Id: categoriaToEdit.Id, ...payload });
    } else {
      await createCategoria(payload);
    }

    setNombre('');
    onSuccess();
  };

  return (
    <form className="form-horizontal" onSubmit={handleSubmit}>
      <input
        className="input"
        type="text"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
        placeholder="Nombre de la categoría"
        required
      />
      <button type="submit" className="btn-primary">
        {categoriaToEdit ? 'Actualizar' : 'Crear'}
      </button>
    </form>
  );
}

CategoriasForm.propTypes = {
  onSuccess: PropTypes.func.isRequired,
  categoriaToEdit: PropTypes.object,
};

import React from 'react';
import PropTypes from 'prop-types';

export default function ProductosTable({ data, onEdit, onDelete }) {
  return (
    <table>
      <thead>
        <tr>
          <th>Nombre</th><th>Precio</th><th>Stock</th><th>Categoría</th><th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {data.map(p => (
          <tr key={p.Id}>
            <td>{p.Nombre}</td><td>{p.Precio}</td><td>{p.Stock}</td><td>{p.Categoria?.Nombre}</td>
            <td>
              <button onClick={() => onEdit(p)} style={btnStyleSecondary}>Editar</button>
              <button onClick={() => onDelete(p.Id)} style={btnStyleDelete}>Eliminar</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

const btnStyleSecondary = { marginRight: '0.5rem', background: 'var(--color-secondary)', color: '#000', padding: '0.25rem 0.5rem', borderRadius: '4px', border: 'none', cursor: 'pointer' };
const btnStyleDelete = { background: 'red', color: 'white', padding: '0.25rem 0.5rem', borderRadius: '4px', border: 'none', cursor: 'pointer' };

ProductosTable.propTypes = {
  data: PropTypes.array.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

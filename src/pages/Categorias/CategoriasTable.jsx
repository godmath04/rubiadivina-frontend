import React from 'react';
import PropTypes from 'prop-types';

export default function CategoriasTable({ data, onEdit, onDelete }) {
  return (
    <table>
      <thead>
        <tr>
          <th>Nombre</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {data.map(cat => (
          <tr key={cat.Id}>
            <td>{cat.Nombre}</td>
            <td>
              <button onClick={() => onEdit(cat)} className="edit">Editar</button>
              <button onClick={() => onDelete(cat.Id)} className="delete">Eliminar</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

CategoriasTable.propTypes = {
  data: PropTypes.array.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

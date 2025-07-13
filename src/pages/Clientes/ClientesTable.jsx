import React from 'react';
import PropTypes from 'prop-types';

export default function ClientesTable({ data, onDelete, onEdit }) {
  return (
    <table>
      <thead>
        <tr>
          <th>Nombre</th><th>Apellido</th><th>Teléfono</th><th>Correo</th><th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {data.map(c => (
          <tr key={c.Id}>
            <td>{c.Nombre}</td><td>{c.Apellido}</td><td>{c.Telefono}</td><td>{c.Correo}</td>
            <td>
              <button onClick={() => onEdit(c)} style={{ marginRight: '0.5rem', background: 'var(--color-secondary)', color: '#000', padding: '0.25rem 0.5rem', borderRadius: '4px', border: 'none', cursor: 'pointer' }}>Editar</button>
              <button onClick={() => onDelete(c.Id)} style={{ marginRight: '0.5rem', background: 'red', color: 'white', padding: '0.25rem 0.5rem', borderRadius: '4px', border: 'none', cursor: 'pointer' }}>Eliminar</button>
              
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

ClientesTable.propTypes = {
  data: PropTypes.array.isRequired,
  onDelete: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
};

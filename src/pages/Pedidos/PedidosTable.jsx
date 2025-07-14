import React from 'react';
import PropTypes from 'prop-types';

export default function PedidosTable({ data = [], onEdit, onDelete, onPagar }) {
  if (!Array.isArray(data)) return null;

  return (
    <table>
      <thead>
        <tr>
          <th>Cliente</th>
          <th>Producto</th>
          <th>ValorTotal</th>
          <th>Pagado</th>
          <th>Fecha Solicitud</th>
          <th>Fecha Pago</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {data.map(p => (
          <tr key={p.Id}>
            <td>{p.Cliente?.Nombre} {p.Cliente?.Apellido}</td>
            <td>{p.Producto?.Nombre}</td>
            <td>{p.ValorTotal}</td>
            <td>{p.Pagado ? '✔️' : '❌'}</td>
            <td>{new Date(p.FechaSolicitud).toLocaleDateString()}</td>
            <td>{p.FechaPago && new Date(p.FechaPago).toLocaleDateString()}</td>
            <td>
              <button className="edit" onClick={() => onEdit(p)}>Editar</button>
              <button className="delete" onClick={() => onDelete(p.Id)}>Eliminar</button>
              {!p.Pagado && <button className="btn-primary" onClick={() => onPagar(p.Id)}>Pagar</button>}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

PedidosTable.propTypes = {
  data: PropTypes.array,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onPagar: PropTypes.func.isRequired,
};

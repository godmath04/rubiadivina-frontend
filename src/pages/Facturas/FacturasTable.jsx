import React from 'react';
import PropTypes from 'prop-types';

export default function FacturasTable({ data, onEdit, onDelete }) {
  return (
    <table>
      <thead>
        <tr>
          <th>FacturaId</th>
          <th>PedidoId</th>
          <th>Cliente</th>
          <th>Producto</th>
          <th>Fecha Factura</th>
          <th>Enviar Email</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {data.map((f) => (
          <tr key={f.Id}>
            <td>{f.Id}</td>
            <td>{f.PedidoId}</td>
            <td>{f.Pedido?.Cliente?.Nombre} {f.Pedido?.Cliente?.Apellido}</td>
            <td>{f.Pedido?.Producto?.Nombre}</td>
            <td>{new Date(f.FechaFactura).toLocaleDateString()}</td>
            <td>{f.EnviarEmail ? '✔️' : '❌'}</td>
            <td>
              <button className="edit" onClick={() => onEdit(f)}>Editar</button>
              <button className="delete" onClick={() => onDelete(f.Id)}>Eliminar</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

FacturasTable.propTypes = {
  data: PropTypes.array.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

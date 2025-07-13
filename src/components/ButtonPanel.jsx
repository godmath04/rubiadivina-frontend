import React from 'react';
import PropTypes from 'prop-types';

export default function ButtonPanel({ onClick }) {
  const labels = ['Clientes', 'Facturas', 'Pedidos', 'Categoría'];
  return (
    <div className="button-panel">
      {labels.map(label => (
        <button key={label} onClick={() => onClick(label)}>
          {label}
        </button>
      ))}
      <button className="button-productos" onClick={() => onClick('Productos')}>
        Productos
      </button>
    </div>
  );
}

ButtonPanel.propTypes = {
  onClick: PropTypes.func.isRequired,
};

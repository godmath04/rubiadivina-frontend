import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { createFactura, updateFactura } from './facturasService';
import { getPedidos } from '../Pedidos/pedidosService';

export default function FacturasForm({ onSuccess, facturaToEdit }) {
  const [factura, setFactura] = useState({ PedidoId: '', FechaFactura: '', EnviarEmail: false });
  const [pedidos, setPedidos] = useState([]);

  useEffect(() => {
    getPedidos().then(setPedidos).catch(console.error);
  }, []);

  useEffect(() => {
    if (facturaToEdit) {
      setFactura({
        PedidoId: facturaToEdit.PedidoId,
        FechaFactura: facturaToEdit.FechaFactura?.slice(0, 10) || '',
        EnviarEmail: facturaToEdit.EnviarEmail || false,
      });
    } else {
      setFactura({ PedidoId: '', FechaFactura: '', EnviarEmail: false });
    }
  }, [facturaToEdit]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (facturaToEdit?.Id) {
      await updateFactura(facturaToEdit.Id, factura);
    } else {
      await createFactura(factura);
    }
    onSuccess();
  };

  return (
    <form onSubmit={handleSubmit} className="form-horizontal">
      <label>
        Pedido:
        <select
          required
          value={factura.PedidoId}
          onChange={(e) => setFactura({ ...factura, PedidoId: e.target.value })}
        >
          <option value="">Seleccionar Pedido</option>
          {pedidos.map((p) => (
            <option key={p.Id} value={p.Id}>
              {`#${p.Id} - ${p.Cliente?.Nombre} ${p.Cliente?.Apellido} (${p.Producto?.Nombre})`}
            </option>
          ))}
        </select>
      </label>

      <label>
        Fecha de Factura:
        <input
          type="date"
          required
          value={factura.FechaFactura}
          onChange={(e) => setFactura({ ...factura, FechaFactura: e.target.value })}
        />
      </label>

      <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <input
          type="checkbox"
          checked={factura.EnviarEmail}
          onChange={(e) => setFactura({ ...factura, EnviarEmail: e.target.checked })}
        />
        Enviar por correo
      </label>

      <button type="submit" className="btn-primary">
        {facturaToEdit ? 'Actualizar' : 'Crear'}
      </button>
    </form>
  );
}

FacturasForm.propTypes = {
  onSuccess: PropTypes.func.isRequired,
  facturaToEdit: PropTypes.object,
};

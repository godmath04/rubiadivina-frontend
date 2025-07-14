import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { createPedido, updatePedido } from './pedidosService';
import { getClientes } from '../Clientes/ClientesService';
import { getProductos } from '../Productos/productosService';

export default function PedidosForm({ onSuccess, pedidoToEdit }) {
  const [pedido, setPedido] = useState({ ClienteId: '', ProductoId: '', ValorTotal: '', Pagado: false, FechaSolicitud: '', FechaPago: '' });
  const [clientes, setClientes] = useState([]);
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    getClientes().then(setClientes).catch(console.error);
    getProductos().then(setProductos).catch(console.error);
  }, []);

  useEffect(() => {
    if (pedidoToEdit) {
      setPedido({
        ClienteId: pedidoToEdit.ClienteId,
        ProductoId: pedidoToEdit.ProductoId,
        ValorTotal: pedidoToEdit.ValorTotal,
        Pagado: pedidoToEdit.Pagado,
        FechaSolicitud: pedidoToEdit.FechaSolicitud.slice(0, 10),
        FechaPago: pedidoToEdit.FechaPago.slice(0, 10),
      });
    } else {
      setPedido({ ClienteId: '', ProductoId: '', ValorTotal: '', Pagado: false, FechaSolicitud: '', FechaPago: '' });
    }
  }, [pedidoToEdit]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = pedidoToEdit
      ? { Id: pedidoToEdit.Id, ...pedido }
      : pedido;
    if (pedidoToEdit?.Id) await updatePedido(pedidoToEdit.Id, payload);
    else await createPedido(payload);
    onSuccess();
  };

  return (
    <form onSubmit={handleSubmit} className="form-horizontal">
      <select required value={pedido.ClienteId} onChange={e => setPedido({ ...pedido, ClienteId: e.target.value })}>
        <option value="">Seleccionar Cliente</option>
        {clientes.map(c => <option key={c.Id} value={c.Id}>{c.Nombre} {c.Apellido}</option>)}
      </select>
      <select required value={pedido.ProductoId} onChange={e => setPedido({ ...pedido, ProductoId: e.target.value })}>
        <option value="">Seleccionar Producto</option>
        {productos.map(p => <option key={p.Id} value={p.Id}>{p.Nombre}</option>)}
      </select>
      <input type="number" value={pedido.ValorTotal} required placeholder="Valor Total" onChange={e => setPedido({ ...pedido, ValorTotal: e.target.value })} />
      <input type="date" value={pedido.FechaSolicitud} required onChange={e => setPedido({ ...pedido, FechaSolicitud: e.target.value })} />
      <input type="date" value={pedido.FechaPago} onChange={e => setPedido({ ...pedido, FechaPago: e.target.value })} />
      <label>
        <input type="checkbox" checked={pedido.Pagado} onChange={e => setPedido({ ...pedido, Pagado: e.target.checked })} />
        Pagado
      </label>
      <button type="submit" className="btn-primary">
        {pedidoToEdit ? 'Actualizar' : 'Crear'}
      </button>
    </form>
  );
}

PedidosForm.propTypes = {
  onSuccess: PropTypes.func.isRequired,
  pedidoToEdit: PropTypes.object,
};

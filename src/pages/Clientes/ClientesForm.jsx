import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { createCliente, updateCliente, findClienteByEmail } from './ClientesService';

export default function ClientesForm({ onSuccess, clienteToEdit }) {
  const [cliente, setCliente] = useState({ Nombre: '', Apellido: '', Telefono: '', Correo: '' });

    useEffect(() => {
    if (clienteToEdit) {
        setCliente(clienteToEdit);
    } else {
        setCliente({ Nombre: '', Apellido: '', Telefono: '', Correo: '' });
    }
    }, [clienteToEdit]);

const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    if (cliente.Id) {
      const updated = await updateCliente(cliente.Id, cliente);
      console.log('Actualizado:', updated);
    } else {
      const created = await createCliente(cliente);
      console.log('Creado:', created);
    }

    onSuccess(); // Llama a load y resetea clienteEdit
  } catch (error) {
    console.error('Error al guardar cliente:', error);
  } finally {
    setCliente({ Nombre: '', Apellido: '', Telefono: '', Correo: '' });
  }
};


  const handleEmailBlur = async () => {
    if (cliente.Correo) {
      const existing = await findClienteByEmail(cliente.Correo);
      if (existing) setCliente(existing);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
      {['Nombre', 'Apellido', 'Telefono', 'Correo'].map(field => (
        <input
          key={field}
          type={field === 'Correo' ? 'email' : 'text'}
          value={cliente[field] || ''}
          placeholder={field}
          required
          onChange={e => setCliente({ ...cliente, [field]: e.target.value })}
          onBlur={field === 'Correo' ? handleEmailBlur : undefined}
          style={{ flex: '1', minWidth: '180px', padding: '0.75rem', fontSize: '1rem', borderRadius: '8px', border: '1px solid var(--color-secondary)' }}
        />
      ))}
      <button type="submit" style={{ backgroundColor: 'var(--color-primary)', color: 'white', padding: '0.75rem 1.5rem', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}>
        {cliente.Id ? 'Actualizar' : 'Crear'}
      </button>
    </form>
  );
}

ClientesForm.propTypes = {
  onSuccess: PropTypes.func.isRequired,
  clienteToEdit: PropTypes.object,
};

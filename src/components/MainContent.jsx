import React from 'react';
import Carousel from './Carousel';
import ButtonPanel from './ButtonPanel';
import { useNavigate } from 'react-router-dom';

export default function MainContent() {
  const navigate = useNavigate();

  const handleClick = (label) => {
    switch (label) {
      case 'Clientes':
        navigate('/clientes');
        break;
    
      case 'Categoría':
        navigate('/categorias');
        break;
      case 'Productos':
        navigate('/productos');
        break
      default:
        console.log(`Botón no manejado: ${label}`);
    }
  };

  return (
    <main className="app-main">
      <div className="main-grid">
        <div className="carousel-wrapper">
          <Carousel />
        </div>
        <div className="buttons-wrapper">
          <ButtonPanel onClick={handleClick} />
        </div>
      </div>
    </main>
  );
}

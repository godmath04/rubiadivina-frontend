import React, { useState } from 'react';

const images = [
  '/images/RubiaDivinaCoffee&Beer_Cafe.jpg',
  '/images/RubiaDivinaCoffee&Beer_Cerveza.jpg',
  '/images/RubiaDivinaCoffee&Beer_Jueves.jpg',
];

export default function Carousel() {
  const [idx, setIdx] = useState(0);
  const [startX, setStartX] = useState(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleStart = (x) => {
    setStartX(x);
    setIsDragging(true);
  };

  const handleMove = (x) => {
    if (!isDragging || startX === null) return;
    const diff = x - startX;
    if (diff > 50) {
      prev();
      setIsDragging(false);
    } else if (diff < -50) {
      next();
      setIsDragging(false);
    }
  };

  const handleEnd = () => {
    setStartX(null);
    setIsDragging(false);
  };

  const prev = () => setIdx((idx - 1 + images.length) % images.length);
  const next = () => setIdx((idx + 1) % images.length);

  return (
    <button
      className="carousel"
      onTouchStart={(e) => handleStart(e.touches[0].clientX)}
      onTouchMove={(e) => handleMove(e.touches[0].clientX)}
      onTouchEnd={handleEnd}
      onMouseDown={(e) => handleStart(e.clientX)}
      onMouseMove={(e) => handleMove(e.clientX)}
      onMouseUp={handleEnd}
      onMouseLeave={handleEnd}
      aria-label="Carrusel de imágenes destacadas"
      style={{ all: 'unset' }}
    >
      <img src={images[idx]} alt={`Slide ${idx + 1}`} />
    </button>
  );
}

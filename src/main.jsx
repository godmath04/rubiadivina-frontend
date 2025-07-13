import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App.jsx';
import ClientesPage from './pages/Clientes/ClientesPage.jsx';
import CategoriasPage from './pages/Categorias/CategoriasPage.jsx';
import ProductosPage from './pages/Productos/ProductosPage.jsx';

import './App.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/clientes" element={<ClientesPage />} />
        <Route path="/categorias" element={<CategoriasPage />} />
        <Route path="/productos" element={<ProductosPage />} />

      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

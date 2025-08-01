import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function MainLayout({ children }) {
  return (
    <>
      <Header />
      <main className="app-main">{children}</main>
      <Footer />
    </>
  );
}

import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import CatalogPage from './pages/CatalogPage';
import Header from './components/Header';

export default function App() {

  useEffect(() => {
    const theme = localStorage.getItem('theme') || 'light';
    if (theme === 'dark') document.documentElement.classList.add('dark');
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <Routes>
          <Route path="/" element={<CatalogPage />} />
        </Routes>
      </main>
    </div>
  );
}

import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import FloatingAssistantWidget from './components/common/FloatingAssistantWidget';
import HomePage from './pages/HomePage';
import TramitesCatalogPage from './pages/TramitesCatalogPage';
import TramiteDetailPage from './pages/TramiteDetailPage';
import AssistantPage from './pages/AssistantPage';
import AuthPage from './pages/AuthPage';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="flex flex-col min-h-screen bg-[#F8FAFC]">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/tramites" element={<TramitesCatalogPage />} />
            <Route path="/tramites/:slug" element={<TramiteDetailPage />} />
            <Route path="/asistente" element={<AssistantPage />} />
            <Route path="/login" element={<AuthPage />} />
            <Route path="/registro" element={<AuthPage />} />
            <Route path="*" element={<HomePage />} />
          </Routes>
        </main>
        <Footer />
        <FloatingAssistantWidget />
      </div>
    </BrowserRouter>
  );
}

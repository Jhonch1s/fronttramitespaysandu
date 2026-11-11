import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { HelpCircle, Search, Menu, X, User, LogOut } from 'lucide-react';
import logoTramitesUruguay from '../../assets/logo tramites uruguay.png';
import PorDondeEmpiezoModal from '../common/PorDondeEmpiezoModal';
import { getStoredUser, clearStoredAuth, type UserProfile } from '../../services/auth';

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showQuickSearch, setShowQuickSearch] = useState(false);
  const [quickSearchText, setQuickSearchText] = useState('');
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(getStoredUser());

  useEffect(() => {
    const handleAuthChange = () => {
      setCurrentUser(getStoredUser());
    };
    window.addEventListener('auth-change', handleAuthChange);
    return () => window.removeEventListener('auth-change', handleAuthChange);
  }, []);

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (quickSearchText.trim()) {
      setShowQuickSearch(false);
      navigate(`/tramites?q=${encodeURIComponent(quickSearchText.trim())}`);
      setQuickSearchText('');
    }
  };

  const handleLogout = () => {
    clearStoredAuth();
    setCurrentUser(null);
    navigate('/');
  };

  return (
    <>
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
          
          {/* Logo Oficial Trámites Uruguay & Paysandú Joven */}
          <Link 
            to="/" 
            className="flex items-center gap-3 group focus:outline-none focus:ring-2 focus:ring-[#1565C0] rounded-xl p-1"
          >
            <img
              src={logoTramitesUruguay}
              alt="Trámites Uruguay"
              className="h-10 sm:h-12 w-auto object-contain transition-transform group-hover:scale-102"
            />
            <div className="hidden sm:flex flex-col border-l border-slate-300 pl-3">
              <span className="text-sm font-extrabold tracking-tight text-[#0D47A1] leading-none">
                Trámites Paysandú
              </span>
              <span className="text-[10px] font-bold text-[#00897B] tracking-wider uppercase mt-0.5">
                Guía Ciudadana
              </span>
            </div>
          </Link>

          {/* Nav Links Desktop */}
          <nav className="hidden lg:flex items-center gap-1 bg-slate-50 border border-slate-200/80 p-1.5 rounded-full">
            <Link
              to="/"
              className={`px-5 py-2 rounded-full text-sm font-semibold transition-all ${
                isActive('/') 
                  ? 'bg-white text-[#0D47A1] shadow-xs' 
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/80'
              }`}
            >
              Inicio
            </Link>
            <Link
              to="/tramites"
              className={`px-5 py-2 rounded-full text-sm font-semibold transition-all ${
                isActive('/tramites') 
                  ? 'bg-white text-[#0D47A1] shadow-xs' 
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/80'
              }`}
            >
              Trámites
            </Link>
            <Link
              to="/asistente"
              className={`px-5 py-2 rounded-full text-sm font-semibold transition-all flex items-center gap-1.5 ${
                isActive('/asistente') 
                  ? 'bg-white text-[#0D47A1] shadow-xs' 
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/80'
              }`}
            >
              Asistente virtual
            </Link>
          </nav>

          {/* Right Actions Desktop */}
          <div className="hidden lg:flex items-center gap-3">
            {/* Botón ¿Por dónde empiezo? */}
            <button
              onClick={() => setIsModalOpen(true)}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#00897B] hover:bg-[#00796B] active:scale-95 text-white text-xs md:text-sm font-semibold shadow-xs hover:shadow-md transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#00897B] focus:ring-offset-2"
            >
              <HelpCircle className="w-4 h-4 text-emerald-100" />
              <span>¿Por dónde empiezo?</span>
            </button>

            {/* Quick search button */}
            <div className="relative">
              <button
                onClick={() => setShowQuickSearch(!showQuickSearch)}
                aria-label="Abrir búsqueda rápida"
                aria-expanded={showQuickSearch}
                className="p-2.5 rounded-full text-slate-600 hover:text-[#0D47A1] hover:bg-slate-100 transition-colors focus:outline-none focus:ring-2 focus:ring-[#1565C0] cursor-pointer"
              >
                <Search className="w-5 h-5" />
              </button>

              {/* Quick Search Popover */}
              {showQuickSearch && (
                <div className="absolute right-0 mt-3 w-80 bg-white rounded-2xl shadow-xl border border-slate-200 p-3 z-50 animate-fade-in">
                  <form onSubmit={handleSearchSubmit} className="flex gap-2">
                    <input
                      type="text"
                      autoFocus
                      aria-label="Buscar trámite"
                      placeholder="Buscar trámite..."
                      value={quickSearchText}
                      onChange={(e) => setQuickSearchText(e.target.value)}
                      className="w-full px-4 py-2 text-sm bg-slate-50 border border-slate-200 rounded-full focus:outline-none focus:ring-2 focus:ring-[#1565C0] text-slate-800"
                    />
                    <button
                      aria-label="Buscar" type="submit"
                      className="p-2 bg-[#1565C0] text-white rounded-full hover:bg-blue-700 transition-colors shrink-0"
                    >
                      <Search className="w-4 h-4" />
                    </button>
                  </form>
                </div>
              )}
            </div>

            {/* Autenticación Usuario / Iniciar Sesión */}
            {currentUser ? (
              <div className="flex items-center gap-2 pl-2 border-l border-slate-200">
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-100 border border-slate-200 text-xs text-slate-700">
                  <User className="w-3.5 h-3.5 text-[#1565C0]" />
                  <span className="font-bold line-clamp-1 max-w-[100px]">{currentUser.username}</span>
                </div>
                <button
                  onClick={handleLogout}
                  title="Cerrar sesión"
                  aria-label="Cerrar sesión"
                  className="p-2 text-slate-400 hover:text-rose-600 rounded-full hover:bg-rose-50 transition-colors cursor-pointer"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full border border-slate-300 hover:border-[#1565C0] hover:text-[#0D47A1] text-slate-700 text-xs md:text-sm font-semibold transition-colors"
              >
                <User className="w-4 h-4 text-slate-400" />
                <span>Iniciar sesión</span>
              </Link>
            )}
          </div>

          {/* Mobile hamburger */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={() => setIsModalOpen(true)}
              className="p-2 rounded-full bg-emerald-50 text-[#00897B] text-xs font-semibold"
              title="¿Por dónde empiezo?"
            >
              <HelpCircle className="w-5 h-5" />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? "Cerrar menú" : "Abrir menú"}
              aria-expanded={mobileMenuOpen}
              className="p-2 rounded-xl text-slate-700 hover:bg-slate-100"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile menu drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-3 animate-fade-in shadow-lg">
            <form onSubmit={handleSearchSubmit} className="relative">
              <input
                type="text"
                aria-label="Buscar trámite"
                placeholder="Buscar cédula, carné, becas..."
                value={quickSearchText}
                onChange={(e) => setQuickSearchText(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-full focus:outline-none focus:ring-2 focus:ring-[#1565C0]"
              />
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
            </form>

            <nav className="flex flex-col space-y-1">
              <Link
                to="/"
                onClick={() => setMobileMenuOpen(false)}
                className={`px-4 py-3 rounded-2xl font-semibold text-sm ${
                  isActive('/') ? 'bg-blue-50 text-[#0D47A1]' : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                Inicio
              </Link>
              <Link
                to="/tramites"
                onClick={() => setMobileMenuOpen(false)}
                className={`px-4 py-3 rounded-2xl font-semibold text-sm ${
                  isActive('/tramites') ? 'bg-blue-50 text-[#0D47A1]' : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                Catálogo de Trámites
              </Link>
              <Link
                to="/asistente"
                onClick={() => setMobileMenuOpen(false)}
                className={`px-4 py-3 rounded-2xl font-semibold text-sm flex items-center justify-between ${
                  isActive('/asistente') ? 'bg-blue-50 text-[#0D47A1]' : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                <span>Asistente Guiado</span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold">
                  En línea
                </span>
              </Link>
              
              {currentUser ? (
                <div className="pt-2 border-t border-slate-100 flex items-center justify-between px-4 py-2 text-sm text-slate-700">
                  <span className="font-bold">{currentUser.username}</span>
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      handleLogout();
                    }}
                    className="text-xs font-bold text-rose-600"
                  >
                    Cerrar sesión
                  </button>
                </div>
              ) : (
                <Link
                  to="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-4 py-3 rounded-2xl font-semibold text-sm text-[#1565C0] bg-blue-50/50 flex items-center gap-2"
                >
                  <User className="w-4 h-4" />
                  <span>Iniciar sesión / Registrarse</span>
                </Link>
              )}
            </nav>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                setIsModalOpen(true);
              }}
              className="w-full py-3 rounded-full bg-[#00897B] text-white font-bold text-sm flex items-center justify-center gap-2 shadow-sm"
            >
              <HelpCircle className="w-4 h-4" />
              ¿Por dónde empiezo?
            </button>
          </div>
        )}
      </header>

      {/* Modal Guía */}
      <PorDondeEmpiezoModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}

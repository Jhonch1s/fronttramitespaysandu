import { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Search, Filter, Clock, ArrowRight, Tag, X, Plus } from 'lucide-react';
import { getTramites, getCategorias } from '../services/api';
import { getStoredUser } from '../services/auth';
import type { Tramite, Categoria, ModalidadTramite, TipoCostoTramite } from '../types';
import AdminTramiteModal from '../components/admin/AdminTramiteModal';

export default function TramitesCatalogPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [tramites, setTramites] = useState<Tramite[]>([]);
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);

  const currentUser = getStoredUser();
  const isAdmin = currentUser?.rol === 'ADMIN' || currentUser?.rol === 'EDITOR';

  // Filtros desde query params o estado
  const search = searchParams.get('q') || '';
  const categoriaSlug = searchParams.get('categoria') || '';
  const [modalidad, setModalidad] = useState<ModalidadTramite | ''>('');
  const [costoTipo, setCostoTipo] = useState<TipoCostoTramite | ''>('');
  const [searchInput, setSearchInput] = useState(search);

  useEffect(() => {
    getCategorias().then(setCategorias);
  }, []);

  useEffect(() => {
    let active = true;
    getTramites({
      categoria: categoriaSlug || undefined,
      modalidad: modalidad || undefined,
      costoTipo: costoTipo || undefined,
      limit: 40
    })
      .then((response) => {
        if (!active) return;
        setTramites(response.items);
      })
      .catch((e) => {
        if (!active) return;
        console.error(e);
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, [categoriaSlug, modalidad, costoTipo]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newParams = new URLSearchParams(searchParams);
    if (searchInput.trim()) {
      newParams.set('q', searchInput.trim());
    } else {
      newParams.delete('q');
    }
    setSearchParams(newParams);
  };

  const handleCategoryChange = (slug: string) => {
    const newParams = new URLSearchParams(searchParams);
    if (slug) {
      newParams.set('categoria', slug);
    } else {
      newParams.delete('categoria');
    }
    setSearchParams(newParams);
  };

  const clearFilters = () => {
    setSearchInput('');
    setModalidad('');
    setCostoTipo('');
    setSearchParams({});
  };

  // Filtrado en memoria si hay término de búsqueda
  const filteredTramites = tramites.filter((item) => {
    if (!search.trim()) return true;
    const q = search.toLowerCase();
    return (
      item.titulo.toLowerCase().includes(q) ||
      item.descripcion.toLowerCase().includes(q) ||
      item.palabrasClave?.some((k) => k.toLowerCase().includes(q))
    );
  });

  return (
    <div className="min-h-screen bg-[#F8FAFC] py-10 md:py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Encabezado */}
        <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 mb-2">
              <Link to="/" className="hover:text-[#1565C0]">Inicio</Link>
              <span>/</span>
              <span className="text-slate-900">Catálogo de Trámites</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-extrabold text-[#0D47A1] tracking-tight">
              Catálogo de Trámites
            </h1>
            <p className="text-slate-600 text-sm md:text-base mt-2 max-w-2xl">
              Encontrá todos los requisitos, costos y canales oficiales para gestionar tus documentos en Paysandú.
            </p>
          </div>

          {isAdmin && (
            <button
              onClick={() => setIsAdminModalOpen(true)}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#00897B] hover:bg-[#00796B] text-white font-bold text-xs sm:text-sm shadow-md hover:shadow-lg transition-all btn-tactile cursor-pointer self-start md:self-auto shrink-0"
            >
              <Plus className="w-4 h-4" />
              <span>Nuevo Trámite</span>
            </button>
          )}
        </div>

        {/* Buscador amplio con botón */}
        <form onSubmit={handleSearchSubmit} className="mb-8">
          <div className="relative flex items-center bg-white rounded-full border border-slate-300 shadow-sm focus-within:border-blue-500 focus-within:ring-4 focus-within:ring-blue-100 p-2">
            <Search className="w-5 h-5 text-slate-400 ml-4 mr-2" />
            <input
              type="text"
              placeholder="Buscar por nombre, palabra clave (ej: libreta, carné, beca, cédula)..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="w-full py-2 px-2 text-slate-800 placeholder-slate-400 bg-transparent focus:outline-none text-sm md:text-base"
            />
            {searchInput && (
              <button
                type="button"
                onClick={() => {
                  setSearchInput('');
                  const newParams = new URLSearchParams(searchParams);
                  newParams.delete('q');
                  setSearchParams(newParams);
                }}
                className="p-1.5 text-slate-400 hover:text-slate-600 mr-2"
              >
                <X className="w-4 h-4" />
              </button>
            )}
            <button
              type="submit"
              className="px-6 py-2.5 rounded-full bg-[#1565C0] hover:bg-blue-700 text-white font-semibold text-sm transition-all shadow-sm shrink-0 cursor-pointer"
            >
              Buscar
            </button>
          </div>
        </form>

        {/* Barra de Filtros y Categorías Tabs */}
        <div className="space-y-4 mb-8">
          {/* Pills de categorías */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            <button
              onClick={() => handleCategoryChange('')}
              className={`px-4 py-2 rounded-full text-xs md:text-sm font-bold whitespace-nowrap transition-all cursor-pointer ${
                categoriaSlug === ''
                  ? 'bg-[#0D47A1] text-white shadow-sm'
                  : 'bg-white border border-slate-200 text-slate-700 hover:border-blue-300'
              }`}
            >
              Todas las categorías
            </button>
            {categorias.map((cat) => (
              <button
                key={cat._id}
                onClick={() => handleCategoryChange(cat.slug)}
                className={`px-4 py-2 rounded-full text-xs md:text-sm font-bold whitespace-nowrap transition-all cursor-pointer ${
                  categoriaSlug === cat.slug
                    ? 'bg-[#0D47A1] text-white shadow-sm'
                    : 'bg-white border border-slate-200 text-slate-700 hover:border-blue-300'
                }`}
              >
                {cat.nombre}
              </button>
            ))}
          </div>

          {/* Filtros secundarios: Modalidad y Costo */}
          <div className="flex flex-wrap items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-slate-200">
            <div className="flex flex-wrap items-center gap-3">
              <span className="text-xs font-bold text-slate-500 uppercase flex items-center gap-1">
                <Filter className="w-3.5 h-3.5" />
                Filtros:
              </span>

              <select
                value={modalidad}
                onChange={(e) => setModalidad(e.target.value as ModalidadTramite | '')}
                className="text-xs font-medium bg-slate-50 border border-slate-200 rounded-full px-3 py-1.5 text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#1565C0]"
              >
                <option value="">Modalidad: Todas</option>
                <option value="Presencial">Presencial</option>
                <option value="En Línea">En Línea</option>
                <option value="Mixto">Mixto</option>
              </select>

              <select
                value={costoTipo}
                onChange={(e) => setCostoTipo(e.target.value as TipoCostoTramite | '')}
                className="text-xs font-medium bg-slate-50 border border-slate-200 rounded-full px-3 py-1.5 text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#1565C0]"
              >
                <option value="">Costo: Todos</option>
                <option value="Gratuito">Gratuito</option>
                <option value="Con Costo">Con Costo</option>
              </select>

              {(search || categoriaSlug || modalidad || costoTipo) && (
                <button
                  onClick={clearFilters}
                  className="text-xs font-semibold text-rose-600 hover:text-rose-800 transition-colors ml-2"
                >
                  Limpiar filtros
                </button>
              )}
            </div>

            <div className="text-xs text-slate-500">
              Mostrando <strong className="text-slate-900">{filteredTramites.length}</strong> trámites
            </div>
          </div>
        </div>

        {/* Loading state */}
        {loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <div key={n} className="bg-white border border-slate-200 rounded-3xl p-6 animate-pulse space-y-4">
                <div className="h-4 bg-slate-200 rounded-full w-1/4" />
                <div className="h-6 bg-slate-200 rounded-full w-3/4" />
                <div className="h-16 bg-slate-100 rounded-2xl w-full" />
              </div>
            ))}
          </div>
        )}

        {/* Empty state */}
        {!loading && filteredTramites.length === 0 && (
          <div className="text-center py-16 bg-white rounded-3xl border border-slate-200 p-8 max-w-xl mx-auto">
            <div className="w-16 h-16 rounded-full bg-blue-50 text-[#1565C0] flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">
              No encontramos trámites que coincidan
            </h3>
            <p className="text-sm text-slate-500 mb-6">
              Probá usando términos más simples como "cédula", "salud", "trabajo" o limpiá los filtros seleccionados.
            </p>
            <button
              onClick={clearFilters}
              className="px-6 py-2.5 rounded-full bg-[#1565C0] text-white font-semibold text-sm hover:bg-blue-700 transition-colors"
            >
              Restablecer catálogo
            </button>
          </div>
        )}

        {/* Grid de Trámites */}
        {!loading && filteredTramites.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTramites.map((item) => (
              <div
                key={item._id}
                className="group bg-white rounded-3xl p-6 border border-slate-200/90 shadow-xs hover:shadow-md hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Badges de cabecera */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-blue-50 text-[#0D47A1] border border-blue-100/80">
                      {item.modalidad || 'Presencial'}
                    </span>
                    <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full ${
                      item.costo?.tipo === 'Gratuito' ? 'bg-emerald-50 text-emerald-700' : 'bg-slate-100 text-slate-600'
                    }`}>
                      {item.costo?.tipo || 'Gratuito'}
                    </span>
                  </div>

                  {/* Título */}
                  <h3 className="text-xl font-bold text-slate-900 group-hover:text-[#0D47A1] transition-colors mb-2 line-clamp-2">
                    {item.titulo}
                  </h3>

                  {/* Descripción */}
                  <p className="text-slate-600 text-xs md:text-sm leading-relaxed mb-4 line-clamp-3 font-normal">
                    {item.descripcion}
                  </p>

                  {/* Palabras clave chips */}
                  {item.palabrasClave && item.palabrasClave.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {item.palabrasClave.slice(0, 3).map((tag, idx) => (
                        <span
                          key={idx}
                          className="inline-flex items-center gap-1 text-[10px] font-medium px-2 py-0.5 rounded-md bg-slate-50 text-slate-500 border border-slate-100"
                        >
                          <Tag className="w-2.5 h-2.5 text-slate-400" />
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Footer de tarjeta */}
                <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    <span className="line-clamp-1">{item.tiempoEstimado || '15 min aprox.'}</span>
                  </div>

                  <Link
                    to={`/tramites/${item.slug}`}
                    className="inline-flex items-center gap-1 font-bold text-[#1565C0] group-hover:text-blue-800 transition-colors shrink-0"
                  >
                    <span>Ver detalle</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>

      {isAdmin && (
        <AdminTramiteModal
          isOpen={isAdminModalOpen}
          onClose={() => setIsAdminModalOpen(false)}
          tramiteToEdit={null}
          onSuccess={(newTramite) => {
            setTramites((prev) => [newTramite, ...prev]);
          }}
        />
      )}
    </div>
  );
}

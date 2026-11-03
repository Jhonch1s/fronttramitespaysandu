import React, { useEffect, useState, useCallback } from 'react';
import { 
  getTramites, 
  getCategorias, 
} from './services/api';
import type { Categoria, ModalidadTramite, TipoCostoTramite } from './types';
import type {GetTramitesParams, 
  PaginatedTramitesResponse } from './services/api'
import './App.css';

export default function App() {
  const [data, setData] = useState<PaginatedTramitesResponse | null>(null);
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Filtros
  const [search, setSearch] = useState<string>('');
  const [categoria, setCategoria] = useState<string>('');
  const [modalidad, setModalidad] = useState<ModalidadTramite | ''>('');
  const [costoTipo, setCostoTipo] = useState<TipoCostoTramite | ''>('');
  const [destacado, setDestacado] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const limit = 6;

  useEffect(() => {
    getCategorias()
      .then(setCategorias)
      .catch((err) => console.error('Error al cargar categorías:', err));
  }, []);

  const fetchTramites = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const params: GetTramitesParams = {
        page,
        limit,
        ...(categoria && { categoria }),
        ...(modalidad && { modalidad: modalidad as ModalidadTramite }),
        ...(costoTipo && { costoTipo: costoTipo as TipoCostoTramite }),
        ...(destacado && { destacado: true }),
      };

      const result = await getTramites(params);
      setData(result);
    } catch (err: any) {
      console.error(err);
      setError('Ocurrió un error al consultar la API de trámites. Verifica que el servidor esté activo.');
    } finally {
      setLoading(false);
    }
  }, [page, categoria, modalidad, costoTipo, destacado]);

  useEffect(() => {
    fetchTramites();
  }, [fetchTramites]);

  console.log(data)

  const tramitesFiltrados = Array.isArray(data?.items)
  ? data.items.filter((item) =>
      item.titulo.toLowerCase().includes(search.toLowerCase())
    )
  : [];



  return (
    <div className="tramites-container">
      <header className="tramites-header">
        <h1 className="tramites-title">Catálogo de Trámites</h1>
        <p className="tramites-subtitle">Consulta y filtra los trámites disponibles desde la API</p>
      </header>

      <div className="filters-container">
        <input
          type="text"
          placeholder="Buscar por título..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="search-input"
        />

        <div className="filter-grid">
          <select 
            value={categoria} 
            onChange={(e) => { setCategoria(e.target.value); setPage(1); }}
            className="filter-select"
          >
            <option value="">Todas las Categorías</option>
            {categorias.map((cat) => (
              <option key={cat._id} value={cat.slug || cat._id}>
                {cat.nombre}
              </option>
            ))}
          </select>

          <select 
            value={modalidad} 
            onChange={(e) => { setModalidad(e.target.value as ModalidadTramite | ''); setPage(1); }}
            className="filter-select"
          >
            <option value="">Todas las Modalidades</option>
            <option value="Presencial">Presencial</option>
            <option value="En Línea">En Línea</option>
            <option value="Mixto">Mixto</option>
          </select>

          <select 
            value={costoTipo} 
            onChange={(e) => { setCostoTipo(e.target.value as TipoCostoTramite | ''); setPage(1); }}
            className="filter-select"
          >
            <option value="">Todos los Costos</option>
            <option value="Gratuito">Gratuito</option>
            <option value="Con Costo">Con Costo</option>
            <option value="Variable">Variable</option>
          </select>

          <label className="checkbox-label">
            <input
              type="checkbox"
              checked={destacado}
              onChange={(e) => { setDestacado(e.target.checked); setPage(1); }}
            />
            Solo Destacados
          </label>
        </div>
      </div>

      {error && (
        <div className="error-box">
          <p>{error}</p>
          <button onClick={fetchTramites} className="retry-btn">Reintentar</button>
        </div>
      )}

      {loading && (
        <div className="tramites-grid">
          {[1, 2, 3, 4, 5, 6].map((n) => (
            <div key={n} className="tramite-card skeleton-card">
              <div className="skeleton-title" />
              <div className="skeleton-body" />
            </div>
          ))}
        </div>
      )}

      {!loading && !error && (
        <>
          {tramitesFiltrados.length === 0 ? (
            <div className="empty-state">No se encontraron trámites con los filtros seleccionados.</div>
          ) : (
            <div className="tramites-grid">
              {tramitesFiltrados.map((item) => (
                <div key={item._id} className="tramite-card">
                  <div className="card-header">
                    <span className="badge-modalidad">{item.modalidad || 'Presencial'}</span>
                    {item.destacado && <span className="badge-destacado">★ Destacado</span>}
                  </div>

                  <h3 className="card-title">{item.titulo}</h3>
                  <p className="card-description">{item.descripcion}</p>

                  <div className="card-footer">
                    <div>
                      <strong>Costo:</strong> {item.costo?.tipo || 'Gratuito'}
                    </div>
                    {item.tiempoEstimado && (
                      <div>
                        <strong>Duración:</strong> {item.tiempoEstimado}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          {data && data.totalPages > 1 && (
            <div className="pagination">
              <button
                disabled={page === 1}
                onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                className="page-btn"
              >
                Anterior
              </button>
              <span className="page-info">
                Página {data.page} de {data.totalPages} ({data.total} trámites)
              </span>
              <button
                disabled={page === data.totalPages}
                onClick={() => setPage((prev) => Math.min(prev + 1, data.totalPages))}
                className="page-btn"
              >
                Siguiente
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
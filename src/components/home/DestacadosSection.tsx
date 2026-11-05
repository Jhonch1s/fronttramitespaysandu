import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Clock, ArrowRight, Star, Sparkles } from 'lucide-react';
import { getTramitesDestacados } from '../../services/api';
import type { Tramite } from '../../types';

export default function DestacadosSection() {
  const [destacados, setDestacados] = useState<Tramite[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getTramitesDestacados()
      .then((data) => {
        setDestacados(data.slice(0, 6));
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="py-16 md:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 text-amber-700 text-xs font-bold mb-2">
              <Star className="w-3.5 h-3.5 fill-current text-amber-500" />
              Más consultados por jóvenes
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#0D47A1] tracking-tight">
              Trámites destacados
            </h2>
            <p className="text-base text-slate-600 mt-1">
              Las gestiones obligatorias y beneficios indispensables de Paysandú.
            </p>
          </div>

          <Link
            to="/tramites"
            className="inline-flex items-center gap-2 text-sm font-bold text-[#1565C0] hover:text-blue-800 transition-colors self-start md:self-auto"
          >
            <span>Ver catálogo completo</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Loading Skeleton */}
        {loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((n) => (
              <div key={n} className="bg-slate-50 border border-slate-200 rounded-3xl p-6 animate-pulse space-y-4">
                <div className="h-4 bg-slate-200 rounded-full w-1/3" />
                <div className="h-6 bg-slate-200 rounded-full w-3/4" />
                <div className="h-16 bg-slate-200 rounded-2xl w-full" />
              </div>
            ))}
          </div>
        )}

        {/* Trámites Grid */}
        {!loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {destacados.map((item) => (
              <div
                key={item._id}
                className="group bg-white rounded-3xl p-6 border border-slate-200/90 shadow-xs hover:shadow-md hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-blue-50 text-[#0D47A1] border border-blue-100/80">
                      {item.modalidad || 'Presencial'}
                    </span>
                    <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-slate-100 text-slate-600">
                      {item.costo?.tipo || 'Gratuito'}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-slate-900 group-hover:text-[#0D47A1] transition-colors mb-2 line-clamp-2">
                    {item.titulo}
                  </h3>

                  <p className="text-slate-600 text-xs md:text-sm leading-relaxed mb-4 line-clamp-3 font-normal">
                    {item.descripcion}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    <span>{item.tiempoEstimado || '15 min aprox.'}</span>
                  </div>

                  <Link
                    to={`/tramites/${item.slug}`}
                    className="inline-flex items-center gap-1 font-bold text-[#1565C0] group-hover:text-blue-800 transition-colors"
                  >
                    <span>Ver detalle</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Banner Motivacional */}
        <div className="mt-12 bg-gradient-to-r from-blue-900 to-[#0D47A1] rounded-3xl p-8 text-white relative overflow-hidden shadow-lg">
          <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/20 rounded-full blur-2xl" />
          <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="space-y-1 text-center sm:text-left">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-300 flex items-center justify-center sm:justify-start gap-1">
                <Sparkles className="w-3.5 h-3.5" />
                Intendencia de Paysandú & Juventud
              </span>
              <h3 className="text-2xl font-extrabold tracking-tight">
                ¿No encontrás lo que buscás?
              </h3>
              <p className="text-sm text-blue-100 max-w-xl">
                Nuestro catálogo se actualiza constantemente para sumar nuevas convocatorias, becas, cursos y trámites departamentales.
              </p>
            </div>
            <Link
              to="/tramites"
              className="px-6 py-3 rounded-full bg-white text-[#0D47A1] hover:bg-blue-50 font-bold text-sm shadow-md transition-all shrink-0"
            >
              Explorar todo el catálogo
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
}

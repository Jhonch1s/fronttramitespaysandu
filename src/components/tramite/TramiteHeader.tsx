import { Link } from 'react-router-dom';
import { Calendar, ExternalLink, Play, Clock, Edit3, Trash2 } from 'lucide-react';
import type { Tramite } from '../../types';
import paysanduHeroBg from '../../assets/paysandu-hero.webp';

interface TramiteHeaderProps {
  tramite: Tramite;
  isAdmin: boolean;
  onOpenVideo: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

export default function TramiteHeader({
  tramite,
  isAdmin,
  onOpenVideo,
  onEdit,
  onDelete
}: TramiteHeaderProps) {
  const hasVideo = !!(tramite.videos && tramite.videos.length > 0 && tramite.videos[0].urlVideo);
  const hasAgenda = !!tramite.urlAgenda;
  const hasOnline = !!tramite.urlTramiteOnline;

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-blue-100/70 via-blue-50/50 to-[#F8FAFC] pt-8 pb-12 border-b border-slate-200">
      {/* Marca de agua fotográfica sutil de Paysandú */}
      <div 
        className="absolute inset-0 opacity-15 bg-cover bg-center pointer-events-none mix-blend-overlay"
        style={{ backgroundImage: `url("${paysanduHeroBg}")` }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Migas de pan y controles admin */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-semibold text-slate-500">
            <Link to="/" className="hover:text-[#1565C0] transition-colors">Inicio</Link>
            <span>/</span>
            <Link to="/tramites" className="hover:text-[#1565C0] transition-colors">Trámites</Link>
            <span>/</span>
            <span className="text-[#0D47A1] font-bold line-clamp-1">{tramite.titulo}</span>
          </nav>

          {isAdmin && (
            <div className="flex items-center gap-2">
              <button
                onClick={onEdit}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-[#0D47A1] text-xs font-bold hover:bg-blue-100 transition-colors btn-tactile cursor-pointer"
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span>Editar Trámite</span>
              </button>
              <button
                onClick={onDelete}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-rose-50 border border-rose-200 text-rose-700 text-xs font-bold hover:bg-rose-100 transition-colors btn-tactile cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Eliminar</span>
              </button>
            </div>
          )}
        </div>

        {/* Título grande azul */}
        <div className="max-w-4xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-[#0D47A1] text-xs font-bold">
            <span>{tramite.modalidad || 'Presencial'}</span>
            <span>•</span>
            <span>{tramite.costo?.tipo || 'Gratuito'}</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0D47A1] tracking-tight leading-tight">
            {tramite.titulo}
          </h1>

          <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
            {tramite.descripcion}
          </p>
        </div>

        {/* Píldoras / Acciones rápidas de la cabecera */}
        <div className="mt-8 flex flex-wrap items-center gap-3">
          {/* 1. Agenda */}
          {hasAgenda ? (
            <a
              href={tramite.urlAgenda}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#1565C0] hover:bg-blue-700 text-white font-bold text-sm shadow-md hover:shadow-lg transition-all btn-tactile"
            >
              <Calendar className="w-4 h-4" />
              <span>Ir a la agenda oficial</span>
            </a>
          ) : (
            <button
              disabled
              title="Este trámite no dispone de agenda web oficial"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-slate-100/80 border border-dashed border-slate-300 text-slate-400 font-medium text-sm opacity-40 cursor-not-allowed select-none"
            >
              <Calendar className="w-4 h-4 text-slate-400" />
              <span>Sin agenda web</span>
            </button>
          )}

          {/* 2. Trámite en línea / Página original */}
          {hasOnline ? (
            <a
              href={tramite.urlTramiteOnline}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-white border border-slate-300 text-slate-700 hover:text-[#0D47A1] hover:border-blue-400 font-bold text-sm transition-all shadow-xs btn-tactile"
            >
              <span>Ir al trámite original</span>
              <ExternalLink className="w-4 h-4 text-slate-400" />
            </a>
          ) : (
            <button
              disabled
              title="Este trámite no se gestiona en línea"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-slate-100/80 border border-dashed border-slate-300 text-slate-400 font-medium text-sm opacity-40 cursor-not-allowed select-none"
            >
              <span>Sin página en línea</span>
              <ExternalLink className="w-4 h-4 text-slate-300" />
            </button>
          )}

          {/* 3. Video tutorial */}
          {hasVideo ? (
            <button
              onClick={onOpenVideo}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-emerald-50 border border-emerald-200 text-[#00897B] hover:bg-emerald-100 font-bold text-sm transition-all shadow-xs cursor-pointer btn-tactile"
            >
              <Play className="w-4 h-4 fill-current" />
              <span>Ver video explicativo</span>
            </button>
          ) : (
            <button
              disabled
              title="No hay video explicativo cargado para este trámite"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-slate-100/80 border border-dashed border-slate-300 text-slate-400 font-medium text-sm opacity-40 cursor-not-allowed select-none"
            >
              <Play className="w-4 h-4 text-slate-300" />
              <span>Sin video tutorial</span>
            </button>
          )}

          {/* Tiempo estimado */}
          <div className="inline-flex items-center gap-1.5 px-4 py-3 rounded-full bg-slate-100 border border-slate-200 text-slate-600 font-semibold text-xs">
            <Clock className="w-4 h-4 text-slate-400" />
            <span>{tramite.tiempoEstimado || '15 min de atención'}</span>
          </div>
        </div>

      </div>
    </section>
  );
}

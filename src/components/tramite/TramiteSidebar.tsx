import { Link } from 'react-router-dom';
import { Calendar, ExternalLink, Play, MapPin, Building, Bot, ArrowRight } from 'lucide-react';
import type { Tramite, Organizacion } from '../../types';

interface TramiteSidebarProps {
  tramite: Tramite;
  onOpenVideo: () => void;
}

export default function TramiteSidebar({ tramite, onOpenVideo }: TramiteSidebarProps) {
  const org = (typeof tramite.organismo === 'object' ? tramite.organismo : null) as Organizacion | null;
  const lugarPrincipal = tramite.lugaresAtencion?.[0];
  const video = tramite.videos?.[0];
  const hasVideo = !!(video && video.urlVideo);
  const hasAgenda = !!tramite.urlAgenda;
  const hasOnline = !!tramite.urlTramiteOnline;

  return (
    <aside className="space-y-6 sticky top-28">
      {/* Card 1: Agenda y Enlaces Oficiales */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-5">
        <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#1565C0] flex items-center justify-center font-bold">
            <Building className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900 line-clamp-1">
              {org?.nombre || 'Organismo Departamental'}
            </h3>
            <span className="text-xs text-slate-500 font-semibold">
              {org?.siglas || 'Paysandú'}
            </span>
          </div>
        </div>

        {/* Lugar y Mapa */}
        <div className="space-y-2 text-xs">
          <div className="flex items-start gap-2 text-slate-600">
            <MapPin className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
            <span>{lugarPrincipal?.direccion || 'Oficina central en Paysandú'}</span>
          </div>

          {lugarPrincipal?.mapsUrl && (
            <a
              href={lugarPrincipal.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 font-bold text-[#1565C0] hover:text-blue-800 text-xs mt-1"
            >
              <span>Ver en Google Maps</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          )}
        </div>

        {/* Acciones principales con estado transparente cuando falta el dato */}
        <div className="space-y-2.5 pt-2">
          {hasAgenda ? (
            <a
              href={tramite.urlAgenda}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 rounded-full bg-[#1565C0] hover:bg-blue-700 text-white font-bold text-xs sm:text-sm text-center flex items-center justify-center gap-2 transition-all shadow-md btn-tactile"
            >
              <Calendar className="w-4 h-4" />
              <span>Ir a la agenda oficial</span>
            </a>
          ) : (
            <button
              disabled
              title="Este trámite no cuenta con agenda web"
              className="w-full py-3 rounded-full bg-slate-100/80 border border-dashed border-slate-300 text-slate-400 font-medium text-xs sm:text-sm flex items-center justify-center gap-2 opacity-40 cursor-not-allowed select-none"
            >
              <Calendar className="w-4 h-4 text-slate-400" />
              <span>Sin agenda web oficial</span>
            </button>
          )}

          {hasOnline ? (
            <a
              href={tramite.urlTramiteOnline}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2.5 rounded-full bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 font-bold text-xs text-center flex items-center justify-center gap-1.5 transition-colors btn-tactile"
            >
              <span>Página oficial del trámite</span>
              <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
            </a>
          ) : (
            <button
              disabled
              title="No disponible para realizar en línea"
              className="w-full py-2.5 rounded-full bg-slate-100/80 border border-dashed border-slate-300 text-slate-400 font-medium text-xs flex items-center justify-center gap-1.5 opacity-40 cursor-not-allowed select-none"
            >
              <span>Sin página en línea</span>
              <ExternalLink className="w-3.5 h-3.5 text-slate-300" />
            </button>
          )}
        </div>
      </div>

      {/* Card 2: Video Explicativo */}
      {hasVideo ? (
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase">
              Video tutorial
            </span>
            <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-[#00897B]">
              Recomendado
            </span>
          </div>

          <div
            onClick={onOpenVideo}
            className="group relative rounded-2xl overflow-hidden bg-slate-900 cursor-pointer aspect-video flex items-center justify-center shadow-inner"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 to-transparent z-10" />
            <div className="relative z-20 w-12 h-12 rounded-full bg-white/95 text-[#00897B] flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
              <Play className="w-5 h-5 fill-current ml-0.5" />
            </div>
            <div className="absolute bottom-2 left-3 right-3 z-20 text-[11px] font-bold text-white truncate drop-shadow-sm">
              {video?.titulo || 'Ver tutorial en video'}
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-white/70 rounded-3xl p-5 border border-dashed border-slate-300 opacity-50 space-y-2 select-none">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-400">
            <Play className="w-4 h-4 text-slate-400" />
            <span>Sin video tutorial cargado aún</span>
          </div>
          <p className="text-[11px] text-slate-400">
            Podés seguir la guía detallada y la lista de verificación de requisitos.
          </p>
        </div>
      )}

      {/* Card 3: Asistente Virtual CTA */}
      <div className="bg-gradient-to-br from-[#0D47A1] to-[#1565C0] rounded-3xl p-6 text-white space-y-4 shadow-md">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-white/10 flex items-center justify-center backdrop-blur-sm">
            <Bot className="w-5 h-5 text-amber-300" />
          </div>
          <div>
            <h4 className="text-sm font-bold">¿Dudas con este trámite?</h4>
            <p className="text-xs text-blue-100">Consultá con el asistente guiado</p>
          </div>
        </div>

        <Link
          to={`/asistente?tramite=${tramite.slug}`}
          className="w-full py-2.5 px-4 rounded-full bg-white text-[#0D47A1] hover:bg-blue-50 font-bold text-xs flex items-center justify-center gap-2 transition-colors shadow-xs"
        >
          <span>Preguntar en el Asistente</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </aside>
  );
}

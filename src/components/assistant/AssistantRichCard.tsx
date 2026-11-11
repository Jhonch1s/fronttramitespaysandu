import { useNavigate } from 'react-router-dom';
import { 
  Calendar, 
  Play, 
  ArrowRight, 
  CheckSquare, 
  ListOrdered, 
  MapPin, 
  Globe 
} from 'lucide-react';
import type { Tramite } from '../../types';
import type { AssistantModalType } from './AssistantDetailModal';

interface AssistantRichCardProps {
  tramite: Tramite;
  onOpenModal: (type: AssistantModalType, tramite: Tramite) => void;
  onOpenVideo: (title: string, url?: string) => void;
}

export default function AssistantRichCard({
  tramite,
  onOpenModal,
  onOpenVideo
}: AssistantRichCardProps) {
  const navigate = useNavigate();

  const hasVideo = !!(tramite.videos && tramite.videos.length > 0 && tramite.videos[0].urlVideo);
  const hasAgenda = !!tramite.urlAgenda;
  const hasOnlinePage = !!tramite.urlTramiteOnline;
  const videoObj = tramite.videos?.[0];

  return (
    <div className="bg-slate-50/90 rounded-2xl p-4 sm:p-5 border border-slate-200 mt-2 space-y-3.5 shadow-xs">
      
      {/* Cabecera del Trámite */}
      <div>
        <div className="flex flex-wrap items-center gap-1.5 mb-1.5">
          <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-blue-100 text-[#0D47A1]">
            {tramite.modalidad || 'Presencial'}
          </span>
          <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-slate-200 text-slate-700">
            {tramite.costo?.tipo || 'Gratuito'}
          </span>
          {typeof tramite.categoria === 'object' && tramite.categoria?.nombre && (
            <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-100">
              {tramite.categoria.nombre}
            </span>
          )}
        </div>

        <h4 className="text-sm sm:text-base font-bold text-slate-900 leading-snug">
          {tramite.titulo}
        </h4>
        <p className="text-xs text-slate-600 mt-1 line-clamp-2 leading-relaxed">
          {tramite.descripcion}
        </p>
      </div>

      {/* Grid de Micro-Acciones (Con estados transparentes/deshabilitados si no existe el dato) */}
      <div className="grid grid-cols-2 gap-2 pt-1">
        
        {/* 1. Requisitos */}
        <button
          onClick={() => onOpenModal('requisitos', tramite)}
          className="py-2.5 px-3 rounded-xl bg-white hover:bg-emerald-50 border border-slate-200 hover:border-emerald-300 text-slate-800 hover:text-emerald-800 text-xs font-bold transition-all flex items-center justify-center gap-1.5 shadow-2xs active:scale-97 cursor-pointer"
        >
          <CheckSquare className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
          <span>Requisitos</span>
        </button>

        {/* 2. Guía paso a paso */}
        <button
          onClick={() => onOpenModal('guia', tramite)}
          className="py-2.5 px-3 rounded-xl bg-white hover:bg-blue-50 border border-slate-200 hover:border-blue-300 text-slate-800 hover:text-[#0D47A1] text-xs font-bold transition-all flex items-center justify-center gap-1.5 shadow-2xs active:scale-97 cursor-pointer"
        >
          <ListOrdered className="w-3.5 h-3.5 text-blue-600 shrink-0" />
          <span>Guía</span>
        </button>

        {/* 3. Agenda Oficial */}
        {hasAgenda ? (
          <a
            href={tramite.urlAgenda}
            target="_blank"
            rel="noopener noreferrer"
            className="py-2.5 px-3 rounded-xl bg-white hover:bg-blue-50 border border-slate-200 hover:border-blue-300 text-slate-800 hover:text-[#0D47A1] text-xs font-bold transition-all flex items-center justify-center gap-1.5 shadow-2xs active:scale-97 cursor-pointer"
          >
            <Calendar className="w-3.5 h-3.5 text-[#1565C0] shrink-0" />
            <span>Agendar cita</span>
          </a>
        ) : (
          <button
            disabled
            title="Este trámite no dispone de agenda web oficial"
            className="py-2.5 px-3 rounded-xl bg-slate-100/70 border border-dashed border-slate-300 text-slate-400 text-xs font-medium flex items-center justify-center gap-1.5 opacity-40 cursor-not-allowed select-none"
          >
            <Calendar className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span>Sin agenda</span>
          </button>
        )}

        {/* 4. Video Tutorial */}
        {hasVideo ? (
          <button
            onClick={() => onOpenVideo(videoObj?.titulo || `Tutorial: ${tramite.titulo}`, videoObj?.urlVideo)}
            className="py-2.5 px-3 rounded-xl bg-white hover:bg-purple-50 border border-slate-200 hover:border-purple-300 text-slate-800 hover:text-purple-800 text-xs font-bold transition-all flex items-center justify-center gap-1.5 shadow-2xs active:scale-97 cursor-pointer"
          >
            <Play className="w-3.5 h-3.5 text-purple-600 fill-current shrink-0" />
            <span>Ver video</span>
          </button>
        ) : (
          <button
            disabled
            title="Este trámite no cuenta con video tutorial aún"
            className="py-2.5 px-3 rounded-xl bg-slate-100/70 border border-dashed border-slate-300 text-slate-400 text-xs font-medium flex items-center justify-center gap-1.5 opacity-40 cursor-not-allowed select-none"
          >
            <Play className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span>Sin video</span>
          </button>
        )}

        {/* 5. Atención Presencial / Sedes */}
        <button
          onClick={() => onOpenModal('presencial', tramite)}
          className="py-2.5 px-3 rounded-xl bg-white hover:bg-amber-50 border border-slate-200 hover:border-amber-300 text-slate-800 hover:text-amber-800 text-xs font-bold transition-all flex items-center justify-center gap-1.5 shadow-2xs active:scale-97 cursor-pointer"
        >
          <MapPin className="w-3.5 h-3.5 text-amber-600 shrink-0" />
          <span>Sedes y Horarios</span>
        </button>

        {/* 6. Trámite en línea / Página Original */}
        {hasOnlinePage ? (
          <a
            href={tramite.urlTramiteOnline}
            target="_blank"
            rel="noopener noreferrer"
            className="py-2.5 px-3 rounded-xl bg-white hover:bg-blue-50 border border-slate-200 hover:border-blue-300 text-slate-800 hover:text-[#0D47A1] text-xs font-bold transition-all flex items-center justify-center gap-1.5 shadow-2xs active:scale-97 cursor-pointer"
          >
            <Globe className="w-3.5 h-3.5 text-[#00897B] shrink-0" />
            <span>Página original</span>
          </a>
        ) : (
          <button
            disabled
            title="No disponible en línea (trámite 100% presencial)"
            className="py-2.5 px-3 rounded-xl bg-slate-100/70 border border-dashed border-slate-300 text-slate-400 text-xs font-medium flex items-center justify-center gap-1.5 opacity-40 cursor-not-allowed select-none"
          >
            <Globe className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span>Solo presencial</span>
          </button>
        )}

      </div>

      {/* Botón Principal Ver Trámite Completo */}
      <button
        onClick={() => navigate(`/tramites/${tramite.slug}`)}
        className="w-full py-2.5 px-4 rounded-2xl bg-[#1565C0] hover:bg-blue-700 active:scale-98 text-white font-bold text-xs sm:text-sm text-center flex items-center justify-center gap-2 transition-all shadow-xs cursor-pointer"
      >
        <span>Ver ficha completa del trámite</span>
        <ArrowRight className="w-4 h-4" />
      </button>

    </div>
  );
}

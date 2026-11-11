import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  X, 
  CheckCircle2, 
  MapPin, 
  Clock, 
  Phone, 
  ExternalLink, 
  Calendar, 
  ArrowRight,
  Play,
  FileText,
  ListOrdered
} from 'lucide-react';
import type { Tramite } from '../../types';
import { getTramiteBySlug } from '../../services/api';

export type AssistantModalType = 'requisitos' | 'guia' | 'presencial' | 'video';

interface AssistantDetailModalProps {
  data: {
    type: AssistantModalType;
    tramite: Tramite;
  } | null;
  onClose: () => void;
  onOpenVideo?: (title: string, url?: string) => void;
}

export default function AssistantDetailModal({ data, onClose, onOpenVideo }: AssistantDetailModalProps) {
  const navigate = useNavigate();
  const [fetchedDetails, setFetchedDetails] = useState<Tramite | null>(null);

  const needsFetch = !!data?.tramite && (
    (!data.tramite.requisitos || data.tramite.requisitos.length === 0) ||
    (!data.tramite.pasos || data.tramite.pasos.length === 0) ||
    (!data.tramite.lugaresAtencion || data.tramite.lugaresAtencion.length === 0)
  );

  const loading = needsFetch && (!fetchedDetails || fetchedDetails.slug !== data?.tramite?.slug);

  const tramite = (fetchedDetails && fetchedDetails.slug === data?.tramite?.slug) 
    ? fetchedDetails 
    : data?.tramite;

  useEffect(() => {
    if (!data?.tramite?.slug || !needsFetch) return;

    let active = true;
    getTramiteBySlug(data.tramite.slug)
      .then((fresh) => {
        if (active && fresh) setFetchedDetails(fresh);
      })
      .catch(() => {});

    return () => {
      active = false;
    };
  }, [data?.tramite?.slug, needsFetch]);

  if (!data || !tramite) return null;

  const type = data.type;
  const videoObj = tramite.videos?.[0];

  const getHeaderInfo = () => {
    switch (type) {
      case 'requisitos':
        return {
          tag: 'Requisitos Indispensables',
          icon: FileText,
          tagColor: 'text-[#00897B] bg-emerald-50 border-emerald-200'
        };
      case 'guia':
        return {
          tag: 'Paso a Paso Oficial',
          icon: ListOrdered,
          tagColor: 'text-[#1565C0] bg-blue-50 border-blue-200'
        };
      case 'presencial':
        return {
          tag: 'Atención Presencial y Horarios',
          icon: MapPin,
          tagColor: 'text-amber-700 bg-amber-50 border-amber-200'
        };
      case 'video':
        return {
          tag: 'Video Tutorial Explicativo',
          icon: Play,
          tagColor: 'text-purple-700 bg-purple-50 border-purple-200'
        };
    }
  };

  const header = getHeaderInfo();
  const HeaderIcon = header.icon;

  const sedesList = tramite.lugaresAtencion && tramite.lugaresAtencion.length > 0
    ? tramite.lugaresAtencion
    : (typeof tramite.organismo === 'object' && tramite.organismo?.sedes)
      ? tramite.organismo.sedes.map((s, i) => ({
          _id: s._id || `sede-${i}`,
          nombreLugar: s.nombreSede,
          direccion: s.direccion,
          horario: s.horario,
          mapsUrl: s.mapsUrl,
          telefono: s.telefono
        }))
      : [];

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in"
      role="dialog"
      aria-modal="true"
    >
      <div className="relative w-full max-w-xl bg-white rounded-3xl p-6 sm:p-7 shadow-2xl border border-slate-200 flex flex-col max-h-[85vh] overflow-hidden">
        
        {/* Cabecera del modal */}
        <div className="flex items-start justify-between pb-4 border-b border-slate-100 shrink-0">
          <div className="pr-4">
            <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full border text-xs font-bold uppercase tracking-wider mb-2 ${header.tagColor}`}>
              <HeaderIcon className="w-3.5 h-3.5" />
              <span>{header.tag}</span>
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-slate-900 leading-snug">
              {tramite.titulo}
            </h3>
          </div>
          <button
            onClick={onClose}
            aria-label="Cerrar ventana"
            className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-full transition-colors cursor-pointer shrink-0"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Contenido con scroll dinámico */}
        <div className="py-4 overflow-y-auto flex-1 space-y-3 pr-1">
          {loading && (
            <div className="py-8 text-center space-y-2">
              <div className="w-8 h-8 border-3 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto" />
              <p className="text-xs text-slate-500 font-semibold">Cargando detalles específicos...</p>
            </div>
          )}

          {/* VISTA 1: REQUISITOS */}
          {!loading && type === 'requisitos' && (
            <div className="space-y-2.5">
              {tramite.requisitos && tramite.requisitos.length > 0 ? (
                tramite.requisitos.map((req, idx) => (
                  <div key={idx} className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-[#00897B] shrink-0 mt-0.5" />
                    <div className="flex-1 text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
                      <span>{req.descripcion}</span>
                      {req.esObligatorio && (
                        <span className="ml-2 text-[10px] font-bold px-2 py-0.5 rounded bg-rose-100 text-rose-700 uppercase">
                          Obligatorio
                        </span>
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-4 rounded-2xl bg-blue-50 border border-blue-200 text-blue-900 text-xs sm:text-sm">
                  <p className="font-semibold mb-1">Requisitos generales para este trámite:</p>
                  <p className="text-slate-600">Presentar Cédula de Identidad uruguaya vigente y constancias emitidas por la institución correspondiente.</p>
                </div>
              )}
            </div>
          )}

          {/* VISTA 2: GUÍA PASO A PASO */}
          {!loading && type === 'guia' && (
            <div className="space-y-3">
              {tramite.pasos && tramite.pasos.length > 0 ? (
                tramite.pasos.map((paso, idx) => (
                  <div key={idx} className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex items-start gap-3.5">
                    <div className="w-6 h-6 rounded-full bg-[#1565C0] text-white text-xs font-bold flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
                      {paso.numeroPaso || idx + 1}
                    </div>
                    <div className="flex-1">
                      <h4 className="text-xs sm:text-sm font-bold text-slate-900">{paso.tituloPaso}</h4>
                      <p className="text-xs text-slate-600 mt-1 leading-relaxed">{paso.descripcionPaso}</p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-4 rounded-2xl bg-blue-50 border border-blue-200 text-blue-900 text-xs sm:text-sm">
                  <p className="font-semibold mb-1">Pasos básicos:</p>
                  <ol className="list-decimal list-inside space-y-1 text-slate-600">
                    <li>Revisá contar con los requisitos solicitados.</li>
                    <li>Concurrí a la oficina de atención o completá la gestión en el portal digital.</li>
                  </ol>
                </div>
              )}
            </div>
          )}

          {/* VISTA 3: ATENCIÓN PRESENCIAL */}
          {!loading && type === 'presencial' && (
            <div className="space-y-3">
              {sedesList.length > 0 ? (
                sedesList.map((sede, idx) => (
                  <div key={idx} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2.5">
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                        <MapPin className="w-4 h-4 text-[#00897B] shrink-0" />
                        <span>{sede.nombreLugar}</span>
                      </h4>
                      {sede.mapsUrl && (
                        <a
                          href={sede.mapsUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[11px] font-bold text-[#1565C0] hover:underline inline-flex items-center gap-1 shrink-0 bg-blue-50 px-2.5 py-1 rounded-full border border-blue-100"
                        >
                          <span>Ver en mapa</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      )}
                    </div>

                    <p className="text-xs text-slate-600 leading-relaxed font-medium">
                      {sede.direccion}
                    </p>

                    <div className="flex flex-wrap gap-x-4 gap-y-1.5 pt-1 text-xs text-slate-500 border-t border-slate-200/60">
                      {sede.horario && (
                        <div className="flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5 text-slate-400" />
                          <span>{sede.horario}</span>
                        </div>
                      )}
                      {(sede.telefono || (typeof tramite.organismo === 'object' && tramite.organismo?.contacto?.telefono)) && (
                        <div className="flex items-center gap-1.5">
                          <Phone className="w-3.5 h-3.5 text-slate-400" />
                          <span>{sede.telefono || (tramite.organismo as any)?.contacto?.telefono}</span>
                        </div>
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                  <div className="flex items-center gap-2 font-bold text-slate-800 text-sm">
                    <MapPin className="w-4 h-4 text-[#00897B]" />
                    <span>Oficinas Centrales en Paysandú</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Atención al ciudadano en Palacio Municipal (18 de Julio y Zorrilla de San Martín) de Lunes a Viernes de 07:00 a 17:00 hs. Teléfono: 4722 6220.
                  </p>
                </div>
              )}
            </div>
          )}

          {/* VISTA 4: VIDEO TUTORIAL */}
          {!loading && type === 'video' && (
            <div className="space-y-4">
              {videoObj?.urlVideo ? (
                <div className="space-y-3">
                  <div className="p-3 bg-purple-50 rounded-2xl border border-purple-100 flex items-center justify-between">
                    <div>
                      <div className="text-xs font-bold text-purple-900">{videoObj.titulo || 'Tutorial guiado'}</div>
                      <div className="text-[11px] text-purple-700">Video oficial verificado</div>
                    </div>
                    <button
                      onClick={() => {
                        onClose();
                        onOpenVideo?.(videoObj.titulo || `Tutorial: ${tramite.titulo}`, videoObj.urlVideo);
                      }}
                      className="px-3.5 py-1.5 rounded-full bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs flex items-center gap-1.5 cursor-pointer shadow-xs"
                    >
                      <Play className="w-3.5 h-3.5 fill-current" />
                      <span>Reproducir</span>
                    </button>
                  </div>

                  <p className="text-xs text-slate-500">
                    Hacé clic en reproducir para ver el tutorial audiovisual sin salir de la plataforma.
                  </p>
                </div>
              ) : (
                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 text-center space-y-2">
                  <Play className="w-8 h-8 text-slate-300 mx-auto" />
                  <p className="text-xs font-bold text-slate-700">Este trámite aún no cuenta con video tutorial</p>
                  <p className="text-[11px] text-slate-500">Podés consultar la guía paso a paso y los requisitos documentales.</p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Botones inferiores */}
        <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2 shrink-0">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs transition-colors cursor-pointer"
          >
            Cerrar
          </button>

          <div className="flex items-center gap-2">
            {tramite.urlAgenda && (
              <a
                href={tramite.urlAgenda}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs inline-flex items-center gap-1.5 transition-colors shadow-xs"
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>Agendar Cita</span>
              </a>
            )}

            <button
              onClick={() => {
                const slug = tramite.slug;
                onClose();
                navigate(`/tramites/${slug}`);
              }}
              className="px-5 py-2 rounded-full bg-[#1565C0] hover:bg-blue-700 text-white font-bold text-xs transition-colors shadow-xs flex items-center gap-1.5 cursor-pointer"
            >
              <span>Ver ficha completa</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}

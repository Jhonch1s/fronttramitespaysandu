import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  Calendar, 
  ExternalLink, 
  Play, 
  Clock, 
  CheckCircle2, 
  MapPin, 
  ChevronDown, 
  ChevronUp, 
  FileText, 
  Bot, 
  AlertCircle,
  Building,
  Info,
  DollarSign
} from 'lucide-react';
import { getTramiteBySlug } from '../services/api';
import type { Tramite, Organizacion } from '../types';
import VideoModal from '../components/common/VideoModal';

export default function TramiteDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [tramite, setTramite] = useState<Tramite | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Estados interactivos
  const [checkedRequisitos, setCheckedRequisitos] = useState<Record<number, boolean>>({});
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  useEffect(() => {
    if (!slug) return;
    setLoading(true);
    getTramiteBySlug(slug)
      .then((data) => {
        if (data) {
          setTramite(data);
          setError(null);
        } else {
          setError('No pudimos encontrar el trámite solicitado.');
        }
      })
      .catch((err) => {
        console.error(err);
        setError('Ocurrió un error al cargar los datos del trámite.');
      })
      .finally(() => setLoading(false));
  }, [slug]);

  const toggleCheck = (idx: number) => {
    setCheckedRequisitos((prev) => ({
      ...prev,
      [idx]: !prev[idx],
    }));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] py-16 flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-sm font-semibold text-slate-500">Cargando detalles del trámite...</p>
        </div>
      </div>
    );
  }

  if (error || !tramite) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] py-16 px-4">
        <div className="max-w-xl mx-auto bg-white rounded-3xl p-8 border border-slate-200 text-center space-y-4 shadow-sm">
          <AlertCircle className="w-12 h-12 text-rose-500 mx-auto" />
          <h2 className="text-2xl font-bold text-slate-900">Trámite no encontrado</h2>
          <p className="text-slate-600 text-sm">
            {error || 'El trámite al que intentás acceder no existe o fue reubicado.'}
          </p>
          <div className="pt-4 flex justify-center gap-3">
            <Link
              to="/tramites"
              className="px-6 py-2.5 rounded-full bg-[#1565C0] text-white font-semibold text-sm hover:bg-blue-700 transition-colors"
            >
              Volver al catálogo
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const organismoObj = (typeof tramite.organismo === 'object' ? tramite.organismo : null) as Organizacion | null;
  const lugarPrincipal = tramite.lugaresAtencion?.[0];
  const videoPrincipal = tramite.videos?.[0];

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-20">
      
      {/* Header del Trámite con fondo difuminado de Paysandú */}
      <section className="relative overflow-hidden bg-gradient-to-b from-blue-100/70 via-blue-50/50 to-[#F8FAFC] pt-8 pb-12 border-b border-slate-200">
        
        {/* Marca de agua fotográfica sutil de la Costanera / Letras PAYSANDÚ */}
        <div 
          className="absolute inset-0 opacity-10 bg-cover bg-center pointer-events-none mix-blend-overlay"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200&q=80')`
          }}
        />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Migas de pan */}
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-semibold text-slate-500 mb-6">
            <Link to="/" className="hover:text-[#1565C0] transition-colors">Inicio</Link>
            <span>/</span>
            <Link to="/tramites" className="hover:text-[#1565C0] transition-colors">Trámites</Link>
            <span>/</span>
            <span className="text-[#0D47A1] font-bold line-clamp-1">{tramite.titulo}</span>
          </nav>

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
            {tramite.urlAgenda && (
              <a
                href={tramite.urlAgenda}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#1565C0] hover:bg-blue-700 text-white font-bold text-sm shadow-md hover:shadow-lg transition-all"
              >
                <Calendar className="w-4 h-4" />
                <span>Ir a la agenda oficial</span>
              </a>
            )}

            {tramite.urlTramiteOnline && (
              <a
                href={tramite.urlTramiteOnline}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-white border border-slate-300 text-slate-700 hover:text-[#0D47A1] hover:border-blue-400 font-bold text-sm transition-all shadow-xs"
              >
                <span>Ir al trámite oficial</span>
                <ExternalLink className="w-4 h-4 text-slate-400" />
              </a>
            )}

            <button
              onClick={() => setIsVideoModalOpen(true)}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-emerald-50 border border-emerald-200 text-[#00897B] hover:bg-emerald-100 font-bold text-sm transition-all shadow-xs cursor-pointer"
            >
              <Play className="w-4 h-4 fill-current" />
              <span>Ver video explicativo</span>
            </button>

            <div className="inline-flex items-center gap-1.5 px-4 py-3 rounded-full bg-slate-100 border border-slate-200 text-slate-600 font-semibold text-xs">
              <Clock className="w-4 h-4 text-slate-400" />
              <span>Tiempo estimado de lectura: 5 min</span>
            </div>
          </div>

        </div>
      </section>

      {/* Disposición a Dos Columnas (Grid 8/4) */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* ========================================================= */}
          {/* COLUMNA PRINCIPAL (Izquierda - 8 columnas) */}
          {/* ========================================================= */}
          <div className="lg:col-span-8 space-y-8">
            
            {/* 1. ¿Qué necesitás? (Checklist interactivo de Requisitos y Documentos) */}
            <section className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
                    <CheckCircle2 className="w-6 h-6 text-[#00897B]" />
                    ¿Qué necesitás?
                  </h2>
                  <p className="text-xs text-slate-500 mt-1">
                    Marcá en la lista los documentos que ya tenés a mano antes de ir.
                  </p>
                </div>
                <span className="text-xs font-bold px-3 py-1 rounded-full bg-blue-50 text-[#0D47A1]">
                  Checklist Ágil
                </span>
              </div>

              {/* Lista de Requisitos */}
              <div className="space-y-3">
                {tramite.requisitos && tramite.requisitos.length > 0 ? (
                  tramite.requisitos.map((req, idx) => (
                    <div
                      key={idx}
                      onClick={() => toggleCheck(idx)}
                      className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-start gap-3.5 ${
                        checkedRequisitos[idx]
                          ? 'bg-emerald-50/60 border-emerald-200 text-emerald-900'
                          : 'bg-slate-50/70 border-slate-200 hover:border-blue-300 text-slate-800'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={!!checkedRequisitos[idx]}
                        onChange={() => {}}
                        className="mt-1 w-5 h-5 rounded-md text-[#00897B] focus:ring-[#00897B] border-slate-300 cursor-pointer"
                      />
                      <div className="flex-1 text-sm font-medium leading-relaxed">
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
                  <p className="text-sm text-slate-500">No se detallaron requisitos previos.</p>
                )}
              </div>

              {/* Documentación a presentar */}
              {tramite.documentacion && tramite.documentacion.length > 0 && (
                <div className="mt-8 pt-6 border-t border-slate-100">
                  <h3 className="text-base font-bold text-slate-900 mb-3 flex items-center gap-2">
                    <FileText className="w-4 h-4 text-[#1565C0]" />
                    Documentación física a presentar
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {tramite.documentacion.map((doc, idx) => (
                      <div key={idx} className="p-3.5 rounded-2xl bg-white border border-slate-200 shadow-2xs">
                        <div className="text-xs font-bold text-slate-900">{doc.nombreDocumento}</div>
                        {doc.descripcion && (
                          <div className="text-xs text-slate-500 mt-1">{doc.descripcion}</div>
                        )}
                        <div className="text-[10px] font-semibold text-[#1565C0] mt-2">
                          Formato: {doc.formatoPermitido || 'Original'}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </section>

            {/* 2. Información del trámite (Ficha con métricas clave) */}
            <section className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm">
              <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                <Info className="w-6 h-6 text-[#1565C0]" />
                Información del trámite
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Costo */}
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                  <div className="flex items-center gap-2 text-slate-500 text-xs font-semibold mb-1">
                    <DollarSign className="w-4 h-4 text-emerald-600" />
                    <span>Costo</span>
                  </div>
                  <div className="text-lg font-bold text-slate-900">
                    {tramite.costo?.monto || tramite.costo?.tipo || 'Gratuito'}
                  </div>
                  {tramite.costo?.detalles && (
                    <div className="text-xs text-slate-500 mt-1">{tramite.costo.detalles}</div>
                  )}
                </div>

                {/* Vigencia / Duración */}
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                  <div className="flex items-center gap-2 text-slate-500 text-xs font-semibold mb-1">
                    <Clock className="w-4 h-4 text-[#1565C0]" />
                    <span>Tiempo de gestión</span>
                  </div>
                  <div className="text-lg font-bold text-slate-900">
                    {tramite.tiempoEstimado || 'En el día'}
                  </div>
                  <div className="text-xs text-slate-500 mt-1">Tiempo promedio de atención</div>
                </div>

                {/* Modalidad */}
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                  <div className="flex items-center gap-2 text-slate-500 text-xs font-semibold mb-1">
                    <Building className="w-4 h-4 text-indigo-600" />
                    <span>Modalidad</span>
                  </div>
                  <div className="text-lg font-bold text-slate-900">
                    {tramite.modalidad || 'Presencial'}
                  </div>
                  <div className="text-xs text-slate-500 mt-1">
                    {tramite.modalidad === 'Mixto' ? 'Se inicia en línea y finaliza presencial' : 'Trámite directo'}
                  </div>
                </div>

                {/* Dirigido a */}
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                  <div className="flex items-center gap-2 text-slate-500 text-xs font-semibold mb-1">
                    <Info className="w-4 h-4 text-amber-600" />
                    <span>Dirigido a</span>
                  </div>
                  <div className="text-sm font-bold text-slate-900 line-clamp-2">
                    {tramite.dirigidoA || 'Jóvenes de 18 a 25 años en Paysandú'}
                  </div>
                </div>
              </div>
            </section>

            {/* 3. Guía del trámite (Pasos a seguir ordenados) */}
            <section className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">
                Guía paso a paso
              </h2>

              <div className="relative pl-6 space-y-8 before:absolute before:left-3 before:top-3 before:bottom-3 before:w-0.5 before:bg-blue-200">
                {tramite.pasos && tramite.pasos.length > 0 ? (
                  tramite.pasos.map((paso, idx) => (
                    <div key={idx} className="relative group">
                      {/* Número circular */}
                      <div className="absolute -left-6 top-0 w-6 h-6 rounded-full bg-[#1565C0] text-white text-xs font-bold flex items-center justify-center ring-4 ring-white shadow-xs">
                        {paso.numeroPaso || idx + 1}
                      </div>

                      <div className="pl-4">
                        <h3 className="text-lg font-bold text-slate-900 group-hover:text-[#0D47A1] transition-colors">
                          {paso.tituloPaso}
                        </h3>
                        <p className="text-slate-600 text-sm leading-relaxed mt-1 font-normal">
                          {paso.descripcionPaso}
                        </p>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-slate-500">Pasos no especificados.</p>
                )}
              </div>
            </section>

            {/* 4. Preguntas Frecuentes (Acordeones interactivos) */}
            {tramite.preguntasFrecuentes && tramite.preguntasFrecuentes.length > 0 && (
              <section className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm">
                <h2 className="text-2xl font-bold text-slate-900 mb-6">
                  Preguntas frecuentes
                </h2>

                <div className="space-y-3">
                  {tramite.preguntasFrecuentes.map((faq, idx) => (
                    <div
                      key={idx}
                      className="border border-slate-200 rounded-2xl overflow-hidden transition-colors"
                    >
                      <button
                        onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                        className="w-full text-left p-4 sm:p-5 flex items-center justify-between gap-4 bg-slate-50/60 hover:bg-slate-100/60 transition-colors cursor-pointer"
                      >
                        <span className="font-bold text-slate-900 text-sm sm:text-base">
                          {faq.pregunta}
                        </span>
                        {openFaq === idx ? (
                          <ChevronUp className="w-5 h-5 text-slate-500 shrink-0" />
                        ) : (
                          <ChevronDown className="w-5 h-5 text-slate-500 shrink-0" />
                        )}
                      </button>

                      {openFaq === idx && (
                        <div className="p-4 sm:p-5 bg-white text-sm text-slate-600 leading-relaxed border-t border-slate-100">
                          {faq.respuesta}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            )}

          </div>

          {/* ========================================================= */}
          {/* COLUMNA LATERAL (Derecha - Sidebar Sticky - 4 columnas) */}
          {/* ========================================================= */}
          <aside className="lg:col-span-4 space-y-6 lg:sticky lg:top-28">
            
            {/* Card 1: Agenda y Enlaces Oficiales */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-5">
              <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
                <div className="w-12 h-12 rounded-2xl bg-blue-50 text-[#0D47A1] flex items-center justify-center">
                  <Calendar className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-base">Agenda y Enlaces</h3>
                  <p className="text-xs text-slate-500">Canales oficiales de Paysandú</p>
                </div>
              </div>

              <div className="space-y-3 text-xs text-slate-600">
                <div>
                  <strong className="text-slate-900 block mb-0.5">Organismo responsable:</strong>
                  <span>{organismoObj?.nombre || 'Intendencia Departamental de Paysandú'}</span>
                </div>

                {lugarPrincipal && (
                  <div>
                    <strong className="text-slate-900 block mb-0.5">Lugar de atención:</strong>
                    <span>{lugarPrincipal.nombreLugar}</span>
                    <div className="text-slate-500">{lugarPrincipal.direccion}</div>
                    <a
                      href={lugarPrincipal.mapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-[#1565C0] font-bold mt-1 hover:underline"
                    >
                      <MapPin className="w-3.5 h-3.5" />
                      Ver en Google Maps
                    </a>
                  </div>
                )}

                {lugarPrincipal?.horario && (
                  <div>
                    <strong className="text-slate-900 block mb-0.5">Horario de atención:</strong>
                    <span>{lugarPrincipal.horario}</span>
                  </div>
                )}
              </div>

              <div className="space-y-2 pt-2">
                {tramite.urlAgenda && (
                  <a
                    href={tramite.urlAgenda}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3 px-4 rounded-full bg-[#1565C0] hover:bg-blue-700 text-white font-bold text-xs sm:text-sm text-center flex items-center justify-center gap-2 transition-all shadow-sm"
                  >
                    <Calendar className="w-4 h-4" />
                    Ir a la agenda oficial
                  </a>
                )}

                {organismoObj?.sitioWeb && (
                  <a
                    href={organismoObj.sitioWeb}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2.5 px-4 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs text-center flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <span>Sitio oficial organismo</span>
                    <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
                  </a>
                )}
              </div>
            </div>

            {/* Card 2: Video Explicativo */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
              <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
                <Play className="w-4 h-4 text-emerald-600 fill-current" />
                Video explicativo
              </h3>

              <div 
                onClick={() => setIsVideoModalOpen(true)}
                className="relative rounded-2xl overflow-hidden aspect-video bg-slate-900 group cursor-pointer shadow-inner"
              >
                <img
                  src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=600&q=80"
                  alt="Miniatura del video explicativo"
                  className="w-full h-full object-cover opacity-75 group-hover:opacity-90 group-hover:scale-105 transition-all duration-300"
                />
                
                {/* Play Button Overlay */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-white/90 text-[#0D47A1] flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                    <Play className="w-5 h-5 fill-current ml-0.5" />
                  </div>
                </div>

                {/* Duration Badge */}
                <div className="absolute bottom-2.5 right-2.5 px-2 py-0.5 rounded-md bg-black/80 text-white text-[11px] font-bold">
                  2:15
                </div>
              </div>

              <button
                onClick={() => setIsVideoModalOpen(true)}
                className="w-full py-2.5 rounded-full border border-slate-200 hover:border-blue-400 text-slate-700 hover:text-[#0D47A1] font-bold text-xs transition-colors cursor-pointer"
              >
                Ver video tutorial
              </button>
            </div>

            {/* Card 3: Asistente Virtual Widget Compacto */}
            <div className="bg-gradient-to-br from-blue-50 to-white rounded-3xl p-6 border border-blue-200 shadow-sm space-y-4">
              <div className="flex items-center gap-3">
                <div className="relative w-11 h-11 rounded-2xl bg-[#0D47A1] text-white flex items-center justify-center shadow-md">
                  <Bot className="w-6 h-6" />
                  <span className="absolute -top-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-500 border-2 border-white" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">¿Tenés dudas?</h4>
                  <p className="text-xs text-slate-500">Consultá sobre este trámite</p>
                </div>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed">
                El Asistente Paysandú Joven puede responderte sobre requisitos específicos, excepciones y alternativas.
              </p>

              <button
                onClick={() => navigate(`/asistente?tramite=${tramite.slug}`)}
                className="w-full py-2.5 rounded-full bg-[#1565C0] hover:bg-blue-700 text-white font-bold text-xs text-center flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-xs"
              >
                <Bot className="w-4 h-4" />
                Consultar al asistente
              </button>
            </div>

          </aside>

        </div>
      </main>

      {/* Modal Video Player */}
      <VideoModal
        isOpen={isVideoModalOpen}
        onClose={() => setIsVideoModalOpen(false)}
        title={videoPrincipal?.titulo || `Tutorial: ${tramite.titulo}`}
        videoUrl={videoPrincipal?.urlVideo}
      />

    </div>
  );
}

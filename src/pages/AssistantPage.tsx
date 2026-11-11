import { useState, useEffect, useRef } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { 
  Bot, 
  RotateCcw, 
  Sparkles, 
  ChevronRight,
  Layers,
  ArrowRight,
  Bookmark
} from 'lucide-react';
import { mockTramites } from '../data/mockData';
import { getTramites } from '../services/api';
import type { Tramite } from '../types';
import AssistantHeaderBanner from '../components/assistant/AssistantHeaderBanner';
import AssistantGuidePanel from '../components/assistant/AssistantGuidePanel';
import AssistantRichCard from '../components/assistant/AssistantRichCard';
import AssistantDetailModal, { type AssistantModalType } from '../components/assistant/AssistantDetailModal';
import VideoModal from '../components/common/VideoModal';

interface Message {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  timestamp: string;
  richCard?: Tramite;
}

interface ChatOption {
  label: string;
  icon?: any;
  action: () => void;
}

const WELCOME_MESSAGE: Message = {
  id: 'm-welcome',
  sender: 'bot',
  text: '¡Hola! Soy tu Asistente Digital de Trámites Paysandú.\n\nElegí una de las opciones directas a continuación para guiarte al trámite exacto con sus requisitos actualizados, agenda y videos explicativos:',
  timestamp: 'Ahora'
};

function formatCurrentTime(): string {
  return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

export default function AssistantPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const messagesRef = useRef<HTMLDivElement>(null);
  const initialTramiteSlug = searchParams.get('tramite');

  const [tramitesList, setTramitesList] = useState<Tramite[]>(import.meta.env.PROD ? [] : mockTramites);

  const [messages, setMessages] = useState<Message[]>(() => {
    if (initialTramiteSlug) {
      const match = import.meta.env.PROD ? undefined : mockTramites.find((t) => t.slug === initialTramiteSlug);
      if (match) {
        return [
          WELCOME_MESSAGE,
          {
            id: `rec-${Date.now()}`,
            sender: 'bot',
            text: `Aquí tenés la ficha técnica directa de "${match.titulo}":`,
            timestamp: 'Ahora',
            richCard: match
          }
        ];
      }
    }
    return [WELCOME_MESSAGE];
  });

  // Cargar trámites desde la base de datos (con requisitos, videos y agendas actualizados)
  useEffect(() => {
    let active = true;
    getTramites({ limit: 100 })
      .then((res) => {
        if (!active || !res?.items || res.items.length === 0) return;
        setTramitesList(res.items);
        if (import.meta.env.PROD && initialTramiteSlug) {
          const match = res.items.find((t) => t.slug === initialTramiteSlug);
          if (match) {
            setMessages((prev) => prev.some((msg) => msg.richCard?.slug === match.slug) ? prev : [
              ...prev,
              { id: `rec-${match.slug}`, sender: 'bot', text: `Aquí tenés la ficha técnica directa de "${match.titulo}":`, timestamp: 'Ahora', richCard: match }
            ]);
            setCurrentStep('tramite-selected');
          }
        }

        // Actualizar tarjetas ricas en mensajes previos con los datos frescos de la BD
        setMessages((prev) => prev.map((msg) => {
          if (!msg.richCard) return msg;
          const fresh = res.items.find((t) => t.slug === msg.richCard?.slug || t._id === msg.richCard?._id);
          return fresh ? { ...msg, richCard: fresh } : msg;
        }));
      })
      .catch((err) => {
        console.warn('Asistente usando catálogo local por error de conexión:', err);
      });

    return () => { active = false; };
  }, []);

  const [isTyping, setIsTyping] = useState(false);
  const [currentStep, setCurrentStep] = useState<string>(() => {
    if (!import.meta.env.PROD && initialTramiteSlug && mockTramites.some(t => t.slug === initialTramiteSlug)) {
      return 'tramite-selected';
    }
    return 'root';
  });

  const [activeModalData, setActiveModalData] = useState<{
    type: AssistantModalType;
    tramite: Tramite;
  } | null>(null);

  const [videoModalData, setVideoModalData] = useState<{
    isOpen: boolean;
    title: string;
    url?: string;
  }>({
    isOpen: false,
    title: ''
  });

  useEffect(() => {
    messagesRef.current?.scrollTo({ top: messagesRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages, isTyping]);

  const addInteraction = (userText: string, botText: string, tramiteSlug?: string, nextStep: string = 'root') => {
    setMessages((prev) => [
      ...prev,
      {
        id: `usr-${Date.now()}`,
        sender: 'user',
        text: userText,
        timestamp: formatCurrentTime()
      }
    ]);

    setIsTyping(true);

    setTimeout(() => {
      const match = tramiteSlug 
        ? (tramitesList.find((t) => t.slug === tramiteSlug) || (!import.meta.env.PROD ? mockTramites.find((t) => t.slug === tramiteSlug) : undefined))
        : undefined;

      setMessages((prev) => [
        ...prev,
        {
          id: `bot-${Date.now()}`,
          sender: 'bot',
          text: botText,
          timestamp: formatCurrentTime(),
          richCard: match
        }
      ]);
      setIsTyping(false);
      setCurrentStep(nextStep);
    }, 300);
  };

  const handleReset = () => {
    setMessages([WELCOME_MESSAGE]);
    setCurrentStep('root');
  };

  // Opciones dinámicas según estado del chatbot
  const getOptions = (): ChatOption[] => {
    // 1. PASO: CATEGORÍAS DISPONIBLES (Dinámico desde BD)
    if (currentStep === 'categories') {
      const catMap = new Map<string, string>();
      tramitesList.forEach((t) => {
        if (typeof t.categoria === 'object' && t.categoria?.slug && t.categoria?.nombre) {
          catMap.set(t.categoria.slug, t.categoria.nombre);
        }
      });

      const catOptions: ChatOption[] = Array.from(catMap.entries()).map(([slug, name]) => ({
        label: `📂 ${name}`,
        icon: Layers,
        action: () => {
          addInteraction(
            `Quiero ver trámites de ${name}`,
            `Aquí tenés los trámites disponibles en la categoría ${name}:`,
            undefined,
            `cat:${slug}`
          );
        }
      }));

      catOptions.push({
        label: '↩ Volver al menú principal',
        icon: RotateCcw,
        action: () => setCurrentStep('root')
      });

      return catOptions;
    }

    // 2. PASO: LISTA DE TRÁMITES DE UNA CATEGORÍA ESPECÍFICA (Dinámico desde BD)
    if (currentStep.startsWith('cat:')) {
      const targetCatSlug = currentStep.replace('cat:', '');
      const filtered = tramitesList.filter((t) => {
        if (typeof t.categoria === 'object') {
          return t.categoria?.slug === targetCatSlug;
        }
        return false;
      });

      const tramiteOptions: ChatOption[] = filtered.slice(0, 8).map((t) => ({
        label: t.titulo,
        icon: Bookmark,
        action: () => addInteraction(
          `Consultar "${t.titulo}"`,
          `Guía completa de "${t.titulo}". Podés revisar requisitos, pasos y ver videos tutoriales:`,
          t.slug,
          'tramite-selected'
        )
      }));

      tramiteOptions.push(
        {
          label: '📂 Ver otras categorías',
          icon: Layers,
          action: () => setCurrentStep('categories')
        },
        {
          label: '↩ Volver al inicio',
          icon: RotateCcw,
          action: () => setCurrentStep('root')
        }
      );

      return tramiteOptions;
    }

    // 3. PASO: MENÚ PRINCIPAL ROOT (Trámites destacados y acceso por categoría)
    if (currentStep === 'root') {
      // Tomar los primeros trámites prioritarios activos de la base de datos
      const topTramites = tramitesList.slice(0, 5);

      const items: ChatOption[] = topTramites.map((t) => ({
        label: t.titulo,
        icon: Bookmark,
        action: () => addInteraction(
          `Quiero información de ${t.titulo}`,
          `Aquí tenés la ficha actualizada de "${t.titulo}":`,
          t.slug,
          'tramite-selected'
        )
      }));

      items.push(
        {
          label: 'Explorar por categoría (Salud, Educación, Trabajo, Tránsito...)',
          icon: Layers,
          action: () => {
            addInteraction(
              'Quiero ver los trámites agrupados por categoría',
              'Seleccioná la categoría que te interesa explorar:',
              undefined,
              'categories'
            );
          }
        },
        {
          label: 'Explorar todo el catálogo de trámites',
          icon: ArrowRight,
          action: () => navigate('/tramites')
        }
      );

      return items;
    }

    // 4. PASO: ACCIONES POST-SELECCIÓN DE TRÁMITE
    return [
      {
        label: 'Consultar otro trámite',
        icon: RotateCcw,
        action: () => addInteraction(
          'Quiero consultar otro trámite',
          'Perfecto. Seleccioná sobre qué otra área o trámite necesitás orientación:',
          undefined,
          'root'
        )
      },
      {
        label: 'Explorar por categoría',
        icon: Layers,
        action: () => setCurrentStep('categories')
      },
      {
        label: 'Ver todos los trámites en el catálogo',
        icon: ArrowRight,
        action: () => navigate('/tramites')
      },
      {
        label: 'Reiniciar conversación',
        icon: RotateCcw,
        action: handleReset
      }
    ];
  };

  const options = getOptions();

  // Accesos rápidos del panel lateral basados en los primeros 4 trámites cargados
  const quickGuideOptions = (tramitesList.slice(0, 4)).map((t) => ({
    label: t.titulo,
    action: () => addInteraction(
      `Quiero información de ${t.titulo}`,
      `Guía paso a paso sobre ${t.titulo}:`,
      t.slug,
      'tramite-selected'
    )
  }));

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-16">
      <AssistantHeaderBanner />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Panel Izquierdo */}
          <div className="lg:col-span-5">
            <AssistantGuidePanel quickOptions={quickGuideOptions} />
          </div>

          {/* Panel Derecho: Chatbot */}
          <div className="lg:col-span-7 bg-white rounded-3xl border border-slate-200 shadow-md flex flex-col h-[650px] overflow-hidden">
            
            {/* Header del Chat */}
            <div className="px-6 py-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-10 h-10 rounded-full bg-[#0D47A1] text-white flex items-center justify-center font-bold shadow-xs">
                    <Bot className="w-5 h-5" />
                  </div>
                  <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-white rounded-full" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900 leading-none">
                    Asistente Trámites Paysandú
                  </h3>
                  <div className="flex items-center gap-1.5 mt-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-[11px] font-semibold text-emerald-700">En línea • Guía Paso a Paso</span>
                  </div>
                </div>
              </div>

              <button
                onClick={handleReset}
                title="Reiniciar chat"
                aria-label="Reiniciar chat"
                className="p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-200/60 transition-colors cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>

            {/* Mensajes del Chat */}
            <div ref={messagesRef} className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-4 bg-slate-50/40">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'} animate-slide-up`}
                >
                  <div
                    className={`max-w-[90%] sm:max-w-[82%] rounded-3xl px-4 py-3 text-xs sm:text-sm leading-relaxed shadow-xs ${
                      msg.sender === 'user'
                        ? 'bg-[#1565C0] text-white rounded-br-xs'
                        : 'bg-white text-slate-800 border border-slate-200/90 rounded-bl-xs'
                    }`}
                  >
                    <p className="whitespace-pre-line">{msg.text}</p>
                    {msg.richCard && (
                      <AssistantRichCard
                        tramite={msg.richCard}
                        onOpenModal={(type, tr) => setActiveModalData({ type, tramite: tr })}
                        onOpenVideo={(title, url) => setVideoModalData({ isOpen: true, title, url })}
                      />
                    )}
                  </div>
                  <span className="text-[10px] text-slate-400 mt-1 px-1">
                    {msg.timestamp}
                  </span>
                </div>
              ))}

              {isTyping && (
                <div className="flex items-center gap-2 text-xs text-slate-500 bg-white border border-slate-200 p-3 rounded-2xl w-fit animate-slide-up shadow-xs">
                  <Bot className="w-4 h-4 text-[#1565C0] animate-bounce" />
                  <span>El asistente está buscando la información...</span>
                </div>
              )}


            </div>

            {/* Opciones Guiadas */}
            <div className="p-4 bg-white border-t border-slate-200 shrink-0">
              <div className="mb-2.5 flex items-center justify-between">
                <span className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#1565C0]" />
                  Seleccioná tu consulta:
                </span>
                {currentStep !== 'root' && (
                  <button
                    onClick={handleReset}
                    className="text-[11px] font-semibold text-[#1565C0] hover:underline cursor-pointer"
                  >
                    Volver al inicio
                  </button>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-48 overflow-y-auto pr-1">
                {options.map((opt, idx) => {
                  const Icon = opt.icon;
                  return (
                    <button
                      key={idx}
                      onClick={opt.action}
                      disabled={isTyping}
                      className="text-left p-3 rounded-2xl border border-slate-200 hover:border-blue-400 bg-slate-50 hover:bg-blue-50/70 text-slate-800 hover:text-[#0D47A1] text-xs font-bold transition-all flex items-center justify-between gap-2 btn-tactile cursor-pointer disabled:opacity-50 shadow-2xs"
                    >
                      <div className="flex items-center gap-2 min-w-0">
                        {Icon && <Icon className="w-3.5 h-3.5 shrink-0 text-[#1565C0]" />}
                        <span className="truncate">{opt.label}</span>
                      </div>
                      <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    </button>
                  );
                })}
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Modal de Detalle (Requisitos, Guía, Presencial, Video) */}
      <AssistantDetailModal
        data={activeModalData}
        onClose={() => setActiveModalData(null)}
        onOpenVideo={(title, url) => setVideoModalData({ isOpen: true, title, url })}
      />

      {/* Modal de Reproducción de Video */}
      <VideoModal
        isOpen={videoModalData.isOpen}
        onClose={() => setVideoModalData({ isOpen: false, title: '' })}
        title={videoModalData.title}
        videoUrl={videoModalData.url}
      />
    </div>
  );
}

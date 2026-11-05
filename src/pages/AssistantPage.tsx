import { useState, useEffect, useRef } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { 
  Bot, 
  Send, 
  Paperclip, 
  ChevronRight, 
  Sparkles, 
  Compass, 
  CheckSquare, 
  CalendarCheck, 
  Calendar, 
  Play, 
  ArrowRight,
  UserCheck,
  Stethoscope,
  Briefcase,
  GraduationCap,
  X,
  CheckCircle2,
  ListOrdered
} from 'lucide-react';
import chatbotBannerBg from '../assets/chatbot-ia.jpg';
import { mockTramites } from '../data/mockData';
import type { Tramite } from '../types';
import VideoModal from '../components/common/VideoModal';

interface Message {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  timestamp: string;
  richCard?: Tramite;
}

export default function AssistantPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const initialTramiteSlug = searchParams.get('tramite');

  // Mensajes iniciales de bienvenida sin emojis
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'm-1',
      sender: 'bot',
      text: 'Bienvenido al Asistente de Trámites Paysandú Joven.\n\nEstoy disponible para orientarte en cualquier trámite municipal, departamental o nacional que necesites realizar en Paysandú. Podés escribir tu consulta o elegir una de las opciones rápidas.',
      timestamp: 'Ahora'
    }
  ]);

  const [inputVal, setInputVal] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  // Modales interactivos para los micro-botones de la Rich Card
  const [activeModalData, setActiveModalData] = useState<{
    type: 'requisitos' | 'guia';
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

  const handleBotRecommendation = (introText: string, tramite: Tramite) => {
    setMessages((prev) => [
      ...prev,
      {
        id: `rec-${Date.now()}`,
        sender: 'bot',
        text: introText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        richCard: tramite
      }
    ]);
  };

  // Si viene con un slug en URL (ej: /asistente?tramite=cedula-de-identidad)
  useEffect(() => {
    if (initialTramiteSlug) {
      const match = mockTramites.find((t) => t.slug === initialTramiteSlug);
      if (match) {
        handleBotRecommendation(
          `Consultaste sobre el trámite: "${match.titulo}". Te preparé la ficha interactiva con todos sus requisitos y accesos directos:`,
          match
        );
      }
    }
  }, [initialTramiteSlug]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSend = (textToSend?: string) => {
    const text = (textToSend || inputVal).trim();
    if (!text) return;

    const userMsg: Message = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputVal('');
    setIsTyping(true);

    // Simular respuesta de IA
    setTimeout(() => {
      const lower = text.toLowerCase();
      let matchedTramite: Tramite | undefined;
      let replyText = '';

      if (lower.includes('cédula') || lower.includes('cedula') || lower.includes('identidad') || lower.includes('dnic') || lower.includes('18')) {
        matchedTramite = mockTramites.find((t) => t.slug === 'cedula-de-identidad');
        replyText = 'Para gestionar tu documento de identidad en Paysandú, la oficina de la DNIC está en Montecaseros 1145. Debés reservar cita previa en la agenda oficial:';
      } else if (lower.includes('salud') || lower.includes('carné') || lower.includes('carne') || lower.includes('médico') || lower.includes('medico')) {
        matchedTramite = mockTramites.find((t) => t.slug === 'carne-de-salud');
        replyText = 'Para el carné de salud laboral o estudiantil, recordá que se realiza en la Policlínica Municipal / DDS (Montecaseros 1020). Tenés que presentarte en ayunas de 8 horas:';
      } else if (lower.includes('bps') || lower.includes('trabajo') || lower.includes('empleo') || lower.includes('laboral') || lower.includes('fonasa')) {
        matchedTramite = mockTramites.find((t) => t.slug === 'inscripcion-laboral-bps');
        replyText = 'Si conseguiste trabajo o una pasantía formal, podés verificar tu alta laboral y elegir mutualista por FONASA desde el portal Mi BPS en minutos:';
      } else if (lower.includes('beca') || lower.includes('estudio') || lower.includes('estudiantil') || lower.includes('solidaridad') || lower.includes('cenur') || lower.includes('utec')) {
        matchedTramite = mockTramites.find((t) => t.slug === 'beca-estudiantil-terciaria');
        replyText = 'El Fondo de Solidaridad ofrece becas terciarias de apoyo económico mensual (~$12.000) para estudiantes de UDELAR CENUR Litoral Norte, UTEC y UTU en Paysandú:';
      } else if (lower.includes('boleto') || lower.includes('omnibus') || lower.includes('colectivo') || lower.includes('transporte')) {
        matchedTramite = mockTramites.find((t) => t.slug === 'boleto-estudiantil');
        replyText = 'La Intendencia Departamental de Paysandú otorga el boleto estudiantil 100% gratuito (50 pasajes mensuales) para estudiantes de hasta 25 años:';
      } else if (lower.includes('libreta') || lower.includes('conducir') || lower.includes('manejar') || lower.includes('auto')) {
        matchedTramite = mockTramites.find((t) => t.slug === 'primera-libreta-conducir-cat-a');
        replyText = 'Para sacar la primera libreta de conducir (Categoría A), debés tener 18 años cumplidos y presentar el examen médico en la Dirección de Tránsito (Zorrilla 1234):';
      } else {
        replyText = 'Entendido. Para esa consulta te sugiero revisar las siguientes especificaciones o explorar el catálogo de trámites departamentales:';
        matchedTramite = mockTramites[0];
      }

      setMessages((prev) => [
        ...prev,
        {
          id: `bot-${Date.now()}`,
          sender: 'bot',
          text: replyText,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          richCard: matchedTramite
        }
      ]);
      setIsTyping(false);
    }, 600);
  };

  const quickQuestions = [
    { label: 'Quiero sacar la cédula', query: 'Quiero sacar o renovar mi cédula de identidad en Paysandú' },
    { label: 'Necesito carné de salud', query: 'Necesito tramitar el carné de salud laboral o para estudiar' },
    { label: '¿Cómo me inscribo en BPS?', query: '¿Cómo me inscribo en BPS para mi primer empleo?' },
    { label: 'Busco becas o ayudas', query: 'Busco becas estudiantiles o apoyo económico para terciarios' },
  ];

  const quickInputChips = ['Cédula', 'Carné de salud', 'Trabajo', 'Becas', 'Boleto estudiantil', 'Libreta'];

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-16">
      
      {/* ========================================================= */}
      {/* BANNER SUPERIOR CON IMAGEN chatbot-ia.jpg Y TEXTO EN CIMA */}
      {/* ========================================================= */}
      <section className="relative overflow-hidden min-h-[260px] md:min-h-[300px] flex items-center mb-8 border-b border-slate-200">
        
        {/* Imagen de fondo chatbot-ia.jpg */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat z-0 transform scale-102"
          style={{ backgroundImage: `url("${chatbotBannerBg}")` }}
        />

        {/* Overlay difuminado oscuro profesional para máxima legibilidad */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-900/80 to-slate-900/40 backdrop-blur-[2px] z-10" />

        {/* Contenido sobre la imagen (en la parte izquierda) */}
        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full">
          <div className="max-w-2xl space-y-3 text-white">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-200 text-xs font-bold tracking-wide backdrop-blur-md">
              <Sparkles className="w-3.5 h-3.5 text-[#FBC02D]" />
              <span>ASISTENTE DIGITAL CIUDADANO • PAYSANDÚ</span>
            </div>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
              Asistente virtual
            </h1>

            <p className="text-sm md:text-base text-slate-200 leading-relaxed font-normal max-w-xl">
              Orientación ágil y consultas las 24 horas. Te ayudamos a encontrar el trámite exacto que necesitás, requisitos oficiales y enlaces de agenda directa.
            </p>
          </div>
        </div>

      </section>

      {/* ========================================================= */}
      {/* SPLIT VIEW LAYOUT (Diseño de Pantalla Dividida) */}
      {/* ========================================================= */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* ======================================================= */}
          {/* PANEL IZQUIERDO: Guía y Accesos Rápidos (5 columnas) */}
          {/* ======================================================= */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Tarjeta Conversá con nuestro asistente */}
            <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-sm">
              <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#0D47A1] to-[#1565C0] text-white flex items-center justify-center shadow-md">
                  <Bot className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-slate-900 leading-tight">
                    Conversá con nuestro asistente
                  </h2>
                  <p className="text-xs text-slate-500">
                    Respuestas rápidas basadas en datos departamentales
                  </p>
                </div>
              </div>

              {/* Bloque ¿Sobre qué querés consultar? */}
              <div className="mt-6">
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
                  ¿Sobre qué querés consultar?
                </h3>

                <div className="space-y-2">
                  {quickQuestions.map((q, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSend(q.query)}
                      className="w-full text-left p-3.5 rounded-2xl border border-slate-200 hover:border-blue-400 hover:bg-blue-50/50 transition-all flex items-center justify-between group bg-white shadow-2xs cursor-pointer"
                    >
                      <div className="flex items-center gap-3">
                        <span className="w-2 h-2 rounded-full bg-[#1565C0]" />
                        <span className="text-sm font-semibold text-slate-800 group-hover:text-[#0D47A1] transition-colors">
                          {q.label}
                        </span>
                      </div>
                      <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-[#0D47A1] group-hover:translate-x-1 transition-all" />
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Bloque ilustrativo de 3 pasos ("¿Cómo te ayudamos?") */}
            <div className="bg-gradient-to-br from-blue-50/80 via-white to-emerald-50/50 rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-sm space-y-4">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#00897B]" />
                ¿Cómo funciona la orientación?
              </h3>

              <div className="space-y-3">
                <div className="flex items-start gap-3 p-3 bg-white/80 rounded-2xl border border-slate-100">
                  <div className="p-2 rounded-xl bg-blue-100 text-[#0D47A1] shrink-0 mt-0.5">
                    <Compass className="w-4 h-4" />
                  </div>
                  <div className="text-xs text-slate-600">
                    <strong className="text-slate-900 block">1. Escribí tu situación</strong>
                    Explicá qué necesitás resolver y te orientamos al trámite exacto.
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 bg-white/80 rounded-2xl border border-slate-100">
                  <div className="p-2 rounded-xl bg-emerald-100 text-[#00897B] shrink-0 mt-0.5">
                    <CheckSquare className="w-4 h-4" />
                  </div>
                  <div className="text-xs text-slate-600">
                    <strong className="text-slate-900 block">2. Recibí una ficha directa</strong>
                    Con botones para requisitos, guía paso a paso, agendas y videos.
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 bg-white/80 rounded-2xl border border-slate-100">
                  <div className="p-2 rounded-xl bg-amber-100 text-amber-700 shrink-0 mt-0.5">
                    <CalendarCheck className="w-4 h-4" />
                  </div>
                  <div className="text-xs text-slate-600">
                    <strong className="text-slate-900 block">3. Turno oficial</strong>
                    Acceso con un clic a la agenda de la Intendencia, DNIC o BPS.
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* ======================================================= */}
          {/* PANEL DERECHO: Interfaz del Chatbot IA (7 columnas) */}
          {/* ======================================================= */}
          <div className="lg:col-span-7 bg-white rounded-3xl border border-slate-200 shadow-md flex flex-col h-[700px] overflow-hidden">
            
            {/* Header del chat */}
            <div className="px-6 py-4 bg-white border-b border-slate-200 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative w-10 h-10 rounded-full bg-gradient-to-tr from-[#0D47A1] to-[#1565C0] text-white flex items-center justify-center shadow-sm">
                  <Bot className="w-5 h-5" />
                  {/* Punto verde de estado "En línea" */}
                  <span className="absolute -top-0.5 -right-0.5 flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500 border-2 border-white" />
                  </span>
                </div>

                <div>
                  <h3 className="font-bold text-slate-900 text-sm leading-tight">
                    Asistente Paysandú Joven
                  </h3>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500" />
                    <span className="text-[11px] font-semibold text-emerald-700">En línea</span>
                    <span className="text-[11px] text-slate-400">• Intendencia de Paysandú</span>
                  </div>
                </div>
              </div>

              <span className="text-[11px] px-2.5 py-1 rounded-full bg-slate-100 text-slate-600 font-medium">
                IA Departamental
              </span>
            </div>

            {/* Historial de Mensajes */}
            <div className="flex-1 p-6 overflow-y-auto space-y-4 bg-slate-50/60">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
                >
                  {/* Burbuja de Texto */}
                  <div
                    className={`max-w-[85%] sm:max-w-[80%] p-4 rounded-3xl text-sm leading-relaxed shadow-xs ${
                      msg.sender === 'user'
                        ? 'bg-[#1565C0] text-white rounded-tr-xs'
                        : 'bg-white text-slate-800 border border-slate-200/90 rounded-tl-xs'
                    }`}
                  >
                    <p className="whitespace-pre-line font-medium">{msg.text}</p>
                  </div>

                  {/* Rich Card (Tarjeta Integrada en la respuesta de la IA) */}
                  {msg.richCard && (
                    <div className="mt-3 w-full max-w-md bg-white rounded-3xl p-5 border-2 border-blue-200 shadow-md space-y-4 animate-fade-in text-slate-800">
                      
                      {/* Header de la Rich Card */}
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-2xl bg-blue-50 text-[#0D47A1] flex items-center justify-center shrink-0">
                          {msg.richCard.slug.includes('cedula') ? (
                            <UserCheck className="w-5 h-5" />
                          ) : msg.richCard.slug.includes('salud') ? (
                            <Stethoscope className="w-5 h-5 text-emerald-600" />
                          ) : msg.richCard.slug.includes('bps') ? (
                            <Briefcase className="w-5 h-5 text-amber-600" />
                          ) : (
                            <GraduationCap className="w-5 h-5 text-indigo-600" />
                          )}
                        </div>

                        <div className="flex-1 min-w-0">
                          <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#1565C0] block">
                            Recomendación directa
                          </span>
                          <h4 className="text-base font-bold text-slate-900 leading-snug">
                            {msg.richCard.titulo}
                          </h4>
                        </div>
                      </div>

                      <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                        {msg.richCard.descripcion}
                      </p>

                      {/* 4 Micro-Botones Intermedios */}
                      <div className="grid grid-cols-2 gap-2 pt-1">
                        <button
                          onClick={() => setActiveModalData({ type: 'requisitos', tramite: msg.richCard! })}
                          className="py-2 px-3 rounded-xl bg-slate-50 hover:bg-blue-50 border border-slate-200 hover:border-blue-300 text-slate-700 hover:text-[#0D47A1] text-xs font-bold transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#00897B]" />
                          <span>Requisitos</span>
                        </button>

                        <button
                          onClick={() => setActiveModalData({ type: 'guia', tramite: msg.richCard! })}
                          className="py-2 px-3 rounded-xl bg-slate-50 hover:bg-blue-50 border border-slate-200 hover:border-blue-300 text-slate-700 hover:text-[#0D47A1] text-xs font-bold transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                        >
                          <ListOrdered className="w-3.5 h-3.5 text-[#1565C0]" />
                          <span>Guía</span>
                        </button>

                        {msg.richCard.urlAgenda ? (
                          <a
                            href={msg.richCard.urlAgenda}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="py-2 px-3 rounded-xl bg-slate-50 hover:bg-blue-50 border border-slate-200 hover:border-blue-300 text-slate-700 hover:text-[#0D47A1] text-xs font-bold transition-colors flex items-center justify-center gap-1.5"
                          >
                            <Calendar className="w-3.5 h-3.5 text-blue-600" />
                            <span>Agendar cita</span>
                          </a>
                        ) : (
                          <button
                            onClick={() => navigate(`/tramites/${msg.richCard!.slug}`)}
                            className="py-2 px-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-700 text-xs font-bold flex items-center justify-center gap-1.5"
                          >
                            <Calendar className="w-3.5 h-3.5 text-blue-600" />
                            <span>Presencial</span>
                          </button>
                        )}

                        <button
                          onClick={() => {
                            const vid = msg.richCard?.videos?.[0];
                            setVideoModalData({
                              isOpen: true,
                              title: vid?.titulo || `Tutorial: ${msg.richCard?.titulo}`,
                              url: vid?.urlVideo
                            });
                          }}
                          className="py-2 px-3 rounded-xl bg-slate-50 hover:bg-emerald-50 border border-slate-200 hover:border-emerald-300 text-slate-700 hover:text-emerald-700 text-xs font-bold transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                        >
                          <Play className="w-3.5 h-3.5 text-emerald-600 fill-current" />
                          <span>Ver video</span>
                        </button>
                      </div>

                      {/* Botón Principal: Ver trámite completo */}
                      <button
                        onClick={() => navigate(`/tramites/${msg.richCard!.slug}`)}
                        className="w-full py-2.5 rounded-2xl bg-[#1565C0] hover:bg-blue-700 text-white font-bold text-xs sm:text-sm text-center flex items-center justify-center gap-2 transition-all shadow-xs cursor-pointer"
                      >
                        <span>Ver trámite completo</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>

                    </div>
                  )}

                  <span className="text-[10px] text-slate-400 mt-1 px-1">
                    {msg.timestamp}
                  </span>
                </div>
              ))}

              {/* Indicador de escritura animado */}
              {isTyping && (
                <div className="flex items-center gap-2 text-xs text-slate-500 bg-white border border-slate-200 p-3 rounded-2xl w-fit">
                  <Bot className="w-4 h-4 text-[#1565C0] animate-bounce" />
                  <span>Asistente Paysandú Joven está respondiendo...</span>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Barra de Entrada de Texto (Chat Input) */}
            <div className="p-4 bg-white border-t border-slate-200">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSend();
                }}
                className="flex items-center gap-2"
              >
                {/* Clip para adjuntar */}
                <button
                  type="button"
                  aria-label="Adjuntar archivo o imagen"
                  title="Adjuntar documentación"
                  onClick={() => alert('Función de carga de documentos disponible para adjuntar cédula o constancias en formato digital.')}
                  className="p-2.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-full transition-colors cursor-pointer"
                >
                  <Paperclip className="w-5 h-5" />
                </button>

                {/* Input de texto */}
                <input
                  type="text"
                  placeholder="Escribí tu consulta aquí..."
                  value={inputVal}
                  onChange={(e) => setInputVal(e.target.value)}
                  className="flex-1 py-2.5 px-4 text-sm bg-slate-50 border border-slate-200 rounded-full text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#1565C0] focus:bg-white transition-all"
                />

                {/* Botón circular azul de enviar con icono de avión de papel */}
                <button
                  type="submit"
                  disabled={!inputVal.trim()}
                  aria-label="Enviar mensaje"
                  className="p-3 rounded-full bg-[#1565C0] text-white hover:bg-blue-700 disabled:opacity-40 disabled:hover:bg-[#1565C0] shadow-md transition-all shrink-0 cursor-pointer"
                >
                  <Send className="w-4 h-4 ml-0.5" />
                </button>
              </form>

              {/* Chips rápidos justo debajo del input */}
              <div className="flex items-center gap-1.5 overflow-x-auto pt-3 scrollbar-none">
                <span className="text-[11px] text-slate-400 font-semibold shrink-0 mr-1">
                  Sugerencias:
                </span>
                {quickInputChips.map((chip, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleSend(`Quiero información sobre ${chip}`)}
                    className="px-3 py-1 rounded-full text-xs font-medium bg-slate-100 hover:bg-blue-50 hover:text-[#0D47A1] text-slate-700 border border-slate-200/70 whitespace-nowrap transition-colors cursor-pointer"
                  >
                    {chip}
                  </button>
                ))}
              </div>
            </div>

          </div>

        </div>
      </div>

      {/* Modal Rápido para Micro-Botones: Requisitos o Guía */}
      {activeModalData && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in"
          role="dialog"
          aria-modal="true"
        >
          <div className="relative w-full max-w-lg bg-white rounded-3xl p-6 sm:p-7 shadow-2xl border border-slate-200">
            <div className="flex items-start justify-between pb-4 border-b border-slate-100">
              <div>
                <span className="text-xs font-bold text-[#1565C0] uppercase">
                  {activeModalData.type === 'requisitos' ? 'Requisitos Indispensables' : 'Guía Paso a Paso'}
                </span>
                <h3 className="text-lg font-bold text-slate-900 mt-1">
                  {activeModalData.tramite.titulo}
                </h3>
              </div>
              <button
                onClick={() => setActiveModalData(null)}
                className="p-2 text-slate-400 hover:text-slate-700 rounded-full cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="py-4 max-h-[50vh] overflow-y-auto space-y-3">
              {activeModalData.type === 'requisitos' ? (
                activeModalData.tramite.requisitos?.map((req, idx) => (
                  <div key={idx} className="p-3 rounded-2xl bg-slate-50 border border-slate-200 flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-[#00897B] shrink-0 mt-0.5" />
                    <span className="text-xs text-slate-800 leading-relaxed">{req.descripcion}</span>
                  </div>
                ))
              ) : (
                activeModalData.tramite.pasos?.map((paso, idx) => (
                  <div key={idx} className="p-3 rounded-2xl bg-slate-50 border border-slate-200 flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-[#1565C0] text-white text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                      {paso.numeroPaso || idx + 1}
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-900">{paso.tituloPaso}</div>
                      <div className="text-xs text-slate-600 mt-0.5">{paso.descripcionPaso}</div>
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className="pt-4 border-t border-slate-100 flex justify-end gap-2">
              <button
                onClick={() => setActiveModalData(null)}
                className="px-4 py-2 rounded-full bg-slate-100 text-slate-700 font-semibold text-xs cursor-pointer"
              >
                Cerrar
              </button>
              <button
                onClick={() => {
                  const slug = activeModalData.tramite.slug;
                  setActiveModalData(null);
                  navigate(`/tramites/${slug}`);
                }}
                className="px-5 py-2 rounded-full bg-[#1565C0] text-white font-bold text-xs cursor-pointer"
              >
                Ver trámite completo
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Video Modal Player */}
      <VideoModal
        isOpen={videoModalData.isOpen}
        onClose={() => setVideoModalData({ isOpen: false, title: '' })}
        title={videoModalData.title}
        videoUrl={videoModalData.url}
      />

    </div>
  );
}

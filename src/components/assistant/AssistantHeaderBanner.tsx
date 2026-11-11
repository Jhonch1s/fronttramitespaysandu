import { Sparkles } from 'lucide-react';
import chatbotBannerBg from '../../assets/chatbot-ia.jpg';

export default function AssistantHeaderBanner() {
  return (
    <section className="relative overflow-hidden min-h-[250px] md:min-h-[280px] flex items-center mb-8 border-b border-slate-200">
      {/* Imagen de fondo chatbot-ia.jpg */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat z-0 transform scale-102"
        style={{ backgroundImage: `url("${chatbotBannerBg}")` }}
      />

      {/* Overlay difuminado oscuro profesional (WCAG AAA) */}
      <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-900/80 to-slate-900/40 backdrop-blur-[2px] z-10" />

      {/* Contenido en el lado izquierdo */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full">
        <div className="max-w-2xl space-y-3 text-white">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-200 text-xs font-bold tracking-wide backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-[#FBC02D]" />
            <span>ORIENTACIÓN CIUDADANA GUIADA • PAYSANDÚ</span>
          </div>

          <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Asistente virtual
          </h1>

          <p className="text-sm md:text-base text-slate-200 leading-relaxed font-normal max-w-xl">
            Respuestas instantáneas mediante opciones guiadas. Elegí tu situación y te mostramos requisitos al día, pasos y enlaces a agendas sin escribir formularios.
          </p>
        </div>
      </div>
    </section>
  );
}

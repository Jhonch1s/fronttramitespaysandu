import { Bot, Sparkles } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

export default function FloatingAssistantWidget() {
  const navigate = useNavigate();
  const location = useLocation();

  // No mostrar el botón flotante si el usuario ya está dentro de la vista del asistente
  if (location.pathname === '/asistente') {
    return null;
  }

  return (
    <div className="fixed bottom-6 right-6 z-40 flex items-center">
      <button
        onClick={() => navigate('/asistente')}
        aria-label="Abrir Asistente Virtual IA"
        className="group flex items-center gap-3 pl-3 pr-5 py-3 rounded-full bg-gradient-to-r from-[#0D47A1] to-[#1565C0] text-white shadow-xl shadow-blue-900/25 hover:shadow-2xl hover:scale-105 active:scale-95 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-blue-300 cursor-pointer border border-blue-400/30"
      >
        {/* Avatar Robot */}
        <div className="relative w-10 h-10 rounded-full bg-white text-[#0D47A1] flex items-center justify-center shadow-inner">
          <Bot className="w-5 h-5 text-[#0D47A1]" />
          {/* Pulsing Green Status Dot */}
          <span className="absolute -top-0.5 -right-0.5 flex h-3.5 w-3.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-500 border-2 border-white" />
          </span>
        </div>

        {/* Text */}
        <div className="flex flex-col text-left">
          <span className="text-xs font-bold tracking-tight text-white flex items-center gap-1">
            ¿Necesitás ayuda?
            <Sparkles className="w-3 h-3 text-[#FBC02D]" />
          </span>
          <span className="text-[10px] text-blue-100 font-medium leading-none">
            Asistente Trámites Paysandú
          </span>
        </div>
      </button>
    </div>
  );
}

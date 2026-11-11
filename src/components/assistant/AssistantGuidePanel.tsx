import { Bot, ChevronRight } from 'lucide-react';

interface QuickOptionItem {
  label: string;
  action: () => void;
}

interface AssistantGuidePanelProps {
  quickOptions: QuickOptionItem[];
}

export default function AssistantGuidePanel({ quickOptions }: AssistantGuidePanelProps) {
  return (
    <div className="space-y-6">
      {/* Tarjeta Guía Rápida */}
      <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-xs">
        <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#0D47A1] to-[#1565C0] text-white flex items-center justify-center shadow-md">
            <Bot className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900">
              Conversá con nuestro asistente
            </h3>
            <p className="text-xs text-slate-500">
              Guía interactiva para jóvenes sanduceros
            </p>
          </div>
        </div>

        {/* Bloque ¿Sobre qué querés consultar? */}
        <div className="mt-5 space-y-3">
          <span className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
            Consultas más rápidas:
          </span>

          <div className="space-y-2">
            {quickOptions.map((item, idx) => (
              <button
                key={idx}
                type="button"
                onClick={item.action}
                className="w-full text-left px-4 py-3 rounded-2xl bg-slate-50 hover:bg-blue-50/70 border border-slate-200/80 hover:border-blue-300 text-xs sm:text-sm font-semibold text-slate-700 hover:text-[#0D47A1] transition-all flex items-center justify-between group cursor-pointer btn-tactile"
              >
                <span>{item.label}</span>
                <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-[#1565C0] group-hover:translate-x-0.5 transition-all" />
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Bloque ilustrativo 3 pasos */}
      <div className="bg-gradient-to-br from-blue-50/60 to-emerald-50/40 rounded-3xl p-6 border border-blue-100/80">
        <span className="text-xs font-bold text-[#0D47A1] uppercase tracking-wider block mb-3">
          ¿Cómo funciona esta guía?
        </span>

        <div className="space-y-3.5 text-xs text-slate-700">
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 rounded-full bg-blue-100 text-[#0D47A1] flex items-center justify-center shrink-0 mt-0.5 font-bold text-[11px]">
              1
            </div>
            <div>
              <strong className="text-slate-900">Elegí tu situación:</strong> pulsá la opción que describe lo que necesitás hacer hoy.
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-6 h-6 rounded-full bg-emerald-100 text-[#00897B] flex items-center justify-center shrink-0 mt-0.5 font-bold text-[11px]">
              2
            </div>
            <div>
              <strong className="text-slate-900">Revisá requisitos:</strong> conocé documentos obligatorios y si tiene costo oficial.
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-6 h-6 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center shrink-0 mt-0.5 font-bold text-[11px]">
              3
            </div>
            <div>
              <strong className="text-slate-900">Accedé a la agenda:</strong> te dirigimos al sistema oficial para reservar tu turno.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

import { ChevronDown, ChevronUp, AlertCircle } from 'lucide-react';
import type { PreguntaFrecuente } from '../../types';

interface TramiteFaqAccordionProps {
  faqs?: PreguntaFrecuente[];
  openIdx: number | null;
  onToggle: (idx: number) => void;
}

export default function TramiteFaqAccordion({
  faqs,
  openIdx,
  onToggle
}: TramiteFaqAccordionProps) {
  if (!faqs || faqs.length === 0) return null;

  return (
    <section className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm">
      <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">
        <AlertCircle className="w-6 h-6 text-[#0D47A1]" />
        Preguntas frecuentes
      </h2>

      <div className="space-y-3">
        {faqs.map((faq, idx) => {
          const isOpen = openIdx === idx;
          return (
            <div
              key={idx}
              className="border border-slate-200 rounded-2xl overflow-hidden transition-colors"
            >
              <button
                onClick={() => onToggle(idx)}
                className="w-full text-left p-4 bg-slate-50 hover:bg-slate-100 flex items-center justify-between gap-4 font-bold text-xs sm:text-sm text-slate-900 transition-colors cursor-pointer"
              >
                <span>{faq.pregunta}</span>
                {isOpen ? (
                  <ChevronUp className="w-4 h-4 text-slate-500 shrink-0" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-slate-500 shrink-0" />
                )}
              </button>

              {isOpen && (
                <div className="p-4 bg-white text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 animate-slide-up">
                  {faq.respuesta}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}

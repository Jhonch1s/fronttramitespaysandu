import { FileText } from 'lucide-react';
import type { Paso } from '../../types';

interface TramiteStepsListProps {
  pasos?: Paso[];
}

export default function TramiteStepsList({ pasos }: TramiteStepsListProps) {
  return (
    <section className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm">
      <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">
        <FileText className="w-6 h-6 text-[#1565C0]" />
        Guía del trámite paso a paso
      </h2>

      <div className="space-y-4">
        {pasos && pasos.length > 0 ? (
          pasos.map((paso, idx) => (
            <div
              key={idx}
              className="p-5 rounded-2xl bg-slate-50 border border-slate-200/90 flex items-start gap-4"
            >
              <div className="w-8 h-8 rounded-full bg-[#1565C0] text-white flex items-center justify-center font-extrabold text-sm shrink-0 shadow-sm">
                {paso.numeroPaso || idx + 1}
              </div>
              <div className="flex-1">
                <h3 className="text-base font-bold text-slate-900">
                  {paso.tituloPaso}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">
                  {paso.descripcionPaso}
                </p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-sm text-slate-500">
            No se detallaron pasos para este trámite.
          </p>
        )}
      </div>
    </section>
  );
}

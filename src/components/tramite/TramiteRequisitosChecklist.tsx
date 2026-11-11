import { CheckCircle2, Clock, Cloud } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { Requisito } from '../../types';

export interface RequirementCheckState {
  completado: boolean;
  fechaMarcado?: string;
}

interface TramiteRequisitosChecklistProps {
  requisitos?: Requisito[];
  checkedMap: Record<string, RequirementCheckState>;
  onToggleCheck: (requisitoId: string, descripcion: string) => void;
  isAuthenticated?: boolean;
}

function formatFechaMarcado(isoString?: string): string {
  if (!isoString) return '';
  try {
    const d = new Date(isoString);
    if (isNaN(d.getTime())) return '';
    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const year = d.getFullYear();
    const hours = String(d.getHours()).padStart(2, '0');
    const minutes = String(d.getMinutes()).padStart(2, '0');
    return `${day}/${month}/${year} ${hours}:${minutes} hs`;
  } catch {
    return '';
  }
}

export default function TramiteRequisitosChecklist({
  requisitos,
  checkedMap,
  onToggleCheck,
  isAuthenticated = false
}: TramiteRequisitosChecklistProps) {
  const total = requisitos?.length || 0;
  const completedCount = (requisitos || []).filter((req, idx) => {
    const key = req._id || `req-${idx}`;
    return checkedMap[key]?.completado;
  }).length;

  const percentage = total > 0 ? Math.round((completedCount / total) * 100) : 0;

  return (
    <section className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs">
      {/* Header del Bloque */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 mb-6 gap-3">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
            <CheckCircle2 className="w-6 h-6 text-[#00897B]" />
            ¿Qué necesitás?
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Marcá los requisitos que ya tenés listos para guardar tu avance y recordar cuándo los completaste.
          </p>
        </div>

        {isAuthenticated ? (
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold self-start sm:self-auto">
            <Cloud className="w-3.5 h-3.5 text-[#00897B]" />
            <span>Guardado en tu cuenta</span>
          </div>
        ) : (
          <span className="text-xs font-bold px-3 py-1 rounded-full bg-blue-50 text-[#0D47A1] self-start sm:self-auto">
            Checklist interactiva
          </span>
        )}
      </div>

      {/* Barra de progreso */}
      {total > 0 && (
        <div className="mb-6 bg-slate-50 border border-slate-200/80 p-4 rounded-2xl">
          <div className="flex justify-between items-center text-xs font-semibold mb-2">
            <span className="text-slate-700">
              Progreso: {completedCount} de {total} requisitos completados
            </span>
            <span className={`font-bold ${percentage === 100 ? 'text-emerald-600' : 'text-[#1565C0]'}`}>
              {percentage}%
            </span>
          </div>
          <div className="w-full bg-slate-200 h-2.5 rounded-full overflow-hidden">
            <div
              className={`h-full transition-all duration-300 rounded-full ${
                percentage === 100 ? 'bg-[#00897B]' : 'bg-[#1565C0]'
              }`}
              style={{ width: `${percentage}%` }}
            />
          </div>
        </div>
      )}

      {/* Lista de Requisitos */}
      <div className="space-y-3">
        {requisitos && requisitos.length > 0 ? (
          requisitos.map((req, idx) => {
            const key = req._id || `req-${idx}`;
            const state = checkedMap[key];
            const isChecked = !!state?.completado;
            const fechaStr = formatFechaMarcado(state?.fechaMarcado);

            return (
              <div
                key={key}
                onClick={() => onToggleCheck(key, req.descripcion)}
                className={`p-4 rounded-2xl border transition-all cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                  isChecked
                    ? 'bg-emerald-50/70 border-emerald-200 text-emerald-950 shadow-xs'
                    : 'bg-slate-50/80 border-slate-200 hover:border-blue-300 text-slate-800'
                }`}
              >
                <div className="flex items-start gap-3.5 flex-1">
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={() => {}}
                    className="mt-0.5 w-5 h-5 rounded-md text-[#00897B] focus:ring-[#00897B] border-slate-300 cursor-pointer accent-[#00897B]"
                  />
                  <div className="text-sm font-medium leading-relaxed">
                    <span className={isChecked ? 'line-through text-slate-500' : 'text-slate-800'}>
                      {req.descripcion}
                    </span>
                    {req.esObligatorio && (
                      <span className="ml-2 text-[10px] font-bold px-2 py-0.5 rounded bg-rose-100 text-rose-700 uppercase">
                        Obligatorio
                      </span>
                    )}
                  </div>
                </div>

                {/* Badge con la fecha en que se marcó el check */}
                {isChecked && fechaStr && (
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100/80 border border-emerald-200 text-emerald-800 text-xs font-semibold shrink-0 self-start sm:self-auto">
                    <Clock className="w-3.5 h-3.5 text-emerald-700" />
                    <span>Listo: {fechaStr}</span>
                  </div>
                )}
              </div>
            );
          })
        ) : (
          <p className="text-sm text-slate-500">No se detallaron requisitos previos.</p>
        )}
      </div>

      {/* Nota sobre guardado en la nube si no está autenticado */}
      {!isAuthenticated && (
        <div className="mt-6 p-3.5 rounded-2xl bg-amber-50/80 border border-amber-200 text-amber-900 text-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
          <span>
            Los checks se guardan en este dispositivo. Para conservarlos y verlos en cualquier celular o PC, iniciá sesión.
          </span>
          <Link
            to="/login"
            className="px-3.5 py-1.5 rounded-full bg-amber-200 hover:bg-amber-300 text-amber-950 font-bold transition-colors shrink-0"
          >
            Iniciar sesión
          </Link>
        </div>
      )}
    </section>
  );
}

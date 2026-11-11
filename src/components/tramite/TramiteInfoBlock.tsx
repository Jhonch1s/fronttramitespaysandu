import { DollarSign, Clock, MapPin, Building, Info } from 'lucide-react';
import type { Tramite, Organizacion } from '../../types';

interface TramiteInfoBlockProps {
  tramite: Tramite;
}

export default function TramiteInfoBlock({ tramite }: TramiteInfoBlockProps) {
  const org = (typeof tramite.organismo === 'object' ? tramite.organismo : null) as Organizacion | null;
  const lugarPrincipal = tramite.lugaresAtencion?.[0];

  return (
    <section className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm">
      <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">
        <Info className="w-6 h-6 text-[#1565C0]" />
        Información del trámite
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Costo */}
        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase mb-1">
            <DollarSign className="w-4 h-4 text-[#00897B]" />
            <span>Costo</span>
          </div>
          <div className="text-base font-bold text-slate-900">
            {tramite.costo?.monto || (tramite.costo?.tipo === 'Gratuito' ? 'Gratuito ($ 0)' : 'Con costo oficial')}
          </div>
          {tramite.costo?.detalles && (
            <p className="text-xs text-slate-500 mt-1">{tramite.costo.detalles}</p>
          )}
        </div>

        {/* Tiempo Estimado */}
        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase mb-1">
            <Clock className="w-4 h-4 text-blue-600" />
            <span>Tiempo Estimado</span>
          </div>
          <div className="text-base font-bold text-slate-900">
            {tramite.tiempoEstimado || '15 minutos de atención'}
          </div>
          <p className="text-xs text-slate-500 mt-1">Sujeto a concurrencia y agenda previa.</p>
        </div>

        {/* Modalidad */}
        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase mb-1">
            <Building className="w-4 h-4 text-amber-600" />
            <span>Modalidad de Gestión</span>
          </div>
          <div className="text-base font-bold text-slate-900">
            {tramite.modalidad || 'Presencial'}
          </div>
          <p className="text-xs text-slate-500 mt-1">
            {tramite.modalidad === 'En Línea'
              ? 'Se gestiona íntegramente por internet con usuario digital.'
              : tramite.modalidad === 'Mixto'
              ? 'Se agenda en línea y se concurre a la toma de datos.'
              : 'Se realiza en la dependencia con documentación física.'}
          </p>
        </div>

        {/* Dónde se realiza */}
        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase mb-1">
            <MapPin className="w-4 h-4 text-rose-600" />
            <span>Dónde se realiza</span>
          </div>
          <div className="text-base font-bold text-slate-900 line-clamp-1">
            {lugarPrincipal?.nombreLugar || org?.nombre || 'Oficina Departamental Paysandú'}
          </div>
          <p className="text-xs text-slate-500 mt-1 line-clamp-2">
            {lugarPrincipal?.direccion || 'Centro de Paysandú, Uruguay'}
          </p>
        </div>
      </div>
    </section>
  );
}

import { X, ArrowRight, UserCheck, Stethoscope, Briefcase, GraduationCap, Car, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface PorDondeEmpiezoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function PorDondeEmpiezoModal({ isOpen, onClose }: PorDondeEmpiezoModalProps) {
  const navigate = useNavigate();

  if (!isOpen) return null;

  const handleSelect = (path: string) => {
    onClose();
    navigate(path);
  };

  const opciones = [
    {
      titulo: 'Cumplí 18 años o necesito renovar mi documento',
      subtitulo: 'Cédula de identidad con chip, partida de nacimiento o credencial.',
      icono: UserCheck,
      color: 'bg-blue-50 text-[#0D47A1] border-blue-200',
      badge: 'Básico indispensable',
      ruta: '/tramites/cedula-de-identidad'
    },
    {
      titulo: 'Conseguí trabajo o una pasantía formal',
      subtitulo: 'Carné de salud preventivo y alta laboral en el BPS con FONASA.',
      icono: Briefcase,
      color: 'bg-amber-50 text-amber-700 border-amber-200',
      badge: 'Laboral',
      ruta: '/tramites/carne-de-salud'
    },
    {
      titulo: 'Voy a estudiar en Liceo, UTU, UTEC o UDELAR',
      subtitulo: 'Boleto estudiantil 100% gratuito y becas de apoyo económico.',
      icono: GraduationCap,
      color: 'bg-indigo-50 text-indigo-700 border-indigo-200',
      badge: 'Educación',
      ruta: '/tramites/boleto-estudiantil'
    },
    {
      titulo: 'Quiero aprender a manejar y sacar mi libreta',
      subtitulo: 'Requisitos de la Intendencia, examen teórico, médico y práctico.',
      icono: Car,
      color: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      badge: 'Tránsito IDP',
      ruta: '/tramites/primera-libreta-conducir-cat-a'
    }
  ];

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-guia-title"
    >
      <div 
        className="relative w-full max-w-2xl bg-white rounded-3xl p-6 md:p-8 shadow-2xl border border-slate-200 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between pb-4 border-b border-slate-100">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-[#00897B] text-xs font-semibold mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              Guía rápida para jóvenes
            </div>
            <h2 id="modal-guia-title" className="text-2xl font-bold text-slate-900">
              ¿Por dónde empiezo?
            </h2>
            <p className="text-sm text-slate-600 mt-1">
              Elegí cuál es tu situación actual y te guiamos paso a paso con los requisitos exactos.
            </p>
          </div>
          <button
            onClick={onClose}
            aria-label="Cerrar modal"
            className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-[#1565C0]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="mt-6 space-y-3 max-h-[60vh] overflow-y-auto pr-1">
          {opciones.map((op, idx) => {
            const Icon = op.icono;
            return (
              <button
                key={idx}
                onClick={() => handleSelect(op.ruta)}
                className="w-full text-left p-4 rounded-2xl border border-slate-200 hover:border-blue-400 hover:bg-blue-50/40 transition-all group flex items-center gap-4 bg-white"
              >
                <div className={`p-3 rounded-2xl border ${op.color} shrink-0`}>
                  <Icon className="w-6 h-6" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                      {op.badge}
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-slate-900 group-hover:text-[#1565C0] transition-colors">
                    {op.titulo}
                  </h3>
                  <p className="text-xs text-slate-500 line-clamp-1 mt-0.5">
                    {op.subtitulo}
                  </p>
                </div>
                <ArrowRight className="w-5 h-5 text-slate-400 group-hover:text-[#1565C0] group-hover:translate-x-1 transition-all shrink-0" />
              </button>
            );
          })}
        </div>

        <div className="mt-6 pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3 bg-slate-50 -mx-6 -mb-6 md:-mx-8 md:-mb-8 p-6">
          <div className="flex items-center gap-2 text-xs text-slate-600">
            <Stethoscope className="w-4 h-4 text-emerald-600" />
            <span>¿Tenés una duda diferente o más específica?</span>
          </div>
          <button
            onClick={() => handleSelect('/asistente')}
            className="w-full sm:w-auto px-5 py-2.5 rounded-full bg-[#1565C0] hover:bg-blue-700 text-white font-medium text-xs md:text-sm transition-all shadow-sm flex items-center justify-center gap-2"
          >
            Hablar con Asistente IA
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

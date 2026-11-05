import { Compass, CheckSquare, CalendarCheck, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function HowWeHelp() {
  const navigate = useNavigate();

  const steps = [
    {
      number: '01',
      title: 'Te orientamos',
      description: 'Te explicamos en lenguaje claro qué trámite necesitás de acuerdo a tu edad y situación (trabajo, estudio, mudanza).',
      icon: Compass,
      iconBg: 'bg-blue-50 text-[#0D47A1]',
    },
    {
      number: '02',
      title: 'Te mostramos requisitos',
      description: 'Una checklist interactiva con documentos exactos, costos reales, vigencias y horarios de atención en Paysandú.',
      icon: CheckSquare,
      iconBg: 'bg-emerald-50 text-[#00897B]',
    },
    {
      number: '03',
      title: 'Te llevamos al trámite oficial',
      description: 'Acceso directo con un clic a la agenda web de la Intendencia, DNIC, BPS o formularios en línea para que no pierdas tiempo.',
      icon: CalendarCheck,
      iconBg: 'bg-amber-50 text-amber-600',
    }
  ];

  return (
    <section className="py-16 md:py-20 bg-white border-y border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-bold text-[#00897B] uppercase tracking-wider bg-emerald-50 px-3.5 py-1 rounded-full border border-emerald-100">
            Nuestra Propuesta
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mt-3 tracking-tight">
            ¿Cómo te ayudamos?
          </h2>
          <p className="text-base text-slate-600 mt-2">
            Hacer trámites en el Estado no tiene por qué ser complicado. Diseñamos un camino simple de 3 pasos:
          </p>
        </div>

        {/* 3 pasos horizontales con conectores */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          
          {/* Línea conectora visual en pantallas medianas/grandes */}
          <div className="hidden md:block absolute top-1/2 left-[15%] right-[15%] h-0.5 border-t-2 border-dashed border-slate-200 -translate-y-12 z-0" />

          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div 
                key={idx}
                className="relative z-10 bg-white rounded-3xl p-8 border border-slate-200/80 shadow-xs hover:shadow-md transition-all duration-200 text-center flex flex-col items-center"
              >
                {/* Paso / Número Badge */}
                <span className="text-xs font-extrabold text-slate-400 bg-slate-100 px-3 py-1 rounded-full mb-4">
                  PASO {step.number}
                </span>

                {/* Icon Circle */}
                <div className={`w-16 h-16 rounded-3xl ${step.iconBg} flex items-center justify-center mb-5 shadow-xs`}>
                  <Icon className="w-8 h-8" />
                </div>

                <h3 className="text-xl font-bold text-slate-900 mb-2">
                  {step.title}
                </h3>

                <p className="text-sm text-slate-600 leading-relaxed font-normal">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Call to action de cierre */}
        <div className="mt-14 p-6 md:p-8 rounded-3xl bg-gradient-to-r from-blue-50 via-slate-50 to-emerald-50 border border-blue-100 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="text-center sm:text-left">
            <h4 className="text-lg font-bold text-slate-900">
              ¿Preferís que te guiemos paso a paso en una conversación?
            </h4>
            <p className="text-sm text-slate-600 mt-1">
              Nuestro asistente virtual responde dudas específicas al instante.
            </p>
          </div>
          <button
            onClick={() => navigate('/asistente')}
            className="px-6 py-3 rounded-full bg-[#1565C0] hover:bg-blue-700 text-white font-bold text-sm shadow-md hover:shadow-lg transition-all flex items-center gap-2 shrink-0 cursor-pointer"
          >
            <span>Consultar al Asistente IA</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </section>
  );
}

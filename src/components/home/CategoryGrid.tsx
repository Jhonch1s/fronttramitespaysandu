import { ShieldCheck, Heart, Briefcase, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function CategoryGrid() {
  const navigate = useNavigate();

  const categories = [
    {
      id: 'vida-ciudadana',
      title: 'Vida ciudadana',
      subtitle: 'Cédula de identidad, boleto estudiantil gratuito, credencial y certificados esenciales.',
      icon: ShieldCheck,
      iconBg: 'bg-blue-50',
      iconColor: 'text-[#0D47A1]',
      badge: 'Documentación Básica',
      count: '3 trámites activos',
      highlightTag: 'Prioridad 18 años',
      queryParam: 'vida-ciudadana'
    },
    {
      id: 'salud',
      title: 'Salud',
      subtitle: 'Carné de salud laboral y para el estudio, vacunatorios, policlínicas y controles médicos preventivos.',
      icon: Heart,
      iconBg: 'bg-emerald-50',
      iconColor: 'text-[#00897B]',
      badge: 'Bienestar & Prevención',
      count: '2 trámites activos',
      highlightTag: 'Requisito Empleo',
      queryParam: 'salud'
    },
    {
      id: 'trabajo',
      title: 'Trabajo',
      subtitle: 'Alta en BPS, historia laboral, programas de inserción, pasantías y registro de emprendedores.',
      icon: Briefcase,
      iconBg: 'bg-amber-50',
      iconColor: 'text-amber-600',
      badge: 'Primer Empleo',
      count: '2 trámites activos',
      highlightTag: 'Seguridad Social',
      queryParam: 'trabajo'
    }
  ];

  return (
    <section className="py-16 md:py-20 bg-[#F8FAFC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Cabecera de la sección */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-bold text-[#1565C0] uppercase tracking-wider bg-blue-50 px-3.5 py-1 rounded-full border border-blue-100">
            Categorías Principales
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mt-3 tracking-tight">
            ¿En qué área necesitás resolver hoy?
          </h2>
          <p className="text-base text-slate-600 mt-2">
            Accedé rápidamente a los trámites organizados por las etapas más importantes de tu vida cotidiana.
          </p>
        </div>

        {/* 3 Tarjetas Principales */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {categories.map((cat) => {
            const Icon = cat.icon;
            return (
              <div
                key={cat.id}
                className="group relative bg-white rounded-3xl p-8 border border-slate-200/90 shadow-xs hover:shadow-md hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Top row: Icon circle and Tag */}
                  <div className="flex items-center justify-between mb-6">
                    <div className={`w-14 h-14 rounded-2xl ${cat.iconBg} ${cat.iconColor} flex items-center justify-center transition-transform group-hover:scale-110 duration-200`}>
                      <Icon className="w-7 h-7" />
                    </div>
                    <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-slate-100 text-slate-600 border border-slate-200/60">
                      {cat.highlightTag}
                    </span>
                  </div>

                  {/* Title and Subtitle */}
                  <h3 className="text-2xl font-bold text-[#0D47A1] group-hover:text-[#1565C0] transition-colors mb-2">
                    {cat.title}
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed mb-6 font-normal">
                    {cat.subtitle}
                  </p>
                </div>

                {/* Footer action */}
                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs text-slate-400 font-medium">
                    {cat.count}
                  </span>
                  <button
                    onClick={() => navigate(`/tramites?categoria=${cat.queryParam}`)}
                    className="inline-flex items-center gap-1.5 text-sm font-bold text-[#1565C0] group-hover:text-blue-700 transition-colors cursor-pointer"
                  >
                    <span>Ver trámites</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}

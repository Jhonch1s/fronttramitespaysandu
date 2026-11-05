import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, CheckCircle2, ShieldCheck, MapPin } from 'lucide-react';
import paysanduMainBg from '../../assets/paysandu main.jpg';

export default function HeroSection() {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/tramites?q=${encodeURIComponent(searchTerm.trim())}`);
    } else {
      navigate('/tramites');
    }
  };

  const handleChipClick = (term: string, slug?: string) => {
    if (slug) {
      navigate(`/tramites/${slug}`);
    } else {
      navigate(`/tramites?q=${encodeURIComponent(term)}`);
    }
  };

  const quickChips = [
    { label: 'Cédula de identidad', slug: 'cedula-de-identidad' },
    { label: 'Carné de salud', slug: 'carne-de-salud' },
    { label: 'Inscripción laboral', slug: 'inscripcion-laboral-bps' },
    { label: 'Beca estudiantil', slug: 'beca-estudiantil-terciaria' },
  ];

  return (
    <section className="relative overflow-hidden min-h-[580px] lg:min-h-[640px] flex items-center">
      
      {/* Imagen de Fondo: paysandu main.jpg con overlay difuminado profesional */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat z-0 transform scale-102"
        style={{ backgroundImage: `url("${paysanduMainBg}")` }}
      />

      {/* Capa de Difuminado y Gradiente institucional oscuro a transparente (legibilidad WCAG AAA) */}
      <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-900/80 to-slate-900/35 backdrop-blur-[2px] z-10" />

      {/* Contenido sobre la imagen (en la parte izquierda) */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24 w-full">
        
        {/* Banner superior con texto manuscrito y tag oficial */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-200 text-xs font-bold tracking-wide backdrop-blur-md">
            <MapPin className="w-3.5 h-3.5 text-[#FBC02D]" />
            <span>PORTAL OFICIAL DE PAYSANDÚ</span>
          </div>

          {/* Frase manuscrita institucional destacada */}
          <div className="inline-flex items-center gap-2 bg-black/40 border border-white/15 px-4 py-1.5 rounded-full backdrop-blur-md">
            <span className="font-handwriting text-2xl md:text-3xl text-amber-400 font-bold tracking-wide">
              "Misma ciudad, más oportunidades"
            </span>
          </div>
        </div>

        {/* Bloque Principal Izquierdo */}
        <div className="max-w-2xl space-y-6 text-white">
          
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.12] drop-shadow-sm">
            Encontrá tu trámite <br />
            <span className="text-blue-300">sin complicarte</span>
          </h1>

          <p className="text-base sm:text-lg text-slate-200 leading-relaxed font-normal max-w-xl drop-shadow-xs">
            Requisitos claros, pasos en lenguaje directo y acceso a las agendas oficiales departamentales. Diseñado especialmente para simplificar tus gestiones en Paysandú.
          </p>

          {/* Barra de Búsqueda Flotante (Input Cápsula) */}
          <form 
            onSubmit={handleSearch} 
            className="relative max-w-xl rounded-full bg-white p-2 border border-white/80 shadow-2xl focus-within:ring-4 focus-within:ring-blue-400/40 transition-all flex items-center"
          >
            <div className="pl-4 pr-2 text-slate-400">
              <Search className="w-5 h-5 text-[#1565C0]" />
            </div>
            <input
              type="text"
              placeholder="Buscá un trámite o escribí tu situación..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full py-2.5 px-2 text-sm sm:text-base text-slate-900 placeholder-slate-400 bg-transparent focus:outline-none"
            />
            <button
              type="submit"
              className="rounded-full bg-[#1565C0] hover:bg-blue-700 text-white font-semibold px-6 sm:px-8 py-3 transition-all duration-200 shadow-md hover:shadow-lg active:scale-95 shrink-0 flex items-center gap-2 cursor-pointer text-sm"
            >
              <span>Buscar</span>
            </button>
          </form>

          {/* Chips de Accesos Rápidos (Pills translúcidos) */}
          <div className="pt-2">
            <span className="text-xs font-semibold text-slate-300 uppercase tracking-wider block mb-2.5">
              Consultas frecuentes de jóvenes:
            </span>
            <div className="flex flex-wrap gap-2">
              {quickChips.map((chip, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleChipClick(chip.label, chip.slug)}
                  className="px-4 py-2 rounded-full text-xs md:text-sm font-semibold bg-white/15 hover:bg-white/25 border border-white/20 text-white backdrop-blur-md shadow-xs hover:border-blue-300 transition-all duration-200 flex items-center gap-1.5 cursor-pointer"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                  {chip.label}
                </button>
              ))}
            </div>
          </div>

          {/* Garantías de confianza institucionales */}
          <div className="pt-4 flex flex-wrap items-center gap-6 text-xs text-slate-300">
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Información verificada con organismos oficiales</span>
            </div>
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-blue-300 shrink-0" />
              <span>Canales gubernamentales directos</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}

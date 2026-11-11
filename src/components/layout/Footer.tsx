import {ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
import logoTramitesUruguay from '../../assets/logo tramites uruguay.png';

export default function Footer() {
  return (
    <footer className="bg-white border-t border-slate-200 mt-auto text-slate-600 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Columna 1: Brand & Logo Oficial Trámites Uruguay */}
          <div className="space-y-4 md:col-span-1">
            <Link to="/" className="inline-block">
              <img
                src={logoTramitesUruguay}
                alt="Logo Trámites Uruguay"
                className="h-10 w-auto object-contain"
              />
            </Link>
            <p className="text-xs text-slate-500 leading-relaxed">
              Plataforma digital para la agilización y centralización de trámites.
            </p>
          </div>

          {/* Columna 2: Trámites Clave */}
          <div className="space-y-3">
            <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider">
              Trámites Frecuentes
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/tramites/cedula-de-identidad" className="hover:text-[#1565C0] transition-colors">
                  Cédula de Identidad (DNIC)
                </Link>
              </li>
              <li>
                <Link to="/tramites/carne-de-salud" className="hover:text-[#1565C0] transition-colors">
                  Carné de Salud Laboral y Estudiantil
                </Link>
              </li>
              <li>
                <Link to="/tramites/inscripcion-laboral-bps" className="hover:text-[#1565C0] transition-colors">
                  Alta de Trabajo y BPS (Primer Empleo)
                </Link>
              </li>
              <li>
                <Link to="/tramites/beca-estudiantil-terciaria" className="hover:text-[#1565C0] transition-colors">
                  Beca Terciaria Fondo de Solidaridad
                </Link>
              </li>
              <li>
                <Link to="/tramites/boleto-estudiantil" className="hover:text-[#1565C0] transition-colors">
                  Boleto Estudiantil Gratuito IDP
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider">
              Enlaces de Interés
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a 
                  href="https://www.paysandu.gub.uy" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-[#1565C0] transition-colors inline-flex items-center gap-1"
                >
                  Intendencia de Paysandú <ExternalLink className="w-3 h-3 text-slate-400" />
                </a>
              </li>
              <li>
                <a 
                  href="https://www.gub.uy" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-[#1565C0] transition-colors inline-flex items-center gap-1"
                >
                  Portal del Estado Uruguayo (Gub.uy) <ExternalLink className="w-3 h-3 text-slate-400" />
                </a>
              </li>
              <li>
                <a 
                  href="https://www.bps.gub.uy" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-[#1565C0] transition-colors inline-flex items-center gap-1"
                >
                  Banco de Previsión Social <ExternalLink className="w-3 h-3 text-slate-400" />
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Barra inferior */}
        <div className="mt-10 pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div className="flex items-center gap-4">
            <span>© 2026 Tramites Paysandú</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

import { MapPin, Phone, Mail, ExternalLink, Heart } from 'lucide-react';
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
              Plataforma digital departamental para la agilización y democratización de trámites ciudadanos para jóvenes sanduceros de 18 a 25 años.
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

          {/* Columna 3: Portales Oficiales */}
          <div className="space-y-3">
            <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider">
              Portales Oficiales
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
                  href="https://agenda.paysandu.gub.uy" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-[#1565C0] transition-colors inline-flex items-center gap-1"
                >
                  Agenda Web Departamental <ExternalLink className="w-3 h-3 text-slate-400" />
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

          {/* Columna 4: Contacto y Sedes */}
          <div className="space-y-3">
            <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider">
              Contacto y Atención
            </h4>
            <div className="space-y-2 text-xs text-slate-500">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#1565C0] shrink-0 mt-0.5" />
                <span>18 de Julio y Zorrilla de San Martín, Paysandú</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#00897B] shrink-0" />
                <span>4722 6220 (Central IDP)</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-amber-600 shrink-0" />
                <span>juventud@paysandu.gub.uy</span>
              </div>
            </div>
            <div className="pt-2">
              <span className="inline-block px-2.5 py-1 rounded-full bg-slate-100 text-[11px] text-slate-600 font-medium">
                Horario: Lun a Vie 07:00 a 17:00
              </span>
            </div>
          </div>

        </div>

        {/* Barra inferior */}
        <div className="mt-10 pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div className="flex items-center gap-1">
            <span>Diseñado con compromiso para las juventudes de Paysandú</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-current inline mx-0.5" />
          </div>
          <div className="flex items-center gap-4">
            <span className="hover:text-slate-600">Accesibilidad WCAG AAA</span>
            <span>•</span>
            <span className="hover:text-slate-600">Datos Abiertos IDP</span>
            <span>•</span>
            <span>© 2026 Paysandú Joven</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

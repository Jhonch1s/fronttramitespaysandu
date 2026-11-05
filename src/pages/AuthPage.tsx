import { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { Lock, Mail, User, ArrowRight, ShieldCheck, AlertCircle, CheckCircle2 } from 'lucide-react';
import logoTramitesUruguay from '../assets/logo tramites uruguay.png';
import { loginApi, registerApi } from '../services/auth';

export default function AuthPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const isRegisterInitial = location.pathname.includes('registro');
  const [isRegister, setIsRegister] = useState(isRegisterInitial);

  // Form states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccessMsg(null);
    setLoading(true);

    try {
      if (isRegister) {
        if (!username.trim()) throw new Error('El nombre de usuario es obligatorio.');
        if (!email.trim()) throw new Error('El correo electrónico es obligatorio.');
        if (password.length < 6) throw new Error('La contraseña debe tener al menos 6 caracteres.');

        await registerApi({ username, email, password });
        setSuccessMsg('Cuenta creada con éxito. Iniciando sesión...');
        await loginApi(email, password);
        setTimeout(() => navigate('/'), 800);
      } else {
        if (!email.trim() || !password.trim()) {
          throw new Error('Por favor ingresa tu correo y contraseña.');
        }
        await loginApi(email, password);
        navigate('/');
      }
    } catch (err: any) {
      setError(err.message || 'Ocurrió un error al procesar tu solicitud.');
    } finally {
      setLoading(false);
    }
  };

  const fillQuickCredentials = (userEmail: string, userPass: string) => {
    setEmail(userEmail);
    setPassword(userPass);
    setIsRegister(false);
    setError(null);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] py-12 px-4 sm:px-6 lg:px-8 flex flex-col justify-center">
      <div className="max-w-md w-full mx-auto space-y-6">
        
        {/* Header con Logo de Trámites Uruguay */}
        <div className="text-center space-y-3">
          <Link to="/" className="inline-block focus:outline-none">
            <img
              src={logoTramitesUruguay}
              alt="Logo Trámites Uruguay"
              className="h-14 sm:h-16 mx-auto object-contain"
            />
          </Link>
          <div className="pt-2">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              {isRegister ? 'Crear tu cuenta ciudadana' : 'Portal Paysandú Joven'}
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              {isRegister
                ? 'Registrate para gestionar y dar seguimiento a tus trámites'
                : 'Ingresá para acceder a tus turnos y consultas personalizadas'}
            </p>
          </div>
        </div>

        {/* Card Principal */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-md">
          
          {/* Switch Iniciar Sesión / Registro */}
          <div className="flex bg-slate-100 p-1 rounded-2xl mb-6">
            <button
              type="button"
              onClick={() => {
                setIsRegister(false);
                setError(null);
                setSuccessMsg(null);
              }}
              className={`flex-1 py-2 text-xs sm:text-sm font-bold rounded-xl transition-all cursor-pointer ${
                !isRegister
                  ? 'bg-white text-[#0D47A1] shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Iniciar sesión
            </button>
            <button
              type="button"
              onClick={() => {
                setIsRegister(true);
                setError(null);
                setSuccessMsg(null);
              }}
              className={`flex-1 py-2 text-xs sm:text-sm font-bold rounded-xl transition-all cursor-pointer ${
                isRegister
                  ? 'bg-white text-[#0D47A1] shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Registrarse
            </button>
          </div>

          {/* Feedback de errores o éxito */}
          {error && (
            <div className="mb-5 p-3.5 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-start gap-2.5">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-rose-500" />
              <span>{error}</span>
            </div>
          )}

          {successMsg && (
            <div className="mb-5 p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5 text-emerald-600" />
              <span>{successMsg}</span>
            </div>
          )}

          {/* Formulario */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {isRegister && (
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Nombre de usuario
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                  <input
                    type="text"
                    required
                    placeholder="ej: matias_sanducero"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-2xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#1565C0] focus:bg-white transition-all"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Correo electrónico
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                <input
                  type="email"
                  required
                  placeholder="tuemail@ejemplo.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-2xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#1565C0] focus:bg-white transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Contraseña
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-2xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#1565C0] focus:bg-white transition-all"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-full bg-[#1565C0] hover:bg-blue-700 active:scale-98 text-white font-bold text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
            >
              <span>{loading ? 'Procesando...' : isRegister ? 'Crear cuenta' : 'Ingresar'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Cuentas de Prueba Oficiales para Evaluar */}
          <div className="mt-6 pt-5 border-t border-slate-100 space-y-2.5">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block text-center">
              Cuentas demo para pruebas rápidas
            </span>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => fillQuickCredentials('admin@paysandu.gub.uy', 'AdminPaysandu2026!')}
                className="p-2.5 text-left rounded-xl bg-slate-50 hover:bg-blue-50 border border-slate-200 text-xs transition-colors cursor-pointer group"
              >
                <div className="font-bold text-slate-900 group-hover:text-[#0D47A1]">
                  Admin Paysandú
                </div>
                <div className="text-[10px] text-slate-500 font-mono">admin@paysandu.gub.uy</div>
              </button>

              <button
                type="button"
                onClick={() => fillQuickCredentials('joven@paysandu.gub.uy', 'JovenPaysandu2026!')}
                className="p-2.5 text-left rounded-xl bg-slate-50 hover:bg-emerald-50 border border-slate-200 text-xs transition-colors cursor-pointer group"
              >
                <div className="font-bold text-slate-900 group-hover:text-[#00897B]">
                  Joven Ciudadano
                </div>
                <div className="text-[10px] text-slate-500 font-mono">joven@paysandu.gub.uy</div>
              </button>
            </div>
          </div>

        </div>

        {/* Garantía de Seguridad */}
        <div className="flex items-center justify-center gap-2 text-xs text-slate-500">
          <ShieldCheck className="w-4 h-4 text-[#00897B]" />
          <span>Autenticación segura con estándares del Estado uruguayo</span>
        </div>

      </div>
    </div>
  );
}

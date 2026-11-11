import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { AlertCircle } from 'lucide-react';
import { 
  getTramiteBySlug, 
  eliminarTramiteApi, 
  getProgresoTramiteApi, 
  toggleRequisitoApi 
} from '../services/api';
import { getStoredUser } from '../services/auth';
import type { Tramite } from '../types';
import VideoModal from '../components/common/VideoModal';
import TramiteHeader from '../components/tramite/TramiteHeader';
import TramiteRequisitosChecklist, { type RequirementCheckState } from '../components/tramite/TramiteRequisitosChecklist';
import TramiteInfoBlock from '../components/tramite/TramiteInfoBlock';
import TramiteStepsList from '../components/tramite/TramiteStepsList';
import TramiteFaqAccordion from '../components/tramite/TramiteFaqAccordion';
import TramiteSidebar from '../components/tramite/TramiteSidebar';
import AdminTramiteModal from '../components/admin/AdminTramiteModal';

export default function TramiteDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [tramite, setTramite] = useState<Tramite | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Rol del usuario
  const currentUser = getStoredUser();
  const isAdmin = currentUser?.rol === 'ADMIN' || currentUser?.rol === 'EDITOR';

  // Estados interactivos
  const [checkedMap, setCheckedMap] = useState<Record<string, RequirementCheckState>>(() => {
    if (typeof window === 'undefined' || !slug) return {};
    const localSaved = localStorage.getItem(`tramite_progreso_${slug}`);
    if (localSaved) {
      try {
        return JSON.parse(localSaved);
      } catch {
        return {};
      }
    }
    return {};
  });
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);

  useEffect(() => {
    let active = true;
    if (!slug) return;

    // Cargar datos del trámite
    getTramiteBySlug(slug)
      .then((data) => {
        if (!active) return;
        if (data) {
          setTramite(data);
          setError(null);
        } else {
          setError('No pudimos encontrar el trámite solicitado.');
        }
      })
      .catch((err) => {
        if (!active) return;
        console.error(err);
        setError('Ocurrió un error al cargar los datos del trámite.');
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    if (currentUser) {
      getProgresoTramiteApi(slug)
        .then((items) => {
          if (!active) return;
          if (Array.isArray(items) && items.length > 0) {
            const serverMap: Record<string, RequirementCheckState> = {};
            items.forEach((item) => {
              serverMap[item.requisitoId] = {
                completado: item.completado,
                fechaMarcado: item.fechaMarcado
              };
            });
            setCheckedMap(serverMap);
            localStorage.setItem(`tramite_progreso_${slug}`, JSON.stringify(serverMap));
          }
        })
        .catch(() => {
          // Mantener estado local previo
        });
    }

    return () => {
      active = false;
    };
  }, [slug, currentUser]);

  const toggleCheck = (requisitoId: string, descripcion: string) => {
    const isCurrentlyChecked = !!checkedMap[requisitoId]?.completado;
    const newCompletado = !isCurrentlyChecked;
    const nowIso = new Date().toISOString();

    const updatedState: RequirementCheckState = {
      completado: newCompletado,
      fechaMarcado: newCompletado ? nowIso : undefined
    };

    const newMap = {
      ...checkedMap,
      [requisitoId]: updatedState
    };

    setCheckedMap(newMap);

    if (slug) {
      localStorage.setItem(`tramite_progreso_${slug}`, JSON.stringify(newMap));
      if (currentUser && tramite) {
        toggleRequisitoApi(slug, {
          requisitoId,
          descripcion,
          completado: newCompletado,
          tramiteTitulo: tramite.titulo
        }).catch((err) => console.warn('Error al guardar requisito en backend:', err));
      }
    }
  };

  const handleDelete = async () => {
    if (!tramite) return;
    const confirmDelete = window.confirm(`¿Estás seguro de que deseas desactivar el trámite "${tramite.titulo}"?`);
    if (!confirmDelete) return;

    try {
      await eliminarTramiteApi(tramite._id);
      alert('Trámite desactivado exitosamente.');
      navigate('/tramites');
    } catch (err: any) {
      alert(`Error al eliminar trámite: ${err.message}`);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] py-16 flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-sm font-semibold text-slate-500">Cargando detalles del trámite...</p>
        </div>
      </div>
    );
  }

  if (error || !tramite) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] py-16 px-4">
        <div className="max-w-xl mx-auto bg-white rounded-3xl p-8 border border-slate-200 text-center space-y-4 shadow-sm">
          <AlertCircle className="w-12 h-12 text-rose-500 mx-auto" />
          <h2 className="text-2xl font-bold text-slate-900">Trámite no encontrado</h2>
          <p className="text-slate-600 text-sm">
            {error || 'El trámite al que intentás acceder no existe o fue reubicado.'}
          </p>
          <div className="pt-4 flex justify-center gap-3">
            <Link
              to="/tramites"
              className="px-6 py-2.5 rounded-full bg-[#1565C0] text-white font-semibold text-sm hover:bg-blue-700 transition-colors"
            >
              Volver al catálogo
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const videoPrincipal = tramite.videos?.[0];

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-20">
      <TramiteHeader
        tramite={tramite}
        isAdmin={isAdmin}
        onOpenVideo={() => setIsVideoModalOpen(true)}
        onEdit={() => setIsAdminModalOpen(true)}
        onDelete={handleDelete}
      />

      {/* Grid Principal de 2 Columnas (8/4) */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Columna Izquierda (8 columnas) */}
          <div className="lg:col-span-8 space-y-8">
            <TramiteRequisitosChecklist
              requisitos={tramite.requisitos}
              checkedMap={checkedMap}
              onToggleCheck={toggleCheck}
              isAuthenticated={!!currentUser}
            />

            <TramiteInfoBlock tramite={tramite} />

            <TramiteStepsList pasos={tramite.pasos} />

            <TramiteFaqAccordion
              faqs={tramite.preguntasFrecuentes}
              openIdx={openFaq}
              onToggle={(idx) => setOpenFaq(openFaq === idx ? null : idx)}
            />
          </div>

          {/* Columna Derecha Sticky (4 columnas) */}
          <div className="lg:col-span-4">
            <TramiteSidebar
              tramite={tramite}
              onOpenVideo={() => setIsVideoModalOpen(true)}
            />
          </div>
        </div>
      </main>

      {/* Modal Video */}
      <VideoModal
        isOpen={isVideoModalOpen}
        onClose={() => setIsVideoModalOpen(false)}
        title={videoPrincipal?.titulo || `Tutorial: ${tramite.titulo}`}
        videoUrl={videoPrincipal?.urlVideo}
      />

      {/* Modal Administrador */}
      {isAdmin && (
        <AdminTramiteModal
          isOpen={isAdminModalOpen}
          onClose={() => setIsAdminModalOpen(false)}
          tramiteToEdit={tramite}
          onSuccess={(updated) => setTramite(updated)}
        />
      )}
    </div>
  );
}

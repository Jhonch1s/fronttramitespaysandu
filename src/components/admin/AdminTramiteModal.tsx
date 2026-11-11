import { useState, useEffect } from 'react';
import { X, Save, AlertCircle, Video, Calendar } from 'lucide-react';
import type { Tramite, Categoria, Organizacion, ModalidadTramite, TipoCostoTramite } from '../../types';
import { crearTramiteApi, actualizarTramiteApi, getCategorias, getOrganizaciones } from '../../services/api';

interface AdminTramiteModalProps {
  isOpen: boolean;
  onClose: () => void;
  tramiteToEdit: Tramite | null;
  onSuccess: (savedTramite: Tramite) => void;
}

interface FormInnerProps {
  tramiteToEdit: Tramite | null;
  categorias: Categoria[];
  organizaciones: Organizacion[];
  onClose: () => void;
  onSuccess: (saved: Tramite) => void;
}

function FormInner({
  tramiteToEdit,
  categorias,
  organizaciones,
  onClose,
  onSuccess
}: FormInnerProps) {
  const isEditing = !!tramiteToEdit;

  const [titulo, setTitulo] = useState(() => tramiteToEdit?.titulo || '');
  const [slug, setSlug] = useState(() => tramiteToEdit?.slug || '');
  const [descripcion, setDescripcion] = useState(() => tramiteToEdit?.descripcion || '');
  const [categoriaId, setCategoriaId] = useState(() => {
    if (!tramiteToEdit?.categoria) return '';
    return typeof tramiteToEdit.categoria === 'object'
      ? (tramiteToEdit.categoria?._id || '')
      : (tramiteToEdit.categoria || '');
  });
  const [organismoId, setOrganismoId] = useState(() => {
    if (!tramiteToEdit?.organismo) return '';
    return typeof tramiteToEdit.organismo === 'object'
      ? (tramiteToEdit.organismo?._id || '')
      : (tramiteToEdit.organismo || '');
  });
  const [modalidad, setModalidad] = useState<ModalidadTramite>(() => tramiteToEdit?.modalidad || 'Presencial');
  const [costoTipo, setCostoTipo] = useState<TipoCostoTramite>(() => tramiteToEdit?.costo?.tipo || 'Gratuito');
  const [costoMonto, setCostoMonto] = useState(() => tramiteToEdit?.costo?.monto || '$ 0');
  const [tiempoEstimado, setTiempoEstimado] = useState(() => tramiteToEdit?.tiempoEstimado || '15 minutos aprox.');
  const [dirigidoA, setDirigidoA] = useState(() => tramiteToEdit?.dirigidoA || 'Jóvenes de Paysandú');
  const [urlAgenda, setUrlAgenda] = useState(() => tramiteToEdit?.urlAgenda || '');
  const [urlTramiteOnline, setUrlTramiteOnline] = useState(() => tramiteToEdit?.urlTramiteOnline || '');
  const [videoTitulo, setVideoTitulo] = useState(() => tramiteToEdit?.videos?.[0]?.titulo || '');
  const [videoUrl, setVideoUrl] = useState(() => tramiteToEdit?.videos?.[0]?.urlVideo || '');
  const [destacado, setDestacado] = useState(() => !!tramiteToEdit?.destacado);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!titulo.trim()) {
      setError('El título del trámite es obligatorio.');
      return;
    }

    setLoading(true);
    setError(null);

    const payload: Partial<Tramite> = {
      titulo: titulo.trim(),
      slug: slug.trim() || undefined,
      descripcion: descripcion.trim(),
      categoria: categoriaId || undefined,
      organismo: organismoId || undefined,
      modalidad,
      costo: {
        tipo: costoTipo,
        monto: costoMonto.trim(),
      },
      tiempoEstimado: tiempoEstimado.trim(),
      dirigidoA: dirigidoA.trim(),
      urlAgenda: urlAgenda.trim() || undefined,
      urlTramiteOnline: urlTramiteOnline.trim() || undefined,
      destacado,
      videos: videoUrl.trim()
        ? [{ titulo: videoTitulo.trim() || `Tutorial: ${titulo.trim()}`, urlVideo: videoUrl.trim() }]
        : []
    };

    try {
      let saved: Tramite;
      if (isEditing && tramiteToEdit) {
        saved = await actualizarTramiteApi(tramiteToEdit._id, payload);
      } else {
        saved = await crearTramiteApi(payload);
      }
      onSuccess(saved);
      onClose();
    } catch (err: any) {
      setError(err?.response?.data?.message || err.message || 'Error al guardar el trámite.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-4 text-xs sm:text-sm">
      {error && (
        <div className="p-3 bg-rose-50 border border-rose-200 rounded-2xl flex items-center gap-2 text-rose-700 text-xs">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block font-bold text-slate-700 mb-1">Título del trámite *</label>
          <input
            type="text"
            required
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            placeholder="Ej: Cédula de Identidad"
            className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block font-bold text-slate-700 mb-1">Slug URL (Opcional)</label>
          <input
            type="text"
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            placeholder="ej: cedula-de-identidad"
            className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-xs"
          />
        </div>
      </div>

      <div>
        <label className="block font-bold text-slate-700 mb-1">Descripción general</label>
        <textarea
          rows={3}
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
          placeholder="Explicación clara del trámite para el joven..."
          className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block font-bold text-slate-700 mb-1">Categoría</label>
          <select
            value={categoriaId}
            onChange={(e) => setCategoriaId(e.target.value)}
            className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Seleccionar categoría...</option>
            {categorias.map((c) => (
              <option key={c._id} value={c._id}>
                {c.nombre}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block font-bold text-slate-700 mb-1">Organismo responsable</label>
          <select
            value={organismoId}
            onChange={(e) => setOrganismoId(e.target.value)}
            className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Seleccionar organismo...</option>
            {organizaciones.map((o) => (
              <option key={o._id} value={o._id}>
                {o.nombre} ({o.siglas})
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <label className="block font-bold text-slate-700 mb-1">Modalidad</label>
          <select
            value={modalidad}
            onChange={(e) => setModalidad(e.target.value as ModalidadTramite)}
            className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white"
          >
            <option value="Presencial">Presencial</option>
            <option value="En Línea">En Línea</option>
            <option value="Mixto">Mixto</option>
          </select>
        </div>

        <div>
          <label className="block font-bold text-slate-700 mb-1">Tipo de Costo</label>
          <select
            value={costoTipo}
            onChange={(e) => {
              const val = e.target.value as TipoCostoTramite;
              setCostoTipo(val);
              if (val === 'Gratuito') setCostoMonto('$ 0');
            }}
            className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white"
          >
            <option value="Gratuito">Gratuito</option>
            <option value="Con Costo">Con Costo</option>
          </select>
        </div>

        <div>
          <label className="block font-bold text-slate-700 mb-1">Monto / Arancel</label>
          <input
            type="text"
            value={costoMonto}
            onChange={(e) => setCostoMonto(e.target.value)}
            placeholder="$ 450"
            className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block font-bold text-slate-700 mb-1">Tiempo estimado de atención</label>
          <input
            type="text"
            value={tiempoEstimado}
            onChange={(e) => setTiempoEstimado(e.target.value)}
            placeholder="Ej: 15 minutos de atención presencial"
            className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white"
          />
        </div>

        <div>
          <label className="block font-bold text-slate-700 mb-1">Población objetivo / Dirigido a</label>
          <input
            type="text"
            value={dirigidoA}
            onChange={(e) => setDirigidoA(e.target.value)}
            placeholder="Ej: Jóvenes de 18 a 25 años en Paysandú"
            className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white"
          />
        </div>
      </div>

      <div className="pt-2 border-t border-slate-100 space-y-3">
        <span className="font-bold text-slate-800 text-xs uppercase flex items-center gap-1.5">
          <Calendar className="w-3.5 h-3.5 text-blue-600" />
          Enlaces Oficiales & Agenda
        </span>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-slate-600 mb-1 font-semibold">Enlace a Agenda Oficial</label>
            <input
              type="url"
              value={urlAgenda}
              onChange={(e) => setUrlAgenda(e.target.value)}
              placeholder="https://www.gub.uy/tramites/reserva-dia-hora-..."
              className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white"
            />
          </div>

          <div>
            <label className="block text-slate-600 mb-1 font-semibold">Enlace a Trámite en Línea</label>
            <input
              type="url"
              value={urlTramiteOnline}
              onChange={(e) => setUrlTramiteOnline(e.target.value)}
              placeholder="https://www.gub.uy/tramites/..."
              className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white"
            />
          </div>
        </div>
      </div>

      <div className="pt-2 border-t border-slate-100 space-y-3">
        <span className="font-bold text-slate-800 text-xs uppercase flex items-center gap-1.5">
          <Video className="w-3.5 h-3.5 text-emerald-600" />
          Video Tutorial (YouTube)
        </span>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-slate-600 mb-1 font-semibold">Título del Video</label>
            <input
              type="text"
              value={videoTitulo}
              onChange={(e) => setVideoTitulo(e.target.value)}
              placeholder="Ej: Paso a paso para sacar tu cédula"
              className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white"
            />
          </div>

          <div>
            <label className="block text-slate-600 mb-1 font-semibold">URL de YouTube</label>
            <input
              type="url"
              value={videoUrl}
              onChange={(e) => setVideoUrl(e.target.value)}
              placeholder="https://www.youtube.com/watch?v=..."
              className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white"
            />
          </div>
        </div>
      </div>

      <div className="pt-2 flex items-center gap-2">
        <input
          type="checkbox"
          id="destacado"
          checked={destacado}
          onChange={(e) => setDestacado(e.target.checked)}
          className="w-4 h-4 rounded text-blue-600 border-slate-300"
        />
        <label htmlFor="destacado" className="font-bold text-slate-700 cursor-pointer">
          Marcar como trámite destacado en la portada
        </label>
      </div>

      <div className="pt-4 border-t border-slate-200 flex justify-end gap-2">
        <button
          type="button"
          onClick={onClose}
          disabled={loading}
          className="px-5 py-2.5 rounded-full bg-slate-100 text-slate-700 font-bold text-xs cursor-pointer btn-tactile"
        >
          Cancelar
        </button>
        <button
          type="submit"
          disabled={loading}
          className="px-6 py-2.5 rounded-full bg-[#1565C0] hover:bg-blue-700 text-white font-bold text-xs flex items-center gap-2 cursor-pointer btn-tactile disabled:opacity-50"
        >
          <Save className="w-4 h-4" />
          <span>{loading ? 'Guardando...' : 'Guardar Trámite'}</span>
        </button>
      </div>
    </form>
  );
}

export default function AdminTramiteModal({
  isOpen,
  onClose,
  tramiteToEdit,
  onSuccess
}: AdminTramiteModalProps) {
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [organizaciones, setOrganizaciones] = useState<Organizacion[]>([]);

  useEffect(() => {
    if (isOpen) {
      getCategorias().then(setCategorias);
      getOrganizaciones().then(setOrganizaciones);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in"
      role="dialog"
      aria-modal="true"
    >
      <div className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]">
        <div className="px-6 py-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between shrink-0">
          <div>
            <span className="text-xs font-bold text-[#0D47A1] uppercase tracking-wider">
              Panel Administrativo
            </span>
            <h3 className="text-lg font-bold text-slate-900 mt-0.5">
              {tramiteToEdit ? 'Editar trámite' : 'Registrar nuevo trámite'}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-700 rounded-full cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <FormInner
          key={tramiteToEdit?._id || 'new-tramite'}
          tramiteToEdit={tramiteToEdit}
          categorias={categorias}
          organizaciones={organizaciones}
          onClose={onClose}
          onSuccess={onSuccess}
        />
      </div>
    </div>
  );
}

import { X, Play, ExternalLink, Video as VideoIcon } from 'lucide-react';

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  videoUrl?: string;
}

export default function VideoModal({ isOpen, onClose, title, videoUrl }: VideoModalProps) {
  if (!isOpen) return null;

  const cleanUrl = videoUrl?.trim() || '';

  // 1. YouTube
  const ytMatch = cleanUrl.match(
    /(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=|shorts\/))([\w-]{11})/
  );

  // 2. Instagram (Reels o Posts)
  const igMatch = cleanUrl.match(/instagram\.com\/(?:p|reel|tv)\/([a-zA-Z0-9_-]+)/);

  // 3. Facebook
  const isFacebook = cleanUrl.includes('facebook.com') || cleanUrl.includes('fb.watch');

  // 4. Video directo (.mp4, .webm)
  const isDirectVideo = /\.(mp4|webm|ogg)($|\?)/i.test(cleanUrl);

  const getPlatformLabel = () => {
    if (ytMatch) return 'YouTube';
    if (igMatch) return 'Instagram';
    if (isFacebook) return 'Facebook';
    if (cleanUrl.includes('tiktok.com')) return 'TikTok';
    return 'Video Externo';
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-sm animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-labelledby="video-modal-title"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-3xl bg-white rounded-3xl overflow-hidden shadow-2xl border border-slate-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Cabecera del modal */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50">
          <div className="flex items-center gap-2.5 min-w-0">
            <span className="p-2 rounded-full bg-emerald-100 text-[#00897B] shrink-0">
              <Play className="w-4 h-4 fill-current" />
            </span>
            <div className="min-w-0">
              <h3 id="video-modal-title" className="text-sm sm:text-base font-bold text-slate-900 truncate">
                {title || 'Video explicativo'}
              </h3>
              {cleanUrl && (
                <span className="text-[11px] font-semibold text-slate-500">
                  Plataforma: {getPlatformLabel()}
                </span>
              )}
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Cerrar video"
            className="p-2 text-slate-400 hover:text-slate-800 rounded-full hover:bg-slate-200 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Reproductor condicional por plataforma */}
        <div className="relative aspect-video w-full bg-slate-950 flex items-center justify-center">
          {!cleanUrl ? (
            <div className="text-center p-8 space-y-3 text-slate-300">
              <VideoIcon className="w-12 h-12 mx-auto text-slate-500" />
              <p className="text-sm font-semibold">Este trámite no cuenta con un video asignado aún.</p>
            </div>
          ) : isDirectVideo ? (
            <video
              src={cleanUrl}
              controls
              autoPlay
              className="w-full h-full object-contain"
            />
          ) : ytMatch && ytMatch[1] ? (
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${ytMatch[1]}?autoplay=1&rel=0`}
              title={title}
              className="w-full h-full border-0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : igMatch && igMatch[1] ? (
            <iframe
              src={`https://www.instagram.com/p/${igMatch[1]}/embed`}
              title={title}
              className="w-full h-full border-0 bg-white"
              allowFullScreen
            />
          ) : isFacebook ? (
            <iframe
              src={`https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(cleanUrl)}&show_text=0`}
              title={title}
              className="w-full h-full border-0"
              allowFullScreen
            />
          ) : (
            <div className="text-center p-8 space-y-4 text-white">
              <VideoIcon className="w-12 h-12 mx-auto text-blue-400" />
              <div>
                <h4 className="text-base font-bold">Video disponible en {getPlatformLabel()}</h4>
                <p className="text-xs text-slate-300 mt-1 max-w-md mx-auto">
                  Por políticas de privacidad de la plataforma, podés reproducirlo directamente en su sitio:
                </p>
              </div>
              <a
                href={cleanUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#1565C0] hover:bg-blue-700 text-white font-bold text-xs transition-colors shadow-md"
              >
                <span>Abrir video en {getPlatformLabel()}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          )}
        </div>

        {/* Pie del modal */}
        <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between gap-4">
          {cleanUrl ? (
            <a
              href={cleanUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#1565C0] hover:underline"
            >
              <span>Abrir en enlace directo</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          ) : (
            <span className="text-xs text-slate-400">Guía práctica audiovisual</span>
          )}

          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-full bg-slate-200 hover:bg-slate-300 text-slate-700 font-semibold text-xs transition-colors cursor-pointer"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
}

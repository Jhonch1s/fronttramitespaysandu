import { X, Play } from 'lucide-react';

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  videoUrl?: string;
}

export default function VideoModal({ isOpen, onClose, title, videoUrl }: VideoModalProps) {
  if (!isOpen) return null;

  // Extraer ID de YouTube si es un enlace de YouTube
  let embedUrl = 'https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ?autoplay=1';
  if (videoUrl) {
    const match = videoUrl.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})/);
    if (match && match[1]) {
      embedUrl = `https://www.youtube-nocookie.com/embed/${match[1]}?autoplay=1`;
    }
  }

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-labelledby="video-modal-title"
    >
      <div 
        className="relative w-full max-w-3xl bg-white rounded-3xl overflow-hidden shadow-2xl border border-slate-100"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50">
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-full bg-blue-100 text-[#0D47A1]">
              <Play className="w-4 h-4 fill-current" />
            </span>
            <h3 id="video-modal-title" className="text-base md:text-lg font-bold text-slate-900 line-clamp-1">
              {title}
            </h3>
          </div>
          <button
            onClick={onClose}
            aria-label="Cerrar video"
            className="p-2 text-slate-500 hover:text-slate-800 rounded-full hover:bg-slate-200 transition-colors focus:outline-none focus:ring-2 focus:ring-[#1565C0]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="relative aspect-video w-full bg-black">
          <iframe
            src={embedUrl}
            title={title}
            className="w-full h-full border-0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>

        <div className="p-4 bg-slate-50 text-xs text-slate-500 flex justify-between items-center">
          <span>Tutorial oficial - Trámites Paysandú Joven</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-full bg-slate-200 hover:bg-slate-300 text-slate-700 font-medium transition-colors"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
}

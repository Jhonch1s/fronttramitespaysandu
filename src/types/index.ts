export type ModalidadTramite = 'Presencial' | 'En Línea' | 'Mixto';
export type TipoCostoTramite = 'Gratuito' | 'Con Costo' | 'Variable';

// Subdocumentos y Subesquemas

export interface Requisito {
  _id?: string;
  descripcion: string;
  esObligatorio?: boolean;
  orden?: number;
}

export interface Documentacion {
  _id?: string;
  nombreDocumento: string;
  descripcion?: string;
  formatoPermitido?: string;
  esObligatorio?: boolean;
  urlPlantilla?: string;
}

export interface Paso {
  _id?: string;
  numeroPaso: number;
  tituloPaso: string;
  descripcionPaso: string;
}

export interface Video {
  _id?: string;
  titulo?: string;
  urlVideo?: string;
}

export interface LugarAtencion {
  _id?: string;
  nombreLugar: string;
  direccion: string;
  mapsUrl: string;
  horario?: string;
  telefono?: string;
}

export interface PreguntaFrecuente {
  _id?: string;
  pregunta: string;
  respuesta: string;
}

export interface Sede {
  _id?: string;
  nombreSede: string;
  direccion: string;
  mapsUrl: string;
  horario?: string;
  telefono?: string;
}

export interface ContactoOrganizacion {
  telefono?: string;
  email?: string;
  horarioGeneral?: string;
}

export interface CostoTramite {
  tipo?: TipoCostoTramite;
  monto?: string;
  detalles?: string;
}

// Modelos Principales

export interface Categoria {
  _id: string;
  nombre: string;
  slug: string;
  descripcion?: string;
  icono?: string;
  color?: string;
  orden?: number;
  activo?: boolean;
  totalTramites?: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface Organizacion {
  _id: string;
  nombre: string;
  siglas?: string;
  sitioWeb?: string;
  descripcion?: string;
  logo?: string;
  contacto?: ContactoOrganizacion;
  sedes?: Sede[];
  activo?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface Tramite {
  _id: string;
  titulo: string;
  slug: string;
  descripcion: string;
  organismo: string | Organizacion;
  categoria: string | Categoria;
  activo?: boolean;
  destacado?: boolean;
  modalidad?: ModalidadTramite;
  costo?: CostoTramite;
  tiempoEstimado?: string;
  dirigidoA?: string;
  urlAgenda?: string;
  urlTramiteOnline?: string;
  lugaresAtencion?: LugarAtencion[];
  requisitos?: Requisito[];
  documentacion?: Documentacion[];
  pasos?: Paso[];
  videos?: Video[];
  preguntasFrecuentes?: PreguntaFrecuente[];
  palabrasClave?: string[];
  createdAt?: string;
  updatedAt?: string;
}

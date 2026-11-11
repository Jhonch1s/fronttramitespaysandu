import axios from 'axios';
import type { 
  Tramite,
  Categoria,
  Organizacion,
  TipoCostoTramite,
  ModalidadTramite  
} from "../types";
import { mockTramites, mockCategorias, mockOrganizaciones } from '../data/mockData';
import { getStoredToken } from './auth';

const API_BASE_URL = 'http://localhost:3000/api/';

export interface GetTramitesParams {
  categoria?: string;
  organismo?: string;
  modalidad?: ModalidadTramite;
  costoTipo?: TipoCostoTramite;
  destacado?: boolean | string;
  page?: number;
  limit?: number;
}

export interface PaginatedTramitesResponse {
  total: number;
  page: number;
  totalPages: number;
  items: Tramite[];
}

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 3000,
});

api.interceptors.request.use((config) => {
  const token = getStoredToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export async function getTramites(params?: GetTramitesParams): Promise<PaginatedTramitesResponse> {
  const cleanParams: Record<string, any> = {};

  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        cleanParams[key] = value;
      }
    });
  }

  try {
    const { data: responseData } = await api.get<any>('/tramites', { params: cleanParams });
    const payload = responseData?.data || responseData;

    const items = Array.isArray(payload?.items) 
      ? payload.items 
      : Array.isArray(payload) 
        ? payload 
        : [];

    if (items.length > 0) {
      return {
        total: payload?.total ?? items.length,
        page: payload?.page ?? 1,
        totalPages: payload?.totalPages ?? 1,
        items
      };
    }
  } catch (error) {
    console.warn('API local no disponible, utilizando catálogo local:', error);
  }

  // Fallback a mock data
  let filtered = [...mockTramites];

  if (params?.categoria) {
    filtered = filtered.filter(t => {
      const catSlug = typeof t.categoria === 'object' ? t.categoria.slug : t.categoria;
      const catId = typeof t.categoria === 'object' ? t.categoria._id : t.categoria;
      return catSlug === params.categoria || catId === params.categoria;
    });
  }

  if (params?.modalidad) {
    filtered = filtered.filter(t => t.modalidad === params.modalidad);
  }

  if (params?.costoTipo) {
    filtered = filtered.filter(t => t.costo?.tipo === params.costoTipo);
  }

  if (params?.destacado) {
    filtered = filtered.filter(t => t.destacado);
  }

  const page = params?.page || 1;
  const limit = params?.limit || 12;
  const startIndex = (page - 1) * limit;
  const paginatedItems = filtered.slice(startIndex, startIndex + limit);

  return {
    total: filtered.length,
    page,
    totalPages: Math.ceil(filtered.length / limit) || 1,
    items: paginatedItems
  };
}

export async function buscarTramites(q: string, limit: number = 20): Promise<Tramite[]> {
  if (!q.trim()) return [];

  try {
    const { data } = await api.get<any>('tramites/buscar', {
      params: { q, limit }
    });
    const items = data?.data || data;
    if (Array.isArray(items) && items.length > 0) {
      return items;
    }
  } catch (error) {
    console.warn('Búsqueda vía API falló, buscando en datos locales:', error);
  }

  const query = q.toLowerCase();
  return mockTramites.filter(t => 
    t.titulo.toLowerCase().includes(query) ||
    t.descripcion.toLowerCase().includes(query) ||
    t.palabrasClave?.some(k => k.toLowerCase().includes(query))
  ).slice(0, limit);
}

export async function getTramitesDestacados(): Promise<Tramite[]> {
  try {
    const { data } = await api.get<any>('tramites/destacados');
    const items = data?.data || data;
    if (Array.isArray(items) && items.length > 0) {
      return items;
    }
  } catch (error) {
    console.warn('API de destacados no disponible, usando locales:', error);
  }
  return mockTramites.filter(t => t.destacado);
}

export async function getTramiteBySlug(slug: string): Promise<Tramite | null> {
  try {
    const { data } = await api.get<any>(`tramites/${slug}`);
    const item = data?.data || data;
    if (item && item.slug) {
      return item;
    }
  } catch (error) {
    console.warn(`No se pudo obtener el trámite "${slug}" de la API, buscando localmente:`, error);
  }

  const local = mockTramites.find(t => t.slug === slug);
  return local || null;
}

export async function getCategorias(conConteo: boolean = true): Promise<Categoria[]> {
  try {
    const { data } = await api.get<any>('/categorias', {
      params: { conConteo }
    });
    const items = data?.data || (Array.isArray(data) ? data : data?.categorias);
    if (Array.isArray(items) && items.length > 0) {
      return items;
    }
  } catch (error) {
    console.warn('API de categorías no disponible, usando locales:', error);
  }

  return mockCategorias;
}

export async function getCategoriasBySlug(slug: string): Promise<Categoria | null> {
  try {
    const { data } = await api.get<any>(`categorias/${slug}`);
    return data?.data || data;
  } catch (error) {
    console.warn(`API de categoría "${slug}" no disponible:`, error);
  }
  return mockCategorias.find(c => c.slug === slug) || null;
}

export async function getOrganizaciones(): Promise<Organizacion[]> {
  try {
    const { data } = await api.get<any>(`organizaciones/`);
    const items = data?.data || data;
    if (Array.isArray(items) && items.length > 0) {
      return items;
    }
  } catch (error) {
    console.warn('API de organizaciones no disponible, usando locales:', error);
  }
  return mockOrganizaciones;
}

export async function getOrganizacionById(idOrganizacion: string): Promise<Organizacion | null> {
  try {
    const { data } = await api.get<any>(`organizaciones/${idOrganizacion}`);
    return data?.data || data;
  } catch (error) {
    console.warn(`API de organización "${idOrganizacion}" no disponible:`, error);
  }
  return mockOrganizaciones.find(o => o._id === idOrganizacion) || null;
}

export async function crearTramiteApi(tramiteData: Partial<Tramite>): Promise<Tramite> {
  const { data } = await api.post('tramites', tramiteData);
  return data?.data || data;
}

export async function actualizarTramiteApi(id: string, tramiteData: Partial<Tramite>): Promise<Tramite> {
  const { data } = await api.put(`tramites/${id}`, tramiteData);
  return data?.data || data;
}

export async function eliminarTramiteApi(id: string): Promise<boolean> {
  const { data } = await api.delete(`tramites/${id}`);
  return data?.success ?? true;
}

export interface RequisitoProgresoItem {
  requisitoId: string;
  descripcion?: string;
  completado: boolean;
  fechaMarcado?: string;
}

export async function getProgresoTramiteApi(tramiteSlug: string): Promise<RequisitoProgresoItem[]> {
  try {
    const { data } = await api.get<any>(`progreso/${tramiteSlug}`);
    return data?.data || [];
  } catch {
    return [];
  }
}

export async function toggleRequisitoApi(
  tramiteSlug: string,
  payload: { requisitoId: string; descripcion?: string; completado: boolean; tramiteTitulo?: string }
): Promise<RequisitoProgresoItem[]> {
  try {
    const { data } = await api.post<any>(`progreso/${tramiteSlug}/toggle`, payload);
    return data?.data || [];
  } catch {
    return [];
  }
}


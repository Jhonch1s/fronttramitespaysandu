import axios from 'axios';

import type { 
    Requisito, 
    Paso, 
    Documentacion, 
    Video,
    PreguntaFrecuente,
    LugarAtencion,
    Sede,
    ContactoOrganizacion,
    CostoTramite,
    Tramite,
    Categoria,
    Organizacion,
    TipoCostoTramite,
    ModalidadTramite  
} from "../types";

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


  const { data: responseData } = await api.get<any>('/tramites', { params: cleanParams });

  const payload = responseData?.data || responseData;

  return {
    total: payload?.total ?? 0,
    page: payload?.page ?? 1,
    totalPages: payload?.totalPages ?? 1,
    items: Array.isArray(payload?.items) ? payload.items : []
  };
}


export async function buscarTramites(q: string, limit: number = 20): Promise<Tramite[]> {
  if (!q.trim()) return [];
  const { data } = await api.get<Tramite[]>('tramites/buscar', {
    params: { q, limit }
  });
  return data;
}


export async function getTramitesDestacados(): Promise<Tramite[]> {
  const { data } = await api.get<Tramite[]>('tramites/destacados');
  return data;
}


export async function getTramiteBySlug(slug: string): Promise<Tramite> {
  const { data } = await api.get<Tramite>(`tramites/${slug}`);
  return data;
}

export async function getCategorias(conConteo: boolean = true): Promise<Categoria[]> {
  const { data } = await api.get<any>('/categorias', {
    params: { conConteo }
  });

  if (Array.isArray(data)) {
    return data;
  }

  if (data && typeof data === 'object') {
    if (Array.isArray(data.categorias)) return data.categorias;
    if (Array.isArray(data.data)) return data.data;
    if (Array.isArray(data.items)) return data.items;
  }

  return [];
}
export async function getCategoriasBySlug(slug: string): Promise<Categoria>{
    const {data} = await api.get<Categoria>(`categorias/${slug}`);
    return data;
}

export async function getOrganizaciones(): Promise<Organizacion[]> {
    const { data } = await api.get<Organizacion[]>(`organizaciones/`);
    return data;
}

export async function getOrganizacionById(idOrganizacion: number): Promise<Organizacion> {
    const {data} = await api.get<Organizacion>(`organizaciones/${idOrganizacion}`);
    return data;
}

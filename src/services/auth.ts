import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || (import.meta.env.PROD ? '/api/' : 'http://localhost:3000/api/');

export interface UserProfile {
  id: string;
  username: string;
  email: string;
  rol: string;
}

export interface AuthResponse {
  token: string;
  user: UserProfile;
}

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 3000,
});

const STORAGE_KEY_TOKEN = 'tramites_token';
const STORAGE_KEY_USER = 'tramites_user';

export async function loginApi(email: string, password: string): Promise<AuthResponse> {
  try {
    const { data } = await api.post('/auth/login', { email, password });
    if (data?.data?.token) {
      setStoredAuth(data.data.token, data.data.user);
      return data.data;
    }
  } catch (err: any) {
    if (import.meta.env.PROD) throw new Error(err.response?.data?.message || 'No se pudo iniciar sesión. Intentá nuevamente.');
    console.warn('API de autenticación no disponible o credenciales locales:', err.message);
  }

  if (import.meta.env.PROD) throw new Error('Respuesta de autenticación inválida.');

  // Fallback offline con cuentas de prueba oficiales
  if (email === 'admin@paysandu.gub.uy' && password === 'AdminPaysandu2026!') {
    const mockAuth: AuthResponse = {
      token: 'mock-jwt-token-admin',
      user: {
        id: 'user-admin',
        username: 'admin',
        email: 'admin@paysandu.gub.uy',
        rol: 'ADMIN'
      }
    };
    setStoredAuth(mockAuth.token, mockAuth.user);
    return mockAuth;
  }

  if (email === 'joven@paysandu.gub.uy' && password === 'JovenPaysandu2026!') {
    const mockAuth: AuthResponse = {
      token: 'mock-jwt-token-joven',
      user: {
        id: 'user-joven',
        username: 'joven_sanducero',
        email: 'joven@paysandu.gub.uy',
        rol: 'CIUDADANO'
      }
    };
    setStoredAuth(mockAuth.token, mockAuth.user);
    return mockAuth;
  }

  // Si se registró localmente
  const registeredUsersJson = localStorage.getItem('tramites_registered_mock_users');
  if (registeredUsersJson) {
    try {
      const users: Array<{ email: string; password: string; username: string }> = JSON.parse(registeredUsersJson);
      const found = users.find((u) => u.email === email && u.password === password);
      if (found) {
        const mockAuth: AuthResponse = {
          token: `mock-jwt-token-${Date.now()}`,
          user: {
            id: `user-${Date.now()}`,
            username: found.username,
            email: found.email,
            rol: 'CIUDADANO'
          }
        };
        setStoredAuth(mockAuth.token, mockAuth.user);
        return mockAuth;
      }
    } catch {
      // Ignorar error de parsing
    }
  }

  throw new Error('Credenciales incorrectas. Verifica tu email y contraseña.');
}

export async function registerApi(data: { username: string; email: string; password: string }): Promise<UserProfile> {
  try {
    const res = await api.post('/auth/registro', data);
    if (res.data?.data) {
      return res.data.data;
    }
  } catch (err: any) {
    if (import.meta.env.PROD) throw new Error(err.response?.data?.message || 'No se pudo registrar la cuenta. Intentá nuevamente.');
    console.warn('API de registro falló o offline, guardando localmente:', err.message);
  }

  if (import.meta.env.PROD) throw new Error('Respuesta de registro inválida.');

  // Guardar en usuarios de prueba locales
  const registeredUsersJson = localStorage.getItem('tramites_registered_mock_users');
  const users = registeredUsersJson ? JSON.parse(registeredUsersJson) : [];
  if (users.some((u: any) => u.email === data.email)) {
    throw new Error('Ya existe una cuenta con este correo electrónico.');
  }

  users.push({
    username: data.username,
    email: data.email,
    password: data.password
  });
  localStorage.setItem('tramites_registered_mock_users', JSON.stringify(users));

  return {
    id: `user-${Date.now()}`,
    username: data.username,
    email: data.email,
    rol: 'CIUDADANO'
  };
}

export function getStoredToken(): string | null {
  return localStorage.getItem(STORAGE_KEY_TOKEN);
}

export function getStoredUser(): UserProfile | null {
  try {
    const userStr = localStorage.getItem(STORAGE_KEY_USER);
    return userStr ? JSON.parse(userStr) : null;
  } catch {
    return null;
  }
}

export function setStoredAuth(token: string, user: UserProfile): void {
  localStorage.setItem(STORAGE_KEY_TOKEN, token);
  localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(user));
  window.dispatchEvent(new Event('auth-change'));
}

export function clearStoredAuth(): void {
  localStorage.removeItem(STORAGE_KEY_TOKEN);
  localStorage.removeItem(STORAGE_KEY_USER);
  window.dispatchEvent(new Event('auth-change'));
}

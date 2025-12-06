import { BASE_URL } from './config';

export interface UsuarioLogin {
  id_usuario: number;
  nombre: string;
  apellido: string | null;
  email: string;
  rol_usuario: 'EMPRENDEDOR' | 'CLIENTE' | 'ADMIN';
}

export interface LoginResponse {
  mensaje: string;
  usuario: UsuarioLogin;
}

export interface RegistroData {
    nombre: string;
    apellido?: string;
    email: string;
    telefono?: string;
    password: string;
    rol_usuario: 'EMPRENDEDOR' | 'CLIENTE';
}

export async function login(email: string, password: string): Promise<LoginResponse> {
  const respuesta = await fetch(`${BASE_URL}/usuarios/login`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });

  const data = await respuesta.json();

  if (!respuesta.ok) {
    throw new Error(data.mensaje || 'Credenciales inválidas o error de conexión.');
  }

  return data;
}

export async function register(data: RegistroData): Promise<void> {
    const response = await fetch(`${BASE_URL}/usuarios/registro`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    const responseData = await response.json();

    if (!response.ok) {
        throw new Error(responseData.mensaje || 'Error desconocido al intentar registrar.');
    }
}
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
    throw new Error(data.mensaje || 'Error al iniciar sesión');
  }

  return data;
}

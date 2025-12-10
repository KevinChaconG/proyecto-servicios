import { BASE_URL } from './config';

export interface Servicio {
  id_servicio: number;
  id_emprendedor: number;
  id_categoria: number | null;
  titulo: string;
  descripcion: string;
  precio_base: number | string | null;
  contacto_email?: string | null;
  direccion_referencia?: string | null;
  lat?: number | null;
  lng?: number | null;
  activo: number;
  calificacion_promedio: number;
}

export interface CrearServicioPayload {
  id_emprendedor: number;
  id_categoria: number;
  titulo: string;
  descripcion: string;
  precio_base: number;
  contacto_email?: string | null;
  direccion_referencia?: string | null;
  lat?: number | null;
  lng?: number | null;
}

export interface ActualizarServicioPayload {
  titulo?: string;
  descripcion?: string;
  precio_base?: number;
  contacto_email?: string | null;
  direccion_referencia?: string | null;
  lat?: number | null;
  lng?: number | null;
  id_categoria?: number;
  activo?: number;
}

export interface ServicioDisponible {
  id_servicio: number;
  id_emprendedor: number;
  titulo: string;
  descripcion: string;
  precio_base: number | string | null;
  contacto_email?: string | null;
  direccion_referencia?: string | null;
  lat?: number | string | null;
  lng?: number | string | null;
  calificacion_promedio?: number | string | null;
  nombre: string;   
  apellido: string; 
}

export async function crearServicio(payload: CrearServicioPayload): Promise<void> {
  const response = await fetch(`${BASE_URL}/servicios`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.mensaje || 'Fallo al crear el servicio.');
  }
}

export async function obtenerServiciosPorEmprendedor(
  id_emprendedor: number
): Promise<Servicio[]> {
  const response = await fetch(
    `${BASE_URL}/servicios/emprendedor/${id_emprendedor}`
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.mensaje || 'Fallo al obtener los servicios.');
  }

  return data;
}

export async function actualizarServicio(
  id_servicio: number,
  payload: ActualizarServicioPayload
): Promise<void> {
  const response = await fetch(`${BASE_URL}/servicios/${id_servicio}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.mensaje || 'Fallo al actualizar el servicio.');
  }
}

export async function eliminarServicio(id_servicio: number): Promise<void> {
  const response = await fetch(`${BASE_URL}/servicios/${id_servicio}`, {
    method: 'DELETE',
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.mensaje || 'Fallo al eliminar el servicio.');
  }
}

export async function obtenerServiciosDisponibles(): Promise<ServicioDisponible[]> {
  const response = await fetch(`${BASE_URL}/servicios/disponibles`);

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.mensaje || 'Fallo al obtener los servicios disponibles.');
  }

  return data;
}

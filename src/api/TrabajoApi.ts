import { BASE_URL } from './config';

export interface SolicitudTrabajoPayload {
  id_servicio: number;
  id_cliente: number;
  direccion_trabajo: string;
  mensaje_cliente: string;
  lat?: number | null;
  lng?: number | null;
}

export interface SolicitudTrabajo {
  id_trabajo: number;
  id_servicio: number;
  id_cliente: number;
  fecha_solicitud: string;
  direccion_trabajo: string | null;
  mensaje_cliente: string | null;
  estado: string;
  cliente_nombre: string;
  cliente_apellido: string;
  cliente_telefono: string | null;
  servicio_titulo: string;
}

export interface TrabajoCliente {
  id_trabajo: number;
  id_servicio: number;
  id_emprendedor: number;
  fecha_solicitud: string;
  direccion_trabajo: string | null;
  mensaje_cliente: string | null;
  estado: 'PENDIENTE' | 'EN_PROCESO' | 'COMPLETADO' | 'CANCELADO';
  servicio_titulo: string;
  emprendedor_nombre: string;
  emprendedor_apellido: string;
}

export async function crearSolicitudTrabajo(
  payload: SolicitudTrabajoPayload
): Promise<void> {
  const response = await fetch(`${BASE_URL}/trabajo/solicitar`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.mensaje || 'Fallo al crear la solicitud de trabajo.');
  }
}

export async function obtenerSolicitudesPorEmprendedor(idEmprendedor: number): Promise<SolicitudTrabajo[]> {
  const response = await fetch(`${BASE_URL}/trabajo/emprendedor/${idEmprendedor}`);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.mensaje || "Error al obtener solicitudes.");
  }

  return data;
}

export async function actualizarEstadoTrabajo(
  id_trabajo: number,
  estado: 'PENDIENTE' | 'EN_PROCESO' | 'COMPLETADO' | 'CANCELADO'
): Promise<void> {
  const response = await fetch(`${BASE_URL}/trabajo/${id_trabajo}/estado`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ estado }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.mensaje || 'Error al actualizar estado del trabajo.');
  }
}

export async function obtenerTrabajosPorCliente(
  idCliente: number
): Promise<TrabajoCliente[]> {
  const response = await fetch(`${BASE_URL}/trabajo/cliente/${idCliente}`);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.mensaje || 'Error al obtener trabajos del cliente.');
  }

  return data;
}

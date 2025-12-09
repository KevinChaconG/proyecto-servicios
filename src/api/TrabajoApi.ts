import { BASE_URL } from './config';

export interface TrabajoEmprendedorPayload {
  id_emprendedor: number;
  descripcion: string;
  precio_acordado: number;
  direccion_trabajo: string | null;
  lat: number;
  lng: number;
  estado?: string; 
}

export async function crearTrabajoEmprendedor(
  trabajo: TrabajoEmprendedorPayload
): Promise<void> {
  const response = await fetch(`${BASE_URL}/trabajo/publicar`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(trabajo),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.mensaje || 'Fallo al publicar el trabajo.');
  }
}

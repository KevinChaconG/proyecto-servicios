import { BASE_URL } from './config';

interface SolicitudTrabajo {
    id_servicio: string;
    id_cliente: number;
    id_emprendedor: number;
    direccion_trabajo: string;
    mensaje_cliente: string;
}

export async function crearSolicitudTrabajo(solicitud: SolicitudTrabajo): Promise<void> {
    const response = await fetch(`${BASE_URL}/trabajo/solicitar`, { 
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(solicitud),
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.mensaje || 'Fallo al crear la solicitud de trabajo.');
    }
}
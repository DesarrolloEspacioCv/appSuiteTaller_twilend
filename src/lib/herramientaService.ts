import axios from 'axios';

const API = 'https://espacio.uy/APP/Api/herramientas.php';

// Interfaz para tipo fuerte
export interface Herramienta {
  id?: number;
  nombre: string;
  cantidad: number;
  ubicacion: string;
  estado: 'bueno' | 'reparacion' | 'roto';
  empleado_asignado: number | null;
}

// Obtener todas las herramientas
export const getHerramientas = async (): Promise<Herramienta[]> => {
  const res = await axios.get(API);
  return res.data;
};

// Agregar nueva herramienta
export const agregarHerramienta = async (data: Herramienta) => {
  const res = await axios.post(API, data);
  return res.data;
};

// Editar herramienta existente
export const editarHerramienta = async (data: Herramienta) => {
  const res = await axios.put(API, data);
  return res.data;
};

// Eliminar herramienta (vía POST simulando acción)
export const eliminarHerramienta = async (id: number) => {
  const res = await axios.post(API, {
    accion: 'eliminar',
    id
  });
  return res.data;
};

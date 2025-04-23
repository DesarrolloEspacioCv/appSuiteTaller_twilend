import axios from "axios";

const API = "https://espacio.uy/APP/Api/tareas.php";

export interface Tarea {
  id?: number;
  estacion_id: number;
  nombre: string;
  descripcion: string;
  empleados_asignados: number[];
  estado: "pendiente" | "en_proceso" | "completada";
  fecha_limite: string;
  comentarios: string;
}

// Obtener todas las tareas
export const getTareas = async (): Promise<Tarea[]> => {
  const res = await axios.get(API);
  return res.data.map((t: any) => ({
    ...t,
    empleados_asignados: JSON.parse(t.empleados_asignados || "[]"),
  }));
};

// Obtener tareas por estación
export const getTareasPorEstacion = async (estacionId: number): Promise<Tarea[]> => {
  const res = await axios.get(`${API}?estacion_id=${estacionId}`);
  return res.data.map((t: any) => ({
    ...t,
    empleados_asignados: JSON.parse(t.empleados_asignados || "[]"),
  }));
};

// Crear tarea
export const crearTarea = async (data: Tarea) => {
  return axios.post(API, {
    ...data,
    empleados_asignados: JSON.stringify(data.empleados_asignados)
  }).then(res => res.data);
};

// Editar tarea
export const editarTarea = async (data: Tarea) => {
  return axios.put(API, {
    ...data,
    empleados_asignados: JSON.stringify(data.empleados_asignados)
  }).then(res => res.data);
};

// Eliminar tarea
export const eliminarTarea = async (id: number) => {
  return axios.delete(API, { data: { id } }).then(res => res.data);
};

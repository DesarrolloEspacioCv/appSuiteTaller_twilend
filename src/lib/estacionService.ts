import axios from "axios";

const API = "https://espacio.uy/APP/Api/estaciones.php";
const API_EMPLEADOS = "https://espacio.uy/APP/Api/usuarios.php?rol=empleado";
const API_HERRAMIENTAS = "https://espacio.uy/APP/Api/herramientas.php";

export interface Estacion {
  id?: number;
  nombre: string;
  descripcion: string;
  tipo: string;
  fecha_limite: string;
  empleados_asignados: number[];
  herramientas_asignadas: number[];
}

export interface Empleado {
  id: number;
  nombre: string;
}

export interface Herramienta {
  id: number;
  nombre: string;
}

// Listar estaciones
export const getEstacion = async (): Promise<Estacion[]> => {
  const res = await axios.get(API);
    console.log("Estaciones recibidas:", res.data); // 🔍

  return res.data.map((e: any) => ({
    ...e,
    empleados_asignados: Array.isArray(e.empleados_asignados) ? e.empleados_asignados : JSON.parse(e.empleados_asignados || "[]"),
    herramientas_asignadas: Array.isArray(e.herramientas_asignadas) ? e.herramientas_asignadas : JSON.parse(e.herramientas_asignadas || "[]")
  }));
};

// Listar empleados
export const getEmpleados = async (): Promise<Empleado[]> => {
  const res = await axios.get(API_EMPLEADOS);
  return res.data;
};

// Listar herramientas
export const getHerramientas = async (): Promise<Herramienta[]> => {
  const res = await axios.get(API_HERRAMIENTAS);
  return res.data;
};

// Agregar estación
export const addEstacion = async (data: Estacion) => {
  return axios.post(API, {
    ...data,
    empleados_asignados: JSON.stringify(data.empleados_asignados),
    herramientas_asignadas: JSON.stringify(data.herramientas_asignadas),
  }).then((res) => res.data);
};

// Editar estación
export const editEstacion = async (data: Estacion) => {
  return axios.put(API, {
    ...data,
    empleados_asignados: JSON.stringify(data.empleados_asignados),
    herramientas_asignadas: JSON.stringify(data.herramientas_asignadas),
  }).then((res) => res.data);
};

// Eliminar estación
export const deleteEstacion = async (id: number) => {
  const res = await axios.delete(API, { data: { id } });
  return res.data;
};

import axios from "axios";

const API = "https://espacio.uy/APP/Api/usuarios.php";

export type PatronForm = {
  nombre: string;
  email: string;
  contraseña: string;
  profesion: string;
  rol?: string;
  fecha_ingreso?: string;
  carga_horaria?: number | null;
};

// 🔄 Obtener lista de empleados
export const getEmpleados = () =>
  axios.get(`${API}?rol=empleado`).then((res) => res.data);

export const registrarPatronEnPHP = async (datos: PatronForm) => {
  const {  rol = "patron", profesion, carga_horaria, ...resto } = datos;

  const dataAEnviar = {
    ...resto,
    rol,
    profesion: rol === "patron" ? (profesion || "Patrón") : profesion,
    fecha_ingreso: new Date().toISOString(),
    carga_horaria: rol === "patron" ? null : carga_horaria ?? 0
  };

  return axios.post(API, dataAEnviar);
};


export const iniciarSesionEnPHP = async (email: string, contraseña: string) => {
  return axios.post("https://espacio.uy/APP/Api/login.php", {
    email,
    contraseña
  }).then(res => res.data);
};


export const getUsuarios = () =>
  axios.get(`${API}?rol=empleado`).then((res) => res.data);

export const addUsuario = (datos: any) =>
  axios.post(API, { ...datos, rol: "empleado" });

export const editUsuario = (datos: any) =>
  axios.put(API, datos); // ✅ PUT

export const deleteUsuario = (id: number) =>
  axios.post(API, {
    accion: "eliminar",
    id
  });
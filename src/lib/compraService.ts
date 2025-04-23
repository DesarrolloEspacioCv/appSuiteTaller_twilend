import axios from 'axios';
const API = 'https://espacio.uy/APP/Api/compras.php';

export const getCompras   = () => axios.get(API).then(r=>r.data);
export const addCompra    = (d:any)=> axios.post(API,d).then(r=>r.data);
export const editCompra   = (d:any)=> axios.put(API,d).then(r=>r.data);
export const deleteCompra = (id:number)=>axios.delete(`${API}?id=${id}`).then(r=>r.data);
export const getCompraById = async (id: number) => {
    const res = await axios.get(`https://espacio.uy/APP/Api/compras.php?id=${id}`);
    return res.data; // Asegurate de que devuelva solo una compra
  };
  
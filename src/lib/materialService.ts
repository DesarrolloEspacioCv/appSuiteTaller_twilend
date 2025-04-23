import axios from 'axios';
const API = 'https://espacio.uy/APP/Api/materiales.php';

export const getMateriales   = () => axios.get(API).then(r => r.data);
export const addMaterial     = (d:any)=> axios.post(API,d).then(r=>r.data);
export const editMaterial    = (d:any)=> axios.put(API,d).then(r=>r.data);
export const deleteMaterial  = (id:number)=>axios.delete(`${API}?id=${id}`).then(r=>r.data);

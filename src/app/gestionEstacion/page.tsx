"use client";

import { useEffect, useState } from "react";
import {
  getEstacion,
  addEstacion,
  editEstacion,
  deleteEstacion,
  getEmpleados,
  getHerramientas,
  Empleado,
  Herramienta,
} from "@/lib/estacionService";
import { getTareasPorEstacion, Tarea } from "@/lib/tareaService";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import {
  ClipboardList,
  CalendarDays,
  Users,
  Wrench,
  Info,
  LayoutTemplate,
  Hourglass,
} from "lucide-react";

interface EstacionForm {
  id?: number;
  nombre: string;
  descripcion: string;
  tipo: string;
  fecha_limite: string;
  empleados_asignados: number[];
  herramientas_asignadas: number[];
}

export default function GestionEstacionPage() {
  const init: EstacionForm = {
    nombre: "",
    descripcion: "",
    tipo: "general",
    fecha_limite: "",
    empleados_asignados: [],
    herramientas_asignadas: [],
  };

  const [form, setForm] = useState<EstacionForm>(init);
  const [editando, setEditando] = useState(false);
  const [lista, setLista] = useState<EstacionForm[]>([]);
  const [empleados, setEmpleados] = useState<Empleado[]>([]);
  const [herramientas, setHerramientas] = useState<Herramienta[]>([]);
  const [tareasPorEstacion, setTareasPorEstacion] = useState<Record<number, Tarea[]>>({});
  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    const cargar = async () => {
      const estaciones = await getEstacion();
      const tareasMap: Record<number, Tarea[]> = {};
      await Promise.all(estaciones.map(async (e) => {
        tareasMap[e.id!] = await getTareasPorEstacion(e.id!);
      }));
      setLista(estaciones);
      setTareasPorEstacion(tareasMap);
      setEmpleados(await getEmpleados());
      setHerramientas(await getHerramientas());
    };
    cargar();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const toggleEmpleado = (id: number) => {
    setForm((prev) => ({
      ...prev,
      empleados_asignados: prev.empleados_asignados.includes(id)
        ? prev.empleados_asignados.filter((e) => e !== id)
        : [...prev.empleados_asignados, id],
    }));
  };

  const toggleHerramienta = (id: number) => {
    setForm((prev) => ({
      ...prev,
      herramientas_asignadas: prev.herramientas_asignadas.includes(id)
        ? prev.herramientas_asignadas.filter((h) => h !== id)
        : [...prev.herramientas_asignadas, id],
    }));
  };

  const guardar = async () => {
    editando ? await editEstacion(form) : await addEstacion(form);
    toast({ title: "Estación guardada." });
    setForm(init);
    setEditando(false);
    setDialogOpen(false);
    setLista(await getEstacion());
  };

  const iniciarEdicion = (est: EstacionForm) => {
    setForm(est);
    setEditando(true);
    setDialogOpen(true);
  };

  const eliminar = async (id?: number) => {
    if (!id) return;
    await deleteEstacion(id);
    toast({ title: "Estación eliminada." });
    setLista(await getEstacion());
  };

  const getNombres = (ids: number[], lista: { id: number; nombre: string }[]) =>
    lista.filter((i) => ids.includes(i.id)).map((i) => i.nombre).join(", ");

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8 md:px-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
          <ClipboardList size={22} /> Gestión de Estaciones
        </h2>
        <Button onClick={() => setDialogOpen(true)} variant="outline">Nueva estación</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {lista.map((e) => (
          <div key={e.id} className="border p-4 rounded-md shadow-md bg-white space-y-2">
            <h3 className="font-semibold text-lg flex items-center gap-2">
              <ClipboardList size={18} /> {e.nombre}
            </h3>
            <p className="text-sm text-muted-foreground flex items-center gap-2"><Info size={14} /> {e.descripcion}</p>
            <p className="text-sm flex items-center gap-2"><LayoutTemplate size={14} /> <strong>Tipo:</strong> {e.tipo}</p>
            <p className="text-sm flex items-center gap-2"><CalendarDays size={14} /> <strong>Fecha límite:</strong> {e.fecha_limite}</p>
            <p className="text-sm flex items-center gap-2"><Users size={14} /> <strong>Empleados:</strong> {getNombres(e.empleados_asignados, empleados)}</p>
            <p className="text-sm flex items-center gap-2"><Wrench size={14} /> <strong>Herramientas:</strong> {getNombres(e.herramientas_asignadas, herramientas)}</p>
            <div className="mt-2">
              <p className="font-semibold text-sm">Tareas:</p>
              {Array.isArray(tareasPorEstacion[e.id!]) && tareasPorEstacion[e.id!].length > 0 && (
                <ul className="list-disc pl-4 text-xs">
                  {tareasPorEstacion[e.id!].map((t) => (
                    <li key={t.id}>{t.nombre}</li>
                  ))}
                </ul>
              )}
            </div>
            <div className="flex gap-2 mt-2">
              <Button size="sm" onClick={() => iniciarEdicion(e)}>Editar</Button>
              <Button size="sm" variant="destructive" onClick={() => eliminar(e.id)}>Eliminar</Button>
            </div>
          </div>
        ))}
      </div>

      <AlertDialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{editando ? "Editar estación" : "Nueva estación"}</AlertDialogTitle>
          </AlertDialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right flex items-center gap-2"><ClipboardList size={14} /> Nombre</Label>
              <Input name="nombre" value={form.nombre} onChange={handleChange} className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right flex items-center gap-2"><Info size={14} /> Descripción</Label>
              <Textarea name="descripcion" value={form.descripcion} onChange={handleChange} className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right flex items-center gap-2"><LayoutTemplate size={14} /> Tipo</Label>
              <select name="tipo" value={form.tipo} onChange={handleChange} className="col-span-3 border rounded px-2 py-1">
                <option value="general">General</option>
                <option value="produccion">Producción</option>
                <option value="diseño">Diseño</option>
              </select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right flex items-center gap-2"><CalendarDays size={14} /> Fecha Límite</Label>
              <Input type="date" name="fecha_limite" value={form.fecha_limite} onChange={handleChange} className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-start gap-4">
              <Label className="text-right flex items-center gap-2"><Users size={14} /> Empleados</Label>
              <div className="col-span-3 grid grid-cols-2 gap-2">
                {empleados.map((e) => (
                  <label key={e.id} className="flex items-center gap-2">
                    <input type="checkbox" checked={form.empleados_asignados.includes(e.id)} onChange={() => toggleEmpleado(e.id)} />
                    <span>{e.nombre}</span>
                  </label>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-4 items-start gap-4">
              <Label className="text-right flex items-center gap-2"><Wrench size={14} /> Herramientas</Label>
              <div className="col-span-3 grid grid-cols-2 gap-2">
                {herramientas.map((h) => (
                  <label key={h.id} className="flex items-center gap-2">
                    <input type="checkbox" checked={form.herramientas_asignadas.includes(h.id)} onChange={() => toggleHerramienta(h.id)} />
                    <span>{h.nombre}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={guardar}>{editando ? "Actualizar" : "Guardar"}</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
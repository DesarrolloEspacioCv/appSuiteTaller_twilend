"use client";

import { useEffect, useState } from "react";
import {
  getTareas,
  crearTarea,
  editarTarea,
  eliminarTarea,
  Tarea,
} from "@/lib/tareaService";
import { getEstacion, getEmpleados, Empleado } from "@/lib/estacionService";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { ClipboardList, CalendarDays, Users, Settings, MessageSquare, Building2 } from "lucide-react";

export default function GestionTareasPage() {
  const [tareas, setTareas] = useState<Tarea[]>([]);
  const [form, setForm] = useState<Tarea>({
    estacion_id: 0,
    nombre: "",
    descripcion: "",
    empleados_asignados: [],
    estado: "pendiente",
    fecha_limite: "",
    comentarios: "",
  });
  const [estaciones, setEstaciones] = useState<any[]>([]);
  const [empleados, setEmpleados] = useState<Empleado[]>([]);
  const [editando, setEditando] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    cargarDatos();
  }, []);

  const cargarDatos = async () => {
    setTareas(await getTareas());
    setEstaciones(await getEstacion());
    setEmpleados(await getEmpleados());
  };

  const handleChange = (e: React.ChangeEvent<any>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const toggleEmpleado = (id: number) => {
    setForm((prev) => ({
      ...prev,
      empleados_asignados: prev.empleados_asignados.includes(id)
        ? prev.empleados_asignados.filter((e) => e !== id)
        : [...prev.empleados_asignados, id],
    }));
  };

  const guardar = async () => {
    editando ? await editarTarea(form) : await crearTarea(form);
    setForm({
      estacion_id: 0,
      nombre: "",
      descripcion: "",
      empleados_asignados: [],
      estado: "pendiente",
      fecha_limite: "",
      comentarios: "",
    });
    setEditando(false);
    setDialogOpen(false);
    cargarDatos();
  };

  const iniciarEdicion = (t: Tarea) => {
    setForm(t);
    setEditando(true);
    setDialogOpen(true);
  };

  const eliminar = async (id?: number) => {
    if (!id) return;
    await eliminarTarea(id);
    cargarDatos();
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col px-4 py-8 md:px-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Gestión de Tareas</h2>
        <AlertDialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <AlertDialogTrigger asChild>
            <Button>+ Nueva Tarea</Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>{editando ? "Editar Tarea" : "Crear Tarea"}</AlertDialogTitle>
            </AlertDialogHeader>
            <div className="space-y-4">
              <div className="space-y-1">
                <Label htmlFor="estacion_id" className="flex items-center gap-2">
                  <Building2 size={16} /> Estación
                </Label>
                <select name="estacion_id" value={form.estacion_id} onChange={handleChange} className="w-full border rounded px-3 py-2">
                  <option value={0}>-- Seleccionar estación --</option>
                  {estaciones.map((e) => (
                    <option key={e.id} value={e.id}>{e.nombre}</option>
                  ))}
                </select>
              </div>
              <div className="space-y-1">
                <Label htmlFor="nombre" className="flex items-center gap-2">
                  <ClipboardList size={16} /> Nombre
                </Label>
                <Input name="nombre" value={form.nombre} onChange={handleChange} />
              </div>
              <div className="space-y-1">
                <Label htmlFor="descripcion">Descripción</Label>
                <textarea name="descripcion" value={form.descripcion} onChange={handleChange} className="w-full border rounded px-3 py-2" />
              </div>
              <div className="space-y-1">
                <Label htmlFor="fecha_limite" className="flex items-center gap-2">
                  <CalendarDays size={16} /> Fecha Límite
                </Label>
                <Input type="date" name="fecha_limite" value={form.fecha_limite} onChange={handleChange} />
              </div>
              <div className="space-y-1">
                <Label htmlFor="estado" className="flex items-center gap-2">
                  <Settings size={16} /> Estado
                </Label>
                <select name="estado" value={form.estado} onChange={handleChange} className="w-full border rounded px-3 py-2">
                  <option value="pendiente">Pendiente</option>
                  <option value="en_proceso">En proceso</option>
                  <option value="completada">Completada</option>
                </select>
              </div>
              <div className="space-y-1">
                <Label htmlFor="comentarios" className="flex items-center gap-2">
                  <MessageSquare size={16} /> Comentarios
                </Label>
                <textarea name="comentarios" value={form.comentarios} onChange={handleChange} className="w-full border rounded px-3 py-2" />
              </div>
              <div>
                <Label className="flex items-center gap-2 mb-2">
                  <Users size={16} /> Empleados asignados
                </Label>
                <div className="grid grid-cols-2 gap-1">
                  {empleados.map((emp) => (
                    <label key={emp.id} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={form.empleados_asignados.includes(emp.id)}
                        onChange={() => toggleEmpleado(emp.id)}
                      />
                      <span>{emp.nombre}</span>
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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {tareas.map((t) => (
          <Card key={t.id} className="shadow-md">
            <CardHeader>
              <CardTitle className="text-lg font-semibold flex items-center gap-2">
                <ClipboardList size={18} /> {t.nombre}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <p className="flex items-center gap-2"><Building2 size={14} /> <strong>Estación:</strong> {estaciones.find((e) => e.id === t.estacion_id)?.nombre || "-"}</p>
              <p className="flex items-center gap-2"><Settings size={14} /> <strong>Estado:</strong> {t.estado}</p>
              <p className="flex items-center gap-2"><CalendarDays size={14} /> <strong>Fecha límite:</strong> {t.fecha_limite}</p>
              <div className="flex gap-2 pt-2">
                <Button size="sm" variant="outline" onClick={() => iniciarEdicion(t)}>Editar</Button>
                <Button size="sm" variant="destructive" onClick={() => eliminar(t.id)}>Eliminar</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

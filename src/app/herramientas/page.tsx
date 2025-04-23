"use client";

import { useEffect, useState } from "react";
import {
  getHerramientas,
  agregarHerramienta,
  editarHerramienta,
  eliminarHerramienta,
  Herramienta,
} from "@/lib/herramientaService";
import { getEmpleados } from "@/lib/usuarioService";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
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
import { Wrench, MapPin, PackageCheck, Users, Box, Settings } from "lucide-react";

interface Empleado {
  id: number;
  nombre: string;
}

export default function HerramientasPage() {
  const init: Herramienta = {
    nombre: "",
    cantidad: 0,
    ubicacion: "",
    estado: "bueno",
    empleado_asignado: null,
  };

  const [lista, setLista] = useState<Herramienta[]>([]);
  const [form, setForm] = useState<Herramienta>(init);
  const [edit, setEdit] = useState(false);
  const [empleados, setEmpleados] = useState<Empleado[]>([]);
  const [modalOpen, setModalOpen] = useState(false);

  const cargarTodo = async () => {
    setLista(await getHerramientas());
    setEmpleados(await getEmpleados());
  };

  useEffect(() => {
    cargarTodo();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: name === "cantidad" || name === "empleado_asignado" ? parseInt(value) : value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    edit ? await editarHerramienta(form) : await agregarHerramienta(form);
    setForm(init);
    setEdit(false);
    setModalOpen(false);
    cargarTodo();
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col px-4 py-8 md:px-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Gestión de Herramientas</h2>
        <AlertDialog open={modalOpen} onOpenChange={setModalOpen}>
          <AlertDialogTrigger asChild>
            <Button>+ Nueva Herramienta</Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>{edit ? "Editar Herramienta" : "Agregar Herramienta"}</AlertDialogTitle>
            </AlertDialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1">
                <Label htmlFor="nombre" className="flex items-center gap-2">
                  <Wrench size={16} /> Nombre
                </Label>
                <Input name="nombre" id="nombre" value={form.nombre} onChange={handleChange} required />
              </div>
              <div className="space-y-1">
                <Label htmlFor="cantidad" className="flex items-center gap-2">
                  <Box size={16} /> Cantidad
                </Label>
                <Input name="cantidad" type="number" value={form.cantidad} onChange={handleChange} required />
              </div>
              <div className="space-y-1">
                <Label htmlFor="ubicacion" className="flex items-center gap-2">
                  <MapPin size={16} /> Ubicación
                </Label>
                <Input name="ubicacion" value={form.ubicacion} onChange={handleChange} required />
              </div>
              <div className="space-y-1">
                <Label htmlFor="estado" className="flex items-center gap-2">
                  <Settings size={16} /> Estado
                </Label>
                <select name="estado" value={form.estado} onChange={handleChange} className="w-full border rounded px-3 py-2">
                  <option value="bueno">Bueno</option>
                  <option value="reparacion">Reparación</option>
                  <option value="roto">Roto</option>
                </select>
              </div>
              <div className="space-y-1">
                <Label htmlFor="empleado_asignado" className="flex items-center gap-2">
                  <Users size={16} /> Asignado a
                </Label>
                <select name="empleado_asignado" value={form.empleado_asignado ?? 0} onChange={handleChange} className="w-full border rounded px-3 py-2">
                  <option value={0}>-- Seleccionar empleado --</option>
                  {empleados.map((e) => (
                    <option key={e.id} value={e.id}>{e.nombre}</option>
                  ))}
                </select>
              </div>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                <AlertDialogAction type="submit">{edit ? "Actualizar" : "Agregar"}</AlertDialogAction>
              </AlertDialogFooter>
            </form>
          </AlertDialogContent>
        </AlertDialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {lista.map((h) => (
          <Card key={h.id} className="shadow-md">
            <CardHeader>
              <CardTitle className="text-lg font-semibold flex items-center gap-2">
                <Wrench size={18} /> {h.nombre}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <p className="flex items-center gap-2">
                <Box size={16} /> <span><strong>Cantidad:</strong> {h.cantidad}</span>
              </p>
              <p className="flex items-center gap-2">
                <MapPin size={16} /> <span><strong>Ubicación:</strong> {h.ubicacion}</span>
              </p>
              <p className="flex items-center gap-2">
                <Settings size={16} /> <span><strong>Estado:</strong> {h.estado}</span>
              </p>
              <p className="flex items-center gap-2">
                <Users size={16} /> <span><strong>Asignado a:</strong> {empleados.find(e => e.id === h.empleado_asignado)?.nombre ?? "Sin asignar"}</span>
              </p>
              <div className="flex gap-3 pt-2">
                <Button size="sm" variant="outline" onClick={() => { setForm(h); setEdit(true); setModalOpen(true); }}>
                  Editar
                </Button>
                <Button size="sm" variant="destructive" onClick={() => h.id && eliminarHerramienta(h.id).then(cargarTodo)}>
                  Eliminar
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
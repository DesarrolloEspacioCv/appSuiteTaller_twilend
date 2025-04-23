"use client";

import { useEffect, useState } from "react";
import {
  getUsuarios,
  addUsuario,
  editUsuario,
  deleteUsuario,
} from "@/lib/usuarioService";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { User, Mail, Briefcase, Timer } from "lucide-react";

interface Usuario {
  id?: number;
  nombre: string;
  email: string;
  contraseña?: string;
  profesion: string;
  carga_horaria?: number;
}

export default function EmpleadosPage() {
  const init: Usuario = {
    nombre: "",
    email: "",
    contraseña: "",
    profesion: "",
    carga_horaria: 0,
  };

  const [lista, setLista] = useState<Usuario[]>([]);
  const [form, setForm] = useState<Usuario>(init);
  const [editando, setEditando] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);

  const cargarDatos = async () => {
    try {
      setLista(await getUsuarios());
    } catch {
      toast({ title: "Error", description: "No se pudieron cargar los empleados", variant: "destructive" });
    }
  };

  useEffect(() => {
    cargarDatos();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: name === "carga_horaria" ? parseInt(value) : value });
  };

  const guardar = async () => {
    try {
      if (editando) {
        await editUsuario(form);
      } else {
        await addUsuario(form);
      }
      toast({ title: "Empleado guardado correctamente." });
      setForm(init);
      setDialogOpen(false);
      setEditando(false);
      cargarDatos();
    } catch {
      toast({ title: "Error al guardar", variant: "destructive" });
    }
  };

  const iniciarEdicion = (usuario: Usuario) => {
    setForm(usuario);
    setEditando(true);
    setDialogOpen(true);
  };

  const eliminar = async (id?: number) => {
    if (!id) return;
    await deleteUsuario(id);
    toast({ title: "Empleado eliminado." });
    cargarDatos();
  };

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8 md:px-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Gestión de Empleados</h2>

      <div className="text-right mb-6">
        <Button onClick={() => setDialogOpen(true)} variant="outline">
          + Nuevo empleado
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {lista.map((u) => (
          <Card key={u.id} className="shadow-md">
            <CardHeader>
              <CardTitle className="text-lg font-semibold flex items-center gap-2">
                <User size={18} /> {u.nombre}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-1 text-sm">
              <p className="flex items-center gap-2"><Mail size={14} /> {u.email}</p>
              <p className="flex items-center gap-2"><Briefcase size={14} /> {u.profesion}</p>
              <p className="flex items-center gap-2"><Timer size={14} /> Carga horaria: {u.carga_horaria ?? "-"}</p>
              <div className="flex flex-wrap gap-2 pt-2">
                <Button size="sm" onClick={() => iniciarEdicion(u)}>Editar</Button>
                <Button size="sm" variant="destructive" onClick={() => eliminar(u.id)}>Eliminar</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <AlertDialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{editando ? "Editar empleado" : "Nuevo empleado"}</AlertDialogTitle>
          </AlertDialogHeader>

          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">Nombre</Label>
              <Input name="nombre" value={form.nombre} onChange={handleChange} className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">Email</Label>
              <Input name="email" value={form.email} onChange={handleChange} className="col-span-3" />
            </div>
            {!editando && (
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right">Contraseña</Label>
                <Input name="contraseña" type="password" value={form.contraseña} onChange={handleChange} className="col-span-3" />
              </div>
            )}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">Profesión</Label>
              <Input name="profesion" value={form.profesion} onChange={handleChange} className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">Carga Horaria</Label>
              <Input name="carga_horaria" type="number" value={form.carga_horaria ?? 0} onChange={handleChange} className="col-span-3" />
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
"use client";

import { useEffect, useState } from "react";
import {
  getMateriales,
  addMaterial,
  editMaterial,
  deleteMaterial,
} from "@/lib/materialService";
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
import { Package, Layers, Box, MapPin, Tag } from "lucide-react";

interface Material {
  id?: number;
  nombre: string;
  cantidad: number;
  tipo: string;
  unidad: string;
  ubicacion: string;
}

export default function MaterialesPage() {
  const init: Material = {
    nombre: "",
    cantidad: 1,
    tipo: "",
    unidad: "",
    ubicacion: "",
  };

  const [lista, setLista] = useState<Material[]>([]);
  const [form, setForm] = useState<Material>(init);
  const [editando, setEditando] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);

  const cargarMateriales = async () => {
    const data = await getMateriales();
    setLista(data);
  };

  useEffect(() => {
    cargarMateriales();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: name === "cantidad" ? parseInt(value) : value });
  };

  const guardar = async () => {
    editando ? await editMaterial(form) : await addMaterial(form);
    setForm(init);
    setEditando(false);
    setDialogOpen(false);
    cargarMateriales();
  };

  const iniciarEdicion = (material: Material) => {
    setForm(material);
    setEditando(true);
    setDialogOpen(true);
  };

  const eliminar = async (id?: number) => {
    if (!id) return;
    await deleteMaterial(id);
    cargarMateriales();
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col px-4 py-8 md:px-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Gestión de Materiales</h2>
        <AlertDialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <AlertDialogTrigger asChild>
            <Button>+ Nuevo Material</Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>{editando ? "Editar Material" : "Agregar Material"}</AlertDialogTitle>
            </AlertDialogHeader>
            <div className="space-y-4">
              <div className="space-y-1">
                <Label htmlFor="nombre" className="flex items-center gap-2">
                  <Package size={16} /> Nombre
                </Label>
                <Input name="nombre" value={form.nombre} onChange={handleChange} />
              </div>
              <div className="space-y-1">
                <Label htmlFor="cantidad" className="flex items-center gap-2">
                  <Box size={16} /> Cantidad
                </Label>
                <Input type="number" name="cantidad" value={form.cantidad} onChange={handleChange} />
              </div>
              <div className="space-y-1">
                <Label htmlFor="tipo" className="flex items-center gap-2">
                  <Layers size={16} /> Tipo
                </Label>
                <select name="tipo" value={form.tipo} onChange={handleChange} className="w-full border rounded px-3 py-2">
                  <option value="">-- Seleccionar tipo --</option>
                  <option value="materia prima">Materia Prima</option>
                  <option value="accesorio">Accesorio</option>
                  <option value="insumo">Insumo</option>
                </select>
              </div>
              <div className="space-y-1">
                <Label htmlFor="unidad" className="flex items-center gap-2">
                  <Tag size={16} /> Unidad
                </Label>
                <select name="unidad" value={form.unidad} onChange={handleChange} className="w-full border rounded px-3 py-2">
                  <option value="">-- Seleccionar unidad --</option>
                  <option value="kg">Kilogramos</option>
                  <option value="m">Metros</option>
                  <option value="lts">Litros</option>
                  <option value="uds">Unidades</option>
                </select>
              </div>
              <div className="space-y-1">
                <Label htmlFor="ubicacion" className="flex items-center gap-2">
                  <MapPin size={16} /> Ubicación
                </Label>
                <Input name="ubicacion" value={form.ubicacion} onChange={handleChange} />
              </div>
            </div>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancelar</AlertDialogCancel>
              <AlertDialogAction onClick={guardar}>
                {editando ? "Actualizar" : "Guardar"}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {lista.map((m) => (
          <Card key={m.id} className="shadow-md">
            <CardHeader>
              <CardTitle className="text-lg font-semibold flex items-center gap-2">
                <Package size={18} /> {m.nombre}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <p className="flex items-center gap-2"><Box size={16} /> <strong>Cantidad:</strong> {m.cantidad}</p>
              <p className="flex items-center gap-2"><Layers size={16} /> <strong>Tipo:</strong> {m.tipo}</p>
              <p className="flex items-center gap-2"><Tag size={16} /> <strong>Unidad:</strong> {m.unidad}</p>
              <p className="flex items-center gap-2"><MapPin size={16} /> <strong>Ubicación:</strong> {m.ubicacion}</p>
              <div className="flex gap-2 pt-2">
                <Button size="sm" variant="outline" onClick={() => iniciarEdicion(m)}>Editar</Button>
                <Button size="sm" variant="destructive" onClick={() => eliminar(m.id)}>Eliminar</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

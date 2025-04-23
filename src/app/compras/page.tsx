"use client";

import { useEffect, useState } from "react";
import {
  getCompras,
  addCompra,
  editCompra,
  deleteCompra,
} from "@/lib/compraService";
import { getMateriales } from "@/lib/materialService";
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
import { Package, CalendarDays, UserRound, ClipboardSignature, Truck, Box } from "lucide-react";

export default function ComprasPage() {
  const init = {
    id: undefined,
    material_id: 0,
    cantidad: 1,
    proveedor: "",
    fecha: "",
    asignado_a: 0,
  };

  const [lista, setLista] = useState<any[]>([]);
  const [form, setForm] = useState(init);
  const [materiales, setMateriales] = useState<any[]>([]);
  const [empleados, setEmpleados] = useState<any[]>([]);
  const [edit, setEdit] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const cargarDatos = async () => {
    setLista(await getCompras());
    setMateriales(await getMateriales());
    setEmpleados(await getEmpleados());
  };

  useEffect(() => {
    cargarDatos();
  }, []);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: name === "cantidad" || name === "material_id" || name === "asignado_a" ? parseInt(value) : value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    edit ? await editCompra(form) : await addCompra(form);
    setForm(init);
    setEdit(false);
    setModalOpen(false);
    cargarDatos();
  };

  const imprimirOrden = (compra: any) => {
    const empleado = compra.empleado ?? "Sin asignar";
    const fecha = new Date(compra.fecha).toLocaleDateString();
    const ordenNumero = compra.id ? `OC-${compra.id.toString().padStart(5, "0")}` : "OC-SIN-ID";

    const html = `
      <html>
        <head>
          <title>${ordenNumero}</title>
          <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
        </head>
        <body class="bg-white p-8 text-gray-900 font-sans">
          <div class="max-w-2xl mx-auto border rounded-lg shadow-xl p-6">
            <div class="flex justify-center mb-6">
              <img src="https://espacio.uy/img/logo001.png" alt="Espacio CV Logo" class="h-16" />
            </div>
            <h1 class="text-2xl font-bold text-center mb-6">Orden de Compra</h1>
            <div class="space-y-4 text-sm">
              <div class="flex justify-between border-b pb-2"><span class="font-semibold">N° Orden:</span><span>${ordenNumero}</span></div>
              <div class="flex justify-between border-b pb-2"><span class="font-semibold">Material:</span><span>${compra.material}</span></div>
              <div class="flex justify-between border-b pb-2"><span class="font-semibold">Cantidad:</span><span>${compra.cantidad}</span></div>
              <div class="flex justify-between border-b pb-2"><span class="font-semibold">Proveedor:</span><span>${compra.proveedor}</span></div>
              <div class="flex justify-between border-b pb-2"><span class="font-semibold">Fecha:</span><span>${fecha}</span></div>
              <div class="flex justify-between"><span class="font-semibold">Asignado a:</span><span>${empleado}</span></div>
            </div>
            <div class="mt-6">
              <h2 class="text-sm font-semibold mb-1 text-blue-800">Observaciones:</h2>
              <div class="border border-gray-200 p-2 rounded h-24 text-xs text-gray-600">....................................................................................................................................</div>
            </div>
            <div class="flex justify-end items-center mt-10">
              <div class="text-center">
                <p class="text-sm">Firma de aprobación</p>
                <div class="border-t w-48 mx-auto mt-6"></div>
              </div>
            </div>
            <div class="mt-10 text-xs text-center text-gray-400">Espacio CV — Comunicación Visual</div>
          </div>
          <script>window.onload = function() { window.print(); }</script>
        </body>
      </html>
    `;

    const win = window.open("", "_blank");
    if (win) {
      win.document.write(html);
      win.document.close();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col px-4 py-8 md:px-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Gestión de Compras</h2>
        <AlertDialog open={modalOpen} onOpenChange={setModalOpen}>
          <AlertDialogTrigger asChild>
            <Button>+ Nueva Compra</Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>{edit ? "Editar Compra" : "Agregar Compra"}</AlertDialogTitle>
            </AlertDialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1">
                <Label htmlFor="material_id" className="flex items-center gap-2">
                  <Package size={16} /> Material
                </Label>
                <select name="material_id" value={form.material_id} onChange={handleChange} className="w-full border rounded px-3 py-2">
                  <option value={0}>-- Seleccionar material --</option>
                  {materiales.map((m) => (
                    <option key={m.id} value={m.id}>{m.nombre}</option>
                  ))}
                </select>
              </div>
              <div className="space-y-1">
                <Label htmlFor="cantidad" className="flex items-center gap-2">
                  <Box size={16} /> Cantidad
                </Label>
                <Input name="cantidad" type="number" value={form.cantidad} onChange={handleChange} required />
              </div>
              <div className="space-y-1">
                <Label htmlFor="proveedor" className="flex items-center gap-2">
                  <Truck size={16} /> Proveedor
                </Label>
                <Input name="proveedor" value={form.proveedor} onChange={handleChange} required />
              </div>
              <div className="space-y-1">
                <Label htmlFor="fecha" className="flex items-center gap-2">
                  <CalendarDays size={16} /> Fecha
                </Label>
                <Input name="fecha" type="date" value={form.fecha} onChange={handleChange} required />
              </div>
              <div className="space-y-1">
                <Label htmlFor="asignado_a" className="flex items-center gap-2">
                  <UserRound size={16} /> Asignado a
                </Label>
                <select name="asignado_a" value={form.asignado_a} onChange={handleChange} className="w-full border rounded px-3 py-2">
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
        {lista.map((c) => (
          <Card key={c.id} className="shadow-md">
            <CardHeader>
              <CardTitle className="text-lg font-semibold flex items-center gap-2">
                <ClipboardSignature size={18} /> Orden #{c.id}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <p className="flex items-center gap-2"><Package size={16} /> <strong>Material:</strong> {c.material}</p>
              <p className="flex items-center gap-2"><Box size={16} /> <strong>Cantidad:</strong> {c.cantidad}</p>
              <p className="flex items-center gap-2"><Truck size={16} /> <strong>Proveedor:</strong> {c.proveedor}</p>
              <p className="flex items-center gap-2"><CalendarDays size={16} /> <strong>Fecha:</strong> {c.fecha}</p>
              <p className="flex items-center gap-2"><UserRound size={16} /> <strong>Asignado a:</strong> {c.empleado ?? "-"}</p>
              <div className="flex flex-wrap gap-2 pt-2">
                <Button size="sm" variant="outline" onClick={() => { setForm(c); setEdit(true); setModalOpen(true); }}>Editar</Button>
                <Button size="sm" variant="destructive" onClick={() => deleteCompra(c.id).then(cargarDatos)}>Eliminar</Button>
                <Button size="sm" variant="ghost" onClick={() => imprimirOrden(c)}>Imprimir</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
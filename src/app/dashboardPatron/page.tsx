"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { getTareas } from "@/lib/tareaService";
import { getMateriales } from "@/lib/materialService";
import { getUsuarios } from "@/lib/usuarioService";
import { getCompras } from "@/lib/compraService";
import { getHerramientas } from "@/lib/herramientaService";
import { getEstacion } from "@/lib/estacionService";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  ClipboardList,
  PackagePlus,
  Users,
  ShoppingCart,
  Wrench,
  ActivitySquare,
  CalendarCheck,
  LayoutGrid
} from "lucide-react";

export default function DashboardPatron() {
  const { usuario } = useAuth();
  const router = useRouter();
  const [tareas, setTareas] = useState<any[]>([]);
  const [materiales, setMateriales] = useState<any[]>([]);
  const [empleados, setEmpleados] = useState<any[]>([]);
  const [compras, setCompras] = useState<any[]>([]);
  const [herramientas, setHerramientas] = useState<any[]>([]);
  const [estaciones, setEstaciones] = useState<any[]>([]);

  useEffect(() => {
    const cargarDashboard = async () => {
      setTareas(await getTareas());
      setMateriales(await getMateriales());
      setEmpleados(await getUsuarios());
      setCompras(await getCompras());
      setHerramientas(await getHerramientas());
      setEstaciones(await getEstacion());
    };
    if (usuario?.rol === "patron") cargarDashboard();
  }, [usuario]);

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8 md:px-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        Panel de Control - Patrón
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        <Card className="shadow-md">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ClipboardList size={20} /> Tareas
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <p>Hay {tareas.length} tareas registradas.</p>
            <Button size="sm" onClick={() => router.push("/gestionTareas")}>Ir a Tareas</Button>
          </CardContent>
        </Card>

        <Card className="shadow-md">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PackagePlus size={20} /> Materiales
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <p>Total de materiales: {materiales.length}</p>
            <Button size="sm" onClick={() => router.push("/materiales")}>Ir a Materiales</Button>
          </CardContent>
        </Card>

        <Card className="shadow-md">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users size={20} /> Empleados
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <p>{empleados.length} empleados registrados.</p>
            <Button size="sm" onClick={() => router.push("/empleados")}>Ir a Empleados</Button>
          </CardContent>
        </Card>

        <Card className="shadow-md">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ShoppingCart size={20} /> Compras
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <p>Total de compras: {compras.length}</p>
            <Button size="sm" onClick={() => router.push("/compras")}>Ir a Compras</Button>
          </CardContent>
        </Card>

        <Card className="shadow-md">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Wrench size={20} /> Herramientas
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <p>Total de herramientas: {herramientas.length}</p>
            <Button size="sm" onClick={() => router.push("/herramientas")}>Ir a Herramientas</Button>
          </CardContent>
        </Card>

        <Card className="shadow-md">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <LayoutGrid size={20} /> Estaciones de trabajo
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <p>Total de estaciones: {estaciones.length}</p>
            <Button size="sm" onClick={() => router.push("/gestionEstacion")}>Ir a Estaciones</Button>
          </CardContent>
        </Card>
      </div>

      {/* Últimas novedades */}
      <div className="mt-10 space-y-6">
        <h3 className="text-xl font-semibold text-gray-700">Últimas Novedades</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <ShoppingCart size={16} /> Última Compra
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm">
              <p><strong>Material:</strong> {compras[0]?.material ?? "-"}</p>
              <p><strong>Proveedor:</strong> {compras[0]?.proveedor ?? "-"}</p>
              <p><strong>Fecha:</strong> {compras[0]?.fecha ?? "-"}</p>
            </CardContent>
          </Card>

          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <ClipboardList size={16} /> Última Tarea
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm">
              <p><strong>Nombre:</strong> {tareas[0]?.nombre ?? "-"}</p>
              <p><strong>Estado:</strong> {tareas[0]?.estado ?? "-"}</p>
              <p><strong>Fecha límite:</strong> {tareas[0]?.fecha_limite ?? "-"}</p>
            </CardContent>
          </Card>

          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <Users size={16} /> Último Empleado Registrado
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm">
              <p><strong>Nombre:</strong> {empleados[0]?.nombre ?? "-"}</p>
              <p><strong>Email:</strong> {empleados[0]?.email ?? "-"}</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

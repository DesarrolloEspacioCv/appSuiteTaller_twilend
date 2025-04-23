"use client";

import { useEffect, useState } from "react";
import { getEstacion } from "@/lib/estacionService";
import { getTareas } from "@/lib/tareaService";
import { useAuth } from "@/context/AuthContext";
import { ClipboardList, Users, CalendarDays, Wrench, LayoutGrid } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function DashboardEmpleadoPage() {
  const { usuario } = useAuth();
  const router = useRouter();
  const [estaciones, setEstaciones] = useState<any[]>([]);
  const [tareas, setTareas] = useState<any[]>([]);

  useEffect(() => {
    const cargar = async () => {
      const todasEstaciones = await getEstacion();
      const tareasTodas = await getTareas();

      const estacionesFiltradas = usuario?.id ? todasEstaciones.filter((est) => est.empleados_asignados.includes(usuario.id!)) : [];
      const tareasFiltradas = usuario?.id ? tareasTodas.filter((t) => t.empleados_asignados.includes(usuario.id!)) : [];

      setEstaciones(estacionesFiltradas);
      setTareas(tareasFiltradas);
    };

    if (usuario?.id) cargar();
  }, [usuario]);

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8 md:px-8">
      <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2 mb-6">
        <ClipboardList size={22} /> Panel de Control del Empleado
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Estaciones asignadas</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold text-blue-600">{estaciones.length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Tareas asignadas</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold text-blue-600">{tareas.length}</p>
            <Button size="sm" className="mt-3" onClick={() => router.push("/tareasEmpleado")}>
              Ver mis tareas
            </Button>
          </CardContent>
        </Card>
      </div>

      <div className="mt-10 space-y-6">
        <h3 className="text-xl font-semibold text-gray-700">Últimas novedades</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <ClipboardList size={16} /> Última Tarea Asignada
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
                <LayoutGrid size={16} /> Última Estación Asignada
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm">
              <p><strong>Nombre:</strong> {estaciones[0]?.nombre ?? "-"}</p>
              <p><strong>Tipo:</strong> {estaciones[0]?.tipo ?? "-"}</p>
              <p><strong>Fecha límite:</strong> {estaciones[0]?.fecha_limite ?? "-"}</p>
            </CardContent>
          </Card>

          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <Wrench size={16} /> Estado general
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              Mantené al día tus tareas para mejorar la productividad 🚀
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
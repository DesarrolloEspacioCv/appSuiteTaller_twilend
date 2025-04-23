"use client";

import { useEffect, useState } from "react";
import { getTareas, Tarea } from "@/lib/tareaService";
import { getEstacion } from "@/lib/estacionService";
import { useAuth } from "@/context/AuthContext";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import {
  ClipboardList,
  CalendarDays,
  Settings,
  MessageSquare,
  Building2,
} from "lucide-react";

export default function TareasEmpleadoPage() {
  const { usuario } = useAuth();
  const [tareas, setTareas] = useState<Tarea[]>([]);
  const [estaciones, setEstaciones] = useState<any[]>([]);

  useEffect(() => {
    const cargarDatos = async () => {
      const todasTareas = await getTareas();
      const estaciones = await getEstacion();

      const filtradas = todasTareas.filter(
        (t) => t.empleados_asignados?.includes(usuario?.id ?? -1)
      );

      setTareas(filtradas);
      setEstaciones(estaciones);
    };

    if (usuario?.id) cargarDatos();
  }, [usuario]);

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8 md:px-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        Mis Tareas Asignadas
      </h2>

      {tareas.length === 0 ? (
        <p className="text-center text-gray-500">No tenés tareas asignadas aún.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {tareas.map((t) => (
            <Card key={t.id} className="shadow-md">
              <CardHeader>
                <CardTitle className="text-lg font-semibold flex items-center gap-2">
                  <ClipboardList size={18} /> {t.nombre}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <p className="flex items-center gap-2">
                  <Building2 size={14} /> <strong>Estación:</strong> {estaciones.find((e) => e.id === t.estacion_id)?.nombre || "-"}
                </p>
                <p className="flex items-center gap-2">
                  <Settings size={14} /> <strong>Estado:</strong> {t.estado}
                </p>
                <p className="flex items-center gap-2">
                  <CalendarDays size={14} /> <strong>Fecha límite:</strong> {t.fecha_limite}
                </p>
                {t.comentarios && (
                  <p className="flex items-start gap-2">
                    <MessageSquare size={14} className="mt-1" /> <span><strong>Comentarios:</strong> {t.comentarios}</span>
                  </p>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";
import { getEstacion } from "@/lib/estacionService";
import { getTareasPorEstacion, Tarea } from "@/lib/tareaService";
import { useAuth } from "@/context/AuthContext";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";

interface EstacionAsignada {
  id: number;
  nombre: string;
  descripcion: string;
  tipo: string;
  fecha_limite: string;
  empleados_asignados: number[];
  herramientas_asignadas: number[];
}

export default function EstacionesEmpleadoPage() {
  const { usuario } = useAuth();
  const [misEstaciones, setMisEstaciones] = useState<EstacionAsignada[]>([]);
  const [tareasPorEstacion, setTareasPorEstacion] = useState<Record<number, Tarea[]>>({});

  useEffect(() => {
    const cargarEstacionesAsignadas = async () => {
      const data = await getEstacion();
      const filtradas: EstacionAsignada[] = data.filter(
        (est): est is EstacionAsignada =>
          est.id !== undefined &&
          Array.isArray(est.empleados_asignados) &&
          est.empleados_asignados.map((id: any) => Number(id)).includes(Number(usuario!.id))
      );

      setMisEstaciones(filtradas);

      const tareasMap: Record<number, Tarea[]> = {};
      for (const estacion of filtradas) {
        const tareas = await getTareasPorEstacion(estacion.id);
        tareasMap[estacion.id] = tareas.filter(t => t.empleados_asignados.includes(usuario!.id));
      }
      setTareasPorEstacion(tareasMap);
    };

    if (usuario?.id) cargarEstacionesAsignadas();
  }, [usuario]);

  return (
    <div className="container mx-auto p-4">
      <Card>
        <CardHeader>
          <CardTitle>Mis Estaciones Asignadas</CardTitle>
        </CardHeader>
        <CardContent>
          {misEstaciones.length === 0 ? (
            <p className="text-muted-foreground">No tenés estaciones asignadas aún.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {misEstaciones.map(est => (
                <div key={est.id} className="border p-4 rounded-md shadow-md bg-white">
                  <h3 className="font-semibold text-lg">{est.nombre}</h3>
                  <p className="text-sm text-muted-foreground">{est.descripcion}</p>
                  <p className="text-sm">Tipo: {est.tipo}</p>
                  <p className="text-sm">Fecha límite: {est.fecha_limite}</p>
                  {tareasPorEstacion[est.id] && tareasPorEstacion[est.id].length > 0 && (
                    <div className="mt-2">
                      <p className="font-semibold text-sm">Mis Tareas:</p>
                      <ul className="list-disc pl-4 text-xs">
                        {tareasPorEstacion[est.id].map(tarea => (
                          <li key={tarea.id}>
                            <strong>{tarea.nombre}</strong> - <em>{tarea.estado}</em>
                            <div className="text-xs text-gray-500">Fecha límite: {tarea.fecha_limite}</div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

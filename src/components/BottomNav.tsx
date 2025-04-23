"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, ClipboardList, Users, Wrench, LayoutGrid } from "lucide-react";
import { cn } from "@/lib/utils";

interface BottomNavProps {
  rol: "patron" | "empleado";
}

export default function BottomNav({ rol }: BottomNavProps) {
  const pathname = usePathname();

  const itemsPatron = [
    { href: "/dashboardPatron", icon: Home, label: "Inicio" },
    { href: "/gestionTareas", icon: ClipboardList, label: "Tareas" },
    { href: "/empleados", icon: Users, label: "Empleados" },
    { href: "/herramientas", icon: Wrench, label: "Herramientas" },
    { href: "/gestionEstacion", icon: LayoutGrid, label: "Estaciones" },
  ];

  const itemsEmpleado = [
    { href: "/dashboardEmpleado", icon: Home, label: "Inicio" },
    { href: "/tareasEmpleado", icon: ClipboardList, label: "Mis Tareas" },
    { href: "/estacionEmpleado", icon: LayoutGrid, label: "Estaciones" },
  ];

  const items = rol === "patron" ? itemsPatron : itemsEmpleado;

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white shadow-md border-t z-50 flex justify-around py-2">
      {items.map((item) => {
        const isActive = pathname === item.href;
        const Icon = item.icon;
        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex flex-col items-center text-xs text-gray-500 hover:text-blue-600",
              isActive && "text-blue-600"
            )}
          >
            <Icon size={20} className="mb-1" />
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
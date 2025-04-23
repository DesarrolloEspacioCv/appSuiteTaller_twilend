"use client";

import { useAuth } from "@/context/AuthContext";
import BottomNav from "./BottomNav";

export default function BottomNavWrapper() {
  const { usuario } = useAuth();

  if (!usuario) return null;

  return <BottomNav rol={usuario.rol} />;
}

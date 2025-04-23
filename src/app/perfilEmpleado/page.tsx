"use client";

import { useAuth } from "@/context/AuthContext";
import { useState, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Camera } from "lucide-react";

export default function PerfilEmpleadoPage() {
  const { usuario } = useAuth();
  const [imagenPreview, setImagenPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleImagenSeleccionada = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagenPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const abrirSelectorImagen = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8 md:px-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Mi Perfil</h2>

      <Card className="max-w-md mx-auto shadow-md">
        <CardHeader>
          <CardTitle className="text-center">Información del Empleado</CardTitle>
        </CardHeader>

        <CardContent className="space-y-6">

          {/* Imagen de perfil */}
          <div className="flex justify-center">
            <div
              className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-md cursor-pointer hover:opacity-80 transition"
              onClick={abrirSelectorImagen}
              title="Subir nueva imagen"
            >
              <img
                src={imagenPreview || "/img/avperfil.png"}
                alt="Avatar"
                className="object-cover w-full h-full"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 hover:opacity-100 transition">
                <Camera className="text-white w-6 h-6" />
              </div>
              <input
                type="file"
                accept="image/*"
                onChange={handleImagenSeleccionada}
                className="hidden"
                ref={fileInputRef}
              />
            </div>
          </div>

          {/* Datos del usuario */}
          <div className="space-y-2">
            <Label>Nombre</Label>
            <Input value={usuario?.nombre ?? ""} disabled />
          </div>
          <div className="space-y-2">
            <Label>Email</Label>
            <Input value={usuario?.email ?? ""} disabled />
          </div>
          <div className="space-y-2">
            <Label>Rol</Label>
            <Input value={usuario?.rol ?? ""} disabled />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

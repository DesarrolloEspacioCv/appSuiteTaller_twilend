"use client";

import { useState } from "react";
import { registrarPatronEnPHP, PatronForm } from "@/lib/usuarioService";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { User, Mail, Lock, BadgeCheck, KeyRound } from "lucide-react";

export default function RegistroPatronPage() {
  const [form, setForm] = useState<PatronForm & { codigo: string }>({
    nombre: "",
    email: "",
    contraseña: "",
    profesion: "",
    codigo: "",
  });

  const CODIGO_SECRETO = "1234PATRON";

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (form.codigo !== CODIGO_SECRETO) {
      toast({ title: "Código incorrecto", description: "Verificá el código ingresado.", variant: "destructive" });
      return;
    }

    try {
      await registrarPatronEnPHP(form);
      toast({ title: "Registro exitoso", description: "Patrón registrado correctamente." });
      setForm({ nombre: "", email: "", contraseña: "", profesion: "", codigo: "" });
    } catch (err: any) {
      console.error(err);
      toast({ title: "Error", description: "No se pudo registrar el patrón.", variant: "destructive" });
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Lado izquierdo solo en escritorio */}
      <div className="hidden md:flex w-1/2 items-center justify-center bg-primary text-white">
        <div className="text-center space-y-4">
          <div className="flex justify-center mb-6 space-x-2">
            <div className="w-4 h-4 bg-white rounded-full"></div>
            <div className="w-4 h-4 bg-white rounded-full"></div>
            <div className="w-4 h-4 bg-white rounded-full"></div>
          </div>
          <h2 className="text-xl font-semibold">EspacioCV Suite</h2>
          <p className="text-sm">Gestión de taller con estilo.</p>
        </div>
      </div>

      {/* Lado derecho (formulario) */}
      <div className="flex-1 flex items-center justify-center px-6 py-10 bg-gray-50">
        <div className="w-full max-w-md">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="text-center text-2xl font-bold text-gray-800">
                Crear cuenta de Patrón
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-1">
                  <Label htmlFor="nombre" className="flex items-center gap-2 text-sm font-medium">
                    <User size={16} /> Nombre
                  </Label>
                  <Input id="nombre" name="nombre" value={form.nombre} onChange={handleChange} required />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="email" className="flex items-center gap-2 text-sm font-medium">
                    <Mail size={16} /> Email
                  </Label>
                  <Input id="email" name="email" type="email" value={form.email} onChange={handleChange} required />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="contraseña" className="flex items-center gap-2 text-sm font-medium">
                    <Lock size={16} /> Contraseña
                  </Label>
                  <Input id="contraseña" name="contraseña" type="password" value={form.contraseña} onChange={handleChange} required />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="profesion" className="flex items-center gap-2 text-sm font-medium">
                    <BadgeCheck size={16} /> Profesión
                  </Label>
                  <Input id="profesion" name="profesion" value={form.profesion} onChange={handleChange} />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="codigo" className="flex items-center gap-2 text-sm font-medium">
                    <KeyRound size={16} /> Código de verificación
                  </Label>
                  <Input id="codigo" name="codigo" value={form.codigo} onChange={handleChange} required />
                </div>
                <Button type="submit" className="w-full mt-2">Registrarse</Button>
                <p className="text-center text-sm mt-4">
                  ¿Ya tenés cuenta? {" "}
                  <a href="/login" className="text-blue-600 hover:underline">
                    Iniciar sesión
                  </a>
                </p>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
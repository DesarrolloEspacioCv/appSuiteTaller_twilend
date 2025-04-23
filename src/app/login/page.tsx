"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";
import { Mail, Lock } from "lucide-react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import axios from "axios";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [recordar, setRecordar] = useState(false);
  const router = useRouter();
  const { login } = useAuth();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post("https://espacio.uy/APP/Api/login.php", {
        email,
        contraseña: password
      });

      if (response.data.status === "ok") {
        login(response.data);
        toast({ title: "Bienvenido", description: `Hola ${response.data.nombre}` });
        router.push("/dashboard");
      }
    } catch (error: any) {
      const msg = error.response?.data?.error || "Error al iniciar sesión";
      toast({ title: "Error", description: msg, variant: "destructive" });
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
                Bienvenido de nuevo 👋
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-center text-gray-500 text-sm mb-6">
                Iniciá sesión para continuar
              </p>
              <form onSubmit={handleLogin} className="space-y-5">
                <div className="space-y-1">
                  <Label htmlFor="email" className="flex items-center gap-2 text-sm font-medium">
                    <Mail size={16} /> Email
                  </Label>
                  <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>

                <div className="space-y-1">
                  <Label htmlFor="password" className="flex items-center gap-2 text-sm font-medium">
                    <Lock size={16} /> Contraseña
                  </Label>
                  <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </div>

                <div className="flex items-center justify-between text-sm">
                  <label className="flex items-center gap-2">
                    <input type="checkbox" checked={recordar} onChange={(e) => setRecordar(e.target.checked)} className="accent-primary" />
                    Recuérdame
                  </label>
                  <a href="#" className="text-blue-600 hover:underline">
                    ¿Olvidaste tu contraseña?
                  </a>
                </div>

                <Button type="submit" className="w-full">Iniciar sesión</Button>

                <div className="text-center text-sm text-gray-500">o iniciar con Google</div>
                <button
                  type="button"
                  className="w-full border py-2 rounded-md text-gray-800 hover:bg-gray-200 transition"
                >
                  Google
                </button>

                <p className="text-center text-sm mt-4">
                  ¿No tenés cuenta? {" "}
                  <a href="/registroPatron" className="text-blue-600 hover:underline">
                    Registrate
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

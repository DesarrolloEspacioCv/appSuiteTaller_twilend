// src/app/imprimir/[id]/page.tsx

import { getCompraById } from "@/lib/compraService";
import { notFound } from "next/navigation";

interface Compra {
  id: number;
  material: string;
  cantidad: number;
  proveedor: string;
  fecha: string;
  empleado: string;
}

export default async function OrdenDeCompraPage({ params }: { params: { id: string } }) {
  const compra: Compra | null = await getCompraById(parseInt(params.id));

  if (!compra) return notFound();

  const fecha = new Date(compra.fecha).toLocaleDateString();
  const ordenNumero = compra.id? `OC-${compra.id.toString().padStart(5, "0")}`: "OC-SIN-ID";

  return (
    <div className="bg-white text-gray-900 min-h-screen flex items-center justify-center p-10">
      <div className="w-full max-w-3xl border border-gray-300 rounded-xl shadow-xl p-8">
        <div className="flex justify-center mb-6">
          <img src="https://espacio.uy/img/logo_espaciocv.png" alt="Espacio CV Logo" className="h-16" />
        </div>

        <h1 className="text-2xl font-bold text-center text-blue-900 mb-4">Orden de Compra</h1>

        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="font-semibold">N° de orden:</span>
            <span>{ordenNumero}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold">Fecha:</span>
            <span>{fecha}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold">Material:</span>
            <span>{compra.material}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold">Cantidad:</span>
            <span>{compra.cantidad}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold">Proveedor:</span>
            <span>{compra.proveedor}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold">Asignado a:</span>
            <span>{compra.empleado}</span>
          </div>
        </div>

        <div className="mt-6">
          <h2 className="text-sm font-semibold mb-1 text-blue-800">Observaciones:</h2>
          <div className="border border-gray-200 p-2 rounded h-24 text-xs text-gray-600">
            ...................................................................................................................
            ...................................................................................................................
          </div>
        </div>

        <div className="flex justify-end items-center mt-10">
          <div className="text-center">
            <p className="text-sm">Firma de aprobación</p>
            <div className="border-t w-48 mx-auto mt-6"></div>
          </div>
        </div>

        <div className="mt-10 text-xs text-center text-gray-400">
          Espacio CV — Comunicación Visual
        </div>
      </div>
    </div>
  );
}

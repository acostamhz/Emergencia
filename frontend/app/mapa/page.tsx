import Link from "next/link";

import MapaClient from "./mapaClient";

export default function MapaPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-6xl px-6 py-12">
        <Link
          href="/"
          className="mb-8 inline-flex items-center gap-2 rounded-lg px-2 py-2 text-sm font-semibold text-slate-600 transition hover:bg-white hover:text-slate-900"
        >
          <span className="text-lg leading-none">←</span>
          Volver al inicio
        </Link>

        <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-red-600">
          Cali Emergencia
        </p>

        <h1 className="text-4xl font-bold tracking-tight text-slate-900">
          Mapa de reportes
        </h1>

        <p className="mt-3 text-slate-600">
          Consulta las zonas donde se han registrado personas y mascotas
          desaparecidas.
        </p>

        <div className="mt-10">
          <MapaClient />
        </div>
      </div>
    </main>
  );
}
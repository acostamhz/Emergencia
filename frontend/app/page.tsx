"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type Report = {
  id: number;
  type: string;
  status: string;
};

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function Home() {
  const [totalReports, setTotalReports] = useState(0);
  const [missingReports, setMissingReports] = useState(0);
  const [foundReports, setFoundReports] = useState(0);

  useEffect(() => {
    async function loadStatistics() {
      try {
        const response = await fetch(`${API_URL}/reports`);

        if (!response.ok) {
          throw new Error("No se pudieron obtener los reportes.");
        }

        const data: Report[] = await response.json();

        if (!Array.isArray(data)) {
          throw new Error("La respuesta del servidor no es válida.");
        }

        const people = data.filter(
          (report) => report.type === "persona",
        );

        const missing = people.filter(
          (report) => report.status === "desaparecido",
        );

        const found = people.filter(
          (report) => report.status === "encontrado",
        );

        setTotalReports(people.length);
        setMissingReports(missing.length);
        setFoundReports(found.length);
      } catch (error) {
        console.error(
          "Error al cargar las estadísticas:",
          error,
        );
      }
    }

    loadStatistics();
  }, []);

  return (
    <main className="min-h-screen bg-slate-50">
      {/* HERO */}
      <section className="mx-auto flex min-h-screen max-w-5xl flex-col justify-center px-6 py-16">
        <div className="mb-10 max-w-3xl">
          <p className="mb-4 text-sm font-semibold uppercase tracking-wider text-red-600">
            Cali Emergencia
          </p>

          <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-6xl">
            Ayudemos a encontrar a quienes están desaparecidos.
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
            Una plataforma para reportar y buscar personas y mascotas
            desaparecidas durante una emergencia.
          </p>
        </div>

        {/* ACCIONES PRINCIPALES */}
        <div className="grid gap-4 sm:grid-cols-3">
          <Link
            href="/buscar"
            className="rounded-xl bg-red-600 px-6 py-4 text-center font-semibold text-white transition hover:-translate-y-0.5 hover:bg-red-700 hover:shadow-md"
          >
            Buscar una persona o mascota
          </Link>

          <Link
            href="/reportar"
            className="rounded-xl border border-slate-300 bg-white px-6 py-4 text-center font-semibold text-slate-900 transition hover:-translate-y-0.5 hover:bg-slate-50 hover:shadow-md"
          >
            Reportar desaparición
          </Link>

          <Link
            href="/mapa"
            className="rounded-xl border border-slate-300 bg-white px-6 py-4 text-center font-semibold text-slate-900 transition hover:-translate-y-0.5 hover:bg-slate-50 hover:shadow-md"
          >
            Ver desaparecidos en el mapa
          </Link>
        </div>

        {/* AVISO */}
        <div className="mt-16 rounded-xl border border-amber-200 bg-amber-50 p-5">
          <p className="text-sm leading-6 text-amber-900">
            <strong>Importante:</strong> comparte únicamente información
            necesaria y evita publicar datos personales sensibles.
          </p>
        </div>
      </section>

      {/* ESTADÍSTICAS */}
      <section className="border-y border-slate-200 bg-white px-6 py-12">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-5 md:grid-cols-3">
            <Link
              href="/buscar"
              className="rounded-2xl border border-amber-200 bg-white p-8 text-center transition hover:-translate-y-1 hover:shadow-md"
            >
              <p className="text-4xl font-bold text-amber-700">
                {totalReports.toLocaleString("es-CO")}
              </p>

              <p className="mt-2 text-lg font-semibold text-amber-800">
                Personas registradas
              </p>
            </Link>

            <Link
              href="/buscar"
              className="rounded-2xl border border-red-200 bg-white p-8 text-center transition hover:-translate-y-1 hover:shadow-md"
            >
              <p className="text-4xl font-bold text-red-700">
                {missingReports.toLocaleString("es-CO")}
              </p>

              <p className="mt-2 text-lg font-semibold text-red-700">
                Por localizar
              </p>
            </Link>

            <Link
              href="/buscar"
              className="rounded-2xl border border-emerald-200 bg-white p-8 text-center transition hover:-translate-y-1 hover:shadow-md"
            >
              <p className="text-4xl font-bold text-emerald-700">
                {foundReports.toLocaleString("es-CO")}
              </p>

              <p className="mt-2 text-lg font-semibold text-emerald-700">
                Localizadas
              </p>
            </Link>
          </div>
        </div>
      </section>

      {/* TELÉFONOS DE EMERGENCIA */}
      <section className="px-6 py-12">
        <div className="mx-auto max-w-6xl rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="mb-5 text-sm font-bold uppercase tracking-wider text-red-600">
            ☎ Teléfonos de emergencia
          </p>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
            <EmergencyCard
              number="123"
              label="Línea de emergencia"
            />

            <EmergencyCard
              number="112"
              label="Policía Nacional"
            />

            <EmergencyCard
              number="132"
              label="Cruz Roja Colombiana"
            />

            <EmergencyCard
              number="144"
              label="Defensa Civil"
            />

            <EmergencyCard
              number="119"
              label="Bomberos"
            />
          </div>
        </div>
      </section>

      {/* PREGUNTAS FRECUENTES */}
      <section className="border-t border-slate-200 bg-white px-6 py-16">
        <div className="mx-auto max-w-4xl">
          <div className="mb-10 text-center">
            <p className="text-sm font-bold uppercase tracking-wider text-red-600">
              Preguntas frecuentes
            </p>

            <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-900">
              ¿Cómo funciona Cali Emergencia?
            </h2>
          </div>

          <div className="space-y-4">
            <FaqItem
              question="¿Cómo puedo reportar a una persona o mascota desaparecida?"
              answer="Ingresa a Reportar desaparición, completa la información necesaria y selecciona en el mapa la última ubicación conocida."
            />

            <FaqItem
              question="¿Puedo reportar una mascota?"
              answer="Sí. La plataforma permite registrar tanto personas como mascotas desaparecidas."
            />

            <FaqItem
              question="¿Qué hago si encuentro a una persona o mascota reportada?"
              answer="Verifica la información del reporte y utiliza los medios de contacto disponibles. Si corresponde, informa también a las autoridades u organismos de emergencia."
            />

            <FaqItem
              question="¿Cali Emergencia reemplaza a las autoridades?"
              answer="No. La plataforma es una herramienta ciudadana de apoyo y no reemplaza a las autoridades, organismos de emergencia ni los canales oficiales."
            />

            <FaqItem
              question="¿Qué información debo publicar?"
              answer="Comparte únicamente la información necesaria para ayudar a encontrar a la persona o mascota y evita publicar datos personales sensibles."
            />
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-slate-900 px-6 py-14 text-slate-300">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
            <div className="lg:col-span-2">
              <p className="text-sm font-bold uppercase tracking-wider text-red-400">
                Cali Emergencia
              </p>

              <h2 className="mt-3 text-3xl font-bold text-white">
                Del pueblo para el pueblo
              </h2>

              <p className="mt-4 max-w-xl text-sm leading-6 text-slate-400">
                Esta plataforma es ciudadana, voluntaria, de código libre y
                sin fines de lucro. No reemplaza a las autoridades ni
                organismos de emergencia. Verifica siempre la información
                antes de difundirla.
              </p>

              <p className="mt-4 text-sm leading-6 text-slate-400">
                ¿Encontraste un problema técnico en el sitio? Escríbenos a{" "}
                <a
                  href="mailto:acostadevice@gmail.com"
                  className="font-semibold text-white hover:text-red-400"
                >
                  acostadevice@gmail.com
                </a>
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-white">
                Información
              </h3>

              <div className="mt-4 space-y-3 text-sm">
                <Link
                  href="/como-funciona"
                  className="block hover:text-white"
                >
                  Cómo funciona
                </Link>

                <Link
                  href="/politica-datos"
                  className="block hover:text-white"
                >
                  Política de datos
                </Link>

                <Link
                  href="/terminos-uso"
                  className="block hover:text-white"
                >
                  Términos de uso
                </Link>

                <Link
                  href="/aviso-responsabilidad"
                  className="block hover:text-white"
                >
                  Aviso de responsabilidad
                </Link>
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-white">
                Comunidad
              </h3>

              <div className="mt-4 space-y-3 text-sm">
                <a
                  href="https://github.com/acostamhz/Emergencia"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block hover:text-white"
                >
                  GitHub
                </a>

                <a
                  href="mailto:acostadevice@gmail.com"
                  className="block hover:text-white"
                >
                  Soporte
                </a>

                <a
                  href="mailto:acostadevice@gmail.com?subject=Solicitud%20de%20ocultar%20publicación"
                  className="block hover:text-white"
                >
                  Solicitar ocultar publicación
                </a>
              </div>
            </div>
          </div>

          <div className="mt-12 border-t border-slate-800 pt-6 text-sm text-slate-500">
            © {new Date().getFullYear()} Cali Emergencia. Plataforma
            ciudadana de apoyo.
          </div>
        </div>
      </footer>
    </main>
  );
}

function EmergencyCard({
  number,
  label,
}: {
  number: string;
  label: string;
}) {
  return (
    <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
      <p className="text-2xl font-bold text-slate-900">
        {number}
      </p>

      <p className="mt-1 text-sm text-slate-700">
        {label}
      </p>
    </div>
  );
}

function FaqItem({
  question,
  answer,
}: {
  question: string;
  answer: string;
}) {
  return (
    <details className="group rounded-xl border border-slate-200 bg-slate-50 p-5">
      <summary className="cursor-pointer list-none font-semibold text-slate-900">
        <div className="flex items-center justify-between gap-4">
          <span>{question}</span>

          <span className="text-xl text-slate-400 transition group-open:rotate-45">
            +
          </span>
        </div>
      </summary>

      <p className="mt-4 pr-8 text-sm leading-6 text-slate-600">
        {answer}
      </p>
    </details>
  );
}
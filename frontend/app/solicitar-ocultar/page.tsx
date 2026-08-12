"use client";

import { FormEvent, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

const API_URL = "http://localhost:3001";

export default function SolicitarOcultarPage() {
  const searchParams = useSearchParams();

  const initialReportId = searchParams.get("reporte") ?? "";

  const [reportId, setReportId] = useState(initialReportId);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [reason, setReason] = useState("");

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setError("");
    setSuccess("");

    const numericReportId = Number(reportId);

    if (!Number.isInteger(numericReportId) || numericReportId < 1) {
      setError("Ingresa un número de reporte válido.");
      return;
    }

    if (!name.trim()) {
      setError("El nombre es obligatorio.");
      return;
    }

    if (!email.trim()) {
      setError("El correo electrónico es obligatorio.");
      return;
    }

    if (!reason.trim()) {
      setError("Explica brevemente el motivo de la solicitud.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        `${API_URL}/reports/removal-request`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            reportId: numericReportId,
            name: name.trim(),
            email: email.trim(),
            reason: reason.trim(),
          }),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        const message = Array.isArray(data?.message)
          ? data.message.join(", ")
          : data?.message || "No se pudo enviar la solicitud.";

        throw new Error(message);
      }

      setSuccess(
        "Tu solicitud fue enviada correctamente. Será revisada antes de tomar una decisión sobre la publicación.",
      );

      setName("");
      setEmail("");
      setReason("");
    } catch (error) {
      console.error(
        "Error al enviar solicitud de ocultamiento:",
        error,
      );

      setError(
        error instanceof Error
          ? error.message
          : "No se pudo enviar la solicitud. Intenta nuevamente.",
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-slate-50 px-6 py-10">
      <div className="mx-auto max-w-2xl">
        <Link
          href="/"
          className="mb-8 inline-flex items-center gap-2 rounded-lg px-2 py-2 text-sm font-semibold text-slate-600 transition hover:bg-white hover:text-slate-900"
        >
          <span className="text-lg leading-none">←</span>
          Volver al inicio
        </Link>

        <div className="mb-8">
          <p className="text-sm font-bold uppercase tracking-widest text-red-600">
            Cali Emergencia
          </p>

          <h1 className="mt-3 text-4xl font-bold tracking-tight text-slate-900">
            Solicitar ocultar publicación
          </h1>

          <p className="mt-4 max-w-xl leading-7 text-slate-600">
            Si consideras que un reporte contiene información que no
            debería permanecer publicada, puedes solicitar que sea
            revisado.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          noValidate
          className="space-y-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8"
        >
          {/* REPORTE */}
          <div>
            <label
              htmlFor="reportId"
              className="mb-2 block text-sm font-semibold text-slate-900"
            >
              Número del reporte
            </label>

            <input
              id="reportId"
              type="number"
              min="1"
              value={reportId}
              onChange={(event) => setReportId(event.target.value)}
              placeholder="Ej. 8"
              disabled={loading}
              className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none placeholder:text-slate-400 transition focus:border-red-500 focus:ring-2 focus:ring-red-100 disabled:bg-slate-100"
            />

            <p className="mt-2 text-xs text-slate-500">
              Puedes encontrar el número del reporte dentro de la
              publicación.
            </p>
          </div>

          {/* NOMBRE */}
          <div>
            <label
              htmlFor="name"
              className="mb-2 block text-sm font-semibold text-slate-900"
            >
              Nombre
            </label>

            <input
              id="name"
              type="text"
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="Tu nombre"
              disabled={loading}
              className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none placeholder:text-slate-400 transition focus:border-red-500 focus:ring-2 focus:ring-red-100 disabled:bg-slate-100"
            />
          </div>

          {/* CORREO */}
          <div>
            <label
              htmlFor="email"
              className="mb-2 block text-sm font-semibold text-slate-900"
            >
              Correo electrónico
            </label>

            <input
              id="email"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="correo@ejemplo.com"
              disabled={loading}
              className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none placeholder:text-slate-400 transition focus:border-red-500 focus:ring-2 focus:ring-red-100 disabled:bg-slate-100"
            />
          </div>

          {/* MOTIVO */}
          <div>
            <label
              htmlFor="reason"
              className="mb-2 block text-sm font-semibold text-slate-900"
            >
              Motivo de la solicitud
            </label>

            <textarea
              id="reason"
              rows={5}
              value={reason}
              onChange={(event) => setReason(event.target.value)}
              placeholder="Explica por qué consideras que esta publicación debería ser revisada u ocultada."
              disabled={loading}
              className="w-full resize-none rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none placeholder:text-slate-400 transition focus:border-red-500 focus:ring-2 focus:ring-red-100 disabled:bg-slate-100"
            />
          </div>

          {/* AVISO */}
          <div className="rounded-xl border border-amber-200 bg-amber-50 p-4">
            <p className="text-sm leading-6 text-amber-900">
              <strong>Importante:</strong> enviar esta solicitud no
              oculta automáticamente el reporte. La información será
              revisada antes de tomar una decisión.
            </p>
          </div>

          {/* ERROR */}
          {error && (
            <div
              role="alert"
              className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm font-medium text-red-700"
            >
              {error}
            </div>
          )}

          {/* ÉXITO */}
          {success && (
            <div
              role="status"
              className="rounded-xl border border-green-200 bg-green-50 p-4 text-sm font-medium text-green-700"
            >
              {success}
            </div>
          )}

          {/* BOTÓN */}
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-slate-900 px-5 py-3.5 font-bold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading
              ? "Enviando solicitud..."
              : "Enviar solicitud"}
          </button>
        </form>
      </div>
    </main>
  );
}
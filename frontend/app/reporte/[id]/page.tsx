"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

type Report = {
  id: number;
  type: string;
  name: string;
  age?: number;
  location: string;
  description?: string;
  status: string;
  photoUrl?: string | null;
  createdAt: string;
};

export default function ReportePage() {
  const params = useParams();
  const router = useRouter();

  const [report, setReport] = useState<Report | null>(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [editing, setEditing] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [confirmFound, setConfirmFound] = useState(false);
  const [error, setError] = useState("");

  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    async function loadReport() {
      try {
        const response = await fetch(
          `${API_URL}/reports/${params.id}`,
        );

        if (!response.ok) {
          throw new Error("No se encontró el reporte");
        }

        const data = await response.json();

        setReport(data);
        setName(data.name);
        setAge(
          data.age !== undefined && data.age !== null
            ? String(data.age)
            : "",
        );
        setLocation(data.location);
        setDescription(data.description ?? "");
      } catch (error) {
        console.error(error);
        setError("No se pudo cargar el reporte.");
      } finally {
        setLoading(false);
      }
    }

    loadReport();
  }, [params.id]);

  function startEditing() {
    if (!report) return;

    setName(report.name);
    setAge(
      report.age !== undefined && report.age !== null
        ? String(report.age)
        : "",
    );
    setLocation(report.location);
    setDescription(report.description ?? "");

    setError("");
    setEditing(true);
  }

  function cancelEditing() {
    if (!report) return;

    setName(report.name);
    setAge(
      report.age !== undefined && report.age !== null
        ? String(report.age)
        : "",
    );
    setLocation(report.location);
    setDescription(report.description ?? "");

    setError("");
    setEditing(false);
  }

  async function handleUpdate() {
    if (!report) return;

    if (!name.trim()) {
      setError("El nombre es obligatorio.");
      return;
    }

    if (!location.trim()) {
      setError("La ubicación es obligatoria.");
      return;
    }

    if (age && Number(age) < 0) {
      setError("La edad no puede ser negativa.");
      return;
    }

    if (age && Number(age) > 120) {
      setError("La edad no puede ser mayor a 120 años.");
      return;
    }

    setUpdating(true);
    setError("");

    try {
      const response = await fetch(
        `${API_URL}/reports/${params.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: name.trim(),
            age: age ? Number(age) : undefined,
            location: location.trim(),
            description: description.trim(),
          }),
        },
      );

      if (!response.ok) {
        throw new Error("No se pudo actualizar el reporte");
      }

      const updatedReport = await response.json();

      setReport(updatedReport);
      setEditing(false);
    } catch (error) {
      console.error(error);
      setError(
        "No se pudo actualizar el reporte. Intenta nuevamente.",
      );
    } finally {
      setUpdating(false);
    }
  }

  async function handleMarkAsFound() {
    if (!report) return;

    setUpdating(true);
    setError("");

    try {
      const response = await fetch(
        `${API_URL}/reports/${params.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            status: "encontrado",
          }),
        },
      );

      if (!response.ok) {
        throw new Error("No se pudo actualizar el reporte");
      }

      const updatedReport = await response.json();

      setReport(updatedReport);
      setConfirmFound(false);
    } catch (error) {
      console.error(error);
      setError(
        "No se pudo actualizar el estado del reporte. Intenta nuevamente.",
      );
    } finally {
      setUpdating(false);
    }
  }

  async function handleDelete() {
    if (!report) return;

    setDeleting(true);
    setError("");

    try {
      const response = await fetch(
        `${API_URL}/reports/${params.id}`,
        {
          method: "DELETE",
        },
      );

      if (!response.ok) {
        throw new Error("No se pudo eliminar el reporte");
      }

      router.push("/buscar");
    } catch (error) {
      console.error(error);
      setError(
        "No se pudo eliminar el reporte. Intenta nuevamente.",
      );
      setDeleting(false);
      setConfirmDelete(false);
    }
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-slate-50 px-4 py-10 sm:px-6 sm:py-12">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-slate-700">Cargando reporte...</p>
        </div>
      </main>
    );
  }

  if (error && !report) {
    return (
      <main className="min-h-screen bg-slate-50 px-4 py-10 sm:px-6 sm:py-12">
        <div className="mx-auto max-w-2xl">
          <button
            type="button"
            onClick={() => router.push("/buscar")}
            className="mb-6 font-semibold text-slate-700 transition hover:text-slate-900"
          >
            ← Volver a buscar
          </button>

          <div className="rounded-2xl border border-red-200 bg-red-50 p-6 font-medium text-red-700">
            {error}
          </div>
        </div>
      </main>
    );
  }

  if (!report) return null;

  const photoUrl = report.photoUrl
    ? `${API_URL}${report.photoUrl}`
    : null;

  const isFound = report.status === "encontrado";

  return (
    <main className="min-h-screen overflow-x-hidden bg-slate-50 px-4 py-8 sm:px-6 sm:py-12">
      <div className="mx-auto w-full max-w-2xl">
        {/* NAVEGACIÓN */}
        <button
          type="button"
          onClick={() => router.push("/buscar")}
          className="mb-6 inline-flex items-center font-semibold text-slate-700 transition hover:text-slate-900"
        >
          ← Volver a buscar
        </button>

        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          {/* FOTO */}
          <div className="flex h-72 w-full items-center justify-center overflow-hidden bg-slate-100 sm:h-96">
            {photoUrl ? (
              <img
                src={photoUrl}
                alt={`Fotografía de ${report.name}`}
                className="max-h-full max-w-full object-contain"
                loading="eager"
                decoding="async"
              />
            ) : (
              <span className="px-4 text-center text-slate-500">
                Fotografía no disponible
              </span>
            )}
          </div>

          {/* INFORMACIÓN */}
          <div className="p-5 sm:p-6">
            <div className="mb-5 flex min-w-0 items-center justify-between gap-3">
              {/* TIPO */}
              <span
                className={`shrink-0 rounded-full px-3 py-1 text-sm font-bold capitalize ${
                  report.type === "mascota"
                    ? "bg-blue-100 text-blue-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {report.type}
              </span>

              {/* ESTADO */}
              <span
                className={`min-w-0 truncate text-right font-semibold capitalize ${
                  isFound
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                {report.status}
              </span>
            </div>

            {editing ? (
              <div className="space-y-5">
                {/* NOMBRE */}
                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-900">
                    Nombre
                  </label>

                  <input
                    type="text"
                    value={name}
                    onChange={(event) =>
                      setName(event.target.value)
                    }
                    className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900 outline-none focus:border-red-500 focus:ring-2 focus:ring-red-100"
                  />
                </div>

                {/* EDAD */}
                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-900">
                    Edad
                  </label>

                  <input
                    type="number"
                    min="0"
                    value={age}
                    onChange={(event) =>
                      setAge(event.target.value)
                    }
                    className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900 outline-none focus:border-red-500 focus:ring-2 focus:ring-red-100"
                  />
                </div>

                {/* UBICACIÓN */}
                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-900">
                    Última ubicación conocida
                  </label>

                  <input
                    type="text"
                    value={location}
                    onChange={(event) =>
                      setLocation(event.target.value)
                    }
                    className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900 outline-none focus:border-red-500 focus:ring-2 focus:ring-red-100"
                  />
                </div>

                {/* DESCRIPCIÓN */}
                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-900">
                    Descripción
                  </label>

                  <textarea
                    value={description}
                    onChange={(event) =>
                      setDescription(event.target.value)
                    }
                    rows={5}
                    className="w-full resize-none rounded-xl border border-slate-300 px-4 py-3 text-slate-900 outline-none focus:border-red-500 focus:ring-2 focus:ring-red-100"
                  />
                </div>

                {/* ERROR */}
                {error && (
                  <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm font-medium text-red-700">
                    {error}
                  </div>
                )}

                {/* ACCIONES DE EDICIÓN */}
                <div className="flex flex-col gap-3 sm:flex-row">
                  <button
                    type="button"
                    onClick={cancelEditing}
                    disabled={updating}
                    className="flex-1 rounded-xl border border-slate-300 bg-white px-5 py-3 font-semibold text-slate-700 transition hover:bg-slate-50 disabled:opacity-50"
                  >
                    Cancelar
                  </button>

                  <button
                    type="button"
                    onClick={handleUpdate}
                    disabled={updating}
                    className="flex-1 rounded-xl bg-slate-900 px-5 py-3 font-bold text-white transition hover:bg-slate-800 disabled:opacity-50"
                  >
                    {updating
                      ? "Guardando..."
                      : "Guardar cambios"}
                  </button>
                </div>
              </div>
            ) : (
              <>
                {/* TÍTULO */}
                <h1 className="break-words text-3xl font-bold text-slate-900">
                  {report.name}
                </h1>

                {/* DATOS */}
                <div className="mt-3 space-y-2 text-slate-600">
                  {report.age !== undefined && (
                    <p>
                      <strong>Edad:</strong> {report.age} años
                    </p>
                  )}

                  <p className="break-words">
                    <strong>Última ubicación:</strong>{" "}
                    {report.location}
                  </p>
                </div>

                {/* DESCRIPCIÓN */}
                {report.description && (
                  <div className="mt-6">
                    <h2 className="mb-2 text-lg font-bold text-slate-900">
                      Descripción
                    </h2>

                    <p className="break-words leading-7 text-slate-600">
                      {report.description}
                    </p>
                  </div>
                )}

                {/* ERROR */}
                {error && (
                  <div className="mt-6 rounded-xl border border-red-200 bg-red-50 p-4 text-sm font-medium text-red-700">
                    {error}
                  </div>
                )}

                {/* CONFIRMACIÓN ELIMINAR */}
                {confirmDelete ? (
                  <div className="mt-6 rounded-xl border border-red-200 bg-red-50 p-5">
                    <p className="font-semibold text-red-900">
                      ¿Eliminar este reporte?
                    </p>

                    <p className="mt-1 text-sm text-red-700">
                      Esta acción eliminará el reporte permanentemente.
                    </p>

                    <div className="mt-4 flex flex-col gap-3 sm:flex-row">
                      <button
                        type="button"
                        onClick={() =>
                          setConfirmDelete(false)
                        }
                        disabled={deleting}
                        className="flex-1 rounded-xl border border-slate-300 bg-white px-4 py-3 font-semibold text-slate-700 transition hover:bg-slate-50 disabled:opacity-50"
                      >
                        Cancelar
                      </button>

                      <button
                        type="button"
                        onClick={handleDelete}
                        disabled={deleting}
                        className="flex-1 rounded-xl bg-red-600 px-4 py-3 font-bold text-white transition hover:bg-red-700 disabled:opacity-50"
                      >
                        {deleting
                          ? "Eliminando..."
                          : "Sí, eliminar"}
                      </button>
                    </div>
                  </div>
                ) : confirmFound ? (
                  /* CONFIRMACIÓN ENCONTRADO */
                  <div className="mt-6 rounded-xl border border-green-200 bg-green-50 p-5">
                    <p className="font-semibold text-green-900">
                      ¿Marcar este reporte como encontrado?
                    </p>

                    <p className="mt-1 text-sm text-green-700">
                      El estado del reporte cambiará de
                      desaparecido a encontrado.
                    </p>

                    <div className="mt-4 flex flex-col gap-3 sm:flex-row">
                      <button
                        type="button"
                        onClick={() =>
                          setConfirmFound(false)
                        }
                        disabled={updating}
                        className="flex-1 rounded-xl border border-slate-300 bg-white px-4 py-3 font-semibold text-slate-700 transition hover:bg-slate-50 disabled:opacity-50"
                      >
                        Cancelar
                      </button>

                      <button
                        type="button"
                        onClick={handleMarkAsFound}
                        disabled={updating}
                        className="flex-1 rounded-xl bg-green-600 px-4 py-3 font-bold text-white transition hover:bg-green-700 disabled:opacity-50"
                      >
                        {updating
                          ? "Actualizando..."
                          : "Sí, marcar encontrado"}
                      </button>
                    </div>
                  </div>
                ) : (
                  /* ACCIONES */
                  <div className="mt-6 space-y-3 border-t border-slate-200 pt-6">
                    <button
                      type="button"
                      onClick={startEditing}
                      className="w-full rounded-xl border border-slate-300 bg-white px-5 py-3 font-semibold text-slate-800 transition hover:bg-slate-50"
                    >
                      Editar reporte
                    </button>

                    {!isFound && (
                      <button
                        type="button"
                        onClick={() =>
                          setConfirmFound(true)
                        }
                        className="w-full rounded-xl bg-green-600 px-5 py-3 font-bold text-white transition hover:bg-green-700"
                      >
                        Marcar como encontrado
                      </button>
                    )}

                    <button
                      type="button"
                      onClick={() =>
                        setConfirmDelete(true)
                      }
                      className="w-full rounded-xl border border-red-200 px-5 py-3 font-semibold text-red-600 transition hover:bg-red-50"
                    >
                      Eliminar reporte
                    </button>
                  </div>
                )}

                {/* MENSAJE ENCONTRADO */}
                {isFound && (
                  <div className="mt-3 rounded-xl border border-green-200 bg-green-50 p-4 text-center">
                    <p className="font-semibold text-green-700">
                      Este reporte ha sido marcado como encontrado.
                    </p>
                  </div>
                )}
              </>
            )}

            {/* ID */}
            <div className="mt-6 border-t border-slate-200 pt-4 text-sm text-slate-500">
              Reporte #{report.id}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
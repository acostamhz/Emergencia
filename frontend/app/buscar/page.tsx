"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

type Report = {
  id: number;
  type: string;
  name: string;
  age?: number;
  location: string;
  description?: string;
  status: string;
  photoUrl?: string | null;
  createdAt?: string;
};

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function BuscarPage() {
  const router = useRouter();

  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState("");

  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("Todos");
  const [statusFilter, setStatusFilter] = useState("Todos");
  const [locationFilter, setLocationFilter] =
    useState("Todas las zonas");

  useEffect(() => {
    async function loadReports() {
      try {
        setLoading(true);
        setFetchError("");

        const response = await fetch(`${API_URL}/reports`);

        if (!response.ok) {
          throw new Error("No se pudieron obtener los reportes.");
        }

        const data = await response.json();

        if (!Array.isArray(data)) {
          throw new Error("La respuesta del servidor no es válida.");
        }

        setReports(data);
      } catch (error) {
        console.error("Error al obtener los reportes:", error);

        setFetchError(
          "No se pudieron cargar los reportes. Verifica que el servidor esté disponible.",
        );
      } finally {
        setLoading(false);
      }
    }

    loadReports();
  }, []);

  const locations = useMemo(() => {
    const uniqueLocations = Array.from(
      new Set(
        reports
          .map((report) => report.location?.trim())
          .filter(Boolean),
      ),
    );

    return uniqueLocations.sort((a, b) =>
      a.localeCompare(b, "es"),
    );
  }, [reports]);

  const filteredReports = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();

    return [...reports]
      .sort((a, b) => {
        if (!a.createdAt && !b.createdAt) {
          return b.id - a.id;
        }

        if (!a.createdAt) {
          return 1;
        }

        if (!b.createdAt) {
          return -1;
        }

        return (
          new Date(b.createdAt).getTime() -
          new Date(a.createdAt).getTime()
        );
      })
      .filter((report) => {
        const name = report.name?.toLowerCase() ?? "";
        const description =
          report.description?.toLowerCase() ?? "";
        const location =
          report.location?.toLowerCase() ?? "";

        const matchesSearch =
          !normalizedSearch ||
          name.includes(normalizedSearch) ||
          description.includes(normalizedSearch) ||
          location.includes(normalizedSearch);

        const matchesType =
          typeFilter === "Todos" ||
          (typeFilter === "Personas" &&
            report.type === "persona") ||
          (typeFilter === "Mascotas" &&
            report.type === "mascota");

        const matchesStatus =
          statusFilter === "Todos" ||
          (statusFilter === "Desaparecidos" &&
            report.status === "desaparecido") ||
          (statusFilter === "Encontrados" &&
            report.status === "encontrado");

        const matchesLocation =
          locationFilter === "Todas las zonas" ||
          report.location === locationFilter;

        return (
          matchesSearch &&
          matchesType &&
          matchesStatus &&
          matchesLocation
        );
      });
  }, [
    reports,
    search,
    typeFilter,
    statusFilter,
    locationFilter,
  ]);

  const hasActiveFilters =
    search.trim() !== "" ||
    typeFilter !== "Todos" ||
    statusFilter !== "Todos" ||
    locationFilter !== "Todas las zonas";

  function clearFilters() {
    setSearch("");
    setTypeFilter("Todos");
    setStatusFilter("Todos");
    setLocationFilter("Todas las zonas");
  }

  function getTypeLabel(type: string) {
    switch (type) {
      case "persona":
        return "Persona";

      case "mascota":
        return "Mascota";

      default:
        return type;
    }
  }

  function getStatusLabel(status: string) {
    switch (status) {
      case "desaparecido":
        return "Desaparecido";

      case "encontrado":
        return "Encontrado";

      default:
        return status;
    }
  }

  return (
    <main className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-6xl px-6 py-10">
        {/* NAVEGACIÓN */}
        <button
          type="button"
          onClick={() => router.push("/")}
          className="mb-8 inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold text-slate-600 transition hover:bg-white hover:text-slate-900"
        >
          <span className="text-lg">←</span>
          Volver al inicio
        </button>

        {/* ENCABEZADO */}
        <div className="mb-10">
          <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-red-600">
            Cali Emergencia
          </p>

          <h1 className="text-4xl font-bold tracking-tight text-slate-900">
            Buscar reportes
          </h1>

          <p className="mt-3 text-slate-700">
            Busca información sobre personas y mascotas
            reportadas como desaparecidas o encontradas.
          </p>
        </div>

        {/* FILTROS */}
        <div className="mb-10 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {/* BÚSQUEDA */}
            <input
              type="text"
              value={search}
              onChange={(event) =>
                setSearch(event.target.value)
              }
              placeholder="Nombre, descripción o ubicación..."
              className="rounded-lg border border-slate-300 px-4 py-3 text-slate-900 outline-none placeholder:text-slate-500 focus:border-red-500 focus:ring-2 focus:ring-red-100"
            />

            {/* TIPO */}
            <select
              value={typeFilter}
              onChange={(event) =>
                setTypeFilter(event.target.value)
              }
              className="rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none focus:border-red-500 focus:ring-2 focus:ring-red-100"
            >
              <option>Todos</option>
              <option>Personas</option>
              <option>Mascotas</option>
            </select>

            {/* ESTADO */}
            <select
              value={statusFilter}
              onChange={(event) =>
                setStatusFilter(event.target.value)
              }
              className="rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none focus:border-red-500 focus:ring-2 focus:ring-red-100"
            >
              <option>Todos</option>
              <option>Desaparecidos</option>
              <option>Encontrados</option>
            </select>

            {/* ZONA */}
            <select
              value={locationFilter}
              onChange={(event) =>
                setLocationFilter(event.target.value)
              }
              className="rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none focus:border-red-500 focus:ring-2 focus:ring-red-100"
            >
              <option>Todas las zonas</option>

              {locations.map((location) => (
                <option key={location} value={location}>
                  {location}
                </option>
              ))}
            </select>
          </div>

          {/* LIMPIAR FILTROS */}
          {hasActiveFilters && (
            <div className="mt-4 flex justify-end">
              <button
                type="button"
                onClick={clearFilters}
                className="text-sm font-semibold text-red-600 transition hover:text-red-700"
              >
                Limpiar filtros
              </button>
            </div>
          )}
        </div>

        {/* RESULTADOS */}
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-slate-900">
            Reportes recientes
          </h2>

          <span className="text-sm font-medium text-slate-600">
            {filteredReports.length}{" "}
            {filteredReports.length === 1
              ? "reporte"
              : "reportes"}
          </span>
        </div>

        {/* ERROR */}
        {fetchError ? (
          <div className="rounded-2xl border border-red-200 bg-red-50 p-8 text-center">
            <p className="font-semibold text-red-800">
              No se pudieron cargar los reportes.
            </p>

            <p className="mt-2 text-sm text-red-700">
              {fetchError}
            </p>

            <button
              type="button"
              onClick={() => window.location.reload()}
              className="mt-5 rounded-lg bg-red-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-red-700"
            >
              Reintentar
            </button>
          </div>
        ) : loading ? (
          /* LOADING */
          <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center">
            <p className="text-slate-700">
              Cargando reportes...
            </p>
          </div>
        ) : filteredReports.length === 0 ? (
          /* SIN RESULTADOS */
          <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center">
            <p className="font-medium text-slate-900">
              No se encontraron reportes.
            </p>

            <p className="mt-2 text-sm text-slate-600">
              {hasActiveFilters
                ? "Intenta cambiar los filtros o realizar otra búsqueda."
                : "Todavía no hay reportes disponibles."}
            </p>

            {hasActiveFilters && (
              <button
                type="button"
                onClick={clearFilters}
                className="mt-5 rounded-lg bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800"
              >
                Limpiar filtros
              </button>
            )}
          </div>
        ) : (
          /* RESULTADOS */
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredReports.map((report) => {
              const isFound =
                report.status === "encontrado";

              return (
                <article
                  key={report.id}
                  className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md"
                >
                  {/* FOTO */}
                  <div className="flex h-56 items-center justify-center overflow-hidden bg-slate-200">
                    {report.photoUrl ? (
                      <img
                        src={`${API_URL}${report.photoUrl}`}
                        alt={`Fotografía de ${report.name}`}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <span className="text-sm text-slate-600">
                        Fotografía no disponible
                      </span>
                    )}
                  </div>

                  {/* INFORMACIÓN */}
                  <div className="p-5">
                    <div className="mb-3 flex items-center justify-between gap-3">
                      {/* TIPO */}
                      <span className="rounded-full bg-red-100 px-3 py-1 text-xs font-semibold text-red-700">
                        {getTypeLabel(report.type)}
                      </span>

                      {/* ESTADO */}
                      <span
                        className={
                          isFound
                            ? "text-xs font-semibold text-green-600"
                            : "text-xs font-semibold text-red-600"
                        }
                      >
                        {getStatusLabel(report.status)}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold text-slate-900">
                      {report.name}
                    </h3>

                    <p className="mt-1 text-sm font-medium text-slate-600">
                      {report.age !== undefined &&
                        `${report.age} años · `}
                      {report.location}
                    </p>

                    {report.description && (
                      <p className="mt-3 line-clamp-2 text-sm text-slate-600">
                        {report.description}
                      </p>
                    )}

                    <button
                      type="button"
                      onClick={() =>
                        router.push(
                          `/reporte/${report.id}`,
                        )
                      }
                      className="mt-5 w-full rounded-lg bg-slate-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
                    >
                      Ver información
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
}
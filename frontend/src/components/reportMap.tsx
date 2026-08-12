"use client";

import { useEffect, useState } from "react";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMap,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

type Report = {
  id: number;
  type: string;
  name: string;
  age?: number;
  location: string;
  latitude?: number | null;
  longitude?: number | null;
  description?: string;
  status: string;
  photoUrl?: string | null;
};

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const defaultIcon = L.icon({
  iconUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

L.Marker.prototype.options.icon = defaultIcon;

function RecenterMap({
  center,
}: {
  center: [number, number];
}) {
  const map = useMap();

  useEffect(() => {
    map.setView(center, map.getZoom());
  }, [center, map]);

  return null;
}

export default function ReportMap() {
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);

  const defaultCenter: [number, number] = [
    3.4372,
    -76.5225,
  ];

  useEffect(() => {
    async function loadReports() {
      try {
        setLoading(true);

        const response = await fetch(`${API_URL}/reports`);

        if (!response.ok) {
          throw new Error(
            "No se pudieron cargar los reportes.",
          );
        }

        const data = await response.json();

        if (!Array.isArray(data)) {
          throw new Error(
            "La respuesta del servidor no es válida.",
          );
        }

        setReports(data);
      } catch (error) {
        console.error(
          "Error al cargar reportes:",
          error,
        );
      } finally {
        setLoading(false);
      }
    }

    loadReports();
  }, []);

  const mappedReports = reports.filter(
    (report) =>
      typeof report.latitude === "number" &&
      typeof report.longitude === "number",
  );

  return (
    <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <MapContainer
        center={defaultCenter}
        zoom={13}
        scrollWheelZoom
        className="h-[600px] w-full"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <RecenterMap center={defaultCenter} />

        {mappedReports.map((report) => (
          <Marker
            key={report.id}
            position={[
              report.latitude as number,
              report.longitude as number,
            ]}
          >
            <Popup>
              <div className="min-w-[230px]">
                <p className="text-xs font-semibold uppercase tracking-wide text-red-600">
                  {report.type === "persona"
                    ? "Persona"
                    : "Mascota"}
                </p>

                <h3 className="mt-1 text-base font-bold text-slate-900">
                  {report.name}
                </h3>

                <p className="mt-1 text-sm text-slate-600">
                  📍 {report.location}
                </p>

                {report.age !== undefined &&
                  report.age !== null && (
                    <p className="mt-1 text-sm text-slate-600">
                      Edad: {report.age} años
                    </p>
                  )}

                <p
                  className={`mt-2 text-xs font-semibold ${
                    report.status === "encontrado"
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {report.status === "encontrado"
                    ? "Encontrado"
                    : "Desaparecido"}
                </p>

                {report.description && (
                  <p className="mt-2 text-sm leading-5 text-slate-600">
                    {report.description}
                  </p>
                )}

                <a
                  href={`/reporte/${report.id}`}
                  className="mt-3 inline-block text-sm font-semibold text-slate-900 hover:underline"
                >
                  Ver reporte →
                </a>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>

      {loading && (
        <div className="absolute left-4 top-4 z-[1000] rounded-lg bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-md">
          Cargando reportes...
        </div>
      )}

      {!loading && mappedReports.length === 0 && (
        <div className="absolute left-4 top-4 z-[1000] rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm text-slate-600 shadow-md">
          No hay reportes con ubicación disponible.
        </div>
      )}

      {!loading && mappedReports.length > 0 && (
        <div className="absolute bottom-4 left-4 z-[1000] rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-md">
          {mappedReports.length}{" "}
          {mappedReports.length === 1
            ? "reporte localizado"
            : "reportes localizados"}
        </div>
      )}
    </div>
  );
}
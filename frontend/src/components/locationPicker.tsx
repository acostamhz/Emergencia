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

type LocationResult = {
  lat: string;
  lon: string;
  display_name: string;
};

type LocationPickerProps = {
  latitude: number | null;
  longitude: number | null;
  onLocationChange: (
    latitude: number,
    longitude: number,
    locationName: string,
  ) => void;
};

const defaultCenter: [number, number] = [3.4516, -76.532];

const markerIcon = L.icon({
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

function MapCenter({
  latitude,
  longitude,
}: {
  latitude: number;
  longitude: number;
}) {
  const map = useMap();

  useEffect(() => {
    map.setView([latitude, longitude], 15);
  }, [latitude, longitude, map]);

  return null;
}

async function reverseGeocode(
  latitude: number,
  longitude: number,
): Promise<string> {
  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}&zoom=18&addressdetails=1`,
    );

    if (!response.ok) {
      throw new Error("No se pudo obtener la ubicación.");
    }

    const data = await response.json();

    const address = data?.address;

    if (address) {
      const neighborhood =
        address.neighbourhood ||
        address.suburb ||
        address.quarter ||
        address.city_district ||
        "";

      const city =
        address.city ||
        address.town ||
        address.municipality ||
        "";

      if (neighborhood && city) {
        return `${neighborhood}, ${city}`;
      }

      if (neighborhood) {
        return neighborhood;
      }

      if (data?.display_name) {
        return data.display_name;
      }
    }

    return (
      data?.display_name ||
      `${latitude.toFixed(6)}, ${longitude.toFixed(6)}`
    );
  } catch (error) {
    console.error("Error en geocodificación inversa:", error);

    return `${latitude.toFixed(6)}, ${longitude.toFixed(6)}`;
  }
}

function DraggableMarker({
  latitude,
  longitude,
  onLocationChange,
}: {
  latitude: number;
  longitude: number;
  onLocationChange: (
    latitude: number,
    longitude: number,
    locationName: string,
  ) => void;
}) {
  return (
    <Marker
      position={[latitude, longitude]}
      icon={markerIcon}
      draggable
      eventHandlers={{
        dragend: async (event) => {
          const marker = event.target as L.Marker;
          const position = marker.getLatLng();

          const locationName = await reverseGeocode(
            position.lat,
            position.lng,
          );

          onLocationChange(
            position.lat,
            position.lng,
            locationName,
          );
        },
      }}
    >
      <Popup>
        Última ubicación conocida.
        <br />
        Puedes mover este marcador para ajustar la ubicación.
      </Popup>
    </Marker>
  );
}

export default function LocationPicker({
  latitude,
  longitude,
  onLocationChange,
}: LocationPickerProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<LocationResult[]>([]);
  const [searching, setSearching] = useState(false);
  const [searchError, setSearchError] = useState("");

  async function searchLocation() {
    const trimmedQuery = query.trim();

    if (!trimmedQuery) {
      setResults([]);
      setSearchError("");
      return;
    }

    setSearching(true);
    setSearchError("");
    setResults([]);

    try {
      /*
       * Hacemos varias búsquedas progresivas.
       *
       * Algunos barrios aparecen en Nominatim como:
       * - Barrio X
       * - X
       * - X, Cali
       *
       * Por eso no dependemos de una única consulta.
       */

      const queries = [
        `${trimmedQuery}, Cali, Colombia`,
        `${trimmedQuery}, Cali`,
        `${trimmedQuery}, Valle del Cauca, Colombia`,
        `${trimmedQuery}, Colombia`,
      ];

      const uniqueResults = new Map<string, LocationResult>();

      for (const searchQuery of queries) {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/search?format=jsonv2&limit=5&countrycodes=co&addressdetails=1&q=${encodeURIComponent(
            searchQuery,
          )}`,
        );

        if (!response.ok) {
          continue;
        }

        const data: LocationResult[] = await response.json();

        for (const result of data) {
          const key = `${result.lat}-${result.lon}`;

          if (!uniqueResults.has(key)) {
            uniqueResults.set(key, result);
          }
        }

        /*
         * Si ya encontramos resultados, no necesitamos
         * seguir haciendo consultas.
         */
        if (uniqueResults.size >= 5) {
          break;
        }
      }

      const finalResults = Array.from(uniqueResults.values()).slice(
        0,
        5,
      );

      setResults(finalResults);

      if (finalResults.length === 0) {
        setSearchError(
          "No encontramos esa ubicación. Intenta escribir solo el nombre del barrio o zona.",
        );
      }
    } catch (error) {
      console.error("Error buscando ubicación:", error);

      setSearchError(
        "No se pudo buscar la ubicación. Intenta nuevamente.",
      );
    } finally {
      setSearching(false);
    }
  }

  function selectLocation(result: LocationResult) {
    const newLatitude = Number(result.lat);
    const newLongitude = Number(result.lon);

    onLocationChange(
      newLatitude,
      newLongitude,
      result.display_name,
    );

    setQuery(result.display_name);
    setResults([]);
    setSearchError("");
  }

  return (
    <div className="space-y-3">
      <div className="flex gap-2">
        <input
          type="text"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              event.preventDefault();
              searchLocation();
            }
          }}
          placeholder="Ej. Capri, San Fernando, El Lido..."
          disabled={searching}
          className="min-w-0 flex-1 rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none placeholder:text-slate-400 focus:border-red-500 focus:ring-2 focus:ring-red-100 disabled:bg-slate-100"
        />

        <button
          type="button"
          onClick={searchLocation}
          disabled={searching}
          className="rounded-xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {searching ? "Buscando..." : "Buscar"}
        </button>
      </div>

      {searchError && (
        <p className="text-sm font-medium text-red-600">
          {searchError}
        </p>
      )}

      {results.length > 0 && (
        <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
          {results.map((result, index) => (
            <button
              key={`${result.lat}-${result.lon}-${index}`}
              type="button"
              onClick={() => selectLocation(result)}
              className="block w-full border-b border-slate-100 px-4 py-3 text-left text-sm text-slate-700 transition last:border-b-0 hover:bg-slate-50"
            >
              {result.display_name}
            </button>
          ))}
        </div>
      )}

      <div className="overflow-hidden rounded-xl border border-slate-200">
        <MapContainer
          center={defaultCenter}
          zoom={13}
          scrollWheelZoom
          className="h-[350px] w-full"
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {latitude !== null && longitude !== null && (
            <>
              <MapCenter
                latitude={latitude}
                longitude={longitude}
              />

              <DraggableMarker
                latitude={latitude}
                longitude={longitude}
                onLocationChange={onLocationChange}
              />
            </>
          )}
        </MapContainer>
      </div>

      {latitude !== null && longitude !== null ? (
        <div className="rounded-xl border border-green-200 bg-green-50 p-3">
          <p className="text-sm font-semibold text-green-700">
            Ubicación seleccionada
          </p>

          <p className="mt-1 text-xs text-green-600">
            {query ||
              `${latitude.toFixed(6)}, ${longitude.toFixed(6)}`}
          </p>

          <p className="mt-1 text-xs text-green-600">
            Puedes mover el marcador para ajustar el punto.
          </p>
        </div>
      ) : (
        <p className="text-xs text-slate-500">
          Busca el barrio o zona donde la persona o mascota fue
          vista por última vez y selecciona una ubicación.
        </p>
      )}
    </div>
  );
}
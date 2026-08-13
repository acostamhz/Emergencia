"use client";

import Link from "next/link";
import dynamic from "next/dynamic";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

const LocationPicker = dynamic(
  () => import("../../src/components/locationPicker"),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-[400px] items-center justify-center rounded-xl border border-slate-200 bg-slate-100">
        <p className="text-sm text-slate-500">
          Cargando mapa...
        </p>
      </div>
    ),
  },
);

const MAX_FILE_SIZE = 5 * 1024 * 1024;

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

export default function ReportarPage() {
  const router = useRouter();

  const [type, setType] = useState("persona");
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [photo, setPhoto] = useState<File | null>(null);

  const [latitude, setLatitude] = useState<number | null>(null);
  const [longitude, setLongitude] = useState<number | null>(null);

  const [dataPolicyAccepted, setDataPolicyAccepted] =
    useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function handleTypeChange(newType: string) {
    setType(newType);
    setName("");
    setAge("");
    setLocation("");
    setDescription("");
    setPhoto(null);
    setLatitude(null);
    setLongitude(null);
    setDataPolicyAccepted(false);
    setError("");

    const photoInput = document.getElementById(
      "photo",
    ) as HTMLInputElement | null;

    if (photoInput) {
      photoInput.value = "";
    }
  }

  function handlePhotoChange(file: File | null) {
    setError("");

    if (!file) {
      setPhoto(null);
      return;
    }

    if (!file.type.startsWith("image/")) {
      setPhoto(null);
      setError(
        "El archivo seleccionado debe ser una imagen.",
      );
      return;
    }

    if (file.size > MAX_FILE_SIZE) {
      setPhoto(null);
      setError(
        "La fotografía no puede superar los 5 MB.",
      );
      return;
    }

    setPhoto(file);
  }

  function handleLocationChange(
    newLatitude: number,
    newLongitude: number,
    locationName: string,
  ) {
    setLatitude(newLatitude);
    setLongitude(newLongitude);
    setLocation(locationName);
    setError("");
  }

  function validateForm(): boolean {
    const trimmedName = name.trim();
    const trimmedLocation = location.trim();

    if (!trimmedName) {
      setError("El nombre es obligatorio.");
      return false;
    }

    if (trimmedName.length < 2) {
      setError(
        "El nombre debe tener al menos 2 caracteres.",
      );
      return false;
    }

    if (!trimmedLocation) {
      setError(
        "La última ubicación conocida es obligatoria.",
      );
      return false;
    }

    if (latitude === null || longitude === null) {
      setError(
        "Debes seleccionar en el mapa la ubicación donde fue vista por última vez.",
      );
      return false;
    }

    if (age) {
      const numericAge = Number(age);

      if (!Number.isInteger(numericAge)) {
        setError("La edad debe ser un número entero.");
        return false;
      }

      if (numericAge < 0) {
        setError("La edad no puede ser negativa.");
        return false;
      }

      if (numericAge > 150) {
        setError("Ingresa una edad válida.");
        return false;
      }
    }

    if (photo && photo.size > MAX_FILE_SIZE) {
      setError(
        "La fotografía no puede superar los 5 MB.",
      );
      return false;
    }

    if (!dataPolicyAccepted) {
      setError(
        "Debes aceptar la política de tratamiento de datos personales.",
      );
      return false;
    }

    return true;
  }

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    setError("");

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();

      formData.append("type", type);
      formData.append("name", name.trim());
      formData.append("location", location.trim());
      formData.append(
        "description",
        description.trim(),
      );
      formData.append("status", "desaparecido");
      formData.append("latitude", String(latitude));
      formData.append("longitude", String(longitude));
      
      formData.append(
        "dataPolicyAccepted",
        String(dataPolicyAccepted)
      );

      if (age) {
        formData.append("age", age);
      }

      if (photo) {
        formData.append("photo", photo);
      }

      const response = await fetch(
        `${API_URL}/reports`,
        {
          method: "POST",
          body: formData,
        },
      );

      if (!response.ok) {
        let message =
          "No se pudo enviar el reporte.";

        try {
          const data = await response.json();

          if (data?.message) {
            message = Array.isArray(data.message)
              ? data.message.join(", ")
              : data.message;
          }
        } catch {
          // Se mantiene el mensaje genérico.
        }

        throw new Error(message);
      }

      router.push("/buscar");
    } catch (error) {
      console.error(
        "Error al crear el reporte:",
        error,
      );

      setError(
        error instanceof Error
          ? error.message
          : "No se pudo enviar el reporte. Intenta nuevamente.",
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-slate-50 px-6 py-10">
      <div className="mx-auto max-w-2xl">
        {/* VOLVER */}
        <Link
          href="/"
          className="mb-8 inline-flex items-center gap-2 rounded-lg px-2 py-2 text-sm font-semibold text-slate-600 transition hover:bg-white hover:text-slate-900"
        >
          <span className="text-lg leading-none">
            ←
          </span>
          Volver al inicio
        </Link>

        {/* ENCABEZADO */}
        <div className="mb-8">
          <p className="text-sm font-bold uppercase tracking-widest text-red-600">
            Cali Emergencia
          </p>

          <h1 className="mt-3 text-4xl font-bold tracking-tight text-slate-900">
            Reportar desaparición
          </h1>

          <p className="mt-4 max-w-xl leading-7 text-slate-600">
            Publica información sobre una persona o
            mascota desaparecida para ayudar a facilitar
            su búsqueda.
          </p>
        </div>

        {/* FORMULARIO */}
        <form
          onSubmit={handleSubmit}
          noValidate
          className="space-y-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8"
        >
          {/* TIPO */}
          <div>
            <label className="mb-3 block text-sm font-semibold text-slate-900">
              ¿Qué deseas reportar?
            </label>

            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() =>
                  handleTypeChange("persona")
                }
                disabled={loading}
                className={`rounded-xl border px-4 py-3 text-sm font-semibold transition ${
                  type === "persona"
                    ? "border-red-500 bg-red-50 text-red-700"
                    : "border-slate-300 bg-white text-slate-700 hover:bg-slate-50"
                } disabled:cursor-not-allowed disabled:opacity-50`}
              >
                Persona
              </button>

              <button
                type="button"
                onClick={() =>
                  handleTypeChange("mascota")
                }
                disabled={loading}
                className={`rounded-xl border px-4 py-3 text-sm font-semibold transition ${
                  type === "mascota"
                    ? "border-red-500 bg-red-50 text-red-700"
                    : "border-slate-300 bg-white text-slate-700 hover:bg-slate-50"
                } disabled:cursor-not-allowed disabled:opacity-50`}
              >
                Mascota
              </button>
            </div>
          </div>

          {/* NOMBRE */}
          <div>
            <label
              htmlFor="name"
              className="mb-2 block text-sm font-semibold text-slate-900"
            >
              {type === "persona"
                ? "Nombre de la persona"
                : "Nombre de la mascota"}{" "}
              <span className="text-red-600">
                *
              </span>
            </label>

            <input
              id="name"
              type="text"
              value={name}
              onChange={(event) =>
                setName(event.target.value)
              }
              placeholder={
                type === "persona"
                  ? "Ej. Juan Pérez"
                  : "Ej. Max"
              }
              disabled={loading}
              className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none placeholder:text-slate-400 transition focus:border-red-500 focus:ring-2 focus:ring-red-100 disabled:bg-slate-100"
            />
          </div>

          {/* EDAD */}
          <div>
            <label
              htmlFor="age"
              className="mb-2 block text-sm font-semibold text-slate-900"
            >
              Edad
            </label>

            <input
              id="age"
              type="number"
              min="0"
              max="150"
              value={age}
              onChange={(event) =>
                setAge(event.target.value)
              }
              placeholder={
                type === "persona"
                  ? "Ej. 32"
                  : "Ej. 3"
              }
              disabled={loading}
              className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none placeholder:text-slate-400 transition focus:border-red-500 focus:ring-2 focus:ring-red-100 disabled:bg-slate-100"
            />
          </div>

          {/* UBICACIÓN */}
          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-900">
              Última ubicación conocida{" "}
              <span className="text-red-600">
                *
              </span>
            </label>

            <p className="mb-3 text-sm text-slate-600">
              Busca el barrio o zona donde la persona
              o mascota fue vista por última vez.
            </p>

            <LocationPicker
              latitude={latitude}
              longitude={longitude}
              onLocationChange={
                handleLocationChange
              }
            />
          </div>

          {/* DESCRIPCIÓN */}
          <div>
            <label
              htmlFor="description"
              className="mb-2 block text-sm font-semibold text-slate-900"
            >
              Descripción
            </label>

            <textarea
              id="description"
              value={description}
              onChange={(event) =>
                setDescription(
                  event.target.value,
                )
              }
              placeholder={
                type === "persona"
                  ? "Ej. Cabello oscuro, estatura media. Vista por última vez cerca del parque."
                  : "Ej. Peso: 10 kg, color: marrón."
              }
              rows={5}
              disabled={loading}
              className="w-full resize-none rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none placeholder:text-slate-400 transition focus:border-red-500 focus:ring-2 focus:ring-red-100 disabled:bg-slate-100"
            />
          </div>

          {/* FOTOGRAFÍA */}
          <div>
            <label
              htmlFor="photo"
              className="mb-2 block text-sm font-semibold text-slate-900"
            >
              Fotografía
            </label>

            <input
              id="photo"
              type="file"
              accept="image/*"
              disabled={loading}
              onChange={(event) => {
                const file =
                  event.target.files?.[0] ??
                  null;

                handlePhotoChange(file);
              }}
              className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 file:mr-4 file:rounded-lg file:border-0 file:bg-slate-900 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white hover:file:bg-slate-800 disabled:bg-slate-100"
            />

            <p className="mt-2 text-xs text-slate-600">
              Opcional. Solo imágenes de máximo 5
              MB.
            </p>

            {photo && (
              <div className="mt-4 overflow-hidden rounded-xl border border-slate-200">
                <img
                  src={URL.createObjectURL(photo)}
                  alt="Vista previa de la fotografía seleccionada"
                  className="max-h-80 w-full object-cover"
                />

                <div className="flex items-center justify-between bg-slate-50 px-4 py-3">
                  <p className="truncate text-sm font-medium text-slate-700">
                    {photo.name}
                  </p>

                  <p className="ml-4 shrink-0 text-xs text-slate-500">
                    {(
                      photo.size /
                      (1024 * 1024)
                    ).toFixed(2)}{" "}
                    MB
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* POLÍTICA DE DATOS */}
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
            <label className="flex cursor-pointer items-start gap-3">
              <input
                type="checkbox"
                checked={dataPolicyAccepted}
                onChange={(event) =>
                  setDataPolicyAccepted(
                    event.target.checked,
                  )
                }
                disabled={loading}
                className="mt-1 h-4 w-4 rounded border-slate-300 text-red-600 focus:ring-red-500"
              />

              <span className="text-sm leading-6 text-slate-700">
                Declaro que la información
                proporcionada es veraz y autorizo el
                tratamiento de los datos suministrados
                para los fines relacionados con la
                búsqueda y gestión de este reporte.
                <span className="text-red-600">
                  {" "}
                  *
                </span>
              </span>
            </label>
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

          {/* BOTÓN */}
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-red-600 px-5 py-3.5 font-bold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading
              ? "Enviando reporte..."
              : "Publicar reporte"}
          </button>

          {/* INFORMACIÓN */}
          <p className="text-center text-xs leading-5 text-slate-500">
            La información será utilizada únicamente
            para facilitar la búsqueda y atención del
            reporte.
          </p>
        </form>
      </div>
    </main>
  );
}
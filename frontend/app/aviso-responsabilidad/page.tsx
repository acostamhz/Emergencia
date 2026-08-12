import Link from "next/link";

const points = [
  {
    number: "01",
    title: "Plataforma de apoyo ciudadano",
    text: "Cali Emergencia es una iniciativa ciudadana creada para facilitar la publicación y consulta de información relacionada con personas y mascotas desaparecidas durante situaciones de emergencia.",
  },
  {
    number: "02",
    title: "No somos una autoridad",
    text: "Cali Emergencia no es una entidad gubernamental, organismo de socorro, autoridad judicial, fuerza de seguridad ni servicio oficial de atención de emergencias.",
  },
  {
    number: "03",
    title: "La información puede no estar verificada",
    text: "Los reportes son proporcionados por usuarios de la plataforma. La existencia de una publicación no significa que Cali Emergencia haya confirmado independientemente la identidad, ubicación, desaparición o cualquier otro dato incluido en ella.",
  },
  {
    number: "04",
    title: "Verifica antes de compartir",
    text: "Antes de compartir un reporte o actuar con base en su contenido, verifica la información y, cuando corresponda, consulta directamente con las autoridades o familiares involucrados.",
  },
  {
    number: "05",
    title: "No reemplaza los canales oficiales",
    text: "La publicación de un reporte en Cali Emergencia no sustituye la presentación de una denuncia, la comunicación con las autoridades ni la solicitud de asistencia a los organismos de emergencia.",
  },
  {
    number: "06",
    title: "No pongas tu seguridad en riesgo",
    text: "No intentes realizar por tu cuenta acciones que puedan poner en peligro tu integridad o la de otras personas. La información encontrada a través de la plataforma debe utilizarse con prudencia.",
  },
  {
    number: "07",
    title: "Información de terceros",
    text: "Cali Emergencia no controla previamente todo el contenido proporcionado por los usuarios. Si identificas información falsa, inapropiada, sensible o potencialmente perjudicial, puedes solicitar su revisión.",
  },
  {
    number: "08",
    title: "Disponibilidad de la plataforma",
    text: "Aunque procuramos mantener el servicio disponible, pueden producirse interrupciones, errores, mantenimientos o situaciones que impidan temporalmente el acceso a la plataforma o a determinada información.",
  },
];

export default function AvisoResponsabilidadPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      {/* ENCABEZADO */}
      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-6 py-14 sm:py-20">
          <Link
            href="/"
            className="mb-10 inline-flex items-center gap-2 rounded-lg px-2 py-2 text-sm font-semibold text-slate-500 transition hover:bg-slate-50 hover:text-slate-900"
          >
            <span className="text-lg leading-none">←</span>
            Volver al inicio
          </Link>

          <div className="max-w-3xl">
            <p className="text-sm font-bold uppercase tracking-widest text-red-600">
              Cali Emergencia
            </p>

            <h1 className="mt-3 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
              Aviso de responsabilidad
            </h1>

            <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600">
              Información importante sobre el alcance de Cali Emergencia,
              el contenido publicado por los usuarios y el uso responsable
              de la plataforma.
            </p>

            <div className="mt-6 inline-flex rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm text-slate-600">
              Última actualización: agosto de 2026
            </div>
          </div>
        </div>
      </section>

      {/* AVISO PRINCIPAL */}
      <section className="px-6 py-14 sm:py-16">
        <div className="mx-auto max-w-6xl">
          <div className="overflow-hidden rounded-3xl border border-red-200 bg-red-50">
            <div className="p-8 sm:p-10">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-600 text-xl font-bold text-white">
                !
              </div>

              <h2 className="mt-6 text-2xl font-bold tracking-tight text-red-950 sm:text-3xl">
                Cali Emergencia no reemplaza a las autoridades.
              </h2>

              <p className="mt-5 max-w-4xl text-sm leading-7 text-red-900 sm:text-base">
                Esta plataforma es una herramienta de apoyo ciudadano. No
                constituye un servicio oficial de emergencia ni garantiza la
                exactitud, actualidad o veracidad de la información publicada
                por terceros.
              </p>

              <p className="mt-4 max-w-4xl text-sm leading-7 text-red-900 sm:text-base">
                Ante una desaparición, emergencia o situación que requiera
                atención inmediata, comunícate directamente con las
                autoridades y organismos de emergencia correspondientes.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* PRINCIPIOS */}
      <section className="border-y border-slate-200 bg-white px-6 py-16 sm:py-20">
        <div className="mx-auto max-w-6xl">
          <div className="mb-10 max-w-2xl">
            <p className="text-sm font-bold uppercase tracking-widest text-red-600">
              Lo que debes saber
            </p>

            <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900">
              Utiliza la información con criterio.
            </h2>

            <p className="mt-4 leading-7 text-slate-600">
              La plataforma busca ayudar, pero la información publicada puede
              cambiar, contener errores o no haber sido verificada.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            {points.map((point) => (
              <article
                key={point.number}
                className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
              >
                <div className="flex items-center gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-slate-100 text-xs font-bold text-slate-700">
                    {point.number}
                  </div>

                  <h3 className="text-lg font-bold text-slate-900">
                    {point.title}
                  </h3>
                </div>

                <p className="mt-4 text-sm leading-7 text-slate-600">
                  {point.text}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* EMERGENCIAS */}
      <section className="px-6 py-16 sm:py-20">
        <div className="mx-auto max-w-6xl">
          <div className="rounded-3xl bg-slate-900 p-8 sm:p-10">
            <div className="max-w-3xl">
              <p className="text-sm font-bold uppercase tracking-widest text-red-400">
                En caso de emergencia
              </p>

              <h2 className="mt-3 text-3xl font-bold tracking-tight text-white">
                Primero la seguridad. Después la plataforma.
              </h2>

              <p className="mt-5 leading-7 text-slate-400">
                Si existe una situación que requiere atención inmediata,
                utiliza los canales oficiales de emergencia. Cali Emergencia
                puede servir como una herramienta complementaria para
                compartir información, pero no debe retrasar la intervención
                de las autoridades o de los organismos de socorro.
              </p>
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
                <p className="text-2xl font-bold text-white">123</p>
                <p className="mt-1 text-sm text-slate-400">
                  Línea de emergencia
                </p>
              </div>

              <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
                <p className="text-2xl font-bold text-white">112</p>
                <p className="mt-1 text-sm text-slate-400">
                  Policía Nacional
                </p>
              </div>

              <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
                <p className="text-2xl font-bold text-white">132</p>
                <p className="mt-1 text-sm text-slate-400">
                  Cruz Roja Colombiana
                </p>
              </div>

              <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
                <p className="text-2xl font-bold text-white">119</p>
                <p className="mt-1 text-sm text-slate-400">
                  Bomberos
                </p>
              </div>
            </div>

            <p className="mt-6 text-xs leading-6 text-slate-500">
              Estos números se presentan como referencia general. Verifica
              siempre los canales oficiales de atención disponibles en tu
              ubicación.
            </p>
          </div>
        </div>
      </section>

      {/* CONTENIDO DE USUARIOS */}
      <section className="bg-white px-6 py-16">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-10 lg:grid-cols-2">
            <div>
              <p className="text-sm font-bold uppercase tracking-widest text-red-600">
                Publicaciones
              </p>

              <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900">
                La información proviene de la comunidad.
              </h2>

              <p className="mt-5 leading-7 text-slate-600">
                Los reportes pueden ser creados por ciudadanos. Por esta
                razón, no podemos garantizar que cada dato publicado haya
                sido confirmado por una fuente oficial.
              </p>
            </div>

            <div className="space-y-4">
              <div className="rounded-2xl border border-slate-200 p-6">
                <h3 className="font-bold text-slate-900">
                  ¿Encontraste información incorrecta?
                </h3>

                <p className="mt-2 text-sm leading-7 text-slate-600">
                  Evita difundirla y solicita que el reporte sea revisado.
                </p>

                <Link
                  href="/buscar"
                  className="mt-4 inline-block text-sm font-semibold text-red-600 underline underline-offset-4 hover:text-red-700"
                >
                  Ir a buscar reportes
                </Link>
              </div>

              <div className="rounded-2xl border border-slate-200 p-6">
                <h3 className="font-bold text-slate-900">
                  ¿Necesitas solicitar el ocultamiento?
                </h3>

                <p className="mt-2 text-sm leading-7 text-slate-600">
                  Puedes solicitar la revisión de una publicación cuando
                  consideres que existe una razón válida para ocultarla.
                </p>

                <Link
                  href="/solicitar-ocultar"
                  className="mt-4 inline-block text-sm font-semibold text-red-600 underline underline-offset-4 hover:text-red-700"
                >
                  Solicitar revisión
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* RESPONSABILIDAD DEL USUARIO */}
      <section className="bg-slate-50 px-6 py-16">
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-sm font-bold uppercase tracking-widest text-red-600">
            Responsabilidad ciudadana
          </p>

          <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900">
            Compartir información también implica responsabilidad.
          </h2>

          <p className="mt-5 leading-8 text-slate-600">
            Antes de publicar o compartir un reporte, piensa si la
            información realmente ayuda a encontrar a la persona o mascota
            y si puede exponer innecesariamente a alguien a un riesgo.
          </p>

          <div className="mt-8 rounded-2xl border border-amber-200 bg-amber-50 p-6 text-left">
            <p className="text-sm leading-7 text-amber-900">
              <strong>Recuerda:</strong> evita publicar números de documento,
              información financiera, contraseñas, datos médicos, direcciones
              particulares u otra información sensible que no sea necesaria
              para la búsqueda.
            </p>
          </div>
        </div>
      </section>

      {/* CIERRE */}
      <section className="bg-white px-6 py-16 sm:py-20">
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-sm font-bold uppercase tracking-widest text-red-600">
            Cali Emergencia
          </p>

          <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Una herramienta para ayudar, no para reemplazar a quienes deben
            responder.
          </h2>

          <p className="mx-auto mt-5 max-w-2xl leading-7 text-slate-600">
            Gracias por utilizar la plataforma de manera responsable y por
            contribuir a que la información compartida sea útil para la
            comunidad.
          </p>

          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              href="/buscar"
              className="rounded-xl bg-red-600 px-6 py-3.5 font-semibold text-white transition hover:bg-red-700"
            >
              Buscar desaparecidos
            </Link>

            <Link
              href="/"
              className="rounded-xl border border-slate-300 px-6 py-3.5 font-semibold text-slate-900 transition hover:bg-slate-50"
            >
              Volver al inicio
            </Link>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-slate-950 px-6 py-10 text-slate-400">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 text-sm sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="font-semibold text-white">
              Cali Emergencia
            </p>

            <p className="mt-1">
              Cali Emergencia · Plataforma ciudadana y sin fines de lucro.
            </p>
          </div>

          <div className="flex flex-wrap gap-x-5 gap-y-2">
            <Link
              href="/politica-datos"
              className="transition hover:text-white"
            >
              Política de datos
            </Link>

            <Link
              href="/terminos-uso"
              className="transition hover:text-white"
            >
              Términos de uso
            </Link>

            <Link
              href="/como-funciona"
              className="transition hover:text-white"
            >
              Cómo funciona
            </Link>
          </div>
        </div>
      </footer>
    </main>
  );
}
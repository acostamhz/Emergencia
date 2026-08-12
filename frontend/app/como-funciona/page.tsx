import Link from "next/link";

const steps = [
  {
    number: "01",
    title: "Reporta",
    description:
      "Registra una persona o mascota desaparecida proporcionando únicamente la información necesaria para ayudar a identificarla.",
  },
  {
    number: "02",
    title: "Ubica",
    description:
      "Selecciona en el mapa el lugar donde la persona o mascota fue vista por última vez. La ubicación ayuda a identificar rápidamente las zonas con reportes.",
  },
  {
    number: "03",
    title: "Busca",
    description:
      "Consulta los reportes disponibles y utiliza el buscador y los filtros para encontrar personas o mascotas por nombre, tipo o zona.",
  },
  {
    number: "04",
    title: "Comparte con responsabilidad",
    description:
      "Si encuentras un reporte relevante, compártelo únicamente por canales seguros y evita difundir información personal sensible.",
  },
  {
    number: "05",
    title: "Ayuda",
    description:
      "Si reconoces a una persona o mascota reportada o tienes información sobre su ubicación, utiliza los medios disponibles y, cuando corresponda, comunícate con las autoridades.",
  },
  {
    number: "06",
    title: "Marca como encontrada",
    description:
      "Cuando una persona o mascota haya sido localizada, el reporte puede marcarse como encontrado para indicar que la búsqueda ya no está activa.",
  },
];

export default function ComoFuncionaPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      {/* ENCABEZADO */}
      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-6 py-14 sm:py-20">
          <Link
            href="/"
            className="mb-10 inline-flex items-center gap-2 text-sm font-semibold text-slate-500 transition hover:text-slate-900"
          >
            <span className="text-lg">←</span>
            Volver al inicio
          </Link>

          <div className="max-w-3xl">
            <p className="text-sm font-bold uppercase tracking-widest text-red-600">
              Cali Emergencia
            </p>

            <h1 className="mt-3 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
              Cómo funciona
            </h1>

            <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600">
              Una herramienta ciudadana para reportar, consultar y compartir
              información que pueda ayudar a encontrar personas y mascotas
              desaparecidas.
            </p>
          </div>
        </div>
      </section>

      {/* PASOS */}
      <section className="px-6 py-16 sm:py-20">
        <div className="mx-auto max-w-6xl">
          <div className="mb-12 max-w-2xl">
            <p className="text-sm font-bold uppercase tracking-widest text-red-600">
              En pocos pasos
            </p>

            <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-900">
              Así funciona Cali Emergencia
            </h2>

            <p className="mt-4 leading-7 text-slate-600">
              Cada reporte puede aportar información valiosa. Sigue estos
              pasos para utilizar la plataforma correctamente.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {steps.map((step) => (
              <article
                key={step.number}
                className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-7 shadow-sm transition duration-200 hover:-translate-y-1 hover:border-slate-300 hover:shadow-md"
              >
                <div className="flex items-center justify-between">
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-red-50 text-sm font-bold text-red-600 ring-1 ring-red-100">
                    {step.number}
                  </div>

                  <span className="text-3xl font-bold text-slate-100 transition group-hover:text-red-50">
                    {step.number}
                  </span>
                </div>

                <h3 className="mt-7 text-xl font-bold text-slate-900">
                  {step.title}
                </h3>

                <p className="mt-3 leading-7 text-slate-600">
                  {step.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* USO RESPONSABLE */}
      <section className="px-6 pb-16 sm:pb-20">
        <div className="mx-auto max-w-6xl">
          <div className="overflow-hidden rounded-3xl border border-amber-200 bg-amber-50">
            <div className="grid lg:grid-cols-[0.8fr_1.2fr]">
              <div className="bg-amber-100/60 p-8 sm:p-10">
                <p className="text-sm font-bold uppercase tracking-widest text-amber-700">
                  Importante
                </p>

                <h2 className="mt-3 text-3xl font-bold tracking-tight text-amber-950">
                  Comparte con responsabilidad.
                </h2>
              </div>

              <div className="p-8 sm:p-10">
                <div className="space-y-5 text-sm leading-7 text-amber-900">
                  <p>
                    Comparte únicamente la información necesaria para ayudar
                    a localizar a una persona o mascota.
                  </p>

                  <p>
                    Evita publicar números de teléfono, documentos de
                    identidad, direcciones particulares u otros datos
                    personales sensibles que no sean necesarios.
                  </p>

                  <p>
                    Antes de compartir un reporte, verifica que la información
                    sea correcta y que corresponda realmente a la persona o
                    mascota que estás buscando.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ALCANCE DE LA PLATAFORMA */}
      <section className="border-y border-slate-200 bg-white px-6 py-16 sm:py-20">
        <div className="mx-auto max-w-6xl">
          <div className="max-w-3xl">
            <p className="text-sm font-bold uppercase tracking-widest text-red-600">
              Nuestro alcance
            </p>

            <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Una herramienta de apoyo para la comunidad.
            </h2>

            <p className="mt-5 text-base leading-8 text-slate-600">
              Cali Emergencia es una plataforma ciudadana, voluntaria y sin
              fines de lucro. Su objetivo es facilitar la publicación y
              consulta de información que pueda ser útil durante una
              emergencia.
            </p>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-3">
            <InfoCard
              title="Ciudadana"
              description="La información publicada nace de la colaboración de personas que buscan ayudar."
            />

            <InfoCard
              title="Voluntaria"
              description="La participación es voluntaria y está orientada a apoyar a quienes lo necesitan."
            />

            <InfoCard
              title="Sin fines de lucro"
              description="La plataforma está pensada como una herramienta de apoyo comunitario."
            />
          </div>

          <div className="mt-8 rounded-2xl border border-slate-200 bg-slate-50 p-6 sm:p-7">
            <p className="text-sm leading-7 text-slate-600">
              <strong className="text-slate-900">
                Cali Emergencia no reemplaza a las autoridades,
              </strong>{" "}
              organismos de emergencia ni sus canales oficiales. Cuando
              exista una situación de emergencia, comunícate también con las
              autoridades correspondientes.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-slate-900 px-6 py-16 sm:py-20">
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-sm font-bold uppercase tracking-widest text-red-400">
            Cali Emergencia
          </p>

          <h2 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Una persona puede estar esperando que alguien la reconozca.
          </h2>

          <p className="mx-auto mt-5 max-w-2xl leading-7 text-slate-400">
            Consulta los reportes disponibles o registra una desaparición
            para ayudar a mantener la información organizada y accesible.
          </p>

          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              href="/buscar"
              className="rounded-xl bg-red-600 px-6 py-3.5 font-semibold text-white transition hover:bg-red-700"
            >
              Buscar desaparecidos
            </Link>

            <Link
              href="/reportar"
              className="rounded-xl border border-slate-600 px-6 py-3.5 font-semibold text-white transition hover:bg-slate-800"
            >
              Reportar desaparición
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

          <Link
            href="/"
            className="font-semibold transition hover:text-white"
          >
            Volver al inicio
          </Link>
        </div>
      </footer>
    </main>
  );
}

function InfoCard({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
      <h3 className="text-lg font-bold text-slate-900">
        {title}
      </h3>

      <p className="mt-2 text-sm leading-6 text-slate-600">
        {description}
      </p>
    </div>
  );
}
import Link from "next/link";

const sections = [
  {
    number: "01",
    title: "Aceptación de los términos",
    content: [
      "Al acceder o utilizar Cali Emergencia, aceptas estos Términos de Uso y te comprometes a utilizar la plataforma de manera responsable.",
      "Si no estás de acuerdo con estos términos, debes abstenerte de utilizar las funciones de publicación, consulta o interacción disponibles en la plataforma.",
    ],
  },
  {
    number: "02",
    title: "Sobre Cali Emergencia",
    content: [
      "Cali Emergencia es una plataforma ciudadana, voluntaria y sin fines de lucro cuyo propósito es facilitar la publicación y consulta de información relacionada con personas y mascotas desaparecidas durante situaciones de emergencia.",
      "La plataforma funciona como una herramienta de apoyo para la comunidad y no sustituye a las autoridades, organismos de emergencia, servicios de salud ni otros canales oficiales.",
    ],
  },
  {
    number: "03",
    title: "Publicación de reportes",
    content: [
      "Las personas que crean un reporte son responsables de proporcionar información que sea razonablemente correcta, necesaria y pertinente para el propósito de la publicación.",
      "No debes utilizar la plataforma para crear reportes falsos, engañosos, maliciosos o que tengan como finalidad perjudicar a otra persona.",
      "Antes de publicar un reporte, verifica que cuentas con una razón legítima para proporcionar la información y evita incluir datos personales que no sean necesarios.",
    ],
  },
  {
    number: "04",
    title: "Información y fotografías",
    content: [
      "Al publicar una fotografía, descripción o información dentro de un reporte, debes procurar que su utilización sea legítima y esté relacionada con la finalidad de ayudar a localizar a una persona o mascota.",
      "No debes publicar contenido que incluya información médica, documentos de identidad, contraseñas, información financiera, direcciones particulares u otros datos sensibles que no sean necesarios.",
      "Cuando el reporte involucre niños, niñas o adolescentes, debes actuar con especial cuidado y evitar cualquier información que pueda ponerlos en riesgo.",
    ],
  },
  {
    number: "05",
    title: "Uso prohibido",
    content: [
      "Está prohibido utilizar Cali Emergencia para acosar, amenazar, discriminar, suplantar, extorsionar o perjudicar a otras personas.",
      "Tampoco está permitido utilizar la plataforma para publicar spam, publicidad no solicitada, contenido ilegal, información deliberadamente falsa o material que no tenga relación con la finalidad de la plataforma.",
      "No debes intentar acceder sin autorización a cuentas, sistemas, bases de datos, servicios internos o información que no esté destinada a ti.",
    ],
  },
  {
    number: "06",
    title: "Veracidad de la información",
    content: [
      "Cali Emergencia facilita la publicación de reportes ciudadanos, pero la existencia de un reporte no significa que toda la información haya sido verificada independientemente por la plataforma.",
      "Los usuarios deben verificar la información antes de compartirla o tomar decisiones basadas en ella.",
      "Cuando corresponda, una situación de desaparición debe ser comunicada también a las autoridades y organismos de emergencia competentes.",
    ],
  },
  {
    number: "07",
    title: "Moderación y ocultamiento",
    content: [
      "Cali Emergencia puede revisar publicaciones que hayan sido reportadas por los usuarios o que puedan incumplir estos Términos de Uso.",
      "Los usuarios pueden solicitar la revisión u ocultamiento de una publicación cuando consideren que contiene información que no debería permanecer disponible públicamente.",
      "Una solicitud de ocultamiento no implica que la publicación será retirada automáticamente. La solicitud podrá ser revisada antes de tomar una decisión.",
    ],
  },
  {
    number: "08",
    title: "Disponibilidad del servicio",
    content: [
      "Intentamos mantener Cali Emergencia disponible y funcionando correctamente, pero no podemos garantizar que el servicio esté disponible de manera permanente o sin interrupciones.",
      "Podemos realizar cambios, actualizaciones, mantenimientos o modificaciones en las funcionalidades de la plataforma cuando sea necesario.",
    ],
  },
];

const principles = [
  {
    title: "Respeto",
    description:
      "Utiliza la plataforma pensando en las personas y familias involucradas.",
  },
  {
    title: "Responsabilidad",
    description:
      "Publica únicamente información que sea necesaria y que tengas razones para considerar correcta.",
  },
  {
    title: "Verificación",
    description:
      "Antes de compartir un reporte, verifica su información y procedencia.",
  },
];

export default function TerminosUsoPage() {
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
              Términos de uso
            </h1>

            <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600">
              Estas reglas establecen cómo utilizar Cali Emergencia de forma
              responsable y segura para ayudar a las personas y mascotas que
              están siendo buscadas.
            </p>

            <div className="mt-6 inline-flex rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm text-slate-600">
              Última actualización: agosto de 2026
            </div>
          </div>
        </div>
      </section>

      {/* INTRODUCCIÓN */}
      <section className="px-6 py-14 sm:py-16">
        <div className="mx-auto max-w-6xl">
          <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm sm:p-10">
            <p className="text-sm font-bold uppercase tracking-widest text-red-600">
              Antes de utilizar la plataforma
            </p>

            <h2 className="mt-3 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              Ayudar también implica utilizar la información con cuidado.
            </h2>

            <p className="mt-5 max-w-4xl leading-8 text-slate-600">
              Cali Emergencia busca facilitar la colaboración ciudadana durante
              situaciones en las que encontrar rápidamente información puede
              ser importante.
            </p>

            <p className="mt-4 max-w-4xl leading-8 text-slate-600">
              Para que la plataforma sea útil y segura, necesitamos que las
              personas que la utilizan actúen de buena fe, respeten a los
              demás usuarios y eviten publicar información innecesaria o
              potencialmente perjudicial.
            </p>
          </div>
        </div>
      </section>

      {/* PRINCIPIOS */}
      <section className="px-6 pb-16 sm:pb-20">
        <div className="mx-auto max-w-6xl">
          <div className="mb-10 max-w-2xl">
            <p className="text-sm font-bold uppercase tracking-widest text-red-600">
              Principios de uso
            </p>

            <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900">
              Tres reglas sencillas.
            </h2>

            <p className="mt-4 leading-7 text-slate-600">
              La plataforma funciona mejor cuando todos contribuimos de forma
              responsable.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {principles.map((principle) => (
              <div
                key={principle.title}
                className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm"
              >
                <h3 className="text-xl font-bold text-slate-900">
                  {principle.title}
                </h3>

                <p className="mt-3 text-sm leading-7 text-slate-600">
                  {principle.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TÉRMINOS */}
      <section className="border-y border-slate-200 bg-white px-6 py-16 sm:py-20">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-5 md:grid-cols-2">
            {sections.map((section) => (
              <article
                key={section.number}
                className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-red-50 text-sm font-bold text-red-600 ring-1 ring-red-100">
                  {section.number}
                </div>

                <h2 className="mt-6 text-xl font-bold text-slate-900">
                  {section.title}
                </h2>

                <div className="mt-4 space-y-4">
                  {section.content.map((paragraph) => (
                    <p
                      key={paragraph}
                      className="text-sm leading-7 text-slate-600"
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* RESPONSABILIDAD */}
      <section className="px-6 py-16 sm:py-20">
        <div className="mx-auto max-w-6xl">
          <div className="overflow-hidden rounded-3xl border border-amber-200 bg-amber-50">
            <div className="grid lg:grid-cols-[0.8fr_1.2fr]">
              <div className="bg-amber-100/60 p-8 sm:p-10">
                <p className="text-sm font-bold uppercase tracking-widest text-amber-700">
                  Importante
                </p>

                <h2 className="mt-3 text-3xl font-bold tracking-tight text-amber-950">
                  Cali Emergencia no reemplaza a las autoridades.
                </h2>
              </div>

              <div className="p-8 sm:p-10">
                <p className="text-sm leading-7 text-amber-900">
                  La plataforma es una herramienta de apoyo ciudadano. Ante
                  una desaparición o una situación de emergencia, utiliza
                  también los canales oficiales de las autoridades y
                  organismos de emergencia correspondientes.
                </p>

                <p className="mt-4 text-sm leading-7 text-amber-900">
                  No retrases una comunicación con las autoridades por esperar
                  una respuesta o resultado dentro de la plataforma.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CONTENIDO Y MODERACIÓN */}
      <section className="border-t border-slate-200 bg-white px-6 py-16">
        <div className="mx-auto max-w-6xl">
          <div className="max-w-3xl">
            <p className="text-sm font-bold uppercase tracking-widest text-red-600">
              Contenido publicado
            </p>

            <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900">
              La plataforma puede intervenir cuando sea necesario.
            </h2>

            <p className="mt-5 leading-7 text-slate-600">
              Para proteger a la comunidad y mantener la finalidad de Cali
              Emergencia, podremos revisar, limitar u ocultar contenido que
              incumpla estos términos, que pueda representar un riesgo para
              una persona o que no tenga relación con el propósito de la
              plataforma.
            </p>

            <p className="mt-4 leading-7 text-slate-600">
              Cuando sea posible y apropiado, las solicitudes de revisión
              serán evaluadas antes de tomar una decisión sobre la
              publicación.
            </p>
          </div>
        </div>
      </section>

      {/* CAMBIOS */}
      <section className="bg-slate-50 px-6 py-16">
        <div className="mx-auto max-w-6xl">
          <div className="rounded-2xl border border-slate-200 bg-white p-7 sm:p-8">
            <h2 className="text-xl font-bold text-slate-900">
              Cambios en estos términos
            </h2>

            <p className="mt-4 text-sm leading-7 text-slate-600">
              Cali Emergencia puede actualizar estos Términos de Uso cuando
              resulte necesario para reflejar cambios en la plataforma, en
              sus funcionalidades o en las obligaciones aplicables.
            </p>

            <p className="mt-4 text-sm leading-7 text-slate-600">
              Cuando existan cambios relevantes, procuraremos presentar la
              versión actualizada de manera visible dentro de la plataforma.
            </p>
          </div>
        </div>
      </section>

      {/* CONTACTO */}
      <section className="px-6 py-16">
        <div className="mx-auto max-w-6xl">
          <div className="rounded-3xl bg-slate-900 p-8 sm:p-10">
            <p className="text-sm font-bold uppercase tracking-widest text-red-400">
              Contacto
            </p>

            <h2 className="mt-3 text-3xl font-bold tracking-tight text-white">
              ¿Tienes alguna pregunta?
            </h2>

            <p className="mt-4 max-w-2xl leading-7 text-slate-400">
              Si tienes dudas sobre estos términos, encuentras un problema
              técnico o necesitas comunicar algo relacionado con una
              publicación, puedes contactarnos.
            </p>

            <a
              href="mailto:acostadevice@gmail.com"
              className="mt-6 inline-block font-semibold text-white underline decoration-red-500 underline-offset-4 transition hover:text-red-400"
            >
              acostadevice@gmail.com
            </a>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-slate-900 px-6 pb-16">
        <div className="mx-auto max-w-4xl border-t border-slate-800 pt-16 text-center">
          <p className="text-sm font-bold uppercase tracking-widest text-red-400">
            Cali Emergencia
          </p>

          <h2 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Utilicemos la información para ayudar.
          </h2>

          <p className="mx-auto mt-5 max-w-2xl leading-7 text-slate-400">
            Una plataforma ciudadana funciona cuando quienes participan
            también cuidan la información y a las personas involucradas.
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
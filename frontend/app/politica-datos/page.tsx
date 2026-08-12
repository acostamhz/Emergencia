import Link from "next/link";

const sections = [
  {
    number: "01",
    title: "¿Qué información recopilamos?",
    content: [
      "Cuando se crea un reporte, podemos recopilar información como nombre, edad, tipo de reporte, descripción, fotografía y última ubicación conocida.",
      "La ubicación puede incluir el nombre de una zona o barrio y las coordenadas seleccionadas en el mapa.",
      "También podemos conservar información relacionada con el estado del reporte y las fechas de creación y actualización.",
    ],
  },
  {
    number: "02",
    title: "¿Para qué utilizamos la información?",
    content: [
      "La información se utiliza principalmente para publicar, consultar y organizar reportes de personas y mascotas desaparecidas.",
      "La ubicación permite mostrar los reportes en el mapa y ayudar a identificar las zonas donde se han registrado desapariciones.",
      "También podemos utilizar la información para mantener la plataforma funcionando, atender solicitudes de soporte, corregir errores y proteger el servicio frente a usos indebidos.",
    ],
  },
  {
    number: "03",
    title: "¿Qué información se muestra públicamente?",
    content: [
      "Cali Emergencia está diseñada para facilitar la búsqueda ciudadana. Por esta razón, parte de la información de un reporte puede ser visible para otros usuarios.",
      "La plataforma busca limitar la información publicada a aquella que resulte útil para identificar a la persona o mascota y facilitar su localización.",
      "No recomendamos incluir números de identificación, teléfonos personales, direcciones particulares, información médica u otros datos sensibles dentro de la descripción del reporte.",
    ],
  },
  {
    number: "04",
    title: "Fotografías y datos de ubicación",
    content: [
      "Las fotografías pueden utilizarse como elemento de identificación dentro del reporte.",
      "Las ubicaciones registradas se utilizan para representar la última zona conocida en la que una persona o mascota fue vista.",
      "Antes de publicar una fotografía o información de ubicación, recomendamos verificar que sea necesaria para el propósito del reporte y que no exponga innecesariamente a la persona afectada.",
    ],
  },
  {
    number: "05",
    title: "¿Compartimos o vendemos los datos?",
    content: [
      "Cali Emergencia no tiene como finalidad vender datos personales ni utilizarlos para publicidad personalizada.",
      "La información puede ser visible para otros usuarios cuando ello haga parte del funcionamiento de la plataforma y de la finalidad de facilitar la búsqueda.",
      "También podremos suministrar información cuando exista una obligación legal, una orden de autoridad competente o una situación en la que la legislación permita o exija hacerlo.",
    ],
  },
  {
    number: "06",
    title: "¿Cuánto tiempo conservamos la información?",
    content: [
      "Los datos se conservarán durante el tiempo que resulte necesario para cumplir las finalidades de la plataforma y atender las obligaciones legales aplicables.",
      "Cuando un reporte deje de ser necesario o exista una solicitud válida de supresión, se evaluará la eliminación, anonimización u ocultamiento de la información de acuerdo con las obligaciones legales aplicables.",
    ],
  },
];

const rights = [
  {
    title: "Conocer",
    description:
      "Solicitar información sobre los datos personales que son tratados por la plataforma.",
  },
  {
    title: "Actualizar",
    description:
      "Solicitar la actualización de información que haya cambiado.",
  },
  {
    title: "Rectificar",
    description:
      "Solicitar la corrección de información inexacta, incompleta o que pueda inducir a error.",
  },
  {
    title: "Solicitar supresión",
    description:
      "Solicitar la eliminación de información cuando resulte procedente de acuerdo con la legislación aplicable.",
  },
  {
    title: "Revocar autorización",
    description:
      "Solicitar la revocatoria de la autorización para el tratamiento cuando esta sea la base aplicable y la ley lo permita.",
  },
];

export default function PoliticaDatosPage() {
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
              Política de datos
            </h1>

            <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600">
              Queremos que sepas qué información recopilamos, para qué la
              utilizamos y qué puedes hacer cuando quieras conocer, actualizar
              o solicitar la eliminación de tus datos.
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
              Tu privacidad importa
            </p>

            <h2 className="mt-3 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              Información para usar Cali Emergencia de forma segura.
            </h2>

            <p className="mt-5 max-w-4xl leading-8 text-slate-600">
              Cali Emergencia es una plataforma ciudadana, voluntaria y sin
              fines de lucro creada para facilitar la publicación y consulta
              de información relacionada con personas y mascotas
              desaparecidas durante una emergencia.
            </p>

            <p className="mt-4 max-w-4xl leading-8 text-slate-600">
              Debido a la naturaleza de la plataforma, algunos reportes pueden
              contener información personal. Por ello buscamos aplicar
              criterios de necesidad, responsabilidad y seguridad en el
              tratamiento de la información.
            </p>
          </div>
        </div>
      </section>

      {/* SECCIONES PRINCIPALES */}
      <section className="px-6 pb-16 sm:pb-20">
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

      {/* DERECHOS */}
      <section className="border-y border-slate-200 bg-white px-6 py-16 sm:py-20">
        <div className="mx-auto max-w-6xl">
          <div className="max-w-3xl">
            <p className="text-sm font-bold uppercase tracking-widest text-red-600">
              Tus derechos
            </p>

            <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Tú tienes control sobre tus datos.
            </h2>

            <p className="mt-5 leading-7 text-slate-600">
              De acuerdo con las normas colombianas de protección de datos
              personales, los titulares pueden ejercer diferentes derechos
              sobre su información.
            </p>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {rights.map((right) => (
              <div
                key={right.title}
                className="rounded-2xl border border-slate-200 bg-slate-50 p-6"
              >
                <h3 className="text-lg font-bold text-slate-900">
                  {right.title}
                </h3>

                <p className="mt-2 text-sm leading-6 text-slate-600">
                  {right.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SOLICITUDES */}
      <section className="px-6 py-16 sm:py-20">
        <div className="mx-auto max-w-6xl">
          <div className="overflow-hidden rounded-3xl border border-slate-200 bg-slate-900">
            <div className="grid lg:grid-cols-[1fr_1.2fr]">
              <div className="p-8 sm:p-10">
                <p className="text-sm font-bold uppercase tracking-widest text-red-400">
                  Consultas y solicitudes
                </p>

                <h2 className="mt-3 text-3xl font-bold tracking-tight text-white">
                  ¿Quieres corregir o retirar información?
                </h2>

                <p className="mt-5 leading-7 text-slate-400">
                  Puedes comunicarte con nosotros para realizar consultas,
                  solicitar correcciones o presentar una solicitud relacionada
                  con el tratamiento de datos personales.
                </p>
              </div>

              <div className="bg-slate-800 p-8 sm:p-10">
                <p className="text-sm font-semibold text-slate-300">
                  Canal de atención
                </p>

                <a
                  href="mailto:contacto@softwareparati.com"
                  className="mt-3 block text-xl font-bold text-white transition hover:text-red-400"
                >
                  contacto@softwareparati.com
                </a>

                <p className="mt-5 text-sm leading-6 text-slate-400">
                  En tu solicitud procura indicar tu nombre, explicar
                  claramente qué información deseas consultar, actualizar,
                  corregir o retirar y, cuando sea necesario, proporcionar
                  información que permita identificar el reporte relacionado.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MENORES */}
      <section className="px-6 pb-16">
        <div className="mx-auto max-w-6xl">
          <div className="rounded-2xl border border-red-200 bg-red-50 p-7 sm:p-8">
            <p className="text-sm font-bold uppercase tracking-widest text-red-700">
              Especial atención
            </p>

            <h2 className="mt-2 text-2xl font-bold text-red-950">
              Niños, niñas y adolescentes
            </h2>

            <p className="mt-4 max-w-4xl text-sm leading-7 text-red-900">
              La información relacionada con niños, niñas y adolescentes
              requiere especial protección. La legislación colombiana
              establece reglas específicas para su tratamiento y exige
              respetar sus derechos prevalentes. 
            </p>

            <p className="mt-4 max-w-4xl text-sm leading-7 text-red-900">
              Por esta razón, evita publicar información adicional que pueda
              ponerlos en riesgo, como direcciones particulares, información
              médica, datos escolares u otros datos que no sean estrictamente
              necesarios para el propósito del reporte.
            </p>
          </div>
        </div>
      </section>

      {/* SEGURIDAD */}
      <section className="border-t border-slate-200 bg-white px-6 py-16">
        <div className="mx-auto max-w-6xl">
          <div className="max-w-3xl">
            <p className="text-sm font-bold uppercase tracking-widest text-red-600">
              Seguridad
            </p>

            <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900">
              Protegemos la información dentro de nuestras posibilidades.
            </h2>

            <p className="mt-5 leading-7 text-slate-600">
              Aplicamos medidas técnicas y organizativas razonables para
              proteger la información frente a accesos, modificaciones,
              pérdidas o usos no autorizados.
            </p>

            <p className="mt-4 leading-7 text-slate-600">
              Sin embargo, ningún sistema conectado a Internet puede
              garantizar una seguridad absoluta. Si identificas un posible
              incidente de seguridad o un uso indebido de información,
              comunícate con nosotros lo antes posible.
            </p>
          </div>
        </div>
      </section>

      {/* RESPONSABILIDAD */}
      <section className="bg-slate-50 px-6 py-16">
        <div className="mx-auto max-w-6xl">
          <div className="rounded-2xl border border-slate-200 bg-white p-7 sm:p-8">
            <h2 className="text-xl font-bold text-slate-900">
              Sobre la información publicada
            </h2>

            <p className="mt-4 text-sm leading-7 text-slate-600">
              Cali Emergencia facilita la publicación y consulta de reportes
              ciudadanos, pero la existencia de un reporte no significa que
              toda la información haya sido verificada de manera independiente
              por la plataforma.
            </p>

            <p className="mt-4 text-sm leading-7 text-slate-600">
              Antes de compartir información, verifica su procedencia y
              recuerda que una situación de desaparición también debe ser
              comunicada a las autoridades y organismos de emergencia
              correspondientes.
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
            Ayudemos sin poner en riesgo a nadie.
          </h2>

          <p className="mx-auto mt-5 max-w-2xl leading-7 text-slate-400">
            La información puede ayudar a encontrar a alguien. Compartirla de
            manera responsable también es parte de ayudar.
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
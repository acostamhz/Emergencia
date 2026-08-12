"use client";

import dynamic from "next/dynamic";

const ReportMap = dynamic(
  () => import("../../src/components/reportMap"),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-[600px] items-center justify-center rounded-2xl border border-slate-200 bg-slate-200">
        <p className="text-slate-600">Cargando mapa...</p>
      </div>
    ),
  },
);

export default function MapaClient() {
  return <ReportMap />;
}
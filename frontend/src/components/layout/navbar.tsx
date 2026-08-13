"use client";

import Link from "next/link";
import { useState } from "react";
import {
  Menu,
  X,
  Search,
  Map,
  Plus,
} from "lucide-react";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] =
    useState(false);

  const navLinks = [
    {
      name: "Inicio",
      href: "#inicio",
    },
    {
      name: "Buscar",
      href: "/buscar",
      icon: Search,
    },
    {
      name: "Mapa",
      href: "/mapa",
      icon: Map,
    },
    {
      name: "Cómo funciona",
      href: "/como-funciona",
    },
  ];

  return (
    <header className="fixed left-1/2 top-4 z-50 w-[94%] max-w-6xl -translate-x-1/2">
      <div className="relative rounded-2xl border border-slate-200/80 bg-white/90 px-4 py-3 shadow-lg shadow-slate-900/5 backdrop-blur-xl sm:px-5">

        {/* CONTENEDOR PRINCIPAL */}

        <div className="flex items-center justify-between">

          {/* MARCA */}

          <Link
            href="/"
            onClick={() =>
              setMobileMenuOpen(false)
            }
            className="group flex shrink-0 items-center"
          >
            <span className="text-base font-extrabold tracking-tight text-red-600 transition group-hover:text-red-700 sm:text-lg">
              CALI EMERGENCIA
            </span>
          </Link>

          {/* NAVEGACIÓN DESKTOP */}

          <nav className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-1 rounded-xl border border-slate-200/70 bg-slate-50/80 p-1 lg:flex">
            {navLinks.map((link) => {
              const Icon = link.icon;

              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className="flex items-center gap-2 whitespace-nowrap rounded-lg px-3.5 py-2 text-sm font-semibold text-slate-600 transition hover:bg-white hover:text-slate-900 hover:shadow-sm"
                >
                  {Icon && (
                    <Icon className="h-4 w-4" />
                  )}

                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* CTA DESKTOP */}

          <Link
            href="/reportar"
            className="hidden shrink-0 items-center gap-2 rounded-xl bg-red-600 px-4 py-2.5 text-sm font-bold text-white shadow-sm transition hover:bg-red-700 hover:shadow-md sm:flex"
          >
            <Plus className="h-4 w-4" />

            <span>
              Reportar caso
            </span>
          </Link>

          {/* MOBILE */}

          <button
            type="button"
            onClick={() =>
              setMobileMenuOpen(
                !mobileMenuOpen,
              )
            }
            className="rounded-lg p-2 text-slate-700 transition hover:bg-slate-100 hover:text-slate-900 lg:hidden"
            aria-label={
              mobileMenuOpen
                ? "Cerrar menú"
                : "Abrir menú"
            }
            aria-expanded={
              mobileMenuOpen
            }
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {/* MENÚ MOBILE */}

      {mobileMenuOpen && (
        <div className="mt-2 rounded-2xl border border-slate-200 bg-white/95 p-4 shadow-xl backdrop-blur-xl lg:hidden">
          <nav className="space-y-1">
            {navLinks.map((link) => {
              const Icon = link.icon;

              return (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() =>
                    setMobileMenuOpen(
                      false,
                    )
                  }
                  className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 hover:text-slate-900"
                >
                  {Icon && (
                    <Icon className="h-4 w-4 text-slate-500" />
                  )}

                  {link.name}
                </Link>
              );
            })}

            <div className="my-3 border-t border-slate-200" />

            <Link
              href="/reportar"
              onClick={() =>
                setMobileMenuOpen(
                  false,
                )
              }
              className="flex items-center justify-center gap-2 rounded-xl bg-red-600 px-4 py-3 text-sm font-bold text-white transition hover:bg-red-700"
            >
              <Plus className="h-4 w-4" />

              Reportar caso
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
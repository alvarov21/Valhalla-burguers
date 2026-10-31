"use client";

import React, { useEffect, useState } from "react";
import { LOCATIONS } from "@/data/locations";
import type { LiveLocationStatus } from "@/lib/schedule";
import { trackLocationIntent } from "@/lib/analytics";
import { LiveStatusPill, ShoppingBagOpen } from "./Ornaments";
import { List, X, ArrowUpRight } from "@phosphor-icons/react";

interface HeaderProps {
  statusMap: Record<string, LiveLocationStatus>;
  activeSection: string;
  onSelectHall?: (hallId: "capuchinos" | "teatinos" | "santa-paula") => void;
}

const NAV_ITEMS = [
  { id: "capuchinos", label: "Capuchinos", isHall: true },
  { id: "teatinos", label: "Teatinos", isHall: true },
  { id: "santa-paula", label: "Santa Paula", isHall: true },
  { id: "carta", label: "La Carta", isHall: false },
  { id: "faq", label: "FAQ", isHall: false },
] as const;

export default function Header({
  statusMap,
  activeSection,
  onSelectHall,
}: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [orderMenuOpen, setOrderMenuOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 48);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOrderMenuOpen(false);
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-coal/88 backdrop-blur-md border-b border-gold/25 py-3 shadow-[0_12px_40px_rgba(0,0,0,0.65)]"
            : "bg-gradient-to-b from-coal/85 via-coal/40 to-transparent py-5"
        }`}
      >
        <div className="mx-auto flex max-w-[1440px] items-center justify-between px-5 sm:px-8 lg:px-14">
          {/* Brand Logo (Always original SVG, never reconstructed with fonts) */}
          <a
            href="#inicio"
            aria-label="Valhalla Grill Burger — Ir al inicio"
            className="group flex items-center gap-3.5 focus-visible:outline-gold"
          >
            <img
              src="/images/valhalla-logo.svg"
              alt="Logo oficial del casco de Valhalla Grill Burger"
              width={48}
              height={48}
              className="h-11 w-11 sm:h-12 sm:w-12 object-contain transition-transform duration-500 group-hover:scale-105"
            />
            <div className="flex flex-col">
              <span className="font-eyebrow text-xs sm:text-sm font-semibold tracking-[0.26em] text-ivory">
                VALHALLA GRILL
              </span>
              <span className="font-eyebrow text-[9px] tracking-[0.34em] text-gold">
                MÁS QUE HAMBURGUESAS
              </span>
            </div>
          </a>

          {/* Center Navigation (Desktop) */}
          <nav
            aria-label="Navegación principal"
            className="hidden lg:flex items-center gap-8"
          >
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={(e) => {
                    if (item.isHall && onSelectHall) {
                      e.preventDefault();
                      onSelectHall(item.id);
                    }
                  }}
                  className={`relative py-2 font-eyebrow text-[11px] tracking-[0.28em] transition-colors ${
                    isActive
                      ? "text-gold-light"
                      : "text-ivory/80 hover:text-gold-light"
                  }`}
                >
                  {item.label}
                  {/* Active Gold Diamond Indicator */}
                  <span
                    aria-hidden="true"
                    className={`absolute left-1/2 -bottom-1.5 -translate-x-1/2 text-[9px] text-gold transition-all duration-300 ${
                      isActive
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 -translate-y-1"
                    }`}
                  >
                    ◆
                  </span>
                </a>
              );
            })}
          </nav>

          {/* Right CTA: Pedir Ahora (3 locations selector) + Mobile Burger */}
          <div className="relative flex items-center gap-3">
            <div className="relative">
              <button
                type="button"
                onClick={() => setOrderMenuOpen((prev) => !prev)}
                aria-expanded={orderMenuOpen}
                aria-haspopup="true"
                className="btn-double-gold !px-4 !py-2.5 sm:!px-6 sm:!py-3 text-[11px]"
              >
                <ShoppingBagOpen size={16} weight="light" className="text-gold" />
                <span>Pedir ahora</span>
              </button>

              {/* Quick 3-Hall Order Popover */}
              {orderMenuOpen && (
                <>
                  <div
                    className="fixed inset-0 z-40"
                    onClick={() => setOrderMenuOpen(false)}
                    aria-hidden="true"
                  />
                  <div
                    role="menu"
                    aria-label="Elige tu salón para pedir online en Qamarero"
                    className="absolute right-0 mt-3 z-50 w-[320px] sm:w-[360px] border border-gold/45 bg-coal/98 p-4 shadow-[0_24px_60px_rgba(0,0,0,0.9)] backdrop-blur-xl"
                  >
                    <div className="flex items-center justify-between border-b border-gold/20 pb-2.5 mb-3">
                      <span className="font-eyebrow text-[10px] tracking-[0.3em] text-gold">
                        ELIGE SALÓN · CANAL OFICIAL
                      </span>
                      <button
                        type="button"
                        onClick={() => setOrderMenuOpen(false)}
                        aria-label="Cerrar selector de pedido"
                        className="text-ash hover:text-ivory p-1"
                      >
                        <X size={15} weight="light" />
                      </button>
                    </div>

                    <div className="space-y-2.5">
                      {LOCATIONS.map((loc) => {
                        const st = statusMap[loc.id];
                        return (
                          <a
                            key={loc.id}
                            href={loc.ordering.qamareroUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={() => {
                              trackLocationIntent("pedir", loc.id, {
                                source: "header_dropdown",
                              });
                              setOrderMenuOpen(false);
                            }}
                            className="group block border border-gold/25 bg-wine/65 p-3 transition-all hover:border-gold hover:bg-blood/60"
                          >
                            <div className="flex items-center justify-between">
                              <span className="font-display text-lg font-bold tracking-wide text-ivory group-hover:text-gold-light">
                                {loc.chapter} · {loc.name}
                              </span>
                              <ArrowUpRight
                                size={16}
                                weight="light"
                                className="text-gold transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                              />
                            </div>
                            <p className="text-xs text-ash mt-0.5">
                              {loc.address.streetAddress} · {loc.ordering.qamareroModeLabel}
                            </p>
                            {st && (
                              <div className="mt-2">
                                <LiveStatusPill status={st} compact />
                              </div>
                            )}
                          </a>
                        );
                      })}
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Abrir menú de navegación"
              className="lg:hidden inline-flex h-10 w-10 items-center justify-center border border-gold/35 bg-coal/75 text-gold-light hover:border-gold"
            >
              <List size={22} weight="light" />
            </button>
          </div>
        </div>
      </header>

      {/* Fullscreen Mobile Menu in --wine */}
      {mobileMenuOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Menú principal móvil"
          className="fixed inset-0 z-[80] flex flex-col justify-between bg-wine px-6 py-6 overflow-y-auto"
        >
          <div className="flex items-center justify-between border-b border-gold/25 pb-4">
            <div className="flex items-center gap-3">
              <img
                src="/images/valhalla-logo.svg"
                alt="Logo Valhalla Grill Burger"
                className="h-10 w-10 object-contain"
              />
              <span className="font-eyebrow text-xs tracking-[0.28em] text-gold-light">
                EL GRAN SALÓN
              </span>
            </div>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              aria-label="Cerrar menú"
              className="inline-flex h-10 w-10 items-center justify-center border border-gold/40 text-ivory"
            >
              <X size={20} weight="light" />
            </button>
          </div>

          {/* 3 Locations in large Playfair with live status */}
          <div className="my-6 space-y-5">
            <p className="font-eyebrow text-[11px] tracking-[0.32em] text-gold">
              NUESTROS TRES SALONES EN MÁLAGA
            </p>
            {LOCATIONS.map((loc) => {
              const st = statusMap[loc.id];
              return (
                <div
                  key={loc.id}
                  className="border-b border-gold/20 pb-4 flex flex-col gap-2"
                >
                  <a
                    href={`#${loc.id}`}
                    onClick={(e) => {
                      e.preventDefault();
                      setMobileMenuOpen(false);
                      onSelectHall?.(loc.id);
                    }}
                    className="flex items-baseline justify-between group"
                  >
                    <span className="font-display text-3xl font-bold tracking-tight text-ivory group-hover:text-gold-light">
                      <span className="font-eyebrow text-sm text-gold mr-2.5">
                        {loc.chapter}.
                      </span>
                      {loc.name}
                    </span>
                    <span className="font-eyebrow text-[10px] text-gold">
                      VER SALÓN →
                    </span>
                  </a>
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="text-xs text-ash">
                      {loc.hallSubtitle} · {loc.address.streetAddress}
                    </span>
                    {st && <LiveStatusPill status={st} compact />}
                  </div>
                </div>
              );
            })}

            <div className="pt-2 flex flex-wrap gap-6">
              <a
                href="#carta"
                onClick={() => setMobileMenuOpen(false)}
                className="font-display text-2xl text-gold-light hover:underline"
              >
                La Carta · El Banquete
              </a>
              <a
                href="#pedir"
                onClick={() => setMobileMenuOpen(false)}
                className="font-display text-2xl text-ivory hover:underline"
              >
                Pedir a Domicilio
              </a>
              <a
                href="#faq"
                onClick={() => setMobileMenuOpen(false)}
                className="font-display text-2xl text-ivory/80 hover:underline"
              >
                Preguntas Frecuentes
              </a>
            </div>
          </div>

          <div className="border-t border-gold/25 pt-4 text-center">
            <p className="font-eyebrow text-[10px] tracking-[0.3em] text-gold">
              EN EL VALHALLA NO SE RESERVA: SE CONQUISTA.
            </p>
          </div>
        </div>
      )}
    </>
  );
}

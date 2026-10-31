"use client";

import React, { useState } from "react";
import type { LocationData } from "@/data/locations";
import type { LiveLocationStatus } from "@/lib/schedule";
import { trackLocationIntent } from "@/lib/analytics";
import {
  HallIcon,
  ShiftIcon,
  LiveStatusPill,
  MapPin,
  ShoppingBagOpen,
  Compass,
  ShieldChevron,
} from "./Ornaments";
import { ArrowUpRight, MapTrifold, Image } from "@phosphor-icons/react";

interface LocationChapterProps {
  location: LocationData;
  status: LiveLocationStatus;
  isHiddenByTab?: boolean;
}

export default function LocationChapter({
  location,
  status,
  isHiddenByTab = false,
}: LocationChapterProps) {
  const [viewMode, setViewMode] = useState<"photo" | "map">("photo");

  const encodedQuery = encodeURIComponent(
    `${location.fullName}, ${location.address.streetAddress}, ${location.address.postalCode} Málaga`
  );

  return (
    <article
      id={location.id}
      aria-labelledby={`heading-${location.id}`}
      className={isHiddenByTab ? "sr-only" : "block"}
    >
      <div className="border border-gold/40 bg-gradient-to-b from-wine/90 to-coal p-6 sm:p-8 lg:p-10 shadow-[0_20px_60px_rgba(0,0,0,0.8)]">
        {/* Clean 2-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column (6 cols): Photo / Interactive Map + Local Vibe */}
          <div className="lg:col-span-6 space-y-4">
            <div className="relative border border-gold/30 bg-coal overflow-hidden">
              <div className="aspect-[16/10] w-full overflow-hidden relative">
                {viewMode === "map" ? (
                  <iframe
                    title={`Mapa de ${location.fullName}`}
                    src={`https://www.google.com/maps?q=${encodedQuery}&output=embed`}
                    className="h-full w-full border-0 contrast-125 invert-[90%] hue-rotate-180 saturate-50"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                ) : (
                  <>
                    <img
                      src={location.heroImage.src}
                      alt={location.heroImage.alt}
                      className="h-full w-full object-cover"
                    />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-coal/85 via-transparent to-transparent" />
                  </>
                )}

                {/* Floating Toggle: Foto / Mapa */}
                <div className="absolute top-3 right-3 flex gap-1.5">
                  <button
                    type="button"
                    onClick={() => setViewMode("photo")}
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 font-eyebrow text-[10px] tracking-[0.2em] border backdrop-blur-md ${
                      viewMode === "photo"
                        ? "border-gold bg-blood/95 text-gold-light"
                        : "border-gold/30 bg-coal/85 text-ivory/80 hover:text-ivory"
                    }`}
                  >
                    <Image size={13} weight="light" />
                    <span>Salón</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setViewMode("map")}
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 font-eyebrow text-[10px] tracking-[0.2em] border backdrop-blur-md ${
                      viewMode === "map"
                        ? "border-gold bg-blood/95 text-gold-light"
                        : "border-gold/30 bg-coal/85 text-ivory/80 hover:text-ivory"
                    }`}
                  >
                    <MapTrifold size={13} weight="light" />
                    <span>Mapa</span>
                  </button>
                </div>

                {viewMode === "photo" && (
                  <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between">
                    <span className="font-display italic text-lg text-gold-light">
                      «{location.hallSubtitle}»
                    </span>
                    <span className="font-eyebrow text-[10px] tracking-[0.24em] text-ivory/80">
                      CAPÍTULO {location.chapter}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Brief Local Note + Recommended Burger */}
            <div className="border border-gold/25 bg-coal/65 p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <p className="text-xs sm:text-sm text-ivory/85">
                  {location.differential.description}
                </p>
              </div>
              <div className="shrink-0 sm:border-l border-gold/25 sm:pl-4">
                <span className="font-eyebrow text-[9px] tracking-[0.24em] text-gold block">
                  RECOMENDADA AQUÍ
                </span>
                <a
                  href="#carta"
                  className="font-display text-base font-bold text-gold-light hover:underline"
                >
                  {location.differential.recommendedBurgerName} →
                </a>
              </div>
            </div>
          </div>

          {/* Right Column (6 cols): Direct Info (Title, Status, Address, Schedule, CTAs) */}
          <div className="lg:col-span-6 flex flex-col justify-between space-y-5">
            <div>
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <HallIcon type={location.iconType} size={18} />
                  <span className="font-eyebrow text-[11px] tracking-[0.3em] text-gold">
                    {location.seoHeading}
                  </span>
                </div>
                <LiveStatusPill status={status} compact />
              </div>

              <h2
                id={`heading-${location.id}`}
                className="mt-1 font-display font-black uppercase tracking-tight text-4xl sm:text-5xl text-gold-metallic-sheen is-sheened"
              >
                {location.name}
              </h2>

              {/* Address + Services */}
              <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-ivory/90">
                <span className="inline-flex items-center gap-1.5 font-medium">
                  <MapPin size={17} weight="light" className="text-gold shrink-0" />
                  {location.address.streetAddress}, {location.address.postalCode} Málaga
                </span>
                <span className="text-xs text-ash">
                  ({location.address.shortBarrio})
                </span>
              </div>
            </div>

            {/* Clean Schedule Box */}
            <div className="border border-gold/30 bg-coal/80 p-4 sm:p-5">
              <div className="flex items-center justify-between border-b border-gold/20 pb-2.5 mb-2.5">
                <span className="font-eyebrow text-[10px] tracking-[0.28em] text-gold-light">
                  HORARIO DE APERTURA
                </span>
                <span className="text-xs text-ash">
                  {location.shortScheduleSummary}
                </span>
              </div>

              <div className="divide-y divide-gold/10">
                {location.schedule.map((day) => {
                  const isToday = day.dayIndex === status.todayDayIndex;
                  return (
                    <div
                      key={day.dayIndex}
                      className={`flex items-center justify-between py-1.5 px-2 text-xs ${
                        isToday
                          ? "bg-blood/55 border-l-2 border-l-gold font-medium text-gold-light"
                          : "text-ivory/80"
                      }`}
                    >
                      <span className="font-eyebrow text-[10px] tracking-[0.22em]">
                        {day.dayName} {isToday && "◆ HOY"}
                      </span>
                      <div className="flex items-center gap-3 tabular-nums">
                        {day.slots.map((slot, idx) => (
                          <span key={idx} className="inline-flex items-center gap-1">
                            <ShiftIcon shift={slot.shift} size={12} />
                            <span>
                              {slot.open} – {slot.close}
                            </span>
                          </span>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* No reservations notice */}
            <div className="flex items-center gap-2 text-xs text-gold-light">
              <ShieldChevron size={16} weight="light" className="shrink-0" />
              <span>
                <strong>Sin reservas:</strong> ven directo, asignamos mesa por orden de llegada.
              </span>
            </div>

            {/* Big, Unmistakable Action Buttons */}
            <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-3">
              <a
                href={location.ordering.qamareroUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() =>
                  trackLocationIntent("pedir", location.id, {
                    source: "location_card",
                  })
                }
                className="btn-double-gold w-full justify-center"
              >
                <ShoppingBagOpen size={16} weight="light" className="text-gold" />
                <span>Pedir en {location.name}</span>
                <ArrowUpRight size={14} weight="light" className="text-gold" />
              </a>

              <a
                href={location.geo.googleMapsDirectionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() =>
                  trackLocationIntent("como_llegar", location.id, {
                    source: "location_card",
                  })
                }
                className="btn-outline-gold w-full justify-center"
              >
                <Compass size={16} weight="light" className="text-gold" />
                <span>Cómo llegar (Maps)</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

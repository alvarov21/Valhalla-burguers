"use client";

import React, { useState } from "react";
import {
  MUSEUM_BURGERS,
  MENU_CATEGORIES,
  SEASONAL_SPECIAL,
} from "@/data/menu";
import { LOCATIONS } from "@/data/locations";
import { trackLocationIntent } from "@/lib/analytics";
import { DiamondRule, Fire } from "./Ornaments";
import { ArrowUpRight } from "@phosphor-icons/react";

export default function MenuSection() {
  const [activeTab, setActiveTab] = useState<
    "burgers" | "entrantes" | "patatas" | "postres" | "bebidas"
  >("burgers");

  const activeCategory =
    MENU_CATEGORIES.find((c) => c.id === activeTab) ?? MENU_CATEGORIES[0];

  return (
    <section
      id="carta"
      aria-labelledby="heading-carta"
      className="relative border-t border-gold/25 bg-coal py-16 sm:py-24 overflow-hidden"
    >
      <div className="relative z-10 mx-auto max-w-[1280px] px-5 sm:px-8 lg:px-12">
        {/* Clean Header */}
        <div className="gsap-reveal text-center max-w-2xl mx-auto">
          <span className="font-eyebrow text-[11px] tracking-[0.34em] text-gold">
            LA CARTA · VACA RUBIA GALLEGA
          </span>
          <h2
            id="heading-carta"
            className="mt-2 font-display text-4xl sm:text-5xl lg:text-6xl font-black text-ivory tracking-tight"
          >
            El Banquete
          </h2>
          <p className="mt-3 font-body text-sm sm:text-base text-ash">
            Carne fresca smasheada al momento sobre plancha candente, pan brioche tostado y quesos fundidos.
          </p>
          <DiamondRule compact />
        </div>

        {/* Top 3 Signature Burgers (Clean 3-card showcase, zero clutter) */}
        <div className="gsap-reveal mt-10 grid grid-cols-1 md:grid-cols-3 gap-5">
          {MUSEUM_BURGERS.map((burger) => (
            <div
              key={burger.id}
              className="group border border-gold/30 bg-wine/60 overflow-hidden flex flex-col justify-between transition-colors hover:border-gold/75"
            >
              <div>
                <div className="relative aspect-[16/11] w-full overflow-hidden bg-coal">
                  <img
                    src={burger.image}
                    alt={`Burger ${burger.name} — Valhalla Grill Burger`}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-wine via-transparent to-transparent" />
                  {burger.badge && (
                    <span className="absolute top-3 left-3 border border-gold/50 bg-coal/90 px-2.5 py-1 font-eyebrow text-[9px] tracking-[0.24em] text-gold-light">
                      {burger.badge}
                    </span>
                  )}
                </div>

                <div className="p-5">
                  <div className="flex items-baseline justify-between gap-2">
                    <h3 className="font-display text-2xl sm:text-3xl font-bold text-ivory">
                      {burger.name}
                    </h3>
                    <span className="tabular-price text-xl font-semibold text-gold-light">
                      {burger.priceFormatted}
                    </span>
                  </div>
                  <p className="mt-2 font-body text-sm text-ivory/80 leading-relaxed">
                    {burger.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Category Tabs + Clean 2-Column Menu List */}
        <div className="gsap-reveal mt-12 border border-gold/30 bg-wine/40 p-6 sm:p-10">
          <div
            role="tablist"
            aria-label="Categorías de la carta"
            className="flex flex-wrap justify-center gap-2 border-b border-gold/20 pb-6"
          >
            {MENU_CATEGORIES.map((cat) => {
              const isSelected = cat.id === activeTab;
              return (
                <button
                  key={cat.id}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  onClick={() => setActiveTab(cat.id)}
                  className={`px-4 sm:px-5 py-2.5 font-eyebrow text-[11px] tracking-[0.24em] border transition-all ${
                    isSelected
                      ? "border-gold bg-blood text-gold-light"
                      : "border-gold/20 bg-coal/60 text-ivory/75 hover:border-gold/50 hover:text-ivory"
                  }`}
                >
                  {cat.shortTabLabel}
                </button>
              );
            })}
          </div>

          <p className="mt-5 text-center font-display italic text-lg sm:text-xl text-gold-light">
            «{activeCategory.officialEpicTitle}»
          </p>

          {/* 2-Column Editorial Menu List */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-6">
            {activeCategory.items.map((item) => (
              <div
                key={item.id}
                className="border-b border-gold/15 pb-4 flex flex-col justify-between"
              >
                <div className="flex items-baseline justify-between">
                  <div className="flex flex-wrap items-baseline gap-2">
                    <h4 className="font-display text-xl font-bold text-ivory">
                      {item.name}
                    </h4>
                    {item.badge && (
                      <span className="border border-gold/30 bg-blood/60 px-2 py-0.5 font-eyebrow text-[8px] tracking-[0.22em] text-gold-light">
                        {item.badge}
                      </span>
                    )}
                  </div>
                  <span className="menu-leader-dots" aria-hidden="true" />
                  <span className="tabular-price text-lg font-semibold text-gold-light shrink-0">
                    {item.priceFormatted}
                  </span>
                </div>
                <p className="mt-1 font-body text-xs sm:text-sm text-ivory/75 leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>

          {/* Compact Seasonal Banner inside the menu box */}
          {SEASONAL_SPECIAL.enabled && activeTab === "burgers" && (
            <div className="mt-8 border border-ember/50 bg-blood/50 p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-start sm:items-center gap-3">
                <Fire size={20} weight="light" className="text-ember shrink-0 mt-0.5 sm:mt-0" />
                <div>
                  <div className="flex flex-wrap items-baseline gap-2">
                    <span className="font-eyebrow text-[10px] tracking-[0.26em] text-ember">
                      ESPECIAL DE TEMPORADA:
                    </span>
                    <strong className="font-display text-lg text-ivory">
                      {SEASONAL_SPECIAL.name}
                    </strong>
                    <span className="tabular-price text-base text-gold-light font-semibold">
                      {SEASONAL_SPECIAL.priceFormatted}
                    </span>
                  </div>
                  <p className="text-xs text-ivory/85 mt-0.5">
                    {SEASONAL_SPECIAL.description}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Direct Links to Qamarero Menu + Order */}
          <div className="mt-8 pt-6 border-t border-gold/20 flex flex-col sm:flex-row items-center justify-between gap-4">
            <span className="text-xs text-ash text-center sm:text-left">
              ¿Listo para pedir o consultar alérgenos? Abre la carta online de tu local:
            </span>
            <div className="flex flex-wrap justify-center gap-2.5">
              {LOCATIONS.map((loc) => (
                <a
                  key={loc.id}
                  href={loc.ordering.qamareroUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() =>
                    trackLocationIntent("pedir", loc.id, {
                      source: "menu_footer",
                    })
                  }
                  className="btn-outline-gold !py-2 !px-4 !text-[10px]"
                >
                  <span>Pedir en {loc.name}</span>
                  <ArrowUpRight size={13} weight="light" className="text-gold" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

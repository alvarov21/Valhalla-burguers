"use client";

import React, { useEffect, useMemo, useState } from "react";
import {
  BRAND_DATA,
  LOCATIONS,
  FAQ_ITEMS,
} from "@/data/locations";
import {
  getLocationLiveStatus,
  type LiveLocationStatus,
  type MadridTimeParts,
} from "@/lib/schedule";
import { trackLocationIntent } from "@/lib/analytics";
import Preloader from "./Preloader";
import SmoothScrollAndCursor from "./SmoothScrollAndCursor";
import Header from "./Header";
import EmberCanvas from "./EmberCanvas";
import LocationChapter from "./LocationChapter";
import MenuSection from "./MenuSection";
import MobileStickyBar from "./MobileStickyBar";
import LegalAndQADrawer from "./LegalAndQADrawer";
import {
  DiamondRule,
  HallIcon,
  LiveStatusPill,
  Fire,
  ShieldChevron,
  Wine,
} from "./Ornaments";
import {
  ArrowDown,
  CaretDown,
  InstagramLogo,
  TiktokLogo,
} from "@phosphor-icons/react";

export default function ValhallaLandingClient() {
  const [simulatedTime] = useState<MadridTimeParts | null>(null);
  const [tick, setTick] = useState(0);
  const [activeSection, setActiveSection] = useState<string>("inicio");
  const [selectedHallId, setSelectedHallId] = useState<
    "capuchinos" | "teatinos" | "santa-paula"
  >("capuchinos");
  const [openFaqId, setOpenFaqId] = useState<string>(FAQ_ITEMS[0].id);
  const [activeLegalTab, setActiveLegalTab] = useState<
    "aviso" | "privacidad" | "cookies" | "accesibilidad" | "entregables" | null
  >(null);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setTick((t) => t + 1);
    }, 30000);
    return () => window.clearInterval(interval);
  }, []);

  const selectHallAndScroll = (
    hallId: "capuchinos" | "teatinos" | "santa-paula"
  ) => {
    setSelectedHallId(hallId);
    setActiveSection(hallId);
    const target = document.getElementById("salones");
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.replace("#", "");
      if (
        hash === "capuchinos" ||
        hash === "teatinos" ||
        hash === "santa-paula"
      ) {
        setSelectedHallId(hash);
        setActiveSection(hash);
        const target = document.getElementById("salones");
        if (target) {
          window.setTimeout(() => {
            target.scrollIntoView({ behavior: "smooth", block: "start" });
          }, 40);
        }
      }
    };

    handleHash();
    window.addEventListener("hashchange", handleHash);
    return () => window.removeEventListener("hashchange", handleHash);
  }, []);

  useEffect(() => {
    const sectionIds = ["inicio", "salones", "carta", "faq"];
    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (entry.target.id === "salones") {
              setActiveSection(selectedHallId);
            } else {
              setActiveSection(entry.target.id);
            }
          }
        });
      },
      { rootMargin: "-32% 0px -52% 0px", threshold: 0 }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [selectedHallId]);

  const statusMap: Record<string, LiveLocationStatus> = useMemo(() => {
    void tick;
    const map: Record<string, LiveLocationStatus> = {};
    for (const loc of LOCATIONS) {
      map[loc.id] = getLocationLiveStatus(loc, simulatedTime ?? undefined);
    }
    return map;
  }, [simulatedTime, tick]);

  return (
    <div className="relative min-h-screen bg-wine text-ivory selection:bg-blood selection:text-gold-light">
      <div className="valhalla-grain" aria-hidden="true" />
      <Preloader />
      <SmoothScrollAndCursor />
      <Header
        statusMap={statusMap}
        activeSection={activeSection}
        onSelectHall={selectHallAndScroll}
      />

      <main>
        {/* 1. HERO DIRECTO Y CLARO */}
        <section
          id="inicio"
          aria-label="La entrada al Valhalla"
          className="relative min-h-screen flex flex-col justify-between pt-28 pb-8 sm:pt-32 sm:pb-10 overflow-hidden bg-coal"
        >
          <div className="pointer-events-none absolute inset-0 z-0">
            <img
              src="/images/hero-smash-macro.jpg"
              alt="Smash burger de vaca rubia gallega en Valhalla Grill Burger Málaga"
              fetchPriority="high"
              className="hero-bg-media h-full w-full object-cover object-center opacity-45 scale-105 will-change-transform"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-coal/90 via-wine/70 to-coal" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_38%,transparent_15%,#0E0B0A_92%)]" />
            <EmberCanvas maxParticles={36} />
          </div>

          <div className="relative z-10 mx-auto my-auto max-w-[1280px] w-full px-5 sm:px-8 lg:px-12 text-center pt-4 pb-8">
            <div className="hero-stagger inline-flex items-center gap-2.5 border border-gold/35 bg-coal/65 px-4 py-1.5 backdrop-blur-sm">
              <span className="text-gold text-[10px]">◆</span>
              <p className="font-eyebrow text-[10px] sm:text-xs tracking-[0.34em] text-gold-light">
                MÁLAGA · CAPUCHINOS · TEATINOS · SANTA PAULA
              </p>
              <span className="text-gold text-[10px]">◆</span>
            </div>

            <h1 className="hero-stagger mt-5 mx-auto max-w-4xl font-display font-black tracking-[-0.02em] leading-[1.02] text-[clamp(2.5rem,6vw,5.25rem)] text-ivory">
              Smash burgers{" "}
              <span className="italic font-bold text-gold-metallic">
                legendarias
              </span>{" "}
              en Málaga
            </h1>

            <p className="hero-stagger mt-4 mx-auto max-w-xl font-display text-lg sm:text-2xl text-ivory/90">
              {BRAND_DATA.heroSubtitle}
            </p>

            {/* Primary Actions: Ver Carta & Elegir Local */}
            <div className="hero-stagger mt-7 flex flex-col sm:flex-row items-center justify-center gap-3.5">
              <a
                href="#carta"
                className="btn-double-gold w-full sm:w-auto min-w-[220px]"
              >
                <span>Ver la Carta</span>
                <ArrowDown size={15} weight="light" className="text-gold" />
              </a>
              <a
                href="#salones"
                className="btn-outline-gold w-full sm:w-auto min-w-[220px]"
              >
                <span>Locales y Horarios</span>
              </a>
            </div>

            {/* 3 Quick Location Cards */}
            <div
              aria-label="Estado en directo de nuestros 3 locales"
              className="hero-stagger mt-10 grid grid-cols-1 md:grid-cols-3 gap-3.5 text-left max-w-4xl mx-auto"
            >
              {LOCATIONS.map((loc) => {
                const st = statusMap[loc.id];
                return (
                  <a
                    key={loc.id}
                    href={`#${loc.id}`}
                    onClick={(e) => {
                      e.preventDefault();
                      trackLocationIntent("ver_salon", loc.id, {
                        source: "hero_live_cards",
                      });
                      selectHallAndScroll(loc.id);
                    }}
                    className="group border border-gold/30 bg-coal/80 backdrop-blur-md p-4 transition-all hover:border-gold hover:bg-blood/45"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-display text-xl font-bold text-ivory group-hover:text-gold-light">
                        {loc.name}
                      </span>
                      <HallIcon type={loc.iconType} size={16} />
                    </div>
                    <p className="text-xs text-ash mt-0.5">
                      {loc.address.streetAddress}
                    </p>
                    <div className="mt-2.5">
                      {st && <LiveStatusPill status={st} compact />}
                    </div>
                  </a>
                );
              })}
            </div>
          </div>

          {/* Compact 3-Pillar Strip at the bottom of the Hero */}
          <div className="relative z-10 mx-auto max-w-[1280px] w-full px-5 border-t border-gold/20 pt-5">
            <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-2 text-xs text-ivory/85">
              <span className="inline-flex items-center gap-2">
                <ShieldChevron size={16} weight="light" className="text-gold" />
                <span>100% Vaca rubia gallega</span>
              </span>
              <span className="text-gold/40 hidden sm:inline">◆</span>
              <span className="inline-flex items-center gap-2">
                <Fire size={16} weight="light" className="text-gold" />
                <span>Smasheada al momento en plancha</span>
              </span>
              <span className="text-gold/40 hidden sm:inline">◆</span>
              <span className="inline-flex items-center gap-2">
                <Wine size={16} weight="light" className="text-gold" />
                <span>Sin reservas: mesa por orden de llegada</span>
              </span>
            </div>
          </div>
        </section>

        {/* 2. LA CARTA ("EL BANQUETE") — Directo al producto */}
        <MenuSection />

        {/* 3. LOS 3 LOCALES (HORARIOS, MAPA Y PEDIDO EN UN SOLO SITIO) */}
        <section
          id="salones"
          aria-labelledby="heading-indice-salones"
          className="relative border-t border-gold/30 bg-wine py-16 sm:py-24 px-5 sm:px-8 lg:px-12"
        >
          <div className="mx-auto max-w-[1280px]">
            <div className="gsap-reveal text-center max-w-2xl mx-auto">
              <span className="font-eyebrow text-[11px] tracking-[0.34em] text-gold">
                SALA · RECOGIDA · DOMICILIO
              </span>
              <h2
                id="heading-indice-salones"
                className="mt-2 font-display text-3xl sm:text-5xl font-bold text-ivory"
              >
                Nuestros 3 Locales en Málaga
              </h2>
              <p className="mt-2 text-sm text-ash">
                Elige tu salón para ver su horario hoy, cómo llegar o pedir online.
              </p>
            </div>

            {/* Clean 3-Tab Switcher */}
            <div
              role="tablist"
              aria-label="Seleccionar local de Valhalla Grill Burger"
              className="gsap-reveal mt-8 grid grid-cols-3 gap-2 sm:gap-4"
            >
              {LOCATIONS.map((loc) => {
                const isSelected = selectedHallId === loc.id;
                const st = statusMap[loc.id];
                return (
                  <button
                    key={loc.id}
                    type="button"
                    role="tab"
                    aria-selected={isSelected}
                    onClick={() => {
                      setSelectedHallId(loc.id);
                      setActiveSection(loc.id);
                    }}
                    className={`p-3.5 sm:p-5 border text-left transition-all ${
                      isSelected
                        ? "border-gold bg-blood shadow-[0_10px_30px_rgba(91,14,20,0.6)]"
                        : "border-gold/25 bg-coal/65 hover:border-gold/60"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-eyebrow text-[9px] sm:text-[10px] tracking-[0.24em] text-gold">
                        LOCAL {loc.chapter}
                      </span>
                      <span
                        className={`h-2 w-2 rounded-full ${
                          st?.isOpen ? "bg-ember" : "bg-gold/40"
                        }`}
                      />
                    </div>
                    <span className="mt-1 block font-display text-lg sm:text-2xl font-black text-ivory">
                      {loc.name}
                    </span>
                    <span className="hidden sm:block text-xs text-ash mt-0.5 truncate">
                      {loc.address.streetAddress}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Selected Location Card (All 3 remain in DOM for SEO) */}
            <div className="mt-5">
              {LOCATIONS.map((loc) => (
                <LocationChapter
                  key={loc.id}
                  location={loc}
                  status={statusMap[loc.id]}
                  isHiddenByTab={selectedHallId !== loc.id}
                />
              ))}
            </div>
          </div>
        </section>

        {/* 4. PREGUNTAS RÁPIDAS (#faq) */}
        <section
          id="faq"
          aria-labelledby="heading-faq"
          className="relative border-t border-gold/25 bg-coal py-16 sm:py-24 px-5 sm:px-8 lg:px-12"
        >
          <div className="mx-auto max-w-[820px]">
            <div className="gsap-reveal text-center">
              <span className="font-eyebrow text-[11px] tracking-[0.34em] text-gold">
                INFO RÁPIDA
              </span>
              <h2
                id="heading-faq"
                className="mt-2 font-display text-3xl sm:text-4xl font-bold text-ivory"
              >
                Preguntas Frecuentes
              </h2>
              <DiamondRule compact />
            </div>

            <div className="gsap-reveal mt-8 divide-y divide-gold/20 border-y border-gold/25">
              {FAQ_ITEMS.slice(0, 4).map((item) => {
                const isOpen = openFaqId === item.id;
                return (
                  <div key={item.id} className="py-4">
                    <button
                      type="button"
                      onClick={() => setOpenFaqId(isOpen ? "" : item.id)}
                      aria-expanded={isOpen}
                      className="flex w-full items-center justify-between gap-4 text-left py-1.5 group"
                    >
                      <span className="font-display text-lg sm:text-xl font-bold text-ivory group-hover:text-gold-light">
                        {item.question}
                      </span>
                      <CaretDown
                        size={16}
                        weight="light"
                        className={`text-gold shrink-0 transition-transform ${
                          isOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    {isOpen && (
                      <div className="mt-2 pr-6 font-body text-sm text-ivory/80 leading-relaxed">
                        <p>{item.answer}</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </main>

      {/* 5. FOOTER LIMPIO */}
      <footer className="relative border-t border-gold/30 bg-wine pt-14 pb-24 lg:pb-12 px-5 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-[1280px]">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 border-b border-gold/20 pb-10">
            <div className="flex items-center gap-4">
              <img
                src="/images/valhalla-logo.svg"
                alt="Logo oficial de Valhalla Grill Burger"
                width={56}
                height={56}
                className="h-14 w-14 object-contain"
              />
              <div>
                <p className="font-display text-2xl font-bold text-ivory">
                  {BRAND_DATA.name}
                </p>
                <p className="font-eyebrow text-[10px] tracking-[0.32em] text-gold">
                  {BRAND_DATA.claim}
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <a
                href={BRAND_DATA.social.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline-gold !py-2 !px-4 !text-[11px]"
              >
                <InstagramLogo size={16} weight="light" className="text-gold" />
                <span>{BRAND_DATA.social.instagramHandle}</span>
              </a>
              <a
                href={BRAND_DATA.social.tiktokUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline-gold !py-2 !px-4 !text-[11px]"
              >
                <TiktokLogo size={16} weight="light" className="text-gold" />
                <span>TikTok</span>
              </a>
            </div>
          </div>

          {/* 3 Compact NAP Columns */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 py-8 border-b border-gold/15 text-xs">
            {LOCATIONS.map((loc) => (
              <div key={loc.id} className="space-y-1">
                <p className="font-eyebrow text-[11px] tracking-[0.24em] text-gold-light font-semibold">
                  {loc.name}
                </p>
                <p className="text-ivory/90">{loc.address.streetAddress}, {loc.address.postalCode} Málaga</p>
                <p className="text-ash">{loc.shortScheduleSummary}</p>
              </div>
            ))}
          </div>

          <div className="my-8 text-center">
            <p className="font-eyebrow text-xs sm:text-sm tracking-[0.36em] text-gold-light">
              BURGERS <span className="text-gold/40 mx-2">————</span> BUEN ROLLO{" "}
              <span className="text-gold/40 mx-2">————</span> MÁLAGA
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-ash">
            <div className="flex flex-wrap items-center justify-center gap-4">
              <button
                type="button"
                onClick={() => setActiveLegalTab("aviso")}
                className="hover:text-gold-light"
              >
                Aviso Legal
              </button>
              <button
                type="button"
                onClick={() => setActiveLegalTab("privacidad")}
                className="hover:text-gold-light"
              >
                Privacidad
              </button>
              <button
                type="button"
                onClick={() => setActiveLegalTab("cookies")}
                className="hover:text-gold-light"
              >
                Cookies
              </button>
            </div>

            <p>
              Diseño y desarrollo:{" "}
              <a
                href={BRAND_DATA.credits.agencyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gold-light hover:underline"
              >
                {BRAND_DATA.credits.agencyName}
              </a>
            </p>
          </div>
        </div>
      </footer>

      <MobileStickyBar activeSection={activeSection} />
      <LegalAndQADrawer
        activeLegalTab={activeLegalTab}
        onCloseLegal={() => setActiveLegalTab(null)}
        simulatedTime={null}
        onSelectSimulatedTime={() => {}}
      />
    </div>
  );
}

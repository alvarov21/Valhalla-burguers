"use client";

import React from "react";
import { LOCATIONS } from "@/data/locations";
import { trackLocationIntent } from "@/lib/analytics";
import { ShoppingBagOpen, PhoneCall, Compass } from "./Ornaments";

interface MobileStickyBarProps {
  activeSection: string;
}

export default function MobileStickyBar({
  activeSection,
}: MobileStickyBarProps) {
  const activeLocation = LOCATIONS.find((l) => l.id === activeSection);

  if (!activeLocation) return null;

  return (
    <div
      role="region"
      aria-label={`Acciones rápidas para Valhalla ${activeLocation.name}`}
      className="fixed bottom-0 inset-x-0 z-40 lg:hidden border-t border-gold/45 bg-coal/95 backdrop-blur-xl px-3 py-2.5 shadow-[0_-12px_35px_rgba(0,0,0,0.85)]"
    >
      <div className="flex items-center justify-between mb-1.5 px-1">
        <span className="font-eyebrow text-[9px] tracking-[0.28em] text-gold-light">
          CAPÍTULO {activeLocation.chapter} · VALHALLA {activeLocation.name}
        </span>
        <span className="text-[10px] text-ash truncate max-w-[180px]">
          {activeLocation.address.streetAddress}
        </span>
      </div>

      <div className="grid grid-cols-12 gap-2">
        <a
          href={activeLocation.ordering.qamareroUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() =>
            trackLocationIntent("pedir", activeLocation.id, {
              source: "mobile_sticky_bar",
            })
          }
          className="col-span-6 btn-double-gold !py-2.5 !px-2 !text-[10px] justify-center"
        >
          <ShoppingBagOpen size={14} weight="light" className="text-gold" />
          <span>Pedir aquí</span>
        </a>

        <a
          href={activeLocation.contact.phoneHref}
          onClick={() =>
            trackLocationIntent("llamar", activeLocation.id, {
              source: "mobile_sticky_bar",
            })
          }
          className="col-span-3 btn-outline-gold !py-2.5 !px-2 !text-[10px] justify-center"
        >
          <PhoneCall size={14} weight="light" className="text-gold" />
          <span>Llamar</span>
        </a>

        <a
          href={activeLocation.geo.googleMapsDirectionsUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() =>
            trackLocationIntent("como_llegar", activeLocation.id, {
              source: "mobile_sticky_bar",
            })
          }
          className="col-span-3 btn-outline-gold !py-2.5 !px-2 !text-[10px] justify-center"
        >
          <Compass size={14} weight="light" className="text-gold" />
          <span>Ruta</span>
        </a>
      </div>
    </div>
  );
}

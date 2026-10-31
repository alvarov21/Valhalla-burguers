"use client";

import React from "react";
import {
  MoonStars,
  SunDim,
  Boat,
  Fire,
  ShieldChevron,
  Wine,
  MapPin,
  Clock,
  PhoneCall,
  Moped,
  ShoppingBagOpen,
  Compass,
  Sparkle,
  WarningCircle,
} from "@phosphor-icons/react";
import type { LiveLocationStatus } from "@/lib/schedule";

export function DiamondRule({
  className = "",
  label,
  compact = false,
}: {
  className?: string;
  label?: string;
  compact?: boolean;
}) {
  return (
    <div
      className={`flex items-center justify-center gap-3 select-none ${
        compact ? "my-3" : "my-6"
      } ${className}`}
      aria-hidden="true"
    >
      <span className="h-[1px] flex-1 max-w-[160px] bg-gradient-to-r from-transparent via-gold/55 to-gold" />
      <span className="text-gold text-[10px] leading-none">◆</span>
      {label && (
        <>
          <span className="font-eyebrow text-[11px] text-gold tracking-[0.32em] px-1">
            {label}
          </span>
          <span className="text-gold text-[10px] leading-none">◆</span>
        </>
      )}
      <span className="h-[1px] flex-1 max-w-[160px] bg-gradient-to-l from-transparent via-gold/55 to-gold" />
    </div>
  );
}

export function HallIcon({
  type,
  size = 22,
  className = "text-gold",
}: {
  type: "moon" | "sun-moon" | "drakkar";
  size?: number;
  className?: string;
}) {
  if (type === "moon") {
    return <MoonStars size={size} weight="light" className={className} aria-hidden="true" />;
  }
  if (type === "sun-moon") {
    return (
      <span className={`inline-flex items-center gap-1 ${className}`} aria-hidden="true">
        <SunDim size={size} weight="light" />
        <MoonStars size={size - 2} weight="light" />
      </span>
    );
  }
  return <Boat size={size} weight="light" className={className} aria-hidden="true" />;
}

export function ShiftIcon({
  shift,
  size = 15,
}: {
  shift: "day" | "night";
  size?: number;
}) {
  if (shift === "day") {
    return (
      <SunDim
        size={size}
        weight="light"
        className="text-gold-light inline-block shrink-0"
        aria-label="Turno de mediodía"
      />
    );
  }
  return (
    <MoonStars
      size={size}
      weight="light"
      className="text-gold inline-block shrink-0"
      aria-label="Turno de noche"
    />
  );
}

export function LiveStatusPill({
  status,
  compact = false,
}: {
  status: LiveLocationStatus;
  compact?: boolean;
}) {
  return (
    <div
      className={`inline-flex items-center gap-2 border px-3 py-1 text-xs transition-colors ${
        status.isOpen
          ? "border-ember/55 bg-blood/60 text-ivory"
          : "border-gold/30 bg-coal/75 text-ash"
      }`}
    >
      <span
        className={`h-2 w-2 rounded-full shrink-0 ${
          status.isOpen
            ? "bg-ember shadow-[0_0_10px_#D9582B] animate-pulse"
            : "bg-gold/45"
        }`}
        aria-hidden="true"
      />
      <span className="font-body font-medium tracking-wide">
        {compact ? status.shortBadge : status.statusLabel}
      </span>
    </div>
  );
}

export {
  MoonStars,
  SunDim,
  Boat,
  Fire,
  ShieldChevron,
  Wine,
  MapPin,
  Clock,
  PhoneCall,
  Moped,
  ShoppingBagOpen,
  Compass,
  Sparkle,
  WarningCircle,
};

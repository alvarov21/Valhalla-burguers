"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function Preloader() {
  const [done, setDone] = useState(false);
  const rootRef = useRef<HTMLDivElement | null>(null);
  const leftDoorRef = useRef<HTMLDivElement | null>(null);
  const rightDoorRef = useRef<HTMLDivElement | null>(null);
  const seamRef = useRef<HTMLDivElement | null>(null);
  const emblemRef = useRef<HTMLDivElement | null>(null);
  const backdropGlowRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReduced) {
      setDone(true);
      return;
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { force3D: true },
        onComplete: () => setDone(true),
      });

      // Initial state
      gsap.set([leftDoorRef.current, rightDoorRef.current], {
        xPercent: 0,
        willChange: "transform",
      });
      gsap.set(seamRef.current, {
        scaleY: 0.25,
        opacity: 0,
        willChange: "transform, opacity",
      });
      gsap.set(emblemRef.current, {
        scale: 0.92,
        opacity: 0,
        y: 8,
        filter: "blur(6px)",
        willChange: "transform, opacity, filter",
      });

      // 1. Emblem & central golden seam emerge softly
      tl.to(
        seamRef.current,
        {
          scaleY: 1,
          opacity: 1,
          duration: 0.55,
          ease: "power3.out",
        },
        0
      ).to(
        emblemRef.current,
        {
          scale: 1,
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 0.65,
          ease: "expo.out",
        },
        0.05
      );

      // 2. Emblem dissolves with warm halo while the central seam parts
      tl.to(
        emblemRef.current,
        {
          scale: 1.06,
          opacity: 0,
          filter: "blur(8px)",
          duration: 0.55,
          ease: "power2.inOut",
        },
        0.62
      ).to(
        seamRef.current,
        {
          opacity: 0,
          duration: 0.35,
          ease: "power2.out",
        },
        0.68
      );

      // 3. Silky heavy hall doors glide open with expo.inOut + soft shadow fade
      tl.to(
        leftDoorRef.current,
        {
          xPercent: -102,
          duration: 1.25,
          ease: "expo.inOut",
        },
        0.58
      )
        .to(
          rightDoorRef.current,
          {
            xPercent: 102,
            duration: 1.25,
            ease: "expo.inOut",
          },
          0.58
        )
        .to(
          backdropGlowRef.current,
          {
            opacity: 0,
            duration: 0.95,
            ease: "power2.inOut",
          },
          0.75
        );
    }, rootRef);

    return () => ctx.revert();
  }, []);

  if (done) return null;

  return (
    <div
      ref={rootRef}
      aria-hidden="true"
      className="fixed inset-0 z-[100] pointer-events-none flex items-center justify-center overflow-hidden"
    >
      {/* Subtle dark veil that cross-fades as the doors open */}
      <div
        ref={backdropGlowRef}
        className="absolute inset-0 bg-coal/55 transition-none"
      />

      {/* Left Grand Hall Door */}
      <div
        ref={leftDoorRef}
        className="absolute inset-y-0 left-0 w-1/2 bg-[radial-gradient(circle_at_100%_50%,#3A090D_0%,#2B0709_55%,#0E0B0A_100%)] border-r border-gold/30 shadow-[25px_0_60px_rgba(0,0,0,0.85)]"
      />

      {/* Right Grand Hall Door */}
      <div
        ref={rightDoorRef}
        className="absolute inset-y-0 right-0 w-1/2 bg-[radial-gradient(circle_at_0%_50%,#3A090D_0%,#2B0709_55%,#0E0B0A_100%)] border-l border-gold/30 shadow-[-25px_0_60px_rgba(0,0,0,0.85)]"
      />

      {/* Illuminated Golden Center Seam */}
      <div
        ref={seamRef}
        className="relative z-10 h-full w-[1px] bg-gradient-to-b from-transparent via-gold-light/80 to-transparent shadow-[0_0_20px_rgba(232,207,160,0.65)]"
      />

      {/* Central Helmet Crest & Ember Halo */}
      <div
        ref={emblemRef}
        className="absolute z-20 flex flex-col items-center"
      >
        <div className="relative h-24 w-24 sm:h-28 sm:w-28 rounded-full p-1.5 bg-wine/90 border border-gold/50 shadow-[0_0_55px_rgba(217,88,43,0.45)]">
          <img
            src="/images/valhalla-logo.svg"
            alt=""
            className="h-full w-full object-contain"
          />
        </div>
        <p className="mt-4 font-eyebrow text-[11px] tracking-[0.36em] text-gold-light drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)]">
          MÁS QUE HAMBURGUESAS
        </p>
      </div>
    </div>
  );
}

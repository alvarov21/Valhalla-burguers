"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "@studio-freight/lenis";

export default function SmoothScrollAndCursor() {
  const cursorRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    gsap.registerPlugin(ScrollTrigger);

    let lenis: Lenis | null = null;

    if (!prefersReduced) {
      lenis = new Lenis({
        duration: 1.15,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
      });

      lenis.on("scroll", ScrollTrigger.update);

      gsap.ticker.add((time) => {
        lenis?.raf(time * 1000);
      });
      gsap.ticker.lagSmoothing(0);
    }

    // GSAP Reveal, Hero handoff & Sheen animations
    const ctx = gsap.context(() => {
      if (prefersReduced) {
        gsap.set(".gsap-reveal, .hero-stagger", { opacity: 1, y: 0 });
        document
          .querySelectorAll(".text-gold-metallic-sheen")
          .forEach((el) => el.classList.add("is-sheened"));
        return;
      }

      // Synchronized Hero entrance as the Preloader doors part
      const heroBg = document.querySelector(".hero-bg-media");
      const heroItems = gsap.utils.toArray<HTMLElement>(".hero-stagger");

      if (heroBg) {
        gsap.fromTo(
          heroBg,
          { scale: 1.12, opacity: 0.2 },
          {
            scale: 1.03,
            opacity: 0.48,
            duration: 1.85,
            delay: 0.55,
            ease: "expo.out",
            force3D: true,
          }
        );
      }

      if (heroItems.length > 0) {
        gsap.fromTo(
          heroItems,
          { opacity: 0, y: 24 },
          {
            opacity: 1,
            y: 0,
            duration: 1.15,
            stagger: 0.085,
            delay: 0.72,
            ease: "power3.out",
            force3D: true,
          }
        );
      }

      // Section & Editorial block reveals
      gsap.utils.toArray<HTMLElement>(".gsap-reveal").forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 1.05,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 88%",
              once: true,
            },
          }
        );
      });

      // Single metallic sheen pass on location display titles
      gsap.utils
        .toArray<HTMLElement>(".text-gold-metallic-sheen")
        .forEach((el) => {
          ScrollTrigger.create({
            trigger: el,
            start: "top 82%",
            once: true,
            onEnter: () => {
              el.classList.add("is-sheened");
            },
          });
        });
    });

    // Optional fine-pointer desktop diamond cursor
    const isFinePointer = window.matchMedia("(pointer: fine)").matches;
    const cursorEl = cursorRef.current;

    const onMouseMove = (e: MouseEvent) => {
      if (!cursorEl) return;
      cursorEl.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
    };

    if (isFinePointer && !prefersReduced && cursorEl) {
      window.addEventListener("mousemove", onMouseMove, { passive: true });
    }

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      ctx.revert();
      if (lenis) {
        lenis.destroy();
      }
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      aria-hidden="true"
      className="pointer-events-none fixed top-0 left-0 z-[90] hidden lg:block -ml-2 -mt-2 transition-opacity duration-300"
    >
      <div className="h-3.5 w-3.5 rotate-45 border border-gold/75 bg-blood/35 shadow-[0_0_12px_rgba(200,164,110,0.45)]" />
    </div>
  );
}

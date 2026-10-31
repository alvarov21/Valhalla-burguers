"use client";

import React from "react";
import type { MadridTimeParts } from "@/lib/schedule";
import { X } from "@phosphor-icons/react";

interface LegalAndQADrawerProps {
  activeLegalTab: "aviso" | "privacidad" | "cookies" | "accesibilidad" | "entregables" | null;
  onCloseLegal: () => void;
  simulatedTime: MadridTimeParts | null;
  onSelectSimulatedTime: (parts: MadridTimeParts | null) => void;
}

export default function LegalAndQADrawer({
  activeLegalTab,
  onCloseLegal,
}: LegalAndQADrawerProps) {
  if (!activeLegalTab) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Información legal"
      className="fixed inset-0 z-[95] flex items-center justify-center bg-coal/85 backdrop-blur-md p-4"
    >
      <div className="relative max-h-[85vh] w-full max-w-2xl overflow-y-auto border border-gold/45 bg-wine p-6 sm:p-10 shadow-2xl">
        <div className="flex items-center justify-between border-b border-gold/25 pb-4">
          <span className="font-eyebrow text-xs tracking-[0.3em] text-gold">
            VALHALLA GRILL BURGER · INFORMACIÓN LEGAL
          </span>
          <button
            type="button"
            onClick={onCloseLegal}
            aria-label="Cerrar ventana"
            className="border border-gold/35 p-1.5 text-ivory hover:border-gold"
          >
            <X size={18} weight="light" />
          </button>
        </div>

        {activeLegalTab === "aviso" && (
          <div className="mt-6 space-y-4 text-sm text-ivory/90">
            <h3 className="font-display text-2xl font-bold text-gold-light">
              Aviso Legal (LSSI-CE)
            </h3>
            <p>
              Titular comercial: <strong>Valhalla Grill Burger</strong>. Establecimientos en Málaga: Alameda de Capuchinos, 61 (29014) · Calle Jano, 9 (29010) · Avenida de los Guindos, 29 (29004).
            </p>
          </div>
        )}

        {activeLegalTab === "privacidad" && (
          <div className="mt-6 space-y-4 text-sm text-ivory/90">
            <h3 className="font-display text-2xl font-bold text-gold-light">
              Política de Privacidad
            </h3>
            <p>
              Esta web informativa no recopila datos personales mediante formularios propios. Los pedidos online se tramitan directamente en el canal oficial de cada local en Qamarero.
            </p>
          </div>
        )}

        {activeLegalTab === "cookies" && (
          <div className="mt-6 space-y-4 text-sm text-ivory/90">
            <h3 className="font-display text-2xl font-bold text-gold-light">
              Política de Cookies
            </h3>
            <p>
              No instalamos cookies publicitarias ni cargamos mapas de terceros hasta que el usuario pulsa expresamente en la vista de Mapa de un local.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

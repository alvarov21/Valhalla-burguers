export type ValhallaIntentAction = "pedir" | "llamar" | "como_llegar" | "ver_salon" | "carta_qamarero";

export function trackLocationIntent(
  action: ValhallaIntentAction,
  locationId: string,
  extra?: Record<string, string>
) {
  if (typeof window === "undefined") return;

  const payload = {
    event: "valhalla_intent",
    action,
    location: locationId,
    timestamp: new Date().toISOString(),
    ...extra,
  };

  // Push to dataLayer if GTM/GA4 is active after consent
  const win = window as unknown as {
    dataLayer?: Record<string, unknown>[];
    gtag?: (...args: unknown[]) => void;
  };

  if (Array.isArray(win.dataLayer)) {
    win.dataLayer.push(payload);
  }

  if (typeof win.gtag === "function") {
    win.gtag("event", `valhalla_${action}`, {
      location_id: locationId,
      ...extra,
    });
  }

  // Dispatch custom DOM event for internal inspection / debugging
  window.dispatchEvent(new CustomEvent("valhalla:analytics", { detail: payload }));
}

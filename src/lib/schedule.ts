import type { LocationData, TimeSlot } from "@/data/locations";

export interface MadridTimeParts {
  isoWeekday: number; // 1 = Monday ... 7 = Sunday
  hours: number; // 0..23
  minutes: number; // 0..59
  totalMinutes: number; // 0..1439
  formattedTime: string; // "HH:MM"
}

export interface LiveLocationStatus {
  isOpen: boolean;
  statusLabel: string; // e.g., "Abierto ahora · cierra a las 00:00"
  shortBadge: string; // e.g., "Abierto · hasta 00:00" or "Abre hoy 20:00"
  currentShift: "day" | "night" | null;
  todayDayIndex: number;
  madridTimeFormatted: string;
}

const WEEKDAY_MAP: Record<string, number> = {
  Mon: 1,
  Tue: 2,
  Wed: 3,
  Thu: 4,
  Fri: 5,
  Sat: 6,
  Sun: 7,
};

/**
 * Extracts the current wall-clock time in Europe/Madrid timezone.
 */
export function getMadridTimeParts(date: Date = new Date()): MadridTimeParts {
  const formatter = new Intl.DateTimeFormat("en-US", {
    timeZone: "Europe/Madrid",
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });

  const parts = formatter.formatToParts(date);
  let weekdayStr = "Mon";
  let hourStr = "00";
  let minuteStr = "00";

  for (const part of parts) {
    if (part.type === "weekday") weekdayStr = part.value;
    if (part.type === "hour") hourStr = part.value;
    if (part.type === "minute") minuteStr = part.value;
  }

  // Handle "24" edge case in some engines for midnight
  let hours = parseInt(hourStr, 10);
  if (hours === 24) hours = 0;
  const minutes = parseInt(minuteStr, 10);
  const isoWeekday = WEEKDAY_MAP[weekdayStr] ?? 1;

  return {
    isoWeekday,
    hours,
    minutes,
    totalMinutes: hours * 60 + minutes,
    formattedTime: `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`,
  };
}

function parseTimeToMinutes(hhmm: string, isClose: boolean): number {
  const [h, m] = hhmm.split(":").map(Number);
  if (isClose && h === 0 && m === 0) {
    return 24 * 60; // 1440 (midnight end of service)
  }
  return h * 60 + m;
}

/**
 * Evaluates whether a Valhalla location is open right now in Europe/Madrid,
 * or accepts explicit Madrid time parts for deterministic testing (15:59, 16:01, 23:59, 00:01).
 */
export function getLocationLiveStatus(
  location: LocationData,
  overrideParts?: MadridTimeParts
): LiveLocationStatus {
  const madrid = overrideParts ?? getMadridTimeParts();
  const todaySchedule =
    location.schedule.find((d) => d.dayIndex === madrid.isoWeekday) ??
    location.schedule[0];

  const nowMins = madrid.totalMinutes;

  // Check if currently inside any of today's slots
  for (const slot of todaySchedule.slots) {
    const openMins = parseTimeToMinutes(slot.open, false);
    const closeMins = parseTimeToMinutes(slot.close, true);

    if (nowMins >= openMins && nowMins < closeMins) {
      return {
        isOpen: true,
        statusLabel: `Abierto ahora · cierra a las ${slot.close}`,
        shortBadge: `Abierto · cierra ${slot.close}`,
        currentShift: slot.shift,
        todayDayIndex: madrid.isoWeekday,
        madridTimeFormatted: madrid.formattedTime,
      };
    }
  }

  // Otherwise closed: find next opening slot today or tomorrow
  const upcomingToday: TimeSlot | undefined = todaySchedule.slots.find(
    (slot) => parseTimeToMinutes(slot.open, false) > nowMins
  );

  if (upcomingToday) {
    return {
      isOpen: false,
      statusLabel: `Cerrado ahora · abre hoy a las ${upcomingToday.open}`,
      shortBadge: `Abre hoy · ${upcomingToday.open}`,
      currentShift: null,
      todayDayIndex: madrid.isoWeekday,
      madridTimeFormatted: madrid.formattedTime,
    };
  }

  const tomorrowIndex = madrid.isoWeekday === 7 ? 1 : madrid.isoWeekday + 1;
  const tomorrowSchedule =
    location.schedule.find((d) => d.dayIndex === tomorrowIndex) ??
    location.schedule[0];
  const firstTomorrowSlot = tomorrowSchedule.slots[0];

  return {
    isOpen: false,
    statusLabel: `Cerrado ahora · abre mañana a las ${firstTomorrowSlot.open}`,
    shortBadge: `Abre mañana · ${firstTomorrowSlot.open}`,
    currentShift: null,
    todayDayIndex: madrid.isoWeekday,
    madridTimeFormatted: madrid.formattedTime,
  };
}

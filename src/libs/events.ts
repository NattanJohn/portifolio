// src/lib/events.ts

export const SYSTEM_EVENTS = {
  CHANGE_THEME: "system:change_theme",
  NOTIFY: "system:notify",
} as const;

// Tipagem para os detalhes do evento
export interface ThemeEventDetail {
  color: string;
}

export interface NotifyEventDetail {
  message: string;
}

export const emitSystemEvent = <T,>(eventName: string, detail: T) => {
  if (typeof window !== "undefined") {
    const event = new CustomEvent(eventName, { detail });
    window.dispatchEvent(event);
  }
};
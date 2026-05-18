"use client";

import { useEffect, useState } from "react";

const STORAGE_KEY = "valor.session";

export type Session = {
  userId: string;
  name: string;
  role: "client" | "freelancer";
} | null;

function read(): Session {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Session) : null;
  } catch {
    return null;
  }
}

export function signIn(session: NonNullable<Session>) {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
  window.dispatchEvent(new Event("valor:auth"));
}

export function signOut() {
  if (typeof window === "undefined") return;
  localStorage.removeItem(STORAGE_KEY);
  window.dispatchEvent(new Event("valor:auth"));
}

export function useSession() {
  const [session, setSession] = useState<Session>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const sync = () => setSession(read());
    sync();
    setReady(true);
    window.addEventListener("valor:auth", sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener("valor:auth", sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  return { session, ready, isAuthed: !!session };
}

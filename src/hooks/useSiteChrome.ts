import { useEffect, useState } from "react";

/**
 * LUXURELAX – načítanie hlavičky a päty z WordPressu
 *
 * Menu, odkazy v päte a kontakt sa spravujú vo WordPresse.
 * Konfigurátor si ich len prevezme – nič sa neduplikuje.
 *
 * Použitie:
 *   const { chrome, loading } = useSiteChrome(lang);
 */

const API = "https://www.luxurelax.sk/wp-json/lux/v1/chrome";

export type Lang = "sk" | "en" | "hu";

export interface ChromeLink {
  label: string;
  url: string;
}

export interface SiteChrome {
  lang: Lang;
  logo: string;
  home: string;
  mainMenu: ChromeLink[];
  footer: {
    about: string;
    columns: { title: string; items: ChromeLink[] }[];
    contactTitle: string;
    contact: {
      company: string;
      street: string;
      city: string;
      ico: string;
      dic: string;
      icDph: string;
      phone: string;
      email: string;
    };
    socials: { type: string; url: string }[];
    copyright: string;
  };
  languages: { code: Lang; label: string; url: string }[];
}

/** Záloha pre prípad, že by WordPress nebol dostupný (údržba a pod.) */
const FALLBACK: Record<Lang, SiteChrome> = {
  sk: {
    lang: "sk",
    logo: "https://www.luxurelax.sk/wp-content/uploads/LUXURELAX-LOGO-text-gradientt.svg",
    home: "https://www.luxurelax.sk/",
    mainMenu: [
      { label: "Sauny", url: "https://www.luxurelax.sk/k/sauny/" },
      { label: "Kade", url: "https://www.luxurelax.sk/k/kade/" },
      { label: "Pergoly", url: "https://www.luxurelax.sk/k/pergoly/" },
      { label: "Konfigurátor", url: "https://www.luxurelax.sk/konfigurator/" },
      { label: "Blog", url: "https://www.luxurelax.sk/blog/" },
      { label: "O nás", url: "https://www.luxurelax.sk/o-nas/" },
      { label: "Kontakt", url: "https://www.luxurelax.sk/kontakt/" },
    ],
    footer: {
      about:
        "Prémiové sauny a wellness riešenia vytvorené s vášňou a dodané s dôrazom na dokonalosť.",
      columns: [],
      contactTitle: "Kontakt",
      contact: {
        company: "LUXURELAX s.r.o.",
        street: "Karpatské námestie 7770/10A",
        city: "831 06 Bratislava - Rača",
        ico: "57 556 245",
        dic: "2122824484",
        icDph: "SK2122824484",
        phone: "+421 940 916 815",
        email: "info@luxurelax.sk",
      },
      socials: [
        { type: "facebook", url: "https://www.facebook.com/luxurelax/" },
        { type: "instagram", url: "https://www.instagram.com/luxurelax.sk/" },
      ],
      copyright: "© 2026 LUXURELAX. Všetky práva vyhradené.",
    },
    languages: [
      { code: "sk", label: "SK", url: "https://www.luxurelax.sk/" },
      { code: "en", label: "EN", url: "https://www.luxurelax.com/" },
      { code: "hu", label: "HU", url: "https://www.luxurelax.hu/" },
    ],
  },
  en: null as unknown as SiteChrome,
  hu: null as unknown as SiteChrome,
};

const cache = new Map<string, SiteChrome>();

export function useSiteChrome(lang: Lang = "sk") {
  const [chrome, setChrome] = useState<SiteChrome | null>(cache.get(lang) ?? null);
  const [loading, setLoading] = useState(!cache.has(lang));

  useEffect(() => {
    let alive = true;

    if (cache.has(lang)) {
      setChrome(cache.get(lang)!);
      setLoading(false);
      return;
    }

    setLoading(true);
    fetch(`${API}?lang=${lang}`)
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error("chrome fetch failed"))))
      .then((data: SiteChrome) => {
        if (!alive) return;
        cache.set(lang, data);
        setChrome(data);
      })
      .catch(() => {
        if (!alive) return;
        setChrome(FALLBACK[lang] ?? FALLBACK.sk);
      })
      .finally(() => {
        if (alive) setLoading(false);
      });

    return () => {
      alive = false;
    };
  }, [lang]);

  return { chrome, loading };
}

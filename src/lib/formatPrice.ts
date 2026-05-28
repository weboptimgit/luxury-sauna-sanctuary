import { useLanguage } from "@/contexts/LanguageContext";

// Conversion rates from EUR (source of truth for all prices in the codebase)
export const CURRENCY_RATES = {
  EUR: 1,
  CZK: 24.233699798584,
  HUF: 375.58099365234,
} as const;

export type CurrencyCode = keyof typeof CURRENCY_RATES;

const SYMBOLS: Record<CurrencyCode, string> = {
  EUR: "€",
  CZK: "Kč",
  HUF: "Ft",
};

// Round HUF to nearest 100, CZK to nearest whole, EUR keep as-is (no decimals to match prior UI)
function roundForCurrency(value: number, currency: CurrencyCode): number {
  if (currency === "HUF") return Math.round(value / 100) * 100;
  if (currency === "CZK") return Math.round(value);
  return Math.round(value);
}

// Locale-aware grouping (space for SK/CZ/HU, matches existing look)
function groupNumber(value: number, currency: CurrencyCode): string {
  const locale =
    currency === "HUF" ? "hu-HU" : currency === "CZK" ? "cs-CZ" : "sk-SK";
  return new Intl.NumberFormat(locale, { maximumFractionDigits: 0 }).format(value);
}

export function formatPriceWith(eurPrice: number, currency: CurrencyCode): string {
  const converted = roundForCurrency(eurPrice * CURRENCY_RATES[currency], currency);
  const symbol = SYMBOLS[currency];
  // Symbol position: € and Kč suffix with space, Ft suffix with space
  return `${groupNumber(converted, currency)} ${symbol}`;
}

export function useFormatPrice() {
  const { currency } = useLanguage();
  return (eurPrice: number) => formatPriceWith(eurPrice, currency as CurrencyCode);
}

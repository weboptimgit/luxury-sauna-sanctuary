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

function formatOptions(currency: CurrencyCode): Intl.NumberFormatOptions {
  if (currency === "EUR") return { minimumFractionDigits: 2, maximumFractionDigits: 2 };
  if (currency === "CZK") return { minimumFractionDigits: 2, maximumFractionDigits: 2 };
  return { maximumFractionDigits: 0 };
}

// Locale-aware grouping (space for SK/CZ/HU, matches existing look)
function groupNumber(value: number, currency: CurrencyCode): string {
  const locale =
    currency === "HUF" ? "hu-HU" : currency === "CZK" ? "cs-CZ" : "sk-SK";
  return new Intl.NumberFormat(locale, formatOptions(currency)).format(value);
}

export function formatPriceWith(eurPrice: number, currency: CurrencyCode): string {
  const converted = eurPrice * CURRENCY_RATES[currency];
  const symbol = SYMBOLS[currency];
  return `${groupNumber(converted, currency)} ${symbol}`;
}

export function useFormatPrice() {
  const { currency } = useLanguage();
  return (eurPrice: number) => formatPriceWith(eurPrice, currency as CurrencyCode);
}

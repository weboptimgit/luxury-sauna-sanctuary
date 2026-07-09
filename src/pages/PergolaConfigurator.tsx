import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Check,
  ChevronLeft,
  ChevronRight,
  Ruler,
  Palette,
  Square,
  Wrench,
  Send,
  Sparkles,
  Loader2,
  
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { toast } from "@/hooks/use-toast";
import ConfiguratorHeader from "@/components/ConfiguratorHeader";
import ConfiguratorFooter from "@/components/ConfiguratorFooter";
import RalPickerDialog from "@/components/RalPickerDialog";
import { findRal, type RalColor } from "@/data/ralClassic";
import { useLanguage } from "@/contexts/LanguageContext";

/**
 * PERGOLA CONFIGURATOR – Luxurelax
 * Standalone configurator. Submits to a separate PHP endpoint:
 *   POST /wp-json/luxurelax-pergola/v1/inquiry
 * (See pergola-configurator.php for backend.)
 *
 * Pricing here is ILUSTRATIVE – nahraď podľa reálneho cenníka.
 */

// ---------- Pricing ----------
// Cenník hliníkových prístreškov, krytina komôrkový polykarbonát (bez DPH)
// Riadky = hĺbka (cm), Stĺpce = šírka (cm)
const PRICE_TABLE_WIDTHS = [300, 400, 500, 600, 700, 800, 900, 1000, 1100] as const;
const PRICE_TABLE_DEPTHS = [200, 250, 300, 350, 400, 450, 500] as const;
const PRICE_TABLE: number[][] = [
  // 300   400   500   600   700   800   900   1000  1100
  [ 1350, 1481, 1593, 1836, 1971, 2164, 2461, 2600, 2830 ], // 200
  [ 1518, 1630, 1823, 2100, 2241, 2363, 2793, 2962, 3203 ], // 250
  [ 1622, 1796, 2020, 2262, 2410, 2535, 3041, 3308, 3459 ], // 300
  [ 1797, 1922, 2114, 2498, 2612, 2717, 3166, 3541, 3736 ], // 350
  [ 1933, 2090, 2325, 2594, 2717, 2834, 3302, 3833, 4150 ], // 400
  [ 2184, 2332, 2560, 2936, 3224, 3459, 3663, 4222, 4667 ], // 450
  [ 2351, 2456, 2691, 3226, 3450, 3720, 4215, 4750, 5250 ], // 500
];

function lookupBasePrice(widthCm: number, depthCm: number): number {
  const ws = PRICE_TABLE_WIDTHS;
  const ds = PRICE_TABLE_DEPTHS;
  const clamp = (v: number, min: number, max: number) => Math.max(min, Math.min(max, v));
  const w = clamp(widthCm, ws[0], ws[ws.length - 1]);
  const d = clamp(depthCm, ds[0], ds[ds.length - 1]);
  // Find bracketing indices
  let wi = 0;
  while (wi < ws.length - 2 && w > ws[wi + 1]) wi++;
  let di = 0;
  while (di < ds.length - 2 && d > ds[di + 1]) di++;
  const w0 = ws[wi], w1 = ws[wi + 1];
  const d0 = ds[di], d1 = ds[di + 1];
  const tw = w1 === w0 ? 0 : (w - w0) / (w1 - w0);
  const td = d1 === d0 ? 0 : (d - d0) / (d1 - d0);
  const p00 = PRICE_TABLE[di][wi];
  const p01 = PRICE_TABLE[di][wi + 1];
  const p10 = PRICE_TABLE[di + 1][wi];
  const p11 = PRICE_TABLE[di + 1][wi + 1];
  const top = p00 + (p01 - p00) * tw;
  const bot = p10 + (p11 - p10) * tw;
  return top + (bot - top) * td;
}

const HEIGHT_SURCHARGE_PER_CM_OVER = 4; // over 250cm
const HEIGHT_BASELINE = 250;

const COLORS = [
  { id: "ral_7016", hex: "#293133", premium: false },
  { id: "ral_9005", hex: "#0a0a0a", premium: false },
  { id: "ral_9016", hex: "#f6f6f6", premium: false },
  { id: "ral_9007", hex: "#8f8f8f", premium: false },
  { id: "ral", hex: "linear-gradient(135deg,#e94e77,#5b8def,#7ed957)", premium: true },
] as const;



const ROOF_TYPES = [
  { id: "polycarbonate", pricePerM2: 0 },
  { id: "safety_glass", pricePerM2: 90 },
] as const;

const TRANSPARENCIES = [
  { id: "milky" },
  { id: "clear" },
] as const;

// --- Kalkulačka konečnej ceny pre zákazníka (bez DPH – DPH pripočíta WooCommerce) ---
const MARGIN_RATE = 0.40;      // marža 40 % z nákupnej ceny (vrátane farby)
const MOUNTING_RATE = 0.20;    // montáž 20 % z (nákupná + marža)
const LED_UNIT_PRICE = 35;     // €/ks
const LED_MIN_QTY = 5;
const DELIVERY_PER_KM = 0.75;  // €/km
const REINFORCEMENT_PRICE = 180; // EUR – výstuha
const EXTRA_POST_PRICE = 220;  // EUR za každý stĺp navyše nad 2 základné

/**
 * Stĺpová logika podľa technickej tabuľky (Polykarbonát).
 * Vstup: šírka (cm). Výstup: počet stĺpov + či je potrebná výstuha.
 *  ≤ 506 cm  → 2 stĺpy
 *  ≤ 606 cm  → 2 stĺpy + výstuha
 *  ≤ 906 cm  → 3 stĺpy
 *  > 906 cm  → 4 stĺpy
 */
function computePostLayout(widthCm: number): { posts: 2 | 3 | 4; reinforcement: boolean } {
  if (widthCm <= 506) return { posts: 2, reinforcement: false };
  if (widthCm <= 606) return { posts: 2, reinforcement: true };
  if (widthCm <= 906) return { posts: 3, reinforcement: false };
  return { posts: 4, reinforcement: false };
}

type ColorId = typeof COLORS[number]["id"];
type RoofId = typeof ROOF_TYPES[number]["id"];
type TransId = typeof TRANSPARENCIES[number]["id"];

interface Config {
  width: number; // cm
  depth: number; // cm
  height: number; // cm
  color: ColorId;
  ralCode?: string;
  ralName?: string;
  ralHex?: string;
  roof: RoofId;
  transparency: TransId;
  mounting: boolean;
  led: boolean;
  deliveryKm: number; // vzdialenosť dopravy v km
}

interface LeadForm {
  name: string;
  phone: string;
  email: string;
  city: string;
  note: string;
  consentGdpr: boolean;
  consentTerms: boolean;
}

const STEPS = [
  { id: 1, icon: Ruler },
  { id: 2, icon: Palette },
  { id: 3, icon: Square },
  { id: 4, icon: Wrench },
  { id: 5, icon: Send },
];

const MIN_W = 300;
const MAX_W = 2000;
const MIN_D = 200;
const MAX_D = 500;
const MIN_H = 200;
const MAX_H = 350;

export default function PergolaConfigurator() {
  const { t } = useLanguage();
  const [step, setStep] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  

  const [config, setConfig] = useState<Config>({
    width: 400,
    depth: 350,
    height: 250,
    color: "ral_7016",
    roof: "polycarbonate",
    transparency: "clear",
    mounting: false,
    led: false,
    deliveryKm: 0,
  });

  const [form, setForm] = useState<LeadForm>({
    name: "",
    phone: "",
    email: "",
    city: "",
    note: "",
    consentGdpr: false,
    consentTerms: false,
  });

  const [errors, setErrors] = useState<Partial<Record<keyof LeadForm, string>>>({});

  const areaM2 = useMemo(() => (config.width * config.depth) / 10000, [config.width, config.depth]);

  const postLayout = useMemo(() => computePostLayout(config.width), [config.width]);

  const breakdown = useMemo(() => {
    const roof = ROOF_TYPES.find((r) => r.id === config.roof)!;
    const colorObj = COLORS.find((c) => c.id === config.color)!;

    // 1) Nákupná cena prístrešku (bez DPH) – tabuľka + strecha + výška + stĺpy
    let base = lookupBasePrice(config.width, config.depth);
    base += areaM2 * roof.pricePerM2;
    if (config.height > HEIGHT_BASELINE) {
      base += (config.height - HEIGHT_BASELINE) * HEIGHT_SURCHARGE_PER_CM_OVER;
    }
    base += Math.max(0, postLayout.posts - 2) * EXTRA_POST_PRICE;
    if (postLayout.reinforcement) base += REINFORCEMENT_PRICE;

    // 2) Farba: +20 % ak zákazník zvolil RAL na mieru – pripočíta sa PRED maržou
    const colorSurcharge = colorObj.premium ? base * 0.20 : 0;
    const purchase = base + colorSurcharge; // nákupná cena vrátane farby

    // 3) LED – 35 €/ks, počet = šírka(m) − 1, min. 5
    const widthM = config.width / 100;
    const ledQty = config.led ? Math.max(LED_MIN_QTY, Math.ceil(widthM) - 1) : 0;
    const ledCost = ledQty * LED_UNIT_PRICE;

    // 4) Marža 40 % z nákupnej ceny (nezahŕňa LED ani dopravu)
    const margin = purchase * MARGIN_RATE;

    // 5) Montáž 20 % z (nákupná + marža) – iba ak zákazník chce montáž
    const mountingCost = config.mounting ? (purchase + margin) * MOUNTING_RATE : 0;

    // 6) Doprava – 0,75 € / km
    const deliveryCost = Math.max(0, config.deliveryKm) * DELIVERY_PER_KM;

    // 7) Konečná cena BEZ DPH – DPH pripočíta WooCommerce v PHP
    const netTotal = purchase + ledCost + deliveryCost + margin + mountingCost;

    return {
      base,
      colorSurcharge,
      purchase,
      ledQty,
      ledCost,
      margin,
      mountingCost,
      deliveryCost,
      netTotal,
      finalPrice: Math.round(netTotal),
    };
  }, [config, areaM2, postLayout]);

  const price = breakdown.finalPrice;

  // --- Interný preview odomykač cien (nie pre zákazníka) ---
  // Otvor stránku s ?preview=luxu2026 → uloží sa do localStorage, cena bude viditeľná.
  // Otvor stránku s ?preview=off → uzamkne.
  const PREVIEW_KEY = "luxu2026";
  const [pricePreview, setPricePreview] = useState(false);
  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const q = params.get("preview");
      if (q === "off") {
        localStorage.removeItem("lux_pergola_preview");
      } else if (q && q === PREVIEW_KEY) {
        localStorage.setItem("lux_pergola_preview", "1");
      }
      setPricePreview(localStorage.getItem("lux_pergola_preview") === "1");
    } catch {
      setPricePreview(false);
    }
  }, []);
  const formattedPrice = new Intl.NumberFormat("sk-SK", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(price);

  const colorObj = COLORS.find((c) => c.id === config.color)!;
  const ralPicked = config.color === "ral" ? findRal(config.ralCode) : undefined;
  const colorBaseName = t(`pergola.color.${colorObj.id}`);
  const colorDisplayName = ralPicked
    ? `${ralPicked.code} – ${ralPicked.name}`
    : colorBaseName;
  const colorDisplayHex = ralPicked ? ralPicked.hex : colorObj.hex;
  const roofObj = ROOF_TYPES.find((r) => r.id === config.roof)!;
  const transObj = TRANSPARENCIES.find((t2) => t2.id === config.transparency)!;
  const roofName = t(`pergola.roof.${roofObj.id}`);
  const transparencyName = t(`pergola.transparency.${transObj.id}`);

  // IZO Sklo 24 forces "clear"
  const handleRoofChange = (roof: RoofId) => {
    setConfig((c) => ({ ...c, roof }));
  };

  const validateStep = (s: number): boolean => {
    if (s === 1) {
      return (
        config.width >= MIN_W &&
        config.width <= MAX_W &&
        config.depth >= MIN_D &&
        config.depth <= MAX_D &&
        config.height >= MIN_H &&
        config.height <= MAX_H
      );
    }
    if (s === 5) {
      const e: Partial<Record<keyof LeadForm, string>> = {};
      if (!form.name.trim()) e.name = t("pergola.lead.err.name");
      if (!form.phone.trim() || form.phone.trim().length < 6) e.phone = t("pergola.lead.err.phone");
      if (!/^\S+@\S+\.\S+$/.test(form.email)) e.email = t("pergola.lead.err.email");
      if (!form.city.trim()) e.city = t("pergola.lead.err.city");
      if (!form.consentGdpr) e.consentGdpr = t("pergola.lead.err.consent");
      if (!form.consentTerms) e.consentTerms = t("pergola.lead.err.consent");
      setErrors(e);
      return Object.keys(e).length === 0;
    }
    return true;
  };

  const next = () => {
    if (!validateStep(step)) {
      toast({ title: t("pergola.toast.validate"), variant: "destructive" });
      return;
    }
    setStep((s) => Math.min(STEPS.length, s + 1));
  };
  const prev = () => setStep((s) => Math.max(1, s - 1));

  const submit = async () => {
    if (!validateStep(5)) return;
    setSubmitting(true);
    try {
      const endpoint =
        (import.meta.env.VITE_PERGOLA_INQUIRY_URL as string | undefined) ||
        "https://www.luxurelax.sk/wp-json/luxurelax-pergola/v1/inquiry";

      const payload = {
        config: {
          ...config,
          colorName: colorDisplayName,
          roofName,
          transparencyName,
          areaM2: Number(areaM2.toFixed(2)),
        },
        pricing: {
          basePurchase: Math.round(breakdown.base * 100) / 100,
          colorSurcharge: Math.round(breakdown.colorSurcharge * 100) / 100,
          purchase: Math.round(breakdown.purchase * 100) / 100,
          ledQty: breakdown.ledQty,
          ledCost: Math.round(breakdown.ledCost * 100) / 100,
          margin: Math.round(breakdown.margin * 100) / 100,
          mounting: Math.round(breakdown.mountingCost * 100) / 100,
          deliveryKm: config.deliveryKm,
          deliveryCost: Math.round(breakdown.deliveryCost * 100) / 100,
          netTotal: Math.round(breakdown.netTotal * 100) / 100,
          finalPrice: breakdown.finalPrice, // bez DPH – WooCommerce si DPH pripočíta
        },
        currency: "EUR",
        customer: {
          name: form.name,
          phone: form.phone,
          email: form.email,
          city: form.city,
          note: form.note,
        },
      };

      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error(t("pergola.error.send"));
      setSubmitted(true);
    } catch (err) {
      toast({
        title: t("pergola.toast.errorTitle"),
        description: (err as Error).message,
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };


  return (
    <div className="min-h-screen bg-background text-foreground">
      <ConfiguratorHeader />
      <main className="pt-28 pb-24">
        <div className="container mx-auto px-4">
          {/* Hero */}
          <div className="text-center mb-10 max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/30 bg-primary/5 text-primary text-xs uppercase tracking-widest mb-4">
              <Sparkles className="w-3.5 h-3.5" /> {t("pergola.hero.badge")}
            </div>
            <h1 className="font-display text-4xl md:text-5xl font-bold mb-3">
              {t("pergola.hero.title")}
            </h1>
            <p className="text-foreground/60">
              {t("pergola.hero.subtitle")}
            </p>
          </div>

          {/* Progress */}
          <div className="max-w-5xl mx-auto mb-10">
            <div className="flex items-center justify-between mb-3">
              {STEPS.map((s) => {
                const Icon = s.icon;
                const active = step === s.id;
                const done = step > s.id;
                return (
                  <button
                    key={s.id}
                    onClick={() => done && setStep(s.id)}
                    className={cn(
                      "flex flex-col items-center gap-2 flex-1 transition-opacity",
                      !done && !active && "opacity-40",
                      done && "cursor-pointer hover:opacity-100",
                    )}
                  >
                    <div
                      className={cn(
                        "w-10 h-10 rounded-full border flex items-center justify-center transition-all",
                        active && "border-primary bg-primary text-primary-foreground shadow-[0_0_24px_hsl(var(--primary)/0.5)]",
                        done && "border-primary/60 bg-primary/10 text-primary",
                        !active && !done && "border-border text-foreground/50",
                      )}
                    >
                      {done ? <Check className="w-5 h-5" /> : <Icon className="w-5 h-5" />}
                    </div>
                    <span className="text-[11px] uppercase tracking-wider hidden md:block">{t(`pergola.step.${s.id}.title`)}</span>
                  </button>
                );
              })}
            </div>
            <Progress value={(step / STEPS.length) * 100} className="h-1" />
          </div>

          <div className="grid lg:grid-cols-[1fr_380px] gap-8 max-w-7xl mx-auto">
            {/* Step content */}
            <div className="min-h-[420px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={step}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -16 }}
                  transition={{ duration: 0.3 }}
                  className="rounded-2xl border border-border bg-card/40 backdrop-blur-md p-6 md:p-10"
                >
                  <div className="mb-8">
                    <div className="text-xs text-primary uppercase tracking-widest mb-2">
                      {t("pergola.step.label")} {step} / {STEPS.length}
                    </div>
                    <h2 className="font-display text-3xl md:text-4xl font-semibold mb-2">
                      {t(`pergola.step.${step}.title`)}
                    </h2>
                    <p className="text-foreground/60">{t(`pergola.step.${step}.subtitle`)}</p>
                  </div>

                  {step === 1 && (
                    <StepDimensions config={config} setConfig={setConfig} />
                  )}
                  {step === 2 && (
                    <StepColor config={config} setConfig={setConfig} />
                  )}
                  {step === 3 && (
                    <StepRoof config={config} setConfig={setConfig} onRoofChange={handleRoofChange} />
                  )}
                  {step === 4 && (
                    <StepExtras config={config} setConfig={setConfig} />
                  )}
                  {step === 5 && !submitted && (
                    <StepLead form={form} setForm={setForm} errors={errors} />
                  )}
                  {step === 5 && submitted && <StepSuccess />}
                </motion.div>
              </AnimatePresence>

              {/* Navigation */}
              {!submitted && (
                <div className="flex justify-between items-center mt-6">
                  <Button variant="ghost" onClick={prev} disabled={step === 1}>
                    <ChevronLeft className="w-4 h-4" /> {t("pergola.nav.back")}
                  </Button>
                  {step < STEPS.length ? (
                    <Button variant="luxury" size="lg" onClick={next}>
                      {t("pergola.nav.continue")} <ChevronRight className="w-4 h-4" />
                    </Button>
                  ) : (
                    <Button variant="luxury" size="lg" onClick={submit} disabled={submitting}>
                      {submitting ? (
                        <><Loader2 className="w-4 h-4 animate-spin" /> {t("pergola.nav.sending")}</>
                      ) : (
                        <>{t("pergola.nav.submit")} <Send className="w-4 h-4" /></>
                      )}
                    </Button>
                  )}
                </div>
              )}
            </div>

            {/* Summary panel */}
            <aside className="lg:sticky lg:top-28 self-start">
              <div className="rounded-2xl border border-border bg-gradient-to-b from-card to-card/40 backdrop-blur-md overflow-hidden">
                <PergolaPreview config={config} colorHex={colorDisplayHex} postLayout={postLayout} />
                <div className="p-6">
                  <div className="text-xs uppercase tracking-widest text-primary mb-1">{t("pergola.summary.label")}</div>
                  <h3 className="font-display text-2xl mb-5">{t("pergola.summary.title")}</h3>

                  <SummaryRow label={t("pergola.summary.dimensions")} value={`${config.width} × ${config.depth} × ${config.height} cm`} />
                  <SummaryRow label={t("pergola.summary.roofArea")} value={`${areaM2.toFixed(2)} m²`} />
                  <SummaryRow label={t("pergola.summary.color")} value={colorDisplayName} />
                  <SummaryRow label={t("pergola.summary.roof")} value={roofName} />
                  <SummaryRow label={t("pergola.summary.transparency")} value={transparencyName} />
                  <SummaryRow
                    label={t("pergola.summary.posts")}
                    value={`${postLayout.posts}× ${t("pergola.summary.postUnit")}${postLayout.reinforcement ? ` + ${t("pergola.summary.reinforcement")}` : ""}`}
                  />
                  <SummaryRow label={t("pergola.summary.mounting")} value={config.mounting ? t("pergola.summary.yes") : t("pergola.summary.no")} />
                  <SummaryRow
                    label={t("pergola.summary.led")}
                    value={config.led ? `${breakdown.ledQty}× ${t("pergola.summary.ledUnit")}` : t("pergola.summary.no")}
                  />
                  <SummaryRow
                    label={t("pergola.summary.delivery")}
                    value={config.deliveryKm > 0 ? `${config.deliveryKm} km` : t("pergola.summary.no")}
                  />

                  {pricePreview && (
                    <div className="mt-5 pt-5 border-t border-dashed border-primary/40">
                      <div className="flex items-center justify-between mb-3">
                        <div className="text-[10px] uppercase tracking-widest text-primary/80">
                          Interný náhľad ceny
                        </div>
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/30">
                          preview
                        </span>
                      </div>

                      {(() => {
                        const eur = (n: number) =>
                          new Intl.NumberFormat("sk-SK", {
                            style: "currency",
                            currency: "EUR",
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          }).format(n);
                        const tableBase =
                          breakdown.base -
                          areaM2 * (roofObj.pricePerM2 || 0) -
                          (config.height > HEIGHT_BASELINE
                            ? (config.height - HEIGHT_BASELINE) * HEIGHT_SURCHARGE_PER_CM_OVER
                            : 0) -
                          Math.max(0, postLayout.posts - 2) * EXTRA_POST_PRICE -
                          (postLayout.reinforcement ? REINFORCEMENT_PRICE : 0);
                        const heightSurcharge =
                          config.height > HEIGHT_BASELINE
                            ? (config.height - HEIGHT_BASELINE) * HEIGHT_SURCHARGE_PER_CM_OVER
                            : 0;
                        const roofSurcharge = areaM2 * (roofObj.pricePerM2 || 0);
                        const extraPosts = Math.max(0, postLayout.posts - 2);
                        return (
                          <div className="text-[12px] leading-relaxed space-y-1 font-mono">
                            <BreakRow label={`Tabuľka ${config.width}×${config.depth} cm`} value={eur(tableBase)} />
                            {roofSurcharge > 0 && (
                              <BreakRow
                                label={`Bezp. sklo ${areaM2.toFixed(2)} m² × 90 €`}
                                value={`+ ${eur(roofSurcharge)}`}
                              />
                            )}
                            {heightSurcharge > 0 && (
                              <BreakRow
                                label={`Výška +${config.height - HEIGHT_BASELINE} cm × 4 €`}
                                value={`+ ${eur(heightSurcharge)}`}
                              />
                            )}
                            {extraPosts > 0 && (
                              <BreakRow
                                label={`${extraPosts}× stĺp navyše × 220 €`}
                                value={`+ ${eur(extraPosts * EXTRA_POST_PRICE)}`}
                              />
                            )}
                            {postLayout.reinforcement && (
                              <BreakRow label="Výstuha" value={`+ ${eur(REINFORCEMENT_PRICE)}`} />
                            )}
                            <BreakRow label="= Základ" value={eur(breakdown.base)} bold />
                            {breakdown.colorSurcharge > 0 && (
                              <BreakRow
                                label="RAL na mieru +20 %"
                                value={`+ ${eur(breakdown.colorSurcharge)}`}
                              />
                            )}
                            <BreakRow label="= Nákupná cena" value={eur(breakdown.purchase)} bold />
                            <BreakRow
                              label={`Marža 40 % (${eur(breakdown.purchase)} × 0,40)`}
                              value={`+ ${eur(breakdown.margin)}`}
                            />
                            {config.mounting && (
                              <BreakRow
                                label={`Montáž 20 % z ${eur(breakdown.purchase + breakdown.margin)}`}
                                value={`+ ${eur(breakdown.mountingCost)}`}
                              />
                            )}
                            {breakdown.ledQty > 0 && (
                              <BreakRow
                                label={`LED ${breakdown.ledQty}× × 35 €`}
                                value={`+ ${eur(breakdown.ledCost)}`}
                              />
                            )}
                            {config.deliveryKm > 0 && (
                              <BreakRow
                                label={`Doprava ${config.deliveryKm} km × 0,75 €`}
                                value={`+ ${eur(breakdown.deliveryCost)}`}
                              />
                            )}
                          </div>
                        );
                      })()}

                      <div className="mt-3 pt-3 border-t border-primary/20">
                        <div className="text-[10px] uppercase tracking-widest text-primary/70 mb-1">
                          Konečná cena bez DPH
                        </div>
                        <div className="font-display text-3xl font-bold text-primary">
                          {formattedPrice}
                        </div>
                        <div className="text-[11px] text-foreground/50 mt-1">
                          bez DPH · zákazník túto sumu nevidí
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="mt-6 pt-5 border-t border-border">
                    <div className="text-xs text-foreground/60 uppercase tracking-widest mb-1">
                      {t("pergola.summary.quote.label")}
                    </div>
                    <div className="text-sm text-foreground/80 leading-relaxed">
                      {t("pergola.summary.quote.desc")}
                    </div>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </main>

      {/* Mobile sticky CTA */}
      {!submitted && (
        <div className="lg:hidden fixed bottom-0 inset-x-0 z-40 bg-background/95 backdrop-blur border-t border-border p-3 flex items-center justify-between gap-3">
          <div className="text-xs text-foreground/60 leading-tight max-w-[55%]">
            {t("pergola.mobile.cta")}
          </div>
          {step < STEPS.length ? (
            <Button variant="luxury" onClick={next}>
              {t("pergola.nav.continue")} <ChevronRight className="w-4 h-4" />
            </Button>
          ) : (
            <Button variant="luxury" onClick={submit} disabled={submitting}>
              {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <>{t("pergola.nav.sendShort")} <Send className="w-4 h-4" /></>}
            </Button>
          )}
        </div>
      )}

      <ConfiguratorFooter />
    </div>
  );
}

// ---------- Subcomponents ----------

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between items-start text-sm py-1.5">
      <span className="text-foreground/60">{label}</span>
      <span className="text-right font-medium">{value}</span>
    </div>
  );
}

function PergolaPreview({
  config,
  colorHex,
  postLayout,
}: {
  config: Config;
  colorHex: string;
  postLayout: { posts: 2 | 3 | 4; reinforcement: boolean };
}) {
  const { t } = useLanguage();
  // Real isometric projection — proportions react to width/depth/height
  const frameColor = colorHex.startsWith("linear") ? "#3a3a3a" : colorHex;

  // World units: 1 unit = 1 cm, scaled to SVG via SCALE
  const W = config.width;
  const D = config.depth;
  const H = config.height;

  // Auto-fit scale so any dimension fits in viewport
  const VB_W = 520;
  const VB_H = 360;
  const cos30 = Math.cos(Math.PI / 6);
  const sin30 = Math.sin(Math.PI / 6);
  const projW = (W + D) * cos30;
  const projH = (W + D) * sin30 + H;
  const SCALE = Math.min((VB_W - 80) / projW, (VB_H - 80) / projH);

  // Center the projected pergola inside the viewBox.
  // Iso x-range: [-D*cos30 .. W*cos30] → midpoint = (W-D)*cos30/2
  // Iso vertical extent on screen: ground-front at +(0)*sin30, ground-back at -(W+D)*sin30, roof above by H
  const ox = VB_W / 2 - ((W - D) * cos30 * SCALE) / 2;
  const oy = VB_H / 2 + ((W + D) * sin30 + H) * SCALE / 2;

  // Iso projection helper: (x along width, y along depth, z up) -> screen
  // Higher z must go UP on screen → subtract z. Larger (x+y) is further back → also up.
  const iso = (x: number, y: number, z: number) => {
    const sx = ox + (x - y) * cos30 * SCALE;
    const sy = oy - ((x + y) * sin30 + z) * SCALE;
    return [sx, sy] as const;
  };

  // Pergola corners (footprint at z=0, roof at z=H)
  const A0 = iso(0, 0, 0);
  const B0 = iso(W, 0, 0);
  const C0 = iso(W, D, 0);
  const D0 = iso(0, D, 0);
  const A1 = iso(0, 0, H);
  const B1 = iso(W, 0, H);
  const C1 = iso(W, D, H);
  const D1 = iso(0, D, H);

  // Ground plane (in front of wall only)
  const pad = Math.max(W, D) * 0.18;
  const G1 = iso(-pad, -pad, 0);
  const G2 = iso(W + pad, -pad, 0);
  const G3 = iso(W + pad, D, 0);
  const G4 = iso(-pad, D, 0);

  // Back wall — pergola is wall-mounted, so wall sits exactly at back edge (y = D)
  const wallH = Math.max(H * 1.35, H + 60);
  const W1 = iso(-pad, D, 0);
  const W2 = iso(W + pad, D, 0);
  const W3 = iso(W + pad, D, wallH);
  const W4 = iso(-pad, D, wallH);

  // Roof slats (along depth direction)
  const slatCount = Math.max(8, Math.round(W / 35));
  const slats: string[] = [];
  for (let i = 0; i <= slatCount; i++) {
    const x = (i / slatCount) * W;
    const p1 = iso(x, 0, H);
    const p2 = iso(x, D, H);
    slats.push(`M ${p1[0]} ${p1[1]} L ${p2[0]} ${p2[1]}`);
  }

  // Posts (4 corners)
  const postPath = (a: readonly [number, number], b: readonly [number, number]) =>
    `M ${a[0]} ${a[1]} L ${b[0]} ${b[1]}`;

  const fmt = (cm: number) => `${(cm / 100).toFixed(2)} m`;

  // ---- Roof appearance derived from selection ----
  const isMilky = config.transparency === "milky";
  const roofId =
    config.roof === "safety_glass"
      ? isMilky
        ? "roof-glass-milky"
        : "roof-glass-clear"
      : isMilky
      ? "roof-poly-milky"
      : "roof-poly-clear";
  const roofFill = `url(#${roofId})`;
  // Slats viditeľné len cez priehľadné materiály
  const slatsOpacity = isMilky ? 0.08 : config.roof === "polycarbonate" ? 0.55 : 0.35;
  const isIzo = false;

  return (
    <div className="relative h-72 md:h-80 bg-gradient-to-b from-secondary/40 to-background overflow-hidden rounded-lg">
      <svg viewBox={`0 0 ${VB_W} ${VB_H}`} className="w-full h-full" preserveAspectRatio="xMidYMid meet">
        <defs>
          <linearGradient id="pergola-grass" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="hsl(95 25% 35%)" />
            <stop offset="100%" stopColor="hsl(95 30% 22%)" />
          </linearGradient>
          <linearGradient id="pergola-wall" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="hsl(30 22% 48%)" />
            <stop offset="100%" stopColor="hsl(30 22% 32%)" />
          </linearGradient>

          {/* Polykarbonát – číry: jemne modrastý priesvit */}
          <linearGradient id="roof-poly-clear" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="rgba(200,225,250,0.50)" />
            <stop offset="100%" stopColor="rgba(160,195,230,0.22)" />
          </linearGradient>
          {/* Polykarbonát – mliečny: biely difúzny */}
          <linearGradient id="roof-poly-milky" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="rgba(245,245,240,0.92)" />
            <stop offset="100%" stopColor="rgba(220,222,218,0.78)" />
          </linearGradient>
          {/* Bezpečnostné sklo – číre: kryštalická modrá s odleskom */}
          <linearGradient id="roof-glass-clear" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="rgba(170,210,240,0.55)" />
            <stop offset="45%" stopColor="rgba(255,255,255,0.35)" />
            <stop offset="100%" stopColor="rgba(120,170,210,0.20)" />
          </linearGradient>
          {/* Bezpečnostné sklo – mliečne: matné s ľahkým chladným nádychom */}
          <linearGradient id="roof-glass-milky" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="rgba(235,238,240,0.90)" />
            <stop offset="100%" stopColor="rgba(205,212,218,0.78)" />
          </linearGradient>
          {/* IZO sklo 24 – dvojsklo: hlbší modrý nádych */}
          <linearGradient id="roof-izo" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="rgba(150,195,230,0.65)" />
            <stop offset="50%" stopColor="rgba(210,235,250,0.45)" />
            <stop offset="100%" stopColor="rgba(110,160,200,0.30)" />
          </linearGradient>

          {/* LED warm glow */}
          <radialGradient id="pergola-led-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(255,210,140,0.85)" />
            <stop offset="55%" stopColor="rgba(255,190,110,0.35)" />
            <stop offset="100%" stopColor="rgba(255,180,90,0)" />
          </radialGradient>
          <radialGradient id="pergola-led-spot" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(255,235,170,1)" />
            <stop offset="60%" stopColor="rgba(255,205,120,0.6)" />
            <stop offset="100%" stopColor="rgba(255,180,80,0)" />
          </radialGradient>
          <radialGradient id="pergola-led-ground" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(255,200,120,0.55)" />
            <stop offset="100%" stopColor="rgba(255,180,90,0)" />
          </radialGradient>

          <filter id="pergola-shadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="6" stdDeviation="6" floodOpacity="0.45" />
          </filter>
        </defs>

        {/* Back wall */}
        <polygon
          points={`${W1[0]},${W1[1]} ${W2[0]},${W2[1]} ${W3[0]},${W3[1]} ${W4[0]},${W4[1]}`}
          fill="url(#pergola-wall)"
          opacity="0.9"
        />

        {/* Ground */}
        <polygon
          points={`${G1[0]},${G1[1]} ${G2[0]},${G2[1]} ${G3[0]},${G3[1]} ${G4[0]},${G4[1]}`}
          fill="url(#pergola-grass)"
        />

        {/* Soft shadow under pergola */}
        <polygon
          points={`${A0[0]},${A0[1]} ${B0[0]},${B0[1]} ${C0[0]},${C0[1]} ${D0[0]},${D0[1]}`}
          fill="rgba(0,0,0,0.35)"
          filter="url(#pergola-shadow)"
        />

        {/* LED – teplý odlesk na zemi pod pergolou */}
        {config.led && (() => {
          const cBot = iso(W / 2, D / 2, 0);
          const r = Math.max((W + D) * 0.18 * SCALE, 70);
          return (
            <ellipse
              cx={cBot[0]}
              cy={cBot[1]}
              rx={r * 1.5}
              ry={r * 0.55}
              fill="url(#pergola-led-ground)"
              style={{ mixBlendMode: "screen" }}
            />
          );
        })()}

        {/* Intermediate post X-positions along width based on table layout */}
        {(() => {
          const intermediates: number[] =
            postLayout.posts === 3
              ? [W / 2]
              : postLayout.posts === 4
              ? [W / 3, (2 * W) / 3]
              : [];
          return (
            <>
              {/* Wall-mount ledger beam (pergola attached to wall) */}
              {(() => {
                const a = iso(0, D, H);
                const b = iso(W, D, H);
                return (
                  <path
                    d={postPath(a, b)}
                    stroke={frameColor}
                    strokeWidth={6}
                    strokeLinecap="round"
                    opacity={0.95}
                  />
                );
              })()}

              {/* Roof slab (glass / polycarbonate) */}
              <polygon
                points={`${A1[0]},${A1[1]} ${B1[0]},${B1[1]} ${C1[0]},${C1[1]} ${D1[0]},${D1[1]}`}
                fill={roofFill}
                stroke={frameColor}
                strokeWidth={3}
              />
              {/* Roof slats – tlmené pre mliečne sklo */}
              <g stroke={frameColor} strokeWidth={1} opacity={slatsOpacity}>
                {slats.map((d, i) => (
                  <path key={i} d={d} />
                ))}
              </g>
              {/* IZO sklo – druhá vrstva (dvojsklo) jemne posunutá nahor */}
              {isIzo && (() => {
                const off = Math.max(2, H * 0.012);
                const a = iso(0, 0, H + off);
                const b = iso(W, 0, H + off);
                const cc = iso(W, D, H + off);
                const dd = iso(0, D, H + off);
                return (
                  <polygon
                    points={`${a[0]},${a[1]} ${b[0]},${b[1]} ${cc[0]},${cc[1]} ${dd[0]},${dd[1]}`}
                    fill="url(#roof-izo)"
                    stroke={frameColor}
                    strokeWidth={1.5}
                    opacity={0.85}
                  />
                );
              })()}

              {/* LED – teplé bodové svetlá pod prednou hranou strechy + difúzne podsvietenie */}
              {config.led && (() => {
                const lights: Array<readonly [number, number]> = [];
                const count = Math.max(4, Math.round(W / 80));
                for (let i = 1; i <= count; i++) {
                  const x = (i / (count + 1)) * W;
                  lights.push(iso(x, 0, H - 4));
                }
                // Difúzne podsvietenie pod celou strechou
                const cTop = iso(W / 2, D / 2, H - 6);
                const radius = Math.max((W + D) * 0.12 * SCALE, 60);
                return (
                  <g>
                    <ellipse
                      cx={cTop[0]}
                      cy={cTop[1] + 6}
                      rx={radius * 1.4}
                      ry={radius * 0.45}
                      fill="url(#pergola-led-glow)"
                      style={{ mixBlendMode: "screen" }}
                    />
                    {lights.map(([x, y], i) => (
                      <g key={`led-${i}`}>
                        <circle cx={x} cy={y} r={10} fill="url(#pergola-led-spot)" style={{ mixBlendMode: "screen" }} />
                        <circle cx={x} cy={y} r={1.6} fill="rgba(255,245,210,1)" />
                      </g>
                    ))}
                  </g>
                );
              })()}

              {/* Reinforcement beam under front edge of roof (if required) */}
              {postLayout.reinforcement && (() => {
                const a = iso(0, 0, H - 8);
                const b = iso(W, 0, H - 8);
                return (
                  <path
                    d={postPath(a, b)}
                    stroke={frameColor}
                    strokeWidth={6}
                    strokeLinecap="round"
                    opacity={0.95}
                  />
                );
              })()}

              {/* Front posts (drawn last, in front) */}
              <path d={postPath(A0, A1)} stroke={frameColor} strokeWidth={4} strokeLinecap="round" />
              <path d={postPath(B0, B1)} stroke={frameColor} strokeWidth={4} strokeLinecap="round" />
              {intermediates.map((x, i) => {
                const a = iso(x, 0, 0);
                const b = iso(x, 0, H);
                return (
                  <path
                    key={`front-${i}`}
                    d={postPath(a, b)}
                    stroke={frameColor}
                    strokeWidth={4}
                    strokeLinecap="round"
                  />
                );
              })}
            </>
          );
        })()}

        {/* Dimension labels */}
        {/* Width — front edge */}
        <text
          x={(A0[0] + B0[0]) / 2}
          y={(A0[1] + B0[1]) / 2 + 18}
          textAnchor="middle"
          fontSize="11"
          fill="hsl(var(--foreground) / 0.85)"
        >
          {t("pergola.preview.width")} {fmt(W)}
        </text>
        {/* Depth — left edge */}
        <text
          x={Math.min(A0[0], D0[0], A1[0], D1[0]) - 18}
          y={(A0[1] + D0[1]) / 2 + 10}
          textAnchor="end"
          fontSize="11"
          fill="hsl(var(--foreground) / 0.85)"
        >
          {t("pergola.preview.depth")} {fmt(D)}
        </text>
        {/* Height — right post */}
        <text
          x={B1[0] + 10}
          y={(B0[1] + B1[1]) / 2}
          fontSize="11"
          fill="hsl(var(--foreground) / 0.85)"
        >
          {t("pergola.preview.height")} {fmt(H)}
        </text>
      </svg>
      <div className="absolute top-3 left-3 text-[10px] uppercase tracking-widest text-foreground/40">
        {t("pergola.preview.label")}
      </div>
    </div>
  );
}

// ----- Step 1 -----
function StepDimensions({
  config,
  setConfig,
}: {
  config: Config;
  setConfig: React.Dispatch<React.SetStateAction<Config>>;
}) {
  const { t } = useLanguage();
  const dims: Array<{ key: "width" | "depth" | "height"; label: string; min: number; max: number; rec: string }> = [
    { key: "width", label: t("pergola.dim.width"), min: MIN_W, max: MAX_W, rec: t("pergola.dim.width.rec") },
    { key: "depth", label: t("pergola.dim.depth"), min: MIN_D, max: MAX_D, rec: t("pergola.dim.depth.rec") },
    { key: "height", label: t("pergola.dim.height"), min: MIN_H, max: MAX_H, rec: t("pergola.dim.height.rec") },
  ];
  return (
    <div className="space-y-8">
      {dims.map((d) => (
        <div key={d.key}>
          <div className="flex justify-between items-end mb-3">
            <div>
              <label className="text-sm font-medium uppercase tracking-wide">{d.label}</label>
              <div className="text-xs text-foreground/50">{d.rec}</div>
            </div>
            <div className="flex items-center gap-2">
              <Input
                type="number"
                value={config[d.key]}
                min={d.min}
                max={d.max}
                onChange={(e) => {
                  const raw = e.target.value;
                  const n = raw === "" ? 0 : Number(raw);
                  if (Number.isNaN(n)) return;
                  setConfig((c) => ({ ...c, [d.key]: n }));
                }}
                onBlur={(e) => {
                  const n = Number(e.target.value) || d.min;
                  setConfig((c) => ({
                    ...c,
                    [d.key]: Math.max(d.min, Math.min(d.max, n)),
                  }));
                }}
                className="w-28 text-right font-display text-lg"
              />
              <span className="text-xs text-foreground/50">cm</span>
            </div>
          </div>
          <Slider
            value={[config[d.key]]}
            min={d.min}
            max={d.max}
            step={10}
            onValueChange={(v) => setConfig((c) => ({ ...c, [d.key]: v[0] }))}
          />
          <div className="flex justify-between text-[10px] text-foreground/40 mt-1">
            <span>{t("pergola.dim.min")} {d.min} cm</span>
            <span>{t("pergola.dim.max")} {d.max} cm</span>
          </div>
        </div>
      ))}
    </div>
  );
}

// ----- Step 2 -----
function StepColor({
  config,
  setConfig,
}: {
  config: Config;
  setConfig: React.Dispatch<React.SetStateAction<Config>>;
}) {
  const { t } = useLanguage();
  const [ralOpen, setRalOpen] = useState(false);
  const ralPicked = config.color === "ral" ? findRal(config.ralCode) : undefined;

  const handleRalSelect = (ral: RalColor) => {
    setConfig((cfg) => ({
      ...cfg,
      color: "ral",
      ralCode: ral.code,
      ralName: ral.name,
      ralHex: ral.hex,
    }));
  };

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {COLORS.map((c) => {
          const active = config.color === c.id;
          const isRal = c.id === "ral";
          const swatchBg = isRal && ralPicked ? ralPicked.hex : c.hex;
          const baseName = t(`pergola.color.${c.id}`);
          const tileLabel = isRal && ralPicked ? ralPicked.code : baseName;
          const tileSub = isRal
            ? ralPicked
              ? ralPicked.name
              : t("pergola.color.ralOpen")
            : null;
          return (
            <button
              key={c.id}
              onClick={() => {
                if (isRal) {
                  setRalOpen(true);
                } else {
                  setConfig((cfg) => ({
                    ...cfg,
                    color: c.id,
                    ralCode: undefined,
                    ralName: undefined,
                    ralHex: undefined,
                  }));
                }
              }}
              className={cn(
                "group relative rounded-xl border overflow-hidden transition-all text-left",
                active
                  ? "border-primary shadow-[0_0_30px_hsl(var(--primary)/0.3)] -translate-y-0.5"
                  : "border-border hover:border-primary/50",
              )}
            >
              <div className="h-28 w-full" style={{ background: swatchBg }} />
              <div className="p-3 bg-card">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-sm truncate">{tileLabel}</span>
                  {active && <Check className="w-4 h-4 text-primary shrink-0" />}
                </div>
                <div className="text-[11px] mt-0.5 flex items-center justify-between gap-2">
                  {tileSub && (
                    <span className="text-foreground/50 truncate">{tileSub}</span>
                  )}
                </div>
              </div>
            </button>
          );
        })}
      </div>

      <RalPickerDialog
        open={ralOpen}
        onOpenChange={setRalOpen}
        selectedCode={config.ralCode}
        onSelect={handleRalSelect}
      />
    </>
  );
}

// ----- Step 3 -----
function StepRoof({
  config,
  setConfig,
  onRoofChange,
}: {
  config: Config;
  setConfig: React.Dispatch<React.SetStateAction<Config>>;
  onRoofChange: (r: RoofId) => void;
}) {
  const { t } = useLanguage();
  return (
    <div className="space-y-8">
      <div>
        <div className="text-xs uppercase tracking-wider text-foreground/60 mb-3">{t("pergola.roof.title")}</div>
        <div className="grid md:grid-cols-3 gap-4">
          {ROOF_TYPES.map((r) => {
            const active = config.roof === r.id;
            return (
              <button
                key={r.id}
                onClick={() => onRoofChange(r.id)}
                className={cn(
                  "rounded-xl border p-5 text-left transition-all",
                  active
                    ? "border-primary bg-primary/5 shadow-[0_0_30px_hsl(var(--primary)/0.2)]"
                    : "border-border hover:border-primary/50",
                )}
              >
                <div className="flex items-center justify-between mb-3">
                  <div
                    className={cn(
                      "w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all",
                      active
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-border bg-background/40 group-hover:border-primary/60",
                    )}
                  >
                    {active && <Check className="w-3.5 h-3.5" strokeWidth={3} />}
                  </div>
                </div>
                <div className="font-medium mb-1">{t(`pergola.roof.${r.id}`)}</div>
                <div className="text-xs text-foreground/50">{t(`pergola.roof.${r.id}.desc`)}</div>
              </button>
            );
          })}
        </div>
      </div>

      <div>
        <div className="text-xs uppercase tracking-wider text-foreground/60 mb-3">{t("pergola.transparency.title")}</div>
        <div className="grid md:grid-cols-2 gap-4">
          {TRANSPARENCIES.map((tr) => {
            const disabled = false;
            const active = config.transparency === tr.id;
            return (
              <button
                key={tr.id}
                disabled={disabled}
                onClick={() => setConfig((c) => ({ ...c, transparency: tr.id }))}
                className={cn(
                  "rounded-xl border p-5 text-left transition-all",
                  active && !disabled
                    ? "border-primary bg-primary/5"
                    : "border-border hover:border-primary/50",
                  disabled && "opacity-40 cursor-not-allowed",
                )}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium">{t(`pergola.transparency.${tr.id}`)}</span>
                  {active && !disabled && <Check className="w-4 h-4 text-primary" />}
                </div>
                <div className="text-xs text-foreground/50">{t(`pergola.transparency.${tr.id}.desc`)}</div>
                {disabled && (
                  <div className="text-[11px] text-destructive mt-2">
                    {t("pergola.transparency.izoOnlyClear")}
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ----- Step 4 -----
function StepExtras({
  config,
  setConfig,
}: {
  config: Config;
  setConfig: React.Dispatch<React.SetStateAction<Config>>;
}) {
  const { t } = useLanguage();
  const mountingOptions = [
    { id: false, name: t("pergola.mounting.no"), desc: t("pergola.mounting.no.desc") },
    { id: true, name: t("pergola.mounting.yes"), desc: t("pergola.mounting.yes.desc") },
  ];
  return (
    <div className="space-y-8">
      <div>
        <div className="text-xs uppercase tracking-wider text-foreground/60 mb-3">{t("pergola.mounting.title")}</div>
        <div className="grid md:grid-cols-2 gap-4">
          {mountingOptions.map((m) => {
            const active = config.mounting === m.id;
            return (
              <button
                key={String(m.id)}
                onClick={() => setConfig((c) => ({ ...c, mounting: m.id }))}
                className={cn(
                  "rounded-xl border p-5 text-left transition-all",
                  active ? "border-primary bg-primary/5" : "border-border hover:border-primary/50",
                )}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-medium">{m.name}</span>
                  {active && <Check className="w-4 h-4 text-primary" />}
                </div>
                <div className="text-xs text-foreground/50 mb-2">{m.desc}</div>
              </button>
            );
          })}
        </div>
      </div>

      <div>
        <div className="text-xs uppercase tracking-wider text-foreground/60 mb-3">{t("pergola.extras.title")}</div>
        <button
          onClick={() => setConfig((c) => ({ ...c, led: !c.led }))}
          className={cn(
            "w-full rounded-xl border p-5 text-left transition-all flex items-center justify-between",
            config.led ? "border-primary bg-primary/5" : "border-border hover:border-primary/50",
          )}
        >
          <div>
            <div className="font-medium mb-1">{t("pergola.led.title")}</div>
            <div className="text-xs text-foreground/50">{t("pergola.led.desc")}</div>
          </div>
          <div className="text-right">
            <div
              className={cn(
                "mt-2 w-10 h-6 rounded-full relative transition-colors",
                config.led ? "bg-primary" : "bg-secondary",
              )}
            >
              <div
                className={cn(
                  "absolute top-0.5 w-5 h-5 rounded-full bg-background transition-all",
                  config.led ? "left-[18px]" : "left-0.5",
                )}
              />
            </div>
          </div>
        </button>
      </div>

      <div>
        <div className="text-xs uppercase tracking-wider text-foreground/60 mb-3">{t("pergola.delivery.title")}</div>
        <div className="rounded-xl border border-border p-5">
          <label className="block text-sm font-medium mb-1">{t("pergola.delivery.km.label")}</label>
          <div className="text-xs text-foreground/50 mb-3">{t("pergola.delivery.km.desc")}</div>
          <Input
            type="number"
            min={0}
            step={1}
            value={config.deliveryKm || ""}
            onChange={(e) => {
              const v = Number(e.target.value);
              setConfig((c) => ({ ...c, deliveryKm: Number.isFinite(v) && v > 0 ? v : 0 }));
            }}
            placeholder="0"
            className="max-w-[200px]"
          />
        </div>
      </div>
    </div>
  );
}

// ----- Step 5 -----
function StepLead({
  form,
  setForm,
  errors,
}: {
  form: LeadForm;
  setForm: React.Dispatch<React.SetStateAction<LeadForm>>;
  errors: Partial<Record<keyof LeadForm, string>>;
}) {
  const { t } = useLanguage();
  const field = (
    key: keyof LeadForm,
    label: string,
    type: string = "text",
    Comp: typeof Input | typeof Textarea = Input,
  ) => (
    <div className="relative">
      <Comp
        type={type as never}
        value={form[key] as string}
        onChange={(e) => setForm((f) => ({ ...f, [key]: e.target.value }))}
        placeholder=" "
        className={cn(
          "peer pt-5",
          errors[key] && "border-destructive focus-visible:ring-destructive",
        )}
      />
      <label className="absolute left-3 top-1.5 text-[11px] text-foreground/50 uppercase tracking-wider pointer-events-none">
        {label}
      </label>
      {errors[key] && <div className="text-xs text-destructive mt-1">{errors[key]}</div>}
    </div>
  );

  return (
    <div className="space-y-5 max-w-2xl">
      <div className="grid md:grid-cols-2 gap-4">
        {field("name", t("pergola.lead.name"))}
        {field("phone", t("pergola.lead.phone"), "tel")}
        {field("email", t("pergola.lead.email"), "email")}
        {field("city", t("pergola.lead.city"))}
      </div>
      {field("note", t("pergola.lead.note"), "text", Textarea)}

      <div className="space-y-3 pt-2">
        <label className="flex items-start gap-3 cursor-pointer">
          <Checkbox
            checked={form.consentGdpr}
            onCheckedChange={(v) => setForm((f) => ({ ...f, consentGdpr: !!v }))}
          />
          <span className="text-sm text-foreground/70">
            {t("pergola.lead.consentGdpr")}
          </span>
        </label>
        {errors.consentGdpr && <div className="text-xs text-destructive">{errors.consentGdpr}</div>}
        <label className="flex items-start gap-3 cursor-pointer">
          <Checkbox
            checked={form.consentTerms}
            onCheckedChange={(v) => setForm((f) => ({ ...f, consentTerms: !!v }))}
          />
          <span className="text-sm text-foreground/70">
            {t("pergola.lead.consentTerms")}
          </span>
        </label>
        {errors.consentTerms && <div className="text-xs text-destructive">{errors.consentTerms}</div>}
      </div>
    </div>
  );
}


function StepSuccess() {
  const { t } = useLanguage();
  return (
    <div className="text-center py-12">
      <div className="w-16 h-16 mx-auto rounded-full bg-primary/15 flex items-center justify-center mb-5">
        <Check className="w-8 h-8 text-primary" />
      </div>
      <h3 className="font-display text-3xl mb-3">{t("pergola.success.title")}</h3>
      <p className="text-foreground/60 max-w-md mx-auto">
        {t("pergola.success.desc")}
      </p>
    </div>
  );
}

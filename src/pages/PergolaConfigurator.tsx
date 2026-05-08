import { useMemo, useState } from "react";
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
  ShoppingCart,
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

/**
 * PERGOLA CONFIGURATOR – Luxurelax
 * Standalone configurator. Submits to a separate PHP endpoint:
 *   POST /wp-json/luxurelax-pergola/v1/inquiry
 * (See pergola-configurator.php for backend.)
 *
 * Pricing here is ILUSTRATIVE – nahraď podľa reálneho cenníka.
 */

// ---------- Pricing (illustrative) ----------
const BASE_PRICE = 1800; // EUR base
const PRICE_PER_M2 = 220; // EUR per m² of roof area (width × depth)
const HEIGHT_SURCHARGE_PER_CM_OVER = 4; // over 250cm
const HEIGHT_BASELINE = 250;

const COLORS = [
  { id: "anthracite", name: "Antracit", hex: "#2b2b2e", premium: false },
  { id: "white", name: "Biela", hex: "#f4f4f0", premium: false },
  { id: "brown", name: "Hnedá", hex: "#5a3a25", premium: false },
  { id: "golden_oak", name: "Zlatý dub", hex: "#b6883f", premium: true },
  { id: "walnut", name: "Orech", hex: "#3a2418", premium: true },
  { id: "ral", name: "RAL vlastná farba", hex: "linear-gradient(135deg,#e94e77,#5b8def,#7ed957)", premium: true },
] as const;

const ROOF_TYPES = [
  {
    id: "polycarbonate",
    name: "Polykarbonát",
    desc: "Ľahký, odolný a cenovo dostupný materiál.",
    pricePerM2: 0,
  },
  {
    id: "safety_glass",
    name: "Bezpečnostné sklo",
    desc: "Kalené sklo s prémiovým vzhľadom.",
    pricePerM2: 90,
  },
  {
    id: "izo_glass_24",
    name: "IZO Sklo 24",
    desc: "Izolačné dvojsklo – maximálny komfort celoročne.",
    pricePerM2: 180,
  },
] as const;

const TRANSPARENCIES = [
  { id: "milky", name: "Mliečne", desc: "Difúzne svetlo, viac súkromia." },
  { id: "clear", name: "Číre", desc: "Maximálny priezor a presvetlenie." },
] as const;

const MOUNTING_PRICE = 850;
const LED_PRICE = 420;
const REINFORCEMENT_PRICE = 180; // EUR – výstuha pri šírkach v hraničnom pásme
const EXTRA_POST_PRICE = 220; // EUR za každý stĺp navyše nad 2 základné

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
  ralCode?: string;   // vybraný RAL kód, keď color === "ral"
  ralName?: string;   // čitateľný názov vybraného RAL odtieňa
  ralHex?: string;    // hex aproximácia pre náhľad
  roof: RoofId;
  transparency: TransId;
  mounting: boolean;
  led: boolean;
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
  { id: 1, title: "Rozmery", subtitle: "Zadajte rozmery vašej pergoly", icon: Ruler },
  { id: 2, title: "Farba", subtitle: "Vyberte farbu konštrukcie", icon: Palette },
  { id: 3, title: "Strecha", subtitle: "Typ zastrešenia a priehľadnosť", icon: Square },
  { id: 4, title: "Montáž a doplnky", subtitle: "Doladenie posledných detailov", icon: Wrench },
  { id: 5, title: "Dokončenie", subtitle: "Pridajte do košíka alebo pošlite nezáväzný dopyt", icon: Send },
];

const MIN_W = 200;
const MAX_W = 5000;
const MIN_D = 200;
const MAX_D = 600;
const MIN_H = 200;
const MAX_H = 350;

const formatPrice = (n: number) =>
  new Intl.NumberFormat("sk-SK", { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(n);

export default function PergolaConfigurator() {
  const [step, setStep] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [finishMode, setFinishMode] = useState<"choice" | "inquiry">("choice");
  const [addingToCart, setAddingToCart] = useState(false);

  const [config, setConfig] = useState<Config>({
    width: 400,
    depth: 350,
    height: 250,
    color: "anthracite",
    roof: "polycarbonate",
    transparency: "clear",
    mounting: false,
    led: false,
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

  const price = useMemo(() => {
    const roof = ROOF_TYPES.find((r) => r.id === config.roof)!;
    const colorObj = COLORS.find((c) => c.id === config.color)!;
    let p = BASE_PRICE;
    p += areaM2 * PRICE_PER_M2;
    p += areaM2 * roof.pricePerM2;
    if (config.height > HEIGHT_BASELINE) {
      p += (config.height - HEIGHT_BASELINE) * HEIGHT_SURCHARGE_PER_CM_OVER;
    }
    if (colorObj.premium) p *= 1.1;
    if (config.mounting) p += MOUNTING_PRICE;
    if (config.led) p += LED_PRICE;
    p += Math.max(0, postLayout.posts - 2) * EXTRA_POST_PRICE;
    if (postLayout.reinforcement) p += REINFORCEMENT_PRICE;
    return Math.round(p);
  }, [config, areaM2, postLayout]);

  const colorObj = COLORS.find((c) => c.id === config.color)!;
  const ralPicked = config.color === "ral" ? findRal(config.ralCode) : undefined;
  // Display name & hex respect RAL selection when color === "ral"
  const colorDisplayName = ralPicked
    ? `${ralPicked.code} – ${ralPicked.name}`
    : colorObj.name;
  const colorDisplayHex = ralPicked ? ralPicked.hex : colorObj.hex;
  const roofObj = ROOF_TYPES.find((r) => r.id === config.roof)!;
  const transObj = TRANSPARENCIES.find((t) => t.id === config.transparency)!;

  // IZO Sklo 24 forces "clear"
  const handleRoofChange = (roof: RoofId) => {
    setConfig((c) => ({
      ...c,
      roof,
      transparency: roof === "izo_glass_24" ? "clear" : c.transparency,
    }));
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
      if (!form.name.trim()) e.name = "Zadajte meno";
      if (!form.phone.trim() || form.phone.trim().length < 6) e.phone = "Zadajte platné telefónne číslo";
      if (!/^\S+@\S+\.\S+$/.test(form.email)) e.email = "Zadajte platný e-mail";
      if (!form.city.trim()) e.city = "Zadajte mesto";
      if (!form.consentGdpr) e.consentGdpr = "Vyžadovaný súhlas";
      if (!form.consentTerms) e.consentTerms = "Vyžadovaný súhlas";
      setErrors(e);
      return Object.keys(e).length === 0;
    }
    return true;
  };

  const next = () => {
    if (!validateStep(step)) {
      toast({ title: "Skontrolujte zadané údaje", variant: "destructive" });
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
          roofName: roofObj.name,
          transparencyName: transObj.name,
          areaM2: Number(areaM2.toFixed(2)),
        },
        price,
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
      if (!res.ok) throw new Error("Nepodarilo sa odoslať dopyt");
      setSubmitted(true);
    } catch (err) {
      toast({
        title: "Chyba pri odosielaní",
        description: (err as Error).message,
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  const addToCart = async () => {
    setAddingToCart(true);
    try {
      const endpoint =
        (import.meta.env.VITE_PERGOLA_CART_URL as string | undefined) ||
        "https://www.luxurelax.sk/wp-json/luxurelax-pergola/v1/add-to-cart";

      const payload = {
        config: {
          ...config,
          colorName: colorDisplayName,
          roofName: roofObj.name,
          transparencyName: transObj.name,
          areaM2: Number(areaM2.toFixed(2)),
          posts: postLayout.posts,
          reinforcement: postLayout.reinforcement,
        },
        price,
        currency: "EUR",
      };

      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(payload),
      });
      const data = await res
        .json()
        .catch(() => ({}) as { redirect_url?: string; cart_url?: string; error?: string });
      if (!res.ok) {
        throw new Error(data?.error || `Nepodarilo sa pridať do košíka (HTTP ${res.status})`);
      }
      const redirectUrl =
        data?.redirect_url ||
        data?.cart_url ||
        (window.location.hostname.endsWith(".com")
          ? "https://www.luxurelax.com/cart/"
          : "https://www.luxurelax.sk/kosik/");
      window.location.href = redirectUrl;
    } catch (err) {
      toast({
        title: "Chyba",
        description: (err as Error).message,
        variant: "destructive",
      });
      setAddingToCart(false);
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
              <Sparkles className="w-3.5 h-3.5" /> Luxurelax Pergoly
            </div>
            <h1 className="font-display text-4xl md:text-5xl font-bold mb-3">
              Konfigurátor pergoly
            </h1>
            <p className="text-foreground/60">
              Navrhnite si pergolu na mieru – krok za krokom. Nezáväzná cenová ponuka do pár minút.
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
                    <span className="text-[11px] uppercase tracking-wider hidden md:block">{s.title}</span>
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
                      Krok {step} / {STEPS.length}
                    </div>
                    <h2 className="font-display text-3xl md:text-4xl font-semibold mb-2">
                      {STEPS[step - 1].title}
                    </h2>
                    <p className="text-foreground/60">{STEPS[step - 1].subtitle}</p>
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
                  {step === 5 && !submitted && finishMode === "choice" && (
                    <StepChoice
                      price={price}
                      onAddToCart={addToCart}
                      onInquiry={() => setFinishMode("inquiry")}
                      addingToCart={addingToCart}
                    />
                  )}
                  {step === 5 && !submitted && finishMode === "inquiry" && (
                    <StepLead form={form} setForm={setForm} errors={errors} />
                  )}
                  {step === 5 && submitted && <StepSuccess />}
                </motion.div>
              </AnimatePresence>

              {/* Navigation */}
              {!submitted && (
                <div className="flex justify-between items-center mt-6">
                  <Button
                    variant="ghost"
                    onClick={() => {
                      if (step === 5 && finishMode === "inquiry") {
                        setFinishMode("choice");
                      } else {
                        prev();
                      }
                    }}
                    disabled={step === 1}
                  >
                    <ChevronLeft className="w-4 h-4" /> Späť
                  </Button>
                  {step < STEPS.length ? (
                    <Button variant="luxury" size="lg" onClick={next}>
                      Pokračovať <ChevronRight className="w-4 h-4" />
                    </Button>
                  ) : finishMode === "inquiry" ? (
                    <Button variant="luxury" size="lg" onClick={submit} disabled={submitting}>
                      {submitting ? (
                        <><Loader2 className="w-4 h-4 animate-spin" /> Odosielam…</>
                      ) : (
                        <>Odoslať nezáväzný dopyt <Send className="w-4 h-4" /></>
                      )}
                    </Button>
                  ) : (
                    <div />
                  )}
                </div>
              )}
            </div>

            {/* Summary panel */}
            <aside className="lg:sticky lg:top-28 self-start">
              <div className="rounded-2xl border border-border bg-gradient-to-b from-card to-card/40 backdrop-blur-md overflow-hidden">
                <PergolaPreview config={config} colorHex={colorDisplayHex} postLayout={postLayout} />
                <div className="p-6">
                  <div className="text-xs uppercase tracking-widest text-primary mb-1">Vaša konfigurácia</div>
                  <h3 className="font-display text-2xl mb-5">Pergola na mieru</h3>

                  <SummaryRow label="Rozmery" value={`${config.width} × ${config.depth} × ${config.height} cm`} />
                  <SummaryRow label="Plocha strechy" value={`${areaM2.toFixed(2)} m²`} />
                  <SummaryRow label="Farba" value={colorDisplayName + (colorObj.premium ? " (+10%)" : "")} />
                  <SummaryRow label="Strecha" value={roofObj.name} />
                  <SummaryRow label="Priehľadnosť" value={transObj.name} />
                  <SummaryRow
                    label="Stĺpy"
                    value={`${postLayout.posts}× stĺp${postLayout.reinforcement ? " + výztuha" : ""}`}
                  />
                  <SummaryRow label="Montáž" value={config.mounting ? "Áno" : "Nie"} />
                  <SummaryRow label="LED osvetlenie" value={config.led ? "Áno" : "Nie"} />

                  <div className="mt-6 pt-5 border-t border-border">
                    <div className="text-xs text-foreground/60 uppercase tracking-widest mb-1">
                      Orientačná cena
                    </div>
                    <div className="font-display text-4xl font-bold text-primary">
                      {formatPrice(price)}
                    </div>
                    <div className="text-xs text-foreground/40 mt-1">vrátane DPH</div>
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
          <div>
            <div className="text-[10px] uppercase tracking-widest text-foreground/50">Cena</div>
            <div className="font-display text-xl font-bold text-primary">{formatPrice(price)}</div>
          </div>
          {step < STEPS.length ? (
            <Button variant="luxury" onClick={next}>
              Pokračovať <ChevronRight className="w-4 h-4" />
            </Button>
          ) : finishMode === "inquiry" ? (
            <Button variant="luxury" onClick={submit} disabled={submitting}>
              {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <>Odoslať <Send className="w-4 h-4" /></>}
            </Button>
          ) : (
            <Button variant="luxury" onClick={addToCart} disabled={addingToCart}>
              {addingToCart ? <Loader2 className="w-4 h-4 animate-spin" /> : <>Do košíka <ShoppingCart className="w-4 h-4" /></>}
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

  // Ground plane (slightly larger than footprint)
  const pad = Math.max(W, D) * 0.18;
  const G1 = iso(-pad, -pad, 0);
  const G2 = iso(W + pad, -pad, 0);
  const G3 = iso(W + pad, D + pad, 0);
  const G4 = iso(-pad, D + pad, 0);

  // Back wall (visual context — like in reference)
  const wallH = H * 1.4;
  const W1 = iso(-pad, D + pad, 0);
  const W2 = iso(W + pad, D + pad, 0);
  const W3 = iso(W + pad, D + pad, wallH);
  const W4 = iso(-pad, D + pad, wallH);

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
          <linearGradient id="pergola-glass" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="rgba(220,235,255,0.55)" />
            <stop offset="100%" stopColor="rgba(180,210,235,0.25)" />
          </linearGradient>
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
              {/* Back posts (drawn first, behind roof) */}
              <path d={postPath(D0, D1)} stroke={frameColor} strokeWidth={4} strokeLinecap="round" />
              <path d={postPath(C0, C1)} stroke={frameColor} strokeWidth={4} strokeLinecap="round" />
              {intermediates.map((x, i) => {
                const a = iso(x, D, 0);
                const b = iso(x, D, H);
                return (
                  <path
                    key={`back-${i}`}
                    d={postPath(a, b)}
                    stroke={frameColor}
                    strokeWidth={4}
                    strokeLinecap="round"
                  />
                );
              })}

              {/* Roof slab (glass / polycarbonate) */}
              <polygon
                points={`${A1[0]},${A1[1]} ${B1[0]},${B1[1]} ${C1[0]},${C1[1]} ${D1[0]},${D1[1]}`}
                fill="url(#pergola-glass)"
                stroke={frameColor}
                strokeWidth={3}
              />
              {/* Roof slats */}
              <g stroke={frameColor} strokeWidth={1} opacity={0.55}>
                {slats.map((d, i) => (
                  <path key={i} d={d} />
                ))}
              </g>

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
          Šírka {fmt(W)}
        </text>
        {/* Depth — right edge */}
        <text
          x={(B0[0] + C0[0]) / 2 + 12}
          y={(B0[1] + C0[1]) / 2 + 4}
          fontSize="11"
          fill="hsl(var(--foreground) / 0.85)"
        >
          Hĺbka {fmt(D)}
        </text>
        {/* Height — right post */}
        <text
          x={B1[0] + 10}
          y={(B0[1] + B1[1]) / 2}
          fontSize="11"
          fill="hsl(var(--foreground) / 0.85)"
        >
          Výška {fmt(H)}
        </text>
      </svg>
      <div className="absolute top-3 left-3 text-[10px] uppercase tracking-widest text-foreground/40">
        Náhľad
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
  const dims: Array<{ key: "width" | "depth" | "height"; label: string; min: number; max: number; rec: string }> = [
    { key: "width", label: "Šírka", min: MIN_W, max: MAX_W, rec: "Odporúčané 300–600 cm" },
    { key: "depth", label: "Hĺbka", min: MIN_D, max: MAX_D, rec: "Odporúčané 300–500 cm" },
    { key: "height", label: "Výška", min: MIN_H, max: MAX_H, rec: "Odporúčané 240–280 cm" },
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
                onChange={(e) =>
                  setConfig((c) => ({
                    ...c,
                    [d.key]: Math.max(d.min, Math.min(d.max, Number(e.target.value) || d.min)),
                  }))
                }
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
            <span>min {d.min} cm</span>
            <span>max {d.max} cm</span>
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
          // Pre RAL dlaždicu zobraz vybraný hex (ak existuje), inak farebný gradient vzorkovníka
          const swatchBg = isRal && ralPicked
            ? ralPicked.hex
            : c.hex.startsWith("linear")
            ? c.hex
            : c.hex;
          const tileLabel = isRal && ralPicked ? ralPicked.code : c.name;
          const tileSub = isRal
            ? ralPicked
              ? ralPicked.name
              : "Otvoriť vzorkovník →"
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
                  {c.premium ? (
                    <span className="text-primary">+10% doplatok</span>
                  ) : (
                    <span className="text-foreground/50">bez doplatku</span>
                  )}
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
  return (
    <div className="space-y-8">
      <div>
        <div className="text-xs uppercase tracking-wider text-foreground/60 mb-3">Typ zastrešenia</div>
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
                  <Square className={cn("w-6 h-6", active ? "text-primary" : "text-foreground/40")} />
                  {active && <Check className="w-4 h-4 text-primary" />}
                </div>
                <div className="font-medium mb-1">{r.name}</div>
                <div className="text-xs text-foreground/50 mb-2">{r.desc}</div>
                <div className="text-xs text-primary">
                  {r.pricePerM2 === 0 ? "v základe" : `+${r.pricePerM2} €/m²`}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      <div>
        <div className="text-xs uppercase tracking-wider text-foreground/60 mb-3">Priehľadnosť</div>
        <div className="grid md:grid-cols-2 gap-4">
          {TRANSPARENCIES.map((t) => {
            const disabled = config.roof === "izo_glass_24" && t.id === "milky";
            const active = config.transparency === t.id;
            return (
              <button
                key={t.id}
                disabled={disabled}
                onClick={() => setConfig((c) => ({ ...c, transparency: t.id }))}
                className={cn(
                  "rounded-xl border p-5 text-left transition-all",
                  active && !disabled
                    ? "border-primary bg-primary/5"
                    : "border-border hover:border-primary/50",
                  disabled && "opacity-40 cursor-not-allowed",
                )}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium">{t.name}</span>
                  {active && !disabled && <Check className="w-4 h-4 text-primary" />}
                </div>
                <div className="text-xs text-foreground/50">{t.desc}</div>
                {disabled && (
                  <div className="text-[11px] text-destructive mt-2">
                    Pri IZO Sklo 24 nie je dostupné.
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
  return (
    <div className="space-y-8">
      <div>
        <div className="text-xs uppercase tracking-wider text-foreground/60 mb-3">Montáž</div>
        <div className="grid md:grid-cols-2 gap-4">
          {[
            { id: false, name: "Bez montáže", desc: "Doručenie a vlastná montáž.", price: 0 },
            { id: true, name: "S montážou", desc: "Profesionálna inštalácia naším tímom.", price: MOUNTING_PRICE },
          ].map((m) => {
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
                <div className="text-xs text-primary">{m.price === 0 ? "v základe" : `+${formatPrice(m.price)}`}</div>
              </button>
            );
          })}
        </div>
      </div>

      <div>
        <div className="text-xs uppercase tracking-wider text-foreground/60 mb-3">Doplnky</div>
        <button
          onClick={() => setConfig((c) => ({ ...c, led: !c.led }))}
          className={cn(
            "w-full rounded-xl border p-5 text-left transition-all flex items-center justify-between",
            config.led ? "border-primary bg-primary/5" : "border-border hover:border-primary/50",
          )}
        >
          <div>
            <div className="font-medium mb-1">LED osvetlenie</div>
            <div className="text-xs text-foreground/50">Integrované LED pre večernú atmosféru.</div>
          </div>
          <div className="text-right">
            <div className="text-sm text-primary">+{formatPrice(LED_PRICE)}</div>
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
        {field("name", "Meno a priezvisko")}
        {field("phone", "Telefón", "tel")}
        {field("email", "E-mail", "email")}
        {field("city", "Mesto")}
      </div>
      {field("note", "Poznámka", "text", Textarea)}

      <div className="space-y-3 pt-2">
        <label className="flex items-start gap-3 cursor-pointer">
          <Checkbox
            checked={form.consentGdpr}
            onCheckedChange={(v) => setForm((f) => ({ ...f, consentGdpr: !!v }))}
          />
          <span className="text-sm text-foreground/70">
            Súhlasím so spracovaním osobných údajov.
          </span>
        </label>
        {errors.consentGdpr && <div className="text-xs text-destructive">{errors.consentGdpr}</div>}
        <label className="flex items-start gap-3 cursor-pointer">
          <Checkbox
            checked={form.consentTerms}
            onCheckedChange={(v) => setForm((f) => ({ ...f, consentTerms: !!v }))}
          />
          <span className="text-sm text-foreground/70">
            Súhlasím s obchodnými podmienkami.
          </span>
        </label>
        {errors.consentTerms && <div className="text-xs text-destructive">{errors.consentTerms}</div>}
      </div>
    </div>
  );
}

function StepChoice({
  price,
  onAddToCart,
  onInquiry,
  addingToCart,
}: {
  price: number;
  onAddToCart: () => void;
  onInquiry: () => void;
  addingToCart: boolean;
}) {
  return (
    <div className="grid md:grid-cols-2 gap-5">
      <button
        onClick={onAddToCart}
        disabled={addingToCart}
        className="group text-left rounded-2xl border-2 border-primary/40 bg-primary/5 hover:bg-primary/10 hover:border-primary transition-all p-6 flex flex-col gap-4 disabled:opacity-60 disabled:cursor-wait"
      >
        <div className="w-12 h-12 rounded-full bg-primary/15 text-primary flex items-center justify-center">
          {addingToCart ? <Loader2 className="w-6 h-6 animate-spin" /> : <ShoppingCart className="w-6 h-6" />}
        </div>
        <div>
          <h3 className="font-display text-2xl mb-1">Pridať do košíka</h3>
          <p className="text-sm text-foreground/60">
            Okamžite pokračujte v objednávke. Vaša pergola bude pridaná do košíka za{" "}
            <span className="text-primary font-semibold">{formatPrice(price)}</span>.
          </p>
        </div>
        <div className="mt-auto text-xs uppercase tracking-widest text-primary opacity-0 group-hover:opacity-100 transition-opacity">
          Pokračovať na pokladnicu →
        </div>
      </button>

      <button
        onClick={onInquiry}
        className="group text-left rounded-2xl border border-border bg-card/40 hover:bg-card/70 hover:border-primary/40 transition-all p-6 flex flex-col gap-4"
      >
        <div className="w-12 h-12 rounded-full bg-foreground/10 text-foreground flex items-center justify-center">
          <Send className="w-6 h-6" />
        </div>
        <div>
          <h3 className="font-display text-2xl mb-1">Odoslať nezáväzný dopyt</h3>
          <p className="text-sm text-foreground/60">
            Vyplňte krátky formulár a my vám pripravíme nezáväznú cenovú ponuku na mieru.
          </p>
        </div>
        <div className="mt-auto text-xs uppercase tracking-widest text-foreground/50 opacity-0 group-hover:opacity-100 transition-opacity">
          Vyplniť formulár →
        </div>
      </button>
    </div>
  );
}

function StepSuccess() {
  return (
    <div className="text-center py-12">
      <div className="w-16 h-16 mx-auto rounded-full bg-primary/15 flex items-center justify-center mb-5">
        <Check className="w-8 h-8 text-primary" />
      </div>
      <h3 className="font-display text-3xl mb-3">Ďakujeme!</h3>
      <p className="text-foreground/60 max-w-md mx-auto">
        Váš dopyt sme prijali. Náš špecialista vás bude čo najskôr kontaktovať s nezáväznou cenovou ponukou.
      </p>
    </div>
  );
}

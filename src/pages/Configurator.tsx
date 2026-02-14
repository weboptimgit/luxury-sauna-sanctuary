import { useEffect, useMemo, useState, useRef, useCallback } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Check,
  ShoppingCart,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Expand,
  Loader2,
  X,
  Ruler,
  Flame,
  Lightbulb,
  Bluetooth,
  ArrowRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/hooks/use-toast";
import ConfiguratorHeader from "@/components/ConfiguratorHeader";
import ConfiguratorFooter from "@/components/ConfiguratorFooter";
import { Notice } from "@/components/ui/notice";
import { useLanguage } from "@/contexts/LanguageContext";
import { useDocumentMeta } from "@/hooks/useDocumentMeta";

import saunaBarrel from "@/assets/2M-Round-sauna-1-2-700x700.jpg";
import saunaCube from "@/assets/Frame-sauna-210×210-700x700.jpg";
import saunaTraditional from "@/assets/ModulSauna-240×250-–-Thermo-wood-33-700x700.jpg";
import saunaInterior from "@/assets/LUX-sauna-245×300-14-700x700.jpg";
import saunaHarmony from "@/assets/0TV_0205-700x700.jpg";
import hotTub from "@/assets/hot-tub.jpg";
import saunaKit from "@/assets/Sauna-accessories-kit.jpg";
import speaker from "@/assets/Bluetooth-speaker-system.png";
import ledBenches from "@/assets/LED-lighting-under-the-benches.png";
import ledBackrest from "@/assets/LED-lighting-in-the-back-supports-1.jpg";
import electricHeater from "@/assets/Harvia-CILINDRO-9kw.png";
import woodHeater from "@/assets/Harvia-M3.png";
import spruceWoodImg from "@/assets/spruce-wood.jpg";
import thermoWoodImg from "@/assets/thermo-wood.jpg";
// Farebné varianty Frame sauny - všetky farby podľa katalógu
import frameSaunaNatural from "@/assets/frame-sauna-natural.jpg";
import frameSauna1Mahagon from "@/assets/frame-sauna-1-mahagon.jpg";
import frameSauna2Teak from "@/assets/frame-sauna-2-teak.jpg";
import frameSauna3SvetlyOrech from "@/assets/frame-sauna-3-svetly-orech.jpg";
import frameSauna4ZlatyDub from "@/assets/frame-sauna-4-zlaty-dub.jpg";
import frameSauna5OlejovanaBorovica from "@/assets/frame-sauna-5-olejovana-borovica.jpg";
import frameSauna14SvetlaPopolavosiva from "@/assets/frame-sauna-14-svetla-popolavosiva.jpg";
import frameSauna15Greige from "@/assets/frame-sauna-15-greige.jpg";
import frameSauna16StudenaSiva from "@/assets/frame-sauna-16-studena-siva.jpg";
import frameSaunaAntracit from "@/assets/frame-sauna-antracit.jpg"; // No. 17
import frameSauna18TmavyOrech from "@/assets/frame-sauna-18-tmavy-orech.jpg";
import frameSauna20TmavyMahagon from "@/assets/frame-sauna-20-tmavy-mahagon.jpg";
// Farebné varianty ModulSauny - všetky farby podľa katalógu
import modulsaunaNatural from "@/assets/modulsauna-natural.jpg";
import modulsauna1Mahagon from "@/assets/modulsauna-1-mahagon.jpg";
import modulsauna2Teak from "@/assets/modulsauna-2-teak.jpg";
import modulsauna3SvetlyOrech from "@/assets/modulsauna-3-svetly-orech.jpg";
import modulsauna4ZlatyDub from "@/assets/modulsauna-4-zlaty-dub.jpg";
import modulsauna5OlejovanaBorovica from "@/assets/modulsauna-5-olejovana-borovica.jpg";
import modulsauna14SvetlaPopolavosiva from "@/assets/modulsauna-14-svetla-popolavosiva.jpg";
import modulsauna15Greige from "@/assets/modulsauna-15-greige.jpg";
import modulsauna16StudenaSiva from "@/assets/modulsauna-16-studena-siva.jpg";
import modulsauna17Antracit from "@/assets/modulsauna-17-antracit.jpg";
import modulsauna18TmavyOrech from "@/assets/modulsauna-18-tmavy-orech.jpg";
import modulsauna20TmavyMahagon from "@/assets/modulsauna-20-tmavy-mahagon.jpg";
// Farebné varianty LUX MINI sauny - všetky farby podľa katalógu
import luxminiNatural from "@/assets/luxmini-natural.jpg";
import luxmini1Mahagon from "@/assets/luxmini-1-mahagon.jpg";
import luxmini2Teak from "@/assets/luxmini-2-teak.jpg";
import luxmini3SvetlyOrech from "@/assets/luxmini-3-svetly-orech.jpg";
import luxmini4ZlatyDub from "@/assets/luxmini-4-zlaty-dub.jpg";
import luxmini5OlejovanaBorovica from "@/assets/luxmini-5-olejovana-borovica.jpg";
import luxmini14SvetlaPopolavosiva from "@/assets/luxmini-14-svetla-popolavosiva.jpg";
import luxmini15Greige from "@/assets/luxmini-15-greige.jpg";
import luxmini16StudenaSiva from "@/assets/luxmini-16-studena-siva.jpg";
import luxmini17Antracit from "@/assets/luxmini-17-antracit.jpg";
import luxmini18TmavyOrech from "@/assets/luxmini-18-tmavy-orech.jpg";
import luxmini20TmavyMahagon from "@/assets/luxmini-20-tmavy-mahagon.jpg";
// Farebné varianty 2M Round sauny - všetky farby podľa katalógu
import round2mNatural from "@/assets/2mround-natural.jpg";
import round2m1Mahagon from "@/assets/2mround-1-mahagon.jpg";
import round2m2Teak from "@/assets/2mround-2-teak.jpg";
import round2m3SvetlyOrech from "@/assets/2mround-3-svetly-orech.jpg";
import round2m4ZlatyDub from "@/assets/2mround-4-zlaty-dub.jpg";
import round2m5OlejovanaBorovica from "@/assets/2mround-5-olejovana-borovica.jpg";
import round2m14SvetlaPopolavosiva from "@/assets/2mround-14-svetla-popolavosiva.jpg";
import round2m15Greige from "@/assets/2mround-15-greige.jpg";
import round2m16StudenaSiva from "@/assets/2mround-16-studena-siva.jpg";
import round2m17Antracit from "@/assets/2mround-17-antracit.jpg";
import round2m18TmavyOrech from "@/assets/2mround-18-tmavy-orech.jpg";
import round2m20TmavyMahagon from "@/assets/2mround-20-tmavy-mahagon.jpg";
// Farebné varianty Insulated Harmony sauny
import harmony1Mahagon from "@/assets/harmony-1-mahagon.jpg";
import harmony2Teak from "@/assets/harmony-2-teak.jpg";
import harmony3SvetlyOrech from "@/assets/harmony-3-svetly-orech.jpg";
import harmony4ZlatyDub from "@/assets/harmony-4-zlaty-dub.jpg";
import harmony5OlejovanaBorovica from "@/assets/harmony-5-olejovana-borovica.jpg";
import harmony14SvetlaPopolavosiva from "@/assets/harmony-14-svetla-popolavosiva.jpg";
import harmony15Greige from "@/assets/harmony-15-greige.jpg";
import harmony16StudenaSiva from "@/assets/harmony-16-studena-siva.jpg";
import harmony17Antracit from "@/assets/harmony-17-antracit.jpg";
import harmony18TmavyOrech from "@/assets/harmony-18-tmavy-orech.jpg";
import harmony20TmavyMahagon from "@/assets/harmony-20-tmavy-mahagon.jpg";
import harmonyNatural from "@/assets/harmony-natural.jpg";
import harmonyGallery1 from "@/assets/harmony-gallery-1.jpg";
import harmonyGallery2 from "@/assets/harmony-gallery-2.jpg";
import harmonyGallery3 from "@/assets/harmony-gallery-3.jpg";
import harmonyGallery4 from "@/assets/harmony-gallery-4.jpg";
import harmonyGallery5 from "@/assets/harmony-gallery-5.jpg";
import harmonyGallery6 from "@/assets/harmony-gallery-6.jpg";
import harmonyGallery7 from "@/assets/harmony-gallery-7.jpg";

// Galérijné fotky pre jednotlivé modely (rôzne uhly pohľadu)
import frameSaunaGallery1 from "@/assets/frame-sauna-gallery-1.jpg";
import frameSaunaGallery2 from "@/assets/frame-sauna-gallery-2.jpg";
import frameSaunaGallery3 from "@/assets/frame-sauna-gallery-3.jpg";
import frameSaunaGallery4 from "@/assets/frame-sauna-gallery-4.jpg";
import frameSaunaGallery5 from "@/assets/frame-sauna-gallery-5.jpg";
import frameSaunaGallery6 from "@/assets/frame-sauna-gallery-6.jpg";
import frameSaunaGallery7 from "@/assets/frame-sauna-gallery-7.jpg";
import frameSaunaGallery8 from "@/assets/frame-sauna-gallery-8.jpg";
import frameSaunaGallery9 from "@/assets/frame-sauna-gallery-9.jpg";
import frameSaunaGallery10 from "@/assets/frame-sauna-gallery-10.jpg";
import modulsaunaGallery1 from "@/assets/modulsauna-gallery-1.jpg";
import modulsaunaGallery2 from "@/assets/modulsauna-gallery-2.jpg";
import modulsaunaGallery3 from "@/assets/modulsauna-gallery-3.jpg";
import modulsaunaGallery4 from "@/assets/modulsauna-gallery-4.jpg";
import modulsaunaGallery5 from "@/assets/modulsauna-gallery-5.jpg";
import modulsaunaGallery6 from "@/assets/modulsauna-gallery-6.jpg";
import modulsaunaGallery7 from "@/assets/modulsauna-gallery-7.jpg";
import modulsaunaGallery8 from "@/assets/modulsauna-gallery-8.jpg";
import luxminiGallery1 from "@/assets/luxmini-gallery-1.jpg";
import luxminiGallery2 from "@/assets/luxmini-gallery-2.jpg";
import luxminiGallery3 from "@/assets/luxmini-gallery-3.jpg";
import luxminiGallery4 from "@/assets/luxmini-gallery-4.jpg";
import luxminiGallery5 from "@/assets/luxmini-gallery-5.jpg";
import luxminiGallery6 from "@/assets/luxmini-gallery-6.jpg";
import luxminiGallery7 from "@/assets/luxmini-gallery-7.jpg";
import round2mGallery1 from "@/assets/2mround-gallery-1.jpg";
import round2mGallery2 from "@/assets/2mround-gallery-2.jpg";
import round2mGallery3 from "@/assets/2mround-gallery-3.jpg";
import round2mGallery4 from "@/assets/2mround-gallery-4.jpg";
import round2mGallery5 from "@/assets/2mround-gallery-5.jpg";
import round2mGallery6 from "@/assets/2mround-gallery-6.jpg";

type ProductCategory = "sauna" | "hottub";

type WoodType = "spruce" | "thermo";

type HeaterModelType = "none" | string;

type SaunaColorType =
  | "none"
  | "1-mahagon"
  | "2-teak"
  | "3-svetly-orech"
  | "4-zlaty-dub"
  | "5-olejovana-borovica"
  | "14-svetla-popolavosiva"
  | "15-greige"
  | "16-studena-siva"
  | "17-antracit"
  | "18-tmavy-orech"
  | "20-tmavy-mahagon";

type SaunaType = {
  id: string;
  name: string;
  dimensions: string;
  basePrice: number;
  image: string;
  hasWoodType: boolean;
  hasLed: boolean;
  hasExteriorLed: boolean; // Vonkajšie LED - iba pre niektoré modely
  hasBluetooth: boolean;
  hasAccessoryKit: boolean;
  hasHeater: boolean;
  hasColor: boolean;
  availableWoodTypes: WoodType[];
};

// Modely ohrievačov podľa typu
type HeaterModel = {
  id: string;
  name: string;
  price: number;
};

// Farebné swatche pre UI (bez cien) – ceny a názvy idú vždy z PHP API.
const saunaColorSwatches: Record<SaunaColorType, { nameFallback: string; colorHsl: string }> = {
  none: { nameFallback: "Bez farby (Natural)", colorHsl: "transparent" },
  "1-mahagon": { nameFallback: "Mahagón", colorHsl: "hsl(6 29% 33%)" },
  "2-teak": { nameFallback: "Teak", colorHsl: "hsl(30 60% 45%)" },
  "3-svetly-orech": { nameFallback: "Svetlý orech", colorHsl: "hsl(35 40% 50%)" },
  "4-zlaty-dub": { nameFallback: "Zlatý dub", colorHsl: "hsl(45 70% 50%)" },
  "5-olejovana-borovica": { nameFallback: "Olejovaná borovica", colorHsl: "hsl(43 60% 55%)" },
  "14-svetla-popolavosiva": { nameFallback: "Svetlá popolavosivá", colorHsl: "hsl(0 0% 45%)" },
  "15-greige": { nameFallback: "Greige", colorHsl: "hsl(30 10% 40%)" },
  "16-studena-siva": { nameFallback: "Studená sivá", colorHsl: "hsl(0 0% 35%)" },
  "17-antracit": { nameFallback: "Antracit", colorHsl: "hsl(0 0% 22%)" },
  "18-tmavy-orech": { nameFallback: "Tmavý orech", colorHsl: "hsl(25 30% 35%)" },
  "20-tmavy-mahagon": { nameFallback: "Tmavý mahagón", colorHsl: "hsl(6 35% 28%)" },
};

const isSaunaColorType = (id: string): id is SaunaColorType => {
  return Object.prototype.hasOwnProperty.call(saunaColorSwatches, id);
};

// Reálne obrázky podľa farby pre každý model sauny
// Structure: saunaId -> colorId -> imagePath
const saunaColorImages: Record<string, Record<SaunaColorType, string>> = {
  "frame-balance": {
    none: frameSaunaNatural,
    "1-mahagon": frameSauna1Mahagon,
    "2-teak": frameSauna2Teak,
    "3-svetly-orech": frameSauna3SvetlyOrech,
    "4-zlaty-dub": frameSauna4ZlatyDub,
    "5-olejovana-borovica": frameSauna5OlejovanaBorovica,
    "14-svetla-popolavosiva": frameSauna14SvetlaPopolavosiva,
    "15-greige": frameSauna15Greige,
    "16-studena-siva": frameSauna16StudenaSiva,
    "17-antracit": frameSaunaAntracit,
    "18-tmavy-orech": frameSauna18TmavyOrech,
    "20-tmavy-mahagon": frameSauna20TmavyMahagon,
  },
  "modul-thermo": {
    none: modulsaunaNatural,
    "1-mahagon": modulsauna1Mahagon,
    "2-teak": modulsauna2Teak,
    "3-svetly-orech": modulsauna3SvetlyOrech,
    "4-zlaty-dub": modulsauna4ZlatyDub,
    "5-olejovana-borovica": modulsauna5OlejovanaBorovica,
    "14-svetla-popolavosiva": modulsauna14SvetlaPopolavosiva,
    "15-greige": modulsauna15Greige,
    "16-studena-siva": modulsauna16StudenaSiva,
    "17-antracit": modulsauna17Antracit,
    "18-tmavy-orech": modulsauna18TmavyOrech,
    "20-tmavy-mahagon": modulsauna20TmavyMahagon,
  },
  "lux-mini": {
    none: luxminiNatural,
    "1-mahagon": luxmini1Mahagon,
    "2-teak": luxmini2Teak,
    "3-svetly-orech": luxmini3SvetlyOrech,
    "4-zlaty-dub": luxmini4ZlatyDub,
    "5-olejovana-borovica": luxmini5OlejovanaBorovica,
    "14-svetla-popolavosiva": luxmini14SvetlaPopolavosiva,
    "15-greige": luxmini15Greige,
    "16-studena-siva": luxmini16StudenaSiva,
    "17-antracit": luxmini17Antracit,
    "18-tmavy-orech": luxmini18TmavyOrech,
    "20-tmavy-mahagon": luxmini20TmavyMahagon,
  },
  "round-2m": {
    none: round2mNatural,
    "1-mahagon": round2m1Mahagon,
    "2-teak": round2m2Teak,
    "3-svetly-orech": round2m3SvetlyOrech,
    "4-zlaty-dub": round2m4ZlatyDub,
    "5-olejovana-borovica": round2m5OlejovanaBorovica,
    "14-svetla-popolavosiva": round2m14SvetlaPopolavosiva,
    "15-greige": round2m15Greige,
    "16-studena-siva": round2m16StudenaSiva,
    "17-antracit": round2m17Antracit,
    "18-tmavy-orech": round2m18TmavyOrech,
    "20-tmavy-mahagon": round2m20TmavyMahagon,
  },
  "harmony-insulated": {
    none: harmonyNatural,
    "1-mahagon": harmony1Mahagon,
    "2-teak": harmony2Teak,
    "3-svetly-orech": harmony3SvetlyOrech,
    "4-zlaty-dub": harmony4ZlatyDub,
    "5-olejovana-borovica": harmony5OlejovanaBorovica,
    "14-svetla-popolavosiva": harmony14SvetlaPopolavosiva,
    "15-greige": harmony15Greige,
    "16-studena-siva": harmony16StudenaSiva,
    "17-antracit": harmony17Antracit,
    "18-tmavy-orech": harmony18TmavyOrech,
    "20-tmavy-mahagon": harmony20TmavyMahagon,
  },
  // alias pre prípad, že v PHP je použitý opačný slug
  "insulated-harmony": {
    none: harmonyNatural,
    "1-mahagon": harmony1Mahagon,
    "2-teak": harmony2Teak,
    "3-svetly-orech": harmony3SvetlyOrech,
    "4-zlaty-dub": harmony4ZlatyDub,
    "5-olejovana-borovica": harmony5OlejovanaBorovica,
    "14-svetla-popolavosiva": harmony14SvetlaPopolavosiva,
    "15-greige": harmony15Greige,
    "16-studena-siva": harmony16StudenaSiva,
    "17-antracit": harmony17Antracit,
    "18-tmavy-orech": harmony18TmavyOrech,
    "20-tmavy-mahagon": harmony20TmavyMahagon,
  },
};

// Galérijné fotky pre každý model (rôzne uhly pohľadu - nemenia sa podľa farby)
const saunaGalleryImages: Record<string, string[]> = {
  "frame-balance": [
    frameSaunaGallery1,
    frameSaunaGallery2,
    frameSaunaGallery3,
    frameSaunaGallery4,
    frameSaunaGallery5,
    frameSaunaGallery6,
    frameSaunaGallery7,
    frameSaunaGallery8,
    frameSaunaGallery9,
    frameSaunaGallery10,
  ],
  "modul-thermo": [
    modulsaunaGallery1,
    modulsaunaGallery2,
    modulsaunaGallery3,
    modulsaunaGallery4,
    modulsaunaGallery5,
    modulsaunaGallery6,
    modulsaunaGallery7,
    modulsaunaGallery8,
  ],
  "lux-mini": [
    luxminiGallery1,
    luxminiGallery2,
    luxminiGallery3,
    luxminiGallery4,
    luxminiGallery5,
    luxminiGallery6,
    luxminiGallery7,
  ],
  "round-2m": [round2mGallery1, round2mGallery2, round2mGallery3, round2mGallery4, round2mGallery5, round2mGallery6],
  "harmony-insulated": [
    harmonyGallery1,
    harmonyGallery2,
    harmonyGallery3,
    harmonyGallery4,
    harmonyGallery5,
    harmonyGallery6,
    harmonyGallery7,
  ],
  // alias pre prípad, že v PHP je použitý opačný slug
  "insulated-harmony": [
    harmonyGallery1,
    harmonyGallery2,
    harmonyGallery3,
    harmonyGallery4,
    harmonyGallery5,
    harmonyGallery6,
    harmonyGallery7,
  ],
};

// UI meta pre sauna typy – len lokálne obrázky, všetko ostatné z PHP API.
type SaunaTypePreset = {
  image: string;
};

const saunaTypePresets: Record<string, SaunaTypePreset> = {
  "frame-balance": { image: saunaCube },
  "modul-thermo": { image: saunaTraditional },
  "lux-mini": { image: saunaInterior },
  "round-2m": { image: saunaBarrel },
  "harmony-insulated": { image: saunaHarmony },
  "insulated-harmony": { image: saunaHarmony },
};

type ConfigOption = {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image?: string;
  description?: string;
};

type ApiOption = {
  id: string;
  label: string;
  price: number;
  originalPrice?: number;
  description?: string;
};

type ApiSaunaType = {
  id: string;
  label: string;
  basePrice: number;
  dimensions: string;
  woodTypes: WoodType[];
  woodTypePrices?: Record<WoodType, number>;
  hasWoodType: boolean;
  hasExteriorLed: boolean;
  hasLed: boolean;
  hasBluetooth: boolean;
  hasAccessoryKit: boolean;
  hasHeater: boolean;
  hasColor: boolean;
};

type ApiHeaterModel = {
  [key: string]: { label: string; price: number };
};

type ApiConfig = {
  products: { sauna: number; hottub: number };
  saunaTypes: ApiSaunaType[];
  heaterModels: {
    electric: ApiHeaterModel;
    wood: ApiHeaterModel;
  };
  exteriorLed: { label: string; price: number };
  sauna: {
    basePrice?: number;
    woodTypes?: { [key: string]: { label: string; price: number } };
    heaterTypes: ApiOption[];
    ledOptions: ApiOption[];
    bluetoothOptions: ApiOption[];
    accessoryKitOptions: ApiOption[];
    colorOptions: ApiOption[];
  };
  hottub: {
    basePrice: number;
    sizeOptions: ApiOption[];
    jetsOptions: ApiOption[];
    ledOptions: ApiOption[];
    coverOptions: ApiOption[];
    colorOptions: ApiOption[];
  };
};

const toUIOptions = (api: ApiOption[] | undefined, withImages?: Record<string, string>): ConfigOption[] => {
  if (!api) return [];
  return api.map((o) => ({
    id: o.id,
    name: o.label,
    price: Number(o.price || 0),
    originalPrice: o.originalPrice,
    description: o.description,
    image: withImages?.[o.id],
  }));
};

const Configurator = () => {
  const { toast } = useToast();
  const { t, language } = useLanguage();
  const { modelSlug } = useParams<{ modelSlug?: string }>();
  const navigate = useNavigate();
  const location = useLocation();

  // --- API CONFIG ---
  const [apiConfig, setApiConfig] = useState<ApiConfig | null>(null);
  const [isConfigLoading, setIsConfigLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    (async () => {
      try {
        const res = await fetch(`/wp-json/sauna/v1/config?lang=${language}`, {
          credentials: "include",
        });
        if (!res.ok) throw new Error("Config sa nepodarilo načítať");
        const data = (await res.json()) as ApiConfig;

        if (mounted) setApiConfig(data);
      } catch (e) {
        console.error(e);
        toast({
          title: t("error.generic"),
          description: t("error.loadConfigShort"),
          variant: "destructive",
        });
      } finally {
        if (mounted) setIsConfigLoading(false);
      }
    })();

    return () => {
      mounted = false;
    };
  }, [toast, language]);

  // Výber kategórie produktu (sauna / kaďa)
  const [productCategory, setProductCategory] = useState<ProductCategory | null>(null);

  // Výber typu sauny
  const [selectedSaunaType, setSelectedSaunaType] = useState<SaunaType | null>(null);

  const metaTitle = useMemo(() => {
    const base = language === "en" ? "LuxuRelax | Configurator" : "LuxuRelax | Konfigurátor";
    if (selectedSaunaType) return `${selectedSaunaType.name} | ${base}`;
    return base;
  }, [language, selectedSaunaType]);

  useDocumentMeta(
    metaTitle,
    language === "en"
      ? "Configure your dream sauna or hot tub. Choose wood type, heater, lighting and accessories."
      : "Nakonfigurujte si svoju vysnívanú saunu alebo kaďu. Vyberte si typ dreva, ohrievač, osvetlenie a príslušenstvo.",
  );

  // Sauna konfigurácia (ids musia sedieť s PHP configom)
  const [saunaConfig, setSaunaConfig] = useState({
    heaterType: "none",
    heaterModel: "none" as HeaterModelType, // Konkrétny model ohrievača
    led: [] as string[],
    exteriorLed: false, // Vonkajšie LED - iba pre ModulSaunu
    bluetooth: "none",
    accessoryKit: "none",
    color: "none" as SaunaColorType,
    woodType: "spruce" as WoodType,
  });

  // Kaďa konfigurácia
  const [hotTubConfig, setHotTubConfig] = useState({
    size: "standard",
    jets: "none",
    led: "none",
    cover: "none",
    color: "none",
  });

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [showScrollIndicator, setShowScrollIndicator] = useState(true);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const handleScroll = useCallback((e: React.UIEvent<HTMLDivElement>) => {
    const target = e.target as HTMLDivElement;
    if (target.scrollTop > 50) setShowScrollIndicator(false);
  }, []);

  // --- LED multi helpers ---
  const ledSelected = saunaConfig.led ?? [];
  const isLedSelected = (id: string) => ledSelected.includes(id);
  const toggleLed = (id: string) => {
    setSaunaConfig((prev) => {
      const current = prev.led ?? [];
      const next = current.includes(id) ? current.filter((x) => x !== id) : [...current, id];
      return { ...prev, led: next };
    });
  };

  const resetLed = () => {
    setSaunaConfig((prev) => ({ ...prev, led: [] }));
  };

  // --- Images pre galériu - mení sa podľa vybranej farby ---
  const currentSaunaImage = useMemo(() => {
    if (!selectedSaunaType) return saunaBarrel;

    // Ak má farbu a existuje mapa farieb pre tento model
    if (selectedSaunaType.hasColor && saunaColorImages[selectedSaunaType.id]) {
      return saunaColorImages[selectedSaunaType.id][saunaConfig.color] || selectedSaunaType.image;
    }

    return selectedSaunaType.image;
  }, [selectedSaunaType, saunaConfig.color]);

  const images = useMemo(() => {
    if (productCategory === "hottub") {
      return [hotTub, saunaInterior, saunaCube];
    }
    if (selectedSaunaType) {
      // Hlavný obrázok (mení sa podľa farby) + galérijné fotky (statické)
      const galleryPhotos = saunaGalleryImages[selectedSaunaType.id] || [];
      return [currentSaunaImage, ...galleryPhotos];
    }
    return [saunaBarrel, saunaInterior, saunaCube, saunaTraditional];
  }, [productCategory, selectedSaunaType, currentSaunaImage]);

  // --- Mapovanie farieb na lokálne obrázky (len pre UI thumbnails) ---
  const saunaColorThumbs: Record<string, string> = {
    color1: saunaBarrel,
    color2: saunaCube,
    color3: saunaTraditional,
    color4: saunaInterior,
  };

  const saunaAccessoryImages: Record<string, string> = {
    kit: saunaKit,
  };

  const saunaSpeakerImage: Record<string, string> = {
    bluetooth: speaker,
  };

  const ledImages: Record<string, string> = {
    benches: ledBenches,
    backrest: ledBackrest,
  };

  const heaterImages: Record<string, string> = {
    electric: electricHeater,
    wood: woodHeater,
  };

  // --- UI Options z API configu ---
  const saunaHeaterTypes: ConfigOption[] = toUIOptions(apiConfig?.sauna.heaterTypes, heaterImages);
  const saunaLedOptions: ConfigOption[] = toUIOptions(apiConfig?.sauna.ledOptions, ledImages);
  const saunaBluetoothOptions: ConfigOption[] = toUIOptions(apiConfig?.sauna.bluetoothOptions, saunaSpeakerImage);
  const saunaAccessoryKitOptions: ConfigOption[] = toUIOptions(
    apiConfig?.sauna.accessoryKitOptions,
    saunaAccessoryImages,
  );
  const saunaColorOptions: ConfigOption[] = toUIOptions(apiConfig?.sauna.colorOptions, saunaColorThumbs);

  const saunaColorOptionsTyped = useMemo(
    () => saunaColorOptions.filter((o): o is ConfigOption & { id: SaunaColorType } => isSaunaColorType(o.id)),
    [saunaColorOptions],
  );

  const hotTubSizeOptions: ConfigOption[] = toUIOptions(apiConfig?.hottub.sizeOptions);
  const hotTubJetsOptions: ConfigOption[] = toUIOptions(apiConfig?.hottub.jetsOptions);
  const hotTubLedOptions: ConfigOption[] = toUIOptions(apiConfig?.hottub.ledOptions);
  const hotTubCoverOptions: ConfigOption[] = toUIOptions(apiConfig?.hottub.coverOptions);
  const hotTubColorOptions: ConfigOption[] = toUIOptions(apiConfig?.hottub.colorOptions);

  // --- Heater models z API ---
  const electricHeaterModels: HeaterModel[] = useMemo(() => {
    if (!apiConfig?.heaterModels?.electric) return [];
    return Object.entries(apiConfig.heaterModels.electric).map(([id, data]) => ({
      id,
      name: data.label,
      price: data.price,
    }));
  }, [apiConfig]);

  const woodHeaterModels: HeaterModel[] = useMemo(() => {
    if (!apiConfig?.heaterModels?.wood) return [];
    return Object.entries(apiConfig.heaterModels.wood).map(([id, data]) => ({
      id,
      name: data.label,
      price: data.price,
    }));
  }, [apiConfig]);

  // --- Wood types z API (globálne, len pre názvy/obrázky) ---
  const globalWoodTypes = useMemo(() => {
    if (!apiConfig?.sauna?.woodTypes) return {};
    return apiConfig.sauna.woodTypes;
  }, [apiConfig]);

  // --- Získaj aktuálny API sauna typ pre woodTypePrices ---
  const currentApiSaunaType = useMemo(() => {
    if (!selectedSaunaType || !apiConfig?.saunaTypes) return null;
    return apiConfig.saunaTypes.find((st) => st.id === selectedSaunaType.id) ?? null;
  }, [selectedSaunaType, apiConfig]);

  // --- Wood types s cenami špecifickými pre vybraný model ---
  const woodTypeOptionsForModel = useMemo(() => {
    if (!selectedSaunaType || !globalWoodTypes) return [];

    return selectedSaunaType.availableWoodTypes.map((woodId) => {
      const globalData = globalWoodTypes[woodId];
      // Cena z model-specific woodTypePrices, alebo globálna fallback
      const modelPrice = currentApiSaunaType?.woodTypePrices?.[woodId];
      const price = modelPrice !== undefined ? modelPrice : (globalData?.price ?? 0);

      return {
        id: woodId,
        name: globalData?.label ?? woodId,
        price,
        image: woodId === "spruce" ? spruceWoodImg : thermoWoodImg,
      };
    });
  }, [selectedSaunaType, globalWoodTypes, currentApiSaunaType]);

  // --- Exterior LED price z API ---
  const exteriorLedPrice = apiConfig?.exteriorLed?.price ?? 0;

  // --- Sauna typy z API (všetko z PHP) + lokálne UI meta (len obrázky) ---
  const saunaTypesUI: SaunaType[] = useMemo(() => {
    if (!apiConfig?.saunaTypes?.length) return [];

    const defaultPreset: SaunaTypePreset = {
      image: saunaBarrel,
    };

    return apiConfig.saunaTypes.map((st) => {
      const preset = saunaTypePresets[st.id] ?? defaultPreset;
      return {
        id: st.id,
        name: st.label,
        dimensions: st.dimensions ?? "",
        basePrice: st.basePrice,
        image: preset.image,
        // Všetky has* vlastnosti z PHP API.
        // Fallback true pre bežné vlastnosti (kým PHP nepošle explicitne).
        // hasWoodType fallback: true ak existujú woodTypes, inak false.
        // hasExteriorLed fallback: false (iba špecifické modely).
        hasWoodType: st.hasWoodType ?? (st.woodTypes?.length ?? 0) > 0,
        hasLed: st.hasLed ?? true,
        hasExteriorLed: st.hasExteriorLed ?? false,
        hasBluetooth: st.hasBluetooth ?? true,
        hasAccessoryKit: st.hasAccessoryKit ?? true,
        hasHeater: st.hasHeater ?? true,
        hasColor: st.hasColor ?? true,
        availableWoodTypes: st.woodTypes ?? [],
      };
    });
  }, [apiConfig]);

  // --- URL sync: auto-select model from URL slug ---
  const hasAppliedSlug = useRef(false);
  useEffect(() => {
    if (!modelSlug || !saunaTypesUI.length || hasAppliedSlug.current) return;

    const slugToId: Record<string, string> = {
      "frame-sauna": "frame-balance",
      "frame-balance": "frame-balance",
      "frame-inspire": "frame-balance",
      modulsauna: "modul-thermo",
      "modul-thermo": "modul-thermo",
      "lux-mini": "lux-mini",
      "lux-sauna": "lux-mini",
      "2m-round": "round-2m",
      "round-2m": "round-2m",
      "barrel-sauna": "round-2m",
      harmony: "harmony-insulated",
      "harmony-insulated": "harmony-insulated",
      "insulated-harmony": "harmony-insulated",
    };

    const resolvedId = slugToId[modelSlug] || modelSlug;
    const matchedType = saunaTypesUI.find((st) => st.id === resolvedId);

    if (matchedType) {
      setProductCategory("sauna");
      setSelectedSaunaType(matchedType);
      hasAppliedSlug.current = true;
    }
  }, [modelSlug, saunaTypesUI]);

  // --- Helper to get base configurator path ---
  const getConfigBasePath = useCallback(() => {
    return location.pathname.startsWith("/en/") ? "/en/configurator" : "/konfigurator";
  }, [location.pathname]);

  // --- Update URL when model is selected ---
  const selectSaunaTypeWithUrl = useCallback(
    (saunaType: SaunaType) => {
      setSelectedSaunaType(saunaType);
      setProductCategory("sauna");
      const basePath = getConfigBasePath();
      navigate(`${basePath}/${saunaType.id}`, { replace: true });
    },
    [navigate, getConfigBasePath],
  );

  const minSaunaBasePrice = useMemo(() => {
    const prices = apiConfig?.saunaTypes?.map((s) => s.basePrice) ?? [];
    return prices.length ? Math.min(...prices) : 0;
  }, [apiConfig]);

  // Výpočet ceny
  const totalPrice = useMemo(() => {
    if (!apiConfig) return 0;

    if (productCategory === "sauna" && selectedSaunaType) {
      const basePrice = selectedSaunaType.basePrice;
      const heater = apiConfig.sauna.heaterTypes.find((h) => h.id === saunaConfig.heaterType)?.price ?? 0;

      // Cena modelu ohrievača
      let heaterModelPrice = 0;
      if (saunaConfig.heaterType === "electric" && saunaConfig.heaterModel !== "none") {
        heaterModelPrice = electricHeaterModels.find((m) => m.id === saunaConfig.heaterModel)?.price ?? 0;
      } else if (saunaConfig.heaterType === "wood" && saunaConfig.heaterModel !== "none") {
        heaterModelPrice = woodHeaterModels.find((m) => m.id === saunaConfig.heaterModel)?.price ?? 0;
      }

      const ledSum = (saunaConfig.led ?? []).reduce((sum, ledId) => {
        const p = apiConfig.sauna.ledOptions.find((l) => l.id === ledId)?.price ?? 0;
        return sum + p;
      }, 0);

      // Vonkajšie LED (cena z API)
      const extLedPrice = saunaConfig.exteriorLed ? exteriorLedPrice : 0;

      const bluetooth = apiConfig.sauna.bluetoothOptions.find((b) => b.id === saunaConfig.bluetooth)?.price ?? 0;
      const kit = apiConfig.sauna.accessoryKitOptions.find((a) => a.id === saunaConfig.accessoryKit)?.price ?? 0;
      const color = apiConfig.sauna.colorOptions.find((c) => c.id === saunaConfig.color)?.price ?? 0;
      const woodPrice = woodTypeOptionsForModel.find((w) => w.id === saunaConfig.woodType)?.price ?? 0;

      return basePrice + heater + heaterModelPrice + ledSum + extLedPrice + bluetooth + kit + color + woodPrice;
    }

    if (productCategory === "hottub") {
      const basePrice = apiConfig.hottub.basePrice;
      const size = apiConfig.hottub.sizeOptions.find((s) => s.id === hotTubConfig.size)?.price ?? 0;
      const jets = apiConfig.hottub.jetsOptions.find((j) => j.id === hotTubConfig.jets)?.price ?? 0;
      const led = apiConfig.hottub.ledOptions.find((l) => l.id === hotTubConfig.led)?.price ?? 0;
      const cover = apiConfig.hottub.coverOptions.find((c) => c.id === hotTubConfig.cover)?.price ?? 0;
      const color = apiConfig.hottub.colorOptions.find((c) => c.id === hotTubConfig.color)?.price ?? 0;

      return basePrice + size + jets + led + cover + color;
    }

    return 0;
  }, [
    productCategory,
    selectedSaunaType,
    apiConfig,
    saunaConfig,
    hotTubConfig,
    electricHeaterModels,
    woodHeaterModels,
    woodTypeOptionsForModel,
    exteriorLedPrice,
  ]);

  const originalPrice = useMemo(() => Math.round(totalPrice * 1.15), [totalPrice]);
  const discount = originalPrice > 0 ? Math.round(((originalPrice - totalPrice) / originalPrice) * 100) : 0;

  // Validácia - či je vybraný model ohrievača keď je vybraný typ
  const isHeaterModelRequired = saunaConfig.heaterType !== "none" && saunaConfig.heaterModel === "none";

  const addToCart = async () => {
    if (!productCategory || !apiConfig) return;

    // Validácia pre saunu - musí byť vybraný model ohrievača
    if (productCategory === "sauna" && isHeaterModelRequired) {
      toast({
        title: t("config.selectHeaterModel"),
        description:
          language === "en"
            ? "You must select a specific heater model before adding to cart."
            : "Pred pridaním do košíka musíte vybrať konkrétny model ohrievača.",
        variant: "destructive",
      });
      return;
    }

    setIsAddingToCart(true);

    try {
      // Získaj aktuálny obrázok pre košík
      const cartImage = productCategory === "sauna" ? currentSaunaImage : hotTub;

      const options =
        productCategory === "sauna"
          ? { productCategory, saunaTypeId: selectedSaunaType?.id, ...saunaConfig }
          : { productCategory, ...hotTubConfig };

      const product_id = apiConfig.products[productCategory];

      const response = await fetch("/wp-json/sauna/v1/add-to-cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          product_id,
          qty: 1,
          options,
          image: cartImage,
          lang: language,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || t("error.addToCart"));
      }

      toast({
        title: t("success.addedToCart"),
        description: t("success.addedToCartDesc"),
      });

      window.location.href = language === "en" ? "/en/cart/" : "/kosik/";
    } catch (error) {
      console.error("Add to cart error:", error);
      toast({
        title: t("error.generic"),
        description: error instanceof Error ? error.message : t("error.addToCart"),
        variant: "destructive",
      });
    } finally {
      setIsAddingToCart(false);
    }
  };

  // Reset a navigácia späť
  const goBackToCategory = () => {
    setProductCategory(null);
    setSelectedSaunaType(null);
    setSaunaConfig({
      heaterType: "none",
      heaterModel: "none",
      led: [],
      exteriorLed: false,
      bluetooth: "none",
      accessoryKit: "none",
      color: "none" as SaunaColorType,
      woodType: "spruce",
    });
    navigate(getConfigBasePath(), { replace: true });
  };

  const goBackToSaunaTypes = () => {
    setSelectedSaunaType(null);
    setSaunaConfig({
      heaterType: "none",
      heaterModel: "none",
      led: [],
      exteriorLed: false,
      bluetooth: "none",
      accessoryKit: "none",
      color: "none" as SaunaColorType,
      woodType: "spruce",
    });
    setCurrentImageIndex(0);
    navigate(getConfigBasePath(), { replace: true });
  };

  // Komponenta pre možnosť s X alebo obrázkom
  const OptionCard = ({
    option,
    isSelected,
    onClick,
    showImage = false,
    size = "normal",
  }: {
    option: ConfigOption;
    isSelected: boolean;
    onClick: () => void;
    showImage?: boolean;
    size?: "normal" | "small";
  }) => (
    <button
      onClick={onClick}
      className={cn(
        "flex flex-col items-center p-3 rounded-xl border-2 transition-all",
        isSelected ? "border-primary bg-primary/5" : "border-border/50 hover:border-primary/50 bg-card/50",
        size === "small" && "p-2",
      )}
    >
      {option.id === "none" ? (
        <div
          className={cn(
            "flex items-center justify-center rounded-lg bg-muted/50 mb-2",
            size === "small" ? "w-12 h-12" : "w-16 h-16",
          )}
        >
          <X className={cn("text-muted-foreground", size === "small" ? "w-6 h-6" : "w-8 h-8")} />
        </div>
      ) : showImage && option.image ? (
        <img
          src={option.image}
          alt={option.name}
          className={cn("rounded-lg object-cover mb-2", size === "small" ? "w-12 h-12" : "w-16 h-16")}
        />
      ) : (
        <div
          className={cn(
            "flex items-center justify-center rounded-lg bg-primary/10 mb-2",
            size === "small" ? "w-12 h-12" : "w-16 h-16",
          )}
        >
          <Check className={cn("text-primary", size === "small" ? "w-5 h-5" : "w-6 h-6")} />
        </div>
      )}

      <span className={cn("font-medium text-center", size === "small" ? "text-xs" : "text-sm")}>{option.name}</span>

      {option.price > 0 ? (
        <div className="flex items-center gap-1">
          {option.originalPrice && (
            <span className="text-xs text-muted-foreground line-through">
              {option.originalPrice.toLocaleString()} €
            </span>
          )}
          <span className="text-xs text-primary">{option.price.toLocaleString()} €</span>
        </div>
      ) : (
        <span className="text-xs text-muted-foreground">{option.price === 0 ? "0,00 €" : t("included")}</span>
      )}
    </button>
  );

  // Loading state
  if (isConfigLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-6 h-6 animate-spin" />
      </div>
    );
  }

  // Ak config neprišiel, zastav UI (toast už ukázal chybu)
  if (!apiConfig) {
    return (
      <div className="min-h-screen bg-background">
        <ConfiguratorHeader />
        <main className="pt-26 pb-16">
          <div className="container mx-auto px-4">
            <div className="max-w-xl mx-auto text-center">
              <h1 className="font-display text-3xl font-bold mb-2">{t("nav.configurator")}</h1>
              <p className="text-muted-foreground">
                {t("error.loadConfig")} <span className="font-mono">/wp-json/sauna/v1/config</span>.
              </p>
            </div>
          </div>
        </main>
        <ConfiguratorFooter />
      </div>
    );
  }

  // KROK 1: Výber kategórie produktu (sauna/kaďa)
  if (!productCategory) {
    return (
      <div className="min-h-screen bg-background">
        <ConfiguratorHeader />
        <main className="pt-26 pb-18">
          <div className="container mx-auto px-4">
            <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
              <a href="/" className="hover:text-primary transition-colors">
                {t("config.breadcrumb.home")}
              </a>
              <span>/</span>
              <span className="text-foreground">{t("config.breadcrumb.configurator")}</span>
            </nav>

            <div className="max-w-4xl mx-auto text-center mb-12">
              <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
                {t("config.category.title")}{" "}
                <span className="text-gradient-amber">{t("config.category.titleHighlight")}</span>
              </h1>
              <p className="text-muted-foreground text-lg">{t("config.category.subtitle")}</p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {/* Sauna */}
              <button
                onClick={() => {
                  setProductCategory("sauna");
                  setCurrentImageIndex(0);
                }}
                className="group relative overflow-hidden rounded-2xl border-2 border-border/50 hover:border-primary/50 transition-all bg-card/50 shadow-xl"
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={saunaBarrel}
                    alt="Sauna"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                {/* Silnejší gradient pre lepšiu čitateľnosť */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/50 to-black/10" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h2 className="font-display text-4xl font-bold text-white mb-3 drop-shadow-lg">
                    {t("config.sauna")}
                  </h2>
                  <p className="text-white/90 mb-4 text-base leading-relaxed drop-shadow-md">
                    {t("config.sauna.description")}
                  </p>
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/20 backdrop-blur-sm border border-primary/30 text-primary font-semibold">
                    <span>
                      {t("config.from")} {minSaunaBasePrice.toLocaleString()} €
                    </span>
                    <ChevronRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </button>

              {/* Kaďa */}
              <button
                onClick={() => {
                  setProductCategory("hottub");
                  setCurrentImageIndex(0);
                }}
                className="group relative overflow-hidden rounded-2xl border-2 border-border/50 hover:border-primary/50 transition-all bg-card/50 shadow-xl"
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={hotTub}
                    alt={t("config.hottub")}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                {/* Silnejší gradient pre lepšiu čitateľnosť */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/50 to-black/10" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h2 className="font-display text-4xl font-bold text-white mb-3 drop-shadow-lg">
                    {t("config.hottub")}
                  </h2>
                  <p className="text-white/90 mb-4 text-base leading-relaxed drop-shadow-md">
                    {t("config.hottub.description")}
                  </p>
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/20 backdrop-blur-sm border border-primary/30 text-primary font-semibold">
                    <span>
                      {t("config.from")} {apiConfig.hottub.basePrice.toLocaleString()} €
                    </span>
                    <ChevronRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </button>
            </div>
          </div>
        </main>
        <ConfiguratorFooter />
      </div>
    );
  }

  // KROK 2: Pre saunu - výber typu sauny
  if (productCategory === "sauna" && !selectedSaunaType) {
    return (
      <div className="min-h-screen bg-background">
        <ConfiguratorHeader />
        <main className="pt-26 pb-18">
          <div className="container mx-auto px-4">
            {/* Tlačidlo späť */}
            <button
              onClick={goBackToCategory}
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-6 group"
            >
              <ChevronLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
              <span>{t("config.back.category")}</span>
            </button>

            <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
              <a href="/" className="hover:text-primary transition-colors">
                {t("config.breadcrumb.home")}
              </a>
              <span>/</span>
              <button onClick={goBackToCategory} className="hover:text-primary transition-colors">
                {t("config.breadcrumb.configurator")}
              </button>
              <span>/</span>
              <span className="text-foreground">{t("config.breadcrumb.saunaSelection")}</span>
            </nav>

            <div className="max-w-5xl mx-auto text-center mb-12">
              <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
                {t("config.saunaSelection.title")}{" "}
                <span className="text-gradient-amber">{t("config.saunaSelection.titleHighlight")}</span>
              </h1>
              <p className="text-muted-foreground text-lg">{t("config.saunaSelection.subtitle")}</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {saunaTypesUI.map((sauna) => (
                <button
                  key={sauna.id}
                  onClick={() => {
                    selectSaunaTypeWithUrl(sauna);
                    // Auto-select wood type if only one option available
                    if (sauna.availableWoodTypes.length === 1) {
                      setSaunaConfig((prev) => ({ ...prev, woodType: sauna.availableWoodTypes[0] }));
                    } else {
                      setSaunaConfig((prev) => ({ ...prev, woodType: "spruce" }));
                    }
                    setCurrentImageIndex(0);
                    setShowScrollIndicator(true);
                  }}
                  className="group relative overflow-hidden rounded-3xl border border-white/10 hover:border-primary/50 transition-colors duration-300 bg-gradient-to-br from-card/80 to-card/40 backdrop-blur-xl text-left shadow-2xl hover:shadow-primary/10"
                >
                  {/* Obrázok s overlay */}
                  <div className="aspect-[4/3] overflow-hidden relative">
                    <img
                      src={sauna.image}
                      alt={sauna.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />

                    {/* Floating badge s rozmermi */}
                    <div className="absolute top-4 right-4 flex items-center gap-2 px-4 py-2 rounded-full bg-black/60 backdrop-blur-md border border-white/20 shadow-lg">
                      <Ruler className="w-4 h-4 text-primary" />
                      <span className="text-sm font-bold text-white tracking-wide">{sauna.dimensions}</span>
                    </div>
                  </div>

                  {/* Obsah karty */}
                  <div className="relative p-6 -mt-8">
                    {/* Glassmorphism panel */}
                    <div className="bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 p-5">
                      <h3 className="font-display text-2xl font-bold text-foreground mb-4 group-hover:text-primary transition-colors">
                        {sauna.name}
                      </h3>

                      {/* Dostupné možnosti - ikony */}
                      <div className="flex items-center gap-3 mb-5">
                        {sauna.hasHeater && (
                          <div
                            className="flex items-center justify-center w-10 h-10 rounded-xl bg-primary/10 border border-primary/20"
                            title={t("tooltip.heater")}
                          >
                            <Flame className="w-5 h-5 text-primary" />
                          </div>
                        )}
                        {sauna.hasLed && (
                          <div
                            className="flex items-center justify-center w-10 h-10 rounded-xl bg-primary/10 border border-primary/20"
                            title={t("tooltip.led")}
                          >
                            <Lightbulb className="w-5 h-5 text-primary" />
                          </div>
                        )}
                        {sauna.hasBluetooth && (
                          <div
                            className="flex items-center justify-center w-10 h-10 rounded-xl bg-primary/10 border border-primary/20"
                            title={t("tooltip.bluetooth")}
                          >
                            <Bluetooth className="w-5 h-5 text-primary" />
                          </div>
                        )}
                      </div>

                      {/* Cena a CTA */}
                      <div className="flex items-center justify-between pt-4 border-t border-white/10">
                        <div>
                          <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
                            {t("config.from")}
                          </p>
                          <span className="text-2xl font-bold text-gradient-amber">
                            {sauna.basePrice.toLocaleString()} €
                          </span>
                        </div>
                        <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary text-primary-foreground transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-primary/30">
                          <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-0.5" />
                        </div>
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </main>
        <ConfiguratorFooter />
      </div>
    );
  }

  // KROK 3: Konfigurácia produktu (sauna s vybraným typom alebo kaďa)
  return (
    <div className="min-h-screen bg-background">
      <ConfiguratorHeader />
      <main className="pt-26 pb-18">
        <div className="container mx-auto px-4">
          {/* Tlačidlo späť */}
          <button
            onClick={productCategory === "sauna" ? goBackToSaunaTypes : goBackToCategory}
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-6 group"
          >
            <ChevronLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            <span>{productCategory === "sauna" ? t("config.back.sauna") : t("config.back.category")}</span>
          </button>

          <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
            <a href="/" className="hover:text-primary transition-colors">
              {t("config.breadcrumb.home")}
            </a>
            <span>/</span>
            <button onClick={goBackToCategory} className="hover:text-primary transition-colors">
              {t("config.breadcrumb.configurator")}
            </button>
            {productCategory === "sauna" && (
              <>
                <span>/</span>
                <button onClick={goBackToSaunaTypes} className="hover:text-primary transition-colors">
                  {t("config.breadcrumb.saunaSelection")}
                </button>
              </>
            )}
            <span>/</span>
            <span className="text-foreground">{t("config.breadcrumb.configuration")}</span>
          </nav>

          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Ľavá strana - obrázky */}
            <div className="lg:sticky lg:top-28 lg:h-fit space-y-4">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-card group">
                {discount > 0 && (
                  <div className="absolute top-4 left-4 z-10 px-3 py-1 bg-destructive text-destructive-foreground text-sm font-bold rounded-full">
                    -{discount}%
                  </div>
                )}

                <img
                  src={images[currentImageIndex]}
                  alt={productCategory === "sauna" ? selectedSaunaType?.name : t("config.hottub")}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />

                <button
                  onClick={() => setIsLightboxOpen(true)}
                  className="absolute bottom-4 left-4 p-3 bg-background/80 backdrop-blur-sm rounded-full hover:bg-background transition-colors"
                >
                  <Expand className="w-5 h-5" />
                </button>

                <button
                  onClick={() => setCurrentImageIndex((i) => (i === 0 ? images.length - 1 : i - 1))}
                  className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-background/80 backdrop-blur-sm rounded-full hover:bg-background transition-colors opacity-0 group-hover:opacity-100"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setCurrentImageIndex((i) => (i === images.length - 1 ? 0 : i + 1))}
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-background/80 backdrop-blur-sm rounded-full hover:bg-background transition-colors opacity-0 group-hover:opacity-100"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>

              <div className="flex gap-3">
                {images.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={cn(
                      "relative w-20 h-20 rounded-lg overflow-hidden transition-all",
                      currentImageIndex === index
                        ? "ring-2 ring-primary ring-offset-2 ring-offset-background"
                        : "opacity-60 hover:opacity-100",
                    )}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>

              {/* Cena - desktop */}
              <div className="hidden lg:block border border-border/50 rounded-2xl p-6 bg-card/50">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-lg font-medium">{t("config.total")}</span>
                  <div className="text-right">
                    <span className="text-muted-foreground line-through text-sm mr-2">
                      {originalPrice.toLocaleString()} €
                    </span>
                    <span className="text-3xl font-bold text-primary">{totalPrice.toLocaleString()} €</span>
                  </div>
                </div>

                <Button
                  variant="luxury"
                  size="lg"
                  className="w-full gap-2"
                  onClick={addToCart}
                  disabled={isAddingToCart}
                >
                  {isAddingToCart ? <Loader2 className="w-5 h-5 animate-spin" /> : <ShoppingCart className="w-5 h-5" />}
                  {isAddingToCart ? t("config.addingToCart") : t("config.addToCart")}
                </Button>

                <p className="text-xs text-muted-foreground text-center mt-3">{t("config.priceNote")}</p>
              </div>
            </div>

            {/* Pravá strana - konfigurácia */}
            <div className="relative">
              {/* Scroll indicator */}
              <div
                className={cn(
                  "absolute bottom-0 left-0 right-4 h-20 bg-gradient-to-t from-background via-background/80 to-transparent pointer-events-none z-10 items-end justify-center pb-2 hidden lg:flex transition-opacity duration-300",
                  showScrollIndicator ? "opacity-100" : "opacity-0",
                )}
              >
                <div className="flex flex-col items-center gap-1 text-muted-foreground animate-bounce">
                  <span className="text-xs">{t("config.scrollMore")}</span>
                  <ChevronDown className="w-4 h-4" />
                </div>
              </div>

              <ScrollArea className="lg:h-[calc(100vh-8rem)]" onScrollCapture={handleScroll}>
                <div className="space-y-8 pr-4 pb-24">
                  <div>
                    <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-2">
                      {productCategory === "sauna" ? selectedSaunaType?.name : t("config.hottub.configTitle")}
                    </h1>
                    {productCategory === "sauna" && selectedSaunaType && (
                      <p className="text-muted-foreground mb-3">{selectedSaunaType.dimensions}</p>
                    )}
                    <div className="flex items-baseline gap-3 lg:hidden">
                      <span className="text-muted-foreground line-through text-lg">
                        {originalPrice.toLocaleString()} €
                      </span>
                      <span className="text-3xl font-bold text-primary">{totalPrice.toLocaleString()} €</span>
                    </div>
                  </div>

                  {productCategory === "sauna" && selectedSaunaType ? (
                    <div className="space-y-6">
                      {/* Typ dreva */}
                      {selectedSaunaType.hasWoodType && selectedSaunaType.availableWoodTypes.length > 0 && (
                        <div>
                          <h3 className="text-lg font-semibold text-foreground mb-3">
                            {t("config.woodType")} <span className="text-primary">*</span>
                          </h3>
                          <div className="grid grid-cols-2 gap-3">
                            {woodTypeOptionsForModel.map((option) => (
                              <button
                                key={option.id}
                                onClick={() => setSaunaConfig((prev) => ({ ...prev, woodType: option.id }))}
                                className={cn(
                                  "flex flex-col items-center p-4 rounded-xl border-2 transition-all",
                                  saunaConfig.woodType === option.id
                                    ? "border-primary bg-primary/5"
                                    : "border-border/50 hover:border-primary/50 bg-card/50",
                                )}
                              >
                                <div className="w-16 h-16 rounded-lg mb-2 overflow-hidden">
                                  <img src={option.image} alt={option.name} className="w-full h-full object-cover" />
                                </div>
                                <span className="font-medium text-center text-sm">
                                  {option.id === "spruce" ? t("config.woodType.spruce") : t("config.woodType.thermo")}
                                </span>
                                {option.price > 0 ? (
                                  <span className="text-xs text-primary">+{option.price.toLocaleString()} €</span>
                                ) : (
                                  <span className="text-xs text-muted-foreground">{t("included")}</span>
                                )}
                              </button>
                            ))}
                          </div>
                          {selectedSaunaType.availableWoodTypes.length === 1 && (
                            <p className="text-xs text-muted-foreground mt-2">
                              {t("config.onlyWoodType").replace(
                                "{woodType}",
                                selectedSaunaType.availableWoodTypes[0] === "thermo"
                                  ? t("config.woodType.thermo")
                                  : t("config.woodType.spruce"),
                              )}
                            </p>
                          )}
                        </div>
                      )}

                      {/* Typ ohrievača */}
                      {selectedSaunaType.hasHeater && (
                        <div>
                          <h3 className="text-lg font-semibold text-foreground mb-3">
                            {t("config.heater")} <span className="text-primary">*</span>
                          </h3>
                          <div className="grid grid-cols-3 gap-3">
                            {saunaHeaterTypes.map((option) => (
                              <OptionCard
                                key={option.id}
                                option={option}
                                isSelected={saunaConfig.heaterType === option.id}
                                onClick={() =>
                                  setSaunaConfig((prev) => ({
                                    ...prev,
                                    heaterType: option.id,
                                    heaterModel: "none", // Reset model pri zmene typu
                                  }))
                                }
                                showImage={true}
                              />
                            ))}
                          </div>

                          {/* Výber konkrétneho modelu ohrievača - POVINNÉ */}
                          {saunaConfig.heaterType === "electric" && (
                            <div className="mt-4 p-4 rounded-xl bg-card/50 border border-primary/30">
                              <h4 className="text-sm font-medium text-foreground mb-3">
                                {t("config.selectHeaterModel")} <span className="text-primary">*</span>
                              </h4>
                              {saunaConfig.heaterModel === "none" && (
                                <p className="text-xs text-amber-500 mb-3">{t("config.heaterModelRequired")}</p>
                              )}
                              <div className="grid grid-cols-1 gap-2">
                                {electricHeaterModels.map((model) => (
                                  <button
                                    key={model.id}
                                    onClick={() => setSaunaConfig((prev) => ({ ...prev, heaterModel: model.id }))}
                                    className={cn(
                                      "flex items-center justify-between p-3 rounded-lg border-2 transition-all text-left",
                                      saunaConfig.heaterModel === model.id
                                        ? "border-primary bg-primary/5"
                                        : "border-border/50 hover:border-primary/50 bg-card/30",
                                    )}
                                  >
                                    <div className="flex items-center gap-3">
                                      {saunaConfig.heaterModel === model.id && (
                                        <Check className="w-4 h-4 text-primary" />
                                      )}
                                      <span className="font-medium text-sm">{model.name}</span>
                                    </div>
                                    {model.price > 0 ? (
                                      <span className="text-sm text-primary">+{model.price.toLocaleString()} €</span>
                                    ) : (
                                      <span className="text-xs text-muted-foreground">{t("included")}</span>
                                    )}
                                  </button>
                                ))}
                              </div>
                            </div>
                          )}

                          {saunaConfig.heaterType === "wood" && (
                            <div className="mt-4 p-4 rounded-xl bg-card/50 border border-primary/30">
                              <h4 className="text-sm font-medium text-foreground mb-3">
                                {t("config.selectHeaterModel")} <span className="text-primary">*</span>
                              </h4>
                              {saunaConfig.heaterModel === "none" && (
                                <p className="text-xs text-amber-500 mb-3">{t("config.heaterModelRequired")}</p>
                              )}
                              <div className="grid grid-cols-1 gap-2">
                                {woodHeaterModels.map((model) => (
                                  <button
                                    key={model.id}
                                    onClick={() => setSaunaConfig((prev) => ({ ...prev, heaterModel: model.id }))}
                                    className={cn(
                                      "flex items-center justify-between p-3 rounded-lg border-2 transition-all text-left",
                                      saunaConfig.heaterModel === model.id
                                        ? "border-primary bg-primary/5"
                                        : "border-border/50 hover:border-primary/50 bg-card/30",
                                    )}
                                  >
                                    <div className="flex items-center gap-3">
                                      {saunaConfig.heaterModel === model.id && (
                                        <Check className="w-4 h-4 text-primary" />
                                      )}
                                      <span className="font-medium text-sm">{model.name}</span>
                                    </div>
                                    {model.price > 0 ? (
                                      <span className="text-sm text-primary">+{model.price.toLocaleString()} €</span>
                                    ) : (
                                      <span className="text-xs text-muted-foreground">{t("included")}</span>
                                    )}
                                  </button>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      )}

                      {/* LED osvetlenie (interiér) */}
                      {selectedSaunaType.hasLed && (
                        <div>
                          <h3 className="text-lg font-semibold text-foreground mb-3">
                            {t("config.led")} <span className="text-primary">*</span>
                          </h3>
                          <div className="grid grid-cols-3 gap-3">
                            {/* Bez LED = reset */}
                            <OptionCard
                              option={{ id: "none", name: t("config.noLed"), price: 0 }}
                              isSelected={ledSelected.length === 0}
                              onClick={resetLed}
                            />

                            {/* Multi možnosti */}
                            {saunaLedOptions
                              .filter((o) => o.id !== "none")
                              .map((option) => (
                                <OptionCard
                                  key={option.id}
                                  option={option}
                                  isSelected={isLedSelected(option.id)}
                                  onClick={() => toggleLed(option.id)}
                                  showImage={true}
                                />
                              ))}
                          </div>
                        </div>
                      )}

                      {/* Vonkajšie LED osvetlenie - iba pre ModulSaunu */}
                      {selectedSaunaType.hasExteriorLed && (
                        <div>
                          <h3 className="text-lg font-semibold text-foreground mb-3">{t("config.exteriorLed")}</h3>
                          <div className="grid grid-cols-2 gap-3">
                            <button
                              onClick={() => setSaunaConfig((prev) => ({ ...prev, exteriorLed: false }))}
                              className={cn(
                                "flex flex-col items-center p-3 rounded-xl border-2 transition-all",
                                !saunaConfig.exteriorLed
                                  ? "border-primary bg-primary/5"
                                  : "border-border/50 hover:border-primary/50 bg-card/50",
                              )}
                            >
                              <div className="w-16 h-16 flex items-center justify-center rounded-lg bg-muted/50 mb-2">
                                <X className="w-8 h-8 text-muted-foreground" />
                              </div>
                              <span className="font-medium text-center text-sm">{t("config.without")}</span>
                              <span className="text-xs text-muted-foreground">{t("included")}</span>
                            </button>
                            <button
                              onClick={() => setSaunaConfig((prev) => ({ ...prev, exteriorLed: true }))}
                              className={cn(
                                "flex flex-col items-center p-3 rounded-xl border-2 transition-all",
                                saunaConfig.exteriorLed
                                  ? "border-primary bg-primary/5"
                                  : "border-border/50 hover:border-primary/50 bg-card/50",
                              )}
                            >
                              <div className="w-16 h-16 flex items-center justify-center rounded-lg bg-primary/10 mb-2">
                                <Lightbulb className="w-8 h-8 text-primary" />
                              </div>
                              <span className="font-medium text-center text-sm">{t("config.exteriorLedShort")}</span>
                              <span className="text-xs text-primary">+{exteriorLedPrice} €</span>
                            </button>
                          </div>
                        </div>
                      )}

                      {/* Bluetooth reproduktor */}
                      {selectedSaunaType.hasBluetooth && (
                        <div>
                          <h3 className="text-lg font-semibold text-foreground mb-3">
                            {t("config.bluetooth")} <span className="text-primary">*</span>
                          </h3>
                          <div className="grid grid-cols-2 gap-3">
                            {saunaBluetoothOptions.map((option) => (
                              <OptionCard
                                key={option.id}
                                option={option}
                                isSelected={saunaConfig.bluetooth === option.id}
                                onClick={() => setSaunaConfig((prev) => ({ ...prev, bluetooth: option.id }))}
                                showImage={true}
                              />
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Saunová sada */}
                      {selectedSaunaType.hasAccessoryKit && (
                        <div>
                          <h3 className="text-lg font-semibold text-foreground mb-3">
                            {t("config.accessories")} <span className="text-primary">*</span>
                          </h3>
                          <p className="text-xs text-muted-foreground mb-2 italic">{t("config.accessoryKitHint")}</p>
                          <div className="grid grid-cols-2 gap-3">
                            {saunaAccessoryKitOptions.map((option) => (
                              <OptionCard
                                key={option.id}
                                option={option}
                                isSelected={saunaConfig.accessoryKit === option.id}
                                onClick={() => setSaunaConfig((prev) => ({ ...prev, accessoryKit: option.id }))}
                                showImage={true}
                              />
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Farba */}
                      {selectedSaunaType.hasColor && (
                        <div>
                          <h3 className="text-lg font-semibold text-foreground mb-3">
                            {t("config.color")} <span className="text-primary">*</span>
                          </h3>
                          <p className="text-xs text-muted-foreground mb-3 italic">{t("config.colorHint")}</p>
                          <div className="grid grid-cols-4 gap-3">
                            {saunaColorOptionsTyped.map((option) => (
                              <button
                                key={option.id}
                                onClick={() => {
                                  setSaunaConfig((prev) => ({ ...prev, color: option.id }));
                                  setCurrentImageIndex(0);
                                }}
                                className={cn(
                                  "flex flex-col items-center p-3 rounded-xl border-2 transition-all",
                                  saunaConfig.color === option.id
                                    ? "border-primary bg-primary/5"
                                    : "border-border/50 hover:border-primary/50 bg-card/50",
                                )}
                              >
                                {option.id === "none" ? (
                                  <div className="w-12 h-12 rounded-lg bg-muted/50 flex items-center justify-center mb-2">
                                    <X className="w-6 h-6 text-muted-foreground" />
                                  </div>
                                ) : (
                                  <div
                                    className="w-12 h-12 rounded-lg mb-2 border border-border/30"
                                    style={{ backgroundColor: saunaColorSwatches[option.id].colorHsl }}
                                  />
                                )}
                                <span className="font-medium text-center text-xs">
                                  {t(`color.${option.id}`) !== `color.${option.id}`
                                    ? t(`color.${option.id}`)
                                    : option.name || saunaColorSwatches[option.id].nameFallback}
                                </span>
                                {option.price > 0 ? (
                                  <span className="text-xs text-primary">+{option.price.toLocaleString()} €</span>
                                ) : (
                                  <span className="text-xs text-muted-foreground">{t("included")}</span>
                                )}
                              </button>
                            ))}
                          </div>
                          <Notice variant="info" className="mt-4">
                            {t("config.colorNotice")}
                          </Notice>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="space-y-6">
                      {/* Veľkosť */}
                      <div>
                        <h3 className="text-lg font-semibold text-foreground mb-3">
                          {t("config.size")} <span className="text-primary">*</span>
                        </h3>
                        <div className="grid grid-cols-3 gap-3">
                          {hotTubSizeOptions.map((option) => (
                            <OptionCard
                              key={option.id}
                              option={option}
                              isSelected={hotTubConfig.size === option.id}
                              onClick={() => setHotTubConfig((prev) => ({ ...prev, size: option.id }))}
                            />
                          ))}
                        </div>
                      </div>

                      {/* Trysky */}
                      <div>
                        <h3 className="text-lg font-semibold text-foreground mb-3">
                          {t("config.jets")} <span className="text-primary">*</span>
                        </h3>
                        <div className="grid grid-cols-3 gap-3">
                          {hotTubJetsOptions.map((option) => (
                            <OptionCard
                              key={option.id}
                              option={option}
                              isSelected={hotTubConfig.jets === option.id}
                              onClick={() => setHotTubConfig((prev) => ({ ...prev, jets: option.id }))}
                            />
                          ))}
                        </div>
                      </div>

                      {/* LED osvetlenie */}
                      <div>
                        <h3 className="text-lg font-semibold text-foreground mb-3">
                          {t("config.led")} <span className="text-primary">*</span>
                        </h3>
                        <div className="grid grid-cols-3 gap-3">
                          {hotTubLedOptions.map((option) => (
                            <OptionCard
                              key={option.id}
                              option={option}
                              isSelected={hotTubConfig.led === option.id}
                              onClick={() => setHotTubConfig((prev) => ({ ...prev, led: option.id }))}
                            />
                          ))}
                        </div>
                      </div>

                      {/* Kryt */}
                      <div>
                        <h3 className="text-lg font-semibold text-foreground mb-3">
                          {t("config.cover")} <span className="text-primary">*</span>
                        </h3>
                        <div className="grid grid-cols-3 gap-3">
                          {hotTubCoverOptions.map((option) => (
                            <OptionCard
                              key={option.id}
                              option={option}
                              isSelected={hotTubConfig.cover === option.id}
                              onClick={() => setHotTubConfig((prev) => ({ ...prev, cover: option.id }))}
                            />
                          ))}
                        </div>
                      </div>

                      {/* Farba */}
                      <div>
                        <h3 className="text-lg font-semibold text-foreground mb-3">
                          {t("config.color")} <span className="text-primary">*</span>
                        </h3>
                        <div className="grid grid-cols-3 gap-3">
                          {hotTubColorOptions.map((option) => (
                            <OptionCard
                              key={option.id}
                              option={option}
                              isSelected={hotTubConfig.color === option.id}
                              onClick={() => setHotTubConfig((prev) => ({ ...prev, color: option.id }))}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Mobile price summary */}
                <div className="lg:hidden border border-border/50 rounded-2xl p-6 bg-card/50">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-lg font-medium">{t("config.total")}</span>
                    <div className="text-right">
                      <span className="text-muted-foreground line-through text-sm mr-2">
                        {originalPrice.toLocaleString()} €
                      </span>
                      <span className="text-3xl font-bold text-primary">{totalPrice.toLocaleString()} €</span>
                    </div>
                  </div>

                  <Button
                    variant="luxury"
                    size="lg"
                    className="w-full gap-2"
                    onClick={addToCart}
                    disabled={isAddingToCart}
                  >
                    {isAddingToCart ? (
                      <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                      <ShoppingCart className="w-5 h-5" />
                    )}
                    {isAddingToCart ? t("config.addingToCart") : t("config.addToCart")}
                  </Button>

                  <p className="text-xs text-muted-foreground text-center mt-3">{t("config.priceNote")}</p>
                </div>
              </ScrollArea>
            </div>
          </div>
        </div>
      </main>
      <ConfiguratorFooter />

      {/* Lightbox Modal */}
      {isLightboxOpen && (
        <div
          className="fixed inset-0 z-50 bg-background/95 backdrop-blur-sm flex items-center justify-center"
          onClick={() => setIsLightboxOpen(false)}
        >
          <button
            className="absolute top-6 right-6 p-3 bg-card/50 backdrop-blur-sm rounded-full hover:bg-card transition-colors z-10"
            onClick={() => setIsLightboxOpen(false)}
          >
            <X className="w-6 h-6" />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              setCurrentImageIndex((i) => (i === 0 ? images.length - 1 : i - 1));
            }}
            className="absolute left-6 top-1/2 -translate-y-1/2 p-3 bg-card/50 backdrop-blur-sm rounded-full hover:bg-card transition-colors z-10"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              setCurrentImageIndex((i) => (i === images.length - 1 ? 0 : i + 1));
            }}
            className="absolute right-6 top-1/2 -translate-y-1/2 p-3 bg-card/50 backdrop-blur-sm rounded-full hover:bg-card transition-colors z-10"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          <div className="max-w-5xl max-h-[85vh] w-full mx-6" onClick={(e) => e.stopPropagation()}>
            <img
              src={images[currentImageIndex]}
              alt={t("config.lightboxAlt")}
              className="w-full h-full object-contain rounded-lg"
            />

            {/* Thumbnail strip */}
            <div className="flex justify-center gap-2 mt-4 overflow-x-auto pb-2">
              {images.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={cn(
                    "relative w-16 h-16 flex-shrink-0 rounded-lg overflow-hidden transition-all",
                    currentImageIndex === index
                      ? "ring-2 ring-primary ring-offset-2 ring-offset-background"
                      : "opacity-60 hover:opacity-100",
                  )}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Configurator;

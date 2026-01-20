import { useEffect, useMemo, useState, useRef, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Check, ShoppingCart, ChevronLeft, ChevronRight, ChevronDown, Expand, Loader2, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/hooks/use-toast";
import ConfiguratorHeader from "@/components/ConfiguratorHeader";
import ConfiguratorFooter from "@/components/ConfiguratorFooter";

import saunaBarrel from "@/assets/sauna-barrel.jpg";
import saunaCube from "@/assets/sauna-cube.jpg";
import saunaTraditional from "@/assets/sauna-traditional.jpg";
import saunaInterior from "@/assets/sauna-interior.jpg";
import hotTub from "@/assets/hot-tub.jpg";
import saunaKit from "@/assets/Sauna-accessories-kit.jpg";
import speaker from "@/assets/Bluetooth-speaker-system.png";
import ledBenches from "@/assets/LED-lighting-under-the-benches.png";
import ledBackrest from "@/assets/LED-lighting-in-the-back-supports-1.jpg";
import electricHeater from "@/assets/Harvia-CILINDRO-9kw.png";
import woodHeater from "@/assets/Harvia-M3.png";

type ProductCategory = "sauna" | "hottub";

type SaunaType = {
  id: string;
  name: string;
  dimensions: string;
  basePrice: number;
  image: string;
  hasLed: boolean;
  hasBluetooth: boolean;
  hasAccessoryKit: boolean;
  hasHeater: boolean;
  hasColor: boolean;
};

// Typy saún - toto sa môže neskôr načítavať z API
const saunaTypes: SaunaType[] = [
  {
    id: "frame-inspire",
    name: "Frame sauna Inspire",
    dimensions: "240×300",
    basePrice: 8990,
    image: saunaCube,
    hasLed: true,
    hasBluetooth: true,
    hasAccessoryKit: true,
    hasHeater: true,
    hasColor: true,
  },
  {
    id: "modul-thermo",
    name: "ModulSauna",
    dimensions: "240×250 – Thermo wood",
    basePrice: 9490,
    image: saunaTraditional,
    hasLed: true,
    hasBluetooth: true,
    hasAccessoryKit: true,
    hasHeater: true,
    hasColor: false,
  },
  {
    id: "lux-mini",
    name: "LUX MINI sauna",
    dimensions: "245×300",
    basePrice: 11990,
    image: saunaInterior,
    hasLed: true,
    hasBluetooth: true,
    hasAccessoryKit: true,
    hasHeater: true,
    hasColor: true,
  },
  {
    id: "round-2m",
    name: "2M Round sauna",
    dimensions: "Ø 200 cm",
    basePrice: 6990,
    image: saunaBarrel,
    hasLed: false,
    hasBluetooth: false,
    hasAccessoryKit: true,
    hasHeater: true,
    hasColor: false,
  },
  {
    id: "harmony-insulated",
    name: "Insulated frame sauna Harmony",
    dimensions: "280×500",
    basePrice: 14990,
    image: saunaCube,
    hasLed: true,
    hasBluetooth: true,
    hasAccessoryKit: true,
    hasHeater: true,
    hasColor: true,
  },
];

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

type ApiConfig = {
  products: { sauna: number; hottub: number };
  sauna: {
    basePrice: number;
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

  // --- API CONFIG ---
  const [apiConfig, setApiConfig] = useState<ApiConfig | null>(null);
  const [isConfigLoading, setIsConfigLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    (async () => {
      try {
        const res = await fetch("/wp-json/sauna/v1/config", {
          credentials: "include",
        });
        if (!res.ok) throw new Error("Config sa nepodarilo načítať");
        const data = (await res.json()) as ApiConfig;

        if (mounted) setApiConfig(data);
      } catch (e) {
        console.error(e);
        toast({
          title: "Chyba",
          description: "Nepodarilo sa načítať konfiguráciu.",
          variant: "destructive",
        });
      } finally {
        if (mounted) setIsConfigLoading(false);
      }
    })();

    return () => {
      mounted = false;
    };
  }, [toast]);

  // Výber kategórie produktu (sauna / kaďa)
  const [productCategory, setProductCategory] = useState<ProductCategory | null>(null);
  
  // Výber typu sauny
  const [selectedSaunaType, setSelectedSaunaType] = useState<SaunaType | null>(null);

  // Sauna konfigurácia (ids musia sedieť s PHP configom)
  const [saunaConfig, setSaunaConfig] = useState({
    heaterType: "none",
    led: [] as string[],
    bluetooth: "none",
    accessoryKit: "none",
    color: "none",
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

  // --- Images pre galériu ---
  const saunaImages = selectedSaunaType 
    ? [selectedSaunaType.image, saunaInterior, saunaBarrel] 
    : [saunaBarrel, saunaInterior, saunaCube, saunaTraditional];
  const hotTubImages = [hotTub, saunaInterior, saunaCube];
  const images = productCategory === "hottub" ? hotTubImages : saunaImages;

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
  const saunaHeaterTypes: ConfigOption[] = toUIOptions(
    apiConfig?.sauna.heaterTypes,
    heaterImages
  );
  const saunaLedOptions: ConfigOption[] = toUIOptions(
    apiConfig?.sauna.ledOptions,
    ledImages
  );
  const saunaBluetoothOptions: ConfigOption[] = toUIOptions(
    apiConfig?.sauna.bluetoothOptions,
    saunaSpeakerImage
  );
  const saunaAccessoryKitOptions: ConfigOption[] = toUIOptions(
    apiConfig?.sauna.accessoryKitOptions,
    saunaAccessoryImages
  );
  const saunaColorOptions: ConfigOption[] = toUIOptions(apiConfig?.sauna.colorOptions, saunaColorThumbs);

  const hotTubSizeOptions: ConfigOption[] = toUIOptions(apiConfig?.hottub.sizeOptions);
  const hotTubJetsOptions: ConfigOption[] = toUIOptions(apiConfig?.hottub.jetsOptions);
  const hotTubLedOptions: ConfigOption[] = toUIOptions(apiConfig?.hottub.ledOptions);
  const hotTubCoverOptions: ConfigOption[] = toUIOptions(apiConfig?.hottub.coverOptions);
  const hotTubColorOptions: ConfigOption[] = toUIOptions(apiConfig?.hottub.colorOptions);

  // Výpočet ceny
  const totalPrice = useMemo(() => {
    if (!apiConfig) return 0;

    if (productCategory === "sauna" && selectedSaunaType) {
      const basePrice = selectedSaunaType.basePrice;
      const heater = apiConfig.sauna.heaterTypes.find((h) => h.id === saunaConfig.heaterType)?.price ?? 0;
      const ledSum = (saunaConfig.led ?? []).reduce((sum, ledId) => {
        const p = apiConfig.sauna.ledOptions.find((l) => l.id === ledId)?.price ?? 0;
        return sum + p;
      }, 0);
      const bluetooth = apiConfig.sauna.bluetoothOptions.find((b) => b.id === saunaConfig.bluetooth)?.price ?? 0;
      const kit = apiConfig.sauna.accessoryKitOptions.find((a) => a.id === saunaConfig.accessoryKit)?.price ?? 0;
      const color = apiConfig.sauna.colorOptions.find((c) => c.id === saunaConfig.color)?.price ?? 0;

      return basePrice + heater + ledSum + bluetooth + kit + color;
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
  }, [productCategory, selectedSaunaType, apiConfig, saunaConfig, hotTubConfig]);

  const originalPrice = useMemo(() => Math.round(totalPrice * 1.15), [totalPrice]);
  const discount = originalPrice > 0 ? Math.round(((originalPrice - totalPrice) / originalPrice) * 100) : 0;

  const addToCart = async () => {
    if (!productCategory || !apiConfig) return;

    setIsAddingToCart(true);

    try {
      const options = productCategory === "sauna" 
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
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || "Nepodarilo sa pridať do košíka");
      }

      toast({
        title: "Pridané do košíka",
        description: "Produkt bol úspešne pridaný do košíka.",
      });

      window.location.href = "/kosik/";
    } catch (error) {
      console.error("Add to cart error:", error);
      toast({
        title: "Chyba",
        description: error instanceof Error ? error.message : "Nepodarilo sa pridať do košíka",
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
      led: [],
      bluetooth: "none",
      accessoryKit: "none",
      color: "none",
    });
  };

  const goBackToSaunaTypes = () => {
    setSelectedSaunaType(null);
    setSaunaConfig({
      heaterType: "none",
      led: [],
      bluetooth: "none",
      accessoryKit: "none",
      color: "none",
    });
    setCurrentImageIndex(0);
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
        <span className="text-xs text-muted-foreground">{option.price === 0 ? "0,00 €" : "V cene"}</span>
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
        <main className="pt-24 pb-16">
          <div className="container mx-auto px-4">
            <div className="max-w-xl mx-auto text-center">
              <h1 className="font-display text-3xl font-bold mb-2">Konfigurátor</h1>
              <p className="text-muted-foreground">
                Konfiguráciu sa nepodarilo načítať. Skús refresh alebo skontroluj endpoint{" "}
                <span className="font-mono">/wp-json/sauna/v1/config</span>.
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
        <main className="pt-24 pb-16">
          <div className="container mx-auto px-4">
            <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
              <a href="/" className="hover:text-primary transition-colors">
                Domov
              </a>
              <span>/</span>
              <span className="text-foreground">Konfigurátor</span>
            </nav>

            <div className="max-w-4xl mx-auto text-center mb-12">
              <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
                Čo si prajete <span className="text-gradient-amber">nakonfigurovať?</span>
              </h1>
              <p className="text-muted-foreground text-lg">
                Vyberte si typ produktu a prispôsobte si ho presne podľa vašich predstáv.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {/* Sauna */}
              <button
                onClick={() => {
                  setProductCategory("sauna");
                  setCurrentImageIndex(0);
                }}
                className="group relative overflow-hidden rounded-2xl border-2 border-border/50 hover:border-primary/50 transition-all bg-card/50"
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={saunaBarrel}
                    alt="Sauna"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/30 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h2 className="font-display text-3xl font-bold text-foreground mb-2">Sauna</h2>
                  <p className="text-muted-foreground mb-4">
                    Nakonfigurujte si vlastnú saunu s výberom ohrievača, osvetlenia a príslušenstva.
                  </p>
                  <div className="flex items-center gap-2 text-primary font-medium">
                    <span>Od {Math.min(...saunaTypes.map(s => s.basePrice)).toLocaleString()} €</span>
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
                className="group relative overflow-hidden rounded-2xl border-2 border-border/50 hover:border-primary/50 transition-all bg-card/50"
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={hotTub}
                    alt="Kaďa"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/30 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h2 className="font-display text-3xl font-bold text-foreground mb-2">Kaďa</h2>
                  <p className="text-muted-foreground mb-4">
                    Vyberte si veľkosť, trysky, osvetlenie a ďalšie doplnky pre vašu kaďu.
                  </p>
                  <div className="flex items-center gap-2 text-primary font-medium">
                    <span>Od {apiConfig.hottub.basePrice.toLocaleString()} €</span>
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
        <main className="pt-24 pb-16">
          <div className="container mx-auto px-4">
            {/* Tlačidlo späť */}
            <button
              onClick={goBackToCategory}
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-6 group"
            >
              <ChevronLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
              <span>Späť na výber produktu</span>
            </button>

            <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
              <a href="/" className="hover:text-primary transition-colors">
                Domov
              </a>
              <span>/</span>
              <button onClick={goBackToCategory} className="hover:text-primary transition-colors">
                Konfigurátor
              </button>
              <span>/</span>
              <span className="text-foreground">Výber sauny</span>
            </nav>

            <div className="max-w-5xl mx-auto text-center mb-12">
              <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
                Vyberte si <span className="text-gradient-amber">typ sauny</span>
              </h1>
              <p className="text-muted-foreground text-lg">
                Každá sauna má svoje jedinečné vlastnosti a možnosti konfigurácie.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {saunaTypes.map((sauna) => (
                <button
                  key={sauna.id}
                  onClick={() => {
                    setSelectedSaunaType(sauna);
                    setCurrentImageIndex(0);
                    setShowScrollIndicator(true);
                  }}
                  className="group relative overflow-hidden rounded-2xl border-2 border-border/50 hover:border-primary transition-all bg-card/50 text-left"
                >
                  <div className="aspect-[4/3] overflow-hidden">
                    <img
                      src={sauna.image}
                      alt={sauna.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
                  
                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <h3 className="font-display text-xl font-bold text-foreground mb-2">
                      {sauna.name}
                    </h3>
                    
                    {/* Rozmery - výrazné zobrazenie */}
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-primary/20 border border-primary/30 mb-3">
                      <span className="text-lg font-bold text-primary tracking-wide">{sauna.dimensions}</span>
                    </div>
                    
                    {/* Dostupné možnosti */}
                    <div className="flex flex-wrap gap-1.5 mb-3">
                      {sauna.hasHeater && (
                        <span className="text-xs px-2 py-0.5 rounded-full bg-muted/50 text-muted-foreground">Ohrievač</span>
                      )}
                      {sauna.hasLed && (
                        <span className="text-xs px-2 py-0.5 rounded-full bg-muted/50 text-muted-foreground">LED</span>
                      )}
                      {sauna.hasBluetooth && (
                        <span className="text-xs px-2 py-0.5 rounded-full bg-muted/50 text-muted-foreground">Bluetooth</span>
                      )}
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-xl font-bold text-primary">{sauna.basePrice.toLocaleString()} €</span>
                      <ChevronRight className="w-5 h-5 text-primary transition-transform group-hover:translate-x-1" />
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
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Tlačidlo späť */}
          <button
            onClick={productCategory === "sauna" ? goBackToSaunaTypes : goBackToCategory}
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-6 group"
          >
            <ChevronLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            <span>{productCategory === "sauna" ? "Späť na výber sauny" : "Späť na výber produktu"}</span>
          </button>

          <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
            <a href="/" className="hover:text-primary transition-colors">
              Domov
            </a>
            <span>/</span>
            <button onClick={goBackToCategory} className="hover:text-primary transition-colors">
              Konfigurátor
            </button>
            <span>/</span>
            {productCategory === "sauna" ? (
              <>
                <button onClick={goBackToSaunaTypes} className="hover:text-primary transition-colors">
                  Sauny
                </button>
                <span>/</span>
                <span className="text-foreground">{selectedSaunaType?.name}</span>
              </>
            ) : (
              <span className="text-foreground">Kaďa</span>
            )}
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
                  alt={productCategory === "sauna" ? selectedSaunaType?.name : "Kaďa"}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />

                <button className="absolute bottom-4 left-4 p-3 bg-background/80 backdrop-blur-sm rounded-full hover:bg-background transition-colors">
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
                  <span className="text-lg font-medium">Celková cena</span>
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
                  {isAddingToCart ? "Pridávam..." : "Pridať do košíka"}
                </Button>

                <p className="text-xs text-muted-foreground text-center mt-3">* Cena nezahŕňa dopravu a inštaláciu</p>
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
                  <span className="text-xs">Scrolluj pre viac možností</span>
                  <ChevronDown className="w-4 h-4" />
                </div>
              </div>

              <ScrollArea className="lg:h-[calc(100vh-8rem)]" onScrollCapture={handleScroll}>
                <div className="space-y-8 pr-4 pb-24">
                  <div>
                    <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-2">
                      {productCategory === "sauna" ? selectedSaunaType?.name : "Konfigurácia kade"}
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
                      {/* Typ ohrievača */}
                      {selectedSaunaType.hasHeater && (
                        <div>
                          <h3 className="text-lg font-semibold text-foreground mb-3">
                            Typ ohrievača <span className="text-primary">*</span>
                          </h3>
                          <div className="grid grid-cols-3 gap-3">
                            {saunaHeaterTypes.map((option) => (
                              <OptionCard
                                key={option.id}
                                option={option}
                                isSelected={saunaConfig.heaterType === option.id}
                                onClick={() => setSaunaConfig((prev) => ({ ...prev, heaterType: option.id }))}
                                showImage={true}
                              />
                            ))}
                          </div>
                        </div>
                      )}

                      {/* LED osvetlenie */}
                      {selectedSaunaType.hasLed && (
                        <div>
                          <h3 className="text-lg font-semibold text-foreground mb-3">
                            LED osvetlenie <span className="text-primary">*</span>
                          </h3>
                          <div className="grid grid-cols-3 gap-3">
                            {/* Bez LED = reset */}
                            <OptionCard
                              option={{ id: "none", name: "Bez LED", price: 0 }}
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

                      {/* Bluetooth reproduktor */}
                      {selectedSaunaType.hasBluetooth && (
                        <div>
                          <h3 className="text-lg font-semibold text-foreground mb-3">
                            Bluetooth reproduktor <span className="text-primary">*</span>
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
                            Saunová sada <span className="text-primary">*</span>
                          </h3>
                          <p className="text-xs text-muted-foreground mb-2 italic">
                            *Sada obsahuje vedierko s naberačkou, presýpacie hodiny a teplomer.
                          </p>
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
                            Farba <span className="text-primary">*</span>
                          </h3>
                          <div className="grid grid-cols-5 gap-3">
                            {saunaColorOptions.map((option) => (
                              <OptionCard
                                key={option.id}
                                option={option}
                                isSelected={saunaConfig.color === option.id}
                                onClick={() => setSaunaConfig((prev) => ({ ...prev, color: option.id }))}
                                showImage={true}
                                size="small"
                              />
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="space-y-6">
                      {/* Veľkosť */}
                      <div>
                        <h3 className="text-lg font-semibold text-foreground mb-3">
                          Veľkosť <span className="text-primary">*</span>
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
                          Masážne trysky <span className="text-primary">*</span>
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
                          LED osvetlenie <span className="text-primary">*</span>
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
                          Kryt <span className="text-primary">*</span>
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
                          Farba <span className="text-primary">*</span>
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
                    <span className="text-lg font-medium">Celková cena</span>
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
                    {isAddingToCart ? "Pridávam..." : "Pridať do košíka"}
                  </Button>

                  <p className="text-xs text-muted-foreground text-center mt-3">* Cena nezahŕňa dopravu a inštaláciu</p>
                </div>
              </ScrollArea>
            </div>
          </div>
        </div>
      </main>
      <ConfiguratorFooter />
    </div>
  );
};

export default Configurator;

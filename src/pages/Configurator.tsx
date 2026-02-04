import { useEffect, useMemo, useState, useRef, useCallback } from "react";
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

/* ================= TYPES ================= */

type ProductCategory = "sauna" | "hottub";
type WoodType = "spruce" | "thermo";
type SaunaColorType = string;

type ApiOption = {
  id: string;
  label: string;
  price: number;
};

type ApiSaunaType = {
  id: string;
  label: string;
  woodTypes: WoodType[];
  hasExteriorLed: boolean;
};

type ApiConfig = {
  products: {
    sauna: number;
    hottub: number;
  };

  saunaTypes: ApiSaunaType[];

  sauna: {
    heaterTypes: ApiOption[];
    ledOptions: ApiOption[];
    bluetoothOptions: ApiOption[];
    accessoryKitOptions: ApiOption[];
    colorOptions: ApiOption[];
  };

  heaterModels: {
    electric: Record<string, ApiOption>;
    wood: Record<string, ApiOption>;
  };

  exteriorLed: {
    label: string;
    price: number;
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

type ConfigOption = {
  id: string;
  name: string;
  price: number;
  image?: string;
};

/* ================= COMPONENT ================= */

const Configurator = () => {
  const { toast } = useToast();
  const { t, language } = useLanguage();

  const [apiConfig, setApiConfig] = useState<ApiConfig | null>(null);
  const [isConfigLoading, setIsConfigLoading] = useState(true);

  const [productCategory, setProductCategory] = useState<ProductCategory | null>(null);
  const [selectedSaunaType, setSelectedSaunaType] = useState<ApiSaunaType | null>(null);

  const [saunaConfig, setSaunaConfig] = useState({
    heaterType: "none",
    heaterModel: "none",
    led: [] as string[],
    exteriorLed: false,
    bluetooth: "none",
    accessoryKit: "none",
    color: "none" as SaunaColorType,
    woodType: "spruce" as WoodType,
  });

  const [hotTubConfig, setHotTubConfig] = useState({
    size: "standard",
    jets: "none",
    led: "none",
    cover: "none",
    color: "none",
  });

  const [serverPrice, setServerPrice] = useState<number>(0);
  const [isPriceLoading, setIsPriceLoading] = useState(false);
  const [isAddingToCart, setIsAddingToCart] = useState(false);

  /* ================= LOAD CONFIG ================= */

  useEffect(() => {
    let mounted = true;

    (async () => {
      try {
        const res = await fetch("/wp-json/sauna/v1/config", { credentials: "include" });
        if (!res.ok) throw new Error("Config error");
        const data = (await res.json()) as ApiConfig;
        if (mounted) setApiConfig(data);
      } catch {
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

  /* ================= PRICE FROM SERVER ================= */

  const calculatePrice = useCallback(async () => {
    if (!apiConfig || !productCategory) return;

    const options =
      productCategory === "sauna"
        ? { productCategory, image: currentSaunaImage, saunaTypeId: selectedSaunaType?.id, ...saunaConfig }
        : { productCategory, ...hotTubConfig };

    try {
      setIsPriceLoading(true);

      const res = await fetch("/wp-json/sauna/v1/price", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ options }),
      });

      if (!res.ok) throw new Error("Price error");

      const data = await res.json();
      setServerPrice(Number(data.price || 0));
    } catch {
      setServerPrice(0);
    } finally {
      setIsPriceLoading(false);
    }
  }, [apiConfig, productCategory, saunaConfig, hotTubConfig, selectedSaunaType]);

  useEffect(() => {
    calculatePrice();
  }, [calculatePrice]);

  /* ================= ADD TO CART ================= */

  const addToCart = async () => {
    if (!apiConfig || !productCategory) return;

    setIsAddingToCart(true);

    try {
      const options =
        productCategory === "sauna"
          ? { productCategory, saunaTypeId: selectedSaunaType?.id, ...saunaConfig }
          : { productCategory, ...hotTubConfig };

      const product_id = apiConfig.products[productCategory];

      const res = await fetch("/wp-json/sauna/v1/add-to-cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ product_id, qty: 1, options }),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.message || "Add to cart error");
      }

      toast({
        title: "Pridané do košíka",
        description: "Produkt bol úspešne pridaný do košíka.",
      });

      window.location.href = "/kosik/";
    } catch (e: any) {
      toast({
        title: "Chyba",
        description: e.message || "Nepodarilo sa pridať do košíka",
        variant: "destructive",
      });
    } finally {
      setIsAddingToCart(false);
    }
  };

  /* ================= UI ================= */

  if (isConfigLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-6 h-6 animate-spin" />
      </div>
    );
  }

  if (!apiConfig) return null;

  return (
    <div className="min-h-screen bg-background">
      <ConfiguratorHeader />

      <main className="pt-26 pb-16">
        <div className="container mx-auto px-4">
          {!productCategory && (
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <Button onClick={() => setProductCategory("sauna")}>{t("config.sauna")}</Button>
              <Button onClick={() => setProductCategory("hottub")}>{t("config.hottub")}</Button>
            </div>
          )}

          {productCategory && (
            <div className="mt-12 border rounded-2xl p-6 bg-card/50">
              <div className="flex items-center justify-between mb-4">
                <span className="text-lg font-medium">{t("config.total")}</span>
                {isPriceLoading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <span className="text-3xl font-bold text-primary">{serverPrice.toLocaleString()} €</span>
                )}
              </div>

              <Button variant="luxury" size="lg" className="w-full gap-2" onClick={addToCart} disabled={isAddingToCart}>
                {isAddingToCart ? <Loader2 className="w-5 h-5 animate-spin" /> : <ShoppingCart className="w-5 h-5" />}
                {t("config.addToCart")}
              </Button>

              <p className="text-xs text-muted-foreground text-center mt-3">
                {language === "en"
                  ? "* Price does not include delivery and installation"
                  : "* Cena nezahŕňa dopravu a inštaláciu"}
              </p>
            </div>
          )}
        </div>
      </main>

      <ConfiguratorFooter />
    </div>
  );
};

export default Configurator;

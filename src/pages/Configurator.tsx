import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Check, ShoppingCart, ChevronLeft, ChevronRight, Expand, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/hooks/use-toast";
import saunaBarrel from "@/assets/sauna-barrel.jpg";
import saunaCube from "@/assets/sauna-cube.jpg";
import saunaTraditional from "@/assets/sauna-traditional.jpg";
import saunaInterior from "@/assets/sauna-interior.jpg";

type IdRow = { id: string; label: string; price?: number; basePrice?: number; capacity?: string };
type ApiConfig = {
  types: IdRow[];
  sizes: IdRow[];
  woods: IdRow[];
  heaterTypes: { id: string; label: string }[];
  woodHeaters: IdRow[];
  electricHeaters: IdRow[];
  chimneys: IdRow[];
  doors: IdRow[];
  roofs: IdRow[];
  windows: IdRow[];
  leds: IdRow[];
  extras: IdRow[];
  settings?: { chimneyOnlyWithWoodHeater?: boolean };
};

const Configurator = () => {
  const { toast } = useToast();

  const [apiConfig, setApiConfig] = useState<ApiConfig | null>(null);
  const [isLoadingConfig, setIsLoadingConfig] = useState(true);

  const typeImages: Record<string, string> = {
    barrel: saunaBarrel,
    cube: saunaCube,
    cabin: saunaTraditional,
  };

  const woodImages: Record<string, string> = {
    spruce: saunaInterior,
    thermowood: saunaBarrel,
    cedar: saunaTraditional,
  };

  const chimneyImages: Record<string, string> = {
    none: saunaBarrel,
    basic: saunaCube,
    insulated: saunaTraditional,
    premium: saunaInterior,
  };

  const doorImages: Record<string, string> = {
    wood: saunaTraditional,
    glass: saunaCube,
    panoramic: saunaBarrel,
    colored: saunaInterior,
  };

  const roofImages: Record<string, string> = {
    shingle: saunaBarrel,
    metal: saunaCube,
    green: saunaTraditional,
    flat: saunaInterior,
  };

  const windowImages: Record<string, string> = {
    none: saunaInterior,
    small: saunaBarrel,
    medium: saunaCube,
    panoramic: saunaTraditional,
  };

  const ledImages: Record<string, string> = {
    none: saunaInterior,
    basic: saunaBarrel,
    rgb: saunaCube,
    fiber: saunaTraditional,
  };

  const heaterTypeIcons: Record<string, string> = {
    none: "✕",
    electric: "⚡",
    wood: "🔥",
  };

  const [config, setConfig] = useState({
    type: "barrel",
    size: "3m",
    heaterType: "wood",
    heater: "harvia-m3",
    wood: "spruce",
    chimney: "basic",
    door: "wood",
    roof: "shingle",
    window: "none",
    led: "none",
    extras: [] as string[],
  });

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isAddingToCart, setIsAddingToCart] = useState(false);

  // Načítaj config z WP
  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        setIsLoadingConfig(true);
        const res = await fetch("/wp-json/sauna/v1/config", { credentials: "include" });
        if (!res.ok) throw new Error("Nepodarilo sa načítať konfiguráciu.");
        const data = (await res.json()) as ApiConfig;

        if (cancelled) return;

        setApiConfig(data);

        const safe = (id: string, list: { id: string }[], fallback: string) =>
          list?.some((x) => x.id === id) ? id : fallback;

        const defaultType = data.types?.[0]?.id || "barrel";
        const defaultSize = data.sizes?.[0]?.id || "3m";
        const defaultWood = data.woods?.[0]?.id || "spruce";
        const defaultHeaterType = data.heaterTypes?.some((x) => x.id === "wood")
          ? "wood"
          : data.heaterTypes?.[0]?.id || "none";

        const defaultHeater =
          defaultHeaterType === "wood"
            ? data.woodHeaters?.find((h) => h.id !== "none")?.id || "none"
            : defaultHeaterType === "electric"
              ? data.electricHeaters?.find((h) => h.id !== "none")?.id || "none"
              : "none";

        setConfig((prev) => ({
          ...prev,
          type: safe(prev.type, data.types, defaultType),
          size: safe(prev.size, data.sizes, defaultSize),
          wood: safe(prev.wood, data.woods, defaultWood),
          heaterType: safe(prev.heaterType, data.heaterTypes as any, defaultHeaterType),
          heater: (prev.heaterType === "wood" ? data.woodHeaters : data.electricHeaters)?.some(
            (h) => h.id === prev.heater
          )
            ? prev.heater
            : defaultHeater,
          chimney: safe(prev.chimney, data.chimneys, "none"),
          door: safe(prev.door, data.doors, "wood"),
          roof: safe(prev.roof, data.roofs, "shingle"),
          window: safe(prev.window, data.windows, "none"),
          led: safe(prev.led, data.leds, "none"),
        }));
      } catch (e) {
        const msg = e instanceof Error ? e.message : "Chyba pri načítaní konfigurácie.";
        toast({ title: "Chyba", description: msg, variant: "destructive" });
        setApiConfig(null);
      } finally {
        if (!cancelled) setIsLoadingConfig(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [toast]);

  // Chimney reset - MUSÍ byť pred conditional return!
  useEffect(() => {
    if (apiConfig?.settings?.chimneyOnlyWithWoodHeater && config.heaterType !== "wood" && config.chimney !== "none") {
      setConfig((prev) => ({ ...prev, chimney: "none" }));
    }
  }, [config.heaterType, config.chimney, apiConfig?.settings?.chimneyOnlyWithWoodHeater]);

  // Loading state
  if (isLoadingConfig || !apiConfig) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="flex items-center gap-3 text-muted-foreground">
          <Loader2 className="w-5 h-5 animate-spin" />
          Načítavam konfigurátor…
        </div>
      </div>
    );
  }

  // Mapovanie API config → UI arrays
  const saunaTypes = apiConfig.types.map((t) => ({
    id: t.id,
    name: t.label,
    basePrice: t.basePrice || 0,
    image: typeImages[t.id] || saunaBarrel,
  }));

  const sizes = apiConfig.sizes.map((s) => ({
    id: s.id,
    name: s.label,
    capacity: s.capacity || "",
    price: s.price || 0,
  }));

  const woodTypes = apiConfig.woods.map((w) => ({
    id: w.id,
    name: w.label,
    price: w.price || 0,
    image: woodImages[w.id] || saunaInterior,
  }));

  const heaterTypes = apiConfig.heaterTypes.map((h) => ({
    id: h.id,
    name: h.label,
    price: 0,
    icon: heaterTypeIcons[h.id] || "•",
  }));

  const woodHeaters = apiConfig.woodHeaters.map((h) => ({
    id: h.id,
    name: h.label,
    price: h.price || 0,
  }));

  const electricHeaters = apiConfig.electricHeaters.map((h) => ({
    id: h.id,
    name: h.label,
    price: h.price || 0,
  }));

  const chimneys = apiConfig.chimneys.map((c) => ({
    id: c.id,
    name: c.label,
    price: c.price || 0,
    image: chimneyImages[c.id] || saunaBarrel,
  }));

  const doors = apiConfig.doors.map((d) => ({
    id: d.id,
    name: d.label,
    price: d.price || 0,
    image: doorImages[d.id] || saunaTraditional,
  }));

  const roofs = apiConfig.roofs.map((r) => ({
    id: r.id,
    name: r.label,
    price: r.price || 0,
    image: roofImages[r.id] || saunaBarrel,
  }));

  const windows = apiConfig.windows.map((w) => ({
    id: w.id,
    name: w.label,
    price: w.price || 0,
    image: windowImages[w.id] || saunaInterior,
  }));

  const ledLights = apiConfig.leds.map((l) => ({
    id: l.id,
    name: l.label,
    price: l.price || 0,
    image: ledImages[l.id] || saunaInterior,
  }));

  const extras = apiConfig.extras.map((e) => ({
    id: e.id,
    name: e.label,
    price: e.price || 0,
  }));

  // Selected položky
  const selectedType = saunaTypes.find((t) => t.id === config.type);
  const selectedSize = sizes.find((s) => s.id === config.size);
  const selectedHeater =
    config.heaterType === "wood"
      ? woodHeaters.find((h) => h.id === config.heater)
      : electricHeaters.find((h) => h.id === config.heater);
  const selectedWood = woodTypes.find((w) => w.id === config.wood);
  const selectedChimney = chimneys.find((c) => c.id === config.chimney);
  const selectedDoor = doors.find((d) => d.id === config.door);
  const selectedRoof = roofs.find((r) => r.id === config.roof);
  const selectedWindow = windows.find((w) => w.id === config.window);
  const selectedLed = ledLights.find((l) => l.id === config.led);

  const images = [selectedType?.image || saunaBarrel, saunaInterior, saunaCube, saunaTraditional];

  // Ceny v UI (len vizuálne)
  const originalPrice = useMemo(() => {
    let price = selectedType?.basePrice || 0;
    price += selectedSize?.price || 0;
    price += selectedHeater?.price || 0;
    price += selectedWood?.price || 0;
    price += selectedChimney?.price || 0;
    price += selectedDoor?.price || 0;
    price += selectedRoof?.price || 0;
    price += selectedWindow?.price || 0;
    price += selectedLed?.price || 0;
    config.extras.forEach((extraId) => {
      const extra = extras.find((e) => e.id === extraId);
      if (extra) price += extra.price;
    });
    return Math.round(price * 1.15);
  }, [config, selectedType, selectedSize, selectedHeater, selectedWood, selectedChimney, selectedDoor, selectedRoof, selectedWindow, selectedLed, extras]);

  const totalPrice = useMemo(() => {
    let price = selectedType?.basePrice || 0;
    price += selectedSize?.price || 0;
    price += selectedHeater?.price || 0;
    price += selectedWood?.price || 0;
    price += selectedChimney?.price || 0;
    price += selectedDoor?.price || 0;
    price += selectedRoof?.price || 0;
    price += selectedWindow?.price || 0;
    price += selectedLed?.price || 0;
    config.extras.forEach((extraId) => {
      const extra = extras.find((e) => e.id === extraId);
      if (extra) price += extra.price;
    });
    return price;
  }, [config, selectedType, selectedSize, selectedHeater, selectedWood, selectedChimney, selectedDoor, selectedRoof, selectedWindow, selectedLed, extras]);

  const toggleExtra = (id: string) => {
    setConfig((prev) => ({
      ...prev,
      extras: prev.extras.includes(id) ? prev.extras.filter((e) => e !== id) : [...prev.extras, id],
    }));
  };

  const discount = Math.round(((originalPrice - totalPrice) / originalPrice) * 100);

  const addToCart = async () => {
    setIsAddingToCart(true);

    try {
      const response = await fetch("/wp-json/sauna/v1/add-to-cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          product_id: 96,
          qty: 1,
          options: config,
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

  return (
    <div className="min-h-screen bg-background">
      <main className="py-8">
        <div className="container mx-auto px-4">
          <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
            <Link to="/" className="hover:text-primary transition-colors">
              Domov
            </Link>
            <span>/</span>
            <Link to="/shop" className="hover:text-primary transition-colors">
              Sauny
            </Link>
            <span>/</span>
            <span className="text-foreground">Konfigurátor</span>
          </nav>

          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
            <div className="lg:sticky lg:top-28 lg:h-fit space-y-4">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-card group">
                {discount > 0 && (
                  <div className="absolute top-4 left-4 z-10 px-3 py-1 bg-destructive text-destructive-foreground text-sm font-bold rounded-full">
                    -{discount}%
                  </div>
                )}
                <img
                  src={images[currentImageIndex]}
                  alt="Sauna preview"
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
                        : "opacity-60 hover:opacity-100"
                    )}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>

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

            <ScrollArea className="lg:h-[calc(100vh-8rem)]">
              <div className="space-y-8 pr-4">
                <div>
                  <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-3">
                    {selectedType?.name} {selectedSize?.name}
                  </h1>
                  <div className="flex items-baseline gap-3 lg:hidden">
                    <span className="text-muted-foreground line-through text-lg">
                      {originalPrice.toLocaleString()} €
                    </span>
                    <span className="text-3xl font-bold text-primary">{totalPrice.toLocaleString()} €</span>
                  </div>
                </div>

                <div className="space-y-6">
                  {/* Typ sauny */}
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-3">Typ sauny *</h3>
                    <div className="grid grid-cols-3 gap-3">
                      {saunaTypes.map((type) => (
                        <button
                          key={type.id}
                          onClick={() => setConfig((prev) => ({ ...prev, type: type.id }))}
                          className={cn(
                            "flex flex-col items-center p-3 rounded-xl border-2 transition-all",
                            config.type === type.id
                              ? "border-primary bg-primary/5"
                              : "border-border/50 hover:border-primary/50 bg-card/50"
                          )}
                        >
                          <img src={type.image} alt={type.name} className="w-16 h-16 rounded-lg object-cover mb-2" />
                          <span className="text-sm font-medium">{type.name}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Veľkosť */}
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-3">Veľkosť *</h3>
                    <div className="grid grid-cols-4 gap-3">
                      {sizes.map((size) => (
                        <button
                          key={size.id}
                          onClick={() => setConfig((prev) => ({ ...prev, size: size.id }))}
                          className={cn(
                            "flex flex-col items-center justify-center p-3 rounded-xl border-2 transition-all",
                            config.size === size.id
                              ? "border-primary bg-primary/5"
                              : "border-border/50 hover:border-primary/50 bg-card/50"
                          )}
                        >
                          <span className="font-bold">{size.name}</span>
                          <span className="text-xs text-muted-foreground">{size.capacity}</span>
                          {size.price > 0 && <span className="text-xs text-primary">+{size.price} €</span>}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Typ dreva */}
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-3">Typ dreva *</h3>
                    <div className="grid grid-cols-3 gap-3">
                      {woodTypes.map((wood) => (
                        <button
                          key={wood.id}
                          onClick={() => setConfig((prev) => ({ ...prev, wood: wood.id }))}
                          className={cn(
                            "flex flex-col items-center p-3 rounded-xl border-2 transition-all",
                            config.wood === wood.id
                              ? "border-primary bg-primary/5"
                              : "border-border/50 hover:border-primary/50 bg-card/50"
                          )}
                        >
                          <img src={wood.image} alt={wood.name} className="w-16 h-16 rounded-lg object-cover mb-2" />
                          <span className="text-sm font-medium">{wood.name}</span>
                          <span className={cn("text-xs", wood.price > 0 ? "text-primary" : "text-muted-foreground")}>
                            {wood.price > 0 ? `+${wood.price} €` : "V cene"}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Typ ohrievača */}
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-3">Typ ohrievača *</h3>
                    <div className="grid grid-cols-3 gap-3">
                      {heaterTypes.map((heater) => (
                        <button
                          key={heater.id}
                          onClick={() =>
                            setConfig((prev) => ({
                              ...prev,
                              heaterType: heater.id,
                              heater:
                                heater.id === "wood"
                                  ? woodHeaters.find((x) => x.id !== "none")?.id || "none"
                                  : heater.id === "electric"
                                    ? electricHeaters.find((x) => x.id !== "none")?.id || "none"
                                    : "none",
                            }))
                          }
                          className={cn(
                            "flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all",
                            config.heaterType === heater.id
                              ? "border-primary bg-primary/5"
                              : "border-border/50 hover:border-primary/50 bg-card/50"
                          )}
                        >
                          <span className="text-2xl mb-1">{heater.icon}</span>
                          <span className="text-sm font-medium">{heater.name}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Model ohrievača */}
                  {config.heaterType !== "none" && (
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground mb-3">
                        {config.heaterType === "wood" ? "Pec na drevo" : "Elektrický ohrievač"}
                      </h3>
                      <div className="grid grid-cols-2 gap-3">
                        {(config.heaterType === "wood" ? woodHeaters : electricHeaters).map((heater) => (
                          <button
                            key={heater.id}
                            onClick={() => setConfig((prev) => ({ ...prev, heater: heater.id }))}
                            className={cn(
                              "flex flex-col items-center justify-center p-3 rounded-xl border-2 transition-all",
                              config.heater === heater.id
                                ? "border-primary bg-primary/5"
                                : "border-border/50 hover:border-primary/50 bg-card/50"
                            )}
                          >
                            <span className="text-sm font-medium">{heater.name}</span>
                            <span className={cn("text-xs", (heater.price || 0) > 0 ? "text-primary" : "text-muted-foreground")}>
                              {(heater.price || 0) > 0 ? `+${heater.price} €` : "0 €"}
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Komín */}
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-3">Komín</h3>
                    <div className="grid grid-cols-4 gap-3">
                      {chimneys.map((chimney) => (
                        <button
                          key={chimney.id}
                          onClick={() => setConfig((prev) => ({ ...prev, chimney: chimney.id }))}
                          disabled={apiConfig.settings?.chimneyOnlyWithWoodHeater && config.heaterType !== "wood"}
                          className={cn(
                            "flex flex-col items-center p-3 rounded-xl border-2 transition-all",
                            apiConfig.settings?.chimneyOnlyWithWoodHeater && config.heaterType !== "wood"
                              ? "opacity-50 cursor-not-allowed border-border/50 bg-card/50"
                              : config.chimney === chimney.id
                                ? "border-primary bg-primary/5"
                                : "border-border/50 hover:border-primary/50 bg-card/50"
                          )}
                        >
                          <img src={chimney.image} alt={chimney.name} className="w-12 h-12 rounded-lg object-cover mb-2" />
                          <span className="text-sm font-medium">{chimney.name}</span>
                          <span className={cn("text-xs", chimney.price > 0 ? "text-primary" : "text-muted-foreground")}>
                            {chimney.price > 0 ? `+${chimney.price} €` : "V cene"}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Dvere */}
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-3">Dvere</h3>
                    <div className="grid grid-cols-4 gap-3">
                      {doors.map((door) => (
                        <button
                          key={door.id}
                          onClick={() => setConfig((prev) => ({ ...prev, door: door.id }))}
                          className={cn(
                            "flex flex-col items-center p-3 rounded-xl border-2 transition-all",
                            config.door === door.id
                              ? "border-primary bg-primary/5"
                              : "border-border/50 hover:border-primary/50 bg-card/50"
                          )}
                        >
                          <img src={door.image} alt={door.name} className="w-12 h-12 rounded-lg object-cover mb-2" />
                          <span className="text-sm font-medium">{door.name}</span>
                          <span className={cn("text-xs", door.price > 0 ? "text-primary" : "text-muted-foreground")}>
                            {door.price > 0 ? `+${door.price} €` : "V cene"}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Strecha */}
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-3">Strecha</h3>
                    <div className="grid grid-cols-4 gap-3">
                      {roofs.map((roof) => (
                        <button
                          key={roof.id}
                          onClick={() => setConfig((prev) => ({ ...prev, roof: roof.id }))}
                          className={cn(
                            "flex flex-col items-center p-3 rounded-xl border-2 transition-all",
                            config.roof === roof.id
                              ? "border-primary bg-primary/5"
                              : "border-border/50 hover:border-primary/50 bg-card/50"
                          )}
                        >
                          <img src={roof.image} alt={roof.name} className="w-12 h-12 rounded-lg object-cover mb-2" />
                          <span className="text-sm font-medium">{roof.name}</span>
                          <span className={cn("text-xs", roof.price > 0 ? "text-primary" : "text-muted-foreground")}>
                            {roof.price > 0 ? `+${roof.price} €` : "V cene"}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Okná */}
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-3">Okná</h3>
                    <div className="grid grid-cols-4 gap-3">
                      {windows.map((window) => (
                        <button
                          key={window.id}
                          onClick={() => setConfig((prev) => ({ ...prev, window: window.id }))}
                          className={cn(
                            "flex flex-col items-center p-3 rounded-xl border-2 transition-all",
                            config.window === window.id
                              ? "border-primary bg-primary/5"
                              : "border-border/50 hover:border-primary/50 bg-card/50"
                          )}
                        >
                          <img src={window.image} alt={window.name} className="w-12 h-12 rounded-lg object-cover mb-2" />
                          <span className="text-sm font-medium">{window.name}</span>
                          <span className={cn("text-xs", window.price > 0 ? "text-primary" : "text-muted-foreground")}>
                            {window.price > 0 ? `+${window.price} €` : "V cene"}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* LED osvetlenie */}
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-3">LED osvetlenie</h3>
                    <div className="grid grid-cols-4 gap-3">
                      {ledLights.map((led) => (
                        <button
                          key={led.id}
                          onClick={() => setConfig((prev) => ({ ...prev, led: led.id }))}
                          className={cn(
                            "flex flex-col items-center p-3 rounded-xl border-2 transition-all",
                            config.led === led.id
                              ? "border-primary bg-primary/5"
                              : "border-border/50 hover:border-primary/50 bg-card/50"
                          )}
                        >
                          <img src={led.image} alt={led.name} className="w-12 h-12 rounded-lg object-cover mb-2" />
                          <span className="text-sm font-medium">{led.name}</span>
                          <span className={cn("text-xs", led.price > 0 ? "text-primary" : "text-muted-foreground")}>
                            {led.price > 0 ? `+${led.price} €` : "V cene"}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Príslušenstvo */}
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-3">Príslušenstvo</h3>
                    <div className="grid grid-cols-1 gap-2">
                      {extras.map((extra) => (
                        <button
                          key={extra.id}
                          onClick={() => toggleExtra(extra.id)}
                          className={cn(
                            "flex items-center gap-3 px-4 py-3 rounded-xl border-2 transition-all",
                            config.extras.includes(extra.id)
                              ? "border-primary bg-primary/5"
                              : "border-border/50 hover:border-primary/50 bg-card/50"
                          )}
                        >
                          <div className="w-5 h-5 rounded border-2 border-primary flex items-center justify-center">
                            {config.extras.includes(extra.id) && <Check className="w-3 h-3 text-primary" />}
                          </div>
                          <div className="flex-1 text-left">
                            <span className="font-medium">{extra.name}</span>
                            <span className="text-primary ml-2">+{extra.price} €</span>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
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
                    {isAddingToCart ? <Loader2 className="w-5 h-5 animate-spin" /> : <ShoppingCart className="w-5 h-5" />}
                    {isAddingToCart ? "Pridávam..." : "Pridať do košíka"}
                  </Button>

                  <p className="text-xs text-muted-foreground text-center mt-3">* Cena nezahŕňa dopravu a inštaláciu</p>
                </div>
              </div>
            </ScrollArea>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Configurator;

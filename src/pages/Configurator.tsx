import { useState, useMemo } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
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

// Configuration options
const saunaTypes = [
  { id: "barrel", name: "Sudová sauna", basePrice: 4900, image: saunaBarrel },
  { id: "cube", name: "Kubická sauna", basePrice: 7500, image: saunaCube },
  { id: "cabin", name: "Tradičná kabína", basePrice: 9900, image: saunaTraditional },
];

const sizes = [
  { id: "2m", name: "2M", capacity: "2-3 osoby", price: 0 },
  { id: "2.5m", name: "2.5M", capacity: "3-4 osoby", price: 800 },
  { id: "3m", name: "3M", capacity: "4-5 osôb", price: 1600 },
  { id: "4m", name: "4M", capacity: "6-8 osôb", price: 2800 },
];

const heaterTypes = [
  { id: "none", name: "Bez ohrievača", price: 0, icon: "✕" },
  { id: "electric", name: "Elektrický", price: 450, icon: "⚡" },
  { id: "wood", name: "Na drevo", price: 0, icon: "🔥" },
];

const woodHeaters = [
  { id: "none", name: "Bez pece", price: 0 },
  { id: "harvia-m3", name: "Harvia M3", price: 520 },
  { id: "harvia-cilindro", name: "Harvia Cilindro", price: 780 },
  { id: "harvia-pro", name: "Harvia 20 PRO", price: 950 },
  { id: "harvia-legend", name: "Harvia Legend", price: 1290 },
];

const electricHeaters = [
  { id: "none", name: "Bez ohrievača", price: 0 },
  { id: "harvia-6kw", name: "Harvia 6kW", price: 420 },
  { id: "harvia-9kw", name: "Harvia 9kW", price: 580 },
  { id: "harvia-12kw", name: "Harvia 12kW", price: 750 },
];

const woodTypes = [
  { id: "spruce", name: "Smrek", price: 0, image: saunaInterior },
  { id: "thermowood", name: "Thermowood", price: 890, image: saunaBarrel },
  { id: "cedar", name: "Červený céder", price: 1450, image: saunaTraditional },
];

const chimneys = [
  { id: "none", name: "Bez komína", price: 0, image: saunaBarrel },
  { id: "basic", name: "Základný komín", price: 180, image: saunaCube },
  { id: "insulated", name: "Izolovaný komín", price: 320, image: saunaTraditional },
  { id: "premium", name: "Premium nerez", price: 480, image: saunaInterior },
];

const doors = [
  { id: "wood", name: "Drevené dvere", price: 0, image: saunaTraditional },
  { id: "glass", name: "Sklenené dvere", price: 290, image: saunaCube },
  { id: "panoramic", name: "Panoramatické", price: 450, image: saunaBarrel },
  { id: "colored", name: "Tónované sklo", price: 380, image: saunaInterior },
];

const roofs = [
  { id: "shingle", name: "Šindle", price: 0, image: saunaBarrel },
  { id: "metal", name: "Plechová krytina", price: 350, image: saunaCube },
  { id: "green", name: "Zelená strecha", price: 890, image: saunaTraditional },
  { id: "flat", name: "Plochá strecha", price: 420, image: saunaInterior },
];

const windows = [
  { id: "none", name: "Bez okna", price: 0, image: saunaInterior },
  { id: "small", name: "Malé okno", price: 180, image: saunaBarrel },
  { id: "medium", name: "Stredné okno", price: 280, image: saunaCube },
  { id: "panoramic", name: "Panoramatické", price: 520, image: saunaTraditional },
];

const ledLights = [
  { id: "none", name: "Bez LED", price: 0, image: saunaInterior },
  { id: "basic", name: "Základné LED", price: 190, image: saunaBarrel },
  { id: "rgb", name: "RGB LED", price: 340, image: saunaCube },
  { id: "fiber", name: "Hviezdne nebo", price: 680, image: saunaTraditional },
];

const extras = [
  { id: "terrace", name: "Terasa", price: 680 },
  { id: "bench", name: "Vonkajšia lavica", price: 220 },
  { id: "thermometer", name: "Teplomer a vlhkomer", price: 45 },
  { id: "bucket", name: "Drevená nádoba", price: 65 },
];

const Configurator = () => {
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
  }, [
    config,
    selectedType,
    selectedSize,
    selectedHeater,
    selectedWood,
    selectedChimney,
    selectedDoor,
    selectedRoof,
    selectedWindow,
    selectedLed,
  ]);

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
  }, [
    config,
    selectedType,
    selectedSize,
    selectedHeater,
    selectedWood,
    selectedChimney,
    selectedDoor,
    selectedRoof,
    selectedWindow,
    selectedLed,
  ]);

  const toggleExtra = (id: string) => {
    setConfig((prev) => ({
      ...prev,
      extras: prev.extras.includes(id) ? prev.extras.filter((e) => e !== id) : [...prev.extras, id],
    }));
  };

  const discount = Math.round(((originalPrice - totalPrice) / originalPrice) * 100);

  const { toast } = useToast();
  const [isAddingToCart, setIsAddingToCart] = useState(false);

  const addToCart = async () => {
    setIsAddingToCart(true);

    try {
      const response = await fetch("/wp-json/sauna/v1/add-to-cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
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

      // Redirect to checkout page
      window.location.href = "/pokladna/";
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
      <Header />

      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Breadcrumb */}
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
            {/* Image Gallery - Sticky */}
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

                {/* Image navigation */}
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

              {/* Thumbnails */}
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

              {/* Price Summary - Desktop */}
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

            {/* Configuration Panel - Scrollable */}
            <ScrollArea className="lg:h-[calc(100vh-8rem)]">
              <div className="space-y-8 pr-4">
                {/* Title */}
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

                {/* Configuration Options */}
                <div className="space-y-8">
                  {/* Sauna Type */}
                  <div>
                    <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                      Typ sauny <span className="text-primary">*</span>
                    </h3>
                    <div className="grid grid-cols-3 gap-3">
                      {saunaTypes.map((type) => (
                        <button
                          key={type.id}
                          onClick={() => setConfig((prev) => ({ ...prev, type: type.id }))}
                          className={cn(
                            "flex flex-col items-center p-3 rounded-xl border-2 transition-all",
                            config.type === type.id
                              ? "border-primary bg-primary/5"
                              : "border-border/50 hover:border-primary/50 bg-card/50",
                          )}
                        >
                          <img src={type.image} alt={type.name} className="w-full h-16 object-cover rounded-lg mb-2" />
                          <span className="text-xs font-medium text-center">{type.name}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Size */}
                  <div>
                    <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                      Veľkosť <span className="text-primary">*</span>
                    </h3>
                    <div className="grid grid-cols-4 gap-2">
                      {sizes.map((size) => (
                        <button
                          key={size.id}
                          onClick={() => setConfig((prev) => ({ ...prev, size: size.id }))}
                          className={cn(
                            "flex flex-col items-center justify-center p-3 rounded-xl border-2 transition-all",
                            config.size === size.id
                              ? "border-primary bg-primary/5"
                              : "border-border/50 hover:border-primary/50 bg-card/50",
                          )}
                        >
                          <span className="text-lg font-bold">{size.name}</span>
                          <span className="text-xs text-muted-foreground">{size.capacity}</span>
                          {size.price > 0 && <span className="text-xs text-primary mt-1">+{size.price} €</span>}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Wood Type */}
                  <div>
                    <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                      Typ dreva <span className="text-primary">*</span>
                    </h3>
                    <div className="grid grid-cols-3 gap-3">
                      {woodTypes.map((wood) => (
                        <button
                          key={wood.id}
                          onClick={() => setConfig((prev) => ({ ...prev, wood: wood.id }))}
                          className={cn(
                            "flex flex-col items-center p-3 rounded-xl border-2 transition-all",
                            config.wood === wood.id
                              ? "border-primary bg-primary/5"
                              : "border-border/50 hover:border-primary/50 bg-card/50",
                          )}
                        >
                          <img src={wood.image} alt={wood.name} className="w-full h-16 object-cover rounded-lg mb-2" />
                          <span className="text-xs font-medium">{wood.name}</span>
                          <span
                            className={cn("text-xs mt-1", wood.price > 0 ? "text-primary" : "text-muted-foreground")}
                          >
                            {wood.price > 0 ? `+${wood.price} €` : "V cene"}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Heater Type */}
                  <div>
                    <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                      Typ ohrievača <span className="text-primary">*</span>
                    </h3>
                    <div className="grid grid-cols-3 gap-2">
                      {heaterTypes.map((heater) => (
                        <button
                          key={heater.id}
                          onClick={() =>
                            setConfig((prev) => ({
                              ...prev,
                              heaterType: heater.id,
                              heater:
                                heater.id === "wood" ? "harvia-m3" : heater.id === "electric" ? "harvia-6kw" : "none",
                            }))
                          }
                          className={cn(
                            "flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all",
                            config.heaterType === heater.id
                              ? "border-primary bg-primary/5"
                              : "border-border/50 hover:border-primary/50 bg-card/50",
                          )}
                        >
                          <span className="text-2xl mb-1">{heater.icon}</span>
                          <span className="text-xs font-medium text-center">{heater.name}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Specific Heater Model */}
                  {config.heaterType !== "none" && (
                    <div>
                      <h3 className="text-sm font-semibold text-foreground mb-3">
                        {config.heaterType === "wood" ? "Pec na drevo" : "Elektrický ohrievač"}
                      </h3>
                      <div className="grid grid-cols-2 gap-2">
                        {(config.heaterType === "wood" ? woodHeaters : electricHeaters).map((heater) => (
                          <button
                            key={heater.id}
                            onClick={() => setConfig((prev) => ({ ...prev, heater: heater.id }))}
                            className={cn(
                              "flex flex-col items-center justify-center p-3 rounded-xl border-2 transition-all",
                              config.heater === heater.id
                                ? "border-primary bg-primary/5"
                                : "border-border/50 hover:border-primary/50 bg-card/50",
                            )}
                          >
                            <span className="text-sm font-medium text-center mb-1">{heater.name}</span>
                            <span
                              className={cn("text-xs", heater.price > 0 ? "text-primary" : "text-muted-foreground")}
                            >
                              {heater.price > 0 ? `+${heater.price} €` : "0 €"}
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Chimney */}
                  <div>
                    <h3 className="text-sm font-semibold text-foreground mb-3">Komín</h3>
                    <div className="grid grid-cols-2 gap-3">
                      {chimneys.map((chimney) => (
                        <button
                          key={chimney.id}
                          onClick={() => setConfig((prev) => ({ ...prev, chimney: chimney.id }))}
                          className={cn(
                            "flex flex-col items-center p-3 rounded-xl border-2 transition-all",
                            config.chimney === chimney.id
                              ? "border-primary bg-primary/5"
                              : "border-border/50 hover:border-primary/50 bg-card/50",
                          )}
                        >
                          <img
                            src={chimney.image}
                            alt={chimney.name}
                            className="w-full h-16 object-cover rounded-lg mb-2"
                          />
                          <span className="text-xs font-medium text-center">{chimney.name}</span>
                          <span
                            className={cn("text-xs mt-1", chimney.price > 0 ? "text-primary" : "text-muted-foreground")}
                          >
                            {chimney.price > 0 ? `+${chimney.price} €` : "V cene"}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Door */}
                  <div>
                    <h3 className="text-sm font-semibold text-foreground mb-3">Dvere</h3>
                    <div className="grid grid-cols-2 gap-3">
                      {doors.map((door) => (
                        <button
                          key={door.id}
                          onClick={() => setConfig((prev) => ({ ...prev, door: door.id }))}
                          className={cn(
                            "flex flex-col items-center p-3 rounded-xl border-2 transition-all",
                            config.door === door.id
                              ? "border-primary bg-primary/5"
                              : "border-border/50 hover:border-primary/50 bg-card/50",
                          )}
                        >
                          <img src={door.image} alt={door.name} className="w-full h-16 object-cover rounded-lg mb-2" />
                          <span className="text-xs font-medium text-center">{door.name}</span>
                          <span
                            className={cn("text-xs mt-1", door.price > 0 ? "text-primary" : "text-muted-foreground")}
                          >
                            {door.price > 0 ? `+${door.price} €` : "V cene"}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Roof */}
                  <div>
                    <h3 className="text-sm font-semibold text-foreground mb-3">Strecha</h3>
                    <div className="grid grid-cols-2 gap-3">
                      {roofs.map((roof) => (
                        <button
                          key={roof.id}
                          onClick={() => setConfig((prev) => ({ ...prev, roof: roof.id }))}
                          className={cn(
                            "flex flex-col items-center p-3 rounded-xl border-2 transition-all",
                            config.roof === roof.id
                              ? "border-primary bg-primary/5"
                              : "border-border/50 hover:border-primary/50 bg-card/50",
                          )}
                        >
                          <img src={roof.image} alt={roof.name} className="w-full h-16 object-cover rounded-lg mb-2" />
                          <span className="text-xs font-medium text-center">{roof.name}</span>
                          <span
                            className={cn("text-xs mt-1", roof.price > 0 ? "text-primary" : "text-muted-foreground")}
                          >
                            {roof.price > 0 ? `+${roof.price} €` : "V cene"}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Windows */}
                  <div>
                    <h3 className="text-sm font-semibold text-foreground mb-3">Okná</h3>
                    <div className="grid grid-cols-2 gap-3">
                      {windows.map((window) => (
                        <button
                          key={window.id}
                          onClick={() => setConfig((prev) => ({ ...prev, window: window.id }))}
                          className={cn(
                            "flex flex-col items-center p-3 rounded-xl border-2 transition-all",
                            config.window === window.id
                              ? "border-primary bg-primary/5"
                              : "border-border/50 hover:border-primary/50 bg-card/50",
                          )}
                        >
                          <img
                            src={window.image}
                            alt={window.name}
                            className="w-full h-16 object-cover rounded-lg mb-2"
                          />
                          <span className="text-xs font-medium text-center">{window.name}</span>
                          <span
                            className={cn("text-xs mt-1", window.price > 0 ? "text-primary" : "text-muted-foreground")}
                          >
                            {window.price > 0 ? `+${window.price} €` : "V cene"}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* LED Lights */}
                  <div>
                    <h3 className="text-sm font-semibold text-foreground mb-3">LED osvetlenie</h3>
                    <div className="grid grid-cols-2 gap-3">
                      {ledLights.map((led) => (
                        <button
                          key={led.id}
                          onClick={() => setConfig((prev) => ({ ...prev, led: led.id }))}
                          className={cn(
                            "flex flex-col items-center p-3 rounded-xl border-2 transition-all",
                            config.led === led.id
                              ? "border-primary bg-primary/5"
                              : "border-border/50 hover:border-primary/50 bg-card/50",
                          )}
                        >
                          <img src={led.image} alt={led.name} className="w-full h-16 object-cover rounded-lg mb-2" />
                          <span className="text-xs font-medium text-center">{led.name}</span>
                          <span
                            className={cn("text-xs mt-1", led.price > 0 ? "text-primary" : "text-muted-foreground")}
                          >
                            {led.price > 0 ? `+${led.price} €` : "V cene"}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Extras */}
                  <div>
                    <h3 className="text-sm font-semibold text-foreground mb-3">Príslušenstvo</h3>
                    <div className="grid grid-cols-2 gap-2">
                      {extras.map((extra) => (
                        <button
                          key={extra.id}
                          onClick={() => toggleExtra(extra.id)}
                          className={cn(
                            "flex items-center gap-3 px-4 py-3 rounded-xl border-2 transition-all",
                            config.extras.includes(extra.id)
                              ? "border-primary bg-primary/5"
                              : "border-border/50 hover:border-primary/50 bg-card/50",
                          )}
                        >
                          <div
                            className={cn(
                              "w-5 h-5 rounded border-2 flex items-center justify-center transition-all shrink-0",
                              config.extras.includes(extra.id)
                                ? "bg-primary border-primary"
                                : "border-muted-foreground",
                            )}
                          >
                            {config.extras.includes(extra.id) && <Check className="w-3 h-3 text-primary-foreground" />}
                          </div>
                          <div className="text-left">
                            <span className="text-sm font-medium block">{extra.name}</span>
                            <span className="text-xs text-primary">+{extra.price} €</span>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Mobile CTA */}
                <div className="lg:hidden border-t border-border/50 pt-6 space-y-4">
                  <div className="flex items-center justify-between">
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

                  <p className="text-xs text-muted-foreground text-center">* Cena nezahŕňa dopravu a inštaláciu</p>
                </div>
              </div>
            </ScrollArea>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Configurator;

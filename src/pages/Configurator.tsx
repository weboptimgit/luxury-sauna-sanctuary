import { useState, useMemo } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Check, ShoppingCart, ChevronLeft, ChevronRight, Expand } from "lucide-react";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
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
  { id: "spruce", name: "Smrek", price: 0 },
  { id: "thermowood", name: "Thermowood", price: 890 },
  { id: "cedar", name: "Červený céder", price: 1450 },
];

const extras = [
  { id: "terrace", name: "Terasa", price: 680 },
  { id: "window", name: "Panoramatické okno", price: 380 },
  { id: "led", name: "LED osvetlenie", price: 290 },
  { id: "bench", name: "Vonkajšia lavica", price: 220 },
];

const Configurator = () => {
  const [config, setConfig] = useState({
    type: "barrel",
    size: "3m",
    heaterType: "wood",
    heater: "harvia-m3",
    wood: "spruce",
    extras: [] as string[],
  });

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const selectedType = saunaTypes.find(t => t.id === config.type);
  const selectedSize = sizes.find(s => s.id === config.size);
  const selectedHeaterType = heaterTypes.find(h => h.id === config.heaterType);
  const selectedHeater = config.heaterType === "wood" 
    ? woodHeaters.find(h => h.id === config.heater)
    : electricHeaters.find(h => h.id === config.heater);
  const selectedWood = woodTypes.find(w => w.id === config.wood);

  const images = [selectedType?.image || saunaBarrel, saunaInterior, saunaCube, saunaTraditional];

  const originalPrice = useMemo(() => {
    let price = selectedType?.basePrice || 0;
    price += selectedSize?.price || 0;
    price += selectedHeater?.price || 0;
    price += selectedWood?.price || 0;
    config.extras.forEach(extraId => {
      const extra = extras.find(e => e.id === extraId);
      if (extra) price += extra.price;
    });
    return Math.round(price * 1.15);
  }, [config, selectedType, selectedSize, selectedHeater, selectedWood]);

  const totalPrice = useMemo(() => {
    let price = selectedType?.basePrice || 0;
    price += selectedSize?.price || 0;
    price += selectedHeater?.price || 0;
    price += selectedWood?.price || 0;
    config.extras.forEach(extraId => {
      const extra = extras.find(e => e.id === extraId);
      if (extra) price += extra.price;
    });
    return price;
  }, [config, selectedType, selectedSize, selectedHeater, selectedWood]);

  const toggleExtra = (id: string) => {
    setConfig(prev => ({
      ...prev,
      extras: prev.extras.includes(id)
        ? prev.extras.filter(e => e !== id)
        : [...prev.extras, id]
    }));
  };

  const discount = Math.round(((originalPrice - totalPrice) / originalPrice) * 100);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
            <Link to="/" className="hover:text-primary transition-colors">Domov</Link>
            <span>/</span>
            <Link to="/shop" className="hover:text-primary transition-colors">Sauny</Link>
            <span>/</span>
            <span className="text-foreground">Konfigurátor</span>
          </nav>

          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Image Gallery */}
            <div className="space-y-4">
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
                  onClick={() => setCurrentImageIndex(i => i === 0 ? images.length - 1 : i - 1)}
                  className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-background/80 backdrop-blur-sm rounded-full hover:bg-background transition-colors opacity-0 group-hover:opacity-100"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button 
                  onClick={() => setCurrentImageIndex(i => i === images.length - 1 ? 0 : i + 1)}
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
                        : "opacity-60 hover:opacity-100"
                    )}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>

            {/* Configuration Panel */}
            <div className="space-y-6">
              {/* Title & Price */}
              <div>
                <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-3">
                  {selectedType?.name} {selectedSize?.name}
                </h1>
                <div className="flex items-baseline gap-3">
                  <span className="text-muted-foreground line-through text-lg">
                    {originalPrice.toLocaleString()} €
                  </span>
                  <span className="text-3xl font-bold text-primary">
                    {totalPrice.toLocaleString()} €
                  </span>
                </div>
              </div>

              {/* Configuration Options */}
              <div className="space-y-6 border-t border-border/50 pt-6">
                
                {/* Sauna Type */}
                <div>
                  <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                    Typ sauny <span className="text-primary">*</span>
                  </h3>
                  <div className="flex gap-2">
                    {saunaTypes.map(type => (
                      <button
                        key={type.id}
                        onClick={() => setConfig(prev => ({ ...prev, type: type.id }))}
                        className={cn(
                          "flex flex-col items-center p-3 rounded-xl border-2 transition-all min-w-[100px]",
                          config.type === type.id
                            ? "border-primary bg-primary/5"
                            : "border-border/50 hover:border-primary/50 bg-card/50"
                        )}
                      >
                        <img 
                          src={type.image} 
                          alt={type.name}
                          className="w-16 h-12 object-cover rounded-md mb-2"
                        />
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
                  <div className="flex gap-2">
                    {sizes.map(size => (
                      <button
                        key={size.id}
                        onClick={() => setConfig(prev => ({ ...prev, size: size.id }))}
                        className={cn(
                          "flex flex-col items-center justify-center p-3 rounded-xl border-2 transition-all min-w-[70px]",
                          config.size === size.id
                            ? "border-primary bg-primary/5"
                            : "border-border/50 hover:border-primary/50 bg-card/50"
                        )}
                      >
                        <span className="text-lg font-bold">{size.name}</span>
                        <span className="text-xs text-muted-foreground">{size.capacity}</span>
                        {size.price > 0 && (
                          <span className="text-xs text-primary mt-1">+{size.price} €</span>
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Heater Type */}
                <div>
                  <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                    Typ ohrievača <span className="text-primary">*</span>
                  </h3>
                  <div className="flex gap-2">
                    {heaterTypes.map(heater => (
                      <button
                        key={heater.id}
                        onClick={() => setConfig(prev => ({ 
                          ...prev, 
                          heaterType: heater.id,
                          heater: heater.id === "wood" ? "harvia-m3" : heater.id === "electric" ? "harvia-6kw" : "none"
                        }))}
                        className={cn(
                          "flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all min-w-[100px]",
                          config.heaterType === heater.id
                            ? "border-primary bg-primary/5"
                            : "border-border/50 hover:border-primary/50 bg-card/50"
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
                    <div className="flex gap-2 flex-wrap">
                      {(config.heaterType === "wood" ? woodHeaters : electricHeaters).map(heater => (
                        <button
                          key={heater.id}
                          onClick={() => setConfig(prev => ({ ...prev, heater: heater.id }))}
                          className={cn(
                            "flex flex-col items-center justify-center p-3 rounded-xl border-2 transition-all min-w-[90px]",
                            config.heater === heater.id
                              ? "border-primary bg-primary/5"
                              : "border-border/50 hover:border-primary/50 bg-card/50"
                          )}
                        >
                          <span className="text-xs font-medium text-center mb-1">{heater.name}</span>
                          <span className={cn(
                            "text-xs",
                            heater.price > 0 ? "text-primary" : "text-muted-foreground"
                          )}>
                            {heater.price > 0 ? `+${heater.price} €` : "0 €"}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Wood Type */}
                <div>
                  <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                    Typ dreva <span className="text-primary">*</span>
                  </h3>
                  <div className="flex gap-2">
                    {woodTypes.map(wood => (
                      <button
                        key={wood.id}
                        onClick={() => setConfig(prev => ({ ...prev, wood: wood.id }))}
                        className={cn(
                          "flex flex-col items-center justify-center p-3 rounded-xl border-2 transition-all min-w-[100px]",
                          config.wood === wood.id
                            ? "border-primary bg-primary/5"
                            : "border-border/50 hover:border-primary/50 bg-card/50"
                        )}
                      >
                        <span className="text-sm font-medium">{wood.name}</span>
                        <span className={cn(
                          "text-xs mt-1",
                          wood.price > 0 ? "text-primary" : "text-muted-foreground"
                        )}>
                          {wood.price > 0 ? `+${wood.price} €` : "V cene"}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Extras */}
                <div>
                  <h3 className="text-sm font-semibold text-foreground mb-3">
                    Príslušenstvo
                  </h3>
                  <div className="flex gap-2 flex-wrap">
                    {extras.map(extra => (
                      <button
                        key={extra.id}
                        onClick={() => toggleExtra(extra.id)}
                        className={cn(
                          "flex items-center gap-2 px-4 py-2 rounded-lg border-2 transition-all",
                          config.extras.includes(extra.id)
                            ? "border-primary bg-primary/5"
                            : "border-border/50 hover:border-primary/50 bg-card/50"
                        )}
                      >
                        <div className={cn(
                          "w-4 h-4 rounded border flex items-center justify-center transition-all",
                          config.extras.includes(extra.id)
                            ? "bg-primary border-primary"
                            : "border-muted-foreground"
                        )}>
                          {config.extras.includes(extra.id) && (
                            <Check className="w-3 h-3 text-primary-foreground" />
                          )}
                        </div>
                        <span className="text-sm font-medium">{extra.name}</span>
                        <span className="text-xs text-primary">+{extra.price} €</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Final Price & CTA */}
              <div className="border-t border-border/50 pt-6 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-lg font-medium">Celková cena</span>
                  <div className="text-right">
                    <span className="text-muted-foreground line-through text-sm mr-2">
                      {originalPrice.toLocaleString()} €
                    </span>
                    <span className="text-3xl font-bold text-primary">
                      {totalPrice.toLocaleString()} €
                    </span>
                  </div>
                </div>
                
                <div className="flex gap-3">
                  <Link to="/contact" className="flex-1">
                    <Button variant="luxury" size="lg" className="w-full gap-2">
                      <ShoppingCart className="w-5 h-5" />
                      Odoslať dopyt
                    </Button>
                  </Link>
                </div>
                
                <p className="text-xs text-muted-foreground text-center">
                  * Cena nezahŕňa dopravu a inštaláciu. Kontaktujte nás pre presnú kalkuláciu.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Configurator;

import { useState, useMemo } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { 
  Check, 
  ChevronLeft, 
  ChevronRight, 
  Sparkles, 
  Box, 
  Layers, 
  Flame, 
  Lightbulb,
  ShoppingCart,
  RotateCcw
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

// Configuration options
const saunaTypes = [
  { id: "barrel", name: "Sudová sauna", description: "Klasický dizajn s optimálnou cirkuláciou tepla", basePrice: 6500, icon: "🛢️" },
  { id: "cube", name: "Kubická sauna", description: "Moderný minimalistický štýl s panoramatickými oknami", basePrice: 9500, icon: "🔲" },
  { id: "cabin", name: "Tradičná kabína", description: "Autentická fínska zrubová sauna", basePrice: 12000, icon: "🏠" },
  { id: "indoor", name: "Interiérová sauna", description: "Kompaktná sauna do vnútorných priestorov", basePrice: 5500, icon: "🚪" },
];

const sizes = [
  { id: "small", name: "Malá", capacity: "2-3 osoby", dimensions: "2.0 × 1.5m", priceMultiplier: 1 },
  { id: "medium", name: "Stredná", capacity: "4-5 osôb", dimensions: "2.5 × 2.0m", priceMultiplier: 1.35 },
  { id: "large", name: "Veľká", capacity: "6-8 osôb", dimensions: "3.0 × 2.5m", priceMultiplier: 1.7 },
  { id: "xl", name: "Extra veľká", capacity: "8-10 osôb", dimensions: "4.0 × 3.0m", priceMultiplier: 2.2 },
];

const woodTypes = [
  { id: "spruce", name: "Severský smrek", description: "Tradičný, príjemná vôňa", price: 0, popular: false },
  { id: "cedar", name: "Červený céder", description: "Prémiový, prírodne odolný", price: 1500, popular: true },
  { id: "thermowood", name: "Thermowood", description: "Tepelne upravený, vysoká odolnosť", price: 1200, popular: false },
  { id: "aspen", name: "Osika", description: "Hypoalergénny, jemná textúra", price: 800, popular: false },
];

const heatingOptions = [
  { id: "electric-6", name: "Elektrický 6kW", description: "Pre menšie sauny", price: 0, icon: "⚡" },
  { id: "electric-9", name: "Elektrický 9kW", description: "Štandardný výkon", price: 400, icon: "⚡" },
  { id: "electric-12", name: "Elektrický 12kW", description: "Pre veľké sauny", price: 800, icon: "⚡" },
  { id: "wood", name: "Na drevo", description: "Autentický zážitok", price: 600, icon: "🔥" },
  { id: "infrared", name: "Infračervený", description: "Nízka teplota, hlboké prehrievanie", price: 1200, icon: "☀️" },
];

const accessories = [
  { id: "led", name: "LED osvetlenie", description: "Atmosférické podsvietenie", price: 350 },
  { id: "chromotherapy", name: "Chromoterapia", description: "Farebná svetelná terapia", price: 550 },
  { id: "bluetooth", name: "Bluetooth audio", description: "Integrované reproduktory", price: 450 },
  { id: "aromatherapy", name: "Aromaterapia", description: "Difuzér esenciálnych olejov", price: 280 },
  { id: "thermometer", name: "Digitálny teplomer", description: "Presné meranie teploty a vlhkosti", price: 120 },
  { id: "bucket-set", name: "Saunová súprava", description: "Vedierko, naberačka, vankúše", price: 180 },
  { id: "glass-door", name: "Celosklenené dvere", description: "Elegantný dizajnový prvok", price: 650 },
  { id: "window", name: "Panoramatické okno", description: "Rozšírený výhľad", price: 480 },
];

const steps = [
  { id: 1, name: "Typ sauny", icon: Box },
  { id: 2, name: "Veľkosť", icon: Layers },
  { id: 3, name: "Materiál", icon: Layers },
  { id: 4, name: "Vykurovanie", icon: Flame },
  { id: 5, name: "Príslušenstvo", icon: Lightbulb },
];

const Configurator = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [config, setConfig] = useState({
    type: "",
    size: "",
    wood: "",
    heating: "",
    accessories: [] as string[],
  });

  const selectedType = saunaTypes.find(t => t.id === config.type);
  const selectedSize = sizes.find(s => s.id === config.size);
  const selectedWood = woodTypes.find(w => w.id === config.wood);
  const selectedHeating = heatingOptions.find(h => h.id === config.heating);

  const totalPrice = useMemo(() => {
    let price = 0;
    
    if (selectedType) {
      price = selectedType.basePrice;
    }
    
    if (selectedSize) {
      price *= selectedSize.priceMultiplier;
    }
    
    if (selectedWood) {
      price += selectedWood.price;
    }
    
    if (selectedHeating) {
      price += selectedHeating.price;
    }
    
    config.accessories.forEach(accId => {
      const acc = accessories.find(a => a.id === accId);
      if (acc) price += acc.price;
    });
    
    return Math.round(price);
  }, [config, selectedType, selectedSize, selectedWood, selectedHeating]);

  const canProceed = () => {
    switch (currentStep) {
      case 1: return !!config.type;
      case 2: return !!config.size;
      case 3: return !!config.wood;
      case 4: return !!config.heating;
      case 5: return true;
      default: return false;
    }
  };

  const toggleAccessory = (id: string) => {
    setConfig(prev => ({
      ...prev,
      accessories: prev.accessories.includes(id)
        ? prev.accessories.filter(a => a !== id)
        : [...prev.accessories, id]
    }));
  };

  const resetConfig = () => {
    setConfig({ type: "", size: "", wood: "", heating: "", accessories: [] });
    setCurrentStep(1);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-32 pb-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute top-40 right-1/4 w-64 h-64 bg-accent/10 rounded-full blur-3xl" />
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-8">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">Konfigurátor</span>
          </div>
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
            Vytvorte si svoju <span className="text-gradient-amber">Saunu</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Prispôsobte si každý detail vašej sauny podľa vlastných predstáv
          </p>
        </div>
      </section>

      {/* Progress Steps */}
      <section className="py-8 border-y border-border/30">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between max-w-4xl mx-auto">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <button
                  onClick={() => currentStep > step.id && setCurrentStep(step.id)}
                  className={cn(
                    "flex items-center gap-2 px-4 py-2 rounded-full transition-all",
                    currentStep === step.id && "bg-primary text-primary-foreground",
                    currentStep > step.id && "bg-primary/20 text-primary cursor-pointer hover:bg-primary/30",
                    currentStep < step.id && "text-muted-foreground"
                  )}
                >
                  <div className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold",
                    currentStep === step.id && "bg-primary-foreground/20",
                    currentStep > step.id && "bg-primary/30",
                    currentStep < step.id && "bg-muted"
                  )}>
                    {currentStep > step.id ? <Check className="w-4 h-4" /> : step.id}
                  </div>
                  <span className="hidden md:inline font-medium">{step.name}</span>
                </button>
                {index < steps.length - 1 && (
                  <div className={cn(
                    "w-8 lg:w-16 h-0.5 mx-2",
                    currentStep > step.id ? "bg-primary" : "bg-border"
                  )} />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Configuration Panel */}
            <div className="lg:col-span-2 space-y-8">
              {/* Step 1: Type */}
              {currentStep === 1 && (
                <div className="space-y-6">
                  <h2 className="font-display text-2xl font-bold text-foreground">Vyberte typ sauny</h2>
                  <div className="grid sm:grid-cols-2 gap-4">
                    {saunaTypes.map(type => (
                      <button
                        key={type.id}
                        onClick={() => setConfig(prev => ({ ...prev, type: type.id }))}
                        className={cn(
                          "group p-6 rounded-xl border text-left transition-all duration-300",
                          config.type === type.id
                            ? "bg-primary/10 border-primary shadow-lg shadow-primary/10"
                            : "bg-card/50 border-border/30 hover:border-primary/30 hover:bg-card/80"
                        )}
                      >
                        <div className="flex items-start justify-between mb-4">
                          <span className="text-4xl">{type.icon}</span>
                          {config.type === type.id && (
                            <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                              <Check className="w-4 h-4 text-primary-foreground" />
                            </div>
                          )}
                        </div>
                        <h3 className="font-display text-xl font-bold text-foreground mb-2">{type.name}</h3>
                        <p className="text-sm text-muted-foreground mb-3">{type.description}</p>
                        <p className="text-lg font-bold text-primary">od {type.basePrice.toLocaleString()} €</p>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 2: Size */}
              {currentStep === 2 && (
                <div className="space-y-6">
                  <h2 className="font-display text-2xl font-bold text-foreground">Vyberte veľkosť</h2>
                  <div className="grid sm:grid-cols-2 gap-4">
                    {sizes.map(size => (
                      <button
                        key={size.id}
                        onClick={() => setConfig(prev => ({ ...prev, size: size.id }))}
                        className={cn(
                          "group p-6 rounded-xl border text-left transition-all duration-300",
                          config.size === size.id
                            ? "bg-primary/10 border-primary shadow-lg shadow-primary/10"
                            : "bg-card/50 border-border/30 hover:border-primary/30 hover:bg-card/80"
                        )}
                      >
                        <div className="flex items-start justify-between mb-3">
                          <h3 className="font-display text-xl font-bold text-foreground">{size.name}</h3>
                          {config.size === size.id && (
                            <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                              <Check className="w-4 h-4 text-primary-foreground" />
                            </div>
                          )}
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <span className="text-sm text-muted-foreground">Kapacita:</span>
                            <span className="text-sm font-medium text-foreground">{size.capacity}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-sm text-muted-foreground">Rozmery:</span>
                            <span className="text-sm font-medium text-foreground">{size.dimensions}</span>
                          </div>
                        </div>
                        {size.priceMultiplier > 1 && (
                          <p className="mt-3 text-sm text-primary font-medium">
                            +{Math.round((size.priceMultiplier - 1) * 100)}% k základnej cene
                          </p>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 3: Wood */}
              {currentStep === 3 && (
                <div className="space-y-6">
                  <h2 className="font-display text-2xl font-bold text-foreground">Vyberte drevo</h2>
                  <div className="grid sm:grid-cols-2 gap-4">
                    {woodTypes.map(wood => (
                      <button
                        key={wood.id}
                        onClick={() => setConfig(prev => ({ ...prev, wood: wood.id }))}
                        className={cn(
                          "group p-6 rounded-xl border text-left transition-all duration-300 relative",
                          config.wood === wood.id
                            ? "bg-primary/10 border-primary shadow-lg shadow-primary/10"
                            : "bg-card/50 border-border/30 hover:border-primary/30 hover:bg-card/80"
                        )}
                      >
                        {wood.popular && (
                          <span className="absolute -top-2 -right-2 px-2 py-1 text-xs font-bold bg-primary text-primary-foreground rounded-full">
                            Obľúbený
                          </span>
                        )}
                        <div className="flex items-start justify-between mb-3">
                          <h3 className="font-display text-xl font-bold text-foreground">{wood.name}</h3>
                          {config.wood === wood.id && (
                            <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                              <Check className="w-4 h-4 text-primary-foreground" />
                            </div>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground mb-3">{wood.description}</p>
                        <p className="text-lg font-bold text-primary">
                          {wood.price === 0 ? "V cene" : `+${wood.price.toLocaleString()} €`}
                        </p>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 4: Heating */}
              {currentStep === 4 && (
                <div className="space-y-6">
                  <h2 className="font-display text-2xl font-bold text-foreground">Vyberte vykurovanie</h2>
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {heatingOptions.map(heating => (
                      <button
                        key={heating.id}
                        onClick={() => setConfig(prev => ({ ...prev, heating: heating.id }))}
                        className={cn(
                          "group p-6 rounded-xl border text-left transition-all duration-300",
                          config.heating === heating.id
                            ? "bg-primary/10 border-primary shadow-lg shadow-primary/10"
                            : "bg-card/50 border-border/30 hover:border-primary/30 hover:bg-card/80"
                        )}
                      >
                        <div className="flex items-start justify-between mb-3">
                          <span className="text-3xl">{heating.icon}</span>
                          {config.heating === heating.id && (
                            <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                              <Check className="w-4 h-4 text-primary-foreground" />
                            </div>
                          )}
                        </div>
                        <h3 className="font-display text-lg font-bold text-foreground mb-1">{heating.name}</h3>
                        <p className="text-sm text-muted-foreground mb-3">{heating.description}</p>
                        <p className="text-lg font-bold text-primary">
                          {heating.price === 0 ? "V cene" : `+${heating.price.toLocaleString()} €`}
                        </p>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 5: Accessories */}
              {currentStep === 5 && (
                <div className="space-y-6">
                  <h2 className="font-display text-2xl font-bold text-foreground">Pridajte príslušenstvo</h2>
                  <p className="text-muted-foreground">Vyberte voliteľné doplnky pre vašu saunu</p>
                  <div className="grid sm:grid-cols-2 gap-4">
                    {accessories.map(acc => (
                      <button
                        key={acc.id}
                        onClick={() => toggleAccessory(acc.id)}
                        className={cn(
                          "group p-5 rounded-xl border text-left transition-all duration-300",
                          config.accessories.includes(acc.id)
                            ? "bg-primary/10 border-primary shadow-lg shadow-primary/10"
                            : "bg-card/50 border-border/30 hover:border-primary/30 hover:bg-card/80"
                        )}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <h3 className="font-semibold text-foreground mb-1">{acc.name}</h3>
                            <p className="text-sm text-muted-foreground">{acc.description}</p>
                          </div>
                          <div className="flex items-center gap-3 ml-4">
                            <span className="text-primary font-bold">+{acc.price} €</span>
                            <div className={cn(
                              "w-6 h-6 rounded-md border-2 flex items-center justify-center transition-all",
                              config.accessories.includes(acc.id)
                                ? "bg-primary border-primary"
                                : "border-border"
                            )}>
                              {config.accessories.includes(acc.id) && (
                                <Check className="w-4 h-4 text-primary-foreground" />
                              )}
                            </div>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Navigation */}
              <div className="flex items-center justify-between pt-6 border-t border-border/30">
                <Button
                  variant="outline"
                  onClick={() => setCurrentStep(prev => prev - 1)}
                  disabled={currentStep === 1}
                  className="gap-2"
                >
                  <ChevronLeft className="w-4 h-4" />
                  Späť
                </Button>
                
                {currentStep < 5 ? (
                  <Button
                    variant="luxury"
                    onClick={() => setCurrentStep(prev => prev + 1)}
                    disabled={!canProceed()}
                    className="gap-2"
                  >
                    Ďalej
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                ) : (
                  <Link to="/contact">
                    <Button variant="luxury" className="gap-2">
                      <ShoppingCart className="w-4 h-4" />
                      Odoslať dopyt
                    </Button>
                  </Link>
                )}
              </div>
            </div>

            {/* Summary Panel */}
            <div className="lg:col-span-1">
              <div className="sticky top-24">
                <div className="relative">
                  <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 via-accent/20 to-primary/20 rounded-3xl blur-xl opacity-50" />
                  <div className="relative bg-card/80 backdrop-blur-xl rounded-2xl p-6 border border-primary/10 shadow-2xl">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="font-display text-xl font-bold text-foreground">Vaša konfigurácia</h3>
                      <button
                        onClick={resetConfig}
                        className="p-2 rounded-lg hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
                        title="Resetovať"
                      >
                        <RotateCcw className="w-4 h-4" />
                      </button>
                    </div>
                    
                    <div className="space-y-4 mb-6">
                      <div className="flex items-center justify-between py-3 border-b border-border/30">
                        <span className="text-muted-foreground">Typ</span>
                        <span className="font-medium text-foreground">
                          {selectedType?.name || "—"}
                        </span>
                      </div>
                      <div className="flex items-center justify-between py-3 border-b border-border/30">
                        <span className="text-muted-foreground">Veľkosť</span>
                        <span className="font-medium text-foreground">
                          {selectedSize?.name || "—"}
                        </span>
                      </div>
                      <div className="flex items-center justify-between py-3 border-b border-border/30">
                        <span className="text-muted-foreground">Drevo</span>
                        <span className="font-medium text-foreground">
                          {selectedWood?.name || "—"}
                        </span>
                      </div>
                      <div className="flex items-center justify-between py-3 border-b border-border/30">
                        <span className="text-muted-foreground">Vykurovanie</span>
                        <span className="font-medium text-foreground">
                          {selectedHeating?.name || "—"}
                        </span>
                      </div>
                      {config.accessories.length > 0 && (
                        <div className="py-3 border-b border-border/30">
                          <span className="text-muted-foreground block mb-2">Príslušenstvo</span>
                          <div className="flex flex-wrap gap-2">
                            {config.accessories.map(accId => {
                              const acc = accessories.find(a => a.id === accId);
                              return acc ? (
                                <span key={accId} className="px-2 py-1 text-xs bg-primary/10 text-primary rounded-full">
                                  {acc.name}
                                </span>
                              ) : null;
                            })}
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="pt-4 border-t border-border/30">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-muted-foreground">Celková cena</span>
                        <span className="text-sm text-muted-foreground">bez DPH</span>
                      </div>
                      <p className="text-4xl font-display font-bold text-gradient-amber">
                        {totalPrice > 0 ? `${totalPrice.toLocaleString()} €` : "—"}
                      </p>
                      <p className="text-sm text-muted-foreground mt-2">
                        * Konečná cena môže byť upravená na základe konzultácie
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Configurator;

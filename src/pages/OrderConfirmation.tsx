import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { CheckCircle, Package, Truck, FileText, Home, ArrowRight } from "lucide-react";

const OrderConfirmation = () => {
  // Illustrative order data
  const orderData = {
    orderNumber: "236",
    date: "14. januára 2026",
    email: "webdev@weboptim.eu",
    total: "18 680,00 €",
    paymentMethod: "Bankový prevod",
    items: [
      {
        name: "Sauna – konfigurácia",
        quantity: 1,
        price: "11 690,00 €",
        config: {
          "Typ": "Sudová sauna",
          "Veľkosť": "3M (4-5 osôb)",
          "Drevo": "Thermowood",
          "Ohrievač": "Na drevo / Harvia 20 PRO",
          "Komín": "Premium nerez",
          "Dvere": "Drevené dvere",
          "Strecha": "Šindle",
          "Okná": "Panoramatické okno",
          "LED": "RGB LED",
          "Doplnky": "Terasa, Vonkajšia lavica, Teplomer a vlhkomer, Drevená nádoba"
        }
      },
      {
        name: "Elaris",
        quantity: 1,
        price: "6 990,00 €",
        config: {
          "Rozmery": "2,75 × 2,20 × 2,35 m",
          "Farba": "Biela"
        }
      }
    ],
    subtotal: "18 680,00 €",
    shipping: "Doprava zdarma",
    billingAddress: {
      name: "Martin Varga",
      street: "Adresa",
      city: "100 00 Topoľčany",
      email: "webdev@weboptim.eu"
    },
    shippingAddress: {
      name: "Martin Varga",
      street: "Adresa",
      city: "100 00 Topoľčany"
    },
    note: "poznamka"
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-5xl">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
            <Link to="/" className="hover:text-luxury-amber transition-colors">Domov</Link>
            <span>/</span>
            <Link to="/checkout" className="hover:text-luxury-amber transition-colors">Pokladňa</Link>
            <span>/</span>
            <span className="text-foreground">Objednávka prijatá</span>
          </nav>

          {/* Success Hero */}
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-luxury-amber/20 via-luxury-amber/10 to-transparent border border-luxury-amber/30 p-8 md:p-12 mb-10">
            <div className="absolute top-0 right-0 w-64 h-64 bg-luxury-amber/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            <div className="relative flex items-center gap-6">
              <div className="flex-shrink-0 w-20 h-20 rounded-full bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center shadow-lg shadow-green-500/30">
                <CheckCircle className="w-10 h-10 text-white" />
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-2">
                  Ďakujeme za vašu objednávku!
                </h1>
                <p className="text-muted-foreground text-lg">
                  Vaša objednávka bola úspešne prijatá a spracovaná.
                </p>
              </div>
            </div>
          </div>

          {/* Order Info Cards */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-10">
            {[
              { label: "Číslo objednávky", value: `#${orderData.orderNumber}`, icon: FileText },
              { label: "Dátum", value: orderData.date, icon: Package },
              { label: "E-mail", value: orderData.email, icon: null },
              { label: "Cena spolu", value: orderData.total, icon: null },
              { label: "Spôsob platby", value: orderData.paymentMethod, icon: null },
            ].map((item, index) => (
              <div 
                key={index}
                className="glass-dark rounded-xl p-4 border border-border/50 hover:border-luxury-amber/30 transition-colors"
              >
                <span className="text-xs text-muted-foreground uppercase tracking-wider">{item.label}</span>
                <p className="text-foreground font-semibold mt-1 text-sm md:text-base break-all">{item.value}</p>
              </div>
            ))}
          </div>

          {/* Order Details */}
          <div className="glass-dark rounded-2xl border border-border/50 overflow-hidden mb-10">
            <div className="px-6 py-4 border-b border-border/50 bg-luxury-amber/5">
              <h2 className="text-xl font-display font-semibold text-foreground flex items-center gap-2">
                <Package className="w-5 h-5 text-luxury-amber" />
                Podrobnosti objednávky
              </h2>
            </div>

            <div className="divide-y divide-border/30">
              {/* Products */}
              {orderData.items.map((item, index) => (
                <div key={index} className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-lg font-semibold text-foreground">
                      {item.name} <span className="text-luxury-amber">× {item.quantity}</span>
                    </h3>
                    <span className="text-lg font-bold text-luxury-amber">{item.price}</span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {Object.entries(item.config).map(([key, value]) => (
                      <div key={key} className="flex gap-2 text-sm">
                        <span className="text-muted-foreground">{key}:</span>
                        <span className="text-foreground">{value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}

              {/* Totals */}
              <div className="p-6 space-y-3 bg-card/30">
                <div className="flex justify-between text-muted-foreground">
                  <span>Medzisúčet:</span>
                  <span className="text-foreground font-medium">{orderData.subtotal}</span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>Doručenie:</span>
                  <span className="text-green-500 font-medium">{orderData.shipping}</span>
                </div>
                <div className="flex justify-between text-lg pt-3 border-t border-border/30">
                  <span className="font-semibold text-foreground">Cena spolu:</span>
                  <span className="font-bold text-luxury-amber text-xl">{orderData.total}</span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>Spôsob platby:</span>
                  <span className="text-foreground font-medium">{orderData.paymentMethod}</span>
                </div>
              </div>

              {/* Note */}
              {orderData.note && (
                <div className="p-6">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Poznámka:</span>
                    <span className="text-foreground">{orderData.note}</span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Addresses */}
          <div className="grid md:grid-cols-2 gap-6 mb-10">
            <div className="glass-dark rounded-xl border border-border/50 p-6">
              <h3 className="text-lg font-display font-semibold text-foreground mb-4 flex items-center gap-2">
                <FileText className="w-5 h-5 text-luxury-amber" />
                Fakturačná adresa
              </h3>
              <div className="space-y-1 text-muted-foreground">
                <p className="text-foreground font-medium">{orderData.billingAddress.name}</p>
                <p>{orderData.billingAddress.street}</p>
                <p>{orderData.billingAddress.city}</p>
                <p>{orderData.billingAddress.email}</p>
              </div>
            </div>

            <div className="glass-dark rounded-xl border border-border/50 p-6">
              <h3 className="text-lg font-display font-semibold text-foreground mb-4 flex items-center gap-2">
                <Truck className="w-5 h-5 text-luxury-amber" />
                Dodacia adresa
              </h3>
              <div className="space-y-1 text-muted-foreground">
                <p className="text-foreground font-medium">{orderData.shippingAddress.name}</p>
                <p>{orderData.shippingAddress.street}</p>
                <p>{orderData.shippingAddress.city}</p>
              </div>
            </div>
          </div>

          {/* Next Steps */}
          <div className="glass-dark rounded-2xl border border-border/50 p-8 text-center">
            <h3 className="text-xl font-display font-semibold text-foreground mb-3">Čo bude nasledovať?</h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Na váš e-mail sme odoslali potvrdenie objednávky. Budeme vás kontaktovať ohľadom termínu dodania a ďalších detailov.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild variant="luxury" size="lg">
                <Link to="/" className="gap-2">
                  <Home className="w-4 h-4" />
                  Späť na hlavnú stránku
                </Link>
              </Button>
              <Button asChild variant="luxuryOutline" size="lg">
                <Link to="/shop" className="gap-2">
                  Pokračovať v nákupe
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default OrderConfirmation;

import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Notice } from "@/components/ui/notice";
import { Button } from "@/components/ui/button";

const DesignSystem = () => {
  const [showDismissable, setShowDismissable] = useState(true);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-32 pb-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-4">
            Dizajn Systém
          </h1>
          <p className="text-muted-foreground text-lg mb-12">
            Ukážka komponentov a štýlov používaných v projekte.
          </p>

          {/* Notice Messages Section */}
          <section className="mb-16">
            <h2 className="text-2xl font-display font-semibold text-foreground mb-6 pb-2 border-b border-border">
              Notice Messages
            </h2>
            
            <div className="space-y-4">
              {/* Success Notice */}
              <Notice variant="success" title="Úspešne uložené">
                Vaše zmeny boli úspešne uložené do systému.
              </Notice>

              {/* Info Notice */}
              <Notice variant="info" title="Informácia">
                Nové funkcie budú dostupné od 1. februára 2026.
              </Notice>

              {/* Warning Notice */}
              <Notice variant="warning" title="Upozornenie">
                Vaša relácia vyprší o 5 minút. Uložte si prosím prácu.
              </Notice>

              {/* Error Notice */}
              <Notice variant="error" title="Chyba">
                Nepodarilo sa načítať dáta. Skúste to prosím znova.
              </Notice>
            </div>
          </section>

          {/* Notice Variations */}
          <section className="mb-16">
            <h2 className="text-2xl font-display font-semibold text-foreground mb-6 pb-2 border-b border-border">
              Varianty Notice
            </h2>
            
            <div className="space-y-6">
              {/* Without title */}
              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-3">Bez titulku</h3>
                <Notice variant="info">
                  Toto je jednoduchá informatívna správa bez titulku.
                </Notice>
              </div>

              {/* Dismissable */}
              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-3">S možnosťou zavretia</h3>
                {showDismissable ? (
                  <Notice 
                    variant="success" 
                    title="Produkt pridaný do košíka"
                    onClose={() => setShowDismissable(false)}
                  >
                    Barrel Sauna bol úspešne pridaný do vášho košíka.
                  </Notice>
                ) : (
                  <div className="flex items-center gap-4">
                    <span className="text-sm text-muted-foreground">Notice bola zavretá.</span>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => setShowDismissable(true)}
                    >
                      Zobraziť znova
                    </Button>
                  </div>
                )}
              </div>

              {/* Without icon */}
              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-3">Bez ikony</h3>
                <Notice variant="warning" title="Obmedzená dostupnosť" showIcon={false}>
                  Tento produkt je momentálne dostupný len na objednávku.
                </Notice>
              </div>

              {/* Long content */}
              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-3">Dlhší obsah</h3>
                <Notice variant="info" title="Informácie o doručení">
                  Štandardná doba doručenia je 4-6 týždňov od potvrdenia objednávky. 
                  V prípade špeciálnych požiadaviek alebo custom rozmerov môže byť doba 
                  doručenia predĺžená. Budeme vás kontaktovať s presným termínom.
                </Notice>
              </div>
            </div>
          </section>

          {/* All variants compact */}
          <section className="mb-16">
            <h2 className="text-2xl font-display font-semibold text-foreground mb-6 pb-2 border-b border-border">
              Kompaktný prehľad
            </h2>
            
            <div className="grid gap-3">
              <Notice variant="success">Operácia prebehla úspešne.</Notice>
              <Notice variant="info">Nová aktualizácia je dostupná.</Notice>
              <Notice variant="warning">Pozor na možné oneskorenie.</Notice>
              <Notice variant="error">Nastala neočakávaná chyba.</Notice>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default DesignSystem;

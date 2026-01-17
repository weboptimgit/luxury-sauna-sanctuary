import { Link } from 'react-router-dom';
import { Heart, Droplets, Shield, Moon, Brain, Sparkles, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ConfiguratorCTA from '@/components/ConfiguratorCTA';
import heroImage from '@/assets/hero-sauna.jpg';
import saunaInterior from '@/assets/sauna-interior.jpg';
import saunaCube from '@/assets/sauna-cube.jpg';

const benefits = [
  {
    icon: Heart,
    title: 'Podporuje krvný obeh',
    description: 'Teplo sauny rozširuje cievy a zlepšuje krvný obeh, čo podporuje lepšie zásobovanie tkanív kyslíkom.',
  },
  {
    icon: Droplets,
    title: 'Pôsobí protizápalovo',
    description: 'Pravidelné saunovanie znižuje zápalové markery a pomáha zmierniť bolesť kĺbov a svalov.',
  },
  {
    icon: Shield,
    title: 'Posilňuje imunitu',
    description: 'Zvyšuje teplotu vášho tela, stimuluje imunitný systém a zvyšuje odolnosť voči infekciám.',
  },
  {
    icon: Moon,
    title: 'Zlepšuje spánok',
    description: 'Pomáha telu prirodzene sa uvoľniť a podporuje kvalitnejší, hlbší spánok počas celej noci.',
  },
  {
    icon: Brain,
    title: 'Podporuje duševnú pohodu',
    description: 'Uvoľňuje endorfíny, znižuje stres a pomáha dosiahnuť mentálnu rovnováhu a pokoj.',
  },
  {
    icon: Sparkles,
    title: 'Detoxikuje',
    description: 'Potenie napomáha odstraňovaniu toxínov z tela a prispieva k čistejšej, zdravšej pokožke.',
  },
];

const Wellness = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main>
        {/* Hero Section */}
        <section className="relative py-32 overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background" />
          </div>
          <div className="relative z-10 container mx-auto px-6 text-center">
            <p className="text-primary uppercase tracking-[0.3em] text-sm mb-4 animate-fade-up">Wellness & Zdravie</p>
            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-light mb-6 animate-fade-up">
              Zdravie a <span className="text-gradient-amber font-semibold">Oddych</span>
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg animate-fade-up">
              Objavte liečivú silu pravidelného saunovania a jeho pozitívny vplyv na vaše telo aj myseľ
            </p>
          </div>
        </section>

        {/* Intro Section with Image */}
        <section className="py-20">
          <div className="container mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div className="relative">
                <div className="relative overflow-hidden rounded-sm">
                  <img 
                    src={saunaInterior} 
                    alt="Sauna interiér" 
                    className="w-full h-[500px] object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />
                </div>
                <div className="absolute -bottom-8 -right-8 w-32 h-32 border border-primary/30 rounded-sm" />
              </div>
              
              <div>
                <h2 className="font-display text-4xl md:text-5xl font-light mb-6">
                  Pokoj <span className="text-gradient-amber">začína doma</span>
                </h2>
                <p className="text-muted-foreground text-lg mb-6 leading-relaxed">
                  V dnešnom svete plnom stresu a zhonu sa stáva čas pre seba veľmi vzácny. 
                  Naše sauny vám poskytujú priestor pre skutočný oddych a regeneráciu 
                  priamo v pohodlí vášho domova.
                </p>
                <p className="text-muted-foreground mb-8 leading-relaxed">
                  Pravidelné saunovanie nie je len luxus – je to investícia do vášho zdravia, 
                  ktorá sa vám mnohonásobne vráti v podobe lepšej kondície, silnejšej imunity 
                  a pokojnejšej mysle.
                </p>
                <Button asChild variant="luxury" size="lg">
                  <Link to="/shop">
                    Preskúmať sauny
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Story Section */}
        <section className="py-24 bg-secondary/30">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl">
              <p className="text-primary uppercase tracking-[0.2em] text-sm mb-4">Náš príbeh</p>
              <h2 className="font-display text-4xl md:text-5xl font-light mb-8">
                Pre vaše chvíle <span className="text-gradient-amber">pokoja</span>
              </h2>
              <p className="text-muted-foreground text-lg mb-6 leading-relaxed">
                Veríme, že každý si zaslúži priestor pre regeneráciu. Práca, rodina, každodenné povinnosti – 
                to všetko často odvádza pozornosť od toho, čo je skutočne dôležité: vaše zdravie a pohoda.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Preto sme sa rozhodli priniesť autentický zážitok zo saunovania priamo k vám domov. 
                Naše sauny nie sú len produkty – sú bránou k zdravšiemu, vyrovnanejšiemu životnému štýlu.
              </p>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-24">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <p className="text-primary uppercase tracking-[0.2em] text-sm mb-4">Výhody saunovania</p>
              <h2 className="font-display text-4xl md:text-5xl font-light mb-6">
                Prečo práve <span className="text-gradient-amber">sauna?</span>
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Saunovanie je jedným z najefektívnejších spôsobov, ako posilniť telo aj myseľ. 
                Preskúmajte jeho nekonečné benefity.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {benefits.map((benefit, index) => (
                <div 
                  key={benefit.title}
                  className="group p-8 bg-card/50 border border-border/50 rounded-sm hover:border-primary/30 hover:bg-card/80 transition-all duration-500"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="inline-flex items-center justify-center w-16 h-16 mb-6 rounded-sm bg-gradient-to-br from-primary/20 to-primary/5 group-hover:from-primary/30 group-hover:to-primary/10 transition-all duration-500">
                    <benefit.icon className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="font-display text-xl font-semibold mb-3 group-hover:text-primary transition-colors">
                    {benefit.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
              ))}
            </div>

            <div className="text-center mt-12">
              <Button asChild variant="luxuryOutline" size="lg">
                <Link to="/faq">
                  Časté otázky o saunovaní
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Imagine Section */}
        <section className="py-24 relative overflow-hidden">
          <div className="absolute inset-0">
            <img 
              src={saunaCube} 
              alt="Moderná sauna" 
              className="w-full h-full object-cover opacity-20"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-background via-background/95 to-background/80" />
          </div>
          
          <div className="relative z-10 container mx-auto px-6">
            <div className="max-w-3xl">
              <p className="text-primary uppercase tracking-[0.2em] text-sm mb-4">Predstavte si</p>
              <h2 className="font-display text-4xl md:text-5xl font-light mb-8">
                Len si <span className="text-gradient-amber">to predstavte...</span>
              </h2>
              <p className="text-lg mb-6 leading-relaxed">
                Prichádzate domov po náročnom dni. Oblečiete sa do pohodlného, 
                vstúpite do vlastnej sauny a za okamih cítite, ako vás obklopuje príjemné teplo.
              </p>
              <p className="text-muted-foreground mb-8 leading-relaxed">
                Stres z práce sa rozpúšťa, svaly sa uvoľňujú a myseľ konečne nachádza pokoj. 
                Toto nie je luxus pre vyvolených – môže to byť váš každodenný rituál, 
                vaša cesta k zdravšiemu a šťastnejšiemu životu.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild variant="luxury" size="lg">
                  <Link to="/konfigurator">
                    Navrhnúť vlastnú saunu
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Link>
                </Button>
                <Button asChild variant="luxuryOutline" size="lg">
                  <Link to="/contact">
                    Konzultácia zdarma
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-32 bg-gradient-to-b from-secondary/30 to-background">
          <div className="container mx-auto px-6 text-center">
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-light mb-6">
              Doprajte si <span className="text-gradient-amber font-semibold">oddych</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto mb-10 text-lg">
              Vaše telo si zaslúži regeneráciu každý deň, nielen občas. 
              S vlastnou saunou je relaxácia vždy na dosah ruky – 
              stačí sa rozhodnúť a urobiť prvý krok k pokojnejšiemu životu.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild variant="luxury" size="xl">
                <Link to="/contact">
                  Rezervovať konzultáciu
                </Link>
              </Button>
              <Button asChild variant="luxuryOutline" size="xl">
                <Link to="/shop">
                  Prehliadnuť sauny
                </Link>
              </Button>
            </div>
          </div>
        </section>

        <ConfiguratorCTA />
      </main>

      <Footer />
    </div>
  );
};

export default Wellness;

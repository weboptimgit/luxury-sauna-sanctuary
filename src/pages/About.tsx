import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Award, Leaf, Shield, Heart, Sparkles, CheckCircle, ArrowRight, MapPin, Users, Hammer, Clock } from "lucide-react";
import { useDocumentMeta } from "@/hooks/useDocumentMeta";
import aboutHero from "@/assets/about-hero.jpg";
import aboutCraft from "@/assets/about-craft.jpg";
import saunaInterior from "@/assets/sauna-interior.jpg";

const stats = [
  { value: "500+", label: "Spokojných zákazníkov", icon: Users },
  { value: "15+", label: "Rokov skúseností", icon: Clock },
  { value: "50+", label: "Modelov saún", icon: Hammer },
  { value: "98%", label: "Spokojnosť", icon: Heart },
];

const values = [
  {
    icon: Award,
    title: "Kvalita na prvom mieste",
    description: "Používame len najkvalitnejšie materiály a overené technológie pre maximálnu životnosť.",
  },
  {
    icon: Leaf,
    title: "Ekologický prístup",
    description: "Naše drevo pochádza z certifikovaných lesov. Dbáme na udržateľnú výrobu.",
  },
  {
    icon: Shield,
    title: "Záruka spokojnosti",
    description: "Rozšírená záruka a profesionálny servis počas celej životnosti produktu.",
  },
  {
    icon: Heart,
    title: "S láskou k remeslu",
    description: "Každá sauna je výsledkom vášne a túžby priniesť vám dokonalý zážitok.",
  },
];

const timeline = [
  { year: "2009", title: "Začiatok", description: "Prvá cesta do Fínska a zrodenie myšlienky priniesť saunovú kultúru na Slovensko." },
  { year: "2012", title: "Prvá manufaktúra", description: "Otvorenie vlastnej dielne a výroba prvých sudových saún." },
  { year: "2016", title: "Rozšírenie ponuky", description: "Uvedenie modelov Frame a ModulSauna. Prvé zahraničné objednávky." },
  { year: "2020", title: "Online konfigurátor", description: "Spustenie online konfigurátora pre jednoduchý návrh sauny na mieru." },
  { year: "2025", title: "Harmony Insulated", description: "Uvedenie zateplených saún pre celoročné použitie. Expanzia do celej EU." },
];

const benefits = [
  "Vlastná výroba na Slovensku",
  "Individuálny prístup ku každému zákazníkovi",
  "Bezplatná konzultácia a návrh",
  "Profesionálna montáž v cene",
  "Servis a podpora 7 dní v týždni",
  "Financovanie na splátky",
];

const About = () => {
  useDocumentMeta(
    'B-Relax | O nás',
    'Spoznajte príbeh B-Relax – rodinnej firmy s 15+ ročnými skúsenosťami vo výrobe prémiových saún na Slovensku.'
  );

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero - Full-bleed image with overlay */}
      <section className="relative h-[70vh] min-h-[500px] flex items-end overflow-hidden">
        <img
          src={aboutHero}
          alt="Luxusná sauna v záhrade"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
        <div className="relative z-10 container mx-auto px-6 pb-16">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/20 mb-6">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-primary text-sm font-medium tracking-wide">Rodinná firma s tradíciou</span>
            </div>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
              Vytvárame sauny s{" "}
              <span className="text-gradient-amber">vášňou</span>
            </h1>
            <p className="text-lg text-foreground/80 leading-relaxed max-w-xl">
              Už viac ako 15 rokov prinášame radosť a relaxáciu do domovov
              po celom Slovensku a strednej Európe.
            </p>
          </div>
        </div>
      </section>

      {/* Stats - Floating cards */}
      <section className="relative z-20 -mt-8 px-6">
        <div className="container mx-auto max-w-5xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="glass-dark p-6 text-center group hover:border-primary/40 transition-all duration-500"
              >
                <stat.icon className="w-5 h-5 text-primary mx-auto mb-3 opacity-60 group-hover:opacity-100 transition-opacity" />
                <div className="font-display text-3xl md:text-4xl font-bold text-gradient-amber mb-1">
                  {stat.value}
                </div>
                <div className="text-muted-foreground text-xs md:text-sm tracking-wide">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story Section - Asymmetric layout */}
      <section className="py-24 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            {/* Images - stacked with overlap */}
            <div className="lg:col-span-5 relative">
              <div className="aspect-[3/4] overflow-hidden">
                <img
                  src={aboutCraft}
                  alt="Remeselná výroba saún"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-8 -right-4 md:-right-8 w-2/3 aspect-[4/3] border-4 border-background overflow-hidden shadow-2xl">
                <img
                  src={saunaInterior}
                  alt="Interiér luxusnej sauny"
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Decorative accent */}
              <div className="absolute -top-4 -left-4 w-20 h-20 border-l-2 border-t-2 border-primary/40" />
            </div>

            {/* Content */}
            <div className="lg:col-span-7 lg:pl-8">
              <span className="text-primary text-sm font-medium tracking-widest uppercase">Náš príbeh</span>
              <h2 className="font-display text-3xl md:text-4xl font-bold mt-3 mb-6">
                Od vášne k <span className="text-gradient-amber">remeslu</span>
              </h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  Všetko sa začalo v roku 2009, keď náš zakladateľ objavil
                  svoju vášeň pre tradičné fínske sauny počas cesty do Škandinávie.
                  Inšpirovaný tamojším prístupom k wellness, rozhodol sa priniesť túto
                  kultúru aj na Slovensko.
                </p>
                <p>
                  Dnes sme popredným výrobcom luxusných saún v strednej Európe.
                  Naša manufaktúra kombinuje tradičné remeselnícke
                  postupy s modernými technológiami, čím vytvárame produkty, ktoré
                  spĺňajú najvyššie štandardy kvality.
                </p>
                <p>
                  Veríme, že sauna nie je len miesto na relaxáciu, ale životný štýl.
                  Preto sa snažíme, aby každý náš produkt prinášal radosť a pohodu
                  do života našich zákazníkov po mnoho rokov.
                </p>
              </div>
              <div className="flex items-center gap-4 mt-8 pt-6 border-t border-border/30">
                <MapPin className="w-5 h-5 text-primary" />
                <span className="text-foreground/80 text-sm">Vyrobené na Slovensku s láskou a precíznosťou</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 px-6 bg-secondary/20">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-16">
            <span className="text-primary text-sm font-medium tracking-widest uppercase">Naša cesta</span>
            <h2 className="font-display text-3xl md:text-4xl font-bold mt-3">
              Míľniky <span className="text-gradient-amber">rastu</span>
            </h2>
          </div>
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-border/50 md:-translate-x-px" />

            <div className="space-y-12">
              {timeline.map((item, index) => (
                <div
                  key={item.year}
                  className={`relative flex items-start gap-6 md:gap-0 ${
                    index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                >
                  {/* Dot */}
                  <div className="absolute left-8 md:left-1/2 w-4 h-4 bg-primary rounded-full -translate-x-1/2 mt-1 z-10 shadow-[0_0_12px_hsl(35_80%_55%_/_0.5)]" />

                  {/* Content */}
                  <div className={`ml-16 md:ml-0 md:w-1/2 ${index % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12'}`}>
                    <span className="text-primary font-display text-2xl font-bold">{item.year}</span>
                    <h3 className="font-display text-lg font-semibold mt-1 mb-2">{item.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{item.description}</p>
                  </div>

                  {/* Spacer for opposite side */}
                  <div className="hidden md:block md:w-1/2" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Values - Clean grid */}
      <section className="py-24 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-14">
            <span className="text-primary text-sm font-medium tracking-widest uppercase">Naše hodnoty</span>
            <h2 className="font-display text-3xl md:text-4xl font-bold mt-3 mb-4">
              Čo nás <span className="text-gradient-amber">poháňa</span>
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <div
                key={index}
                className="group bg-gradient-card border border-border/30 hover:border-primary/30 p-8 transition-all duration-500 hover:-translate-y-1"
              >
                <div className="w-12 h-12 flex items-center justify-center bg-primary/10 mb-6 group-hover:bg-primary/20 transition-colors">
                  <value.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-display text-lg font-semibold mb-3">{value.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits - Split layout */}
      <section className="py-20 px-6 bg-secondary/20">
        <div className="container mx-auto max-w-5xl">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-primary text-sm font-medium tracking-widest uppercase">Výhody</span>
              <h2 className="font-display text-3xl md:text-4xl font-bold mt-3 mb-4">
                Prečo si vybrať <span className="text-gradient-amber">nás?</span>
              </h2>
              <p className="text-muted-foreground mb-8 leading-relaxed">
                Nie sme len predajcovia. Sme výrobcovia s vlastnou manufaktúrou,
                čo nám umožňuje ponúknuť vám najlepšiu kvalitu za férové ceny.
              </p>
              <ul className="space-y-4">
                {benefits.map((benefit, index) => (
                  <li key={index} className="flex items-center gap-4 group">
                    <div className="w-8 h-8 flex-shrink-0 flex items-center justify-center bg-primary/10 group-hover:bg-primary/20 transition-colors">
                      <CheckCircle className="w-4 h-4 text-primary" />
                    </div>
                    <span className="text-foreground/90 text-sm">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative">
              <div className="aspect-square bg-gradient-card border border-border/30 flex items-center justify-center p-10">
                <div className="text-center">
                  <div className="font-display text-7xl md:text-8xl font-bold text-gradient-amber mb-4">
                    100%
                  </div>
                  <div className="text-xl font-display font-medium mb-2">Spokojnosť zákazníkov</div>
                  <p className="text-muted-foreground text-sm">Naša priorita je vaša spokojnosť</p>
                </div>
              </div>
              {/* Decorative corner */}
              <div className="absolute -bottom-4 -right-4 w-24 h-24 border-r-2 border-b-2 border-primary/30" />
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6">
        <div className="container mx-auto max-w-3xl text-center">
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
            Pripravení <span className="text-gradient-amber">začať?</span>
          </h2>
          <p className="text-muted-foreground mb-10 max-w-xl mx-auto leading-relaxed">
            Kontaktujte nás a spoločne nájdeme ideálnu saunu pre váš domov.
            Bezplatná konzultácia je len krok od vás.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/shop">
              <Button variant="luxury" size="xl">
                Prezrieť produkty
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
            <Link to="/contact">
              <Button variant="luxuryOutline" size="xl">
                Kontaktujte nás
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;

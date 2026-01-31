import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Award, Leaf, Shield, Heart, Sparkles, CheckCircle } from "lucide-react";
import saunaInterior from "@/assets/sauna-interior.jpg";

const stats = [
  { value: "500+", label: "Spokojných zákazníkov" },
  { value: "15+", label: "Rokov skúseností" },
  { value: "50+", label: "Modelov saún" },
  { value: "98%", label: "Spokojnosť" },
];

const values = [
  {
    icon: Award,
    title: "Kvalita na prvom mieste",
    description: "Používame len najkvalitnejšie materiály a overené technológie pre maximálnu životnosť."
  },
  {
    icon: Leaf,
    title: "Ekologický prístup",
    description: "Naše drevo pochádza z certifikovaných lesov. Dbáme na udržateľnú výrobu."
  },
  {
    icon: Shield,
    title: "Záruka spokojnosti",
    description: "Rozšírená záruka a profesionálny servis počas celej životnosti produktu."
  },
  {
    icon: Heart,
    title: "S láskou k remeslu",
    description: "Každá sauna je výsledkom vášne a túžby priniesť vám dokonalý zážitok."
  },
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
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal-900 via-charcoal-900/95 to-background" />
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-amber-500 rounded-full blur-[120px]" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-amber-600 rounded-full blur-[150px]" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/20 mb-6">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span className="text-amber-400 text-sm font-medium">Rodinná firma s tradíciou</span>
            </div>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
              Vytvárame sauny s{" "}
              <span className="text-gradient">vášňou a precíznosťou</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
              Už viac ako 15 rokov prinášame radosť a relaxáciu do domovov 
              po celom Slovensku. Naša manufaktúra spája tradičné remeslo 
              s modernými technológiami.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 border-y border-amber-500/10 bg-charcoal-800/20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-gradient mb-1">
                  {stat.value}
                </div>
                <div className="text-muted-foreground text-sm md:text-base">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div className="relative order-2 lg:order-1">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl shadow-amber-500/10">
                <img
                  src={saunaInterior}
                  alt="Interiér luxusnej sauny"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 w-32 h-32 md:w-40 md:h-40 rounded-2xl bg-gradient-to-br from-amber-500 to-amber-600 flex flex-col items-center justify-center text-charcoal-900 shadow-xl">
                <div className="font-display text-3xl md:text-4xl font-bold">15+</div>
                <div className="text-xs md:text-sm font-medium text-center px-2">rokov skúseností</div>
              </div>
              <div className="absolute -top-4 -left-4 w-24 h-24 rounded-xl border-2 border-amber-500/30 -z-10" />
            </div>
            <div className="order-1 lg:order-2">
              <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-6">
                Náš príbeh
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
                  Naša manufaktúra v Bratislave kombinuje tradičné remeselnícke 
                  postupy s modernými technológiami, čím vytvárame produkty, ktoré 
                  spĺňajú najvyššie štandardy kvality.
                </p>
                <p>
                  Veríme, že sauna nie je len miesto na relaxáciu, ale životný štýl. 
                  Preto sa snažíme, aby každý náš produkt prinášal radosť a pohodu 
                  do života našich zákazníkov po mnoho rokov.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-charcoal-800/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-14">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              Naše hodnoty
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Hodnoty, ktoré nás vedú pri každom rozhodnutí
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <div
                key={index}
                className="bg-charcoal-900/50 backdrop-blur-sm rounded-2xl p-6 border border-amber-500/10 hover:border-amber-500/30 transition-all duration-300 group hover:-translate-y-1"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500/20 to-amber-600/20 flex items-center justify-center mb-5 group-hover:from-amber-500/30 group-hover:to-amber-600/30 transition-colors">
                  <value.icon className="w-6 h-6 text-amber-400" />
                </div>
                <h3 className="font-display text-lg font-bold text-foreground mb-2">
                  {value.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-6">
                Prečo si vybrať nás?
              </h2>
              <p className="text-muted-foreground mb-8 leading-relaxed">
                Nie sme len predajcovia. Sme výrobcovia s vlastnou manufaktúrou, 
                čo nám umožňuje ponúknuť vám najlepšiu kvalitu za férové ceny.
              </p>
              <ul className="space-y-4">
                {benefits.map((benefit, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-amber-500/20 flex items-center justify-center flex-shrink-0">
                      <CheckCircle className="w-4 h-4 text-amber-400" />
                    </div>
                    <span className="text-foreground">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative">
              <div className="aspect-square rounded-2xl bg-gradient-to-br from-amber-500/5 to-amber-600/10 border border-amber-500/10 flex items-center justify-center">
                <div className="text-center p-8">
                  <div className="font-display text-6xl md:text-7xl font-bold text-gradient mb-4">
                    100%
                  </div>
                  <div className="text-xl md:text-2xl text-foreground font-medium mb-2">
                    Spokojnosť zákazníkov
                  </div>
                  <p className="text-muted-foreground text-sm">
                    Naša priorita je vaša spokojnosť
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-b from-charcoal-800/30 to-background">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
            Pripravení začať?
          </h2>
          <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
            Kontaktujte nás a spoločne nájdeme ideálnu saunu pre váš domov.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/shop">
              <Button variant="luxury" size="lg">
                Prezrieť produkty
              </Button>
            </Link>
            <Link to="/contact">
              <Button variant="luxuryOutline" size="lg">
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

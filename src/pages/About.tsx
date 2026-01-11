import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Award, Users, Leaf, Shield, Heart, Target } from "lucide-react";
import saunaInterior from "@/assets/sauna-interior.jpg";

const stats = [
  { value: "500+", label: "Spokojných zákazníkov" },
  { value: "15+", label: "Rokov skúseností" },
  { value: "50+", label: "Modelov saún" },
  { value: "98%", label: "Spokojnosť zákazníkov" },
];

const values = [
  {
    icon: Award,
    title: "Kvalita",
    description: "Používame len najkvalitnejšie materiály a overené technológie pre maximálnu životnosť a komfort."
  },
  {
    icon: Leaf,
    title: "Udržateľnosť",
    description: "Naše drevo pochádza z certifikovaných lesov a dbáme na ekologickú výrobu."
  },
  {
    icon: Shield,
    title: "Spoľahlivosť",
    description: "Poskytujeme rozšírenú záruku a profesionálny servis počas celej životnosti produktu."
  },
  {
    icon: Heart,
    title: "Vášeň",
    description: "Každá sauna je výsledkom našej lásky k remeslu a túžby priniesť vám dokonalý zážitok."
  },
  {
    icon: Users,
    title: "Zákaznícky prístup",
    description: "Individuálny prístup ku každému zákazníkovi a riešenia šité na mieru."
  },
  {
    icon: Target,
    title: "Inovácie",
    description: "Neustále sledujeme trendy a prinášame najnovšie technológie do sveta wellness."
  },
];

const team = [
  {
    name: "Martin Kováč",
    role: "Zakladateľ & CEO",
    description: "25 rokov skúseností v oblasti wellness a saunových technológií."
  },
  {
    name: "Jana Nováková",
    role: "Hlavný dizajnér",
    description: "Špecializuje sa na moderné a funkčné dizajny saún."
  },
  {
    name: "Peter Horváth",
    role: "Vedúci výroby",
    description: "Dozoruje kvalitu a precíznosť každého vyrobeného kusu."
  },
];

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-to-b from-charcoal-900 to-background">
        <div className="container mx-auto px-4 text-center">
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
            O <span className="text-gradient">Nás</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Sme rodinná firma s vášňou pre wellness a tradičné remeslo
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden">
                <img
                  src={saunaInterior}
                  alt="Interiér luxusnej sauny"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 bg-amber-500 text-charcoal-900 rounded-xl p-6 font-display">
                <div className="text-4xl font-bold">15+</div>
                <div className="text-sm font-medium">Rokov na trhu</div>
              </div>
            </div>
            <div>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-6">
                Náš príbeh
              </h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  Všetko sa začalo v roku 2009, keď náš zakladateľ Martin Kováč objavil 
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

      {/* Stats Section */}
      <section className="py-16 bg-charcoal-800/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="font-display text-4xl md:text-5xl font-bold text-gradient mb-2">
                  {stat.value}
                </div>
                <div className="text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              Naše hodnoty
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Hodnoty, ktoré nás vedú pri každom rozhodnutí a v každom produkte
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <div
                key={index}
                className="bg-charcoal-800/30 rounded-xl p-8 border border-amber-500/10 hover:border-amber-500/30 transition-all duration-300 group"
              >
                <div className="w-14 h-14 rounded-xl bg-amber-500/10 flex items-center justify-center mb-6 group-hover:bg-amber-500/20 transition-colors">
                  <value.icon className="w-7 h-7 text-amber-400" />
                </div>
                <h3 className="font-display text-xl font-bold text-foreground mb-3">
                  {value.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-charcoal-800/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              Náš tím
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Ľudia, ktorí stoja za každým úspešným projektom
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {team.map((member, index) => (
              <div
                key={index}
                className="bg-charcoal-900/50 rounded-xl p-8 border border-amber-500/10 text-center"
              >
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-amber-500 to-amber-600 mx-auto mb-6 flex items-center justify-center">
                  <span className="font-display text-3xl font-bold text-charcoal-900">
                    {member.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <h3 className="font-display text-xl font-bold text-foreground mb-1">
                  {member.name}
                </h3>
                <p className="text-amber-400 text-sm mb-4">{member.role}</p>
                <p className="text-muted-foreground text-sm">
                  {member.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
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

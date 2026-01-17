import { Link } from 'react-router-dom';
import { Compass, PenTool, Truck, Wrench, CheckCircle, Headphones, Package, Hammer, Eye, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import heroImage from '@/assets/hero-sauna.jpg';
import saunaInterior from '@/assets/sauna-interior.jpg';
import saunaBarrel from '@/assets/sauna-barrel.jpg';
import hotTub from '@/assets/hot-tub.jpg';

const usps = [
  { icon: Package, title: 'Rýchle dodanie', description: 'Expresná výroba a doručenie do 6-8 týždňov' },
  { icon: Hammer, title: 'Ručná výroba', description: 'Každá sauna je vyrobená s láskou a precíznosťou' },
  { icon: Eye, title: 'Transparentné ceny', description: 'Bez skrytých poplatkov, jasná kalkulácia' },
];

const processSteps = [
  { number: '01', title: 'Zameranie', description: 'Presné zameranie priestoru a konzultácia vašich potrieb' },
  { number: '02', title: 'Výroba', description: 'Ručná výroba z prémiových fínskych materiálov' },
  { number: '03', title: 'Doručenie', description: 'Bezpečný transport priamo k vám domov' },
  { number: '04', title: 'Montáž', description: 'Profesionálna inštalácia certifikovanými technikmi' },
  { number: '05', title: 'Spustenie', description: 'Kompletné zaškolenie a prvé spoločné saunovanie' },
  { number: '06', title: 'Servis', description: 'Doživotná podpora a záručný servis' },
];

const materials = [
  'Prémiové severské smrekové drevo',
  'Kanadský céder najvyššej kvality',
  'Termo-upravené jelšové drevo',
  'Nerezové komponenty a kovanie',
];

const CustomSaunasPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main>
        {/* Hero Section */}
        <section className="relative py-32 md:py-40 overflow-hidden">
          <div className="absolute inset-0">
            <img 
              src={heroImage} 
              alt="Fínska sauna" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-background/80" />
          </div>
          
          <div className="relative z-10 container mx-auto px-6 text-center">
            <h1 className="font-display text-4xl md:text-5xl lg:text-7xl font-light mb-4 animate-fade-up">
              Jedinečné fínske sauny –
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 tracking-wide animate-fade-up">
              — na mieru, do vášho domova —
            </p>
            <p className="text-muted-foreground max-w-2xl mx-auto mb-10 animate-fade-up">
              Vytvárame prémiové fínske sauny z najkvalitnejších materiálov, presne podľa vašich predstáv a rozmerov vášho priestoru.
            </p>
            <Button asChild variant="luxury" size="xl" className="animate-fade-up">
              <Link to="/contact">
                Požiadať o bezplatnú konzultáciu
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
          </div>
        </section>

        {/* USP Section */}
        <section className="py-20 bg-secondary/30">
          <div className="container mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="font-display text-3xl md:text-4xl font-light mb-4">
                Prečo si vybrať jedinečné sauny <span className="text-gradient-amber">od nás?</span>
              </h2>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {usps.map((usp) => (
                <div key={usp.title} className="text-center group">
                  <div className="inline-flex items-center justify-center w-20 h-20 mb-6 rounded-sm border border-primary/30 group-hover:border-primary/60 group-hover:bg-primary/10 transition-all duration-500">
                    <usp.icon className="w-10 h-10 text-primary" />
                  </div>
                  <h3 className="font-display text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                    {usp.title}
                  </h3>
                  <p className="text-muted-foreground text-sm">{usp.description}</p>
                </div>
              ))}
            </div>
            
            <div className="text-center mt-12">
              <Button asChild variant="luxuryOutline" size="lg">
                <Link to="/konfigurator">
                  Vyskúšajte náš 3D konfigurátor
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Lifestyle Section */}
        <section className="py-24">
          <div className="container mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div className="relative">
                <div className="overflow-hidden rounded-sm">
                  <img 
                    src={saunaInterior} 
                    alt="Interiér sauny" 
                    className="w-full h-[500px] object-cover"
                  />
                </div>
                <div className="absolute -bottom-6 -right-6 w-24 h-24 border border-primary/30 rounded-sm" />
              </div>
              
              <div>
                <h2 className="font-display text-4xl md:text-5xl font-light mb-6">
                  Doprajte si viac oddychu.
                  <span className="block text-gradient-amber font-semibold">Každý jeden deň</span>
                </h2>
                <p className="text-muted-foreground text-lg mb-6 leading-relaxed">
                  Predstavte si to: rano vstanete, relaxujete sa v saune a deň môžete začať s čistou hlavou. 
                  Alebo večer po práci – zavriete oči a všetok stres z dňa sa jednoducho vyparí.
                </p>
                <div className="flex flex-wrap gap-4 mb-8">
                  <span className="px-4 py-2 bg-primary/10 border border-primary/30 rounded-sm text-sm text-primary">
                    Súkromie doma
                  </span>
                  <span className="px-4 py-2 bg-primary/10 border border-primary/30 rounded-sm text-sm text-primary">
                    Regenerácia
                  </span>
                  <span className="px-4 py-2 bg-primary/10 border border-primary/30 rounded-sm text-sm text-primary">
                    Detox
                  </span>
                </div>
                <Button asChild variant="luxury" size="lg">
                  <Link to="/wellness">
                    Viac o zdravotných benefitoch
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Process Section */}
        <section className="py-24 bg-secondary/30">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-light mb-4">
                Postaráme sa o <span className="text-gradient-amber">každý detail</span>:
              </h2>
              <p className="text-muted-foreground text-lg">
                Od prvého kroku až po chvíle oddychu
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {processSteps.map((step) => (
                <div 
                  key={step.number}
                  className="group p-6 bg-card/50 border border-border/50 rounded-sm hover:border-primary/30 hover:bg-card/80 transition-all duration-500"
                >
                  <span className="text-5xl font-display font-light text-primary/30 group-hover:text-primary/50 transition-colors">
                    {step.number}
                  </span>
                  <h3 className="font-display text-xl font-semibold mt-4 mb-2 group-hover:text-primary transition-colors">
                    {step.title}
                  </h3>
                  <p className="text-muted-foreground text-sm">{step.description}</p>
                </div>
              ))}
            </div>
            
            <div className="text-center mt-12">
              <Button asChild variant="luxuryOutline" size="lg">
                <Link to="/faq">
                  Najčastejšie otázky
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Materials Section */}
        <section className="py-24 relative overflow-hidden">
          <div className="absolute inset-0">
            <img 
              src={saunaBarrel} 
              alt="Barrel sauna" 
              className="w-full h-full object-cover opacity-20"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-background via-background/95 to-background/80" />
          </div>
          
          <div className="relative z-10 container mx-auto px-6">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="font-display text-4xl md:text-5xl font-light mb-4">
                Prémiové materiály
              </h2>
              <p className="font-display text-2xl md:text-3xl text-gradient-amber font-semibold mb-8">
                bez kompromisov
              </p>
              <p className="text-muted-foreground text-lg mb-12 max-w-2xl mx-auto">
                Používame len tie najkvalitnejšie materiály zo severnej Európy. 
                Každý kúsok dreva je starostlivo vybraný pre maximálnu odolnosť a krásu.
              </p>
              
              <div className="grid md:grid-cols-2 gap-4 max-w-2xl mx-auto">
                {materials.map((material) => (
                  <div 
                    key={material}
                    className="flex items-center gap-3 p-4 bg-card/50 border border-border/50 rounded-sm"
                  >
                    <CheckCircle className="w-5 h-5 text-primary shrink-0" />
                    <span className="text-sm">{material}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Wellness Products Section */}
        <section className="py-24">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-light mb-4">
                Kompletný wellness
              </h2>
              <p className="font-display text-2xl md:text-3xl text-gradient-amber font-semibold">
                zážitok u vás doma
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <Link to="/category/hot-tubs" className="group relative overflow-hidden rounded-sm">
                <img 
                  src={hotTub} 
                  alt="Kade" 
                  className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/30 to-transparent" />
                <div className="absolute bottom-6 left-6">
                  <h3 className="font-display text-2xl font-semibold mb-2 group-hover:text-primary transition-colors">
                    Kade
                  </h3>
                  <p className="text-muted-foreground text-sm">Tradičné drevené kade na relaxáciu</p>
                </div>
              </Link>
              
              <Link to="/shop" className="group relative overflow-hidden rounded-sm">
                <img 
                  src={saunaBarrel} 
                  alt="Doplnky k saune" 
                  className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/30 to-transparent" />
                <div className="absolute bottom-6 left-6">
                  <h3 className="font-display text-2xl font-semibold mb-2 group-hover:text-primary transition-colors">
                    Doplnky k saune
                  </h3>
                  <p className="text-muted-foreground text-sm">Všetko pre dokonalý saunový zážitok</p>
                </div>
              </Link>
            </div>
          </div>
        </section>

        {/* Contact CTA Section */}
        <section className="py-24 bg-gradient-to-b from-secondary/30 to-background">
          <div className="container mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-light mb-4">
                Už len krok ku <span className="text-gradient-amber">vlastnej saune</span>
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto mb-2">
                Vyplňte krátky formulár a my sa vám ozveme do 24 hodín s nezáväznou ponukou.
              </p>
              <p className="text-primary font-semibold uppercase tracking-wider text-sm">
                Požiadať o cenovú ponuku a bezplatnú konzultáciu
              </p>
            </div>
            
            <div className="max-w-3xl mx-auto">
              <div className="bg-card/50 border border-border/50 rounded-sm p-8 md:p-12">
                <form className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">Meno *</label>
                    <Input placeholder="Vaše meno" className="bg-background/50" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Telefónne číslo *</label>
                    <Input placeholder="+421 xxx xxx xxx" className="bg-background/50" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Email *</label>
                    <Input type="email" placeholder="vas@email.sk" className="bg-background/50" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Okres</label>
                    <Select>
                      <SelectTrigger className="bg-background/50">
                        <SelectValue placeholder="Vyberte okres" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="bratislava">Bratislava</SelectItem>
                        <SelectItem value="kosice">Košice</SelectItem>
                        <SelectItem value="presov">Prešov</SelectItem>
                        <SelectItem value="zilina">Žilina</SelectItem>
                        <SelectItem value="banska-bystrica">Banská Bystrica</SelectItem>
                        <SelectItem value="nitra">Nitra</SelectItem>
                        <SelectItem value="trnava">Trnava</SelectItem>
                        <SelectItem value="trencin">Trenčín</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium mb-2">Poznámka</label>
                    <Textarea 
                      placeholder="Napíšte nám viac o vašich predstavách..." 
                      className="bg-background/50 min-h-[120px]" 
                    />
                  </div>
                  <div className="md:col-span-2 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <p className="text-muted-foreground text-sm">
                      * Odoslaním súhlasíte so spracovaním osobných údajov
                    </p>
                    <Button type="submit" variant="luxury" size="lg">
                      Odoslať
                      <ArrowRight className="ml-2 w-5 h-5" />
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default CustomSaunasPage;

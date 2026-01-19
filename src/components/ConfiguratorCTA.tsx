import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight, Palette, Ruler, Flame } from 'lucide-react';

const ConfiguratorCTA = () => {
  const features = [
    { icon: Palette, label: 'Typ dreva' },
    { icon: Ruler, label: 'Rozmery' },
    { icon: Flame, label: 'Kúrenie' },
  ];

  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-6">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-amber-900/20 via-background to-amber-950/30 border border-amber-500/20">
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-amber-600/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
          
          <div className="relative z-10 p-8 md:p-12 lg:p-16">
            <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16">
              {/* Content */}
              <div className="flex-1 text-center lg:text-left">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-sm font-medium mb-6">
                  <Sparkles className="w-4 h-4" />
                  <span>Online konfigurátor</span>
                </div>
                
                <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-light mb-4">
                  Vytvorte si saunu
                  <span className="block text-gradient-amber font-semibold">presne podľa vás</span>
                </h2>
                
                <p className="text-muted-foreground text-lg max-w-xl mb-8">
                  Navrhnite si svoju vysnívanú saunu v našom interaktívnom konfigurátore. 
                  Vyberte si typ, rozmery, drevo aj kúrenie – všetko na jednom mieste.
                </p>

                {/* Feature badges */}
                <div className="flex flex-wrap justify-center lg:justify-start gap-3 mb-8">
                  {features.map((feature, index) => (
                    <div 
                      key={index}
                      className="flex items-center gap-2 px-4 py-2 rounded-full glass-dark text-sm"
                    >
                      <feature.icon className="w-4 h-4 text-amber-400" />
                      <span className="text-foreground/80">{feature.label}</span>
                    </div>
                  ))}
                </div>

                <Link to="/konfigurator">
                  <Button variant="luxury" size="xl" className="group">
                    Spustiť konfigurátor
                    <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>
              </div>

              {/* Visual element */}
              <div className="flex-shrink-0">
                <div className="relative w-64 h-64 md:w-80 md:h-80">
                  {/* Animated rings */}
                  <div className="absolute inset-0 rounded-full border border-amber-500/20 animate-pulse" />
                  <div className="absolute inset-4 rounded-full border border-amber-500/30" />
                  <div className="absolute inset-8 rounded-full border border-amber-500/40" />
                  
                  {/* Center content */}
                  <div className="absolute inset-12 rounded-full bg-gradient-to-br from-amber-500/20 to-amber-600/10 backdrop-blur-sm flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-4xl md:text-5xl font-display font-bold text-gradient-amber">
                        100+
                      </div>
                      <div className="text-sm text-muted-foreground mt-1">
                        kombinácií
                      </div>
                    </div>
                  </div>

                  {/* Floating icons */}
                  <div className="absolute top-4 left-1/2 -translate-x-1/2 p-3 rounded-xl glass-dark">
                    <Palette className="w-5 h-5 text-amber-400" />
                  </div>
                  <div className="absolute bottom-4 left-8 p-3 rounded-xl glass-dark">
                    <Ruler className="w-5 h-5 text-amber-400" />
                  </div>
                  <div className="absolute bottom-4 right-8 p-3 rounded-xl glass-dark">
                    <Flame className="w-5 h-5 text-amber-400" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ConfiguratorCTA;

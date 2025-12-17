import { Button } from '@/components/ui/button';
import heroImage from '@/assets/hero-sauna.jpg';

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Luxury sauna interior"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/40 to-background" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/80 via-transparent to-background/80" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 text-center">
        <div className="max-w-4xl mx-auto animate-fade-up">
          <p className="text-primary font-medium tracking-[0.3em] uppercase text-sm mb-6">
            Premium Finnish Saunas
          </p>
          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-light mb-6 leading-tight">
            Your Time to
            <span className="block text-gradient-amber font-semibold">Relax</span>
          </h1>
          <p className="text-foreground/70 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
            Experience the ultimate wellness sanctuary with our handcrafted luxury saunas. 
            Designed for those who appreciate the art of relaxation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="luxury" size="xl">
              Explore Collection
            </Button>
            <Button variant="luxuryOutline" size="xl">
              Custom Design
            </Button>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-float">
        <div className="w-6 h-10 border-2 border-primary/40 rounded-full flex justify-center pt-2">
          <div className="w-1 h-3 bg-primary rounded-full animate-pulse" />
        </div>
      </div>
    </section>
  );
};

export default Hero;

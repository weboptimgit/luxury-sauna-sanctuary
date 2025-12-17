import { Button } from '@/components/ui/button';
import heroImage from '@/assets/hero-sauna.jpg';

const CTA = () => {
  return (
    <section id="contact" className="relative py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Sauna atmosphere"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-background/85" />
      </div>

      <div className="relative z-10 container mx-auto px-6 text-center">
        <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-light mb-6">
          Transform Your Home Into a
          <span className="block text-gradient-amber font-semibold">Wellness Sanctuary</span>
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto mb-10 text-lg">
          Take the first step towards daily relaxation and rejuvenation. 
          Our experts are ready to help you find the perfect sauna.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button variant="luxury" size="xl">
            Request Free Consultation
          </Button>
          <Button variant="luxuryOutline" size="xl">
            Download Catalog
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CTA;

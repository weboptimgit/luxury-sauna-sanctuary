import { Button } from '@/components/ui/button';
import saunaInterior from '@/assets/sauna-interior.jpg';

const About = () => {
  return (
    <section id="about" className="py-24">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Image */}
          <div className="relative">
            <div className="aspect-[4/5] rounded-lg overflow-hidden">
              <img
                src={saunaInterior}
                alt="Luxury sauna interior with hot stones"
                className="w-full h-full object-cover"
              />
            </div>
            {/* Decorative elements */}
            <div className="absolute -bottom-6 -right-6 w-48 h-48 border border-primary/30 rounded-lg -z-10" />
            <div className="absolute -top-6 -left-6 w-32 h-32 bg-primary/10 rounded-lg -z-10" />
          </div>

          {/* Content */}
          <div>
            <p className="text-primary font-medium tracking-[0.2em] uppercase text-sm mb-4">
              About Us
            </p>
            <h2 className="font-display text-4xl md:text-5xl font-light mb-6 leading-tight">
              Relaxation
              <span className="block text-gradient-amber font-semibold">For Everyone</span>
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              For over two decades, we've been crafting premium saunas that transform ordinary spaces 
              into extraordinary wellness retreats. Our commitment to quality, authenticity, and 
              Finnish tradition sets us apart.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-8">
              Each sauna is meticulously designed and built using sustainably sourced Nordic timber, 
              premium heating systems, and expert craftsmanship that's been passed down through generations.
            </p>
            <div className="flex flex-wrap gap-8 mb-8">
              <div>
                <p className="font-display text-4xl font-semibold text-primary">500+</p>
                <p className="text-sm text-muted-foreground">Saunas Delivered</p>
              </div>
              <div>
                <p className="font-display text-4xl font-semibold text-primary">25</p>
                <p className="text-sm text-muted-foreground">Years Experience</p>
              </div>
              <div>
                <p className="font-display text-4xl font-semibold text-primary">100%</p>
                <p className="text-sm text-muted-foreground">Customer Satisfaction</p>
              </div>
            </div>
            <Button variant="luxury" size="lg">
              Learn More
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;

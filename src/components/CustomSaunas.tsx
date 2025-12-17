import { Compass, PenTool, Truck, Wrench, CheckCircle, Headphones } from 'lucide-react';
import { Button } from '@/components/ui/button';
import hotTub from '@/assets/hot-tub.jpg';

const steps = [
  { icon: Compass, label: 'Consultation', description: 'Free initial consultation' },
  { icon: PenTool, label: 'Design', description: 'Custom design & planning' },
  { icon: Truck, label: 'Delivery', description: 'Safe transportation' },
  { icon: Wrench, label: 'Installation', description: 'Professional setup' },
  { icon: CheckCircle, label: 'Inspection', description: 'Quality assurance' },
  { icon: Headphones, label: 'Support', description: 'Ongoing assistance' },
];

const CustomSaunas = () => {
  return (
    <section id="custom" className="relative py-24 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={hotTub}
          alt="Luxury hot tub"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-background/90" />
      </div>

      <div className="relative z-10 container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <div>
            <p className="text-primary font-medium tracking-[0.2em] uppercase text-sm mb-4">
              Custom Solutions
            </p>
            <h2 className="font-display text-4xl md:text-5xl font-light mb-6 leading-tight">
              Saunas
              <span className="block text-gradient-amber font-semibold">Made to Measure</span>
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-8">
              Can't find exactly what you're looking for? Our expert craftsmen can design and build 
              a completely custom sauna tailored to your space, preferences, and lifestyle. From 
              initial concept to final installation, we handle everything.
            </p>
            <Button variant="luxury" size="lg">
              Start Your Project
            </Button>
          </div>

          {/* Process Steps */}
          <div>
            <div className="bg-card/80 backdrop-blur-sm rounded-lg p-8 border border-border/30">
              <h3 className="font-display text-2xl font-semibold mb-2 text-center">
                We Take Care of <span className="text-primary">Everything</span>
              </h3>
              <p className="text-muted-foreground text-center text-sm mb-8">
                From first step to your moment of relaxation
              </p>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                {steps.map((step, index) => (
                  <div
                    key={step.label}
                    className="text-center group"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="inline-flex items-center justify-center w-14 h-14 mb-3 rounded-full border border-primary/30 group-hover:bg-primary/10 group-hover:border-primary/50 transition-all duration-300">
                      <step.icon className="w-6 h-6 text-primary" />
                    </div>
                    <p className="font-medium text-sm mb-1">{step.label}</p>
                    <p className="text-muted-foreground text-xs">{step.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CustomSaunas;

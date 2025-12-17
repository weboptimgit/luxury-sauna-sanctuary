import { Leaf, Heart, Moon } from 'lucide-react';

const benefits = [
  {
    icon: Heart,
    title: 'Rest',
    description: 'Deep relaxation for body and mind',
  },
  {
    icon: Leaf,
    title: 'Renewal',
    description: 'Natural detoxification and rejuvenation',
  },
  {
    icon: Moon,
    title: 'Health',
    description: 'Improved sleep and overall wellness',
  },
];

const Wellness = () => {
  return (
    <section className="py-24 text-center">
      <div className="container mx-auto px-6">
        <h2 className="font-display text-4xl md:text-5xl font-light mb-4">
          Rest <span className="text-primary">|</span> Renewal <span className="text-primary">|</span> Health
        </h2>
        <p className="text-muted-foreground mb-16 max-w-xl mx-auto">
          Discover the transformative power of authentic Finnish sauna bathing
        </p>

        <div className="grid md:grid-cols-3 gap-12 max-w-4xl mx-auto">
          {benefits.map((benefit) => (
            <div key={benefit.title} className="group">
              <div className="inline-flex items-center justify-center w-20 h-20 mb-6 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 group-hover:from-primary/30 group-hover:to-primary/10 transition-all duration-500">
                <benefit.icon className="w-10 h-10 text-primary" />
              </div>
              <h3 className="font-display text-2xl font-semibold mb-3">{benefit.title}</h3>
              <p className="text-muted-foreground">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Wellness;

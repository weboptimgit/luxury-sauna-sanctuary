import { Thermometer, Heart, Sparkles, Shield } from 'lucide-react';

const features = [
  {
    icon: Thermometer,
    title: 'Premium Heating',
    description: 'Advanced heating systems for optimal temperature control',
  },
  {
    icon: Heart,
    title: 'Health Benefits',
    description: 'Improve circulation, reduce stress, and detoxify naturally',
  },
  {
    icon: Sparkles,
    title: 'Handcrafted Quality',
    description: 'Each sauna built with finest Finnish craftsmanship',
  },
  {
    icon: Shield,
    title: '10 Year Warranty',
    description: 'Complete peace of mind with our comprehensive warranty',
  },
];

const Features = () => {
  return (
    <section className="py-24 bg-secondary/30">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="group text-center p-8 rounded-lg bg-card/50 border border-border/30 hover:border-primary/30 transition-all duration-500 hover:-translate-y-2"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="inline-flex items-center justify-center w-16 h-16 mb-6 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors duration-300">
                <feature.icon className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-display text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;

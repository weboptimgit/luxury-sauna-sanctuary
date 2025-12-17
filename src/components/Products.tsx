import { Button } from '@/components/ui/button';
import saunaBarrel from '@/assets/sauna-barrel.jpg';
import saunaCube from '@/assets/sauna-cube.jpg';
import saunaTraditional from '@/assets/sauna-traditional.jpg';

const products = [
  {
    id: 1,
    name: 'Barrel Sauna',
    category: 'Outdoor',
    price: 'From €8,900',
    image: saunaBarrel,
    description: 'Classic barrel design with optimal heat circulation',
  },
  {
    id: 2,
    name: 'Cube Sauna',
    category: 'Modern',
    price: 'From €12,500',
    image: saunaCube,
    description: 'Contemporary minimalist design with panoramic views',
  },
  {
    id: 3,
    name: 'Traditional Cabin',
    category: 'Classic',
    price: 'From €15,900',
    image: saunaTraditional,
    description: 'Authentic Finnish log cabin sauna experience',
  },
];

const Products = () => {
  return (
    <section id="products" className="py-24 bg-secondary/20">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-primary font-medium tracking-[0.2em] uppercase text-sm mb-4">
            Our Collection
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-light mb-6">
            Premium <span className="text-gradient-amber font-semibold">Finnish Saunas</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Discover our curated selection of handcrafted saunas, each designed to deliver 
            the authentic Finnish wellness experience.
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product, index) => (
            <div
              key={product.id}
              className="group bg-card rounded-lg overflow-hidden border border-border/30 hover:border-primary/30 transition-all duration-500"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              {/* Image */}
              <div className="relative aspect-square overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <span className="absolute top-4 left-4 px-3 py-1 text-xs font-medium tracking-wider uppercase bg-primary/90 text-primary-foreground rounded-sm">
                  {product.category}
                </span>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="font-display text-2xl font-semibold mb-2">{product.name}</h3>
                <p className="text-muted-foreground text-sm mb-4">{product.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-primary font-semibold text-lg">{product.price}</span>
                  <Button variant="luxuryOutline" size="sm">
                    View Details
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <Button variant="luxury" size="lg">
            View All Products
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Products;

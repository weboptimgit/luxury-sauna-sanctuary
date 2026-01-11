import { Link } from 'react-router-dom';
import { SlidersHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { products } from '@/data/products';

const categories = [
  { id: 'all', name: 'All Products' },
  { id: 'outdoor', name: 'Outdoor' },
  { id: 'modern', name: 'Modern' },
  { id: 'classic', name: 'Classic' },
];

const formatPrice = (price: number) => {
  return new Intl.NumberFormat('de-DE', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 0,
  }).format(price);
};

const Shop = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-24 pb-16">
        {/* Hero Banner */}
        <section className="relative py-16 bg-gradient-to-b from-primary/10 to-transparent">
          <div className="container mx-auto px-6 text-center">
            <p className="text-primary font-medium tracking-[0.2em] uppercase text-sm mb-4">
              Our Collection
            </p>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-light mb-6">
              Premium <span className="text-gradient-amber font-semibold">Finnish Saunas</span>
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              Discover our curated selection of handcrafted saunas, each designed to deliver 
              the authentic Finnish wellness experience.
            </p>
          </div>
        </section>

        <div className="container mx-auto px-6 py-12">
          {/* Filters Bar */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-12">
            {/* Category Links */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Link
                  key={category.id}
                  to={category.id === 'all' ? '/shop' : `/category/${category.id}`}
                  className="px-4 py-2 text-sm font-medium tracking-wider uppercase border border-border/50 rounded-sm hover:border-primary hover:text-primary transition-all"
                >
                  {category.name}
                </Link>
              ))}
            </div>

            {/* Results Count */}
            <div className="flex items-center gap-4">
              <span className="text-muted-foreground text-sm">
                {products.length} products
              </span>
              <Button variant="ghost" size="sm" className="gap-2">
                <SlidersHorizontal className="w-4 h-4" />
                Filters
              </Button>
            </div>
          </div>

          {/* Products Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product, index) => (
              <Link
                key={product.id}
                to={`/product/${product.id}`}
                className="group bg-card rounded-lg overflow-hidden border border-border/30 hover:border-primary/30 transition-all duration-500 animate-fade-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Image */}
                <div className="relative aspect-square overflow-hidden">
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <span className="absolute top-4 left-4 px-3 py-1 text-xs font-medium tracking-wider uppercase bg-primary/90 text-primary-foreground rounded-sm">
                    {product.category}
                  </span>
                  {product.originalPrice && (
                    <span className="absolute top-4 right-4 px-3 py-1 text-xs font-medium tracking-wider uppercase bg-destructive text-destructive-foreground rounded-sm">
                      Sale
                    </span>
                  )}
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="font-display text-2xl font-semibold mb-2 group-hover:text-primary transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4">{product.shortDescription}</p>
                  <div className="flex items-center gap-3">
                    <span className="text-primary font-semibold text-lg">
                      {formatPrice(product.price)}
                    </span>
                    {product.originalPrice && (
                      <span className="text-muted-foreground line-through text-sm">
                        {formatPrice(product.originalPrice)}
                      </span>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Bottom CTA */}
          <div className="mt-16 text-center">
            <p className="text-muted-foreground mb-4">
              Can't find what you're looking for?
            </p>
            <Link to="/#custom">
              <Button variant="luxuryOutline" size="lg">
                Request Custom Sauna
              </Button>
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Shop;

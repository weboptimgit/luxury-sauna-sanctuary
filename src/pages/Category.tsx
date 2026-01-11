import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, SlidersHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { products } from '@/data/products';

const categoryInfo: Record<string, { title: string; description: string }> = {
  outdoor: {
    title: 'Outdoor Saunas',
    description: 'Designed for your garden, terrace, or backyard. Our outdoor saunas blend seamlessly with nature while providing the ultimate relaxation experience.',
  },
  modern: {
    title: 'Modern Saunas',
    description: 'Contemporary designs featuring clean lines, panoramic glass, and cutting-edge technology for the design-conscious homeowner.',
  },
  classic: {
    title: 'Classic Saunas',
    description: 'Traditional Finnish craftsmanship meets timeless design. Experience authentic löyly in these heritage-inspired saunas.',
  },
};

const allCategories = [
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

const Category = () => {
  const { slug } = useParams<{ slug: string }>();
  const category = categoryInfo[slug || ''];
  
  const filteredProducts = products.filter(
    (product) => product.category.toLowerCase() === slug?.toLowerCase()
  );

  if (!category) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-6 py-24 text-center">
          <h1 className="font-display text-4xl mb-4">Category Not Found</h1>
          <p className="text-muted-foreground mb-8">The category you're looking for doesn't exist.</p>
          <Link to="/shop">
            <Button variant="luxury">View All Products</Button>
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-24 pb-16">
        {/* Hero Banner */}
        <section className="relative py-16 bg-gradient-to-b from-primary/10 to-transparent">
          <div className="container mx-auto px-6">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
              <Link to="/" className="hover:text-primary transition-colors">Home</Link>
              <span>/</span>
              <Link to="/shop" className="hover:text-primary transition-colors">Shop</Link>
              <span>/</span>
              <span className="text-foreground capitalize">{slug}</span>
            </nav>

            <div className="text-center">
              <p className="text-primary font-medium tracking-[0.2em] uppercase text-sm mb-4">
                Category
              </p>
              <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-light mb-6">
                <span className="text-gradient-amber font-semibold">{category.title}</span>
              </h1>
              <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
                {category.description}
              </p>
            </div>
          </div>
        </section>

        <div className="container mx-auto px-6 py-12">
          {/* Back Link & Filters */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-12">
            <div className="flex flex-wrap items-center gap-4">
              <Link 
                to="/shop" 
                className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                All Products
              </Link>
              
              <div className="hidden sm:block h-4 w-px bg-border" />
              
              {/* Other Categories */}
              <div className="flex flex-wrap gap-2">
                {allCategories
                  .filter((cat) => cat.id !== slug)
                  .map((cat) => (
                    <Link
                      key={cat.id}
                      to={`/category/${cat.id}`}
                      className="px-3 py-1 text-xs font-medium tracking-wider uppercase border border-border/50 rounded-sm hover:border-primary hover:text-primary transition-all"
                    >
                      {cat.name}
                    </Link>
                  ))}
              </div>
            </div>

            {/* Results Count */}
            <div className="flex items-center gap-4">
              <span className="text-muted-foreground text-sm">
                {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''}
              </span>
              <Button variant="ghost" size="sm" className="gap-2">
                <SlidersHorizontal className="w-4 h-4" />
                Filters
              </Button>
            </div>
          </div>

          {/* Products Grid */}
          {filteredProducts.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProducts.map((product, index) => (
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
          ) : (
            <div className="text-center py-16">
              <p className="text-muted-foreground mb-4">No products found in this category.</p>
              <Link to="/shop">
                <Button variant="luxuryOutline">Browse All Products</Button>
              </Link>
            </div>
          )}

          {/* More Categories */}
          <div className="mt-16 pt-16 border-t border-border/30">
            <h2 className="font-display text-2xl font-light text-center mb-8">
              Explore Other <span className="text-gradient-amber font-semibold">Categories</span>
            </h2>
            <div className="grid sm:grid-cols-3 gap-6">
              {allCategories
                .filter((cat) => cat.id !== slug)
                .map((cat) => (
                  <Link
                    key={cat.id}
                    to={`/category/${cat.id}`}
                    className="group relative aspect-[16/9] rounded-lg overflow-hidden border border-border/30 hover:border-primary/50 transition-all"
                  >
                    <img
                      src={products.find((p) => p.category.toLowerCase() === cat.id)?.images[0]}
                      alt={cat.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
                    <div className="absolute bottom-4 left-4">
                      <h3 className="font-display text-xl font-semibold group-hover:text-primary transition-colors">
                        {cat.name} Saunas
                      </h3>
                    </div>
                  </Link>
                ))}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Category;

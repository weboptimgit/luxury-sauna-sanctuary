import { useParams, Link } from 'react-router-dom';
import { useState } from 'react';
import { ArrowLeft, Check, Truck, Shield, Phone, Minus, Plus } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { getProductById, products } from '@/data/products';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';

// Variant options with price modifiers
const sizeOptions = [
  { value: 'small', label: '2.0m × 1.8m × 2.0m (2-3 osoby)', priceModifier: -1500 },
  { value: 'medium', label: '2.4m × 2.1m × 2.1m (4-6 osôb)', priceModifier: 0 },
  { value: 'large', label: '3.0m × 2.5m × 2.4m (6-8 osôb)', priceModifier: 2500 },
  { value: 'xlarge', label: '4.0m × 3.0m × 2.8m (8-10 osôb)', priceModifier: 5500 },
];

const colorOptions = [
  { value: 'natural', label: 'Prírodné drevo', priceModifier: 0 },
  { value: 'honey', label: 'Medový odtieň', priceModifier: 300 },
  { value: 'dark', label: 'Tmavý orech', priceModifier: 500 },
  { value: 'black', label: 'Čierna', priceModifier: 700 },
];

// Calculate price range for a product
const calculatePriceRange = (basePrice: number) => {
  const minSizeModifier = Math.min(...sizeOptions.map(s => s.priceModifier));
  const maxSizeModifier = Math.max(...sizeOptions.map(s => s.priceModifier));
  const minColorModifier = Math.min(...colorOptions.map(c => c.priceModifier));
  const maxColorModifier = Math.max(...colorOptions.map(c => c.priceModifier));
  
  return {
    min: basePrice + minSizeModifier + minColorModifier,
    max: basePrice + maxSizeModifier + maxColorModifier,
  };
};

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const product = getProductById(id || '');
  const [quantity, setQuantity] = useState(1);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [selectedColor, setSelectedColor] = useState<string>('');

  // Calculate current price based on selected variants
  const selectedSizeOption = sizeOptions.find(s => s.value === selectedSize);
  const selectedColorOption = colorOptions.find(c => c.value === selectedColor);
  
  const hasSelectedVariants = selectedSize && selectedColor;
  const currentPrice = product ? 
    product.price + (selectedSizeOption?.priceModifier || 0) + (selectedColorOption?.priceModifier || 0) 
    : 0;
  const priceRange = product ? calculatePriceRange(product.price) : { min: 0, max: 0 };

  if (!product) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-6 py-24 text-center">
          <h1 className="font-display text-4xl mb-4">Product Not Found</h1>
          <p className="text-muted-foreground mb-8">The product you're looking for doesn't exist.</p>
          <Link to="/#products">
            <Button variant="luxury">View All Products</Button>
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('de-DE', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-6">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
            <Link to="/" className="hover:text-primary transition-colors">Home</Link>
            <span>/</span>
            <Link to="/#products" className="hover:text-primary transition-colors">Products</Link>
            <span>/</span>
            <span className="text-foreground">{product.name}</span>
          </nav>

          {/* Back Link */}
          <Link 
            to="/#products" 
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Products
          </Link>

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Image Gallery */}
            <div className="space-y-4">
              {/* Main Image */}
              <div className="relative aspect-square rounded-lg overflow-hidden bg-secondary/20">
                <img
                  src={product.images[selectedImageIndex]}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
                {discount > 0 && (
                  <Badge className="absolute top-4 left-4 bg-destructive text-destructive-foreground">
                    -{discount}% OFF
                  </Badge>
                )}
              </div>

              {/* Thumbnail Gallery */}
              <div className="relative px-12">
                <Carousel opts={{ align: 'start' }} className="w-full">
                  <CarouselContent className="-ml-2">
                    {product.images.map((image, index) => (
                      <CarouselItem key={index} className="pl-2 basis-1/3">
                        <button
                          onClick={() => setSelectedImageIndex(index)}
                          className={`relative aspect-square rounded-md overflow-hidden border-2 transition-all ${
                            selectedImageIndex === index
                              ? 'border-primary ring-2 ring-primary/20'
                              : 'border-transparent hover:border-primary/50'
                          }`}
                        >
                          <img
                            src={image}
                            alt={`${product.name} view ${index + 1}`}
                            className="w-full h-full object-cover"
                          />
                        </button>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious className="left-0" />
                  <CarouselNext className="right-0" />
                </Carousel>
              </div>
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              {/* Category & Name */}
              <div>
                <p className="text-primary font-medium tracking-[0.2em] uppercase text-sm mb-2">
                  {product.category}
                </p>
                <h1 className="font-display text-4xl md:text-5xl font-light mb-4">
                  {product.name}
                </h1>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  {product.description}
                </p>
              </div>

              {/* Price */}
              <div className="flex flex-col gap-1 py-4 border-y border-border/30">
                <div className="flex items-baseline gap-4">
                  {hasSelectedVariants ? (
                    <>
                      <span className="font-display text-4xl text-primary font-semibold">
                        {formatPrice(currentPrice)}
                      </span>
                      {product.originalPrice && (
                        <span className="text-xl text-muted-foreground line-through">
                          {formatPrice(product.originalPrice + (selectedSizeOption?.priceModifier || 0) + (selectedColorOption?.priceModifier || 0))}
                        </span>
                      )}
                    </>
                  ) : (
                    <>
                      <span className="font-display text-4xl text-primary font-semibold">
                        od {formatPrice(priceRange.min)}
                      </span>
                      <span className="text-lg text-muted-foreground">
                        – {formatPrice(priceRange.max)}
                      </span>
                    </>
                  )}
                </div>
                {!hasSelectedVariants && (
                  <p className="text-sm text-muted-foreground">
                    Vyberte rozmer a farbu pre presnú cenu
                  </p>
                )}
              </div>

              {/* Variant Selectors */}
              <div className="space-y-4">
                {/* Size Selector */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Rozmer</label>
                  <Select value={selectedSize} onValueChange={setSelectedSize}>
                    <SelectTrigger className="w-full bg-background border-border/50">
                      <SelectValue placeholder="Vyberte rozmer" />
                    </SelectTrigger>
                    <SelectContent className="bg-background border-border z-50">
                      {sizeOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          <span className="flex justify-between items-center gap-4 w-full">
                            <span>{option.label}</span>
                            <span className={`text-sm ${option.priceModifier > 0 ? 'text-primary' : option.priceModifier < 0 ? 'text-green-600' : 'text-muted-foreground'}`}>
                              {option.priceModifier > 0 ? `+${formatPrice(option.priceModifier)}` : option.priceModifier < 0 ? formatPrice(option.priceModifier) : '—'}
                            </span>
                          </span>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Color Selector */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Farba</label>
                  <Select value={selectedColor} onValueChange={setSelectedColor}>
                    <SelectTrigger className="w-full bg-background border-border/50">
                      <SelectValue placeholder="Vyberte farbu" />
                    </SelectTrigger>
                    <SelectContent className="bg-background border-border z-50">
                      {colorOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          <span className="flex justify-between items-center gap-4 w-full">
                            <span>{option.label}</span>
                            <span className={`text-sm ${option.priceModifier > 0 ? 'text-primary' : 'text-muted-foreground'}`}>
                              {option.priceModifier > 0 ? `+${formatPrice(option.priceModifier)}` : '—'}
                            </span>
                          </span>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Stock Status */}
              <div className="flex items-center gap-2">
                <div className={`w-3 h-3 rounded-full ${product.inStock ? 'bg-green-500' : 'bg-red-500'}`} />
                <span className={product.inStock ? 'text-green-600' : 'text-red-600'}>
                  {product.inStock ? 'Skladom' : 'Nie je skladom'}
                </span>
              </div>

              {/* Quantity & Add to Cart */}
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex items-center border border-border/50 rounded-md">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-3 hover:bg-secondary/50 transition-colors"
                    aria-label="Decrease quantity"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="px-6 py-3 font-medium min-w-[60px] text-center">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-3 hover:bg-secondary/50 transition-colors"
                    aria-label="Increase quantity"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
                <Button variant="luxury" size="lg" className="flex-1">
                  Add to Cart
                </Button>
              </div>

              {/* Quick Contact */}
              <Button variant="luxuryOutline" className="w-full" size="lg">
                <Phone className="w-4 h-4 mr-2" />
                Request a Quote
              </Button>

              {/* Trust Badges */}
              <div className="grid grid-cols-3 gap-4 pt-6 border-t border-border/30">
                <div className="text-center">
                  <Truck className="w-6 h-6 mx-auto mb-2 text-primary" />
                  <p className="text-xs text-muted-foreground">Free Delivery</p>
                </div>
                <div className="text-center">
                  <Shield className="w-6 h-6 mx-auto mb-2 text-primary" />
                  <p className="text-xs text-muted-foreground">5 Year Warranty</p>
                </div>
                <div className="text-center">
                  <Check className="w-6 h-6 mx-auto mb-2 text-primary" />
                  <p className="text-xs text-muted-foreground">Quality Certified</p>
                </div>
              </div>

              {/* Features List */}
              <div className="space-y-3 pt-6">
                <h3 className="font-display text-xl font-semibold">Key Features</h3>
                <ul className="space-y-2">
                  {product.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Product Details Tabs */}
          <div className="mt-16 lg:mt-24">
            <Tabs defaultValue="description" className="w-full">
              <TabsList className="w-full max-w-md mx-auto grid grid-cols-2 mb-8">
                <TabsTrigger value="description" className="text-base">Popis produktu</TabsTrigger>
                <TabsTrigger value="specifications" className="text-base">Ďalšie informácie</TabsTrigger>
              </TabsList>
              
              <TabsContent value="description" className="max-w-4xl mx-auto">
                <div className="prose prose-lg max-w-none">
                  <div className="bg-card rounded-lg border border-border/30 p-8">
                    <h3 className="font-display text-2xl font-semibold mb-4 text-foreground">
                      {product.name}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed mb-6">
                      {product.description}
                    </p>
                    
                    <h4 className="font-display text-xl font-semibold mb-4 text-foreground">
                      Kľúčové vlastnosti
                    </h4>
                    <ul className="space-y-3">
                      {product.features.map((feature, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <Check className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                          <span className="text-muted-foreground">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="specifications">
                <div className="max-w-3xl mx-auto bg-card rounded-lg border border-border/30 overflow-hidden">
                  <table className="w-full">
                    <tbody>
                      {product.specifications.map((spec, index) => (
                        <tr
                          key={index}
                          className={`${index % 2 === 0 ? 'bg-secondary/10' : 'bg-transparent'}`}
                        >
                          <td className="px-6 py-4 font-medium text-foreground border-r border-border/20 w-1/3">
                            {spec.label}
                          </td>
                          <td className="px-6 py-4 text-muted-foreground">
                            {spec.value}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Related Products */}
          <div className="mt-16 lg:mt-24">
            <h2 className="font-display text-3xl font-light mb-8 text-center">
              You May Also <span className="text-gradient-amber font-semibold">Like</span>
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {products
                .filter(p => p.id !== product.id)
                .slice(0, 3)
                .map((relatedProduct) => (
                  <Link
                    key={relatedProduct.id}
                    to={`/product/${relatedProduct.id}`}
                    className="group bg-card rounded-lg overflow-hidden border border-border/30 hover:border-primary/30 transition-all duration-500"
                  >
                    <div className="relative aspect-square overflow-hidden">
                      <img
                        src={relatedProduct.images[0]}
                        alt={relatedProduct.name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <span className="absolute top-4 left-4 px-3 py-1 text-xs font-medium tracking-wider uppercase bg-primary/90 text-primary-foreground rounded-sm">
                        {relatedProduct.category}
                      </span>
                    </div>
                    <div className="p-6">
                      <h3 className="font-display text-xl font-semibold mb-2">{relatedProduct.name}</h3>
                      <p className="text-primary font-semibold">{formatPrice(relatedProduct.price)}</p>
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

export default ProductDetail;

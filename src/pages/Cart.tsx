import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Minus, Plus, Trash2, Tag, ArrowRight, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import saunaBarrel from '@/assets/sauna-barrel.jpg';

interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  dimensions: string;
  color: string;
  quantity: number;
}

const Cart = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: 'barrel-sauna',
      name: 'Barrel Sauna',
      price: 8900,
      image: saunaBarrel,
      dimensions: '2,40 × 2,10 × 2,10 m',
      color: 'Prírodná',
      quantity: 1,
    },
  ]);

  const [couponCode, setCouponCode] = useState('');
  const [couponApplied, setCouponApplied] = useState(false);

  const updateQuantity = (id: string, delta: number) => {
    setCartItems(items =>
      items.map(item =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item
      )
    );
  };

  const removeItem = (id: string) => {
    setCartItems(items => items.filter(item => item.id !== id));
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('sk-SK', {
      style: 'decimal',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(price) + ' €';
  };

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  
  const discount = couponApplied ? subtotal * 0.1 : 0;
  const totalPrice = subtotal - discount;

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-12 pt-32 min-h-[70vh]">
        {/* Page Title */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-display text-foreground mb-2">
            Váš <span className="text-primary">košík</span>
          </h1>
          <p className="text-muted-foreground">
            {cartItems.length > 0 
              ? `${cartItems.length} ${cartItems.length === 1 ? 'položka' : 'položky'} v košíku`
              : 'Žiadne položky v košíku'
            }
          </p>
        </div>

        {cartItems.length === 0 ? (
          <div className="text-center py-20 glass-dark rounded-2xl">
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-primary/10 flex items-center justify-center">
              <ShoppingBag className="w-10 h-10 text-primary" />
            </div>
            <h2 className="text-2xl font-display text-foreground mb-3">
              Váš košík je prázdny
            </h2>
            <p className="text-muted-foreground mb-8 max-w-md mx-auto">
              Prezrite si naše prémiové sauny a pridajte niečo do košíka.
            </p>
            <Button asChild variant="luxury" size="lg">
              <Link to="/shop">
                Pokračovať v nákupe
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-6">
              {cartItems.map(item => (
                <div 
                  key={item.id} 
                  className="glass-dark rounded-xl p-6 flex flex-col sm:flex-row gap-6 group hover:border-primary/30 transition-colors"
                >
                  {/* Product Image */}
                  <Link 
                    to={`/product/${item.id}`}
                    className="w-full sm:w-32 h-32 flex-shrink-0 rounded-lg overflow-hidden"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </Link>

                  {/* Product Details */}
                  <div className="flex-1 flex flex-col">
                    <div className="flex justify-between items-start mb-2">
                      <Link 
                        to={`/product/${item.id}`}
                        className="text-xl font-display text-foreground hover:text-primary transition-colors"
                      >
                        {item.name}
                      </Link>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="p-2 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-lg transition-colors"
                        aria-label="Odstrániť položku"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                    
                    <div className="space-y-1 text-sm text-muted-foreground mb-4">
                      <p>
                        <span className="text-foreground/70">Rozmery:</span> {item.dimensions}
                      </p>
                      <p>
                        <span className="text-foreground/70">Farba:</span> {item.color}
                      </p>
                    </div>

                    <div className="mt-auto flex flex-wrap items-center justify-between gap-4">
                      {/* Quantity Selector */}
                      <div className="flex items-center bg-muted/50 rounded-lg">
                        <button
                          onClick={() => updateQuantity(item.id, -1)}
                          className="p-3 text-muted-foreground hover:text-primary transition-colors"
                          aria-label="Znížiť množstvo"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="w-12 text-center text-foreground font-medium text-lg">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, 1)}
                          className="p-3 text-muted-foreground hover:text-primary transition-colors"
                          aria-label="Zvýšiť množstvo"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>

                      {/* Price */}
                      <div className="text-right">
                        <p className="text-2xl font-display text-primary">
                          {formatPrice(item.price * item.quantity)}
                        </p>
                        {item.quantity > 1 && (
                          <p className="text-sm text-muted-foreground">
                            {formatPrice(item.price)} / ks
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {/* Continue Shopping Link */}
              <Link 
                to="/shop" 
                className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mt-4"
              >
                <ArrowRight className="w-4 h-4 rotate-180" />
                Pokračovať v nákupe
              </Link>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="glass-dark rounded-xl p-6 sticky top-28">
                <h2 className="text-xl font-display text-foreground mb-6 pb-4 border-b border-border">
                  Súhrn objednávky
                </h2>

                {/* Coupon Section */}
                <div className="mb-6">
                  <label className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                    <Tag className="w-4 h-4" />
                    Zľavový kupón
                  </label>
                  <div className="flex gap-2">
                    <Input
                      value={couponCode}
                      onChange={e => setCouponCode(e.target.value)}
                      placeholder="Zadajte kód"
                      className="flex-1 bg-muted/50 border-border focus:border-primary"
                      disabled={couponApplied}
                    />
                    <Button
                      variant="outline"
                      onClick={() => {
                        if (couponCode.trim()) {
                          setCouponApplied(true);
                        }
                      }}
                      disabled={couponApplied || !couponCode.trim()}
                      className="border-primary/50 text-primary hover:bg-primary hover:text-primary-foreground"
                    >
                      {couponApplied ? 'Použitý' : 'Použiť'}
                    </Button>
                  </div>
                  {couponApplied && (
                    <p className="text-sm text-green-500 mt-2">
                      ✓ Kupón bol úspešne aplikovaný (-10%)
                    </p>
                  )}
                </div>

                {/* Price Breakdown */}
                <div className="space-y-3 py-4 border-t border-border">
                  <div className="flex justify-between text-muted-foreground">
                    <span>Medzisúčet</span>
                    <span>{formatPrice(subtotal)}</span>
                  </div>
                  {couponApplied && (
                    <div className="flex justify-between text-green-500">
                      <span>Zľava (10%)</span>
                      <span>-{formatPrice(discount)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-muted-foreground">
                    <span>Doprava</span>
                    <span>Zdarma</span>
                  </div>
                </div>

                {/* Total */}
                <div className="flex justify-between items-center py-4 border-t border-border mb-6">
                  <span className="text-lg text-foreground">Celkom</span>
                  <span className="text-3xl font-display text-primary">
                    {formatPrice(totalPrice)}
                  </span>
                </div>

                {/* Checkout Button */}
                <Button
                  asChild
                  variant="luxury"
                  size="lg"
                  className="w-full"
                >
                  <Link to="/checkout">
                    Pokračovať do pokladne
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>

                {/* Trust Badges */}
                <div className="mt-6 pt-6 border-t border-border">
                  <div className="flex flex-col gap-2 text-xs text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                      Bezpečná platba
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                      Doprava zdarma nad 5 000 €
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                      14 dní na vrátenie
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Cart;

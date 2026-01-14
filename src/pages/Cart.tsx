import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Minus, Plus, ChevronUp, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

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
      id: '1',
      name: 'Elaris',
      price: 6990,
      image: '/placeholder.svg',
      dimensions: '2,75 × 2,20 × 2,35 m',
      color: 'Biela',
      quantity: 9,
    },
  ]);

  const [couponOpen, setCouponOpen] = useState(true);
  const [couponCode, setCouponCode] = useState('');

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

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-12 pt-32">
        {cartItems.length === 0 ? (
          <div className="text-center py-20">
            <h1 className="text-3xl font-display text-foreground mb-4">
              Váš košík je prázdny
            </h1>
            <p className="text-muted-foreground mb-8">
              Prezrite si naše produkty a pridajte niečo do košíka.
            </p>
            <Button asChild className="bg-primary hover:bg-primary/90 text-primary-foreground">
              <Link to="/shop">Pokračovať v nákupe</Link>
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            {/* Product Column */}
            <div className="lg:col-span-5">
              <h2 className="text-sm font-medium text-muted-foreground tracking-wider mb-8">
                PRODUKT
              </h2>

              <div className="space-y-8">
                {cartItems.map(item => (
                  <div key={item.id} className="flex gap-4">
                    {/* Product Image */}
                    <div className="w-20 h-20 flex-shrink-0 bg-muted rounded overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Product Details */}
                    <div className="flex-1 space-y-1">
                      <h3 className="text-foreground font-medium">{item.name}</h3>
                      <p className="text-primary font-medium">
                        {formatPrice(item.price)}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        <span className="font-medium text-foreground">Rozmery:</span>{' '}
                        {item.dimensions}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        <span className="font-medium text-foreground">Farba:</span>{' '}
                        {item.color}
                      </p>

                      {/* Quantity Selector */}
                      <div className="flex items-center gap-4 pt-2">
                        <div className="flex items-center border border-border rounded">
                          <button
                            onClick={() => updateQuantity(item.id, -1)}
                            className="p-2 text-muted-foreground hover:text-foreground transition-colors"
                            aria-label="Znížiť množstvo"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="w-10 text-center text-foreground font-medium">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, 1)}
                            className="p-2 text-muted-foreground hover:text-foreground transition-colors"
                            aria-label="Zvýšiť množstvo"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      {/* Remove Link */}
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-sm text-primary hover:text-primary/80 underline underline-offset-4 mt-2 block"
                      >
                        Odobrať položku
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Price Column */}
            <div className="lg:col-span-3">
              <h2 className="text-sm font-medium text-muted-foreground tracking-wider mb-8">
                CENA SPOLU
              </h2>

              <div className="space-y-8">
                {cartItems.map(item => (
                  <div key={item.id} className="text-foreground font-medium">
                    {formatPrice(item.price * item.quantity)}
                  </div>
                ))}
              </div>
            </div>

            {/* Cart Summary Column */}
            <div className="lg:col-span-4">
              <h2 className="text-sm font-medium text-muted-foreground tracking-wider mb-8">
                SUMÁR KOŠÍKA
              </h2>

              <div className="space-y-6">
                {/* Coupon Section */}
                <div className="border-b border-border pb-6">
                  <button
                    onClick={() => setCouponOpen(!couponOpen)}
                    className="flex items-center justify-between w-full text-foreground"
                  >
                    <span>Pridať kupóny</span>
                    {couponOpen ? (
                      <ChevronUp className="w-5 h-5" />
                    ) : (
                      <ChevronDown className="w-5 h-5" />
                    )}
                  </button>

                  {couponOpen && (
                    <div className="mt-4 flex gap-2">
                      <Input
                        value={couponCode}
                        onChange={e => setCouponCode(e.target.value)}
                        placeholder=""
                        className="flex-1 bg-muted border-border"
                      />
                      <Button
                        variant="outline"
                        className="border-border text-muted-foreground hover:text-foreground"
                      >
                        Použiť
                      </Button>
                    </div>
                  )}
                </div>

                {/* Total */}
                <div className="flex items-center justify-between py-4">
                  <span className="text-lg text-foreground">Odhadovaná suma</span>
                  <span className="text-2xl font-display text-foreground">
                    {formatPrice(totalPrice)}
                  </span>
                </div>

                {/* Checkout Button */}
                <Button
                  asChild
                  variant="link"
                  className="w-full text-foreground hover:text-primary underline underline-offset-4 text-base"
                >
                  <Link to="/checkout">Pokračovať do pokladne</Link>
                </Button>
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

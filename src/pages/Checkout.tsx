import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ChevronDown, ChevronUp, Shield, Lock, CreditCard, Banknote } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import saunaBarrel from '@/assets/sauna-barrel.jpg';

const Checkout = () => {
  const [showCoupon, setShowCoupon] = useState(false);
  const [showNote, setShowNote] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [couponCode, setCouponCode] = useState('');

  // Illustrative product data
  const orderItem = {
    name: 'Sauna – konfigurácia',
    price: 11690.00,
    image: saunaBarrel,
    details: {
      'Typ': 'Sudová sauna',
      'Veľkosť': '3M (4-5 osôb)',
      'Drevo': 'Thermowood',
      'Ohrievač': 'Na drevo / Harvia 20 PRO',
      'Komín': 'Premium nerez',
      'Dvere': 'Drevené dvere',
      'Strecha': 'Šindle',
      'Okná': 'Panoramatické okno',
      'LED': 'RGB LED',
      'Doplnky': 'Terasa, Vonkajšia lavica, Teplomer a vlhkomer, Drevená nádoba',
    }
  };

  const subtotal = orderItem.price;
  const total = subtotal;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-[1fr,420px] gap-12 max-w-6xl mx-auto">
          
          {/* Left Column - Form */}
          <div className="space-y-8">
            
            {/* Contact Info */}
            <section className="space-y-4">
              <h2 className="text-xl font-display text-foreground">Kontaktné údaje</h2>
              <div className="space-y-3">
                <Input 
                  type="email" 
                  placeholder="Email *"
                  className="bg-card border-border/50 h-12 text-foreground placeholder:text-muted-foreground focus:border-primary"
                />
              </div>
            </section>

            {/* Billing Address */}
            <section className="space-y-4">
              <h2 className="text-xl font-display text-foreground">Fakturačná adresa</h2>
              <div className="space-y-4">
                <Select defaultValue="sk">
                  <SelectTrigger className="bg-card border-border/50 h-12 text-foreground">
                    <SelectValue placeholder="Krajina" />
                  </SelectTrigger>
                  <SelectContent className="bg-card border-border">
                    <SelectItem value="sk">Slovensko</SelectItem>
                    <SelectItem value="cz">Česká republika</SelectItem>
                    <SelectItem value="at">Rakúsko</SelectItem>
                    <SelectItem value="hu">Maďarsko</SelectItem>
                    <SelectItem value="pl">Poľsko</SelectItem>
                    <SelectItem value="de">Nemecko</SelectItem>
                  </SelectContent>
                </Select>
                
                <div className="grid grid-cols-2 gap-4">
                  <Input 
                    placeholder="Meno *"
                    className="bg-card border-border/50 h-12 text-foreground placeholder:text-muted-foreground focus:border-primary"
                  />
                  <Input 
                    placeholder="Priezvisko *"
                    className="bg-card border-border/50 h-12 text-foreground placeholder:text-muted-foreground focus:border-primary"
                  />
                </div>
                
                <Input 
                  placeholder="Ulica a číslo domu *"
                  className="bg-card border-border/50 h-12 text-foreground placeholder:text-muted-foreground focus:border-primary"
                />
                
                <button className="text-primary text-sm hover:text-primary/80 transition-colors">
                  + Pridať dom, byt, atď.
                </button>
                
                <div className="grid grid-cols-2 gap-4">
                  <Input 
                    placeholder="Mesto *"
                    className="bg-card border-border/50 h-12 text-foreground placeholder:text-muted-foreground focus:border-primary"
                  />
                  <Input 
                    placeholder="PSČ *"
                    className="bg-card border-border/50 h-12 text-foreground placeholder:text-muted-foreground focus:border-primary"
                  />
                </div>
                
                <Input 
                  type="tel"
                  placeholder="Telefónne číslo *"
                  className="bg-card border-border/50 h-12 text-foreground placeholder:text-muted-foreground focus:border-primary"
                />
              </div>
            </section>

            {/* Payment Options */}
            <section className="space-y-4">
              <h2 className="text-xl font-display text-foreground">Možnosti platby</h2>
              
              <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="space-y-3">
                <label 
                  className={`flex items-center gap-4 p-4 rounded-lg border cursor-pointer transition-all ${
                    paymentMethod === 'card' 
                      ? 'border-primary bg-primary/5' 
                      : 'border-border/50 bg-card hover:border-border'
                  }`}
                >
                  <RadioGroupItem value="card" id="card" />
                  <CreditCard className="w-5 h-5 text-muted-foreground" />
                  <span className="text-foreground">Platobná karta</span>
                </label>
                
                <label 
                  className={`flex items-center gap-4 p-4 rounded-lg border cursor-pointer transition-all ${
                    paymentMethod === 'transfer' 
                      ? 'border-primary bg-primary/5' 
                      : 'border-border/50 bg-card hover:border-border'
                  }`}
                >
                  <RadioGroupItem value="transfer" id="transfer" />
                  <Banknote className="w-5 h-5 text-muted-foreground" />
                  <span className="text-foreground">Bankový prevod</span>
                </label>
              </RadioGroup>
            </section>

            {/* Order Note */}
            <section className="space-y-4">
              <div className="flex items-center gap-3">
                <Checkbox 
                  id="addNote" 
                  checked={showNote}
                  onCheckedChange={(checked) => setShowNote(checked as boolean)}
                />
                <Label htmlFor="addNote" className="text-foreground cursor-pointer">
                  Pridajte poznámku k vašej objednávke
                </Label>
              </div>
              
              {showNote && (
                <Textarea 
                  placeholder="Vaša poznámka..."
                  className="bg-card border-border/50 text-foreground placeholder:text-muted-foreground focus:border-primary min-h-[100px]"
                />
              )}
            </section>

            {/* Terms */}
            <p className="text-sm text-muted-foreground">
              Pokračovaním v nákupe súhlasíte s našimi{' '}
              <Link to="/terms" className="text-primary hover:underline">Obchodné podmienky</Link>
              {' '}a{' '}
              <Link to="/privacy" className="text-primary hover:underline">Zásady ochrany osobných údajov</Link>
            </p>

            {/* Actions */}
            <div className="flex items-center justify-between pt-4">
              <Link 
                to="/cart" 
                className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Návrat do košíka
              </Link>
              
              <Button asChild variant="luxury" size="lg" className="min-w-[200px]">
                <Link to="/order-confirmation">Zadať objednávku</Link>
              </Button>
            </div>
          </div>

          {/* Right Column - Order Summary */}
          <div className="lg:sticky lg:top-8 h-fit">
            <div className="bg-card/50 backdrop-blur-sm border border-border/30 rounded-2xl p-6 space-y-6">
              <h2 className="text-xl font-display text-foreground">Zhrnutie objednávky</h2>
              
              {/* Product */}
              <div className="flex gap-4">
                <div className="relative">
                  <div className="w-16 h-16 rounded-lg overflow-hidden bg-muted">
                    <img 
                      src={orderItem.image} 
                      alt={orderItem.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <span className="absolute -top-2 -right-2 w-5 h-5 bg-primary text-primary-foreground text-xs rounded-full flex items-center justify-center font-medium">
                    1
                  </span>
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium text-foreground">{orderItem.name}</h3>
                      <p className="text-sm text-primary">{orderItem.price.toLocaleString('sk-SK')} €</p>
                    </div>
                    <span className="text-foreground font-medium">{orderItem.price.toLocaleString('sk-SK')} €</span>
                  </div>
                </div>
              </div>

              {/* Product Details */}
              <div className="space-y-1 text-sm border-t border-border/30 pt-4">
                {Object.entries(orderItem.details).map(([key, value]) => (
                  <div key={key} className="text-muted-foreground">
                    <span className="text-foreground/80">{key}:</span>{' '}
                    <span>{value}</span>
                  </div>
                ))}
              </div>

              {/* Coupon */}
              <div className="border-t border-border/30 pt-4">
                <button 
                  onClick={() => setShowCoupon(!showCoupon)}
                  className="flex items-center justify-between w-full text-foreground hover:text-primary transition-colors"
                >
                  <span>Pridať kupóny</span>
                  {showCoupon ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>
                
                {showCoupon && (
                  <div className="flex gap-2 mt-3">
                    <Input 
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      placeholder="Kód kupónu"
                      className="bg-background border-border/50 h-10 text-foreground placeholder:text-muted-foreground"
                    />
                    <Button variant="secondary" className="h-10 px-6">
                      Použiť
                    </Button>
                  </div>
                )}
              </div>

              {/* Totals */}
              <div className="border-t border-border/30 pt-4 space-y-3">
                <div className="flex justify-between text-muted-foreground">
                  <span>Medzisúčet</span>
                  <span>{subtotal.toLocaleString('sk-SK')} €</span>
                </div>
                <div className="flex justify-between text-lg font-display text-foreground">
                  <span>Cena spolu</span>
                  <span className="text-primary">{total.toLocaleString('sk-SK')} €</span>
                </div>
              </div>

              {/* Trust Badges */}
              <div className="flex items-center justify-center gap-6 pt-4 border-t border-border/30">
                <div className="flex items-center gap-2 text-muted-foreground text-xs">
                  <Lock className="w-4 h-4" />
                  <span>SSL šifrovanie</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground text-xs">
                  <Shield className="w-4 h-4" />
                  <span>Bezpečná platba</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Checkout;

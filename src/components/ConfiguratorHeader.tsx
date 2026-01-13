import { useState } from 'react';
import { Menu, X, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';

const ConfiguratorHeader = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { label: 'Domov', href: 'https://brelax.weboptim.eu/' },
    { label: 'Obchod', href: 'https://brelax.weboptim.eu/obchod/' },
    { label: 'O nás', href: 'https://brelax.weboptim.eu/o-nas/' },
    { label: 'FAQ', href: 'https://brelax.weboptim.eu/faq/' },
    { label: 'Kontakt', href: 'https://brelax.weboptim.eu/kontakt/' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass-dark">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a href="https://brelax.weboptim.eu/" className="flex items-center gap-2">
            <span className="text-2xl font-display font-semibold tracking-wider text-primary">
              LUXE<span className="text-foreground">SAUNA</span>
            </span>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-sm font-medium transition-colors duration-300 tracking-wide uppercase text-foreground/70 hover:text-primary"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-4">
            <a 
              href="https://brelax.weboptim.eu/kosik/" 
              className="relative p-2 text-foreground/70 hover:text-primary transition-colors"
            >
              <ShoppingCart className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-primary text-primary-foreground text-xs rounded-full flex items-center justify-center">
                0
              </span>
            </a>
            
            <a href="https://brelax.weboptim.eu/kontakt/">
              <Button variant="luxury" size="sm" className="hidden md:inline-flex">
                Dopyt
              </Button>
            </a>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden p-2 text-foreground/70 hover:text-primary transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="lg:hidden mt-4 pb-4 border-t border-border/30 pt-4">
            <div className="flex flex-col gap-4">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="text-sm font-medium text-foreground/70 hover:text-primary transition-colors duration-300 tracking-wide uppercase"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </a>
              ))}
              <a href="https://brelax.weboptim.eu/kontakt/" onClick={() => setIsMenuOpen(false)}>
                <Button variant="luxury" size="sm" className="mt-2 w-full">
                  Dopyt
                </Button>
              </a>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default ConfiguratorHeader;

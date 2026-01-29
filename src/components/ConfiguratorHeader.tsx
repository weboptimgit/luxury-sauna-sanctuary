import { useState } from 'react';
import { Menu, X, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';

const ConfiguratorHeader = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();

  // Base URL changes based on language
  const baseUrl = language === 'en' 
    ? 'https://brelax.weboptim.eu/en' 
    : 'https://brelax.weboptim.eu';

  const navItems = [
    { labelKey: 'nav.home', href: `${baseUrl}/`, external: true },
    { labelKey: 'nav.finnishSaunas', href: `${baseUrl}/k/finske-sauny/`, external: true },
    { labelKey: 'nav.infraSaunas', href: `${baseUrl}/k/infrasauny/`, external: true },
    { labelKey: 'nav.hotTubs', href: `${baseUrl}/k/kade/`, external: true },
    { labelKey: 'nav.accessories', href: `${baseUrl}/k/doplnky/`, external: true },
    { labelKey: 'nav.configurator', href: language === 'en' ? '/en/konfigurator' : '/konfigurator', external: false },
    { labelKey: 'nav.contact', href: `${baseUrl}/kontakt/`, external: true },
  ];

  const toggleLanguage = () => {
    setLanguage(language === 'sk' ? 'en' : 'sk');
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass-dark">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a href={`${baseUrl}/`} className="flex items-center gap-2">
            <span className="text-2xl font-display font-semibold tracking-wider text-primary">
              LUXE<span className="text-foreground">SAUNA</span>
            </span>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {navItems.map((item) => 
              item.external ? (
                <a
                  key={item.labelKey}
                  href={item.href}
                  className="text-sm font-medium transition-colors duration-300 tracking-wide uppercase text-foreground/70 hover:text-primary"
                >
                  {t(item.labelKey)}
                </a>
              ) : (
                <Link
                  key={item.labelKey}
                  to={item.href}
                  className="text-sm font-medium transition-colors duration-300 tracking-wide uppercase text-primary"
                >
                  {t(item.labelKey)}
                </Link>
              )
            )}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-4">
            {/* Language Toggle - Flag button */}
            <button
              onClick={toggleLanguage}
              className="flex items-center justify-center w-8 h-8 rounded-full overflow-hidden border-2 border-border/50 hover:border-primary/50 transition-all"
              title={language === 'sk' ? 'Switch to English' : 'Prepnúť na slovenčinu'}
            >
              {language === 'sk' ? (
                // UK Flag for switching to English
                <svg viewBox="0 0 60 30" className="w-full h-full">
                  <clipPath id="s">
                    <path d="M0,0 v30 h60 v-30 z"/>
                  </clipPath>
                  <clipPath id="t">
                    <path d="M30,15 h30 v15 z v15 h-30 z h-30 v-15 z v-15 h30 z"/>
                  </clipPath>
                  <g clipPath="url(#s)">
                    <path d="M0,0 v30 h60 v-30 z" fill="#012169"/>
                    <path d="M0,0 L60,30 M60,0 L0,30" stroke="#fff" strokeWidth="6"/>
                    <path d="M0,0 L60,30 M60,0 L0,30" clipPath="url(#t)" stroke="#C8102E" strokeWidth="4"/>
                    <path d="M30,0 v30 M0,15 h60" stroke="#fff" strokeWidth="10"/>
                    <path d="M30,0 v30 M0,15 h60" stroke="#C8102E" strokeWidth="6"/>
                  </g>
                </svg>
              ) : (
                // Slovak Flag for switching to Slovak
                <svg viewBox="0 0 900 600" className="w-full h-full">
                  <rect width="900" height="600" fill="#ee1c25"/>
                  <rect width="900" height="400" fill="#0b4ea2"/>
                  <rect width="900" height="200" fill="#fff"/>
                  <path d="M 200,140 h200 v260 c0,80 -100,120 -100,120 c0,0 -100,-40 -100,-120 z" fill="#fff"/>
                  <path d="M 215,155 h170 v230 c0,65 -85,100 -85,100 c0,0 -85,-35 -85,-100 z" fill="#ee1c25"/>
                  <path d="M 300,220 c-30,0 -55,25 -55,55 v30 h-25 v40 h25 v25 h40 v-25 h25 v-40 h-25 v-30 c0,-8 7,-15 15,-15 c8,0 15,7 15,15 v10 h40 v-10 c0,-30 -25,-55 -55,-55 z" fill="#0b4ea2"/>
                </svg>
              )}
            </button>

            <a 
              href={`${baseUrl}/kosik/`}
              className="relative p-2 text-foreground/70 hover:text-primary transition-colors"
            >
              <ShoppingCart className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-primary text-primary-foreground text-xs rounded-full flex items-center justify-center">
                0
              </span>
            </a>
            
            <a href={`${baseUrl}/kontakt/`}>
              <Button variant="luxury" size="sm" className="hidden md:inline-flex">
                {t('nav.inquiry')}
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
              {/* Language Toggle for Mobile */}
              <button
                onClick={() => {
                  toggleLanguage();
                  setIsMenuOpen(false);
                }}
                className="flex items-center gap-3 text-sm font-medium text-foreground/70 hover:text-primary transition-colors duration-300"
              >
                <span className="w-6 h-4 rounded overflow-hidden">
                  {language === 'sk' ? (
                    <svg viewBox="0 0 60 30" className="w-full h-full">
                      <clipPath id="s2">
                        <path d="M0,0 v30 h60 v-30 z"/>
                      </clipPath>
                      <clipPath id="t2">
                        <path d="M30,15 h30 v15 z v15 h-30 z h-30 v-15 z v-15 h30 z"/>
                      </clipPath>
                      <g clipPath="url(#s2)">
                        <path d="M0,0 v30 h60 v-30 z" fill="#012169"/>
                        <path d="M0,0 L60,30 M60,0 L0,30" stroke="#fff" strokeWidth="6"/>
                        <path d="M0,0 L60,30 M60,0 L0,30" clipPath="url(#t2)" stroke="#C8102E" strokeWidth="4"/>
                        <path d="M30,0 v30 M0,15 h60" stroke="#fff" strokeWidth="10"/>
                        <path d="M30,0 v30 M0,15 h60" stroke="#C8102E" strokeWidth="6"/>
                      </g>
                    </svg>
                  ) : (
                    <svg viewBox="0 0 900 600" className="w-full h-full">
                      <rect width="900" height="600" fill="#ee1c25"/>
                      <rect width="900" height="400" fill="#0b4ea2"/>
                      <rect width="900" height="200" fill="#fff"/>
                    </svg>
                  )}
                </span>
                {language === 'sk' ? 'English' : 'Slovensky'}
              </button>

              {navItems.map((item) => 
                item.external ? (
                  <a
                    key={item.labelKey}
                    href={item.href}
                    className="text-sm font-medium text-foreground/70 hover:text-primary transition-colors duration-300 tracking-wide uppercase"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {t(item.labelKey)}
                  </a>
                ) : (
                  <Link
                    key={item.labelKey}
                    to={item.href}
                    className="text-sm font-medium text-primary transition-colors duration-300 tracking-wide uppercase"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {t(item.labelKey)}
                  </Link>
                )
              )}
              <a href={`${baseUrl}/kontakt/`} onClick={() => setIsMenuOpen(false)}>
                <Button variant="luxury" size="sm" className="mt-2 w-full">
                  {t('nav.inquiry')}
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

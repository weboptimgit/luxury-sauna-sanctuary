import { useState } from "react";
import { Menu, X, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import flagUk from "@/assets/flag-uk.png";
import flagSk from "@/assets/flag-sk.png";
import flagHu from "@/assets/flag-hu.png";
import brelaxLogo from "@/assets/LuxuRelax-LOGO-text-gradient.png";

const currencies = ["EUR", "CZK", "HUF"] as const;

const ConfiguratorHeader = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { language, setLanguage, currency, setCurrency, t } = useLanguage();

  // Base URL changes based on language - .com for EN, .sk for SK, .hu for HU
  const baseUrl =
    language === "en"
      ? "https://www.luxurelax.com"
      : language === "hu"
        ? "https://www.luxurelax.hu"
        : "https://www.luxurelax.sk";

  const categoryMap = {
    sk: { prefix: "/k", saunas: "sauny", tubs: "kade" },
    en: { prefix: "/c", saunas: "saunas", tubs: "hottubs" },
    hu: { prefix: "/k", saunas: "szaunak", tubs: "dezsafurdok" },
  } as const;

  const { prefix, saunas, tubs } = categoryMap[language] || categoryMap.sk;

  const configuratorPath =
    language === "en" ? "/configurator" : language === "hu" ? "/konfigurator-hu" : "/konfigurator";

  const navItems = [
    { labelKey: "nav.finnishSaunas", href: `${baseUrl}${prefix}/${saunas}/`, external: true },
    { labelKey: "nav.hotTubs", href: `${baseUrl}${prefix}/${tubs}/`, external: true },
    { labelKey: "nav.configurator", href: language === "en" ? "/configurator" : "/konfigurator", external: false },
    { labelKey: "nav.blog", href: `${baseUrl}/blog/`, external: true },
    { labelKey: "nav.about", href: language === "en" ? `${baseUrl}/about-us/` : `${baseUrl}/o-nas/`, external: true },
    {
      labelKey: "nav.contact",
      href: language === "en" ? `${baseUrl}/contact/` : `${baseUrl}/kontakt/`,
      external: true,
    },
  ];

  const toggleLanguage = () => {
    setLanguage(language === "sk" ? "en" : "sk");
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass-dark">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between relative">
          {/* Logo */}
          <a href={`${baseUrl}/`} className="flex items-center">
            <img src={brelaxLogo} alt="LuxuRelax" className="w-[100px] h-auto" />
          </a>

          {/* Desktop Navigation - centered absolutely */}
          <nav className="hidden lg:flex items-center gap-8 absolute left-1/2 -translate-x-1/2">
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
              ),
            )}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-4">
            {/* Currency Toggle */}
            <div className="flex items-center gap-1">
              {currencies.map((cur) => (
                <button
                  key={cur}
                  onClick={() => setCurrency(cur)}
                  className={`text-xs font-medium px-1.5 py-0.5 rounded transition-colors ${
                    currency === cur ? "text-primary bg-primary/10" : "text-foreground/50 hover:text-foreground/80"
                  }`}
                >
                  {cur}
                </button>
              ))}
            </div>

            {/* Language Toggle */}
            <button
              onClick={toggleLanguage}
              className="flex items-center justify-center pl-4 border-l border-border/50 hover:opacity-80 transition-opacity"
              title={language === "sk" ? "Switch to English" : "Prepnúť na slovenčinu"}
            >
              <img
                src={language === "sk" ? flagUk : flagSk}
                alt={language === "sk" ? "English" : "Slovensky"}
                className="w-4 h-[11px] object-cover"
              />
            </button>

            {/* Cart - last item */}
            <a
              href={language === "en" ? `${baseUrl}/cart/` : `${baseUrl}/kosik/`}
              className="relative p-2 pl-4 border-l border-border/50 text-foreground/70 hover:text-primary transition-colors"
            >
              <ShoppingCart className="w-5 h-5" />
              <span className="absolute -top-1 right-0 w-4 h-4 bg-primary text-primary-foreground text-xs rounded-full flex items-center justify-center">
                0
              </span>
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
              {/* Currency Toggle for Mobile */}
              <div className="flex items-center gap-2">
                <span className="text-sm text-foreground/50">{t("nav.home") === "Domov" ? "Mena:" : "Currency:"}</span>
                {currencies.map((cur) => (
                  <button
                    key={cur}
                    onClick={() => setCurrency(cur)}
                    className={`text-sm font-medium px-2 py-1 rounded transition-colors ${
                      currency === cur ? "text-primary bg-primary/10" : "text-foreground/50 hover:text-foreground/80"
                    }`}
                  >
                    {cur}
                  </button>
                ))}
              </div>

              {/* Language Toggle for Mobile */}
              <button
                onClick={() => {
                  toggleLanguage();
                  setIsMenuOpen(false);
                }}
                className="flex items-center gap-3 text-sm font-medium text-foreground/70 hover:text-primary transition-colors duration-300"
              >
                <img
                  src={language === "sk" ? flagUk : flagSk}
                  alt={language === "sk" ? "English" : "Slovensky"}
                  className="w-6 h-4 object-cover"
                />
                {language === "sk" ? "English" : "Slovensky"}
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
                ),
              )}
              <a href={`${baseUrl}/kontakt/`} onClick={() => setIsMenuOpen(false)}>
                <Button variant="luxury" size="sm" className="mt-2 w-full">
                  {t("nav.inquiry")}
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

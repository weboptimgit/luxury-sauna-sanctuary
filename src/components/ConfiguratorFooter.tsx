import { Facebook, Instagram, Youtube, Mail, Phone, MapPin } from "lucide-react";
import brelaxLogo from "@/assets/LuxuRelax-LOGO-text-gradient.png";
import { useLanguage } from "@/contexts/LanguageContext";

const ConfiguratorFooter = () => {
  const { language, t } = useLanguage();
  const baseUrl = language === "en" ? "https://www.luxurelax.com" : "https://www.luxurelax.sk";

  const quickLinks = language === "en"
    ? [
        { label: t("footer.home"), href: `${baseUrl}/` },
        { label: t("footer.shop"), href: `${baseUrl}/shop/` },
        { label: t("footer.aboutUs"), href: `${baseUrl}/about-us/` },
        { label: t("footer.faq"), href: `${baseUrl}/faq/` },
        { label: t("footer.contact"), href: `${baseUrl}/contact/` },
      ]
    : [
        { label: t("footer.home"), href: `${baseUrl}/` },
        { label: t("footer.shop"), href: `${baseUrl}/obchod/` },
        { label: t("footer.aboutUs"), href: `${baseUrl}/o-nas/` },
        { label: t("footer.faq"), href: `${baseUrl}/faq/` },
        { label: t("footer.contact"), href: `${baseUrl}/kontakt/` },
      ];

  const productLinks = language === "en"
    ? [
        { label: t("footer.barrelSaunas"), href: `${baseUrl}/c/saunas/` },
        { label: t("footer.cubeSaunas"), href: `${baseUrl}/c/saunas/` },
        { label: t("footer.traditionalSaunas"), href: `${baseUrl}/c/saunas/` },
        { label: t("footer.hotTubs"), href: `${baseUrl}/c/hottubs/` },
        { label: t("footer.accessories"), href: `${baseUrl}/shop/` },
      ]
    : [
        { label: t("footer.barrelSaunas"), href: `${baseUrl}/k/sauny/` },
        { label: t("footer.cubeSaunas"), href: `${baseUrl}/k/sauny/` },
        { label: t("footer.traditionalSaunas"), href: `${baseUrl}/k/sauny/` },
        { label: t("footer.hotTubs"), href: `${baseUrl}/k/kade/` },
        { label: t("footer.accessories"), href: `${baseUrl}/obchod/` },
      ];

  const bottomLinks = language === "en"
    ? [
        { label: t("footer.privacy"), href: `${baseUrl}/privacy-policy/` },
        { label: t("footer.terms"), href: `${baseUrl}/terms-and-conditions/` },
        { label: t("footer.cookies"), href: `${baseUrl}/cookies/` },
      ]
    : [
        { label: t("footer.privacy"), href: `${baseUrl}/zasady-ochrany-sukromia/` },
        { label: t("footer.terms"), href: `${baseUrl}/obchodne-podmienky/` },
        { label: t("footer.cookies"), href: `${baseUrl}/cookies/` },
      ];

  return (
    <footer className="bg-secondary/30 pt-16 pb-8">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div>
            <a href={`${baseUrl}/`} className="flex items-center">
              <img src={brelaxLogo} alt="LuxuRelax" className="w-[100px] h-auto" />
            </a>
            <p className="text-muted-foreground text-sm mt-4 leading-relaxed">
              {t("footer.brand.description")}
            </p>
            <div className="flex gap-4 mt-6">
              <a
                href="https://www.facebook.com/luxurelax"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-card border border-border/30 hover:border-primary/50 hover:text-primary transition-all"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="https://www.instagram.com/luxurelax"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-card border border-border/30 hover:border-primary/50 hover:text-primary transition-all"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://www.youtube.com/@luxurelax"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-card border border-border/30 hover:border-primary/50 hover:text-primary transition-all"
              >
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display text-lg font-semibold mb-4">{t("footer.quickLinks")}</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-muted-foreground hover:text-primary transition-colors text-sm"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Products */}
          <div>
            <h4 className="font-display text-lg font-semibold mb-4">{t("footer.products")}</h4>
            <ul className="space-y-3">
              {productLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-muted-foreground hover:text-primary transition-colors text-sm"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display text-lg font-semibold mb-4">{t("footer.contactTitle")}</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-primary mt-1 shrink-0" />
                <span className="text-muted-foreground text-sm">
                  Liptovský Mikuláš
                  <br />
                  Slovensko
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-primary shrink-0" />
                <a
                  href="tel:+421000000000"
                  className="text-muted-foreground hover:text-primary transition-colors text-sm"
                >
                  +421 000 000 000
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-primary shrink-0" />
                <a
                  href="mailto:info@luxurelax.sk"
                  className="text-muted-foreground hover:text-primary transition-colors text-sm"
                >
                  info@luxurelax.sk
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-border/30">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-muted-foreground text-sm">{t("footer.copyright")}</p>
            <div className="flex gap-6">
              {bottomLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-muted-foreground hover:text-primary transition-colors text-sm"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default ConfiguratorFooter;

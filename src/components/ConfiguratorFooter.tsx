import { Facebook, Instagram, Youtube, Mail, Phone, MapPin } from "lucide-react";
import brelaxLogo from "@/assets/LuxuRelax-LOGO-text-gradient.png";

const ConfiguratorFooter = () => {
  return (
    <footer className="bg-secondary/30 pt-16 pb-8">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div>
            {/* Logo */}
            <a href={`${baseUrl}/`} className="flex items-center">
              <img src={brelaxLogo} alt="LuxuRelax" className="w-[100px] h-auto" />
            </a>
            <p className="text-muted-foreground text-sm mt-4 leading-relaxed">
              Premium Finnish saunas crafted with passion and delivered with excellence. Your wellness journey starts
              here.
            </p>
            <div className="flex gap-4 mt-6">
              <a
                href="#"
                className="p-2 rounded-full bg-card border border-border/30 hover:border-primary/50 hover:text-primary transition-all"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="p-2 rounded-full bg-card border border-border/30 hover:border-primary/50 hover:text-primary transition-all"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="p-2 rounded-full bg-card border border-border/30 hover:border-primary/50 hover:text-primary transition-all"
              >
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="https://brelax.weboptim.eu/"
                  className="text-muted-foreground hover:text-primary transition-colors text-sm"
                >
                  Domov
                </a>
              </li>
              <li>
                <a
                  href="https://brelax.weboptim.eu/obchod/"
                  className="text-muted-foreground hover:text-primary transition-colors text-sm"
                >
                  Obchod
                </a>
              </li>
              <li>
                <a
                  href="https://brelax.weboptim.eu/o-nas/"
                  className="text-muted-foreground hover:text-primary transition-colors text-sm"
                >
                  O nás
                </a>
              </li>
              <li>
                <a
                  href="https://brelax.weboptim.eu/faq/"
                  className="text-muted-foreground hover:text-primary transition-colors text-sm"
                >
                  FAQ
                </a>
              </li>
              <li>
                <a
                  href="https://brelax.weboptim.eu/kontakt/"
                  className="text-muted-foreground hover:text-primary transition-colors text-sm"
                >
                  Kontakt
                </a>
              </li>
            </ul>
          </div>

          {/* Products */}
          <div>
            <h4 className="font-display text-lg font-semibold mb-4">Produkty</h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="https://brelax.weboptim.eu/obchod/"
                  className="text-muted-foreground hover:text-primary transition-colors text-sm"
                >
                  Sudové sauny
                </a>
              </li>
              <li>
                <a
                  href="https://brelax.weboptim.eu/obchod/"
                  className="text-muted-foreground hover:text-primary transition-colors text-sm"
                >
                  Cube sauny
                </a>
              </li>
              <li>
                <a
                  href="https://brelax.weboptim.eu/obchod/"
                  className="text-muted-foreground hover:text-primary transition-colors text-sm"
                >
                  Tradičné kabíny
                </a>
              </li>
              <li>
                <a
                  href="https://brelax.weboptim.eu/obchod/"
                  className="text-muted-foreground hover:text-primary transition-colors text-sm"
                >
                  Vírivky
                </a>
              </li>
              <li>
                <a
                  href="https://brelax.weboptim.eu/obchod/"
                  className="text-muted-foreground hover:text-primary transition-colors text-sm"
                >
                  Príslušenstvo
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display text-lg font-semibold mb-4">Kontakt</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-primary mt-1 shrink-0" />
                <span className="text-muted-foreground text-sm">
                  123 Wellness Avenue
                  <br />
                  Helsinki, Finland 00100
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-primary shrink-0" />
                <a
                  href="tel:+358123456789"
                  className="text-muted-foreground hover:text-primary transition-colors text-sm"
                >
                  +358 123 456 789
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-primary shrink-0" />
                <a
                  href="mailto:info@luxesauna.com"
                  className="text-muted-foreground hover:text-primary transition-colors text-sm"
                >
                  info@luxesauna.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-border/30">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-muted-foreground text-sm">© 2024 LuxuRelax. All rights reserved.</p>
            <div className="flex gap-6">
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                Zásady ochrany súkromia
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                Obchodné podmienky
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                Cookies
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default ConfiguratorFooter;

import { Facebook, Instagram, Youtube, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-secondary/30 pt-16 pb-8">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div>
            <span className="text-2xl font-display font-semibold tracking-wider text-primary">
              LUXE<span className="text-foreground">SAUNA</span>
            </span>
            <p className="text-muted-foreground text-sm mt-4 leading-relaxed">
              Premium Finnish saunas crafted with passion and delivered with excellence. 
              Your wellness journey starts here.
            </p>
            <div className="flex gap-4 mt-6">
              <a href="#" className="p-2 rounded-full bg-card border border-border/30 hover:border-primary/50 hover:text-primary transition-all">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 rounded-full bg-card border border-border/30 hover:border-primary/50 hover:text-primary transition-all">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 rounded-full bg-card border border-border/30 hover:border-primary/50 hover:text-primary transition-all">
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-3">
              {['Home', 'Our Saunas', 'Custom Design', 'About Us', 'FAQ', 'Blog'].map((link) => (
                <li key={link}>
                  <a href="#" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Products */}
          <div>
            <h4 className="font-display text-lg font-semibold mb-4">Products</h4>
            <ul className="space-y-3">
              {['Barrel Saunas', 'Cube Saunas', 'Traditional Cabins', 'Indoor Saunas', 'Hot Tubs', 'Accessories'].map((link) => (
                <li key={link}>
                  <a href="#" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display text-lg font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-primary mt-1 shrink-0" />
                <span className="text-muted-foreground text-sm">
                  123 Wellness Avenue<br />
                  Helsinki, Finland 00100
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-primary shrink-0" />
                <a href="tel:+358123456789" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                  +358 123 456 789
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-primary shrink-0" />
                <a href="mailto:info@luxesauna.com" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                  info@luxesauna.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-border/30">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-muted-foreground text-sm">
              © 2024 LuxeSauna. All rights reserved.
            </p>
            <div className="flex gap-6">
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                Privacy Policy
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                Terms of Service
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

export default Footer;

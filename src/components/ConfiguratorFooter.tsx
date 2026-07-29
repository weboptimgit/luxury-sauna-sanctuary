import { Facebook, Instagram, Mail, Phone, MapPin } from "lucide-react";
import brelaxLogo from "@/assets/LuxuRelax-LOGO-text-gradient.png";
import { useLanguage } from "@/contexts/LanguageContext";
import { useSiteChrome } from "@/hooks/useSiteChrome";

const SocialIcon = ({ type }: { type: string }) => {
  const cls = "w-4 h-4";
  if (type === "facebook") return <Facebook className={cls} />;
  if (type === "instagram") return <Instagram className={cls} />;
  return <Mail className={cls} />;
};

const ConfiguratorFooter = () => {
  const { language, t } = useLanguage();
  const { chrome } = useSiteChrome(language);

  const baseUrl =
    language === "en"
      ? "https://www.luxurelax.com"
      : language === "hu"
        ? "https://www.luxurelax.hu"
        : "https://www.luxurelax.sk";

  const logoSrc = chrome?.logo || brelaxLogo;
  const homeHref = chrome?.home || `${baseUrl}/`;
  const about = chrome?.footer.about ?? t("footer.brand.description");
  const columns = chrome?.footer.columns ?? [];
  const contactTitle = chrome?.footer.contactTitle ?? t("footer.contactTitle");
  const contact = chrome?.footer.contact;
  const socials = chrome?.footer.socials ?? [];
  const copyright = chrome?.footer.copyright ?? t("footer.copyright");

  return (
    <footer className="bg-secondary/30 pt-16 pb-8">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div>
            <a href={homeHref} className="flex items-center">
              <img src={logoSrc} alt="LUXURELAX" className="w-[100px] h-auto" />
            </a>
            <p className="text-muted-foreground text-sm mt-4 leading-relaxed">{about}</p>
            <div className="flex gap-4 mt-6">
              {socials.map((s) => (
                <a
                  key={s.type + s.url}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-full bg-card border border-border/30 hover:border-primary/50 hover:text-primary transition-all"
                >
                  <SocialIcon type={s.type} />
                </a>
              ))}
            </div>
          </div>

          {/* Dynamic columns from WordPress footer menus */}
          {columns.map((col) => (
            <div key={col.title}>
              <h4 className="font-display text-lg font-semibold mb-4">{col.title}</h4>
              <ul className="space-y-3">
                {col.items.map((link) => (
                  <li key={link.label + link.url}>
                    <a
                      href={link.url}
                      className="text-muted-foreground hover:text-primary transition-colors text-sm"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contact */}
          {contact && (
            <div>
              <h4 className="font-display text-lg font-semibold mb-4">{contactTitle}</h4>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-primary mt-1 shrink-0" />
                  <span className="text-muted-foreground text-sm">
                    {contact.company}
                    <br />
                    {contact.street}
                    <br />
                    {contact.city}
                    <br />
                    {contact.ico && (
                      <>
                        IČO: {contact.ico}
                        <br />
                      </>
                    )}
                    
                    {contact.dic && (
                      <>
                        DIČ: {contact.dic}
                        <br />
                      </>
                    )}
                    
                    {contact.icDph && (
                      <>
                        IČ DPH: {contact.icDph}
                        <br />
                      </>
                    )}
                    
                    {contact.vatNote && <>{contact.vatNote}</>}
                  </span>
                </li>
                {contact.phone && (
                  <li className="flex items-center gap-3">
                    <Phone className="w-4 h-4 text-primary shrink-0" />
                    <a
                      href={`tel:${contact.phone.replace(/\s+/g, "")}`}
                      className="text-muted-foreground hover:text-primary transition-colors text-sm"
                    >
                      {contact.phone}
                    </a>
                  </li>
                )}
                {contact.email && (
                  <li className="flex items-center gap-3">
                    <Mail className="w-4 h-4 text-primary shrink-0" />
                    <a
                      href={`mailto:${contact.email}`}
                      className="text-muted-foreground hover:text-primary transition-colors text-sm"
                    >
                      {contact.email}
                    </a>
                  </li>
                )}
              </ul>
            </div>
          )}
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-border/30">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-muted-foreground text-sm">{copyright}</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default ConfiguratorFooter;

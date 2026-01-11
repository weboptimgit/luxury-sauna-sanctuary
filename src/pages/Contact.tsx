import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MapPin, Phone, Mail, Clock, Send, Sparkles } from "lucide-react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const contactInfo = [
    {
      icon: MapPin,
      title: "Adresa",
      details: ["Hlavná 123", "831 01 Bratislava", "Slovensko"],
    },
    {
      icon: Phone,
      title: "Telefón",
      details: ["+421 900 123 456", "+421 2 1234 5678"],
    },
    {
      icon: Mail,
      title: "Email",
      details: ["info@luxurysauna.sk", "objednavky@luxurysauna.sk"],
    },
    {
      icon: Clock,
      title: "Otváracie hodiny",
      details: ["Po - Pi: 9:00 - 18:00", "So: 10:00 - 14:00", "Ne: Zatvorené"],
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-8">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">Sme tu pre vás</span>
          </div>
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
            Kontaktujte <span className="text-gradient-amber">Nás</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Máte otázky ohľadom našich saún? Radi vám pomôžeme s výberom tej správnej pre vás.
          </p>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
            {/* Contact Form */}
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 via-accent/20 to-primary/20 rounded-3xl blur-xl opacity-50" />
              <div className="relative bg-card/80 backdrop-blur-xl rounded-2xl p-8 md:p-10 border border-primary/10 shadow-2xl">
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Send className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h2 className="font-display text-2xl font-bold text-foreground">
                      Napíšte nám
                    </h2>
                    <p className="text-sm text-muted-foreground">Odpovieme do 24 hodín</p>
                  </div>
                </div>
                
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-foreground">
                        Meno a priezvisko <span className="text-primary">*</span>
                      </label>
                      <Input
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="h-12 bg-background/50 border-border/50 text-foreground placeholder:text-muted-foreground/50 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                        placeholder="Ján Novák"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-foreground">
                        Email <span className="text-primary">*</span>
                      </label>
                      <Input
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="h-12 bg-background/50 border-border/50 text-foreground placeholder:text-muted-foreground/50 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                        placeholder="jan@email.sk"
                      />
                    </div>
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-foreground">
                        Telefón
                      </label>
                      <Input
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="h-12 bg-background/50 border-border/50 text-foreground placeholder:text-muted-foreground/50 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                        placeholder="+421 900 000 000"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-foreground">
                        Predmet
                      </label>
                      <Input
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        className="h-12 bg-background/50 border-border/50 text-foreground placeholder:text-muted-foreground/50 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                        placeholder="Dopyt na cenu"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-foreground">
                      Správa <span className="text-primary">*</span>
                    </label>
                    <Textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      className="bg-background/50 border-border/50 text-foreground placeholder:text-muted-foreground/50 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all resize-none"
                      placeholder="Napíšte nám vašu správu..."
                    />
                  </div>
                  <Button type="submit" className="w-full h-12 text-base font-semibold" variant="luxury">
                    <Send className="w-4 h-4 mr-2" />
                    Odoslať správu
                  </Button>
                </form>
              </div>
            </div>

            {/* Contact Info */}
            <div className="space-y-8">
              <div>
                <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-3">
                  Kontaktné údaje
                </h2>
                <p className="text-muted-foreground mb-8">
                  Navštívte nás v showroome alebo nás kontaktujte online.
                </p>
                <div className="grid gap-4">
                  {contactInfo.map((item, index) => (
                    <div
                      key={index}
                      className="group flex items-start gap-4 p-5 bg-card/50 rounded-xl border border-border/30 hover:border-primary/30 hover:bg-card/80 transition-all duration-300"
                    >
                      <div className="w-12 h-12 shrink-0 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center group-hover:from-primary/30 group-hover:to-accent/30 transition-all">
                        <item.icon className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground mb-1">{item.title}</h3>
                        {item.details.map((detail, i) => (
                          <p key={i} className="text-muted-foreground text-sm leading-relaxed">
                            {detail}
                          </p>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Map Placeholder */}
              <div className="relative group overflow-hidden rounded-2xl">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5" />
                <div className="relative bg-card/30 backdrop-blur-sm p-8 h-56 flex items-center justify-center border border-border/30 group-hover:border-primary/20 transition-all">
                  <div className="text-center">
                    <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                      <MapPin className="w-7 h-7 text-primary" />
                    </div>
                    <p className="text-foreground font-medium mb-1">Interaktívna mapa</p>
                    <p className="text-sm text-muted-foreground">Bratislava, Slovensko</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;

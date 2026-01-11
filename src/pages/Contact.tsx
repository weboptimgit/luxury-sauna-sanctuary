import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MapPin, Phone, Mail, Clock, Send } from "lucide-react";

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
    // Handle form submission
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
      <section className="pt-32 pb-16 bg-gradient-to-b from-charcoal-900 to-background">
        <div className="container mx-auto px-4 text-center">
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
            Kontaktujte <span className="text-gradient">Nás</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Máte otázky ohľadom našich saún? Radi vám pomôžeme s výberom tej správnej pre vás.
          </p>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Contact Form */}
            <div className="bg-charcoal-800/50 backdrop-blur-sm rounded-2xl p-8 border border-amber-500/10">
              <h2 className="font-display text-2xl font-bold text-foreground mb-6">
                Napíšte nám
              </h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-muted-foreground mb-2">
                      Meno a priezvisko *
                    </label>
                    <Input
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="bg-charcoal-900/50 border-amber-500/20 focus:border-amber-500"
                      placeholder="Ján Novák"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-muted-foreground mb-2">
                      Email *
                    </label>
                    <Input
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="bg-charcoal-900/50 border-amber-500/20 focus:border-amber-500"
                      placeholder="jan@email.sk"
                    />
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-muted-foreground mb-2">
                      Telefón
                    </label>
                    <Input
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="bg-charcoal-900/50 border-amber-500/20 focus:border-amber-500"
                      placeholder="+421 900 000 000"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-muted-foreground mb-2">
                      Predmet
                    </label>
                    <Input
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className="bg-charcoal-900/50 border-amber-500/20 focus:border-amber-500"
                      placeholder="Dopyt na cenu"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-muted-foreground mb-2">
                    Správa *
                  </label>
                  <Textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="bg-charcoal-900/50 border-amber-500/20 focus:border-amber-500 resize-none"
                    placeholder="Vaša správa..."
                  />
                </div>
                <Button type="submit" className="w-full" variant="luxury">
                  <Send className="w-4 h-4 mr-2" />
                  Odoslať správu
                </Button>
              </form>
            </div>

            {/* Contact Info */}
            <div className="space-y-8">
              <div>
                <h2 className="font-display text-2xl font-bold text-foreground mb-6">
                  Kontaktné údaje
                </h2>
                <div className="grid sm:grid-cols-2 gap-6">
                  {contactInfo.map((item, index) => (
                    <div
                      key={index}
                      className="bg-charcoal-800/30 rounded-xl p-6 border border-amber-500/10 hover:border-amber-500/30 transition-colors"
                    >
                      <div className="w-12 h-12 rounded-lg bg-amber-500/10 flex items-center justify-center mb-4">
                        <item.icon className="w-6 h-6 text-amber-400" />
                      </div>
                      <h3 className="font-semibold text-foreground mb-2">{item.title}</h3>
                      {item.details.map((detail, i) => (
                        <p key={i} className="text-muted-foreground text-sm">
                          {detail}
                        </p>
                      ))}
                    </div>
                  ))}
                </div>
              </div>

              {/* Map Placeholder */}
              <div className="bg-charcoal-800/30 rounded-2xl p-8 border border-amber-500/10 h-64 flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="w-12 h-12 text-amber-400 mx-auto mb-4" />
                  <p className="text-muted-foreground">Interaktívna mapa</p>
                  <p className="text-sm text-muted-foreground/70">Bratislava, Slovensko</p>
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

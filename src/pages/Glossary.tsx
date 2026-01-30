import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { glossaryTerms } from '@/data/glossary';
import { BookOpen, ArrowRight } from 'lucide-react';

const Glossary = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-6">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full text-primary text-sm font-medium mb-6">
              <BookOpen className="w-4 h-4" />
              Vzdelávanie
            </div>
            <h1 className="text-4xl md:text-5xl font-display font-semibold text-foreground mb-6">
              Slovník <span className="text-primary">pojmov</span>
            </h1>
            <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
              Objavte svet saún a wellness. Náš slovník vám pomôže pochopiť všetky dôležité termíny 
              a pojmy súvisiace so saunovaním.
            </p>
          </div>

          {/* Terms Grid */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {glossaryTerms.map((term) => (
              <Link
                key={term.id}
                to={`/slovnik/${term.id}`}
                className="group glass-dark rounded-2xl p-6 transition-all duration-300 hover:bg-primary/5 hover:border-primary/30 border border-border/30"
              >
                <h2 className="text-xl font-display font-semibold text-foreground mb-3 group-hover:text-primary transition-colors">
                  {term.term}
                </h2>
                <p className="text-foreground/70 text-sm line-clamp-3 mb-4">
                  {term.definition}
                </p>
                <div className="flex items-center gap-2 text-primary text-sm font-medium">
                  Čítať viac
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>

          {/* Info Section */}
          <div className="mt-16 text-center">
            <div className="glass-dark rounded-2xl p-8 max-w-2xl mx-auto border border-border/30">
              <h3 className="text-xl font-display font-semibold text-foreground mb-4">
                Nenašli ste čo ste hľadali?
              </h3>
              <p className="text-foreground/70 mb-6">
                Kontaktujte nás a radi vám vysvetlíme akékoľvek otázky týkajúce sa saún a wellness.
              </p>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-full font-medium hover:bg-primary/90 transition-colors"
              >
                Kontaktujte nás
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Glossary;

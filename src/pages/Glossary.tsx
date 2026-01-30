import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { glossaryTerms } from '@/data/glossary';
import { BookOpen, ArrowRight } from 'lucide-react';

const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

const Glossary = () => {
  const [activeLetter, setActiveLetter] = useState<string | null>(null);

  // Get available letters (letters that have terms)
  const availableLetters = useMemo(() => {
    const letters = new Set(
      glossaryTerms.map(term => term.term.charAt(0).toUpperCase())
    );
    return letters;
  }, []);

  // Filter terms based on selected letter
  const filteredTerms = useMemo(() => {
    if (!activeLetter) return glossaryTerms;
    return glossaryTerms.filter(
      term => term.term.charAt(0).toUpperCase() === activeLetter
    );
  }, [activeLetter]);

  // Sort terms alphabetically
  const sortedTerms = useMemo(() => {
    return [...filteredTerms].sort((a, b) => a.term.localeCompare(b.term, 'sk'));
  }, [filteredTerms]);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-6">
          {/* Hero Section */}
          <div className="text-center mb-12">
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

          {/* A-Z Filter */}
          <div className="mb-10">
            <div className="flex flex-wrap justify-center gap-1 sm:gap-2">
              <button
                onClick={() => setActiveLetter(null)}
                className={`w-9 h-9 rounded-lg text-sm font-medium transition-all duration-200 ${
                  activeLetter === null
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted/50 text-foreground/70 hover:bg-primary/20 hover:text-foreground'
                }`}
              >
                Vše
              </button>
              {ALPHABET.map(letter => {
                const hasTerms = availableLetters.has(letter);
                return (
                  <button
                    key={letter}
                    onClick={() => hasTerms && setActiveLetter(letter)}
                    disabled={!hasTerms}
                    className={`w-9 h-9 rounded-lg text-sm font-medium transition-all duration-200 ${
                      activeLetter === letter
                        ? 'bg-primary text-primary-foreground'
                        : hasTerms
                        ? 'bg-muted/50 text-foreground/70 hover:bg-primary/20 hover:text-foreground'
                        : 'bg-muted/20 text-foreground/30 cursor-not-allowed'
                    }`}
                  >
                    {letter}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Terms List */}
          <div className="max-w-3xl mx-auto space-y-4">
            {sortedTerms.length === 0 ? (
              <div className="text-center py-12 text-foreground/60">
                Žiadne pojmy pre toto písmeno.
              </div>
            ) : (
              sortedTerms.map((term) => (
                <Link
                  key={term.id}
                  to={`/slovnik/${term.id}`}
                  className="group block glass-dark rounded-2xl p-6 transition-all duration-300 hover:bg-primary/5 hover:border-primary/30 border border-border/30"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <h2 className="text-xl font-display font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                        {term.term}
                      </h2>
                      <p className="text-foreground/70 text-sm line-clamp-2">
                        {term.definition}
                      </p>
                    </div>
                    <div className="flex-shrink-0 mt-1">
                      <ArrowRight className="w-5 h-5 text-primary opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                    </div>
                  </div>
                </Link>
              ))
            )}
          </div>

          {/* Results count */}
          <div className="text-center mt-8 text-sm text-foreground/50">
            {sortedTerms.length} {sortedTerms.length === 1 ? 'pojem' : sortedTerms.length < 5 ? 'pojmy' : 'pojmov'}
            {activeLetter && ` na písmeno "${activeLetter}"`}
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

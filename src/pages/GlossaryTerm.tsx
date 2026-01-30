import { useParams, Link, Navigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { getTermById, getRelatedTerms } from '@/data/glossary';
import { BookOpen, ArrowLeft, ArrowRight } from 'lucide-react';

const GlossaryTerm = () => {
  const { id } = useParams<{ id: string }>();
  const term = id ? getTermById(id) : undefined;

  if (!term) {
    return <Navigate to="/slovnik" replace />;
  }

  const relatedTerms = term.relatedTerms ? getRelatedTerms(term.relatedTerms) : [];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-6">
          {/* Breadcrumb */}
          <nav className="mb-8">
            <Link
              to="/slovnik"
              className="inline-flex items-center gap-2 text-foreground/60 hover:text-primary transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Späť na slovník pojmov
            </Link>
          </nav>

          {/* Main Content */}
          <article className="max-w-3xl mx-auto">
            <div className="mb-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full text-primary text-sm font-medium mb-6">
                <BookOpen className="w-4 h-4" />
                Slovník pojmov
              </div>
              <h1 className="text-4xl md:text-5xl font-display font-semibold text-foreground mb-6">
                {term.term}
              </h1>
            </div>

            <div className="glass-dark rounded-2xl p-8 border border-border/30 mb-8">
              <p className="text-lg text-foreground/80 leading-relaxed">
                {term.definition}
              </p>
            </div>

            {/* Related Terms */}
            {relatedTerms.length > 0 && (
              <div className="mt-12">
                <h2 className="text-2xl font-display font-semibold text-foreground mb-6">
                  Súvisiace pojmy
                </h2>
                <div className="grid gap-4 md:grid-cols-2">
                  {relatedTerms.map((relatedTerm) => (
                    <Link
                      key={relatedTerm.id}
                      to={`/slovnik/${relatedTerm.id}`}
                      className="group glass-dark rounded-xl p-5 transition-all duration-300 hover:bg-primary/5 hover:border-primary/30 border border-border/30"
                    >
                      <h3 className="text-lg font-display font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                        {relatedTerm.term}
                      </h3>
                      <p className="text-foreground/70 text-sm line-clamp-2">
                        {relatedTerm.definition}
                      </p>
                      <div className="flex items-center gap-2 text-primary text-sm font-medium mt-3">
                        Čítať viac
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* CTA */}
            <div className="mt-12 text-center">
              <div className="glass-dark rounded-2xl p-8 border border-border/30">
                <h3 className="text-xl font-display font-semibold text-foreground mb-4">
                  Máte záujem o saunu?
                </h3>
                <p className="text-foreground/70 mb-6">
                  Nakonfigurujte si vlastnú saunu presne podľa vašich predstáv alebo nás kontaktujte pre individuálnu konzultáciu.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link
                    to="/konfigurator"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-full font-medium hover:bg-primary/90 transition-colors"
                  >
                    Konfigurátor
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                  <Link
                    to="/contact"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-border/50 text-foreground rounded-full font-medium hover:bg-primary/10 transition-colors"
                  >
                    Kontakt
                  </Link>
                </div>
              </div>
            </div>
          </article>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default GlossaryTerm;

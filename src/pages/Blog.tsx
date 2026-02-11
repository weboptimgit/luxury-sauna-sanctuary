import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, ArrowRight } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { blogPosts, blogCategories } from '@/data/blogPosts';
import { useDocumentMeta } from '@/hooks/useDocumentMeta';

const Blog = () => {
  const [activeCategory, setActiveCategory] = useState('all');

  useDocumentMeta(
    'B-Relax | Blog',
    'Články o saunovaní, wellness, údržbe saún a novinky zo sveta B-Relax.'
  );

  const filteredPosts = activeCategory === 'all'
    ? blogPosts
    : blogPosts.filter(p => p.category === activeCategory);

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('sk-SK', { day: 'numeric', month: 'long', year: 'numeric' });
  };

  const featuredPost = blogPosts[0];
  const otherPosts = filteredPosts.filter(p => activeCategory !== 'all' || p.id !== featuredPost.id);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        {/* Hero */}
        <section className="pt-32 pb-16 px-6">
          <div className="container mx-auto max-w-5xl text-center">
            <span className="text-primary text-sm font-medium tracking-widest uppercase">Blog</span>
            <h1 className="text-4xl md:text-5xl font-display font-bold mt-3 mb-4">
              Svet <span className="text-gradient-amber">saún a wellness</span>
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Tipy, rady a novinky zo sveta saunovania. Naučte sa, ako si vybrať správnu saunu,
              ako sa o ňu starať a ako z nej vyťažiť maximum pre vaše zdravie.
            </p>
          </div>
        </section>

        {/* Category Filter */}
        <section className="px-6 pb-8">
          <div className="container mx-auto max-w-5xl">
            <div className="flex flex-wrap gap-2 justify-center">
              {blogCategories.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-4 py-2 text-sm font-medium tracking-wide uppercase transition-all duration-300 border ${
                    activeCategory === cat.id
                      ? 'border-primary bg-primary/10 text-primary'
                      : 'border-border/50 text-muted-foreground hover:border-primary/50 hover:text-foreground'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Post */}
        {activeCategory === 'all' && (
          <section className="px-6 pb-12">
            <div className="container mx-auto max-w-5xl">
              <Link
                to={`/blog/${featuredPost.id}`}
                className="group block bg-gradient-card border border-border/30 hover:border-primary/30 transition-all duration-500 overflow-hidden"
              >
                <div className="grid md:grid-cols-2 gap-0">
                  <div className="aspect-[4/3] md:aspect-auto bg-secondary/50 overflow-hidden">
                    <img
                      src={featuredPost.image}
                      alt={featuredPost.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                  <div className="p-8 md:p-10 flex flex-col justify-center">
                    <span className="text-primary text-xs font-medium tracking-widest uppercase mb-3">
                      {blogCategories.find(c => c.id === featuredPost.category)?.label}
                    </span>
                    <h2 className="text-2xl md:text-3xl font-display font-bold mb-4 group-hover:text-primary transition-colors">
                      {featuredPost.title}
                    </h2>
                    <p className="text-muted-foreground mb-6 leading-relaxed">
                      {featuredPost.excerpt}
                    </p>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1.5">
                        <Calendar className="w-4 h-4" />
                        {formatDate(featuredPost.date)}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Clock className="w-4 h-4" />
                        {featuredPost.readTime} min čítania
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          </section>
        )}

        {/* Posts Grid */}
        <section className="px-6 pb-20">
          <div className="container mx-auto max-w-5xl">
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {otherPosts.map(post => (
                <Link
                  key={post.id}
                  to={`/blog/${post.id}`}
                  className="group bg-gradient-card border border-border/30 hover:border-primary/30 transition-all duration-500 overflow-hidden flex flex-col"
                >
                  <div className="aspect-[16/10] bg-secondary/50 overflow-hidden">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                  <div className="p-6 flex flex-col flex-1">
                    <span className="text-primary text-xs font-medium tracking-widest uppercase mb-2">
                      {blogCategories.find(c => c.id === post.category)?.label}
                    </span>
                    <h3 className="text-lg font-display font-semibold mb-2 group-hover:text-primary transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-muted-foreground text-sm mb-4 leading-relaxed line-clamp-3 flex-1">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5" />
                        {formatDate(post.date)}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5" />
                        {post.readTime} min
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {filteredPosts.length === 0 && (
              <div className="text-center py-16">
                <p className="text-muted-foreground">V tejto kategórii zatiaľ nemáme žiadne články.</p>
              </div>
            )}
          </div>
        </section>

        {/* CTA */}
        <section className="px-6 pb-20">
          <div className="container mx-auto max-w-3xl text-center bg-gradient-card border border-border/30 p-10">
            <h2 className="text-2xl font-display font-bold mb-3">Máte otázky o saunách?</h2>
            <p className="text-muted-foreground mb-6">
              Radi vám poradíme s výberom sauny a zodpovieme všetky vaše otázky.
            </p>
            <Link to="/contact">
              <Button variant="luxury" size="lg">
                Kontaktujte nás
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Blog;

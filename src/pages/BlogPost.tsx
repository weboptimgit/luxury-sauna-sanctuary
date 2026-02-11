import { useParams, Link, Navigate } from 'react-router-dom';
import { Calendar, Clock, ArrowLeft, ArrowRight } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { blogPosts, blogCategories } from '@/data/blogPosts';
import { useDocumentMeta } from '@/hooks/useDocumentMeta';

const BlogPost = () => {
  const { id } = useParams<{ id: string }>();
  const post = blogPosts.find(p => p.id === id);

  useDocumentMeta(
    post ? `B-Relax | ${post.title}` : 'B-Relax | Blog',
    post?.excerpt
  );

  if (!post) return <Navigate to="/blog" replace />;

  const currentIndex = blogPosts.findIndex(p => p.id === id);
  const prevPost = currentIndex > 0 ? blogPosts[currentIndex - 1] : null;
  const nextPost = currentIndex < blogPosts.length - 1 ? blogPosts[currentIndex + 1] : null;

  const relatedPosts = blogPosts
    .filter(p => p.id !== post.id && p.category === post.category)
    .slice(0, 3);

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('sk-SK', { day: 'numeric', month: 'long', year: 'numeric' });
  };

  // Simple markdown-like rendering
  const renderContent = (content: string) => {
    return content.split('\n\n').map((block, i) => {
      if (block.startsWith('## ')) {
        return <h2 key={i} className="text-xl font-display font-bold mt-8 mb-4 text-foreground">{block.replace('## ', '')}</h2>;
      }
      if (block.startsWith('### ')) {
        return <h3 key={i} className="text-lg font-display font-semibold mt-6 mb-3 text-foreground">{block.replace('### ', '')}</h3>;
      }
      if (block.startsWith('| ')) {
        const rows = block.split('\n').filter(r => !r.match(/^\|[\s-|]+\|$/));
        return (
          <div key={i} className="overflow-x-auto my-6">
            <table className="w-full text-sm border border-border/30">
              <tbody>
                {rows.map((row, ri) => (
                  <tr key={ri} className={ri === 0 ? 'bg-secondary/50 font-semibold' : 'border-t border-border/20'}>
                    {row.split('|').filter(Boolean).map((cell, ci) => (
                      <td key={ci} className="px-4 py-2">{cell.trim()}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      }
      if (block.match(/^\d+\.\s/)) {
        const items = block.split('\n').filter(Boolean);
        return (
          <ol key={i} className="list-decimal list-inside space-y-2 my-4 text-muted-foreground">
            {items.map((item, j) => (
              <li key={j} className="leading-relaxed" dangerouslySetInnerHTML={{
                __html: item.replace(/^\d+\.\s/, '').replace(/\*\*(.*?)\*\*/g, '<strong class="text-foreground">$1</strong>')
              }} />
            ))}
          </ol>
        );
      }
      if (block.startsWith('- ')) {
        const items = block.split('\n').filter(Boolean);
        return (
          <ul key={i} className="space-y-2 my-4 text-muted-foreground">
            {items.map((item, j) => (
              <li key={j} className="flex gap-2 leading-relaxed">
                <span className="text-primary mt-1">•</span>
                <span dangerouslySetInnerHTML={{
                  __html: item.replace(/^- /, '').replace(/\*\*(.*?)\*\*/g, '<strong class="text-foreground">$1</strong>')
                }} />
              </li>
            ))}
          </ul>
        );
      }
      return (
        <p key={i} className="text-muted-foreground leading-relaxed my-4" dangerouslySetInnerHTML={{
          __html: block.replace(/\*\*(.*?)\*\*/g, '<strong class="text-foreground">$1</strong>')
        }} />
      );
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        {/* Hero */}
        <section className="pt-32 pb-8 px-6">
          <div className="container mx-auto max-w-3xl">
            <Link to="/blog" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-6">
              <ArrowLeft className="w-4 h-4" />
              Späť na blog
            </Link>
            <span className="text-primary text-xs font-medium tracking-widest uppercase block mb-3">
              {blogCategories.find(c => c.id === post.category)?.label}
            </span>
            <h1 className="text-3xl md:text-4xl font-display font-bold mb-4">{post.title}</h1>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4" />
                {formatDate(post.date)}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-4 h-4" />
                {post.readTime} min čítania
              </span>
            </div>
          </div>
        </section>

        {/* Content */}
        <section className="px-6 pb-12">
          <div className="container mx-auto max-w-3xl">
            <div className="aspect-[2/1] bg-secondary/50 overflow-hidden mb-8 border border-border/20">
              <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
            </div>
            <article className="prose-custom">
              {renderContent(post.content)}
            </article>
          </div>
        </section>

        {/* Prev/Next */}
        <section className="px-6 pb-12">
          <div className="container mx-auto max-w-3xl">
            <div className="grid grid-cols-2 gap-4 border-t border-border/30 pt-8">
              {prevPost ? (
                <Link to={`/blog/${prevPost.id}`} className="group text-left">
                  <span className="text-xs text-muted-foreground flex items-center gap-1 mb-1">
                    <ArrowLeft className="w-3 h-3" /> Predchádzajúci
                  </span>
                  <span className="text-sm font-medium group-hover:text-primary transition-colors line-clamp-2">
                    {prevPost.title}
                  </span>
                </Link>
              ) : <div />}
              {nextPost ? (
                <Link to={`/blog/${nextPost.id}`} className="group text-right">
                  <span className="text-xs text-muted-foreground flex items-center gap-1 justify-end mb-1">
                    Nasledujúci <ArrowRight className="w-3 h-3" />
                  </span>
                  <span className="text-sm font-medium group-hover:text-primary transition-colors line-clamp-2">
                    {nextPost.title}
                  </span>
                </Link>
              ) : <div />}
            </div>
          </div>
        </section>

        {/* Related */}
        {relatedPosts.length > 0 && (
          <section className="px-6 pb-20">
            <div className="container mx-auto max-w-5xl">
              <h2 className="text-2xl font-display font-bold mb-8 text-center">Súvisiace články</h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {relatedPosts.map(rp => (
                  <Link
                    key={rp.id}
                    to={`/blog/${rp.id}`}
                    className="group bg-gradient-card border border-border/30 hover:border-primary/30 transition-all duration-500 overflow-hidden"
                  >
                    <div className="aspect-[16/10] bg-secondary/50 overflow-hidden">
                      <img src={rp.image} alt={rp.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                    </div>
                    <div className="p-5">
                      <h3 className="font-display font-semibold group-hover:text-primary transition-colors line-clamp-2 mb-2">{rp.title}</h3>
                      <span className="text-xs text-muted-foreground">{formatDate(rp.date)}</span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default BlogPost;

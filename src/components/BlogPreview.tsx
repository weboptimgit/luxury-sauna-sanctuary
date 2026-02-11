import { Link } from 'react-router-dom';
import { Calendar, Clock, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { blogPosts } from '@/data/blogPosts';

const BlogPreview = () => {
  const latestPosts = blogPosts.slice(0, 3);

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('sk-SK', { day: 'numeric', month: 'long', year: 'numeric' });
  };

  return (
    <section className="py-20 px-6">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="text-primary text-sm font-medium tracking-widest uppercase">Blog</span>
          <h2 className="text-3xl md:text-4xl font-display font-bold mt-3 mb-4">
            Najnovšie <span className="text-gradient-amber">články</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Tipy, rady a novinky zo sveta saunovania a wellness.
          </p>
        </div>

        {/* Posts */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {latestPosts.map(post => (
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
                  loading="lazy"
                />
              </div>
              <div className="p-6 flex flex-col flex-1">
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

        {/* CTA */}
        <div className="text-center">
          <Link to="/blog">
            <Button variant="luxuryOutline" size="lg">
              Všetky články
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default BlogPreview;

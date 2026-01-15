import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Features from '@/components/Features';
import About from '@/components/About';
import Products from '@/components/Products';
import CustomSaunas from '@/components/CustomSaunas';
import ConfiguratorCTA from '@/components/ConfiguratorCTA';
import Wellness from '@/components/Wellness';
import FAQ from '@/components/FAQ';
import CTA from '@/components/CTA';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <Features />
        <About />
        <Products />
        <CustomSaunas />
        <ConfiguratorCTA />
        <Wellness />
        <FAQ />
        <CTA />
      </main>
      <Footer />
    </div>
  );
};

export default Index;

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const faqs = [
  {
    question: 'What is the delivery time for a sauna?',
    answer:
      'Standard saunas typically ship within 4-6 weeks. Custom saunas require 8-12 weeks for design, manufacturing, and delivery. We\'ll provide a detailed timeline during consultation.',
  },
  {
    question: 'Do you offer installation services?',
    answer:
      'Yes, professional installation is included with every purchase. Our certified technicians ensure your sauna is properly set up, tested, and ready to use.',
  },
  {
    question: 'What maintenance does a sauna require?',
    answer:
      'Our saunas require minimal maintenance. We recommend wiping down benches after use, ensuring proper ventilation, and annual inspection of heating elements. We provide a complete care guide with every purchase.',
  },
  {
    question: 'Can I customize the size and features?',
    answer:
      'Absolutely! Our custom sauna service allows you to specify exact dimensions, wood type, heating system, lighting, and additional features like chromotherapy or sound systems.',
  },
  {
    question: 'What warranty do you offer?',
    answer:
      'All our saunas come with a comprehensive 10-year structural warranty and 5-year warranty on heating elements. Extended warranty options are available.',
  },
  {
    question: 'Do you offer financing options?',
    answer:
      'Yes, we partner with leading financing providers to offer flexible payment plans. Contact us to discuss options that fit your budget.',
  },
];

const FAQ = () => {
  return (
    <section id="faq" className="py-24 bg-secondary/20">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16">
          {/* Header */}
          <div>
            <p className="text-primary font-medium tracking-[0.2em] uppercase text-sm mb-4">
              Questions & Answers
            </p>
            <h2 className="font-display text-4xl md:text-5xl font-light mb-6 leading-tight">
              We Have Answers
              <span className="block text-gradient-amber font-semibold">For Everything</span>
            </h2>
            <p className="text-muted-foreground">
              Find answers to common questions about our saunas, delivery, installation, and more. 
              Can't find what you're looking for? Our team is always here to help.
            </p>
          </div>

          {/* Accordion */}
          <div>
            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className="bg-card border border-border/30 rounded-lg px-6 data-[state=open]:border-primary/30"
                >
                  <AccordionTrigger className="text-left font-display text-lg hover:text-primary hover:no-underline">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground leading-relaxed">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;

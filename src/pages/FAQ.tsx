import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { HelpCircle, MessageCircle } from "lucide-react";

const faqCategories = [
  {
    category: "Všeobecné otázky",
    questions: [
      {
        question: "Aké typy saún ponúkate?",
        answer: "Ponúkame širokú škálu saún vrátane tradičných fínskych saún, moderných sudových saún, luxusných kubických saún, infrasaún a vonkajších víriviek. Každý typ je dostupný v rôznych veľkostiach a konfiguráciách."
      },
      {
        question: "Aká je životnosť vašich saún?",
        answer: "Pri správnej údržbe môžu naše sauny vydržať 20-30 rokov. Používame len najkvalitnejšie materiály ako cédrové a jedľové drevo, ktoré sú prirodzene odolné voči vlhkosti a hnilobám."
      },
      {
        question: "Ponúkate zákazkovú výrobu?",
        answer: "Áno, ponúkame kompletný zákazkový servis. Náš tím dizajnérov s vami spolupracuje na vytvorení sauny presne podľa vašich požiadaviek - od veľkosti cez materiály až po špeciálne funkcie."
      },
    ]
  },
  {
    category: "Objednávka a dodanie",
    questions: [
      {
        question: "Aká je dodacia lehota?",
        answer: "Štandardné modely dodávame do 2-4 týždňov. Zákazkové sauny majú dodaciu lehotu 6-10 týždňov v závislosti od komplexnosti projektu. Presný termín vám oznámime po potvrdení objednávky."
      },
      {
        question: "Dodávate aj do zahraničia?",
        answer: "Áno, dodávame do celej Európy. Cena dopravy sa líši podľa destinácie a veľkosti produktu. Kontaktujte nás pre presnú kalkuláciu."
      },
      {
        question: "Je inštalácia zahrnutá v cene?",
        answer: "Inštalácia nie je štandardne zahrnutá v cene produktu, ale ponúkame ju ako doplnkovú službu. Naši certifikovaní technici zabezpečia profesionálnu montáž a uvedenie do prevádzky."
      },
    ]
  },
  {
    category: "Technické otázky",
    questions: [
      {
        question: "Aké sú požiadavky na elektrickú prípojku?",
        answer: "Väčšina našich saún vyžaduje 400V trojfázovú prípojku. Menšie modely a infrasauny fungujú na štandardných 230V. Presné požiadavky nájdete v špecifikácii každého produktu."
      },
      {
        question: "Potrebujem stavebné povolenie?",
        answer: "V závislosti od veľkosti a umiestnenia sauny môže byť potrebné stavebné povolenie alebo ohlásenie stavby. Odporúčame konzultáciu s miestnym stavebným úradom. Radi vám poskytneme potrebnú dokumentáciu."
      },
      {
        question: "Ako sa starať o saunu?",
        answer: "Pravidelné vetranie po každom použití, občasné čistenie lavíc a stien, a raz ročne ošetrenie dreva špeciálnym olejom. Dodávame podrobný manuál údržby s každou saunou."
      },
    ]
  },
  {
    category: "Záruka a servis",
    questions: [
      {
        question: "Aká je záručná doba?",
        answer: "Poskytujeme 5-ročnú záruku na konštrukciu a 2-ročnú záruku na elektrické komponenty. Prémiové modely majú rozšírenú záruku až 10 rokov."
      },
      {
        question: "Ponúkate pozáručný servis?",
        answer: "Áno, náš servisný tím je k dispozícii aj po uplynutí záručnej doby. Ponúkame pravidelné servisné prehliadky, opravy a dodávky náhradných dielov."
      },
      {
        question: "Čo ak potrebujem náhradné diely?",
        answer: "Všetky náhradné diely sú dostupné na objednanie. Väčšinu bežných dielov máme skladom a dokážeme ich odoslať do 24 hodín."
      },
    ]
  },
  {
    category: "Platba a financovanie",
    questions: [
      {
        question: "Aké platobné metódy akceptujete?",
        answer: "Akceptujeme bankový prevod, platbu kartou, a pri vyšších sumách aj platbu na splátky. Pre firemných zákazníkov ponúkame aj faktúru so splatnosťou."
      },
      {
        question: "Je možné saunu kúpiť na splátky?",
        answer: "Áno, spolupracujeme s renomovanými finančnými partnermi a ponúkame splátky už od 0% úroku na vybrané modely. Viac informácií vám radi poskytneme."
      },
      {
        question: "Aká je výška zálohy?",
        answer: "Pri štandardných modeloch vyžadujeme zálohu 30% z ceny. Pri zákazkových projektoch je záloha 50%. Zvyšok sa hradí pred dodaním alebo podľa dohodnutého splátkového kalendára."
      },
    ]
  },
];

const FAQ = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-to-b from-charcoal-900 to-background">
        <div className="container mx-auto px-4 text-center">
          <div className="w-16 h-16 rounded-full bg-amber-500/10 flex items-center justify-center mx-auto mb-6">
            <HelpCircle className="w-8 h-8 text-amber-400" />
          </div>
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
            Často kladené <span className="text-gradient">Otázky</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Nájdite odpovede na najčastejšie otázky o našich produktoch a službách
          </p>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-4xl">
          {faqCategories.map((category, categoryIndex) => (
            <div key={categoryIndex} className="mb-12">
              <h2 className="font-display text-2xl font-bold text-foreground mb-6 flex items-center">
                <span className="w-8 h-8 rounded-lg bg-amber-500/20 flex items-center justify-center mr-3 text-amber-400 text-sm font-bold">
                  {categoryIndex + 1}
                </span>
                {category.category}
              </h2>
              <Accordion type="single" collapsible className="space-y-4">
                {category.questions.map((faq, index) => (
                  <AccordionItem
                    key={index}
                    value={`${categoryIndex}-${index}`}
                    className="bg-charcoal-800/30 rounded-xl border border-amber-500/10 px-6 overflow-hidden"
                  >
                    <AccordionTrigger className="text-foreground hover:text-amber-400 transition-colors py-5 text-left">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground pb-5 leading-relaxed">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-charcoal-800/30">
        <div className="container mx-auto px-4 text-center">
          <MessageCircle className="w-12 h-12 text-amber-400 mx-auto mb-6" />
          <h2 className="font-display text-3xl font-bold text-foreground mb-4">
            Nenašli ste odpoveď?
          </h2>
          <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
            Náš tím je tu pre vás. Neváhajte nás kontaktovať s akoukoľvek otázkou.
          </p>
          <Link to="/contact">
            <Button variant="luxury" size="lg">
              Kontaktujte nás
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default FAQ;

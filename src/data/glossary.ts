export interface GlossaryTerm {
  id: string;
  term: string;
  definition: string;
  relatedTerms?: string[];
}

export const glossaryTerms: GlossaryTerm[] = [
  {
    id: "finska-sauna",
    term: "Fínska sauna",
    definition: "Tradičná suchá sauna pôvodom z Fínska, kde sa teplota pohybuje medzi 70-100°C pri nízkej vlhkosti (10-20%). Vyznačuje sa dreveným interiérom a kamenným ohrievačom, na ktorý sa polieva voda pre vytvorenie pary (löyly). Fínska sauna je známa svojimi zdravotnými benefitmi vrátane zlepšenia krvného obehu, detoxikácie a relaxácie.",
    relatedTerms: ["loyly", "saunovy-ohrevac"]
  },
  {
    id: "loyly",
    term: "Löyly",
    definition: "Fínsky výraz pre paru, ktorá vzniká polievaním vody na horúce kamene v saune. Löyly je považované za dušu fínskej sauny a vytvára príjemnú vlhkosť, ktorá zvyšuje pocit tepla. Správne löyly by malo byť jemné a príjemné, nie príliš ostré alebo pálivé.",
    relatedTerms: ["finska-sauna", "saunovy-ohrevac"]
  },
  {
    id: "thermo-drevo",
    term: "Thermo drevo",
    definition: "Tepelne upravené drevo, ktoré prešlo procesom termickej modifikácie pri teplotách 180-230°C. Tento proces zvyšuje odolnosť dreva voči vlhkosti, hnilobě a škodcom bez použitia chemikálií. Thermo drevo má charakteristickú tmavšiu farbu a je ideálne pre exteriérové sauny vďaka svojej dlhej životnosti.",
    relatedTerms: ["sudova-sauna"]
  },
  {
    id: "sudova-sauna",
    term: "Sudová sauna",
    definition: "Exteriérová sauna v tvare suda (barrel sauna), ktorá kombinuje efektívny dizajn s vynikajúcou cirkuláciou tepla. Oblý tvar zabezpečuje rovnomerné rozloženie tepla a rýchlejšie vykurovanie. Sudové sauny sú obľúbené pre svoj estetický vzhľad a kompaktnú veľkosť, ideálne do záhrad.",
    relatedTerms: ["thermo-drevo", "finska-sauna"]
  },
  {
    id: "saunovy-ohrevac",
    term: "Saunový ohrievač",
    definition: "Zariadenie na vyhrievanie sauny, ktoré môže byť elektrické, drevné alebo plynové. Elektrické ohrievače sú najrozšírenejšie pre interiérové sauny, zatiaľ čo drevné pece sú preferované pre autentický zážitok. Výkon ohrievača sa volí podľa veľkosti sauny, spravidla 1kW na 1m³ priestoru.",
    relatedTerms: ["finska-sauna", "loyly"]
  }
];

export const getTermById = (id: string): GlossaryTerm | undefined => {
  return glossaryTerms.find(term => term.id === id);
};

export const getRelatedTerms = (termIds: string[]): GlossaryTerm[] => {
  return glossaryTerms.filter(term => termIds.includes(term.id));
};

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useLocation, useNavigate } from "react-router-dom";

type Language = "sk" | "en";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  sk: {
    // Header
    "nav.home": "Domov",
    "nav.finnishSaunas": "Sauny",
    "nav.infraSaunas": "Infrasauny",
    "nav.hotTubs": "Kade",
    "nav.accessories": "Doplnky",
    "nav.configurator": "Konfigurátor",
    "nav.contact": "Kontakt",
    "nav.inquiry": "Dopyt",

    // Configurator - Category selection
    "config.breadcrumb.home": "Domov",
    "config.breadcrumb.configurator": "Konfigurátor",
    "config.breadcrumb.saunaSelection": "Výber sauny",
    "config.breadcrumb.configuration": "Konfigurácia",

    "config.category.title": "Čo si prajete",
    "config.category.titleHighlight": "nakonfigurovať?",
    "config.category.subtitle": "Vyberte si typ produktu a prispôsobte si ho presne podľa vašich predstáv.",

    "config.sauna": "Sauna",
    "config.sauna.description": "Nakonfigurujte si vlastnú saunu s výberom ohrievača, osvetlenia a príslušenstva.",
    "config.hottub": "Kaďa",
    "config.hottub.description": "Vyberte si veľkosť, trysky, osvetlenie a ďalšie doplnky pre vašu kaďu.",
    "config.from": "Od",

    // Sauna selection
    "config.saunaSelection.title": "Vyberte si",
    "config.saunaSelection.titleHighlight": "typ sauny",
    "config.saunaSelection.subtitle": "Každý model má svoje jedinečné vlastnosti a možnosti konfigurácie.",
    "config.back.category": "Späť na výber produktu",
    "config.back.sauna": "Späť na výber sauny",
    "config.back.hottub": "Späť na výber kategórie",

    // Configuration options
    "config.woodType": "Typ dreva",
    "config.woodType.spruce": "Smrekové drevo",
    "config.woodType.thermo": "Thermo wood",
    "config.color": "Farba exteriéru",
    "config.heater": "Typ ohrievača",
    "config.led": "LED osvetlenie",
    "config.bluetooth": "Bluetooth audio",
    "config.accessories": "Saunový set",

    // Hot tub options
    "config.size": "Veľkosť",
    "config.jets": "Masážne trysky",
    "config.cover": "Kryt",

    // Summary
    "config.summary": "Zhrnutie konfigurácie",
    "config.basePrice": "Základná cena",
    "config.total": "Celkom",
    "config.addToCart": "Pridať do košíka",
    "config.addingToCart": "Pridávam...",
    "config.configure": "Konfigurovať",

    // Gallery
    "config.gallery": "Galéria",
    "config.gallery.close": "Zatvoriť",

    // Colors
    "color.none": "Bez farby (Natural)",
    "color.1-mahagon": "Mahagón",
    "color.2-teak": "Teak / teplý jantár",
    "color.3-svetly-orech": "Svetlý orech",
    "color.4-zlaty-dub": "Zlatý dub",
    "color.5-olejovana-borovica": "Olejovaná borovica",
    "color.14-svetla-popolavosiva": "Svetlá popolavosivá",
    "color.15-greige": "Greige (sivo-hnedá)",
    "color.16-studena-siva": "Studená sivá",
    "color.17-antracit": "Antracit",
    "color.18-tmavy-orech": "Tmavý orech",
    "color.20-tmavy-mahagon": "Tmavý mahagón",

    // Option labels
    "config.noLed": "Bez LED",
    "config.noBluetooth": "Bez Bluetooth",
    "config.noHeater": "Bez ohrievača",
    "config.noColor": "Bez farby",
    "config.noAccessoryKit": "Bez sady",
    "config.onlyWoodType": "Pre tento model je dostupný iba {woodType}.",
    "config.accessoryKitHint": "Saunový set obsahuje základné príslušenstvo pre pohodlné saunovanie.",
    "config.colorHint": "Farba exteriéru je voliteľná. Bez farby zostane prirodzený vzhľad dreva.",
    "config.colorNotice": "Skutočný odtieň farby sa môže mierne líšiť od zobrazeného na monitore.",
    "config.selectHeaterModel": "Vyberte model ohrievača",
    "config.heaterModelRequired": "Pre pokračovanie musíte vybrať konkrétny model ohrievača.",
    "config.exteriorLed": "Vonkajšie LED osvetlenie",
    "config.exteriorLedShort": "Vonkajšie LED",
    "config.without": "Bez",
    "config.scrollMore": "Posúňte pre ďalšie možnosti",
    "config.priceNote": "Cena je orientačná vrátane DPH. Presná kalkulácia bude v objednávke.",
    "config.hottub.configTitle": "Konfigurácia kade",
    "config.lightboxAlt": "Detail produktu",

    // Misc
    included: "V cene",
    selected: "Vybrané",
    notSelected: "Nie je vybrané",
    "error.generic": "Chyba",
    "error.loadConfig": "Konfiguráciu sa nepodarilo načítať. Skús refresh alebo skontroluj endpoint",
    "error.loadConfigShort": "Nepodarilo sa načítať konfiguráciu.",
    "error.addToCart": "Nepodarilo sa pridať do košíka. Skúste to znova.",
    "success.addedToCart": "Produkt bol pridaný do košíka",
    "success.addedToCartDesc": "Pokračujte v nákupe alebo prejdite do košíka.",
  },
  en: {
    // Header
    "nav.home": "Home",
    "nav.finnishSaunas": "Saunas",
    "nav.infraSaunas": "Infrared Saunas",
    "nav.hotTubs": "Hot Tubs",
    "nav.accessories": "Accessories",
    "nav.configurator": "Configurator",
    "nav.contact": "Contact",
    "nav.inquiry": "Inquiry",

    // Configurator - Category selection
    "config.breadcrumb.home": "Home",
    "config.breadcrumb.configurator": "Configurator",
    "config.breadcrumb.saunaSelection": "Sauna Selection",
    "config.breadcrumb.configuration": "Configuration",

    "config.category.title": "What would you like to",
    "config.category.titleHighlight": "configure?",
    "config.category.subtitle": "Choose a product type and customize it exactly to your preferences.",

    "config.sauna": "Sauna",
    "config.sauna.description": "Configure your own sauna with a choice of heater, lighting and accessories.",
    "config.hottub": "Hot Tub",
    "config.hottub.description": "Choose the size, jets, lighting and other accessories for your hot tub.",
    "config.from": "From",

    // Sauna selection
    "config.saunaSelection.title": "Choose your",
    "config.saunaSelection.titleHighlight": "sauna type",
    "config.saunaSelection.subtitle": "Each model has its unique features and configuration options.",
    "config.back.category": "Back to product selection",
    "config.back.sauna": "Back to sauna selection",
    "config.back.hottub": "Back to category selection",

    // Configuration options
    "config.woodType": "Wood Type",
    "config.woodType.spruce": "Spruce Wood",
    "config.woodType.thermo": "Thermo Wood",
    "config.color": "Exterior Color",
    "config.heater": "Heater Type",
    "config.led": "LED Lighting",
    "config.bluetooth": "Bluetooth Audio",
    "config.accessories": "Sauna Kit",

    // Hot tub options
    "config.size": "Size",
    "config.jets": "Jets",
    "config.cover": "Cover",

    // Summary
    "config.summary": "Configuration Summary",
    "config.basePrice": "Base Price",
    "config.total": "Total",
    "config.addToCart": "Add to Cart",
    "config.addingToCart": "Adding...",
    "config.configure": "Configure",

    // Gallery
    "config.gallery": "Gallery",
    "config.gallery.close": "Close",

    // Colors
    "color.none": "No Color (Natural)",
    "color.1-mahagon": "Mahogany",
    "color.2-teak": "Teak / Warm Amber",
    "color.3-svetly-orech": "Light Walnut",
    "color.4-zlaty-dub": "Golden Oak",
    "color.5-olejovana-borovica": "Oiled Pine",
    "color.14-svetla-popolavosiva": "Light Ash Grey",
    "color.15-greige": "Greige (Grey-Brown)",
    "color.16-studena-siva": "Cold Grey",
    "color.17-antracit": "Anthracite",
    "color.18-tmavy-orech": "Dark Walnut",
    "color.20-tmavy-mahagon": "Dark Mahogany",

    // Option labels
    "config.noLed": "No LED",
    "config.noBluetooth": "No Bluetooth",
    "config.noHeater": "No Heater",
    "config.noColor": "No Color",
    "config.noAccessoryKit": "No Kit",
    "config.onlyWoodType": "Only {woodType} is available for this model.",
    "config.accessoryKitHint": "The sauna kit includes essential accessories for comfortable sauna use.",
    "config.colorHint": "Exterior color is optional. Without color, the natural wood appearance is preserved.",
    "config.colorNotice": "The actual shade may slightly differ from the one displayed on the screen.",
    "config.selectHeaterModel": "Select heater model",
    "config.heaterModelRequired": "You must select a specific heater model to continue.",
    "config.exteriorLed": "Exterior LED Lighting",
    "config.exteriorLedShort": "Exterior LED",
    "config.without": "Without",
    "config.scrollMore": "Scroll for more options",
    "config.priceNote": "Price is indicative incl. VAT. Exact calculation will be in the order.",
    "config.hottub.configTitle": "Hot Tub Configuration",
    "config.lightboxAlt": "Product detail",

    // Misc
    included: "Included",
    selected: "Selected",
    notSelected: "Not selected",
    "error.generic": "Error",
    "error.loadConfig": "Failed to load configuration. Try refreshing or check the endpoint",
    "error.loadConfigShort": "Failed to load configuration.",
    "error.addToCart": "Failed to add to cart. Please try again.",
    "success.addedToCart": "Product added to cart",
    "success.addedToCartDesc": "Continue shopping or go to cart.",
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const normalizePath = (path: string): string => {
    if (!path) return "/";
    if (path === "/") return "/";
    // Remove trailing slashes to avoid route mismatches (e.g. /konfigurator/)
    return path.replace(/\/+$/, "");
  };

  // Detect language from URL path
  const getLanguageFromPath = (): Language => {
    return location.pathname.startsWith("/en") ? "en" : "sk";
  };

  const [language, setLanguageState] = useState<Language>(getLanguageFromPath);

  // Update language when path changes
  useEffect(() => {
    setLanguageState(getLanguageFromPath());
  }, [location.pathname]);

  const setLanguage = (lang: Language) => {
    const currentPath = normalizePath(location.pathname);
    let newPath: string;

    if (lang === "en") {
      // Switch to English
      if (currentPath.startsWith("/en")) {
        newPath = currentPath; // Already in English
      } else if (currentPath.startsWith("/konfigurator")) {
        // Handle /konfigurator and /konfigurator/:modelSlug
        const subPath = currentPath.replace("/konfigurator", "");
        newPath = "/en/configurator" + subPath;
      } else {
        newPath = currentPath === "/" ? "/en" : `/en${currentPath}`;
      }
    } else {
      // Switch to Slovak
      if (currentPath.startsWith("/en/configurator")) {
        // Handle /en/configurator and /en/configurator/:modelSlug
        const subPath = currentPath.replace("/en/configurator", "");
        newPath = "/konfigurator" + subPath;
      } else if (currentPath.startsWith("/en/")) {
        newPath = currentPath.replace("/en", "");
      } else if (currentPath === "/en") {
        newPath = "/";
      } else {
        newPath = currentPath;
      }
    }

    navigate(newPath);
    setLanguageState(lang);
  };

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return <LanguageContext.Provider value={{ language, setLanguage, t }}>{children}</LanguageContext.Provider>;
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};

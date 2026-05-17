import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useLocation, useNavigate } from "react-router-dom";

type Language = "sk" | "en" | "hu";
type Currency = "EUR" | "CZK" | "HUF";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  currency: Currency;
  setCurrency: (currency: Currency) => void;
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
    "nav.blog": "Blog",
    "nav.about": "O nás",

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
    "config.combo": "Kombinácia sauna + kaďa",
    "config.combo.description": "2in1 produkty – sauna a kaďa v jednom. Vyberte si model a prispôsobte si ho.",
    "config.from": "Od",

    // Combo selection
    "config.comboSelection.title": "Vyberte si",
    "config.comboSelection.titleHighlight": "2in1 kombináciu",
    "config.comboSelection.subtitle": "Sauna a kaďa v jednom produkte s možnosťou konfigurácie.",
    "config.breadcrumb.comboSelection": "Výber kombinácie",
    "config.back.combo": "Späť na výber kombinácie",
    "config.combo.configTitle": "Konfigurácia kombinácie",
    "config.window": "Okná",
    "config.noWindow": "Bez okna",
    "config.window.round": "Guľaté okno",
    "config.window.back": "Okno vzadu",
    "config.window.145x57": "Okno 145×57cm",
    "config.window.panoramic50": "50% panoramatické okno",

    // Sauna selection
    "config.saunaSelection.title": "Vyberte si",
    "config.saunaSelection.titleHighlight": "typ sauny",
    "config.saunaSelection.subtitle": "Každý model má svoje jedinečné vlastnosti a možnosti konfigurácie.",
    "config.hottubSelection.title": "Vyberte si",
    "config.hottubSelection.titleHighlight": "typ kade",
    "config.hottubSelection.subtitle": "Každý model má svoje jedinečné vlastnosti a možnosti konfigurácie.",
    "config.breadcrumb.hottubSelection": "Výber kade",
    "config.back.category": "Späť na výber produktu",
    "config.back.sauna": "Späť na výber sauny",
    "config.back.hottub": "Späť na výber kade",

    // Configuration options
    "config.woodType": "Typ dreva",
    "config.woodType.spruce": "Smrekové drevo",
    "config.woodType.thermo": "Thermo wood",
    "config.color": "Farba exteriéru",
    "config.heater": "Typ ohrievača",
    "config.led": "LED osvetlenie",
    "config.bluetooth": "Bluetooth audio",
    "config.accessories": "Saunový set",
    "config.mirrorFilm": "Zrkadlová fólia",
    "config.metalBands": "Kovové pásy",
    "config.benches": "Lavice",
    "config.thermoCladding": "Obklad thermo drevom",

    // Hot tub options
    "config.size": "Veľkosť",
    "config.hottubHeater": "Ohrievač kade",
    "config.hottubElectricHeater": "Elektrický ohrievač",
    "config.underwaterLed": "Podvodné LED osvetlenie",
    "config.hottubExteriorLed": "LED osvetlenie okolo kade",
    "config.hydroMassage": "Hydro masáž",
    "config.jets": "Masážne trysky",
    "config.cover": "Kryt",
    "config.coverColor": "Farba krytu",
    "config.airBubbles": "Vzduchové bubliny",
    "config.drainRelay": "Prúdový istič 25A",
    "config.sandFilter": "Pieskový filter",
    "config.electronicController": "Elektronický kontrolér",
    "config.thermometer": "Integrovaný teplomer",
    "config.bluetoothSpeaker": "Bluetooth reproduktor",
    "config.headCushion": "Hlavový vankúš 4ks",

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
    "config.noHeater": "Bez pece",
    "config.noColor": "Bez farby",
    "config.noAccessoryKit": "Bez sady",
    "config.onlyWoodType": "Pre tento model je dostupný iba {woodType}.",
    "config.accessoryKitHint": "Saunový set obsahuje základné príslušenstvo pre pohodlné saunovanie.",
    "config.colorHint": "Farba exteriéru je voliteľná. Bez farby zostane prirodzený vzhľad dreva.",
    "config.colorNotice": "Skutočný odtieň farby sa môže mierne líšiť od zobrazeného na monitore.",
    "config.selectHeaterModel": "Vyberte model pece",
    "config.heaterModelRequired": "Pre pokračovanie musíte vybrať konkrétny model pece.",
    "config.exteriorLed": "Vonkajšie LED osvetlenie",
    "config.exteriorLedShort": "Vonkajšie LED",
    "config.without": "Bez",
    "config.scrollMore": "Posúňte pre ďalšie možnosti",
    "config.priceNote": "Cena je orientačná. Presná kalkulácia bude v objednávke.",
    "config.exteriorWood": "Vonkajšie obloženie",
    "config.acrylicLiner": "Farba akrylového vnútra",
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

    // Inline UI (Configurator.tsx)
    "config.metaTitle": "LuxuRelax | Konfigurátor",
    "config.metaDescription":
      "Nakonfigurujte si svoju vysnívanú saunu alebo kaďu. Vyberte si typ dreva, ohrievač, osvetlenie a príslušenstvo.",
    "config.heaterModelCartError": "Pred pridaním do košíka musíte vybrať konkrétny model ohrievača.",
    "config.pergola": "Pergola",
    "config.pergola.description": "Navrhnite si prémiovú bioklimatickú pergolu — rozmery, farba, strecha a osvetlenie.",
    "config.sort.priceAsc": "Najlacnejšie",
    "config.sort.priceDesc": "Najdrahšie",
    "config.sort.nameAsc": "Názov A-Z",
    "config.combo.tabSauna": "Sauna",
    "config.combo.tabHottub": "Kaďa",
    "config.combo.nextHottub": "Ďalej: Možnosti kade",
    "config.combo.backSauna": "Späť na možnosti sauny",
    "config.heater.externalChimney": "s komínom, čiapkou a ochranou, vhodné pre vodu s chémiou",

    // Footer
    "footer.brand.description":
      "Prémiové sauny a wellness riešenia vytvorené s vášňou a dodané s dôrazom na dokonalosť. Vaša cesta k relaxu začína tu.",
    "footer.quickLinks": "Rýchle odkazy",
    "footer.home": "Domov",
    "footer.shop": "Obchod",
    "footer.aboutUs": "O nás",
    "footer.faq": "Často kladené otázky",
    "footer.sauny": "Fínske sauny na mieru",
    "footer.kade": "Kúpacie kade s vírivkou",
    "footer.slovnik": "Materiály a technológie",
    "footer.konfigurator": "Konfigurátor",
    "footer.contact": "Kontakt",
    "footer.products": "Informácie",
    "footer.vop": "Všeobecné obchodné podmienky",
    "footer.cookies": "Cookies",
    "footer.gdpr": "Ochrana osobných údajov",
    "footer.barrelSaunas": "Sudové sauny",
    "footer.cubeSaunas": "Cube sauny",
    "footer.traditionalSaunas": "Tradičné kabíny",
    "footer.hotTubs": "Kade",
    "footer.accessories": "Príslušenstvo",
    "footer.contactTitle": "Kontakt",
    "footer.copyright": "© 2026 LuxuRelax. Všetky práva vyhradené.",
    "footer.weboptim": "E-Shop od weboptim",
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
    "nav.blog": "Blog",
    "nav.about": "About Us",

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
    "config.combo": "Sauna + Hot Tub Combo",
    "config.combo.description": "2in1 products – sauna and hot tub in one. Choose a model and customize it.",
    "config.from": "From",

    // Combo selection
    "config.comboSelection.title": "Choose your",
    "config.comboSelection.titleHighlight": "2in1 combo",
    "config.comboSelection.subtitle": "Sauna and hot tub in one product with configuration options.",
    "config.breadcrumb.comboSelection": "Combo Selection",
    "config.back.combo": "Back to combo selection",
    "config.combo.configTitle": "Combo Configuration",
    "config.window": "Windows",
    "config.noWindow": "No window",
    "config.window.round": "Round window",
    "config.window.back": "Window at the back",
    "config.window.145x57": "Window 145×57cm",
    "config.window.panoramic50": "50% panoramic window",

    // Sauna selection
    "config.saunaSelection.title": "Choose your",
    "config.saunaSelection.titleHighlight": "sauna type",
    "config.saunaSelection.subtitle": "Each model has its unique features and configuration options.",
    "config.hottubSelection.title": "Choose your",
    "config.hottubSelection.titleHighlight": "hot tub type",
    "config.hottubSelection.subtitle": "Each model has its unique features and configuration options.",
    "config.breadcrumb.hottubSelection": "Hot Tub Selection",
    "config.back.category": "Back to product selection",
    "config.back.sauna": "Back to sauna selection",
    "config.back.hottub": "Back to hot tub selection",

    // Configuration options
    "config.woodType": "Wood Type",
    "config.woodType.spruce": "Spruce Wood",
    "config.woodType.thermo": "Thermo Wood",
    "config.color": "Exterior Color",
    "config.heater": "Heater Type",
    "config.led": "LED Lighting",
    "config.bluetooth": "Bluetooth Audio",
    "config.accessories": "Sauna Kit",
    "config.mirrorFilm": "Mirror Film",
    "config.metalBands": "Metal Bands",
    "config.benches": "Benches",
    "config.thermoCladding": "Thermo Wood Cladding",

    // Hot tub options
    "config.size": "Size",
    "config.hottubHeater": "Hot Tub Heater",
    "config.hottubElectricHeater": "Electric Heater",
    "config.underwaterLed": "Underwater LED Lighting",
    "config.hottubExteriorLed": "LED Lighting Around the Tub",
    "config.hydroMassage": "Hydro Massage",
    "config.jets": "Jets",
    "config.cover": "Cover",
    "config.coverColor": "Cover Color",
    "config.airBubbles": "Air Bubbles",
    "config.drainRelay": "Current Drain Relay 25A",
    "config.sandFilter": "Sand Filter",
    "config.electronicController": "Electronic Controller",
    "config.thermometer": "Integrated Thermometer",
    "config.bluetoothSpeaker": "Bluetooth Speaker System",
    "config.headCushion": "Head Cushion 4pcs",

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
    "config.exteriorWood": "Exterior Cladding",
    "config.acrylicLiner": "Acrylic Liner Color",
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

    // Inline UI (Configurator.tsx)
    "config.metaTitle": "LuxuRelax | Configurator",
    "config.metaDescription":
      "Configure your dream sauna or hot tub. Choose wood type, heater, lighting and accessories.",
    "config.heaterModelCartError": "You must select a specific heater model before adding to cart.",
    "config.pergola": "Pergola",
    "config.pergola.description": "Design your premium bioclimatic pergola — dimensions, color, roof and lighting.",
    "config.sort.priceAsc": "Cheapest",
    "config.sort.priceDesc": "Most expensive",
    "config.sort.nameAsc": "Name A-Z",
    "config.combo.tabSauna": "Sauna",
    "config.combo.tabHottub": "Hot Tub",
    "config.combo.nextHottub": "Next: Hot Tub options",
    "config.combo.backSauna": "Back to Sauna options",
    "config.heater.externalChimney": "with chimney, cap and protection, suitable for water with chemicals",

    // Footer
    "footer.brand.description":
      " Premium saunas and wellness solutions created with passion and delivered with an emphasis on perfection. Your journey to relaxation starts here.",
    "footer.quickLinks": "Quick Links",
    "footer.home": "Home",
    "footer.shop": "Shop",
    "footer.aboutUs": "About Us",
    "footer.faq": "Frequently Asked Questions",
    "footer.sauny": "Custom-made Finnish saunas",
    "footer.kade": "Hot Tubs",
    "footer.slovnik": "Materials and Technology",
    "footer.konfigurator": "configurator",
    "footer.contact": "Contact",
    "footer.products": "Information",
    "footer.vop": "Terms and Conditions",
    "footer.cookies": "Cookies",
    "footer.gdpr": "Privacy Policy",
    "footer.barrelSaunas": "Barrel Saunas",
    "footer.cubeSaunas": "Cube Saunas",
    "footer.traditionalSaunas": "Traditional Cabins",
    "footer.hotTubs": "Hot Tubs",
    "footer.accessories": "Accessories",
    "footer.contactTitle": "Contact",
    "footer.copyright": "© 2026 LuxuRelax. All rights reserved.",
    "footer.weboptim": "E-Shop by weboptim",
  },
  hu: {
    // Header
    "nav.home": "Főoldal",
    "nav.finnishSaunas": "Szaunák",
    "nav.infraSaunas": "Infraszaunák",
    "nav.hotTubs": "Dézsafürdők",
    "nav.accessories": "Kiegészítők",
    "nav.configurator": "Konfigurátor",
    "nav.contact": "Kapcsolat",
    "nav.inquiry": "Ajánlatkérés",
    "nav.blog": "Blog",
    "nav.about": "Rólunk",

    // Configurator - Category selection
    "config.breadcrumb.home": "Főoldal",
    "config.breadcrumb.configurator": "Konfigurátor",
    "config.breadcrumb.saunaSelection": "Szauna kiválasztása",
    "config.breadcrumb.configuration": "Konfiguráció",

    "config.category.title": "Mit szeretne",
    "config.category.titleHighlight": "konfigurálni?",
    "config.category.subtitle": "Válassza ki a terméktípust és szabja személyre saját igényei szerint.",

    "config.sauna": "Szauna",
    "config.sauna.description": "Konfigurálja saját szaunáját kályha, világítás és kiegészítők kiválasztásával.",
    "config.hottub": "Dézsafürdő",
    "config.hottub.description": "Válassza ki a méretet, fúvókákat, világítást és további kiegészítőket a dézsafürdőjéhez.",
    "config.combo": "Szauna + dézsafürdő kombináció",
    "config.combo.description": "2in1 termékek – szauna és dézsafürdő egyben. Válasszon modellt és szabja személyre.",
    "config.from": "Ettől",

    // Combo selection
    "config.comboSelection.title": "Válassza ki a",
    "config.comboSelection.titleHighlight": "2in1 kombinációt",
    "config.comboSelection.subtitle": "Szauna és dézsafürdő egy termékben, konfigurálási lehetőségekkel.",
    "config.breadcrumb.comboSelection": "Kombináció kiválasztása",
    "config.back.combo": "Vissza a kombináció kiválasztásához",
    "config.combo.configTitle": "Kombináció konfigurációja",
    "config.window": "Ablakok",
    "config.noWindow": "Ablak nélkül",
    "config.window.round": "Kerek ablak",
    "config.window.back": "Hátsó ablak",
    "config.window.145x57": "Ablak 145×57cm",
    "config.window.panoramic50": "50% panorámaablak",

    // Sauna selection
    "config.saunaSelection.title": "Válassza ki a",
    "config.saunaSelection.titleHighlight": "szauna típusát",
    "config.saunaSelection.subtitle": "Minden modellnek megvannak a maga egyedi tulajdonságai és konfigurációs lehetőségei.",
    "config.hottubSelection.title": "Válassza ki a",
    "config.hottubSelection.titleHighlight": "dézsafürdő típusát",
    "config.hottubSelection.subtitle": "Minden modellnek megvannak a maga egyedi tulajdonságai és konfigurációs lehetőségei.",
    "config.breadcrumb.hottubSelection": "Dézsafürdő kiválasztása",
    "config.back.category": "Vissza a termék kiválasztásához",
    "config.back.sauna": "Vissza a szauna kiválasztásához",
    "config.back.hottub": "Vissza a dézsafürdő kiválasztásához",

    // Configuration options
    "config.woodType": "Fa típusa",
    "config.woodType.spruce": "Lucfenyő",
    "config.woodType.thermo": "Thermo fa",
    "config.color": "Külső szín",
    "config.heater": "Kályha típusa",
    "config.led": "LED világítás",
    "config.bluetooth": "Bluetooth audió",
    "config.accessories": "Szauna szett",
    "config.mirrorFilm": "Tükörfólia",
    "config.metalBands": "Fém pántok",
    "config.benches": "Padok",
    "config.thermoCladding": "Thermo fa burkolat",

    // Hot tub options
    "config.size": "Méret",
    "config.hottubHeater": "Dézsafürdő kályhája",
    "config.hottubElectricHeater": "Elektromos kályha",
    "config.underwaterLed": "Vízalatti LED világítás",
    "config.hottubExteriorLed": "LED világítás a dézsa körül",
    "config.hydroMassage": "Hidromasszázs",
    "config.jets": "Masszázsfúvókák",
    "config.cover": "Fedél",
    "config.coverColor": "Fedél színe",
    "config.airBubbles": "Légbuborékok",
    "config.drainRelay": "Áramvédő relé 25A",
    "config.sandFilter": "Homokszűrő",
    "config.electronicController": "Elektronikus vezérlő",
    "config.thermometer": "Beépített hőmérő",
    "config.bluetoothSpeaker": "Bluetooth hangszóró",
    "config.headCushion": "Fejpárna 4db",

    // Summary
    "config.summary": "Konfiguráció összegzése",
    "config.basePrice": "Alapár",
    "config.total": "Összesen",
    "config.addToCart": "Kosárba",
    "config.addingToCart": "Hozzáadás...",
    "config.configure": "Konfigurálás",

    // Gallery
    "config.gallery": "Galéria",
    "config.gallery.close": "Bezárás",

    // Colors
    "color.none": "Szín nélkül (Natural)",
    "color.1-mahagon": "Mahagóni",
    "color.2-teak": "Teak / meleg borostyán",
    "color.3-svetly-orech": "Világos dió",
    "color.4-zlaty-dub": "Aranytölgy",
    "color.5-olejovana-borovica": "Olajozott fenyő",
    "color.14-svetla-popolavosiva": "Világos hamuszürke",
    "color.15-greige": "Greige (szürkésbarna)",
    "color.16-studena-siva": "Hideg szürke",
    "color.17-antracit": "Antracit",
    "color.18-tmavy-orech": "Sötét dió",
    "color.20-tmavy-mahagon": "Sötét mahagóni",

    // Option labels
    "config.noLed": "LED nélkül",
    "config.noBluetooth": "Bluetooth nélkül",
    "config.noHeater": "Kályha nélkül",
    "config.noColor": "Szín nélkül",
    "config.noAccessoryKit": "Szett nélkül",
    "config.onlyWoodType": "Ehhez a modellhez csak {woodType} érhető el.",
    "config.accessoryKitHint": "A szauna szett tartalmazza a kényelmes szaunázáshoz szükséges alapvető kiegészítőket.",
    "config.colorHint": "A külső szín opcionális. Szín nélkül a fa természetes megjelenése marad.",
    "config.colorNotice": "A tényleges árnyalat enyhén eltérhet a képernyőn megjelenítettől.",
    "config.selectHeaterModel": "Válassza ki a kályha modelljét",
    "config.heaterModelRequired": "A folytatáshoz konkrét kályha modellt kell választania.",
    "config.exteriorLed": "Külső LED világítás",
    "config.exteriorLedShort": "Külső LED",
    "config.without": "Nélkül",
    "config.scrollMore": "Görgessen további lehetőségekért",
    "config.priceNote": "Az ár tájékoztató jellegű, áfával együtt. A pontos kalkuláció a megrendelésben lesz.",
    "config.exteriorWood": "Külső burkolat",
    "config.acrylicLiner": "Akril belső szín",
    "config.hottub.configTitle": "Dézsafürdő konfigurációja",
    "config.lightboxAlt": "Termék részlet",

    // Misc
    included: "Az árban",
    selected: "Kiválasztva",
    notSelected: "Nincs kiválasztva",
    "error.generic": "Hiba",
    "error.loadConfig": "A konfigurációt nem sikerült betölteni. Próbálja meg frissíteni, vagy ellenőrizze a végpontot",
    "error.loadConfigShort": "A konfigurációt nem sikerült betölteni.",
    "error.addToCart": "A kosárba helyezés nem sikerült. Próbálja újra.",
    "success.addedToCart": "A termék a kosárba került",
    "success.addedToCartDesc": "Folytassa a vásárlást vagy lépjen a kosárhoz.",

    // Inline UI (Configurator.tsx)
    "config.metaTitle": "LuxuRelax | Konfigurátor",
    "config.metaDescription":
      "Konfigurálja álmai szaunáját vagy dézsafürdőjét. Válasszon fa típust, kályhát, világítást és kiegészítőket.",
    "config.heaterModelCartError": "Mielőtt a kosárba helyezné, válassza ki a kályha konkrét modelljét.",
    "config.pergola": "Pergola",
    "config.pergola.description":
      "Tervezze meg prémium bioklimatikus pergoláját — méretek, szín, tető és világítás.",
    "config.sort.priceAsc": "Legolcsóbb",
    "config.sort.priceDesc": "Legdrágább",
    "config.sort.nameAsc": "Név A-Z",
    "config.combo.tabSauna": "Szauna",
    "config.combo.tabHottub": "Dézsafürdő",
    "config.combo.nextHottub": "Következő: Dézsafürdő opciók",
    "config.combo.backSauna": "Vissza a szauna opciókhoz",
    "config.heater.externalChimney": "kéménnyel, sapkával és védelemmel, kémiailag kezelt vízhez alkalmas",

    // Footer
    "footer.brand.description":
      "Prémium szaunák és wellness megoldások szenvedéllyel készítve, a tökéletességre törekedve. Az Ön relaxációs utazása itt kezdődik.",
    "footer.quickLinks": "Gyors linkek",
    "footer.home": "Főoldal",
    "footer.shop": "Bolt",
    "footer.aboutUs": "Rólunk",
    "footer.faq": "Gyakori kérdések",
    "footer.sauny": "Egyedi finn szaunák",
    "footer.kade": "Pezsgőfürdős dézsák",
    "footer.slovnik": "Anyagok és technológia",
    "footer.konfigurator": "Konfigurátor",
    "footer.contact": "Kapcsolat",
    "footer.products": "Információ",
    "footer.vop": "Általános szerződési feltételek",
    "footer.cookies": "Cookie-k",
    "footer.gdpr": "Adatvédelmi szabályzat",
    "footer.barrelSaunas": "Hordó szaunák",
    "footer.cubeSaunas": "Kocka szaunák",
    "footer.traditionalSaunas": "Hagyományos kabinok",
    "footer.hotTubs": "Dézsafürdők",
    "footer.accessories": "Kiegészítők",
    "footer.contactTitle": "Kapcsolat",
    "footer.copyright": "© 2026 LuxuRelax. Minden jog fenntartva.",
    "footer.weboptim": "E-Shop a weboptim-tól",
  },
};

const defaultContext: LanguageContextType = {
  language: "sk",
  setLanguage: () => {},
  currency: "EUR",
  setCurrency: () => {},
  t: (key: string) => translations.sk[key] || key,
};

const LanguageContext = createContext<LanguageContextType>(defaultContext);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const normalizePath = (path: string): string => {
    if (!path) return "/";
    if (path === "/") return "/";
    // Remove trailing slashes to avoid route mismatches (e.g. /konfigurator/)
    return path.replace(/\/+$/, "");
  };

  // Detect language: hostname .hu => HU, /configurator => EN, /konfigurator-hu => HU (dev), else SK
  const getLanguageFromPath = (): Language => {
    if (typeof window !== "undefined") {
      const host = window.location.hostname;
      if (host.endsWith(".hu") || host === "luxurelax.hu") return "hu";
      const params = new URLSearchParams(window.location.search);
      if (params.get("lang") === "hu") return "hu";
    }
    const p = location.pathname;
    if (p.startsWith("/konfigurator-hu") || p.startsWith("/hu/")) return "hu";
    if (p.startsWith("/configurator")) return "en";
    return "sk";
  };

  const [language, setLanguageState] = useState<Language>(getLanguageFromPath);
  const [currency, setCurrency] = useState<Currency>(() => (getLanguageFromPath() === "hu" ? "HUF" : "EUR"));

  // Update language when path changes
  useEffect(() => {
    const next = getLanguageFromPath();
    setLanguageState(next);
    if (next === "hu") setCurrency("HUF");
  }, [location.pathname]);

  const setLanguage = (lang: Language) => {
    const currentPath = normalizePath(location.pathname);
    const subPath = currentPath
      .replace(/^\/konfigurator-hu/, "")
      .replace(/^\/configurator/, "")
      .replace(/^\/konfigurator/, "");

    if (lang === "en") {
      window.location.href = "https://www.luxurelax.com/configurator" + subPath;
    } else if (lang === "hu") {
      window.location.href = "https://www.luxurelax.hu/konfigurator" + subPath;
    } else {
      window.location.href = "https://www.luxurelax.sk/konfigurator" + subPath;
    }
  };

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, currency, setCurrency, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  return useContext(LanguageContext);
};

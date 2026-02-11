export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  category: 'wellness' | 'produkty' | 'novinky' | 'tipy';
  date: string;
  readTime: number;
}

export const blogPosts: BlogPost[] = [
  {
    id: 'benefity-saunovania',
    title: '7 zdravotných benefitov pravidelného saunovania',
    excerpt: 'Saunovanie nie je len relax – je to investícia do vášho zdravia. Pozrite sa na vedecky podložené benefity.',
    content: `Pravidelné saunovanie prináša množstvo zdravotných výhod, ktoré sú podporené vedeckými štúdiami. Fínski vedci sledovali viac ako 2 000 mužov po dobu 20 rokov a zistili, že tí, ktorí navštevovali saunu 4–7 krát týždenne, mali o 40 % nižšie riziko predčasného úmrtia.

## 1. Detoxikácia organizmu

Pri teplote 80–100 °C sa otvárajú póry a telo sa zbavuje toxínov cez pot. Potenie v saune je hlbšie ako pri bežnom cvičení.

## 2. Zlepšenie kardiovaskulárneho zdravia

Teplo v saune zvyšuje srdcovú frekvenciu podobne ako mierne cvičenie. Pravidelné saunovanie pomáha znižovať krvný tlak.

## 3. Posilnenie imunity

Saunovanie stimuluje produkciu bielych krviniek, čo posilňuje vašu obranyschopnosť voči infekciám.

## 4. Úľava od bolesti svalov a kĺbov

Teplo uvoľňuje svalové napätie a zlepšuje cirkuláciu krvi v postihnutých oblastiach.

## 5. Zlepšenie kvality spánku

20 minút v saune pred spaním pomáha telu uvoľniť sa a navodiť hlboký, kvalitný spánok.

## 6. Redukcia stresu

Saunovanie znižuje hladinu kortizolu a stimuluje uvoľňovanie endorfínov – hormónov šťastia.

## 7. Zlepšenie pokožky

Pravidelné potenie čistí póry, zlepšuje prekrvenie pokožky a podporuje tvorbu kolagénu.`,
    image: '/placeholder.svg',
    category: 'wellness',
    date: '2025-01-15',
    readTime: 5,
  },
  {
    id: 'ako-vybrat-saunu',
    title: 'Ako si vybrať správnu saunu pre váš domov',
    excerpt: 'Barrel, cube alebo modulová? Vonkajšia alebo vnútorná? Pomôžeme vám zorientovať sa.',
    content: `Výber sauny pre domáce použitie môže byť náročný. V tomto článku vám pomôžeme zorientovať sa medzi rôznymi typmi a nájsť tú pravú pre vás.

## Vonkajšia vs. vnútorná sauna

**Vonkajšia sauna** je ideálna, ak máte záhradu alebo terasu. Ponúka autentický zážitok a nevyžaduje úpravy interiéru. Naše modely 2M Round, Frame a Harmony sú navrhnuté práve pre vonkajšie použitie.

**Vnútorná sauna** je vhodná pre tých, ktorí chcú saunovať po celý rok bez ohľadu na počasie. ModulSauna a LUX Mini sú kompaktné riešenia pre interiér.

## Typy vonkajších saún

### Barrel (sudová) sauna
- Efektívne vyhrievanie vďaka kruhovému tvaru
- Rýchla inštalácia
- Ideálna pre menšie záhrady

### Frame sauna
- Moderný dizajn s veľkými oknami
- Priestranný interiér
- Vhodná ako architektonický prvok záhrady

### Harmony sauna
- Zateplená konštrukcia pre celoročné použitie
- Nízke prevádzkové náklady
- Najlepší pomer cena/výkon

## Na čo myslieť pri výbere

1. **Priestor** – Koľko miesta máte k dispozícii?
2. **Počet osôb** – Pre koľko ľudí má sauna slúžiť?
3. **Rozpočet** – Aký je váš cenový limit?
4. **Typ ohrievača** – Drevo alebo elektrika?
5. **Údržba** – Koľko času chcete venovať starostlivosti?`,
    image: '/placeholder.svg',
    category: 'tipy',
    date: '2025-01-08',
    readTime: 7,
  },
  {
    id: 'udrzba-sauny-v-zime',
    title: 'Údržba vonkajšej sauny v zimnom období',
    excerpt: 'Zima je pre vonkajšiu saunu najlepšie obdobie. Ale vyžaduje si správnu údržbu.',
    content: `Vonkajšia sauna v zime je nezabudnuteľný zážitok. Kontrast horúceho vnútra a studeného vonkajšieho vzduchu je to, čo saunovanie robí výnimočným. Aby vám sauna slúžila dlhé roky, je dôležité dodržiavať niekoľko pravidiel.

## Pravidelné vetranie

Po každom saunovaní nechajte dvere otvorené na 15–20 minút. Vlhkosť sa musí odparit, aby nedochádzalo k tvorbe plesní.

## Ochrana dreva

Vonkajší náter odporúčame obnoviť raz ročne, ideálne na jar. Používajte kvalitné oleje určené pre saunové drevo.

## Kontrola strechy a odkvapov

Sneh a ľad môžu poškodiť strechu. Pravidelne odstraňujte nahromadený sneh a kontrolujte tesnosť.

## Ohrievač a komín

Pred zimnou sezónou skontrolujte stav komína a ohrievača. Pri drevenom ohrievači vyčistite popolník a skontrolujte ťah komína.

## Vodovod a odvod vody

Ak má vaša sauna vodovodnú prípojku, pred mrazmi vypustite vodu z potrubí, aby nedošlo k prasknutiu.`,
    image: '/placeholder.svg',
    category: 'tipy',
    date: '2024-12-20',
    readTime: 4,
  },
  {
    id: 'nova-harmony-insulated',
    title: 'Novinka: Harmony Insulated – celoročná sauna',
    excerpt: 'Predstavujeme náš najnovší model so zateplením pre maximálny komfort v každom ročnom období.',
    content: `S hrdosťou predstavujeme náš najnovší model – **Harmony Insulated**. Táto sauna bola navrhnutá pre tých, ktorí chcú saunovať po celý rok bez kompromisov.

## Čo je nové?

### Zateplená konštrukcia
Harmony Insulated má sendvičovú konštrukciu s minerálnou izoláciou, ktorá drasticky znižuje tepelné straty. V porovnaní s nezateplenou verziou ušetríte až 40 % energie na vyhrievanie.

### Prémiové materiály
Vonkajšia úprava je dostupná v 11 farebných variantoch – od prírodného dreva až po moderný antracit. Vnútro je zhotovené z fínskeho smreka najvyššej kvality.

### Moderný dizajn
Čisté línie, veľké panoramatické okno a elegantné detaily robia z Harmony Insulated nielen saunu, ale aj architektonický skvost vašej záhrady.

## Technické parametre

- **Rozmery:** 2400 × 2400 mm
- **Kapacita:** 4–6 osôb
- **Izolácia:** 50 mm minerálna vlna
- **Ohrievač:** Harvia kompatibilný (drevo/elektro)
- **Hmotnosť:** cca 1200 kg

## Dostupnosť

Model Harmony Insulated je dostupný na objednávku s dodacou lehotou 4–6 týždňov. Nakonfigurujte si ju v našom konfigurátore!`,
    image: '/placeholder.svg',
    category: 'novinky',
    date: '2025-02-01',
    readTime: 4,
  },
  {
    id: 'sauna-vs-parna-koupel',
    title: 'Fínska sauna vs. parná kúpeľ – aký je rozdiel?',
    excerpt: 'Obe majú zdravotné benefity, ale fungujú na inom princípe. Ktorá je lepšia pre vás?',
    content: `Fínska sauna a parná kúpeľ (steam room) sú často zamieňané, ale ide o dva odlišné spôsoby relaxácie. Poďme si vysvetliť rozdiely.

## Fínska sauna

- **Teplota:** 80–100 °C
- **Vlhkosť:** 10–20 % (suchý vzduch)
- **Princíp:** Suché teplo z ohrievača (drevo/elektro), občasné poliatie kameňov vodou
- **Materiál:** Drevená konštrukcia (smrek, céder, jelša)

## Parná kúpeľ

- **Teplota:** 40–50 °C
- **Vlhkosť:** 100 %
- **Princíp:** Parný generátor vytvára hustú paru
- **Materiál:** Obklady, keramika, sklo

## Zdravotné benefity

| | Fínska sauna | Parná kúpeľ |
|---|---|---|
| Detoxikácia | ✅ Výborná | ✅ Dobrá |
| Dýchacie cesty | ⚠️ Menej vhodná | ✅ Výborná |
| Svalová relaxácia | ✅ Výborná | ✅ Dobrá |
| Kardio zdravie | ✅ Preukázané | ⚠️ Menej štúdií |
| Pokožka | ✅ Čistenie pórov | ✅ Hydratácia |

## Náš verdikt

Pre domáce použitie odporúčame fínsku saunu – je jednoduchšia na údržbu, má nižšie prevádzkové náklady a jej zdravotné benefity sú lepšie preskúmané.`,
    image: '/placeholder.svg',
    category: 'wellness',
    date: '2024-12-05',
    readTime: 6,
  },
  {
    id: 'spravne-saunovanie',
    title: 'Ako správne saunovať: kompletný sprievodca',
    excerpt: 'Od prípravy po ochladenie – naučte sa saunovať ako Fíni.',
    content: `Saunovanie je umenie a má svoje pravidlá. Ak chcete z neho vyťažiť maximum, dodržiavajte tieto osvedčené postupy.

## Pred saunovaním

1. **Hydratácia** – Vypite aspoň 0,5 l vody
2. **Sprcha** – Osprchujte sa vlažnou vodou a dôkladne sa osušte
3. **Jedlo** – Nesaunujte na plný žalúdok, ideálne 2 hodiny po jedle
4. **Oblečenie** – V saune sa sedí nahý alebo v bavlnenom uteráku

## Prvý vstup (10–15 minút)

Sadnite si na spodnú lavicu a postupne sa aklimatizujte. Teplota na spodnej lavici je nižšia (cca 60 °C) oproti hornej (80–100 °C).

## Ochladenie (5–10 minút)

Po výstupe zo sauny sa ochlaďte – studená sprcha, bazén alebo v zime skok do snehu. Potom si oddýchnite na čerstvom vzduchu.

## Druhý vstup (10–15 minút)

Tentokrát môžete ísť na hornú lavicu. Polejte kamene vodou pre vytvorenie pary (löyly). Teplota krátkodobo stúpne.

## Po saunovaní

- Doplňte tekutiny (voda, bylinkový čaj)
- Oddýchnite si minimálne 20 minút
- Naneste hydratačný krém na pokožku

## Koľko krát týždenne?

Ideálne 2–3 krát týždenne po 2–3 cykly (vstup + ochladenie). Fíni saunujú aj denne – a žijú najdlhšie v Európe!`,
    image: '/placeholder.svg',
    category: 'wellness',
    date: '2024-11-28',
    readTime: 5,
  },
];

export const blogCategories = [
  { id: 'all', label: 'Všetky' },
  { id: 'wellness', label: 'Wellness' },
  { id: 'tipy', label: 'Tipy a rady' },
  { id: 'novinky', label: 'Novinky' },
  { id: 'produkty', label: 'Produkty' },
] as const;

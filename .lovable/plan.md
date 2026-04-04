## Plán zmien

### Frontend (Configurator.tsx):

1. **Nový state `comboStep`** (1 = sauna konfigurácia, 2 = kaďa konfigurácia) s navigáciou Ďalej/Späť
2. **Rozšíriť `comboConfig`** o chýbajúce sauna položky:
   - `heaterType` + `heaterModel` (typ pece + konkrétny model Harvia)
   - `exteriorLed` (vonkajšie LED)
   - `mirror` (zrkadlová fólia)
   - `metal` (kovové pásy)
   - `thermoCladding` (thermo obklad)
   - `bench` (lavice)
3. **Rozšíriť `ComboType` a `ApiComboType`** o nové has* flagy:
   - `hasHeaterType`, `hasMirrorFilm`, `hasMetalBands`, `hasThermoCladding`, `hasBenchOptions`, `hasExteriorLed` (sauna-side), `hasWindow`
4. **Krok 1 (Sauna):** Typ dreva, Farba, Ohrievač + model, Okná, Zrkadlová fólia, Kovové pásy, Thermo obklad, Lavice, LED, Vonkajšie LED, Bluetooth, Saunová sada
5. **Krok 2 (Kaďa):** Ohrievač kade, Elektrický ohrievač, Podvodné LED, Vonkajšie LED kade, Hydro masáž, Kryt, Farba krytu, Vzduchové bubliny, Odtokový ventil, Piesočný filter, Digitálny ovládač, Teplomer, Bluetooth reproduktor, Podhlavník
6. **Aktualizovať výpočet ceny** o nové položky

### PHP backend (čo treba zmeniť):

V `comboTypes` cykle pridať tieto polia pre každý combo model:
```php
'hasHeaterType'       => true,  // alebo false podľa modelu
'hasExteriorLed'      => true,  // sauna-side exterior LED
'hasMirrorFilm'       => false, // podľa modelu
'hasMetalBands'       => false, // podľa modelu  
'hasThermoCladding'   => false, // podľa modelu
'hasBenchOptions'     => false, // podľa modelu
'hasWindow'           => true,  // už existuje cez windowOptions
```

Tieto flagy frontendu povedia, ktoré sekcie zobraziť. Samotné option data (heaterTypes, ledOptions, colorOptions, etc.) sa už berú zo `sauna` kľúča v API, takže PHP ich netreba duplikovať - frontend ich reusuje.

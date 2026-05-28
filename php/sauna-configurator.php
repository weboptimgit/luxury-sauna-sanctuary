<?php

/**
 * Plugin Name: Sauna Configurator (Woo – synced with React)
 * Description: Server-side config, pricing & add-to-cart for Sauna / HotTub React configurator
 * Version: 1.1.0
 * Author: WebOptim
 */

if (!defined('ABSPATH')) exit;

/* ----------------------------------------------------
 * WC bootstrap for REST
 * ---------------------------------------------------- */
function sauna_bootstrap_wc_for_rest() {
  if (!class_exists('WooCommerce')) return;

  if (function_exists('wc_load_cart')) {
    wc_load_cart();
  } else {
    WC()->frontend_includes();
    WC()->session = WC()->session ?: new WC_Session_Handler();
    WC()->session->init();
    WC()->customer = WC()->customer ?: new WC_Customer(get_current_user_id(), true);
    WC()->cart = WC()->cart ?: new WC_Cart();
  }
}

add_action('rest_api_init', 'sauna_bootstrap_wc_for_rest', 0);

/* ----------------------------------------------------
 * TRANSLATIONS
 * ---------------------------------------------------- */
function sauna_get_translations($lang = 'sk') {
  $translations = [
    'hu' => [
        // Combo
        'combo.window.none'                 => 'Ablak nélkül',
        'combo.window.1'                    => '1 ablak',
        'combo.window.2'                    => '2 ablak',
        'display.comboType'                 => 'Kombináció',
        'display.comboWindow'               => 'Ablakok',
        'combo.window.145x57'               => 'Ablak 145×57 cm',
        'combo.window.panoramic50'          => '50% panoráma ablak',
        'combo.window.round'                => 'Kerek ablak',
        'combo.window.back'                 => 'Hátsó ablak',

        // Kaďa / Pezsgőfürdő
        'hottub.size.size-1'                => '1,8 m belső / 2 m külső',
        'hottub.size.size-2'                => '2 m belső / 2,25 m külső',
        'hottub.wood.none'                  => 'Külső fa nélkül',
        'hottub.wood.spruce'                => 'Lucfenyő',
        'hottub.wood.thermo'                => 'Thermo fa',
        'hottub.wood.wpc'                   => 'WPC műanyag',
        'hottub.wood.acryl-white'           => 'Fehér',
        'hottub.wood.grey'                  => 'Szürke',
        'hottub.wood.black-marble'          => 'Fekete (márvány utánzat)',
        'hottub.wood.blue-marble'           => 'Kék (márvány utánzat)',
        'display.exteriorWood'              => 'Külső fa',
        'hottub.heater.none'                => 'Fűtés nélkül',
        'hottub.heater.external-aisi304'    => 'Külső kályha AISI304 35 kW',
        'hottub.heater.integrated-aisi316'  => 'Beépített kályha AISI316',
        'hottub.heater.electric-3kw'        => 'Elektromos vízmelegítő 3 kW',
        'hottub.heater.electric-6kw'        => 'Elektromos vízmelegítő 6 kW',
        'display.hottubHeater'              => 'Kályha',
        'hottub.cover.200cm'                => '200 cm',
        'hottub.cover.230cm'                => '230 cm',
        'hottub.cover.standard'             => 'Standard fedél',
        'hottub.coverColor.black'           => 'Fekete',
        'hottub.coverColor.grey'            => 'Szürke',
        'hottub.underwaterLed.none'         => 'Víz alatti LED nélkül',
        'hottub.underwaterLed.1pc'          => 'Víz alatti LED 1 db',
        'hottub.underwaterLed.3pc'          => 'Víz alatti LED 3 db',
        'hottub.exteriorLed.none'           => 'Kád körüli LED nélkül',
        'hottub.exteriorLed.yes'            => 'LED világítás a kád körül',
        'display.underwaterLed'             => 'Víz alatti LED',
        'display.hottubExteriorLed'         => 'LED a kád körül',
        'hottub.airBubbles.none'            => 'Légbuborékok nélkül',
        'hottub.airBubbles.yes'             => 'Légbuborékok – 12 fúvóka',
        'hottub.drainRelay.none'            => 'Áramvédő kapcsoló nélkül',
        'hottub.drainRelay.yes'             => 'Áramvédő kapcsoló 25 A',
        'hottub.sandFilter.none'            => 'Homokszűrő nélkül',
        'hottub.sandFilter.yes'             => 'Homokszűrő',
        'hottub.electronicController.none'  => 'Elektronikus vezérlő nélkül',
        'hottub.electronicController.yes'   => 'Beépített elektronikus vezérlő',
        'hottub.thermometer.none'           => 'Hőmérő nélkül',
        'hottub.thermometer.yes'            => 'Beépített elektronikus hőmérő',
        'hottub.bluetoothSpeaker.none'      => 'Bluetooth nélkül',
        'hottub.bluetoothSpeaker.yes'       => 'Bluetooth hangszóró',
        'hottub.headCushion.none'           => 'Párna nélkül',
        'hottub.headCushion.yes'            => 'Fejpárna 4 db',
        'display.airBubbles'                => 'Légbuborékok',
        'display.drainRelay'                => 'Áramvédő kapcsoló',
        'display.sandFilter'                => 'Homokszűrő',
        'display.electronicController'      => 'Elektronikus vezérlő',
        'display.thermometer'               => 'Hőmérő',
        'display.bluetoothSpeaker'          => 'Bluetooth hangszóró',
        'display.headCushion'               => 'Fejpárna',

        // Sauna options
        'display.window'                    => 'Ablak',
        'display.mirrorFilm'                => 'Tükörfólia az ablakokra',
        'display.metalBands'                => 'Fémpántok',
        'display.bench'                     => 'Padok',
        'window.none'                       => 'Ablak nélkül',
        'window.panoramic_roof'             => 'Panoráma tetőablak',
        'mirror.none'                       => 'Fólia nélkül',
        'mirror.yes'                        => 'Tükörfólia az ablakokra',
        'metal.none'                        => 'Fémpántok nélkül',
        'metal.yes'                         => 'Fém merevítő pántok',
        'bench.standard'                    => 'Egyszintes padok a szauna oldalain',
        'bench.lshape'                      => 'L-alakú padok',
        'wood.spruce'                       => 'Lucfenyő',
        'wood.thermo'                       => 'Thermo fa',
        'heater.none'                       => 'Kályha nélkül',
        'heater.electric'                   => 'Elektromos kályha',
        'heater.wood'                       => 'Fatüzelésű kályha',
        'led.none'                          => 'LED nélkül',
        'led.benches'                       => 'LED a padok alatt',
        'led.backrest'                      => 'LED a háttámlákban',
        'bluetooth.none'                    => 'Bluetooth nélkül',
        'bluetooth.yes'                     => 'Bluetooth hangszóró',
        'kit.none'                          => 'Szauna szett nélkül',
        'kit.yes'                           => 'Szauna szett',
        'color.none'                        => 'Szín nélkül',
        'color.1-mahagon'                   => 'Mahagóni',
        'color.2-teak'                      => 'Tík',
        'color.3-svetly-orech'              => 'Világos dió',
        'color.4-zlaty-dub'                 => 'Aranytölgy',
        'color.5-olejovana-borovica'        => 'Olajozott fenyő',
        'color.14-svetla-popolavosiva'      => 'Világos hamuszürke',
        'color.15-greige'                   => 'Greige',
        'color.16-studena-siva'             => 'Hideg szürke',
        'color.17-antracit'                 => 'Antracit',
        'color.18-tmavy-orech'              => 'Sötét dió',
        'color.20-tmavy-mahagon'            => 'Sötét mahagóni',
        'exteriorLed'                       => 'Külső LED világítás',

        // Hot tub (legacy)
        'hottub.size.standard'              => 'Standard (4 fő)',
        'hottub.size.large'                 => 'Nagy (6 fő)',
        'hottub.size.xl'                    => 'XL (8 fő)',
        'hottub.jets.none'                  => 'Fúvókák nélkül',
        'hottub.jets.basic'                 => 'Alap fúvókák',
        'hottub.jets.massage'               => 'Masszázs fúvókák',
        'hottub.led.none'                   => 'LED nélkül',
        'hottub.led.underwater'             => 'Víz alatti LED',
        'hottub.led.rgb'                    => 'RGB LED',
        'hottub.cover.none'                 => 'Fedél nélkül',
        'hottub.cover.premium'              => 'Prémium fedél',
        'hottub.color.none'                 => 'Természetes',
        'hottub.color.dark'                 => 'Sötét',
        'hottub.color.light'                => 'Világos',

        // Display labels
        'display.saunaType'                 => 'Szauna típusa',
        'display.wood'                      => 'Fa',
        'display.heater'                    => 'Kályha',
        'display.heaterModel'               => 'Kályha modell',
        'display.exteriorLed'               => 'Külső LED',
        'display.led'                       => 'LED',
        'display.bluetooth'                 => 'Bluetooth',
        'display.kit'                       => 'Szauna szett',
        'display.color'                     => 'Szín',
        'display.product'                   => 'Termék',
        'display.hottub'                    => 'Pezsgőfürdő',

        // Errors
        'error.invalidSaunaType'            => 'Érvénytelen szauna típus',
        'error.invalidWood'                 => 'Érvénytelen fa típus',
        'error.invalidHeaterModel'          => 'Érvénytelen kályha modell',
        'error.invalidProductType'          => 'Érvénytelen terméktípus',
        'error.invalidProductId'            => 'Érvénytelen product_id az adott terméktípushoz',
        'config.alt'                        => 'Konfiguráció',
        ],

    'sk' => [
      // Combo
      'combo.window.none' => 'Bez okna',
      'combo.window.1' => '1 okno',
      'combo.window.2' => '2 okná',
      'display.comboType' => 'Kombinácia',
      'display.comboWindow' => 'Okná',
      'combo.window.145x57' => 'Okno 145×57cm',
      'combo.window.panoramic50' => '50% panoramatické okno',
      'combo.window.round' => 'Guľaté okno',
      'combo.window.back' => 'Okno vzadu',


      //Kae
      'hottub.size.size-1' => '1.8m vnút. / 2m vonk.',
      'hottub.size.size-2' => '2m vnút. / 2.25m vonk.',
      'hottub.wood.none' => 'Bez vonkajšieho dreva',
      'hottub.wood.spruce' => 'Smrekové drevo',
      'hottub.wood.thermo' => 'Thermo wood',
      'hottub.wood.wpc' => 'WPC plast',
      'hottub.wood.acryl-white' => 'Biela',
      'hottub.wood.grey' => 'Šedá',
      'hottub.wood.black-marble' => 'Čierna (imitácia mramoru)',
      'hottub.wood.blue-marble' => 'Modrá (imitácia mramoru)',
      'display.exteriorWood' => 'Vonkajšie drevo',
      'hottub.heater.none' => 'Bez ohrievača',
      'hottub.heater.external-aisi304' => 'Externý ohrievač AISI304 35kW',
      'hottub.heater.integrated-aisi316' => 'Integrovaný ohrievač AISI316',
      'hottub.heater.electric-3kw' => 'Elektrický ohrievač 3kW',
      'hottub.heater.electric-6kw' => 'Elektrický ohrievač 6kW',
      'display.hottubHeater' => 'Ohrievač',
      'hottub.cover.200cm' => '200cm',
      'hottub.cover.230cm' => '230cm',
      'hottub.cover.standard' => 'Štandardný kryt',
      'hottub.coverColor.black' => 'Čierna',
      'hottub.coverColor.grey' => 'Sivá',
      'hottub.underwaterLed.none' => 'Bez podvodného LED',
      'hottub.underwaterLed.1pc' => 'Podvodné LED 1 kus',
      'hottub.underwaterLed.3pc' => 'Podvodné LED 3 kusy',
      'hottub.exteriorLed.none' => 'Bez LED okolo kade',
      'hottub.exteriorLed.yes' => 'LED osvetlenie okolo kade',
      'display.underwaterLed' => 'Podvodné LED',
      'display.hottubExteriorLed' => 'LED okolo kade',
      'hottub.airBubbles.none' => 'Bez vzduchových bublín',
      'hottub.airBubbles.yes' => 'Vzduchové bubliny – 12 trysiek',
      'hottub.drainRelay.none' => 'Bez prúdového ističa',
      'hottub.drainRelay.yes' => 'Prúdový istič 25A',
      'hottub.sandFilter.none' => 'Bez pieskového filtra',
      'hottub.sandFilter.yes' => 'Pieskový filter',
      'hottub.electronicController.none' => 'Bez elektronického kontroléra',
      'hottub.electronicController.yes' => 'Integrovaný elektronický kontrolér',
      'hottub.thermometer.none' => 'Bez teplomera',
      'hottub.thermometer.yes' => 'Integrovaný elektronický teplomer',
      'hottub.bluetoothSpeaker.none' => 'Bez Bluetooth',
      'hottub.bluetoothSpeaker.yes' => 'Bluetooth reproduktor',
      'hottub.headCushion.none' => 'Bez vankúša',
      'hottub.headCushion.yes' => 'Hlavový vankúš 4ks',
      // display labels
      'display.airBubbles' => 'Vzduchové bubliny',
      'display.drainRelay' => 'Prúdový istič',
      'display.sandFilter' => 'Pieskový filter',
      'display.electronicController' => 'Elektronický kontrolér',
      'display.thermometer' => 'Teplomer',
      'display.bluetoothSpeaker' => 'Bluetooth reproduktor',
      'display.headCushion' => 'Hlavový vankúš',

      // Sauna options
      'display.window' => 'Okno',
      'display.mirrorFilm' => 'Zrkadlová fólia na okná',
      'display.metalBands' => 'Kovové pásy',
      'display.bench' => 'Lavice',
      'window.none' => 'Bez okna',
      'window.panoramic_roof' => 'Panoramatické okno – strecha',
      'mirror.none' => 'Bez fólie',
      'mirror.yes' => 'Zrkadlová fólia na okná',
      'metal.none' => 'Bez kovových pásov',
      'metal.yes' => 'Kovové spevňovacie pásy',
      'bench.standard' => 'Jednoposchodové lavice po stranách sauny',
      'bench.lshape' => 'L-kové lavice',
      'wood.spruce' => 'Smrekové drevo',
      'wood.thermo' => 'Thermo wood',
      'heater.none' => 'Bez pece',
      'heater.electric' => 'Elektrická pec',
      'heater.wood' => 'Pec na drevo',
      'led.none' => 'Bez LED',
      'led.benches' => 'LED pod lavičkami',
      'led.backrest' => 'LED v operadlách',
      'bluetooth.none' => 'Bez Bluetooth',
      'bluetooth.yes' => 'Bluetooth reproduktor',
      'kit.none' => 'Bez saunovej sady',
      'kit.yes' => 'Saunová sada',
      'color.none' => 'Bez farby',
      'color.1-mahagon' => 'Mahagón',
      'color.2-teak' => 'Teak',
      'color.3-svetly-orech' => 'Svetlý orech',
      'color.4-zlaty-dub' => 'Zlatý dub',
      'color.5-olejovana-borovica' => 'Olejovaná borovica',
      'color.14-svetla-popolavosiva' => 'Svetlá popolavosivá',
      'color.15-greige' => 'Greige',
      'color.16-studena-siva' => 'Studená sivá',
      'color.17-antracit' => 'Antracit',
      'color.18-tmavy-orech' => 'Tmavý orech',
      'color.20-tmavy-mahagon' => 'Tmavý mahagón',
      'exteriorLed' => 'Vonkajšie LED osvetlenie',
      // Hot tub
      'hottub.size.standard' => 'Štandard (4 osoby)',
      'hottub.size.large' => 'Veľká (6 osôb)',
      'hottub.size.xl' => 'XL (8 osôb)',
      'hottub.jets.none' => 'Bez trysiek',
      'hottub.jets.basic' => 'Základné trysky',
      'hottub.jets.massage' => 'Masážne trysky',
      'hottub.led.none' => 'Bez LED',
      'hottub.led.underwater' => 'Podvodné LED',
      'hottub.led.rgb' => 'RGB LED',
      'hottub.cover.none' => 'Bez krytu',
      'hottub.cover.standard' => 'Štandardný kryt',
      'hottub.cover.premium' => 'Prémiový kryt',
      'hottub.color.none' => 'Prírodná',
      'hottub.color.dark' => 'Tmavá',
      'hottub.color.light' => 'Svetlá',
      // Display labels
      'display.saunaType' => 'Typ sauny',
      'display.wood' => 'Drevo',
      'display.heater' => 'Pec',
      'display.heaterModel' => 'Model pece',
      'display.exteriorLed' => 'Vonkajšie LED',
      'display.led' => 'LED',
      'display.bluetooth' => 'Bluetooth',
      'display.kit' => 'Saunová sada',
      'display.color' => 'Farba',
      'display.product' => 'Produkt',
      'display.hottub' => 'Kaďa',
      // Errors
      'error.invalidSaunaType' => 'Neplatný typ sauny',
      'error.invalidWood' => 'Neplatný typ dreva',
      'error.invalidHeaterModel' => 'Neplatný model ohrievača',
      'error.invalidProductType' => 'Neplatný typ produktu',
      'error.invalidProductId' => 'Neplatný product_id pre daný typ produktu',
      'config.alt' => 'Konfigurácia',
    ],
    'en' => [
      // Combo
      'combo.window.none' => 'No window',
      'combo.window.1' => '1 window',
      'combo.window.2' => '2 windows',
      'display.comboType' => 'Combo',
      'display.comboWindow' => 'Windows',
      'combo.window.145x57' => 'Window 145×57cm',
      'combo.window.panoramic50' => '50% panoramic window',
      'combo.window.round' => 'Round window',
      'combo.window.back' => 'Window at the back',


      //kade
      'hottub.size.size-1' => '1.8m inner / 2m outer',
      'hottub.size.size-2' => '2m inner / 2.25m outer',
      'hottub.wood.none' => 'No Exterior Wood',
      'hottub.wood.spruce' => 'Spruce Wood',
      'hottub.wood.thermo' => 'Thermo Wood',
      'hottub.wood.wpc' => 'WPC Plastic',
      'hottub.wood.acryl-white' => 'White',
      'hottub.wood.grey' => 'Grey',
      'hottub.wood.black-marble' => 'Black (Marble Imitation)',
      'hottub.wood.blue-marble' => 'Blue (Marble Imitation)',
      'display.exteriorWood' => 'Exterior Wood', 
      'hottub.heater.none' => 'No Heater',
      'hottub.heater.external-aisi304' => 'External Heater AISI304 35kW',
      'hottub.heater.integrated-aisi316' => 'Integrated Heater AISI316',
      'hottub.heater.electric-3kw' => 'Electric Water Heater 3kW',
      'hottub.heater.electric-6kw' => 'Electric Water Heater 6kW',
      'display.hottubHeater' => 'Heater',
      'hottub.cover.200cm' => '200cm',
      'hottub.cover.230cm' => '230cm',
      'hottub.cover.standard' => 'Standard cover',
      'hottub.coverColor.black' => 'Black',
      'hottub.coverColor.grey' => 'Grey',
      'hottub.underwaterLed.none' => 'No Underwater LED',
      'hottub.underwaterLed.1pc' => 'Underwater LED 1 piece',
      'hottub.underwaterLed.3pc' => 'Underwater LED 3 pieces',
      'hottub.exteriorLed.none' => 'No LED Around the Tub',
      'hottub.exteriorLed.yes' => 'LED Lighting Around the Tub',
      'display.underwaterLed' => 'Underwater LED',
      'display.hottubExteriorLed' => 'LED Around Tub',
      'hottub.airBubbles.none' => 'Without air bubbles',
      'hottub.airBubbles.yes' => 'Air bubbles – 12 nozzles',
      'hottub.drainRelay.none' => 'Without drain relay',
      'hottub.drainRelay.yes' => 'Current drain relay 25A',
      'hottub.sandFilter.none' => 'Without sand filter',
      'hottub.sandFilter.yes' => 'Sand filter',
      'hottub.electronicController.none' => 'Without electronic controller',
      'hottub.electronicController.yes' => 'Integrated electronic controller',
      'hottub.thermometer.none' => 'Without thermometer',
      'hottub.thermometer.yes' => 'Integrated electronic thermometer',
      'hottub.bluetoothSpeaker.none' => 'Without Bluetooth',
      'hottub.bluetoothSpeaker.yes' => 'Bluetooth speaker system',
      'hottub.headCushion.none' => 'Without cushion',
      'hottub.headCushion.yes' => 'Head cushion 4pcs',
      'display.airBubbles' => 'Air Bubbles',
      'display.drainRelay' => 'Drain Relay',
      'display.sandFilter' => 'Sand Filter',
      'display.electronicController' => 'Electronic Controller',
      'display.thermometer' => 'Thermometer',
      'display.bluetoothSpeaker' => 'Bluetooth Speaker',
      'display.headCushion' => 'Head Cushion',

      // Sauna options
      'display.window' => 'Window',
      'display.mirrorFilm' => 'Mirror film for windows',
      'display.metalBands' => 'Metal Bands',
      'display.bench' => 'Benches',
      'window.none' => 'No window',
      'window.panoramic_roof' => 'Panoramic roof window',
      'mirror.none' => 'No film',
      'mirror.yes' => 'Mirror film for windows',
      'metal.none' => 'No metal bands',
      'metal.yes' => 'Metal tightening bands',
      'bench.standard' => 'One-story benches on the sides of the sauna',
      'bench.lshape' => 'L-shaped benches',
      'wood.spruce' => 'Spruce Wood',
      'wood.thermo' => 'Thermo Wood',
      'heater.none' => 'No Heater',
      'heater.electric' => 'Electric Heater',
      'heater.wood' => 'Wood Heater',
      'led.none' => 'No LED',
      'led.benches' => 'LED Under Benches',
      'led.backrest' => 'LED in Backrests',
      'bluetooth.none' => 'No Bluetooth',
      'bluetooth.yes' => 'Bluetooth Speaker',
      'kit.none' => 'No Sauna Kit',
      'kit.yes' => 'Sauna Kit',
      'color.none' => 'No Color',
      'color.1-mahagon' => 'Mahogany',
      'color.2-teak' => 'Teak',
      'color.3-svetly-orech' => 'Light Walnut',
      'color.4-zlaty-dub' => 'Golden Oak',
      'color.5-olejovana-borovica' => 'Oiled Pine',
      'color.14-svetla-popolavosiva' => 'Light Ash Grey',
      'color.15-greige' => 'Greige',
      'color.16-studena-siva' => 'Cold Grey',
      'color.17-antracit' => 'Anthracite',
      'color.18-tmavy-orech' => 'Dark Walnut',
      'color.20-tmavy-mahagon' => 'Dark Mahogany',
      'exteriorLed' => 'Exterior LED Lighting',
      // Hot tub
      'hottub.size.standard' => 'Standard (4 persons)',
      'hottub.size.large' => 'Large (6 persons)',
      'hottub.size.xl' => 'XL (8 persons)',
      'hottub.jets.none' => 'No Jets',
      'hottub.jets.basic' => 'Basic Jets',
      'hottub.jets.massage' => 'Massage Jets',
      'hottub.led.none' => 'No LED',
      'hottub.led.underwater' => 'Underwater LED',
      'hottub.led.rgb' => 'RGB LED',
      'hottub.cover.none' => 'No Cover',
      'hottub.cover.standard' => 'Standard Cover',
      'hottub.cover.premium' => 'Premium Cover',
      'hottub.color.none' => 'Natural',
      'hottub.color.dark' => 'Dark',
      'hottub.color.light' => 'Light',
      // Display labels
      'display.saunaType' => 'Sauna Type',
      'display.wood' => 'Wood',
      'display.heater' => 'Heater',
      'display.heaterModel' => 'Heater Model',
      'display.exteriorLed' => 'Exterior LED',
      'display.led' => 'LED',
      'display.bluetooth' => 'Bluetooth',
      'display.kit' => 'Sauna Kit',
      'display.color' => 'Color',
      'display.product' => 'Product',
      'display.hottub' => 'Hot Tub',
      // Errors
      'error.invalidSaunaType' => 'Invalid sauna type',
      'error.invalidWood' => 'Invalid wood type',
      'error.invalidHeaterModel' => 'Invalid heater model',
      'error.invalidProductType' => 'Invalid product type',
      'error.invalidProductId' => 'Invalid product_id for given product type',
      'config.alt' => 'Configuration',
    ],
  ];

  return $translations[$lang] ?? $translations['sk'];
}

function sauna_t($key, $lang = 'sk') {
  $t = sauna_get_translations($lang);
  return $t[$key] ?? $key;
}

/* ----------------------------------------------------
 * CONFIG – SINGLE SOURCE OF TRUTH
 * ---------------------------------------------------- */
function sauna_get_config($lang = 'sk') {

  return [

    /* Woo product IDs */
    'products' => [
      'sauna'   => 96,
      'hottub'  => 543,
      'combo'   => 1541,
    ],

    /* ---------------- SAUNA TYPES ---------------- */
    'saunaTypes' => [
        'arctic-pod' => [
            'label' => 'Arctic Pod',
            'basePrice' => 5050,
            'dimensions' => '400×242cm',
            'woodTypes' => ['spruce', 'thermo'],
            'woodTypePrices' => ['spruce' => 0, 'thermo' => 1400],
            'hasWoodType' => true,
            'hasExteriorLed' => true,
            'hasLed' => true,
            'allowedLedOptions' => ['benches'],
            'hasBluetooth' => true,
            'hasAccessoryKit' => true,
            'hasHeater' => true,
            'hasColor' => false,
            'hasWindow' => true,
            'hasMirrorFilm' => false,
            'hasMetalBands' => false,
            'hasBenchOptions' => false,
        ],
        'arctic-cabin' => [
            'label' => 'Arctic Cabin',
            'basePrice' => 7150,
            'dimensions' => '400×242cm',
            'woodTypes' => ['spruce', 'thermo'],
            'woodTypePrices' => ['spruce' => 0, 'thermo' => 1800],
            'hasWoodType' => true,
            'hasExteriorLed' => true,
            'hasLed' => true,
            'hasBluetooth' => true,
            'hasAccessoryKit' => true,
            'hasHeater' => true,
            'hasColor' => false,
            'hasWindow' => false,
            'hasMirrorFilm' => true,
            'hasMetalBands' => true,
            'hasBenchOptions' => true,
        ],
        'arctic-shell-glass' => [
            'label' => 'Arctic Shell Glass',
            'basePrice' => 7419,
            'dimensions' => '245×300cm',
            'woodTypes' => ['spruce', 'thermo'],
            'woodTypePrices' => ['spruce' => 0, 'thermo' => 1990],
            'hasWoodType' => true,
            'hasExteriorLed' => true,
            'hasLed' => true,
            'hasBluetooth' => true,
            'hasAccessoryKit' => true,
            'hasHeater' => true,
            'hasColor' => false,
            'hasWindow' => false,
            'hasMirrorFilm' => false,
            'hasMetalBands' => false,
            'hasBenchOptions' => false,
        ],
        'nordic-barrel' => [
            'label' => 'Nordic Barrel',
            'basePrice' => 7800,
            'dimensions' => '260cm Ø240cm',
            'woodTypes' => ['thermo'],
            'woodTypePrices' => ['thermo' => 0],
            'hasWoodType' => true,
            'hasExteriorLed' => true,
            'hasLed' => true,
            'hasBluetooth' => true,
            'hasAccessoryKit' => true,
            'hasHeater' => true,
            'hasColor' => false,
            'hasWindow' => false,
            'hasMirrorFilm' => false,
            'hasMetalBands' => true,
            'hasBenchOptions' => false,
        ],
        'nordic-frame' => [
            'label' => 'Nordic Frame',
            'basePrice' => 8179,
            'dimensions' => '210x210cm',
            'woodTypes' => ['thermo'],
            'woodTypePrices' => ['thermo' => 0],
            'hasWoodType' => true,
            'hasExteriorLed' => false,
            'hasLed' => true,
            'hasBluetooth' => true,
            'hasAccessoryKit' => true,
            'hasHeater' => true,
            'hasColor' => true,
            'hasWindow' => false,
            'hasMirrorFilm' => false,
            'hasMetalBands' => false,
            'hasBenchOptions' => false,
        ],
        'aurora-cube' => [
            'label' => 'Aurora Cube',
            'basePrice' => 7329,
            'dimensions' => '240x250cm',
            'woodTypes' => ['thermo'],
            'woodTypePrices' => ['thermo' => 0],
            'hasWoodType' => true,
            'hasExteriorLed' => true,
            'hasLed' => true,
            'hasBluetooth' => true,
            'hasAccessoryKit' => true,
            'hasHeater' => true,
            'hasColor' => true,
            'hasWindow' => false,
            'hasMirrorFilm' => false,
            'hasMetalBands' => false,
            'hasBenchOptions' => false,
        ],
        'arctic-shell' => [
            'label' => 'Arctic Shell',
            'basePrice' => 7069,
            'dimensions' => '245x300cm',
            'woodTypes' => ['spruce', 'thermo'],
            'woodTypePrices' => ['spruce' => 0, 'thermo' => 1990],
            'hasWoodType' => true,
            'hasExteriorLed' => true,
            'hasLed' => true,
            'hasBluetooth' => true,
            'hasAccessoryKit' => true,
            'hasHeater' => true,
            'hasColor' => true,
            'hasWindow' => false,
            'hasMirrorFilm' => false,
            'hasMetalBands' => false,
            'hasBenchOptions' => false,
        ],
        'forest-barrel' => [
            'label' => 'Forest Barrel',
            'basePrice' => 4449,
            'dimensions' => '200xØ200cm',
            'woodTypes' => ['spruce', 'thermo'],
            'woodTypePrices' => ['spruce' => 0, 'thermo' => 1149],
            'hasWoodType' => true,
            'hasExteriorLed' => false,
            'hasLed' => true,
            'hasBluetooth' => true,
            'hasAccessoryKit' => true,
            'hasHeater' => true,
            'hasColor' => true,
            'hasWindow' => false,
            'hasMirrorFilm' => false,
            'hasMetalBands' => false,
            'hasBenchOptions' => false,
        ],
        'nordic-harmony' => [
            'label' => 'Nordic Harmony',
            'basePrice' => 17500,
            'dimensions' => '280×500cm',
            'woodTypes' => ['spruce'],
            'woodTypePrices' => ['spruce' => 0],
            'hasWoodType' => false,
            'hasExteriorLed' => false,
            'hasLed' => false,
            'hasBluetooth' => true,
            'hasAccessoryKit' => true,
            'hasHeater' => true,
            'hasColor' => true,
            'hasWindow' => false,
            'hasMirrorFilm' => false,
            'hasMetalBands' => false,
            'hasBenchOptions' => false,
        ],
    ],

    /* -------- HEATER MODELS -------- */
    'heaterModels' => [
      'electric' => [
        'harvia-top-steel-9kw' => ['label'=>'Harvia Top Steel 9kW','price'=>569],
        'harvia-cilindro-9kw' => ['label'=>'Harvia Cilindro 9kW','price'=>739],
        'harvia-legend-wifi' => ['label'=>'Harvia Legend WiFi','price'=>1789],
      ],
      'wood' => [
        'harvia-m3' => ['label'=>'Harvia M3','price'=>659],
        'harvia-pro-blmschv' => ['label'=>'Harvia Pro BlmSchV','price'=>1069],
        'harvia-legend-240' => ['label'=>'Harvia Legend 240','price'=>1849],
      ],
    ],

    /* -------- EXTERIOR LED -------- */
    'exteriorLed' => [
      'label' => sauna_t('exteriorLed', $lang),
      'price' => 289,
    ],

    /* ---------------- SAUNA OPTIONS ---------------- */
    'sauna' => [
      'woodTypes' => [
        'spruce' => ['label' => sauna_t('wood.spruce', $lang), 'price' => 0],
        'thermo' => ['label' => sauna_t('wood.thermo', $lang), 'price' => 0],
      ],

      'heaterTypes' => [
        'none'     => ['label' => sauna_t('heater.none', $lang), 'price' => 0],
        'electric' => ['label' => sauna_t('heater.electric', $lang), 'price' => 0],
        'wood'     => ['label' => sauna_t('heater.wood', $lang), 'price' => 0],
      ],

      'ledOptions' => [
        'none'     => ['label' => sauna_t('led.none', $lang), 'price' => 0],
        'benches'  => ['label' => sauna_t('led.benches', $lang), 'price' => 289],
        'backrest' => ['label' => sauna_t('led.backrest', $lang), 'price' => 289],
      ],

      'bluetoothOptions' => [
        'none'      => ['label' => sauna_t('bluetooth.none', $lang), 'price' => 0],
        'bluetooth' => ['label' => sauna_t('bluetooth.yes', $lang), 'price' => 289],
      ],

      'accessoryKitOptions' => [
        'none' => ['label' => sauna_t('kit.none', $lang), 'price' => 0],
        'kit'  => ['label' => sauna_t('kit.yes', $lang), 'price' => 99],
      ],

      'colorOptions' => [
        'none' => ['label' => sauna_t('color.none', $lang), 'price' => 0],
        '1-mahagon' => ['label' => sauna_t('color.1-mahagon', $lang), 'price' => 0],
        '2-teak' => ['label' => sauna_t('color.2-teak', $lang), 'price' => 0],
        '3-svetly-orech' => ['label' => sauna_t('color.3-svetly-orech', $lang), 'price' => 0],
        '4-zlaty-dub' => ['label' => sauna_t('color.4-zlaty-dub', $lang), 'price' => 0],
        '5-olejovana-borovica' => ['label' => sauna_t('color.5-olejovana-borovica', $lang), 'price' => 0],
        '14-svetla-popolavosiva' => ['label' => sauna_t('color.14-svetla-popolavosiva', $lang), 'price' => 0],
        '15-greige' => ['label' => sauna_t('color.15-greige', $lang), 'price' => 0],
        '16-studena-siva' => ['label' => sauna_t('color.16-studena-siva', $lang), 'price' => 0],
        '17-antracit' => ['label' => sauna_t('color.17-antracit', $lang), 'price' => 0],
        '18-tmavy-orech' => ['label' => sauna_t('color.18-tmavy-orech', $lang), 'price' => 0],
        '20-tmavy-mahagon' => ['label' => sauna_t('color.20-tmavy-mahagon', $lang), 'price' => 0],
      ],

        'windowOptions' => [
            'none' => ['label' => sauna_t('window.none', $lang), 'price' => 0],
            'panoramic-roof' => ['label' => sauna_t('window.panoramic_roof', $lang), 'price' => 740],
        ],

        'mirrorFilmOptions' => [
            'none' => ['label' => sauna_t('mirror.none', $lang), 'price' => 0],
            'yes'  => ['label' => sauna_t('mirror.yes', $lang), 'price' => 450],
        ],

        'metalBandsOptions' => [
            'none' => ['label' => sauna_t('metal.none', $lang), 'price' => 0],
            'yes'  => ['label' => sauna_t('metal.yes', $lang), 'price' => 149],
        ],

        'benchOptions' => [
            'standard' => ['label' => sauna_t('bench.standard', $lang), 'price' => 0],
            'lshape'   => ['label' => sauna_t('bench.lshape', $lang), 'price' => 280],
        ],    
      
    ],

    /* ---------------- HOTTUB ---------------- */
    'hottub' => [
      'coverColorOptions' => [
          'black' => ['label' => sauna_t('hottub.coverColor.black', $lang), 'price' => 0],
          'grey'  => ['label' => sauna_t('hottub.coverColor.grey', $lang),  'price' => 0],
      ],
      'airBubblesOptions' => [
        'none' => ['label' => sauna_t('hottub.airBubbles.none', $lang), 'price' => 0],
        'yes'  => ['label' => sauna_t('hottub.airBubbles.yes', $lang), 'price' => 380],
      ],
      'drainRelayOptions' => [
          'none' => ['label' => sauna_t('hottub.drainRelay.none', $lang), 'price' => 0],
          'yes'  => ['label' => sauna_t('hottub.drainRelay.yes', $lang), 'price' => 80],
      ],
      'sandFilterOptions' => [
          'none' => ['label' => sauna_t('hottub.sandFilter.none', $lang), 'price' => 0],
          'yes'  => ['label' => sauna_t('hottub.sandFilter.yes', $lang), 'price' => 550],
      ],
      'electronicControllerOptions' => [
          'none' => ['label' => sauna_t('hottub.electronicController.none', $lang), 'price' => 0],
          'yes'  => ['label' => sauna_t('hottub.electronicController.yes', $lang), 'price' => 200],
      ],
      'thermometerOptions' => [
          'none' => ['label' => sauna_t('hottub.thermometer.none', $lang), 'price' => 0],
          'yes'  => ['label' => sauna_t('hottub.thermometer.yes', $lang), 'price' => 70],
      ],
      'bluetoothSpeakerOptions' => [
          'none' => ['label' => sauna_t('hottub.bluetoothSpeaker.none', $lang), 'price' => 0],
          'yes'  => ['label' => sauna_t('hottub.bluetoothSpeaker.yes', $lang), 'price' => 330],
      ],
      'headCushionOptions' => [
          'none' => ['label' => sauna_t('hottub.headCushion.none', $lang), 'price' => 0],
          'yes'  => ['label' => sauna_t('hottub.headCushion.yes', $lang), 'price' => 100],
      ],
      'hottubTypes' => [
          'arctic-ritual' => [
              'label' => 'Arctic Ritual',
              'basePrice' => 2599,
              'dimensions' => 'Ø200cm',
              'hasSize' => true,
              'hasExteriorWood' => true,
              'hasJets' => true, 'hasLed' => true, 'hasCover' => true, 'hasColor' => true,
              'sizeOptions' => [
                  'size-1' => ['label' => '1.8m vnútorná / 2m vonkajšia', 'price' => 0],
                  'size-2' => ['label' => '2m vnútorná / 2.25m vonkajšia', 'price' => 350],
              ],
              'exteriorWoodOptions' => [
                  'none'         => ['label' => sauna_t('hottub.wood.none', $lang), 'price' => 0],
                  'spruce'       => ['label' => sauna_t('hottub.wood.spruce', $lang), 'price' => 0],
                  'thermo'       => ['label' => sauna_t('hottub.wood.thermo', $lang), 'price' => 230],
                  'wpc'          => ['label' => sauna_t('hottub.wood.wpc', $lang), 'price' => 170],
                  'acryl-white'  => ['label' => sauna_t('hottub.wood.acryl-white', $lang), 'price' => 0],
                  'grey'         => ['label' => sauna_t('hottub.wood.grey', $lang), 'price' => 0],
                  'black-marble' => ['label' => sauna_t('hottub.wood.black-marble', $lang), 'price' => 240],
                  'blue-marble'  => ['label' => sauna_t('hottub.wood.blue-marble', $lang), 'price' => 240],
              ],
              'hasHeater' => true,
              'heaterOptions' => [
                  'none' => ['label' => sauna_t('hottub.heater.none', $lang), 'price' => 0],
                  'external-aisi316' => ['label' => sauna_t('hottub.heater.integrated-aisi316', $lang), 'price' => 850],
                  'electric-3kw'     => ['label' => sauna_t('hottub.heater.electric-3kw', $lang), 'price' => 400],
                  'electric-6kw'     => ['label' => sauna_t('hottub.heater.electric-6kw', $lang), 'price' => 400],
              ],
              'coverOptions' => [
                  'none' => ['label' => sauna_t('hottub.cover.none', $lang), 'price' => 0],
                  '200cm' => ['label' => sauna_t('hottub.cover.200cm', $lang), 'price' => 335],
                  '230cm' => ['label' => sauna_t('hottub.cover.230cm', $lang), 'price' => 375],
              ],
              'hasCover' => true,
              'hasCoverColor' => true,
              'hasUnderwaterLed' => true,
              'underwaterLedOptions' => [
                  'none' => ['label' => sauna_t('hottub.underwaterLed.none', $lang), 'price' => 0],
                  '1pc'  => ['label' => sauna_t('hottub.underwaterLed.1pc', $lang), 'price' => 55],
                  '3pc'  => ['label' => sauna_t('hottub.underwaterLed.3pc', $lang), 'price' => 162],
              ],
              'hasExteriorLed' => true,
              'exteriorLedOptions' => [
                  'none' => ['label' => sauna_t('hottub.exteriorLed.none', $lang), 'price' => 0],
                  'yes'  => ['label' => sauna_t('hottub.exteriorLed.yes', $lang), 'price' => 200],
              ],
              'hasHydroMassage' => true,
              'hydroMassageOptions' => [
                  ['id' => 'none', 'label' => $lang === 'en' ? 'Without' : 'Bez', 'price' => 0],
                  ['id' => '1.1kw-8', 'label' => '1.1kW – 8 trysiek', 'price' => 390],
                  ['id' => '2.0kw-12', 'label' => '2.0kW – 12 trysiek', 'price' => 540],
              ],
          ],
          'nordic-forge' => [
              'label' => 'Nordic Forge',
              'basePrice' => 3290,
              'dimensions' => '220×220cm',
              'hasSize' => false,
              'hasExteriorWood' => true,
              'sizeOptions' => [],
              'exteriorWoodOptions' => [
                  'none'         => ['label' => sauna_t('hottub.wood.none', $lang), 'price' => 0],
                  'spruce'       => ['label' => sauna_t('hottub.wood.spruce', $lang), 'price' => 0],
                  'thermo'       => ['label' => sauna_t('hottub.wood.thermo', $lang), 'price' => 230],
                  'wpc'          => ['label' => sauna_t('hottub.wood.wpc', $lang), 'price' => 170],
                  'acryl-white'  => ['label' => sauna_t('hottub.wood.acryl-white', $lang), 'price' => 0],
                  'grey'         => ['label' => sauna_t('hottub.wood.grey', $lang), 'price' => 150],
                  'black-marble' => ['label' => sauna_t('hottub.wood.black-marble', $lang), 'price' => 240],
                  'blue-marble'  => ['label' => sauna_t('hottub.wood.blue-marble', $lang), 'price' => 240],
              ],
              'hasHeater' => true,
              'heaterOptions' => [
                  'none' => ['label' => sauna_t('hottub.heater.none', $lang), 'price' => 0],
                  'external-aisi304'   => ['label' => sauna_t('hottub.heater.external-aisi304', $lang), 'price' => 560],
                  'electric-3kw'       => ['label' => sauna_t('hottub.heater.electric-3kw', $lang), 'price' => 400],
                  'electric-6kw'       => ['label' => sauna_t('hottub.heater.electric-6kw', $lang), 'price' => 1100],
              ],
              'coverOptions' => [
                  'none' => ['label' => sauna_t('hottub.cover.none', $lang), 'price' => 0],
                  'standard' => ['label' => sauna_t('hottub.cover.standard', $lang), 'price' => 390],
              ],
              'hasCover' => true,
              'hasCoverColor' => true,
              'hasUnderwaterLed' => true,
              'underwaterLedOptions' => [
                  'none' => ['label' => sauna_t('hottub.underwaterLed.none', $lang), 'price' => 0],
                  '1pc'  => ['label' => sauna_t('hottub.underwaterLed.1pc', $lang), 'price' => 55],
                  '3pc'  => ['label' => sauna_t('hottub.underwaterLed.3pc', $lang), 'price' => 162],
              ],
              'hasExteriorLed' => true,
              'exteriorLedOptions' => [
                  'none' => ['label' => sauna_t('hottub.exteriorLed.none', $lang), 'price' => 0],
                  'yes'  => ['label' => sauna_t('hottub.exteriorLed.yes', $lang), 'price' => 200],
              ],
              'hasHydroMassage' => true,
              'hydroMassageOptions' => [
                  ['id' => 'none', 'label' => $lang === 'en' ? 'Without' : 'Bez', 'price' => 0],
                  ['id' => '1.1kw-8', 'label' => '1.1kW – 8 trysiek', 'price' => 390],
                  ['id' => '2.0kw-12', 'label' => '2.0kW – 12 trysiek', 'price' => 540],
              ],
          ],
          'arctic-ember' => [
              'label' => 'Nordic Ember',
              'basePrice' => 4119,
              'dimensions' => '245×245cm',
              'hasSize' => false,
              'hasExteriorWood' => true,
              'sizeOptions' => [],
              'exteriorWoodOptions' => [
                  'spruce'       => ['label' => sauna_t('hottub.wood.spruce', $lang), 'price' => 0],
                  'thermo'       => ['label' => sauna_t('hottub.wood.thermo', $lang), 'price' => 230],
                  'wpc'          => ['label' => sauna_t('hottub.wood.wpc', $lang), 'price' => 170],
                  'acryl-white'  => ['label' => sauna_t('hottub.wood.acryl-white', $lang), 'price' => 0],
                  'black-marble' => ['label' => sauna_t('hottub.wood.black-marble', $lang), 'price' => 240],
              ],
              'hasHeater' => true,
              'heaterOptions' => [
                  'none' => ['label' => sauna_t('hottub.heater.none', $lang), 'price' => 0],
                  'external-aisi316' => ['label' => sauna_t('hottub.heater.integrated-aisi316', $lang), 'price' => 850],
                  'electric-3kw'     => ['label' => sauna_t('hottub.heater.electric-3kw', $lang), 'price' => 400],
                  'electric-6kw'     => ['label' => sauna_t('hottub.heater.electric-6kw', $lang), 'price' => 1100],
              ],
              'coverOptions' => [
                  'none' => ['label' => sauna_t('hottub.cover.none', $lang), 'price' => 0],
                  'standard' => ['label' => sauna_t('hottub.cover.standard', $lang), 'price' => 460],
              ],
              'hasCover' => true,
              'hasCoverColor' => true,
              'hasUnderwaterLed' => true,
              'underwaterLedOptions' => [
                  'none' => ['label' => sauna_t('hottub.underwaterLed.none', $lang), 'price' => 0],
                  '1pc'  => ['label' => sauna_t('hottub.underwaterLed.1pc', $lang), 'price' => 55],
                  '3pc'  => ['label' => sauna_t('hottub.underwaterLed.3pc', $lang), 'price' => 162],
              ],
              'hasExteriorLed' => true,
              'exteriorLedOptions' => [
                  'none' => ['label' => sauna_t('hottub.exteriorLed.none', $lang), 'price' => 0],
                  'yes'  => ['label' => sauna_t('hottub.exteriorLed.yes', $lang), 'price' => 320],
              ],
              'hasHydroMassage' => true,
              'hydroMassageOptions' => [
                  ['id' => 'none', 'label' => $lang === 'en' ? 'Without' : 'Bez', 'price' => 0],
                  ['id' => '1.1kw-8', 'label' => '1.1kW – 8 trysiek', 'price' => 390],
                  ['id' => '2.0kw-12', 'label' => '2.0kW – 12 trysiek', 'price' => 540],
              ],
          ],
      ],

      /* ---------------- COMBO 2in1 ---------------- */
      'comboTypes' => [
          'iglu-2in1' => [
              'label' => '2in1 IGLU sauna + hot tub',
              'basePrice' => 11500,
              'dimensions' => '400×250cm',
              'woodTypes' => ['spruce', 'thermo'],
              'woodTypePrices' => ['spruce' => 0, 'thermo' => 1900],
              'hasColor' => true,
              'hasWindow' => true,
              'windowOptions' => [
                  'none'  => ['label' => sauna_t('combo.window.none', $lang), 'price' => 0],
                  '145x57'      => ['label' => sauna_t('combo.window.145x57', $lang), 'price' => 240],
                  'panoramic50' => ['label' => sauna_t('combo.window.panoramic50', $lang), 'price' => 380],
              ],
              'hasHeater' => true,
              'heaterOptions' => [
                  'none' => ['label' => sauna_t('hottub.heater.none', $lang), 'price' => 0],
                  'external-aisi304'   => ['label' => sauna_t('hottub.heater.external-aisi304', $lang), 'price' => 560],
                  'integrated-aisi316' => ['label' => sauna_t('hottub.heater.integrated-aisi316', $lang), 'price' => 850],
              ],
              'hasUnderwaterLed' => true,
              'underwaterLedOptions' => [
                  'none' => ['label' => sauna_t('hottub.underwaterLed.none', $lang), 'price' => 0],
                  '1pc'  => ['label' => sauna_t('hottub.underwaterLed.1pc', $lang), 'price' => 55],
                  '3pc'  => ['label' => sauna_t('hottub.underwaterLed.3pc', $lang), 'price' => 162],
              ],
              'hasExteriorLed' => true,
              'exteriorLedOptions' => [
                  'none' => ['label' => sauna_t('hottub.exteriorLed.none', $lang), 'price' => 0],
                  'yes'  => ['label' => sauna_t('hottub.exteriorLed.yes', $lang), 'price' => 200],
              ],
              'hasCover' => true,
              'coverOptions' => [
                  'none' => ['label' => sauna_t('hottub.cover.none', $lang), 'price' => 0],
                  'standard' => ['label' => sauna_t('hottub.cover.standard', $lang), 'price' => 390],
              ],
              'hasCoverColor' => true,
              'hasHydroMassage' => true,
              'hydroMassageOptions' => [
                  ['id' => 'none', 'label' => $lang === 'en' ? 'Without' : 'Bez', 'price' => 0],
                  ['id' => '1.1kw-8', 'label' => '1.1kW – 8 trysiek', 'price' => 390],
              ],
              // Sauna časť
              'hasLed' => true,
              'hasBluetooth' => true,
              'hasAccessoryKit' => true,
              'hasHeaterType'       => true,
              'hasExteriorLed'      => true,
              'hasMirrorFilm'       => false,
              'hasMetalBands'       => false,
              'hasThermoCladding'   => false, 
              'hasBenchOptions'     => false, 
              'hasExteriorLedHottub'=> true, 
          ],
          'oasis-2in1' => [
              'label' => '2in1 Oasis sauna + hot tub',
              'basePrice' => 12000,
              'dimensions' => '450×250cm',
              'woodTypes' => ['spruce', 'thermo'],
              'woodTypePrices' => ['spruce' => 0, 'thermo' => 1800],
              'hasColor' => true,
              'hasWindow' => true,
              'windowOptions' => [
                  'none'        => ['label' => sauna_t('combo.window.none', $lang), 'price' => 0],
                  'round' => ['label' => sauna_t('combo.window.round', $lang), 'price' => 160],
                  'back'  => ['label' => sauna_t('combo.window.back', $lang), 'price' => 160],
              ],
              'hasHeater' => true,
              'heaterOptions' => [
                  'none' => ['label' => sauna_t('hottub.heater.none', $lang), 'price' => 0],
                  'external-aisi304'   => ['label' => sauna_t('hottub.heater.external-aisi304', $lang), 'price' => 560],
                  'integrated-aisi316' => ['label' => sauna_t('hottub.heater.integrated-aisi316', $lang), 'price' => 850],
              ],
              'hasUnderwaterLed' => true,
              'underwaterLedOptions' => [
                  'none' => ['label' => sauna_t('hottub.underwaterLed.none', $lang), 'price' => 0],
                  '1pc'  => ['label' => sauna_t('hottub.underwaterLed.1pc', $lang), 'price' => 55],
                  '3pc'  => ['label' => sauna_t('hottub.underwaterLed.3pc', $lang), 'price' => 162],
              ],
              'hasExteriorLed' => true,
              'exteriorLedOptions' => [
                  'none' => ['label' => sauna_t('hottub.exteriorLed.none', $lang), 'price' => 0],
                  'yes'  => ['label' => sauna_t('hottub.exteriorLed.yes', $lang), 'price' => 200],
              ],
              'hasCover' => true,
              'coverOptions' => [
                  'none' => ['label' => sauna_t('hottub.cover.none', $lang), 'price' => 0],
                  'standard' => ['label' => sauna_t('hottub.cover.standard', $lang), 'price' => 390],
              ],
              'hasCoverColor' => true,
              'hasHydroMassage' => true,
              'hydroMassageOptions' => [
                  ['id' => 'none', 'label' => $lang === 'en' ? 'Without' : 'Bez', 'price' => 0],
                  ['id' => '1.1kw-8', 'label' => '1.1kW – 8 trysiek', 'price' => 390],
              ],
              'hasLed' => false,
              'hasBluetooth' => true,
              'hasAccessoryKit' => true,
              'hasHeaterType'       => true,
              'hasExteriorLed'      => true,
              'hasMirrorFilm'       => false,
              'hasMetalBands'       => true,
              'hasThermoCladding'   => false, 
              'hasBenchOptions'     => false, 
              'hasExteriorLedHottub'=> true, 
          ],

          'modulspa-2in1' => [
              'label' => '2in1 ModulSpa',
              'basePrice' => 14000,
              'dimensions' => '500×300cm',
              'woodTypes' => ['thermo'],
              'woodTypePrices' => ['thermo' => 0],
              'hasColor' => true,
              'hasWindow' => false,
              'hasHeater' => true,
              'heaterOptions' => [
                  'none' => ['label' => sauna_t('hottub.heater.none', $lang), 'price' => 0],
                  'external-aisi304'   => ['label' => sauna_t('hottub.heater.external-aisi304', $lang), 'price' => 560],
                  'integrated-aisi316' => ['label' => sauna_t('hottub.heater.integrated-aisi316', $lang), 'price' => 850],
              ],
              'hasUnderwaterLed' => true,
              'underwaterLedOptions' => [
                  'none' => ['label' => sauna_t('hottub.underwaterLed.none', $lang), 'price' => 0],
                  '1pc'  => ['label' => sauna_t('hottub.underwaterLed.1pc', $lang), 'price' => 55],
                  '3pc'  => ['label' => sauna_t('hottub.underwaterLed.3pc', $lang), 'price' => 162],
              ],
              'hasExteriorLed' => true,
              'exteriorLedOptions' => [
                  'none' => ['label' => sauna_t('hottub.exteriorLed.none', $lang), 'price' => 0],
                  'yes'  => ['label' => sauna_t('hottub.exteriorLed.yes', $lang), 'price' => 200],
              ],
              'hasCover' => true,
              'coverOptions' => [
                  'none' => ['label' => sauna_t('hottub.cover.none', $lang), 'price' => 0],
                  'standard' => ['label' => sauna_t('hottub.cover.standard', $lang), 'price' => 390],
              ],
              'hasCoverColor' => true,
              'hasHydroMassage' => true,
              'hydroMassageOptions' => [
                  ['id' => 'none', 'label' => $lang === 'en' ? 'Without' : 'Bez', 'price' => 0],
                  ['id' => '1.1kw-8', 'label' => '1.1kW – 8 trysiek', 'price' => 390],
              ],
              'hasLed' => true,
              'hasBluetooth' => true,
              'hasAccessoryKit' => true,
              'hasHeaterType'       => true,
              'hasExteriorLed'      => true,
              'hasMirrorFilm'       => false,
              'hasMetalBands'       => false,
              'hasThermoCladding'   => false, 
              'hasBenchOptions'     => false, 
              'hasExteriorLedHottub'=> true, 
          ],

      ],

    ],
  ];
}

/* ----------------------------------------------------
 * PRICE CALCULATION (SERVER)
 * ---------------------------------------------------- */
function sauna_calculate_price(array $options, $lang = 'sk') {

  $cfg = sauna_get_config($lang);
  $type = $options['productCategory'] ?? '';

  $price = 0;
  $display = [];

  /* ================= SAUNA ================= */
  if ($type === 'sauna') {

    $saunaTypeId = $options['saunaTypeId'] ?? '';
    if (empty($cfg['saunaTypes'][$saunaTypeId])) {
      return new WP_Error('bad_sauna_type', sauna_t('error.invalidSaunaType', $lang));
    }

    $saunaType = $cfg['saunaTypes'][$saunaTypeId];
    $price += $saunaType['basePrice'];

    $display[] = ['label' => sauna_t('display.saunaType', $lang), 'value' => $saunaType['label']];

    // Wood
    $wood = $options['woodType'] ?? '';
    if (!in_array($wood, $saunaType['woodTypes'], true)) {
        return new WP_Error('bad_wood', sauna_t('error.invalidWood', $lang));
    }

    $woodPrice = 0;
    if (!empty($saunaType['woodTypePrices'][$wood])) {
        $woodPrice = $saunaType['woodTypePrices'][$wood];
    } elseif (!empty($cfg['sauna']['woodTypes'][$wood]['price'])) {
        $woodPrice = $cfg['sauna']['woodTypes'][$wood]['price'];
    }
    $price += $woodPrice;

    $display[] = ['label' => sauna_t('display.wood', $lang), 'value' => $cfg['sauna']['woodTypes'][$wood]['label']];

    // Heater
    $heater = $options['heaterType'] ?? 'none';
    $price += $cfg['sauna']['heaterTypes'][$heater]['price'];
    $display[] = ['label' => sauna_t('display.heater', $lang), 'value' => $cfg['sauna']['heaterTypes'][$heater]['label']];

    // Heater model
    $model = $options['heaterModel'] ?? 'none';
    if ($heater !== 'none' && $model !== 'none') {
      $modelCfg = $cfg['heaterModels'][$heater][$model] ?? null;
      if (!$modelCfg) {
        return new WP_Error('bad_heater_model', sauna_t('error.invalidHeaterModel', $lang));
      }
      $price += $modelCfg['price'];
      $display[] = ['label' => sauna_t('display.heaterModel', $lang), 'value' => $modelCfg['label']];
    }

    if (!empty($options['exteriorLed']) && !empty($saunaType['hasExteriorLed'])) {
      $price += $cfg['exteriorLed']['price'];
      $display[] = [
        'label' => sauna_t('display.exteriorLed', $lang),
        'value' => $cfg['exteriorLed']['label'],
      ];
    }

    // LED (multi)
    $leds = array_filter((array)($options['led'] ?? []));
    $ledLabels = [];

    foreach ($leds as $l) {
      if ($l === 'none') continue;
      $price += $cfg['sauna']['ledOptions'][$l]['price'];
      $ledLabels[] = $cfg['sauna']['ledOptions'][$l]['label'];
    }

    $display[] = [
      'label' => sauna_t('display.led', $lang),
      'value' => $ledLabels ? implode(', ', $ledLabels) : sauna_t('led.none', $lang)
    ];

    // Bluetooth
    $bt = $options['bluetooth'] ?? 'none';
    $price += $cfg['sauna']['bluetoothOptions'][$bt]['price'];
    $display[] = ['label' => sauna_t('display.bluetooth', $lang), 'value' => $cfg['sauna']['bluetoothOptions'][$bt]['label']];

    // Kit
    $kit = $options['accessoryKit'] ?? 'none';
    $price += $cfg['sauna']['accessoryKitOptions'][$kit]['price'];
    $display[] = ['label' => sauna_t('display.kit', $lang), 'value' => $cfg['sauna']['accessoryKitOptions'][$kit]['label']];

    // Color
    $color = $options['color'] ?? 'none';
    $price += $cfg['sauna']['colorOptions'][$color]['price'];
    $display[] = ['label' => sauna_t('display.color', $lang), 'value' => $cfg['sauna']['colorOptions'][$color]['label']];

    // Window
    $window = $options['window'] ?? 'none';
    if ($window !== 'none' && !empty($saunaType['hasWindow'])) {
        $windowOpts = $cfg['sauna']['windowOptions'] ?? [];
        if (isset($windowOpts[$window])) {
            $price += $windowOpts[$window]['price'];
            $display[] = ['label' => sauna_t('display.window', $lang), 'value' => $windowOpts[$window]['label']];
        }
    }

    // Mirror film
    $mirror = $options['mirror'] ?? 'none';
    if ($mirror !== 'none' && !empty($saunaType['hasMirrorFilm'])) {
        $mirrorOpts = $cfg['sauna']['mirrorFilmOptions'] ?? [];
        if (isset($mirrorOpts[$mirror])) {
            $price += $mirrorOpts[$mirror]['price'];
            $display[] = ['label' => sauna_t('display.mirrorFilm', $lang), 'value' => $mirrorOpts[$mirror]['label']];
        }
    }

    // Metal bands
    $metal = $options['metal'] ?? 'none';
    if ($metal !== 'none' && !empty($saunaType['hasMetalBands'])) {
        $metalOpts = $cfg['sauna']['metalBandsOptions'] ?? [];
        if (isset($metalOpts[$metal])) {
            $price += $metalOpts[$metal]['price'];
            $display[] = ['label' => sauna_t('display.metalBands', $lang), 'value' => $metalOpts[$metal]['label']];
        }
    }

    // Bench
    $bench = $options['bench'] ?? 'standard';
    if ($bench !== 'standard' && !empty($saunaType['hasBenchOptions'])) {
        $benchOpts = $cfg['sauna']['benchOptions'] ?? [];
        if (isset($benchOpts[$bench])) {
            $price += $benchOpts[$bench]['price'];
            $display[] = ['label' => sauna_t('display.bench', $lang), 'value' => $benchOpts[$bench]['label']];
        }
    }

  }

  /* ================= HOTTUB ================= */
  if ($type === 'hottub') {

      $hottubTypeId = $options['hottubTypeId'] ?? '';
      $hottubTypes = $cfg['hottub']['hottubTypes'] ?? [];

      if (empty($hottubTypes[$hottubTypeId])) {
        return new WP_Error('bad_hottub_type', sauna_t('error.invalidHottubType', $lang));
      }

      $hottubType = $hottubTypes[$hottubTypeId];
      $h = $cfg['hottub']; // ← MOVED UP! Was after shared options loop

      $price += $hottubType['basePrice'];

      $display[] = [
        'label' => sauna_t('display.hottub', $lang),
        'value' => $hottubType['label']
      ];

      /* Size (per model) */
      $size = $options['size'] ?? 'none';
      if ($size !== 'none' && !empty($hottubType['sizeOptions'][$size])) {
        $price += $hottubType['sizeOptions'][$size]['price'];
        $display[] = ['label' => sauna_t('display.size', $lang), 'value' => $hottubType['sizeOptions'][$size]['label']];
      }

      // Exterior wood
      if (!empty($hottubType['hasExteriorWood'])) {
          $wood = $options['exteriorWood'] ?? 'none';
          $woodOpts = $hottubType['exteriorWoodOptions'] ?? [];
          if (isset($woodOpts[$wood])) {
              $price += $woodOpts[$wood]['price'];
              $display[] = ['label' => sauna_t('display.exteriorWood', $lang), 'value' => $woodOpts[$wood]['label']];
          }
      }

      // Acrylic liner (NEW)
      if (!empty($options['acrylicLiner']) && $options['acrylicLiner'] !== 'none') {
          $acrylicLiner = $options['acrylicLiner'];
          $woodOpts = $hottubType['exteriorWoodOptions'] ?? [];
          if (isset($woodOpts[$acrylicLiner])) {
              $price += $woodOpts[$acrylicLiner]['price'];
              $display[] = ['label' => sauna_t('display.acrylicLiner', $lang), 'value' => $woodOpts[$acrylicLiner]['label']];
          }
      }

      // Main heater (NEW - was missing!)
      if (!empty($hottubType['hasHeater'])) {
          $heater = $options['heater'] ?? 'none';
          $heaterOpts = $hottubType['heaterOptions'] ?? [];
          if ($heater !== 'none' && isset($heaterOpts[$heater])) {
              $price += $heaterOpts[$heater]['price'];
              $display[] = ['label' => sauna_t('display.hottubHeater', $lang), 'value' => $heaterOpts[$heater]['label']];
          }
      }

      // Electric heater (separate)
      if (!empty($hottubType['hasHeater'])) {
          $electricHeater = $options['electricHeater'] ?? 'none';
          $heaterOpts = $hottubType['heaterOptions'] ?? [];
          if ($electricHeater !== 'none' && isset($heaterOpts[$electricHeater])) {
              $price += $heaterOpts[$electricHeater]['price'];
              $display[] = ['label' => sauna_t('display.hottubElectricHeater', $lang), 'value' => $heaterOpts[$electricHeater]['label']];
          }
      }

      // Cover (model-specific)
      if (!empty($hottubType['hasCover'])) {
          $cover = $options['cover'] ?? 'none';
          $coverOpts = $hottubType['coverOptions'] ?? [];
          if (isset($coverOpts[$cover])) {
              $price += $coverOpts[$cover]['price'];
              $display[] = ['label' => sauna_t('display.cover', $lang), 'value' => $coverOpts[$cover]['label']];
          }
      }

      // Cover color (shared)
      $coverColor = $options['coverColor'] ?? 'none';
      $coverColorOpts = $h['coverColorOptions'] ?? [];
      if (isset($coverColorOpts[$coverColor])) {
          $price += $coverColorOpts[$coverColor]['price'];
          $display[] = ['label' => sauna_t('display.coverColor', $lang), 'value' => $coverColorOpts[$coverColor]['label']];
      }

      // Hydro massage (FIXED - added display)
      $hydro_massage = sanitize_text_field($options['hydroMassage'] ?? 'none');
      if ($hydro_massage !== 'none' && !empty($hottubType['hydroMassageOptions'])) {
          foreach ($hottubType['hydroMassageOptions'] as $option) {
              if ($option['id'] === $hydro_massage) {
                  $price += floatval($option['price']);
                  $display[] = ['label' => sauna_t('display.hydroMassage', $lang), 'value' => $option['label']];
                  break;
              }
          }
      }

      // Underwater LED
      $underwaterLed = $options['underwaterLed'] ?? 'none';
      $underwaterLedOpts = $hottubType['underwaterLedOptions'] ?? [];
      if (isset($underwaterLedOpts[$underwaterLed])) {
          $price += $underwaterLedOpts[$underwaterLed]['price'];
          $display[] = ['label' => sauna_t('display.underwaterLed', $lang), 'value' => $underwaterLedOpts[$underwaterLed]['label']];
      }

      // Exterior LED
      $extLed = $options['exteriorLed'] ?? 'none';
      $extLedOpts = $hottubType['exteriorLedOptions'] ?? [];
      if (isset($extLedOpts[$extLed])) {
          $price += $extLedOpts[$extLed]['price'];
          $display[] = ['label' => sauna_t('display.hottubExteriorLed', $lang), 'value' => $extLedOpts[$extLed]['label']];
      }

      // Shared options (FIXED - $h is now defined above)
      $sharedKeys = [
          'airBubbles' => 'airBubblesOptions',
          'drainRelay' => 'drainRelayOptions',
          'sandFilter' => 'sandFilterOptions',
          'electronicController' => 'electronicControllerOptions',
          'thermometer' => 'thermometerOptions',
          'bluetoothSpeaker' => 'bluetoothSpeakerOptions',
          'headCushion' => 'headCushionOptions',
      ];
      $displayKeys = [
          'airBubbles' => 'display.airBubbles',
          'drainRelay' => 'display.drainRelay',
          'sandFilter' => 'display.sandFilter',
          'electronicController' => 'display.electronicController',
          'thermometer' => 'display.thermometer',
          'bluetoothSpeaker' => 'display.bluetoothSpeaker',
          'headCushion' => 'display.headCushion',
      ];

      foreach ($sharedKeys as $paramKey => $cfgKey) {
          $val = $options[$paramKey] ?? 'none';
          $opts = $h[$cfgKey] ?? [];
          if (isset($opts[$val])) {
              $price += $opts[$val]['price'];
              $display[] = ['label' => sauna_t($displayKeys[$paramKey], $lang), 'value' => $opts[$val]['label']];
          }
      }
  }

  /* ================= COMBO 2in1 ================= */
  if ($type === 'combo') {

      $comboTypeId = $options['comboTypeId'] ?? '';
      $comboTypes = $cfg['comboTypes'] ?? ($cfg['hottub']['comboTypes'] ?? []);

      if (empty($comboTypes[$comboTypeId])) {
          return new WP_Error('bad_combo_type', 'Invalid combo type');
      }

      $comboType = $comboTypes[$comboTypeId];
      $price += $comboType['basePrice'];

      $display[] = ['label' => sauna_t('display.comboType', $lang), 'value' => $comboType['label']];

      // Wood
      $wood = $options['woodType'] ?? 'spruce';
      if (in_array($wood, $comboType['woodTypes'], true)) {
          $woodPrice = $comboType['woodTypePrices'][$wood] ?? 0;
          $price += $woodPrice;
          $display[] = ['label' => sauna_t('display.wood', $lang), 'value' => $cfg['sauna']['woodTypes'][$wood]['label'] ?? $wood];
      }

      // Color
      $color = $options['color'] ?? 'none';
      if (isset($cfg['sauna']['colorOptions'][$color])) {
          $price += $cfg['sauna']['colorOptions'][$color]['price'];
          $display[] = ['label' => sauna_t('display.color', $lang), 'value' => $cfg['sauna']['colorOptions'][$color]['label']];
      }

      // Windows
      if (!empty($comboType['hasWindow'])) {
          $window = $options['window'] ?? 'none';
          $windowOpts = $comboType['windowOptions'] ?? [];
          if (isset($windowOpts[$window])) {
              $price += $windowOpts[$window]['price'];
              $display[] = ['label' => sauna_t('display.comboWindow', $lang), 'value' => $windowOpts[$window]['label']];
          }
      }

      // Heater
      if (!empty($comboType['hasHeater'])) {
          $heater = $options['heater'] ?? 'none';
          $heaterOpts = $comboType['heaterOptions'] ?? [];
          if ($heater !== 'none' && isset($heaterOpts[$heater])) {
              $price += $heaterOpts[$heater]['price'];
              $display[] = ['label' => sauna_t('display.hottubHeater', $lang), 'value' => $heaterOpts[$heater]['label']];
          }
      }

      // Cover
      if (!empty($comboType['hasCover'])) {
          $cover = $options['cover'] ?? 'none';
          $coverOpts = $comboType['coverOptions'] ?? [];
          if (isset($coverOpts[$cover])) {
              $price += $coverOpts[$cover]['price'];
              $display[] = ['label' => sauna_t('display.cover', $lang), 'value' => $coverOpts[$cover]['label']];
          }
      }

      // Cover color (shared)
      if (!empty($comboType['hasCoverColor'])) {
          $coverColor = $options['coverColor'] ?? 'none';
          $coverColorOpts = $cfg['hottub']['coverColorOptions'] ?? [];
          if (isset($coverColorOpts[$coverColor])) {
              $price += $coverColorOpts[$coverColor]['price'];
              $display[] = ['label' => sauna_t('display.coverColor', $lang), 'value' => $coverColorOpts[$coverColor]['label']];
          }
      }

      // Underwater LED
      $underwaterLed = $options['underwaterLed'] ?? 'none';
      $uwOpts = $comboType['underwaterLedOptions'] ?? [];
      if (isset($uwOpts[$underwaterLed])) {
          $price += $uwOpts[$underwaterLed]['price'];
          $display[] = ['label' => sauna_t('display.underwaterLed', $lang), 'value' => $uwOpts[$underwaterLed]['label']];
      }

      // Exterior LED
      $extLed = $options['exteriorLed'] ?? 'none';
      $extLedOpts = $comboType['exteriorLedOptions'] ?? [];
      if (isset($extLedOpts[$extLed])) {
          $price += $extLedOpts[$extLed]['price'];
          $display[] = ['label' => sauna_t('display.hottubExteriorLed', $lang), 'value' => $extLedOpts[$extLed]['label']];
      }

      // Hydro massage
      $hydro = $options['hydroMassage'] ?? 'none';
      if ($hydro !== 'none' && !empty($comboType['hydroMassageOptions'])) {
          foreach ($comboType['hydroMassageOptions'] as $opt) {
              if ($opt['id'] === $hydro) {
                  $price += floatval($opt['price']);
                  $display[] = ['label' => sauna_t('display.hydroMassage', $lang), 'value' => $opt['label']];
                  break;
              }
          }
      }

      // Sauna LED
      $leds = array_filter((array)($options['led'] ?? []));
      $ledLabels = [];
      foreach ($leds as $l) {
          if ($l === 'none') continue;
          $price += $cfg['sauna']['ledOptions'][$l]['price'] ?? 0;
          $ledLabels[] = $cfg['sauna']['ledOptions'][$l]['label'] ?? $l;
      }
      $display[] = ['label' => sauna_t('display.led', $lang), 'value' => $ledLabels ? implode(', ', $ledLabels) : sauna_t('led.none', $lang)];

      // Bluetooth
      $bt = $options['bluetooth'] ?? 'none';
      $price += $cfg['sauna']['bluetoothOptions'][$bt]['price'] ?? 0;
      $display[] = ['label' => sauna_t('display.bluetooth', $lang), 'value' => $cfg['sauna']['bluetoothOptions'][$bt]['label'] ?? $bt];

      // Accessory Kit
      $kit = $options['accessoryKit'] ?? 'none';
      $price += $cfg['sauna']['accessoryKitOptions'][$kit]['price'] ?? 0;
      $display[] = ['label' => sauna_t('display.kit', $lang), 'value' => $cfg['sauna']['accessoryKitOptions'][$kit]['label'] ?? $kit];

      // Shared hottub accessories
      $h = $cfg['hottub'];
      $sharedKeys = [
          'airBubbles' => 'airBubblesOptions',
          'drainRelay' => 'drainRelayOptions',
          'sandFilter' => 'sandFilterOptions',
          'electronicController' => 'electronicControllerOptions',
          'thermometer' => 'thermometerOptions',
          'bluetoothSpeaker' => 'bluetoothSpeakerOptions',
          'headCushion' => 'headCushionOptions',
      ];
      $displayKeys = [
          'airBubbles' => 'display.airBubbles',
          'drainRelay' => 'display.drainRelay',
          'sandFilter' => 'display.sandFilter',
          'electronicController' => 'display.electronicController',
          'thermometer' => 'display.thermometer',
          'bluetoothSpeaker' => 'display.bluetoothSpeaker',
          'headCushion' => 'display.headCushion',
      ];
      foreach ($sharedKeys as $paramKey => $cfgKey) {
          $val = $options[$paramKey] ?? 'none';
          $opts = $h[$cfgKey] ?? [];
          if (isset($opts[$val])) {
              $price += $opts[$val]['price'];
              $display[] = ['label' => sauna_t($displayKeys[$paramKey], $lang), 'value' => $opts[$val]['label']];
          }
      }
  }

  return ['price' => $price, 'display' => $display];
}

/* ----------------------------------------------------
 * REST – CONFIG
 * ---------------------------------------------------- */
add_action('rest_api_init', function () {

  register_rest_route('sauna/v1', '/config', [
    'methods'  => 'GET',
    'permission_callback' => '__return_true',
    'callback' => function (WP_REST_Request $req) {

      $lang = $req->get_param('lang') === 'en' ? 'en' : 'sk';
      $cfg = sauna_get_config($lang);

      $comboTypes = $cfg['comboTypes'] ?? ($cfg['hottub']['comboTypes'] ?? []);

      // Transform na API shape, ktorý očakáva React
      return [
        'products' => $cfg['products'],

        'saunaTypes' => array_map(fn($id,$v)=>[
            'id'              => $id,
            'label'           => $v['label'],
            'basePrice'       => $v['basePrice'],
            'dimensions'      => $v['dimensions'] ?? '',
            'woodTypes'       => $v['woodTypes'],
            'woodTypePrices'  => $v['woodTypePrices'] ?? [],
            'hasWoodType'     => $v['hasWoodType'] ?? true,
            'hasExteriorLed'  => $v['hasExteriorLed'] ?? false,
            'hasLed'          => $v['hasLed'] ?? true,
            'hasBluetooth'    => $v['hasBluetooth'] ?? true,
            'hasAccessoryKit' => $v['hasAccessoryKit'] ?? true,
            'hasHeater'       => $v['hasHeater'] ?? true,
            'hasColor'        => $v['hasColor'] ?? true,
            'allowedLedOptions' => $v['allowedLedOptions'] ?? null,
            'hasWindow' => $v['hasWindow'] ?? false,
            'hasMirrorFilm' => $v['hasMirrorFilm'] ?? false,
            'hasMetalBands' => $v['hasMetalBands'] ?? false,
            'hasBenchOptions' => $v['hasBenchOptions'] ?? false,
            'windowOptions' => array_map(fn($k, $v2) => [
                'id' => $k, 'label' => $v2['label'], 'price' => $v2['price'],
            ], array_keys($v['windowOptions'] ?? $cfg['sauna']['windowOptions'] ?? []), $v['windowOptions'] ?? $cfg['sauna']['windowOptions'] ?? []),
            'mirrorFilmOptions' => array_map(fn($k, $v2) => [
                'id' => $k, 'label' => $v2['label'], 'price' => $v2['price'],
            ], array_keys($v['mirrorFilmOptions'] ?? $cfg['sauna']['mirrorFilmOptions'] ?? []), $v['mirrorFilmOptions'] ?? $cfg['sauna']['mirrorFilmOptions'] ?? []),
            'metalBandsOptions' => array_map(fn($k, $v2) => [
                'id' => $k, 'label' => $v2['label'], 'price' => $v2['price'],
            ], array_keys($v['metalBandsOptions'] ?? $cfg['sauna']['metalBandsOptions'] ?? []), $v['metalBandsOptions'] ?? $cfg['sauna']['metalBandsOptions'] ?? []),
            'benchOptions' => array_map(fn($k, $v2) => [
                'id' => $k, 'label' => $v2['label'], 'price' => $v2['price'],
            ], array_keys($v['benchOptions'] ?? $cfg['sauna']['benchOptions'] ?? []), $v['benchOptions'] ?? $cfg['sauna']['benchOptions'] ?? []),

        ], array_keys($cfg['saunaTypes']), $cfg['saunaTypes']),

        'sauna' => [
          'woodTypes' => $cfg['sauna']['woodTypes'],

          'heaterTypes' => array_map(fn($k, $v) => [
            'id' => $k, 'label' => $v['label'], 'price' => $v['price'],
          ], array_keys($cfg['sauna']['heaterTypes']), $cfg['sauna']['heaterTypes']),

          'ledOptions' => array_map(fn($k, $v) => [
            'id' => $k, 'label' => $v['label'], 'price' => $v['price'],
          ], array_keys($cfg['sauna']['ledOptions']), $cfg['sauna']['ledOptions']),

          'bluetoothOptions' => array_map(fn($k, $v) => [
            'id' => $k, 'label' => $v['label'], 'price' => $v['price'],
          ], array_keys($cfg['sauna']['bluetoothOptions']), $cfg['sauna']['bluetoothOptions']),

          'accessoryKitOptions' => array_map(fn($k, $v) => [
            'id' => $k, 'label' => $v['label'], 'price' => $v['price'],
          ], array_keys($cfg['sauna']['accessoryKitOptions']), $cfg['sauna']['accessoryKitOptions']),

          'colorOptions' => array_map(fn($k, $v) => [
            'id' => $k, 'label' => $v['label'], 'price' => $v['price'],
          ], array_keys($cfg['sauna']['colorOptions']), $cfg['sauna']['colorOptions']),

        ],

        'heaterModels' => $cfg['heaterModels'],
        'exteriorLed' => $cfg['exteriorLed'],

        'hottub' => [
            'hottubTypes' => array_map(fn($id, $v) => [
                'id'          => $id,
                'label'       => $v['label'],
                'basePrice'   => $v['basePrice'],
                'dimensions'  => $v['dimensions'] ?? '',
                'hasSize'         => $v['hasSize'] ?? false,
                'hasHydroMassage'      => $v['hasHydroMassage'] ?? true,
                'hydroMassageOptions'  => $v['hydroMassageOptions'] ?? [],
                'hasUnderwaterLed' => $v['hasUnderwaterLed'] ?? true,
                'underwaterLedOptions' => array_map(fn($k, $lv) => [
                    'id' => $k, 'label' => $lv['label'], 'price' => $lv['price'],
                ], array_keys($v['underwaterLedOptions'] ?? []), $v['underwaterLedOptions'] ?? []),
                'hasExteriorLed' => $v['hasExteriorLed'] ?? true,
                'exteriorLedOptions' => array_map(fn($k, $lv) => [
                    'id' => $k, 'label' => $lv['label'], 'price' => $lv['price'],
                ], array_keys($v['exteriorLedOptions'] ?? []), $v['exteriorLedOptions'] ?? []),
                'sizeOptions' => array_map(fn($k, $sv) => [
                    'id' => $k,
                    'label' => $sv['label'],
                    'price' => $sv['price'],
                ], array_keys($v['sizeOptions'] ?? []), $v['sizeOptions'] ?? []),
                'exteriorWoodOptions' => array_map(fn($k, $v) => [
                    'id' => $k, 'label' => $v['label'], 'price' => $v['price'],
                ], array_keys($v['exteriorWoodOptions'] ?? []), $v['exteriorWoodOptions'] ?? []),
                'hasExteriorWood' => $v['hasExteriorWood'] ?? true,
                'hasHeater' => $v['hasHeater'] ?? false,
                'heaterOptions' => array_map(fn($k, $hv) => [
                    'id' => $k, 'label' => $hv['label'], 'price' => $hv['price'],
                ], array_keys($v['heaterOptions'] ?? []), $v['heaterOptions'] ?? []),
                'coverOptions' => array_map(fn($k, $cv) => [
                    'id' => $k, 'label' => $cv['label'], 'price' => $cv['price'],
                ], array_keys($v['coverOptions'] ?? []), $v['coverOptions'] ?? []),
                'hasCover'      => $v['hasCover'] ?? true,
                'hasCoverColor' => $v['hasCoverColor'] ?? true,
            ], array_keys($cfg['hottub']['hottubTypes']), $cfg['hottub']['hottubTypes']),

            'airBubblesOptions' => array_map(fn($k, $v) => [
                'id' => $k, 'label' => $v['label'], 'price' => $v['price'],
            ], array_keys($cfg['hottub']['airBubblesOptions']), $cfg['hottub']['airBubblesOptions']),

            'drainRelayOptions' => array_map(fn($k, $v) => [
                'id' => $k, 'label' => $v['label'], 'price' => $v['price'],
            ], array_keys($cfg['hottub']['drainRelayOptions']), $cfg['hottub']['drainRelayOptions']),

            'sandFilterOptions' => array_map(fn($k, $v) => [
                'id' => $k, 'label' => $v['label'], 'price' => $v['price'],
            ], array_keys($cfg['hottub']['sandFilterOptions']), $cfg['hottub']['sandFilterOptions']),

            'electronicControllerOptions' => array_map(fn($k, $v) => [
                'id' => $k, 'label' => $v['label'], 'price' => $v['price'],
            ], array_keys($cfg['hottub']['electronicControllerOptions']), $cfg['hottub']['electronicControllerOptions']),

            'thermometerOptions' => array_map(fn($k, $v) => [
                'id' => $k, 'label' => $v['label'], 'price' => $v['price'],
            ], array_keys($cfg['hottub']['thermometerOptions']), $cfg['hottub']['thermometerOptions']),

            'bluetoothSpeakerOptions' => array_map(fn($k, $v) => [
                'id' => $k, 'label' => $v['label'], 'price' => $v['price'],
            ], array_keys($cfg['hottub']['bluetoothSpeakerOptions']), $cfg['hottub']['bluetoothSpeakerOptions']),

            'headCushionOptions' => array_map(fn($k, $v) => [
                'id' => $k, 'label' => $v['label'], 'price' => $v['price'],
            ], array_keys($cfg['hottub']['headCushionOptions']), $cfg['hottub']['headCushionOptions']),

            'coverColorOptions' => array_map(fn($k, $v) => [
                'id' => $k, 'label' => $v['label'], 'price' => $v['price'],
            ], array_keys($cfg['hottub']['coverColorOptions']), $cfg['hottub']['coverColorOptions']),

        ],

      'comboTypes' => array_map(fn($id, $v) => [
        'id'          => $id,
        'label'       => $v['label'],
        'basePrice'   => $v['basePrice'],
        'dimensions'  => $v['dimensions'] ?? '',
        'woodTypes'   => $v['woodTypes'] ?? ['spruce'],
        'woodTypePrices' => $v['woodTypePrices'] ?? [],
        'hasColor'    => $v['hasColor'] ?? true,
        'hasWindow'   => $v['hasWindow'] ?? false,
        'windowOptions' => array_map(fn($k, $wv) => [
            'id' => $k, 'label' => $wv['label'], 'price' => $wv['price'],
        ], array_keys($v['windowOptions'] ?? []), $v['windowOptions'] ?? []),
        'hasHeater'   => $v['hasHeater'] ?? false,
        'heaterOptions' => array_map(fn($k, $hv) => [
            'id' => $k, 'label' => $hv['label'], 'price' => $hv['price'],
        ], array_keys($v['heaterOptions'] ?? []), $v['heaterOptions'] ?? []),
        'hasCover'    => $v['hasCover'] ?? false,
        'coverOptions' => array_map(fn($k, $cv) => [
            'id' => $k, 'label' => $cv['label'], 'price' => $cv['price'],
        ], array_keys($v['coverOptions'] ?? []), $v['coverOptions'] ?? []),
        'hasCoverColor' => $v['hasCoverColor'] ?? false,
        'hasUnderwaterLed' => $v['hasUnderwaterLed'] ?? false,
        'underwaterLedOptions' => array_map(fn($k, $lv) => [
            'id' => $k, 'label' => $lv['label'], 'price' => $lv['price'],
        ], array_keys($v['underwaterLedOptions'] ?? []), $v['underwaterLedOptions'] ?? []),
        'hasExteriorLed' => $v['hasExteriorLed'] ?? false,
        'exteriorLedOptions' => array_map(fn($k, $lv) => [
            'id' => $k, 'label' => $lv['label'], 'price' => $lv['price'],
        ], array_keys($v['exteriorLedOptions'] ?? []), $v['exteriorLedOptions'] ?? []),
        'hasHydroMassage' => $v['hasHydroMassage'] ?? false,
        'hydroMassageOptions' => $v['hydroMassageOptions'] ?? [],
        'hasLed'          => $v['hasLed'] ?? false,
        'hasBluetooth'    => $v['hasBluetooth'] ?? false,
        'hasAccessoryKit' => $v['hasAccessoryKit'] ?? false,
      ], array_keys($comboTypes), $comboTypes),

      ];
    },
  ]);
});


/* ----------------------------------------------------
 * REST – ADD TO CART
 * ---------------------------------------------------- */
add_action('rest_api_init', function () {

  register_rest_route('sauna/v1', '/add-to-cart', [
    'methods' => 'POST',
    'permission_callback' => '__return_true',
    'callback' => function (WP_REST_Request $req) {

      sauna_bootstrap_wc_for_rest();

      $product_id = absint($req['product_id']);
      $options = (array)$req['options'];
      $lang = $req->get_param('lang') === 'en' ? 'en' : 'sk';

      $cfg = sauna_get_config($lang);

      $type = $options['productCategory'] ?? '';

      if (!in_array($type, ['sauna', 'hottub', 'combo'], true)) {
        return new WP_REST_Response([
          'message' => sauna_t('error.invalidProductType', $lang)
        ], 400);
      }

      $expected_product_id = (int)($cfg['products'][$type] ?? 0);

      if (!$expected_product_id || $expected_product_id !== $product_id) {
        return new WP_REST_Response([
          'message' => sauna_t('error.invalidProductId', $lang)
        ], 400);
      }

      $calc = sauna_calculate_price($options, $lang);
      if (is_wp_error($calc)) {
        return new WP_REST_Response(['message' => $calc->get_error_message()], 400);
      }

      $image_url = sanitize_url($req['image'] ?? '');

      $key = WC()->cart->add_to_cart(
        $product_id,
        1,
        0,
        [],
        [
          'sauna_config' => [
            'price' => $calc['price'],
            'display' => $calc['display'],
            'hash' => md5(wp_json_encode($options)),
            'image' => $image_url,
          ],
        ]
      );

      return ['ok' => true, 'key' => $key];
    },
  ]);
});

/* ----------------------------------------------------
 * CART PRICE OVERRIDE
 * ---------------------------------------------------- */
add_action('woocommerce_before_calculate_totals', function ($cart) {
  foreach ($cart->get_cart() as $item) {
    if (!empty($item['sauna_config']['price'])) {
      $item['data']->set_price($item['sauna_config']['price']);
    }
  }
});

/* ----------------------------------------------------
 * DISPLAY IN CART / ORDER
 * ---------------------------------------------------- */
add_filter('woocommerce_get_item_data', function ($data, $item) {
  foreach ($item['sauna_config']['display'] ?? [] as $row) {
    $data[] = ['key' => $row['label'], 'value' => $row['value']];
  }
  return $data;
}, 10, 2);

add_filter('woocommerce_cart_item_thumbnail', function($thumbnail, $cart_item, $cart_item_key) {
    if (!empty($cart_item['sauna_config']['image'])) {
        $img_url = esc_url($cart_item['sauna_config']['image']);
        return '<img src="' . $img_url . '" alt="Configuration" class="woocommerce-cart-item__thumbnail" style="width:80px;height:80px;object-fit:cover;" />';
    }
    return $thumbnail;
}, 10, 3);

/* ----------------------------------------------------
 * ULOŽIŤ OBRÁZOK A NÁZOV DO ORDER LINE ITEM
 * ---------------------------------------------------- */
add_action('woocommerce_checkout_create_order_line_item', function ($item, $key, $values) {
    // Display data
    foreach ($values['sauna_config']['display'] ?? [] as $row) {
        $item->add_meta_data($row['label'], $row['value'], true);
    }
    
    // Obrázok
    if (!empty($values['sauna_config']['image'])) {
        $item->add_meta_data('_sauna_image', $values['sauna_config']['image'], true);
    }
    
    // Vlastný názov produktu (podľa typu sauny) - language-agnostic label matching
    $display = $values['sauna_config']['display'] ?? [];
    $nameLabels = ['Typ sauny', 'Sauna Type', 'Produkt', 'Product', 'Kombinácia', 'Combo'];
    foreach ($display as $row) {
        if (in_array($row['label'], $nameLabels, true)) {
            $item->set_name($row['value']);
            break;
        }
    }
}, 10, 3);

/* ----------------------------------------------------
 * NÁZOV V KOŠÍKU (podľa typu sauny)
 * ---------------------------------------------------- */
add_filter('woocommerce_cart_item_name', function($name, $cart_item, $cart_item_key) {
    $display = $cart_item['sauna_config']['display'] ?? [];
    $nameLabels = ['Typ sauny', 'Sauna Type', 'Produkt', 'Product', 'Kombinácia', 'Combo'];
    foreach ($display as $row) {
        if (in_array($row['label'], $nameLabels, true)) {
            return '<a href="' . get_permalink($cart_item['product_id']) . '">' . esc_html($row['value']) . '</a>';
        }
    }
    return $name;
}, 10, 3);

/* ----------------------------------------------------
 * OBRÁZOK V ORDER DETAILS / EMAILS
 * ---------------------------------------------------- */
add_filter('woocommerce_order_item_thumbnail', function($thumbnail, $item) {
    $img_url = $item->get_meta('_sauna_image');
    if (!empty($img_url)) {
        return '<img src="' . esc_url($img_url) . '" alt="Configuration" style="width:80px;height:80px;object-fit:cover;border-radius:4px;" />';
    }
    return $thumbnail;
}, 10, 2);

/* ----------------------------------------------------
 * SKRYŤ INTERNÉ META Z DETAILOV
 * ---------------------------------------------------- */
add_filter('woocommerce_order_item_get_formatted_meta_data', function($meta, $item) {
    foreach ($meta as $key => $value) {
        if (strpos($value->key, '_sauna') === 0) {
            unset($meta[$key]);
        }
    }
    return $meta;
}, 10, 2);

add_filter('woocommerce_checkout_cart_item_quantity', function ($quantity_html, $cart_item, $cart_item_key) {
    if (empty($cart_item['sauna_config']['image'])) {
        return $quantity_html;
    }

    $img = sprintf(
        '<img src="%s" style="width:60px;height:60px;object-fit:cover;border-radius:4px;margin-right:10px;vertical-align:middle;" />',
        esc_url($cart_item['sauna_config']['image'])
    );

    return $img . $quantity_html;
}, 10, 3);

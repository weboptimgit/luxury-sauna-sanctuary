import React, { useEffect, useMemo, useState, useRef, useCallback } from "react";

import { useParams, useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Check,
  ShoppingCart,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Expand,
  Loader2,
  X,
  Ruler,
  ArrowUpDown,
  Flame,
  Lightbulb,
  Bluetooth,
  ArrowRight,
  ZoomIn,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/hooks/use-toast";
import ConfiguratorHeader from "@/components/ConfiguratorHeader";
import ConfiguratorFooter from "@/components/ConfiguratorFooter";
import { Notice } from "@/components/ui/notice";
import { useLanguage } from "@/contexts/LanguageContext";
import { useDocumentMeta } from "@/hooks/useDocumentMeta";

import saunaBarrel from "@/assets/2M-Round-sauna-1-2-700x700.jpg";
import saunaCube from "@/assets/Frame-sauna-210×210-700x700.jpg";
import saunaTraditional from "@/assets/ModulSauna-240×250-–-Thermo-wood-33-700x700.jpg";
import saunaInterior from "@/assets/LUX-sauna-245×300-14-700x700.jpg";
import saunaHarmony from "@/assets/0TV_0205-700x700.jpg";
import hotTub from "@/assets/hot-tub.jpg";
import acrylicRoundMain from "@/assets/acrylic-round-main.jpg";
import acrylicRoundGallery1 from "@/assets/acrylic-round-gallery-1.jpg";
import acrylicRoundGallery2 from "@/assets/acrylic-round-gallery-2.jpg";
import acrylicRoundGallery3 from "@/assets/acrylic-round-gallery-3.jpg";
import acrylicRoundGallery4 from "@/assets/acrylic-round-gallery-4.jpg";
import squareExtMain from "@/assets/square-ext-main.jpg";
import squareExtGallery1 from "@/assets/square-ext-gallery-1.jpg";
import squareExtGallery2 from "@/assets/square-ext-gallery-2.jpg";
import squareExtGallery3 from "@/assets/square-ext-gallery-3.jpg";
import squareExtGallery4 from "@/assets/square-ext-gallery-4.jpg";
import squareExtGallery5 from "@/assets/square-ext-gallery-5.jpg";
import squareExtGallery6 from "@/assets/square-ext-gallery-6.jpg";
import squareExtGallery7 from "@/assets/square-ext-gallery-7.jpg";
import squareIntMain from "@/assets/square-int-main.jpg";
import squareIntGallery1 from "@/assets/square-int-gallery-1.jpg";
import squareIntGallery2 from "@/assets/square-int-gallery-2.jpg";
import squareIntGallery3 from "@/assets/square-int-gallery-3.jpg";
import squareIntGallery4 from "@/assets/square-int-gallery-4.jpg";
import squareIntGallery5 from "@/assets/square-int-gallery-5.jpg";
import squareIntGallery6 from "@/assets/square-int-gallery-6.jpg";
import squareIntGallery7 from "@/assets/square-int-gallery-7.jpg";
import saunaKit from "@/assets/Sauna-accessories-kit.jpg";
import speaker from "@/assets/Bluetooth-speaker-system.png";
import ledBenches from "@/assets/LED-lighting-under-the-benches.png";
import ledBackrest from "@/assets/LED-lighting-in-the-back-supports-1.jpg";
import electricHeater from "@/assets/Harvia-CILINDRO-9kw.png";
import woodHeater from "@/assets/Harvia-M3.png";
import metalBandsImage from "@/assets/metal-tightening-bands.jpg";
import thermoCladdingImage from "@/assets/thermo-wood-cladding.jpg";
import oneStoryBenches from "@/assets/one-story-benches.jpg";
import twoStoryBenches from "@/assets/two-story-l-shaped-benches.jpg";
import panoramicRoofWindow from "@/assets/panoramic-roof-window.png";
import integratedHottubHeater from "@/assets/integrated-hottub-heater.jpg";
import electricHeater3kw from "@/assets/electric-heater-3kw.jpeg";
import electricHeater6kw from "@/assets/electric-heater-6kw.jpeg";
import spruceWoodImg from "@/assets/spruce-wood.jpg";
import thermoWoodImg from "@/assets/thermo-wood.jpg";
import spruceWood2Img from "@/assets/spruce-wood-2.jpg";
import thermoWood2Img from "@/assets/thermo-wood-2.jpg";
import wpcPlastImg from "@/assets/wpc-plast.jpg";
import blueMarbleImg from "@/assets/blue-marble.png";
import grayAcrylicImg from "@/assets/gray-acrylic.png";
import whiteAcrylicImg from "@/assets/white-acrylic.png";
import underwaterLed1pc from "@/assets/underwater-led-1pc.jpg";
import underwaterLed3pc from "@/assets/underwater-led-3pc.jpg";
import coverBlackImg from "@/assets/cover-black.jpg";
import coverGreyImg from "@/assets/cover-grey.jpg";
import exteriorLedHottubImg from "@/assets/exterior-led-hottub.jpg";
import thermoCoverImg from "@/assets/thermo-cover.png";
import hydroMassageImg from "@/assets/hydro-massage.png";
import airBubblesImg from "@/assets/air-bubbles.jpg";
import digitalControllerImg from "@/assets/digital-controller.jpg";
import thermometerImg from "@/assets/thermometer.jpg";
import sandFilterImg from "@/assets/sand-filter.jpeg";
import drainRelayImg from "@/assets/drain-relay.jpeg";
import headCushionImg from "@/assets/head-cushion.jpg";
import blackMarbleImg from "@/assets/black-marble.png";
// Farebné varianty Frame sauny - všetky farby podľa katalógu
import frameSaunaNatural from "@/assets/frame-sauna-natural.jpg";
import frameSauna1Mahagon from "@/assets/frame-sauna-1-mahagon.jpg";
import frameSauna2Teak from "@/assets/frame-sauna-2-teak.jpg";
import frameSauna3SvetlyOrech from "@/assets/frame-sauna-3-svetly-orech.jpg";
import frameSauna4ZlatyDub from "@/assets/frame-sauna-4-zlaty-dub.jpg";
import frameSauna5OlejovanaBorovica from "@/assets/frame-sauna-5-olejovana-borovica.jpg";
import frameSauna14SvetlaPopolavosiva from "@/assets/frame-sauna-14-svetla-popolavosiva.jpg";
import frameSauna15Greige from "@/assets/frame-sauna-15-greige.jpg";
import frameSauna16StudenaSiva from "@/assets/frame-sauna-16-studena-siva.jpg";
import frameSaunaAntracit from "@/assets/frame-sauna-antracit.jpg"; // No. 17
import frameSauna18TmavyOrech from "@/assets/frame-sauna-18-tmavy-orech.jpg";
import frameSauna20TmavyMahagon from "@/assets/frame-sauna-20-tmavy-mahagon.jpg";
// Farebné varianty ModulSauny - všetky farby podľa katalógu
import modulsaunaNatural from "@/assets/modulsauna-natural.jpg";
import modulsauna1Mahagon from "@/assets/modulsauna-1-mahagon.jpg";
import modulsauna2Teak from "@/assets/modulsauna-2-teak.jpg";
import modulsauna3SvetlyOrech from "@/assets/modulsauna-3-svetly-orech.jpg";
import modulsauna4ZlatyDub from "@/assets/modulsauna-4-zlaty-dub.jpg";
import modulsauna5OlejovanaBorovica from "@/assets/modulsauna-5-olejovana-borovica.jpg";
import modulsauna14SvetlaPopolavosiva from "@/assets/modulsauna-14-svetla-popolavosiva.jpg";
import modulsauna15Greige from "@/assets/modulsauna-15-greige.jpg";
import modulsauna16StudenaSiva from "@/assets/modulsauna-16-studena-siva.jpg";
import modulsauna17Antracit from "@/assets/modulsauna-17-antracit.jpg";
import modulsauna18TmavyOrech from "@/assets/modulsauna-18-tmavy-orech.jpg";
import modulsauna20TmavyMahagon from "@/assets/modulsauna-20-tmavy-mahagon.jpg";
// Farebné varianty LUX MINI sauny - všetky farby podľa katalógu
import luxminiNatural from "@/assets/luxmini-natural.jpg";
import luxmini1Mahagon from "@/assets/luxmini-1-mahagon.jpg";
import luxmini2Teak from "@/assets/luxmini-2-teak.jpg";
import luxmini3SvetlyOrech from "@/assets/luxmini-3-svetly-orech.jpg";
import luxmini4ZlatyDub from "@/assets/luxmini-4-zlaty-dub.jpg";
import luxmini5OlejovanaBorovica from "@/assets/luxmini-5-olejovana-borovica.jpg";
import luxmini14SvetlaPopolavosiva from "@/assets/luxmini-14-svetla-popolavosiva.jpg";
import luxmini15Greige from "@/assets/luxmini-15-greige.jpg";
import luxmini16StudenaSiva from "@/assets/luxmini-16-studena-siva.jpg";
import luxmini17Antracit from "@/assets/luxmini-17-antracit.jpg";
import luxmini18TmavyOrech from "@/assets/luxmini-18-tmavy-orech.jpg";
import luxmini20TmavyMahagon from "@/assets/luxmini-20-tmavy-mahagon.jpg";
// Farebné varianty 2M Round sauny - všetky farby podľa katalógu
import round2mNatural from "@/assets/2mround-natural.jpg";
import round2m1Mahagon from "@/assets/2mround-1-mahagon.jpg";
import round2m2Teak from "@/assets/2mround-2-teak.jpg";
import round2m3SvetlyOrech from "@/assets/2mround-3-svetly-orech.jpg";
import round2m4ZlatyDub from "@/assets/2mround-4-zlaty-dub.jpg";
import round2m5OlejovanaBorovica from "@/assets/2mround-5-olejovana-borovica.jpg";
import round2m14SvetlaPopolavosiva from "@/assets/2mround-14-svetla-popolavosiva.jpg";
import round2m15Greige from "@/assets/2mround-15-greige.jpg";
import round2m16StudenaSiva from "@/assets/2mround-16-studena-siva.jpg";
import round2m17Antracit from "@/assets/2mround-17-antracit.jpg";
import round2m18TmavyOrech from "@/assets/2mround-18-tmavy-orech.jpg";
import round2m20TmavyMahagon from "@/assets/2mround-20-tmavy-mahagon.jpg";
// Farebné varianty Insulated Harmony sauny
import harmony1Mahagon from "@/assets/harmony-1-mahagon.jpg";
import harmony2Teak from "@/assets/harmony-2-teak.jpg";
import harmony3SvetlyOrech from "@/assets/harmony-3-svetly-orech.jpg";
import harmony4ZlatyDub from "@/assets/harmony-4-zlaty-dub.jpg";
import harmony5OlejovanaBorovica from "@/assets/harmony-5-olejovana-borovica.jpg";
import harmony14SvetlaPopolavosiva from "@/assets/harmony-14-svetla-popolavosiva.jpg";
import harmony15Greige from "@/assets/harmony-15-greige.jpg";
import harmony16StudenaSiva from "@/assets/harmony-16-studena-siva.jpg";
import harmony17Antracit from "@/assets/harmony-17-antracit.jpg";
import harmony18TmavyOrech from "@/assets/harmony-18-tmavy-orech.jpg";
import harmony20TmavyMahagon from "@/assets/harmony-20-tmavy-mahagon.jpg";
import harmonyNatural from "@/assets/harmony-natural.jpg";
import harmonyGallery1 from "@/assets/harmony-gallery-1.jpg";
import harmonyGallery2 from "@/assets/harmony-gallery-2.jpg";
import harmonyGallery3 from "@/assets/harmony-gallery-3.jpg";
import harmonyGallery4 from "@/assets/harmony-gallery-4.jpg";
import harmonyGallery5 from "@/assets/harmony-gallery-5.jpg";
import harmonyGallery6 from "@/assets/harmony-gallery-6.jpg";
import harmonyGallery7 from "@/assets/harmony-gallery-7.jpg";

// Galérijné fotky pre jednotlivé modely (rôzne uhly pohľadu)
import frameSaunaGallery1 from "@/assets/frame-sauna-gallery-1.jpg";
import frameSaunaGallery2 from "@/assets/frame-sauna-gallery-2.jpg";
import frameSaunaGallery3 from "@/assets/frame-sauna-gallery-3.jpg";
import frameSaunaGallery4 from "@/assets/frame-sauna-gallery-4.jpg";
import frameSaunaGallery5 from "@/assets/frame-sauna-gallery-5.jpg";
import frameSaunaGallery6 from "@/assets/frame-sauna-gallery-6.jpg";
import frameSaunaGallery7 from "@/assets/frame-sauna-gallery-7.jpg";
import frameSaunaGallery8 from "@/assets/frame-sauna-gallery-8.jpg";
import frameSaunaGallery9 from "@/assets/frame-sauna-gallery-9.jpg";
import frameSaunaGallery10 from "@/assets/frame-sauna-gallery-10.jpg";
import modulsaunaGallery1 from "@/assets/modulsauna-gallery-1.jpg";
import pergolaMain from "@/assets/pergola-main.jpg";
import modulsaunaGallery2 from "@/assets/modulsauna-gallery-2.jpg";
import modulsaunaGallery3 from "@/assets/modulsauna-gallery-3.jpg";
import modulsaunaGallery4 from "@/assets/modulsauna-gallery-4.jpg";
import modulsaunaGallery5 from "@/assets/modulsauna-gallery-5.jpg";
import modulsaunaGallery6 from "@/assets/modulsauna-gallery-6.jpg";
import modulsaunaGallery7 from "@/assets/modulsauna-gallery-7.jpg";
import modulsaunaGallery8 from "@/assets/modulsauna-gallery-8.jpg";
import luxminiGallery1 from "@/assets/luxmini-gallery-1.jpg";
import luxminiGallery2 from "@/assets/luxmini-gallery-2.jpg";
import luxminiGallery3 from "@/assets/luxmini-gallery-3.jpg";
import luxminiGallery4 from "@/assets/luxmini-gallery-4.jpg";
import luxminiGallery5 from "@/assets/luxmini-gallery-5.jpg";
import luxminiGallery6 from "@/assets/luxmini-gallery-6.jpg";
import luxminiGallery7 from "@/assets/luxmini-gallery-7.jpg";
import round2mGallery1 from "@/assets/2mround-gallery-1.jpg";
import round2mGallery2 from "@/assets/2mround-gallery-2.jpg";
import round2mGallery3 from "@/assets/2mround-gallery-3.jpg";
import round2mGallery4 from "@/assets/2mround-gallery-4.jpg";
import round2mGallery5 from "@/assets/2mround-gallery-5.jpg";
import round2mGallery6 from "@/assets/2mround-gallery-6.jpg";

import nordicBarrelThumbnail from "@/assets/nordic-barrel-thumbnail.jpg";
import nordicBarrelGallery2 from "@/assets/nordic-barrel-gallery-2.jpg";
import nordicBarrelGallery3 from "@/assets/nordic-barrel-gallery-3.jpg";
import nordicBarrelGallery4 from "@/assets/nordic-barrel-gallery-4.jpg";
import nordicBarrelGallery5 from "@/assets/nordic-barrel-gallery-5.jpg";
import nordicBarrelGallery6 from "@/assets/nordic-barrel-gallery-6.jpg";
import nordicBarrelGallery7 from "@/assets/nordic-barrel-gallery-7.jpg";
import nordicBarrelGallery8 from "@/assets/nordic-barrel-gallery-8.jpg";

import arcticShellGlassGallery0 from "@/assets/arctic-shell-gallery-0.jpg";
import arcticShellGlassGallery1 from "@/assets/arctic-shell-gallery-1.jpg";
import arcticShellGlassGallery2 from "@/assets/arctic-shell-gallery-2.jpg";
import arcticShellGlassGallery3 from "@/assets/arctic-shell-gallery-3.jpg";
import arcticShellGlassGallery4 from "@/assets/arctic-shell-gallery-4.jpg";
import arcticShellGlassGallery5 from "@/assets/arctic-shell-gallery-5.jpg";
import arcticShellGlassGallery6 from "@/assets/arctic-shell-gallery-6.jpg";

import arcticCabinGallery0 from "@/assets/arctic-cabin-gallery-0.jpg";
import arcticCabinGallery1 from "@/assets/arctic-cabin-gallery-1.jpg";
import arcticCabinGallery2 from "@/assets/arctic-cabin-gallery-2.jpg";
import arcticCabinGallery3 from "@/assets/arctic-cabin-gallery-3.jpg";
import arcticCabinGallery4 from "@/assets/arctic-cabin-gallery-4.jpg";
import arcticCabinGallery5 from "@/assets/arctic-cabin-gallery-5.jpg";
import arcticCabinGallery6 from "@/assets/arctic-cabin-gallery-6.jpg";
import arcticCabinGallery7 from "@/assets/arctic-cabin-gallery-7.jpg";
import arcticCabinGallery8 from "@/assets/arctic-cabin-gallery-8.jpg";
import arcticPodGallery0 from "@/assets/arctic-pod-gallery-0.jpg";
import arcticPodGallery1 from "@/assets/arctic-pod-gallery-1.jpg";
import arcticPodGallery2 from "@/assets/arctic-pod-gallery-2.jpg";
import arcticPodGallery3 from "@/assets/arctic-pod-gallery-3.jpg";
import arcticPodGallery4 from "@/assets/arctic-pod-gallery-4.jpg";
import arcticPodGallery5 from "@/assets/arctic-pod-gallery-5.jpg";
import arcticPodGallery6 from "@/assets/arctic-pod-gallery-6.jpg";

type ProductCategory = "sauna" | "hottub" | "combo";

type WoodType = "spruce" | "thermo";

type HeaterModelType = "none" | string;

type SaunaColorType =
  | "none"
  | "1-mahagon"
  | "2-teak"
  | "3-svetly-orech"
  | "4-zlaty-dub"
  | "5-olejovana-borovica"
  | "14-svetla-popolavosiva"
  | "15-greige"
  | "16-studena-siva"
  | "17-antracit"
  | "18-tmavy-orech"
  | "20-tmavy-mahagon";

type SaunaType = {
  id: string;
  name: string;
  dimensions: string;
  basePrice: number;
  image: string;
  hasWoodType: boolean;
  hasLed: boolean;
  hasExteriorLed: boolean;
  hasBluetooth: boolean;
  hasAccessoryKit: boolean;
  hasHeater: boolean;
  hasColor: boolean;
  hasWindow: boolean;
  hasMirrorFilm: boolean;
  hasMetalBands: boolean;
  hasThermoCladding: boolean;
  hasBenchOptions: boolean;
  availableWoodTypes: WoodType[];
  allowedLedOptions?: string[];
  windowOptions: ConfigOption[];
  mirrorFilmOptions: ConfigOption[];
  metalBandsOptions: ConfigOption[];
  thermoCladdingOptions: ConfigOption[];
  benchOptions: ConfigOption[];
};

// Modely ohrievačov podľa typu
type HeaterModel = {
  id: string;
  name: string;
  price: number;
};

// Farebné swatche pre UI (bez cien) – ceny a názvy idú vždy z PHP API.
const saunaColorSwatches: Record<SaunaColorType, { nameFallback: string; colorHsl: string }> = {
  none: { nameFallback: "Bez farby (Natural)", colorHsl: "transparent" },
  "1-mahagon": { nameFallback: "Mahagón", colorHsl: "hsl(6 29% 33%)" },
  "2-teak": { nameFallback: "Teak", colorHsl: "hsl(30 60% 45%)" },
  "3-svetly-orech": { nameFallback: "Svetlý orech", colorHsl: "hsl(35 40% 50%)" },
  "4-zlaty-dub": { nameFallback: "Zlatý dub", colorHsl: "hsl(45 70% 50%)" },
  "5-olejovana-borovica": { nameFallback: "Olejovaná borovica", colorHsl: "hsl(43 60% 55%)" },
  "14-svetla-popolavosiva": { nameFallback: "Svetlá popolavosivá", colorHsl: "hsl(0 0% 45%)" },
  "15-greige": { nameFallback: "Greige", colorHsl: "hsl(30 10% 40%)" },
  "16-studena-siva": { nameFallback: "Studená sivá", colorHsl: "hsl(0 0% 35%)" },
  "17-antracit": { nameFallback: "Antracit", colorHsl: "hsl(0 0% 22%)" },
  "18-tmavy-orech": { nameFallback: "Tmavý orech", colorHsl: "hsl(25 30% 35%)" },
  "20-tmavy-mahagon": { nameFallback: "Tmavý mahagón", colorHsl: "hsl(6 35% 28%)" },
};

const isSaunaColorType = (id: string): id is SaunaColorType => {
  return Object.prototype.hasOwnProperty.call(saunaColorSwatches, id);
};

// Reálne obrázky podľa farby pre každý model sauny
// Structure: saunaId -> colorId -> imagePath
const saunaColorImages: Record<string, Record<SaunaColorType, string>> = {
  "nordic-frame": {
    none: frameSaunaNatural,
    "1-mahagon": frameSauna1Mahagon,
    "2-teak": frameSauna2Teak,
    "3-svetly-orech": frameSauna3SvetlyOrech,
    "4-zlaty-dub": frameSauna4ZlatyDub,
    "5-olejovana-borovica": frameSauna5OlejovanaBorovica,
    "14-svetla-popolavosiva": frameSauna14SvetlaPopolavosiva,
    "15-greige": frameSauna15Greige,
    "16-studena-siva": frameSauna16StudenaSiva,
    "17-antracit": frameSaunaAntracit,
    "18-tmavy-orech": frameSauna18TmavyOrech,
    "20-tmavy-mahagon": frameSauna20TmavyMahagon,
  },
  "aurora-cube": {
    none: modulsaunaNatural,
    "1-mahagon": modulsauna1Mahagon,
    "2-teak": modulsauna2Teak,
    "3-svetly-orech": modulsauna3SvetlyOrech,
    "4-zlaty-dub": modulsauna4ZlatyDub,
    "5-olejovana-borovica": modulsauna5OlejovanaBorovica,
    "14-svetla-popolavosiva": modulsauna14SvetlaPopolavosiva,
    "15-greige": modulsauna15Greige,
    "16-studena-siva": modulsauna16StudenaSiva,
    "17-antracit": modulsauna17Antracit,
    "18-tmavy-orech": modulsauna18TmavyOrech,
    "20-tmavy-mahagon": modulsauna20TmavyMahagon,
  },
  "arctic-shell": {
    none: luxminiNatural,
    "1-mahagon": luxmini1Mahagon,
    "2-teak": luxmini2Teak,
    "3-svetly-orech": luxmini3SvetlyOrech,
    "4-zlaty-dub": luxmini4ZlatyDub,
    "5-olejovana-borovica": luxmini5OlejovanaBorovica,
    "14-svetla-popolavosiva": luxmini14SvetlaPopolavosiva,
    "15-greige": luxmini15Greige,
    "16-studena-siva": luxmini16StudenaSiva,
    "17-antracit": luxmini17Antracit,
    "18-tmavy-orech": luxmini18TmavyOrech,
    "20-tmavy-mahagon": luxmini20TmavyMahagon,
  },
  "forest-barrel": {
    none: round2mNatural,
    "1-mahagon": round2m1Mahagon,
    "2-teak": round2m2Teak,
    "3-svetly-orech": round2m3SvetlyOrech,
    "4-zlaty-dub": round2m4ZlatyDub,
    "5-olejovana-borovica": round2m5OlejovanaBorovica,
    "14-svetla-popolavosiva": round2m14SvetlaPopolavosiva,
    "15-greige": round2m15Greige,
    "16-studena-siva": round2m16StudenaSiva,
    "17-antracit": round2m17Antracit,
    "18-tmavy-orech": round2m18TmavyOrech,
    "20-tmavy-mahagon": round2m20TmavyMahagon,
  },
  "nordic-harmony": {
    none: harmonyNatural,
    "1-mahagon": harmony1Mahagon,
    "2-teak": harmony2Teak,
    "3-svetly-orech": harmony3SvetlyOrech,
    "4-zlaty-dub": harmony4ZlatyDub,
    "5-olejovana-borovica": harmony5OlejovanaBorovica,
    "14-svetla-popolavosiva": harmony14SvetlaPopolavosiva,
    "15-greige": harmony15Greige,
    "16-studena-siva": harmony16StudenaSiva,
    "17-antracit": harmony17Antracit,
    "18-tmavy-orech": harmony18TmavyOrech,
    "20-tmavy-mahagon": harmony20TmavyMahagon,
  },
};

// Galérijné fotky pre každý model (rôzne uhly pohľadu - nemenia sa podľa farby)
const saunaGalleryImages: Record<string, string[]> = {
  "arctic-shell-glass": [
    arcticShellGlassGallery0,
    arcticShellGlassGallery1,
    arcticShellGlassGallery2,
    arcticShellGlassGallery3,
    arcticShellGlassGallery4,
    arcticShellGlassGallery5,
    arcticShellGlassGallery6,
  ],
  "nordic-barrel": [
    nordicBarrelGallery2,
    nordicBarrelGallery3,
    nordicBarrelGallery4,
    nordicBarrelGallery5,
    nordicBarrelGallery6,
    nordicBarrelGallery7,
    nordicBarrelGallery8,
  ],
  "nordic-frame": [
    frameSaunaGallery1,
    frameSaunaGallery2,
    frameSaunaGallery3,
    frameSaunaGallery4,
    frameSaunaGallery5,
    frameSaunaGallery6,
    frameSaunaGallery7,
    frameSaunaGallery8,
    frameSaunaGallery9,
    frameSaunaGallery10,
  ],
  "aurora-cube": [
    modulsaunaGallery1,
    modulsaunaGallery2,
    modulsaunaGallery3,
    modulsaunaGallery4,
    modulsaunaGallery5,
    modulsaunaGallery6,
    modulsaunaGallery7,
    modulsaunaGallery8,
  ],
  "arctic-shell": [
    luxminiGallery1,
    luxminiGallery2,
    luxminiGallery3,
    luxminiGallery4,
    luxminiGallery5,
    luxminiGallery6,
    luxminiGallery7,
  ],
  "forest-barrel": [
    round2mGallery1,
    round2mGallery2,
    round2mGallery3,
    round2mGallery4,
    round2mGallery5,
    round2mGallery6,
  ],
  "nordic-harmony": [
    harmonyGallery1,
    harmonyGallery2,
    harmonyGallery3,
    harmonyGallery4,
    harmonyGallery5,
    harmonyGallery6,
    harmonyGallery7,
  ],
  "arctic-cabin": [
    arcticCabinGallery0,
    arcticCabinGallery1,
    arcticCabinGallery2,
    arcticCabinGallery3,
    arcticCabinGallery4,
    arcticCabinGallery5,
    arcticCabinGallery6,
    arcticCabinGallery7,
    arcticCabinGallery8,
  ],
  "arctic-pod": [
    arcticPodGallery0,
    arcticPodGallery1,
    arcticPodGallery2,
    arcticPodGallery3,
    arcticPodGallery4,
    arcticPodGallery5,
    arcticPodGallery6,
  ],
};

// UI meta pre sauna typy – len lokálne obrázky, všetko ostatné z PHP API.
type SaunaTypePreset = {
  image: string;
};

const saunaTypePresets: Record<string, SaunaTypePreset> = {
  "nordic-frame": { image: saunaCube },
  "aurora-cube": { image: saunaTraditional },
  "arctic-shell": { image: saunaInterior },
  "arctic-shell-glass": { image: arcticShellGlassGallery0 },
  "arctic-cabin": { image: arcticCabinGallery0 },
  "nordic-barrel": { image: nordicBarrelThumbnail },
  "forest-barrel": { image: round2m1Mahagon },
  "nordic-harmony": { image: saunaHarmony },
  "arctic-pod": { image: arcticPodGallery0 },
};

type ConfigOption = {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image?: string;
  description?: string;
};

type HotTubType = {
  id: string;
  name: string;
  dimensions: string;
  basePrice: number;
  image: string;
  galleryImages: string[];
  hasSize: boolean;
  hasExteriorWood: boolean;
  hasHeater: boolean;
  hasUnderwaterLed: boolean;
  hasExteriorLed: boolean;
  hasHydroMassage: boolean;
  hasCover: boolean;
  hasCoverColor: boolean;
  sizeOptions: ConfigOption[];
  exteriorWoodOptions: ConfigOption[];
  acrylicLinerOptions: ConfigOption[];
  heaterOptions: ConfigOption[];
  underwaterLedOptions: ConfigOption[];
  exteriorLedOptions: ConfigOption[];
  hydroMassageOptions: ConfigOption[];
  coverOptions: ConfigOption[];
};

type ComboType = {
  id: string;
  name: string;
  dimensions: string;
  basePrice: number;
  image: string;
  galleryImages: string[];
  hasWoodType: boolean;
  availableWoodTypes: WoodType[];
  windowOptions: ConfigOption[];
  // Sauna-side options
  hasHeaterType: boolean;
  hasColor: boolean;
  hasLed: boolean;
  hasExteriorLed: boolean;
  hasBluetooth: boolean;
  hasAccessoryKit: boolean;
  hasMirrorFilm: boolean;
  hasMetalBands: boolean;
  hasThermoCladding: boolean;
  hasBenchOptions: boolean;
  mirrorFilmOptions: ConfigOption[];
  metalBandsOptions: ConfigOption[];
  thermoCladdingOptions: ConfigOption[];
  benchOptions: ConfigOption[];
  // Hottub-side options
  hasHeater: boolean;
  heaterOptions: ConfigOption[];
  hasCover: boolean;
  coverOptions: ConfigOption[];
  hasCoverColor: boolean;
  hasUnderwaterLed: boolean;
  underwaterLedOptions: ConfigOption[];
  hasExteriorLedHottub: boolean;
  exteriorLedOptions: ConfigOption[];
  hasHydroMassage: boolean;
  hydroMassageOptions: ConfigOption[];
};

type ApiComboType = {
  id: string;
  label: string;
  basePrice: number;
  dimensions: string;
  woodTypes: WoodType[];
  woodTypePrices?: Record<WoodType, number>;
  hasWoodType: boolean;
  windowOptions?: ApiOption[];
  // Sauna-side
  hasHeaterType?: boolean;
  hasColor?: boolean;
  hasLed?: boolean;
  hasExteriorLed?: boolean;
  hasBluetooth?: boolean;
  hasAccessoryKit?: boolean;
  hasMirrorFilm?: boolean;
  hasMetalBands?: boolean;
  hasThermoCladding?: boolean;
  hasBenchOptions?: boolean;
  mirrorFilmOptions?: ApiOptionSource;
  metalBandsOptions?: ApiOptionSource;
  thermoCladdingOptions?: ApiOptionSource;
  benchOptions?: ApiOptionSource;
  // Hottub-side
  hasHeater?: boolean;
  heaterOptions?: ApiOption[];
  hasCover?: boolean;
  coverOptions?: ApiOption[];
  hasCoverColor?: boolean;
  hasUnderwaterLed?: boolean;
  underwaterLedOptions?: ApiOption[];
  hasExteriorLedHottub?: boolean;
  exteriorLedOptions?: ApiOption[];
  hasHydroMassage?: boolean;
  hydroMassageOptions?: ApiOption[];
};

type ApiOption = {
  id: string;
  label: string;
  price: number;
  originalPrice?: number;
  description?: string;
};

type ApiOptionMapValue = {
  label: string;
  price: number;
  originalPrice?: number;
  description?: string;
};

type ApiOptionSource = ApiOption[] | Record<string, ApiOptionMapValue>;

type ApiSaunaType = {
  id: string;
  label: string;
  basePrice: number;
  dimensions: string;
  woodTypes: WoodType[];
  woodTypePrices?: Record<WoodType, number>;
  hasWoodType: boolean;
  hasExteriorLed: boolean;
  hasLed: boolean;
  hasBluetooth: boolean;
  hasAccessoryKit: boolean;
  hasHeater: boolean;
  hasColor: boolean;
  hasWindow: boolean;
  hasMirrorFilm: boolean;
  hasMetalBands: boolean;
  hasThermoCladding: boolean;
  hasBenchOptions: boolean;
  allowedLedOptions?: string[];
  windowOptions?: ApiOptionSource;
  mirrorFilmOptions?: ApiOptionSource;
  metalBandsOptions?: ApiOptionSource;
  thermoCladdingOptions?: ApiOptionSource;
  benchOptions?: ApiOptionSource;
};

type ApiHotTubType = {
  id: string;
  label: string;
  basePrice: number;
  dimensions: string;
  sizeOptions?: ApiOption[];
  exteriorWoodOptions?: ApiOption[];
  heaterOptions?: ApiOption[];
  underwaterLedOptions?: ApiOption[];
  exteriorLedOptions?: ApiOption[];
  hydroMassageOptions?: ApiOption[];
  coverOptions?: ApiOption[];
  hasSize: boolean;
  hasExteriorWood: boolean;
  hasHeater: boolean;
  hasUnderwaterLed: boolean;
  hasExteriorLed: boolean;
  hasHydroMassage: boolean;
  hasCover: boolean;
  hasCoverColor: boolean;
};

type ApiHeaterModel = {
  [key: string]: { label: string; price: number };
};

type ApiConfig = {
  products: { sauna: number; hottub: number; combo?: number };
  saunaTypes: ApiSaunaType[];
  heaterModels: {
    electric: ApiHeaterModel;
    wood: ApiHeaterModel;
  };
  exteriorLed: { label: string; price: number };
  sauna: {
    basePrice?: number;
    woodTypes?: { [key: string]: { label: string; price: number } };
    heaterTypes: ApiOption[];
    ledOptions: ApiOption[];
    bluetoothOptions: ApiOption[];
    accessoryKitOptions: ApiOption[];
    colorOptions: ApiOption[];
    windowOptions?: ApiOptionSource;
    mirrorFilmOptions?: ApiOptionSource;
    metalBandsOptions?: ApiOptionSource;
    thermoCladdingOptions?: ApiOptionSource;
    benchOptions?: ApiOptionSource;
  };
  hottub: {
    basePrice?: number;
    hottubTypes?: ApiHotTubType[];
    coverColorOptions?: ApiOption[];
    airBubblesOptions?: ApiOption[];
    drainRelayOptions?: ApiOption[];
    sandFilterOptions?: ApiOption[];
    electronicControllerOptions?: ApiOption[];
    thermometerOptions?: ApiOption[];
    bluetoothSpeakerOptions?: ApiOption[];
    headCushionOptions?: ApiOption[];
  };
  comboTypes?: ApiComboType[];
};

const toUIOptions = (api: ApiOptionSource | undefined, withImages?: Record<string, string>): ConfigOption[] => {
  if (!api) return [];
  const normalized = Array.isArray(api)
    ? api
    : Object.entries(api).map(([id, option]) => ({
        id,
        label: option.label,
        price: option.price,
        originalPrice: option.originalPrice,
        description: option.description,
      }));
  if (withImages) {
    console.log(
      "[toUIOptions] API IDs:",
      normalized.map((o) => o.id),
      "Image keys:",
      Object.keys(withImages),
    );
  }
  return normalized.map((o) => ({
    id: o.id,
    name: o.label,
    price: Number(o.price || 0),
    originalPrice: o.originalPrice,
    description: o.description,
    image: withImages?.[o.id],
  }));
};

// Extracted outside component to prevent remount/scroll-reset on state changes
const ConfigScrollWrapper = ({
  isDesktop,
  onScroll,
  children,
}: {
  isDesktop: boolean;
  onScroll: React.UIEventHandler<HTMLDivElement>;
  children: React.ReactNode;
}) => {
  if (isDesktop) {
    return (
      <ScrollArea className="h-[calc(100vh-8rem)]" onScrollCapture={onScroll}>
        {children}
      </ScrollArea>
    );
  }
  return <div>{children}</div>;
};

const ScrollableRow = ({ children, cols = 3 }: { children: React.ReactNode; cols?: 2 | 3 }) => {
  const childCount = React.Children.count(children);
  const gridCols = cols === 2 || childCount <= 2 ? "grid-cols-2" : "grid-cols-2 md:grid-cols-3";
  return <div className={cn("grid gap-2 md:gap-3", gridCols)}>{children}</div>;
};

const Configurator = () => {
  const { toast } = useToast();
  const { t, language } = useLanguage();
  const { modelSlug } = useParams<{ modelSlug?: string }>();
  const navigate = useNavigate();
  const location = useLocation();

  // --- API CONFIG ---
  const [apiConfig, setApiConfig] = useState<ApiConfig | null>(null);
  const [isConfigLoading, setIsConfigLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    (async () => {
      try {
        const res = await fetch(`/wp-json/sauna/v1/config?lang=${language}`, {
          credentials: "include",
        });
        if (!res.ok) throw new Error("Config sa nepodarilo načítať");
        const data = (await res.json()) as ApiConfig;

        if (mounted) setApiConfig(data);
      } catch (e) {
        console.error(e);
        toast({
          title: t("error.generic"),
          description: t("error.loadConfigShort"),
          variant: "destructive",
        });
      } finally {
        if (mounted) setIsConfigLoading(false);
      }
    })();

    return () => {
      mounted = false;
    };
  }, [toast, language]);

  // Výber kategórie produktu (sauna / kaďa / kombo)
  const [productCategory, setProductCategory] = useState<ProductCategory | null>(null);

  // Výber typu sauny
  const [selectedSaunaType, setSelectedSaunaType] = useState<SaunaType | null>(null);
  const [selectedHotTubType, setSelectedHotTubType] = useState<HotTubType | null>(null);
  const [selectedComboType, setSelectedComboType] = useState<ComboType | null>(null);
  const [sortOrder, setSortOrder] = useState<"price-asc" | "price-desc" | "name-asc">("price-asc");

  const metaTitle = useMemo(() => {
    const base = language === "en" ? "LuxuRelax | Configurator" : "LuxuRelax | Konfigurátor";
    if (selectedSaunaType) return `${selectedSaunaType.name} | ${base}`;
    if (selectedHotTubType) return `${selectedHotTubType.name} | ${base}`;
    if (selectedComboType) return `${selectedComboType.name} | ${base}`;
    return base;
  }, [language, selectedSaunaType, selectedHotTubType, selectedComboType]);

  useDocumentMeta(
    metaTitle,
    language === "en"
      ? "Configure your dream sauna or hot tub. Choose wood type, heater, lighting and accessories."
      : "Nakonfigurujte si svoju vysnívanú saunu alebo kaďu. Vyberte si typ dreva, ohrievač, osvetlenie a príslušenstvo.",
  );

  // Sauna konfigurácia (ids musia sedieť s PHP configom)
  const [saunaConfig, setSaunaConfig] = useState({
    heaterType: "none",
    heaterModel: "none" as HeaterModelType,
    led: [] as string[],
    exteriorLed: false,
    bluetooth: "none",
    accessoryKit: "none",
    color: "none" as SaunaColorType,
    woodType: "spruce" as WoodType,
    window: "none",
    mirror: "none",
    metal: "none",
    thermoCladding: "none",
    bench: "standard",
  });

  // Kaďa konfigurácia
  const [hotTubConfig, setHotTubConfig] = useState({
    size: "none",
    exteriorWood: "none",
    acrylicLiner: "none",
    heater: "none",
    electricHeater: "none",
    underwaterLed: "none",
    exteriorLed: "none",
    hydroMassage: "none",
    cover: "none",
    coverColor: "none",
    airBubbles: "none",
    drainRelay: "none",
    sandFilter: "none",
    electronicController: "none",
    thermometer: "none",
    bluetoothSpeaker: "none",
    headCushion: "none",
  });

  // Combo konfigurácia
  const [comboConfig, setComboConfig] = useState({
    // Sauna-side
    woodType: "spruce" as WoodType,
    color: "none" as string,
    window: "none",
    heaterType: "none",
    heaterModel: "none" as HeaterModelType,
    led: [] as string[],
    saunaExteriorLed: false,
    bluetooth: "none",
    accessoryKit: "none",
    mirror: "none",
    metal: "none",
    thermoCladding: "none",
    bench: "standard",
    // Hottub-side
    heater: "none",
    electricHeater: "none",
    underwaterLed: "none",
    exteriorLed: "none",
    hydroMassage: "none",
    cover: "none",
    coverColor: "none",
    airBubbles: "none",
    drainRelay: "none",
    sandFilter: "none",
    electronicController: "none",
    thermometer: "none",
    bluetoothSpeaker: "none",
    headCushion: "none",
  });

  // Combo step: 1 = sauna options, 2 = hottub options
  const [comboStep, setComboStep] = useState<1 | 2>(1);

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [showScrollIndicator, setShowScrollIndicator] = useState(true);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  const windowImages: Record<string, string> = {
    "panoramic": panoramicRoofWindow,
    "panoramic-roof": panoramicRoofWindow,
    "panoramic-window": panoramicRoofWindow,
    "yes": panoramicRoofWindow,
  };


  useEffect(() => {
    const mql = window.matchMedia("(min-width: 1024px)");
    const onChange = () => setIsDesktop(mql.matches);
    mql.addEventListener("change", onChange);
    setIsDesktop(mql.matches);
    return () => mql.removeEventListener("change", onChange);
  }, []);

  const handleScroll = useCallback((e: React.UIEvent<HTMLDivElement>) => {
    const target = e.target as HTMLDivElement;
    if (target.scrollTop > 50) setShowScrollIndicator(false);
  }, []);

  // --- LED multi helpers ---
  const ledSelected = saunaConfig.led ?? [];
  const isLedSelected = (id: string) => ledSelected.includes(id);
  const toggleLed = (id: string) => {
    setSaunaConfig((prev) => {
      const current = prev.led ?? [];
      const next = current.includes(id) ? current.filter((x) => x !== id) : [...current, id];
      return { ...prev, led: next };
    });
  };

  const resetLed = () => {
    setSaunaConfig((prev) => ({ ...prev, led: [] }));
  };

  // --- Images pre galériu - mení sa podľa vybranej farby ---
  const currentSaunaImage = useMemo(() => {
    if (!selectedSaunaType) return saunaBarrel;

    // Ak má farbu a existuje mapa farieb pre tento model
    if (selectedSaunaType.hasColor && saunaColorImages[selectedSaunaType.id]) {
      return saunaColorImages[selectedSaunaType.id][saunaConfig.color] || selectedSaunaType.image;
    }

    return selectedSaunaType.image;
  }, [selectedSaunaType, saunaConfig.color]);

  const images = useMemo(() => {
    if (productCategory === "combo") {
      const mainImg = selectedComboType?.image ?? saunaBarrel;
      const gallery = selectedComboType?.galleryImages ?? [];
      return [mainImg, ...gallery];
    }
    if (productCategory === "hottub") {
      const mainImg = selectedHotTubType?.image ?? hotTub;
      const gallery = selectedHotTubType?.galleryImages ?? [];
      return [mainImg, ...gallery];
    }
    if (selectedSaunaType) {
      const galleryPhotos = saunaGalleryImages[selectedSaunaType.id] || [];
      return [currentSaunaImage, ...galleryPhotos];
    }
    return [saunaBarrel, saunaInterior, saunaCube, saunaTraditional];
  }, [productCategory, selectedSaunaType, selectedHotTubType, selectedComboType, currentSaunaImage]);

  // --- Mapovanie farieb na lokálne obrázky (len pre UI thumbnails) ---
  const saunaColorThumbs: Record<string, string> = {
    color1: saunaBarrel,
    color2: saunaCube,
    color3: saunaTraditional,
    color4: saunaInterior,
  };

  const saunaAccessoryImages: Record<string, string> = {
    kit: saunaKit,
  };

  const saunaSpeakerImage: Record<string, string> = {
    bluetooth: speaker,
  };

  const ledImages: Record<string, string> = {
    benches: ledBenches,
    backrest: ledBackrest,
  };

  const heaterImages: Record<string, string> = {
    electric: electricHeater,
    wood: woodHeater,
  };

  const metalBandsImages: Record<string, string> = {
    "yes": metalBandsImage,
    "metal-bands": metalBandsImage,
    "metal-tightening-bands": metalBandsImage,
  };

  const thermoCladdingImages: Record<string, string> = {
    "yes": thermoCladdingImage,
    "thermo-cladding": thermoCladdingImage,
    "thermo-wood-cladding": thermoCladdingImage,
  };

  const benchImages: Record<string, string> = {
    "standard": oneStoryBenches,
    "one-story": oneStoryBenches,
    "one-story-benches": oneStoryBenches,
    "lshape": twoStoryBenches,
    "l-shape": twoStoryBenches,
    "two-story": twoStoryBenches,
    "two-story-l-shaped": twoStoryBenches,
  };

  // --- UI Options z API configu ---
  // Model-specific options – čítané z selectedSaunaType nižšie v renderingu
  const saunaHeaterTypes: ConfigOption[] = toUIOptions(apiConfig?.sauna.heaterTypes, heaterImages);
  const saunaLedOptions: ConfigOption[] = toUIOptions(apiConfig?.sauna.ledOptions, ledImages);
  const filteredLedOptions = useMemo(() => {
    if (!selectedSaunaType) return saunaLedOptions;

    const allowed = (selectedSaunaType as any).allowedLedOptions;
    if (!allowed) return saunaLedOptions;

    return saunaLedOptions.filter((o) => allowed.includes(o.id));
  }, [saunaLedOptions, selectedSaunaType]);

  const saunaBluetoothOptions: ConfigOption[] = toUIOptions(apiConfig?.sauna.bluetoothOptions, saunaSpeakerImage);
  const saunaAccessoryKitOptions: ConfigOption[] = toUIOptions(
    apiConfig?.sauna.accessoryKitOptions,
    saunaAccessoryImages,
  );
  const saunaColorOptions: ConfigOption[] = toUIOptions(apiConfig?.sauna.colorOptions, saunaColorThumbs);

  const saunaColorOptionsTyped = useMemo(
    () => saunaColorOptions.filter((o): o is ConfigOption & { id: SaunaColorType } => isSaunaColorType(o.id)),
    [saunaColorOptions],
  );

  const exteriorWoodImages: Record<string, string> = {
    spruce: spruceWood2Img,
    thermo: thermoWood2Img,
    wpc: wpcPlastImg,
  };

  const WOOD_NONE_IDS = new Set(["none", "bez", "bez-vonkajsieho-dreva"]);
  const WOOD_IDS = new Set([
    "spruce",
    "thermo",
    "wpc",
    "smrek",
    "smrekovec",
    "borovica",
    "none",
    "bez",
    "bez-vonkajsieho-dreva",
  ]);

  const acrylicLinerImages: Record<string, string> = {
    "blue-marble": blueMarbleImg,
    "gray-acrylic": grayAcrylicImg,
    gray: grayAcrylicImg,
    seda: grayAcrylicImg,
    grey: grayAcrylicImg,
    "white-acrylic": whiteAcrylicImg,
    white: whiteAcrylicImg,
    "acryl-white": whiteAcrylicImg,
    "akryl-biela": whiteAcrylicImg,
    "black-marble": blackMarbleImg,
    black: blackMarbleImg,
    cierna: blackMarbleImg,
    "cierna-imitacia-mramoru": blackMarbleImg,
    blue: blueMarbleImg,
    modra: blueMarbleImg,
    "modra-imitacia-mramoru": blueMarbleImg,
  };

  const hotTubCoverColorOptions: ConfigOption[] = toUIOptions(apiConfig?.hottub.coverColorOptions, {
    black: coverBlackImg,
    cierna: coverBlackImg,
    grey: coverGreyImg,
    seda: coverGreyImg,
    siva: coverGreyImg,
  });
  const hotTubAirBubblesOptions: ConfigOption[] = toUIOptions(
    apiConfig?.hottub.airBubblesOptions,
    Object.fromEntries(
      (apiConfig?.hottub.airBubblesOptions || [])
        .filter((o) => o.id !== "none" && o.id !== "bez")
        .map((o) => [o.id, airBubblesImg]),
    ),
  );
  const hotTubDrainRelayOptions: ConfigOption[] = toUIOptions(
    apiConfig?.hottub.drainRelayOptions,
    Object.fromEntries(
      (apiConfig?.hottub.drainRelayOptions || [])
        .filter((o) => o.id !== "none" && o.id !== "bez")
        .map((o) => [o.id, drainRelayImg]),
    ),
  );
  const hotTubSandFilterOptions: ConfigOption[] = toUIOptions(
    apiConfig?.hottub.sandFilterOptions,
    Object.fromEntries(
      (apiConfig?.hottub.sandFilterOptions || [])
        .filter((o) => o.id !== "none" && o.id !== "bez")
        .map((o) => [o.id, sandFilterImg]),
    ),
  );
  const hotTubElectronicControllerOptions: ConfigOption[] = toUIOptions(
    apiConfig?.hottub.electronicControllerOptions,
    Object.fromEntries(
      (apiConfig?.hottub.electronicControllerOptions || [])
        .filter((o) => o.id !== "none" && o.id !== "bez")
        .map((o) => [o.id, digitalControllerImg]),
    ),
  );
  const hotTubThermometerOptions: ConfigOption[] = toUIOptions(
    apiConfig?.hottub.thermometerOptions,
    Object.fromEntries(
      (apiConfig?.hottub.thermometerOptions || [])
        .filter((o) => o.id !== "none" && o.id !== "bez")
        .map((o) => [o.id, thermometerImg]),
    ),
  );
  const hotTubBluetoothSpeakerOptions: ConfigOption[] = toUIOptions(
    apiConfig?.hottub.bluetoothSpeakerOptions,
    Object.fromEntries(
      (apiConfig?.hottub.bluetoothSpeakerOptions || [])
        .filter((o) => o.id !== "none" && o.id !== "bez")
        .map((o) => [o.id, speaker]),
    ),
  );
  const hotTubHeadCushionOptions: ConfigOption[] = toUIOptions(
    apiConfig?.hottub.headCushionOptions,
    Object.fromEntries(
      (apiConfig?.hottub.headCushionOptions || [])
        .filter((o) => o.id !== "none" && o.id !== "bez")
        .map((o) => [o.id, headCushionImg]),
    ),
  );

  // --- Heater models z API ---
  const electricHeaterModels: HeaterModel[] = useMemo(() => {
    if (!apiConfig?.heaterModels?.electric) return [];
    return Object.entries(apiConfig.heaterModels.electric).map(([id, data]) => ({
      id,
      name: data.label,
      price: data.price,
    }));
  }, [apiConfig]);

  const woodHeaterModels: HeaterModel[] = useMemo(() => {
    if (!apiConfig?.heaterModels?.wood) return [];
    return Object.entries(apiConfig.heaterModels.wood).map(([id, data]) => ({
      id,
      name: data.label,
      price: data.price,
    }));
  }, [apiConfig]);

  // --- Wood types z API (globálne, len pre názvy/obrázky) ---
  const globalWoodTypes = useMemo(() => {
    if (!apiConfig?.sauna?.woodTypes) return {};
    return apiConfig.sauna.woodTypes;
  }, [apiConfig]);

  // --- Získaj aktuálny API sauna typ pre woodTypePrices ---
  const currentApiSaunaType = useMemo(() => {
    if (!selectedSaunaType || !apiConfig?.saunaTypes) return null;
    return apiConfig.saunaTypes.find((st) => st.id === selectedSaunaType.id) ?? null;
  }, [selectedSaunaType, apiConfig]);

  // --- Wood types s cenami špecifickými pre vybraný model ---
  const woodTypeOptionsForModel = useMemo(() => {
    if (!selectedSaunaType || !globalWoodTypes) return [];

    return selectedSaunaType.availableWoodTypes.map((woodId) => {
      const globalData = globalWoodTypes[woodId];
      // Cena z model-specific woodTypePrices, alebo globálna fallback
      const modelPrice = currentApiSaunaType?.woodTypePrices?.[woodId];
      const price = modelPrice !== undefined ? modelPrice : (globalData?.price ?? 0);

      return {
        id: woodId,
        name: globalData?.label ?? woodId,
        price,
        image: woodId === "spruce" ? spruceWoodImg : thermoWoodImg,
      };
    });
  }, [selectedSaunaType, globalWoodTypes, currentApiSaunaType]);

  // --- Exterior LED price z API ---
  const exteriorLedPrice = apiConfig?.exteriorLed?.price ?? 0;

  // --- Sauna typy z API (všetko z PHP) + lokálne UI meta (len obrázky) ---
  const saunaTypesUI: SaunaType[] = useMemo(() => {
    if (!apiConfig?.saunaTypes) return [];

    const saunaTypesArray = Array.isArray(apiConfig.saunaTypes)
      ? apiConfig.saunaTypes
      : Object.entries(apiConfig.saunaTypes).map(([id, st]: any) => ({
          id,
          ...st,
        }));

    const defaultPreset: SaunaTypePreset = {
      image: saunaBarrel,
    };

    return saunaTypesArray.map((st) => {
      const preset = saunaTypePresets[st.id] ?? defaultPreset;

      return {
        id: st.id,
        name: st.label,
        dimensions: st.dimensions ?? "",
        basePrice: st.basePrice,
        image: preset.image,

        hasWoodType: st.hasWoodType ?? (st.woodTypes?.length ?? 0) > 0,
        hasLed: st.hasLed ?? true,
        hasExteriorLed: st.hasExteriorLed ?? false,
        hasBluetooth: st.hasBluetooth ?? true,
        hasAccessoryKit: st.hasAccessoryKit ?? true,
        hasHeater: st.hasHeater ?? true,
        hasColor: st.hasColor ?? true,
        availableWoodTypes: st.woodTypes ?? [],
        allowedLedOptions: st.allowedLedOptions,
        hasWindow: st.hasWindow ?? false,
        hasMirrorFilm: st.hasMirrorFilm ?? false,
        hasMetalBands: st.hasMetalBands ?? false,
        hasThermoCladding: st.hasThermoCladding ?? false,
        hasBenchOptions: st.hasBenchOptions ?? false,
        windowOptions: toUIOptions(st.windowOptions ?? apiConfig.sauna.windowOptions, windowImages),
        mirrorFilmOptions: toUIOptions(st.mirrorFilmOptions ?? apiConfig.sauna.mirrorFilmOptions),
        metalBandsOptions: toUIOptions(st.metalBandsOptions ?? apiConfig.sauna.metalBandsOptions, metalBandsImages),
        thermoCladdingOptions: toUIOptions(st.thermoCladdingOptions ?? apiConfig.sauna.thermoCladdingOptions, thermoCladdingImages),
        benchOptions: toUIOptions(st.benchOptions ?? apiConfig.sauna.benchOptions, benchImages),
      };
    });
  }, [apiConfig]);

  const hotTubImageMap: Record<string, string> = {
    "arctic-ritual": acrylicRoundMain,
    "nordic-forge": squareExtMain,
    "arctic-ember": squareIntMain,
  };
  const hotTubGalleryMap: Record<string, string[]> = {
    "arctic-ritual": [acrylicRoundGallery1, acrylicRoundGallery2, acrylicRoundGallery3, acrylicRoundGallery4],
    "nordic-forge": [
      squareExtGallery1,
      squareExtGallery2,
      squareExtGallery3,
      squareExtGallery4,
      squareExtGallery5,
      squareExtGallery6,
      squareExtGallery7,
    ],
    "arctic-ember": [
      squareIntGallery1,
      squareIntGallery2,
      squareIntGallery3,
      squareIntGallery4,
      squareIntGallery5,
      squareIntGallery6,
      squareIntGallery7,
    ],
  };

  // --- HotTub typy z API ---
  const hottubTypesUI: HotTubType[] = useMemo(() => {
    if (!apiConfig?.hottub?.hottubTypes?.length) return [];
    return apiConfig.hottub.hottubTypes.map((ht) => ({
      id: ht.id,
      name: ht.label,
      dimensions: ht.dimensions ?? "",
      basePrice: ht.basePrice,
      image: hotTubImageMap[ht.id] ?? hotTub,
      galleryImages: hotTubGalleryMap[ht.id] ?? [],
      hasSize: ht.hasSize ?? false,
      hasExteriorWood: ht.hasExteriorWood ?? true,
      hasHeater: ht.hasHeater ?? false,
      hasUnderwaterLed: ht.hasUnderwaterLed ?? true,
      hasExteriorLed: ht.hasExteriorLed ?? true,
      hasHydroMassage: ht.hasHydroMassage ?? true,
      hasCover: ht.hasCover ?? true,
      hasCoverColor: ht.hasCoverColor ?? true,
      sizeOptions: toUIOptions(ht.sizeOptions),
      exteriorWoodOptions: toUIOptions(
        (ht.exteriorWoodOptions || []).filter((o) => WOOD_IDS.has(o.id) && !WOOD_NONE_IDS.has(o.id)),
        exteriorWoodImages,
      ),
      acrylicLinerOptions: toUIOptions(
        (ht.exteriorWoodOptions || []).filter((o) => !WOOD_IDS.has(o.id)),
        acrylicLinerImages,
      ),
      heaterOptions: toUIOptions(ht.heaterOptions, {
        "external-aisi304": integratedHottubHeater,
        "external-aisi316": integratedHottubHeater,
        "electric-3kw": electricHeater3kw,
        "electric-6kw": electricHeater6kw,
      }),
      underwaterLedOptions: toUIOptions(ht.underwaterLedOptions, {
        "1pc": underwaterLed1pc,
        "1ks": underwaterLed1pc,
        "3pc": underwaterLed3pc,
        "3ks": underwaterLed3pc,
      }),
      exteriorLedOptions: toUIOptions(
        ht.exteriorLedOptions,
        Object.fromEntries(
          (ht.exteriorLedOptions || [])
            .filter((o) => o.id !== "none" && o.id !== "bez")
            .map((o) => [o.id, exteriorLedHottubImg]),
        ),
      ),
      hydroMassageOptions: toUIOptions(
        ht.hydroMassageOptions,
        Object.fromEntries(
          (ht.hydroMassageOptions || [])
            .filter((o) => o.id !== "none" && o.id !== "bez")
            .map((o) => [o.id, hydroMassageImg]),
        ),
      ),
      coverOptions: toUIOptions(ht.coverOptions, {
        "200cm": thermoCoverImg,
        "230cm": thermoCoverImg,
        standard: thermoCoverImg,
      }),
    }));
  }, [apiConfig]);

  // --- Combo typy z API (s fallback hardcoded dátami) ---
  const comboTypesUI: ComboType[] = useMemo(() => {
    if (apiConfig?.comboTypes?.length) {
      return apiConfig.comboTypes.map((ct) => ({
        id: ct.id,
        name: ct.label,
        dimensions: ct.dimensions ?? "",
        basePrice: ct.basePrice,
        image: saunaBarrel,
        galleryImages: [],
        hasWoodType: ct.hasWoodType ?? (ct.woodTypes?.length ?? 0) > 0,
        availableWoodTypes: ct.woodTypes ?? [],
        windowOptions: toUIOptions(ct.windowOptions, windowImages),
        // Sauna-side
        hasHeaterType: ct.hasHeaterType ?? true,
        hasColor: ct.hasColor ?? false,
        hasLed: ct.hasLed ?? false,
        hasExteriorLed: ct.hasExteriorLed ?? false,
        hasBluetooth: ct.hasBluetooth ?? false,
        hasAccessoryKit: ct.hasAccessoryKit ?? false,
        hasMirrorFilm: ct.hasMirrorFilm ?? false,
        hasMetalBands: ct.hasMetalBands ?? false,
        hasThermoCladding: ct.hasThermoCladding ?? false,
        hasBenchOptions: ct.hasBenchOptions ?? false,
        mirrorFilmOptions: toUIOptions(ct.mirrorFilmOptions ?? apiConfig.sauna.mirrorFilmOptions),
        metalBandsOptions: toUIOptions(ct.metalBandsOptions ?? apiConfig.sauna.metalBandsOptions, metalBandsImages),
        thermoCladdingOptions: toUIOptions(ct.thermoCladdingOptions ?? apiConfig.sauna.thermoCladdingOptions, thermoCladdingImages),
        benchOptions: toUIOptions(ct.benchOptions ?? apiConfig.sauna.benchOptions, benchImages),
        // Hottub-side
        hasHeater: ct.hasHeater ?? false,
        heaterOptions: toUIOptions(ct.heaterOptions, {
          "external-aisi304": integratedHottubHeater,
          "external-aisi316": integratedHottubHeater,
          "electric-3kw": electricHeater3kw,
          "electric-6kw": electricHeater6kw,
        }),
        hasCover: ct.hasCover ?? false,
        coverOptions: toUIOptions(ct.coverOptions, {
          "200cm": thermoCoverImg,
          "230cm": thermoCoverImg,
          standard: thermoCoverImg,
        }),
        hasCoverColor: ct.hasCoverColor ?? false,
        hasUnderwaterLed: ct.hasUnderwaterLed ?? false,
        underwaterLedOptions: toUIOptions(ct.underwaterLedOptions, {
          "1pc": underwaterLed1pc,
          "3pc": underwaterLed3pc,
        }),
        hasExteriorLedHottub: ct.hasExteriorLedHottub ?? false,
        exteriorLedOptions: toUIOptions(
          ct.exteriorLedOptions,
          Object.fromEntries(
            (ct.exteriorLedOptions || [])
              .filter((o) => o.id !== "none" && o.id !== "bez")
              .map((o) => [o.id, exteriorLedHottubImg]),
          ),
        ),
        hasHydroMassage: ct.hasHydroMassage ?? false,
        hydroMassageOptions: toUIOptions(
          ct.hydroMassageOptions,
          Object.fromEntries(
            (ct.hydroMassageOptions || [])
              .filter((o) => o.id !== "none" && o.id !== "bez")
              .map((o) => [o.id, hydroMassageImg]),
          ),
        ),
      }));
    }

    // Žiadne fallbacky – všetko pochádza z PHP API
    return [];
  }, [apiConfig, t]);

  // --- URL sync: auto-select model from URL slug ---
  const hasAppliedSlug = useRef(false);
  useEffect(() => {
    if (!modelSlug || hasAppliedSlug.current) return;
    if (!saunaTypesUI.length && !hottubTypesUI.length && !comboTypesUI.length) return;

    const slugToId: Record<string, string> = {
      "frame-sauna": "nordic-frame",
      "nordic-frame": "nordic-frame",
      "frame-inspire": "nordic-frame",
      modulsauna: "aurora-cube",
      "aurora-cube": "aurora-cube",
      "arctic-shell": "arctic-shell",
      "lux-sauna": "arctic-shell",
      "2m-round": "forest-barrel",
      "forest-barrel": "forest-barrel",
      "barrel-sauna": "forest-barrel",
      harmony: "nordic-harmony",
      "nordic-harmony": "nordic-harmony",
      "iglu-2in1": "iglu-2in1",
      "oasis-2in1": "oasis-2in1",
      "modulspa-2in1": "modulspa-2in1",
    };

    const resolvedId = slugToId[modelSlug] || modelSlug;

    const matchedSauna = saunaTypesUI.find((st) => st.id === resolvedId);
    if (matchedSauna) {
      setProductCategory("sauna");
      setSelectedSaunaType(matchedSauna);
      if (matchedSauna.availableWoodTypes.length > 0) {
        setSaunaConfig((prev) => ({ ...prev, woodType: matchedSauna.availableWoodTypes[0] }));
      }
      hasAppliedSlug.current = true;
      return;
    }

    const matchedHotTub = hottubTypesUI.find((ht) => ht.id === resolvedId);
    if (matchedHotTub) {
      setProductCategory("hottub");
      setSelectedHotTubType(matchedHotTub);
      setHotTubConfig((prev) => ({
        ...prev,
        size: matchedHotTub.sizeOptions.length > 0 ? matchedHotTub.sizeOptions[0].id : "none",
        exteriorWood: matchedHotTub.exteriorWoodOptions.length > 0 ? matchedHotTub.exteriorWoodOptions[0].id : "none",
        acrylicLiner: matchedHotTub.acrylicLinerOptions.length > 0 ? matchedHotTub.acrylicLinerOptions[0].id : "none",
      }));
      hasAppliedSlug.current = true;
      return;
    }

    const matchedCombo = comboTypesUI.find((ct) => ct.id === resolvedId);
    if (matchedCombo) {
      setProductCategory("combo");
      setSelectedComboType(matchedCombo);
      if (matchedCombo.availableWoodTypes.length > 0) {
        setComboConfig((prev) => ({ ...prev, woodType: matchedCombo.availableWoodTypes[0] }));
      }
      hasAppliedSlug.current = true;
    }
  }, [modelSlug, saunaTypesUI, hottubTypesUI, comboTypesUI]);

  // --- Helper to get base configurator path ---
  const getConfigBasePath = useCallback(() => {
    return location.pathname.startsWith("/configurator") ? "/configurator" : "/konfigurator";
  }, [location.pathname]);

  // --- Update URL when model is selected ---
  const selectSaunaTypeWithUrl = useCallback(
    (saunaType: SaunaType) => {
      setSelectedSaunaType(saunaType);
      setProductCategory("sauna");
      if (saunaType.availableWoodTypes.length > 0) {
        setSaunaConfig((prev) => ({ ...prev, woodType: saunaType.availableWoodTypes[0] }));
      }
      const basePath = getConfigBasePath();
      navigate(`${basePath}/${saunaType.id}`, { replace: true });
    },
    [navigate, getConfigBasePath],
  );

  const selectHotTubTypeWithUrl = useCallback(
    (hotTubType: HotTubType) => {
      setSelectedHotTubType(hotTubType);
      setProductCategory("hottub");
      setHotTubConfig((prev) => ({
        ...prev,
        size: hotTubType.sizeOptions.length > 0 ? hotTubType.sizeOptions[0].id : "none",
        exteriorWood: hotTubType.exteriorWoodOptions.length > 0 ? hotTubType.exteriorWoodOptions[0].id : "none",
        acrylicLiner: hotTubType.acrylicLinerOptions.length > 0 ? hotTubType.acrylicLinerOptions[0].id : "none",
      }));
      const basePath = getConfigBasePath();
      navigate(`${basePath}/${hotTubType.id}`, { replace: true });
    },
    [navigate, getConfigBasePath],
  );

  const selectComboTypeWithUrl = useCallback(
    (comboType: ComboType) => {
      setSelectedComboType(comboType);
      setProductCategory("combo");
      if (comboType.availableWoodTypes.length > 0) {
        setComboConfig((prev) => ({ ...prev, woodType: comboType.availableWoodTypes[0] }));
      }
      const basePath = getConfigBasePath();
      navigate(`${basePath}/${comboType.id}`, { replace: true });
    },
    [navigate, getConfigBasePath],
  );

  const minSaunaBasePrice = useMemo(() => {
    const prices = apiConfig?.saunaTypes?.map((s) => s.basePrice) ?? [];
    return prices.length ? Math.min(...prices) : 0;
  }, [apiConfig]);

  const minHotTubBasePrice = useMemo(() => {
    const prices = apiConfig?.hottub?.hottubTypes?.map((h) => h.basePrice) ?? [];
    if (prices.length) return Math.min(...prices);
    return apiConfig?.hottub?.basePrice ?? 0;
  }, [apiConfig]);

  const minComboBasePrice = useMemo(() => {
    if (comboTypesUI.length) return Math.min(...comboTypesUI.map((c) => c.basePrice));
    return 0;
  }, [comboTypesUI]);

  // Výpočet ceny
  const totalPrice = useMemo(() => {
    if (!apiConfig) return 0;

    if (productCategory === "sauna" && selectedSaunaType) {
      const basePrice = selectedSaunaType.basePrice;
      const heater = apiConfig.sauna.heaterTypes.find((h) => h.id === saunaConfig.heaterType)?.price ?? 0;

      // Cena modelu ohrievača
      let heaterModelPrice = 0;
      if (saunaConfig.heaterType === "electric" && saunaConfig.heaterModel !== "none") {
        heaterModelPrice = electricHeaterModels.find((m) => m.id === saunaConfig.heaterModel)?.price ?? 0;
      } else if (saunaConfig.heaterType === "wood" && saunaConfig.heaterModel !== "none") {
        heaterModelPrice = woodHeaterModels.find((m) => m.id === saunaConfig.heaterModel)?.price ?? 0;
      }

      const ledSum = (saunaConfig.led ?? []).reduce((sum, ledId) => {
        const p = apiConfig.sauna.ledOptions.find((l) => l.id === ledId)?.price ?? 0;
        return sum + p;
      }, 0);

      // Vonkajšie LED (cena z API)
      const extLedPrice = saunaConfig.exteriorLed ? exteriorLedPrice : 0;

      const bluetooth = apiConfig.sauna.bluetoothOptions.find((b) => b.id === saunaConfig.bluetooth)?.price ?? 0;
      const kit = apiConfig.sauna.accessoryKitOptions.find((a) => a.id === saunaConfig.accessoryKit)?.price ?? 0;
      const color = apiConfig.sauna.colorOptions.find((c) => c.id === saunaConfig.color)?.price ?? 0;
      const woodPrice = woodTypeOptionsForModel.find((w) => w.id === saunaConfig.woodType)?.price ?? 0;
      const windowPrice = selectedSaunaType.windowOptions.find((w) => w.id === saunaConfig.window)?.price ?? 0;
      const mirrorPrice = selectedSaunaType.mirrorFilmOptions.find((m) => m.id === saunaConfig.mirror)?.price ?? 0;
      const metalPrice = selectedSaunaType.metalBandsOptions.find((m) => m.id === saunaConfig.metal)?.price ?? 0;
      const thermoCladdingPrice = selectedSaunaType.thermoCladdingOptions.find((tc) => tc.id === saunaConfig.thermoCladding)?.price ?? 0;
      const benchPrice = selectedSaunaType.benchOptions.find((b) => b.id === saunaConfig.bench)?.price ?? 0;

      return basePrice + heater + heaterModelPrice + ledSum + extLedPrice + bluetooth + kit + color + woodPrice + windowPrice + mirrorPrice + metalPrice + thermoCladdingPrice + benchPrice;
    }

    if (productCategory === "hottub" && selectedHotTubType) {
      const basePrice = selectedHotTubType.basePrice;
      const sizePrice = selectedHotTubType.sizeOptions.find((s) => s.id === hotTubConfig.size)?.price ?? 0;
      const exteriorWoodPrice =
        selectedHotTubType.exteriorWoodOptions.find((w) => w.id === hotTubConfig.exteriorWood)?.price ?? 0;
      const acrylicLinerPrice =
        selectedHotTubType.acrylicLinerOptions.find((a) => a.id === hotTubConfig.acrylicLiner)?.price ?? 0;
      const heaterPrice = selectedHotTubType.heaterOptions.find((h) => h.id === hotTubConfig.heater)?.price ?? 0;
      const electricHeaterPrice =
        selectedHotTubType.heaterOptions.find((h) => h.id === hotTubConfig.electricHeater)?.price ?? 0;
      const underwaterLedPrice =
        selectedHotTubType.underwaterLedOptions.find((l) => l.id === hotTubConfig.underwaterLed)?.price ?? 0;
      const exteriorLedPrice2 =
        selectedHotTubType.exteriorLedOptions.find((l) => l.id === hotTubConfig.exteriorLed)?.price ?? 0;
      const hydroMassagePrice =
        selectedHotTubType.hydroMassageOptions.find((h) => h.id === hotTubConfig.hydroMassage)?.price ?? 0;
      const coverPrice = selectedHotTubType.coverOptions.find((c) => c.id === hotTubConfig.cover)?.price ?? 0;
      const coverColorPrice =
        apiConfig.hottub.coverColorOptions?.find((c) => c.id === hotTubConfig.coverColor)?.price ?? 0;
      const airBubblesPrice =
        apiConfig.hottub.airBubblesOptions?.find((o) => o.id === hotTubConfig.airBubbles)?.price ?? 0;
      const drainRelayPrice =
        apiConfig.hottub.drainRelayOptions?.find((o) => o.id === hotTubConfig.drainRelay)?.price ?? 0;
      const sandFilterPrice =
        apiConfig.hottub.sandFilterOptions?.find((o) => o.id === hotTubConfig.sandFilter)?.price ?? 0;
      const electronicControllerPrice =
        apiConfig.hottub.electronicControllerOptions?.find((o) => o.id === hotTubConfig.electronicController)?.price ??
        0;
      const thermometerPrice =
        apiConfig.hottub.thermometerOptions?.find((o) => o.id === hotTubConfig.thermometer)?.price ?? 0;
      const bluetoothSpeakerPrice =
        apiConfig.hottub.bluetoothSpeakerOptions?.find((o) => o.id === hotTubConfig.bluetoothSpeaker)?.price ?? 0;
      const headCushionPrice =
        apiConfig.hottub.headCushionOptions?.find((o) => o.id === hotTubConfig.headCushion)?.price ?? 0;

      return (
        basePrice +
        sizePrice +
        exteriorWoodPrice +
        acrylicLinerPrice +
        heaterPrice +
        electricHeaterPrice +
        underwaterLedPrice +
        exteriorLedPrice2 +
        hydroMassagePrice +
        coverPrice +
        coverColorPrice +
        airBubblesPrice +
        drainRelayPrice +
        sandFilterPrice +
        electronicControllerPrice +
        thermometerPrice +
        bluetoothSpeakerPrice +
        headCushionPrice
      );
    }

    if (productCategory === "combo" && selectedComboType) {
      let total = selectedComboType.basePrice;
      const currentComboApi = apiConfig?.comboTypes?.find((ct) => ct.id === selectedComboType.id);
      
      // Wood type price
      const woodPrice = currentComboApi?.woodTypePrices?.[comboConfig.woodType] ?? 0;
      total += woodPrice;

      // === Sauna-side ===
      // Window
      total += selectedComboType.windowOptions.find((w) => w.id === comboConfig.window)?.price ?? 0;
      // Sauna heater type
      total += apiConfig?.sauna?.heaterTypes?.find((h) => h.id === comboConfig.heaterType)?.price ?? 0;
      // Sauna heater model
      if (comboConfig.heaterType === "electric" && comboConfig.heaterModel !== "none") {
        total += electricHeaterModels.find((m) => m.id === comboConfig.heaterModel)?.price ?? 0;
      } else if (comboConfig.heaterType === "wood" && comboConfig.heaterModel !== "none") {
        total += woodHeaterModels.find((m) => m.id === comboConfig.heaterModel)?.price ?? 0;
      }
      // Color
      total += apiConfig?.sauna?.colorOptions?.find((o) => o.id === comboConfig.color)?.price ?? 0;
      // LED (multi-select)
      for (const ledId of comboConfig.led) {
        if (ledId === "none") continue;
        total += apiConfig?.sauna?.ledOptions?.find((o) => o.id === ledId)?.price ?? 0;
      }
      // Sauna exterior LED
      if (comboConfig.saunaExteriorLed) total += exteriorLedPrice;
      // Bluetooth
      total += apiConfig?.sauna?.bluetoothOptions?.find((o) => o.id === comboConfig.bluetooth)?.price ?? 0;
      // Accessory Kit
      total += apiConfig?.sauna?.accessoryKitOptions?.find((o) => o.id === comboConfig.accessoryKit)?.price ?? 0;
      // Mirror film
      total += selectedComboType.mirrorFilmOptions.find((o) => o.id === comboConfig.mirror)?.price ?? 0;
      // Metal bands
      total += selectedComboType.metalBandsOptions.find((o) => o.id === comboConfig.metal)?.price ?? 0;
      // Thermo cladding
      total += selectedComboType.thermoCladdingOptions.find((o) => o.id === comboConfig.thermoCladding)?.price ?? 0;
      // Bench
      total += selectedComboType.benchOptions.find((o) => o.id === comboConfig.bench)?.price ?? 0;

      // === Hottub-side ===
      total += selectedComboType.heaterOptions.find((h) => h.id === comboConfig.heater)?.price ?? 0;
      total += selectedComboType.heaterOptions.find((h) => h.id === comboConfig.electricHeater)?.price ?? 0;
      total += selectedComboType.underwaterLedOptions.find((l) => l.id === comboConfig.underwaterLed)?.price ?? 0;
      total += selectedComboType.exteriorLedOptions.find((l) => l.id === comboConfig.exteriorLed)?.price ?? 0;
      total += selectedComboType.hydroMassageOptions.find((h) => h.id === comboConfig.hydroMassage)?.price ?? 0;
      total += selectedComboType.coverOptions.find((c) => c.id === comboConfig.cover)?.price ?? 0;
      total += apiConfig?.hottub?.coverColorOptions?.find((c) => c.id === comboConfig.coverColor)?.price ?? 0;
      total += apiConfig?.hottub?.airBubblesOptions?.find((o) => o.id === comboConfig.airBubbles)?.price ?? 0;
      total += apiConfig?.hottub?.drainRelayOptions?.find((o) => o.id === comboConfig.drainRelay)?.price ?? 0;
      total += apiConfig?.hottub?.sandFilterOptions?.find((o) => o.id === comboConfig.sandFilter)?.price ?? 0;
      total += apiConfig?.hottub?.electronicControllerOptions?.find((o) => o.id === comboConfig.electronicController)?.price ?? 0;
      total += apiConfig?.hottub?.thermometerOptions?.find((o) => o.id === comboConfig.thermometer)?.price ?? 0;
      total += apiConfig?.hottub?.bluetoothSpeakerOptions?.find((o) => o.id === comboConfig.bluetoothSpeaker)?.price ?? 0;
      total += apiConfig?.hottub?.headCushionOptions?.find((o) => o.id === comboConfig.headCushion)?.price ?? 0;

      return total;
    }

    return 0;
  }, [
    productCategory,
    selectedSaunaType,
    selectedHotTubType,
    selectedComboType,
    apiConfig,
    saunaConfig,
    hotTubConfig,
    comboConfig,
    electricHeaterModels,
    woodHeaterModels,
    woodTypeOptionsForModel,
    exteriorLedPrice,
  ]);

  const originalPrice = useMemo(() => Math.round(totalPrice * 1.15), [totalPrice]);
  const discount = originalPrice > 0 ? Math.round(((originalPrice - totalPrice) / originalPrice) * 100) : 0;

  // Validácia - či je vybraný model ohrievača keď je vybraný typ
  const isHeaterModelRequired = saunaConfig.heaterType !== "none" && saunaConfig.heaterModel === "none";

  const addToCart = async () => {
    if (!productCategory || !apiConfig) return;

    // Validácia pre saunu - musí byť vybraný model ohrievača
    if (productCategory === "sauna" && isHeaterModelRequired) {
      toast({
        title: t("config.selectHeaterModel"),
        description:
          language === "en"
            ? "You must select a specific heater model before adding to cart."
            : "Pred pridaním do košíka musíte vybrať konkrétny model ohrievača.",
        variant: "destructive",
      });
      return;
    }

    setIsAddingToCart(true);

    try {
      // Získaj aktuálny obrázok pre košík
      const cartImage =
        productCategory === "sauna"
          ? currentSaunaImage
          : productCategory === "combo"
            ? (selectedComboType?.image ?? saunaBarrel)
            : (selectedHotTubType?.image ?? hotTub);

      let options: Record<string, unknown>;
      if (productCategory === "sauna") {
        options = { productCategory, saunaTypeId: selectedSaunaType?.id, ...saunaConfig };
      } else if (productCategory === "combo") {
        options = { productCategory, comboTypeId: selectedComboType?.id, ...comboConfig };
      } else {
        options = { productCategory, hottubTypeId: selectedHotTubType?.id, ...hotTubConfig };
      }

      const product_id = apiConfig.products[productCategory] ?? apiConfig.products.sauna;

      const response = await fetch("/wp-json/sauna/v1/add-to-cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          product_id,
          qty: 1,
          options,
          image: cartImage,
          lang: language,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || t("error.addToCart"));
      }

      toast({
        title: t("success.addedToCart"),
        description: t("success.addedToCartDesc"),
      });

      window.location.href = language === "en" ? "/cart/" : "/kosik/";
    } catch (error) {
      console.error("Add to cart error:", error);
      toast({
        title: t("error.generic"),
        description: error instanceof Error ? error.message : t("error.addToCart"),
        variant: "destructive",
      });
    } finally {
      setIsAddingToCart(false);
    }
  };

  // Reset a navigácia späť
  const goBackToCategory = () => {
    setProductCategory(null);
    setSelectedSaunaType(null);
    setSelectedHotTubType(null);
    setSelectedComboType(null);
    setSaunaConfig({
      heaterType: "none",
      heaterModel: "none",
      led: [],
      exteriorLed: false,
      bluetooth: "none",
      accessoryKit: "none",
      color: "none" as SaunaColorType,
      woodType: "spruce",
      window: "none",
      mirror: "none",
      metal: "none",
      thermoCladding: "none",
      bench: "standard",
    });
    setHotTubConfig({
      size: "none",
      exteriorWood: "none",
      acrylicLiner: "none",
      heater: "none",
      electricHeater: "none",
      underwaterLed: "none",
      exteriorLed: "none",
      hydroMassage: "none",
      cover: "none",
      coverColor: "none",
      airBubbles: "none",
      drainRelay: "none",
      sandFilter: "none",
      electronicController: "none",
      thermometer: "none",
      bluetoothSpeaker: "none",
      headCushion: "none",
    });
    setComboConfig({
      woodType: "spruce",
      color: "none",
      window: "none",
      heaterType: "none",
      heaterModel: "none",
      led: [],
      saunaExteriorLed: false,
      bluetooth: "none",
      accessoryKit: "none",
      mirror: "none",
      metal: "none",
      thermoCladding: "none",
      bench: "standard",
      heater: "none",
      electricHeater: "none",
      underwaterLed: "none",
      exteriorLed: "none",
      hydroMassage: "none",
      cover: "none",
      coverColor: "none",
      airBubbles: "none",
      drainRelay: "none",
      sandFilter: "none",
      electronicController: "none",
      thermometer: "none",
      bluetoothSpeaker: "none",
      headCushion: "none",
    });
    setComboStep(1);
  };

  const goBackToSaunaTypes = () => {
    setSelectedSaunaType(null);
    setSaunaConfig({
      heaterType: "none",
      heaterModel: "none",
      led: [],
      exteriorLed: false,
      bluetooth: "none",
      accessoryKit: "none",
      color: "none" as SaunaColorType,
      woodType: "spruce",
      window: "none",
      mirror: "none",
      metal: "none",
      thermoCladding: "none",
      bench: "standard",
    });
    setCurrentImageIndex(0);
    navigate(getConfigBasePath(), { replace: true });
  };

  const goBackToHotTubTypes = () => {
    setSelectedHotTubType(null);
    setHotTubConfig({
      size: "none",
      exteriorWood: "none",
      acrylicLiner: "none",
      heater: "none",
      electricHeater: "none",
      underwaterLed: "none",
      exteriorLed: "none",
      hydroMassage: "none",
      cover: "none",
      coverColor: "none",
      airBubbles: "none",
      drainRelay: "none",
      sandFilter: "none",
      electronicController: "none",
      thermometer: "none",
      bluetoothSpeaker: "none",
      headCushion: "none",
    });
    setCurrentImageIndex(0);
    navigate(getConfigBasePath(), { replace: true });
  };

  const goBackToComboTypes = () => {
    setSelectedComboType(null);
    setComboConfig({
      woodType: "spruce",
      color: "none",
      window: "none",
      heaterType: "none",
      heaterModel: "none",
      led: [],
      saunaExteriorLed: false,
      bluetooth: "none",
      accessoryKit: "none",
      mirror: "none",
      metal: "none",
      thermoCladding: "none",
      bench: "standard",
      heater: "none",
      electricHeater: "none",
      underwaterLed: "none",
      exteriorLed: "none",
      hydroMassage: "none",
      cover: "none",
      coverColor: "none",
      airBubbles: "none",
      drainRelay: "none",
      sandFilter: "none",
      electronicController: "none",
      thermometer: "none",
      bluetoothSpeaker: "none",
      headCushion: "none",
    });
    setComboStep(1);
    setCurrentImageIndex(0);
    navigate(getConfigBasePath(), { replace: true });
  };

  // Komponenta pre možnosť s X alebo obrázkom
  const [zoomImage, setZoomImage] = useState<{ src: string; alt: string } | null>(null);

  const OptionCard = ({
    option,
    isSelected,
    onClick,
    showImage = false,
    size = "normal",
    description,
  }: {
    option: ConfigOption;
    isSelected: boolean;
    onClick: () => void;
    showImage?: boolean;
    size?: "normal" | "small";
    description?: string;
  }) => (
    <div className="relative w-full h-full">
      <button
        onClick={onClick}
        className={cn(
          "flex flex-col items-center p-2 md:p-3 rounded-lg border-2 transition-all min-w-0 w-full h-full",
          isSelected ? "border-primary bg-primary/5" : "border-border/50 hover:border-primary/50 bg-card/50",
        )}
      >
        {option.id === "none" ? (
          <div className="w-10 h-10 md:w-14 md:h-14 flex items-center justify-center rounded-md bg-muted/50 mb-1 md:mb-2 flex-shrink-0">
            <X className="w-5 h-5 md:w-7 md:h-7 text-muted-foreground" />
          </div>
        ) : showImage && option.image ? (
          <img
            src={option.image}
            alt={option.name}
            className="w-10 h-10 md:w-14 md:h-14 rounded-md object-cover mb-1 md:mb-2 flex-shrink-0"
          />
        ) : (
          <div className="w-10 h-10 md:w-14 md:h-14 flex items-center justify-center rounded-md bg-primary/10 mb-1 md:mb-2 flex-shrink-0">
            <Check className="w-4 h-4 md:w-5 md:h-5 text-primary" />
          </div>
        )}

      <span className="font-medium text-center text-[11px] md:text-sm leading-tight line-clamp-2">{option.name}</span>
      {description && (
        <span className="text-[9px] md:text-[10px] text-muted-foreground text-center leading-tight mt-0.5 line-clamp-2">
          {description}
        </span>
      )}

      {option.price > 0 ? (
        <div className="flex items-center gap-1 mt-auto pt-1">
          {option.originalPrice && (
            <span className="text-[10px] md:text-xs text-muted-foreground line-through">
              {option.originalPrice.toLocaleString()} €
            </span>
          )}
          <span className="text-[10px] md:text-xs text-primary">{option.price.toLocaleString()} €</span>
        </div>
      ) : (
        <span className="text-[10px] md:text-xs text-muted-foreground mt-auto pt-1">
          {option.price === 0 ? "0,00 €" : t("included")}
        </span>
      )}
      </button>
      {showImage && option.image && option.id !== "none" && (
        <div
          onClick={(e) => {
            e.stopPropagation();
            setZoomImage({ src: option.image!, alt: option.name });
          }}
          className="absolute top-1 right-1 w-5 h-5 md:w-6 md:h-6 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center cursor-pointer border border-border/50 hover:bg-primary/20 transition-colors z-10"
        >
          <ZoomIn className="w-3 h-3 md:w-3.5 md:h-3.5 text-foreground" />
        </div>
      )}
    </div>
  );

  

  // Loading state
  if (isConfigLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-6 h-6 animate-spin" />
      </div>
    );
  }

  // Ak config neprišiel, zastav UI (toast už ukázal chybu)
  if (!apiConfig) {
    return (
      <div className="min-h-screen bg-background">
        <ConfiguratorHeader />
        <main className="pt-[8.5rem] pb-16">
          <div className="container mx-auto px-4">
            <div className="max-w-xl mx-auto text-center">
              <h1 className="font-display text-3xl font-bold mb-2">{t("nav.configurator")}</h1>
              <p className="text-muted-foreground">
                {t("error.loadConfig")} <span className="font-mono">/wp-json/sauna/v1/config</span>.
              </p>
            </div>
          </div>
        </main>
        <ConfiguratorFooter />
      </div>
    );
  }

  // KROK 1: Výber kategórie produktu (sauna/kaďa)
  if (!productCategory) {
    return (
      <div className="min-h-screen bg-background">
        <ConfiguratorHeader />
        <main className="pt-[8.5rem] pb-16">
          <div className="container mx-auto px-4">
            <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
              <a href="/" className="hover:text-primary transition-colors">
                {t("config.breadcrumb.home")}
              </a>
              <span>/</span>
              <span className="text-foreground">{t("config.breadcrumb.configurator")}</span>
            </nav>

            <div className="max-w-4xl mx-auto text-center mb-12">
              <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
                {t("config.category.title")}{" "}
                <span className="text-gradient-amber">{t("config.category.titleHighlight")}</span>
              </h1>
              <p className="text-muted-foreground text-lg">{t("config.category.subtitle")}</p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {/* Sauna */}
              <button
                onClick={() => {
                  setProductCategory("sauna");
                  setCurrentImageIndex(0);
                }}
                className="group relative overflow-hidden rounded-2xl border-2 border-border/50 hover:border-primary/50 transition-all bg-card/50 shadow-xl"
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={modulsaunaGallery1}
                    alt="Sauna"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                {/* Silnejší gradient pre lepšiu čitateľnosť */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/50 to-black/10" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h2 className="font-display text-4xl font-bold text-white mb-3 drop-shadow-lg">
                    {t("config.sauna")}
                  </h2>
                  <p className="text-white/90 mb-4 text-base leading-relaxed drop-shadow-md">
                    {t("config.sauna.description")}
                  </p>
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/20 backdrop-blur-sm border border-primary/30 text-primary font-semibold">
                    <span>
                      {t("config.from")} {minSaunaBasePrice.toLocaleString()} €
                    </span>
                    <ChevronRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </button>

              {/* Kaďa */}
              <button
                onClick={() => {
                  setProductCategory("hottub");
                  setCurrentImageIndex(0);
                }}
                className="group relative overflow-hidden rounded-2xl border-2 border-border/50 hover:border-primary/50 transition-all bg-card/50 shadow-xl"
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={acrylicRoundMain}
                    alt={t("config.hottub")}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                {/* Silnejší gradient pre lepšiu čitateľnosť */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/50 to-black/10" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h2 className="font-display text-4xl font-bold text-white mb-3 drop-shadow-lg">
                    {t("config.hottub")}
                  </h2>
                  <p className="text-white/90 mb-4 text-base leading-relaxed drop-shadow-md">
                    {t("config.hottub.description")}
                  </p>
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/20 backdrop-blur-sm border border-primary/30 text-primary font-semibold">
                    <span>
                      {t("config.from")} {minHotTubBasePrice.toLocaleString()} €
                    </span>
                    <ChevronRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </button>

              {/* Kombinácia - skrytá kým nebude hotová */}
              {false && comboTypesUI.length > 0 && (
                <button
                  onClick={() => {
                    setProductCategory("combo");
                    setCurrentImageIndex(0);
                  }}
                  className="group relative overflow-hidden rounded-2xl border-2 border-border/50 hover:border-primary/50 transition-all bg-card/50 shadow-xl"
                >
                  <div className="aspect-[4/3] overflow-hidden">
                    <img
                      src={saunaBarrel}
                      alt={t("config.combo")}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/50 to-black/10" />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-3 drop-shadow-lg">
                      {t("config.combo")}
                    </h2>
                    <p className="text-white/90 mb-4 text-base leading-relaxed drop-shadow-md">
                      {t("config.combo.description")}
                    </p>
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/20 backdrop-blur-sm border border-primary/30 text-primary font-semibold">
                      <span>
                        {t("config.from")} {minComboBasePrice.toLocaleString()} €
                      </span>
                      <ChevronRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                    </div>
                  </div>
                </button>
              )}
            </div>
          </div>
        </main>
        <ConfiguratorFooter />
      </div>
    );
  }

  // KROK 2: Pre saunu - výber typu sauny
  if (productCategory === "sauna" && !selectedSaunaType) {
    return (
      <div className="min-h-screen bg-background">
        <ConfiguratorHeader />
        <main className="pt-[8.5rem] pb-16">
          <div className="container mx-auto px-4">
            {/* Tlačidlo späť */}
            <button
              onClick={goBackToCategory}
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-6 group"
            >
              <ChevronLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
              <span>{t("config.back.category")}</span>
            </button>

            <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
              <a href="/" className="hover:text-primary transition-colors">
                {t("config.breadcrumb.home")}
              </a>
              <span>/</span>
              <button onClick={goBackToCategory} className="hover:text-primary transition-colors">
                {t("config.breadcrumb.configurator")}
              </button>
              <span>/</span>
              <span className="text-foreground">{t("config.breadcrumb.saunaSelection")}</span>
            </nav>

            <div className="max-w-5xl mx-auto text-center mb-12">
              <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
                {t("config.saunaSelection.title")}{" "}
                <span className="text-gradient-amber">{t("config.saunaSelection.titleHighlight")}</span>
              </h1>
              <p className="text-muted-foreground text-lg">{t("config.saunaSelection.subtitle")}</p>
            </div>

            {/* Sort filter */}
            <div className="flex items-center justify-end gap-2 max-w-6xl mx-auto mb-6">
              <ArrowUpDown className="w-4 h-4 text-muted-foreground" />
              <div className="flex items-center gap-1 bg-card/50 border border-border/50 rounded-lg p-1">
                {([
                  { value: "price-asc", label: language === "sk" ? "Najlacnejšie" : "Cheapest" },
                  { value: "price-desc", label: language === "sk" ? "Najdrahšie" : "Most expensive" },
                  { value: "name-asc", label: language === "sk" ? "Názov A-Z" : "Name A-Z" },
                ] as const).map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => setSortOrder(opt.value)}
                    className={cn(
                      "px-3 py-1.5 text-xs font-medium rounded-md transition-all",
                      sortOrder === opt.value
                        ? "bg-primary/20 text-primary border border-primary/30"
                        : "text-muted-foreground hover:text-foreground"
                    )}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {[...saunaTypesUI].sort((a, b) => {
                if (sortOrder === "price-asc") return a.basePrice - b.basePrice;
                if (sortOrder === "price-desc") return b.basePrice - a.basePrice;
                return a.name.localeCompare(b.name);
              }).map((sauna) => (
                <button
                  key={sauna.id}
                  onClick={() => {
                    selectSaunaTypeWithUrl(sauna);
                    // Auto-select wood type if only one option available
                    if (sauna.availableWoodTypes.length === 1) {
                      setSaunaConfig((prev) => ({ ...prev, woodType: sauna.availableWoodTypes[0] }));
                    } else {
                      setSaunaConfig((prev) => ({ ...prev, woodType: "spruce" }));
                    }
                    setCurrentImageIndex(0);
                    setShowScrollIndicator(true);
                  }}
                  className="group relative overflow-hidden rounded-3xl border border-white/10 hover:border-primary/50 transition-colors duration-300 bg-gradient-to-br from-card/80 to-card/40 backdrop-blur-xl text-left shadow-2xl hover:shadow-primary/10"
                >
                  {/* Obrázok s overlay */}
                  <div className="aspect-[4/3] overflow-hidden relative">
                    <img
                      src={sauna.image}
                      alt={sauna.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />

                    {/* Floating badge s rozmermi */}
                    <div className="absolute top-4 right-4 flex items-center gap-2 px-4 py-2 rounded-full bg-black/60 backdrop-blur-md border border-white/20 shadow-lg">
                      <Ruler className="w-4 h-4 text-primary" />
                      <span className="text-sm font-bold text-white tracking-wide">{sauna.dimensions}</span>
                    </div>
                  </div>

                  {/* Obsah karty */}
                  <div className="relative p-6 -mt-8">
                    {/* Glassmorphism panel */}
                    <div className="bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 p-5">
                      <h3 className="font-display text-2xl font-bold text-foreground mb-4 group-hover:text-primary transition-colors">
                        {sauna.name}
                      </h3>

                      {/* Dostupné možnosti - ikony */}
                      <div className="flex items-center gap-3 mb-5">
                        {sauna.hasHeater && (
                          <div
                            className="flex items-center justify-center w-10 h-10 rounded-xl bg-primary/10 border border-primary/20"
                            title={t("tooltip.heater")}
                          >
                            <Flame className="w-5 h-5 text-primary" />
                          </div>
                        )}
                        {sauna.hasLed && (
                          <div
                            className="flex items-center justify-center w-10 h-10 rounded-xl bg-primary/10 border border-primary/20"
                            title={t("tooltip.led")}
                          >
                            <Lightbulb className="w-5 h-5 text-primary" />
                          </div>
                        )}
                        {sauna.hasBluetooth && (
                          <div
                            className="flex items-center justify-center w-10 h-10 rounded-xl bg-primary/10 border border-primary/20"
                            title={t("tooltip.bluetooth")}
                          >
                            <Bluetooth className="w-5 h-5 text-primary" />
                          </div>
                        )}
                      </div>

                      {/* Cena a CTA */}
                      <div className="flex items-center justify-between pt-4 border-t border-white/10">
                        <div>
                          <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
                            {t("config.from")}
                          </p>
                          <span className="text-2xl font-bold text-gradient-amber">
                            {sauna.basePrice.toLocaleString()} €
                          </span>
                        </div>
                        <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary text-primary-foreground transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-primary/30">
                          <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-0.5" />
                        </div>
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </main>
        <ConfiguratorFooter />
      </div>
    );
  }

  // KROK 2b: Pre kaďu - výber typu kade
  if (productCategory === "hottub" && !selectedHotTubType) {
    return (
      <div className="min-h-screen bg-background">
        <ConfiguratorHeader />
        <main className="pt-[8.5rem] pb-16">
          <div className="container mx-auto px-4">
            <button
              onClick={goBackToCategory}
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-6 group"
            >
              <ChevronLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
              <span>{t("config.back.category")}</span>
            </button>

            <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
              <a href="/" className="hover:text-primary transition-colors">
                {t("config.breadcrumb.home")}
              </a>
              <span>/</span>
              <button onClick={goBackToCategory} className="hover:text-primary transition-colors">
                {t("config.breadcrumb.configurator")}
              </button>
              <span>/</span>
              <span className="text-foreground">{t("config.breadcrumb.hottubSelection")}</span>
            </nav>

            <div className="max-w-5xl mx-auto text-center mb-12">
              <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
                {t("config.hottubSelection.title")}{" "}
                <span className="text-gradient-amber">{t("config.hottubSelection.titleHighlight")}</span>
              </h1>
              <p className="text-muted-foreground text-lg">{t("config.hottubSelection.subtitle")}</p>
            </div>

            {/* Sort filter */}
            <div className="flex items-center justify-end gap-2 max-w-6xl mx-auto mb-6">
              <ArrowUpDown className="w-4 h-4 text-muted-foreground" />
              <div className="flex items-center gap-1 bg-card/50 border border-border/50 rounded-lg p-1">
                {([
                  { value: "price-asc", label: language === "sk" ? "Najlacnejšie" : "Cheapest" },
                  { value: "price-desc", label: language === "sk" ? "Najdrahšie" : "Most expensive" },
                  { value: "name-asc", label: language === "sk" ? "Názov A-Z" : "Name A-Z" },
                ] as const).map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => setSortOrder(opt.value)}
                    className={cn(
                      "px-3 py-1.5 text-xs font-medium rounded-md transition-all",
                      sortOrder === opt.value
                        ? "bg-primary/20 text-primary border border-primary/30"
                        : "text-muted-foreground hover:text-foreground"
                    )}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-8 max-w-6xl mx-auto">
              {[...hottubTypesUI].sort((a, b) => {
                if (sortOrder === "price-asc") return a.basePrice - b.basePrice;
                if (sortOrder === "price-desc") return b.basePrice - a.basePrice;
                return a.name.localeCompare(b.name);
              }).map((ht) => (
                <button
                  key={ht.id}
                  onClick={() => {
                    selectHotTubTypeWithUrl(ht);
                    setCurrentImageIndex(0);
                    setShowScrollIndicator(true);
                  }}
                  className="group relative overflow-hidden rounded-2xl md:rounded-3xl border border-white/10 hover:border-primary/50 transition-colors duration-300 bg-gradient-to-br from-card/80 to-card/40 backdrop-blur-xl text-left shadow-2xl hover:shadow-primary/10"
                >
                  <div className="aspect-square sm:aspect-[4/3] overflow-hidden relative">
                    <img
                      src={ht.image}
                      alt={ht.name}
                      className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
                    {ht.dimensions && (
                      <div className="absolute top-4 right-4 flex items-center gap-2 px-4 py-2 rounded-full bg-black/60 backdrop-blur-md border border-white/20 shadow-lg">
                        <Ruler className="w-4 h-4 text-primary" />
                        <span className="text-sm font-bold text-white tracking-wide">{ht.dimensions}</span>
                      </div>
                    )}
                  </div>
                  <div className="relative p-3 md:p-6 -mt-6 md:-mt-8">
                    <div className="bg-white/5 backdrop-blur-lg rounded-xl md:rounded-2xl border border-white/10 p-3 md:p-5">
                      <h3 className="font-display text-base md:text-2xl font-bold text-foreground mb-2 md:mb-4 group-hover:text-primary transition-colors">
                        {ht.name}
                      </h3>
                      <div className="flex items-center justify-between pt-2 md:pt-4 border-t border-white/10">
                        <div>
                          <p className="text-[10px] md:text-xs text-muted-foreground uppercase tracking-wider mb-0.5 md:mb-1">
                            {t("config.from")}
                          </p>
                          <span className="text-lg md:text-2xl font-bold text-gradient-amber">
                            {ht.basePrice.toLocaleString()} €
                          </span>
                        </div>
                        <div className="flex items-center justify-center w-8 h-8 md:w-12 md:h-12 rounded-full bg-primary text-primary-foreground transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-primary/30">
                          <ArrowRight className="w-4 h-4 md:w-5 md:h-5 transition-transform group-hover:translate-x-0.5" />
                        </div>
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </main>
        <ConfiguratorFooter />
      </div>
    );
  }

  // KROK 2c: Pre combo - výber typu kombinácie
  if (productCategory === "combo" && !selectedComboType) {
    return (
      <div className="min-h-screen bg-background">
        <ConfiguratorHeader />
        <main className="pt-[8.5rem] pb-16">
          <div className="container mx-auto px-4">
            <button
              onClick={goBackToCategory}
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-6 group"
            >
              <ChevronLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
              <span>{t("config.back.category")}</span>
            </button>

            <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
              <a href="/" className="hover:text-primary transition-colors">
                {t("config.breadcrumb.home")}
              </a>
              <span>/</span>
              <button onClick={goBackToCategory} className="hover:text-primary transition-colors">
                {t("config.breadcrumb.configurator")}
              </button>
              <span>/</span>
              <span className="text-foreground">{t("config.breadcrumb.comboSelection")}</span>
            </nav>

            <div className="max-w-5xl mx-auto text-center mb-12">
              <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
                {t("config.comboSelection.title")}{" "}
                <span className="text-gradient-amber">{t("config.comboSelection.titleHighlight")}</span>
              </h1>
              <p className="text-muted-foreground text-lg">{t("config.comboSelection.subtitle")}</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-8 max-w-6xl mx-auto">
              {comboTypesUI.map((ct) => (
                <button
                  key={ct.id}
                  onClick={() => {
                    selectComboTypeWithUrl(ct);
                    setCurrentImageIndex(0);
                    setShowScrollIndicator(true);
                  }}
                  className="group relative overflow-hidden rounded-2xl md:rounded-3xl border border-white/10 hover:border-primary/50 transition-colors duration-300 bg-gradient-to-br from-card/80 to-card/40 backdrop-blur-xl text-left shadow-2xl hover:shadow-primary/10"
                >
                  <div className="aspect-square sm:aspect-[4/3] overflow-hidden relative">
                    <img
                      src={ct.image}
                      alt={ct.name}
                      className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
                    {ct.dimensions && (
                      <div className="absolute top-4 right-4 flex items-center gap-2 px-4 py-2 rounded-full bg-black/60 backdrop-blur-md border border-white/20 shadow-lg">
                        <Ruler className="w-4 h-4 text-primary" />
                        <span className="text-sm font-bold text-white tracking-wide">{ct.dimensions}</span>
                      </div>
                    )}
                  </div>
                  <div className="relative p-3 md:p-6 -mt-6 md:-mt-8">
                    <div className="bg-white/5 backdrop-blur-lg rounded-xl md:rounded-2xl border border-white/10 p-3 md:p-5">
                      <h3 className="font-display text-base md:text-2xl font-bold text-foreground mb-2 md:mb-4 group-hover:text-primary transition-colors">
                        {ct.name}
                      </h3>
                      <div className="flex items-center justify-between pt-2 md:pt-4 border-t border-white/10">
                        <div>
                          <p className="text-[10px] md:text-xs text-muted-foreground uppercase tracking-wider mb-0.5 md:mb-1">
                            {t("config.from")}
                          </p>
                          <span className="text-lg md:text-2xl font-bold text-gradient-amber">
                            {ct.basePrice.toLocaleString()} €
                          </span>
                        </div>
                        <div className="flex items-center justify-center w-8 h-8 md:w-12 md:h-12 rounded-full bg-primary text-primary-foreground transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-primary/30">
                          <ArrowRight className="w-4 h-4 md:w-5 md:h-5 transition-transform group-hover:translate-x-0.5" />
                        </div>
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </main>
        <ConfiguratorFooter />
      </div>
    );
  }

  // KROK 3: Konfigurácia produktu (sauna s vybraným typom alebo kaďa s vybraným typom alebo combo)
  return (
    <div className="min-h-screen bg-background">
      <ConfiguratorHeader />
      <main className="pt-[8.5rem] pb-16">
        <div className="container mx-auto px-4">
          {/* Tlačidlo späť */}
          <button
            onClick={
              productCategory === "sauna"
                ? goBackToSaunaTypes
                : productCategory === "combo"
                  ? goBackToComboTypes
                  : goBackToHotTubTypes
            }
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-6 group"
          >
            <ChevronLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            <span>
              {productCategory === "sauna"
                ? t("config.back.sauna")
                : productCategory === "combo"
                  ? t("config.back.combo")
                  : t("config.back.hottub")}
            </span>
          </button>

          <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
            <a href="/" className="hover:text-primary transition-colors">
              {t("config.breadcrumb.home")}
            </a>
            <span>/</span>
            <button onClick={goBackToCategory} className="hover:text-primary transition-colors">
              {t("config.breadcrumb.configurator")}
            </button>
            {productCategory === "sauna" && (
              <>
                <span>/</span>
                <button onClick={goBackToSaunaTypes} className="hover:text-primary transition-colors">
                  {t("config.breadcrumb.saunaSelection")}
                </button>
              </>
            )}
            {productCategory === "hottub" && (
              <>
                <span>/</span>
                <button onClick={goBackToHotTubTypes} className="hover:text-primary transition-colors">
                  {t("config.breadcrumb.hottubSelection")}
                </button>
              </>
            )}
            {productCategory === "combo" && (
              <>
                <span>/</span>
                <button onClick={goBackToComboTypes} className="hover:text-primary transition-colors">
                  {t("config.breadcrumb.comboSelection")}
                </button>
              </>
            )}
            <span>/</span>
            <span className="text-foreground">{t("config.breadcrumb.configuration")}</span>
          </nav>

          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 min-w-0">
            {/* Ľavá strana - obrázky */}
            <div className="lg:sticky lg:top-28 lg:h-fit space-y-4 min-w-0">
              <div className="relative aspect-square md:aspect-[4/3] rounded-2xl overflow-hidden bg-card group w-full">
                {discount > 0 && (
                  <div className="absolute top-4 left-4 z-10 px-3 py-1 bg-destructive text-destructive-foreground text-sm font-bold rounded-full">
                    -{discount}%
                  </div>
                )}

                <img
                  src={images[currentImageIndex]}
                  alt={
                    productCategory === "sauna"
                      ? selectedSaunaType?.name
                      : productCategory === "combo"
                        ? selectedComboType?.name
                        : t("config.hottub")
                  }
                  className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105"
                />

                <button
                  onClick={() => setIsLightboxOpen(true)}
                  className="absolute bottom-4 left-4 p-3 bg-background/80 backdrop-blur-sm rounded-full hover:bg-background transition-colors"
                >
                  <Expand className="w-5 h-5" />
                </button>

                <button
                  onClick={() => setCurrentImageIndex((i) => (i === 0 ? images.length - 1 : i - 1))}
                  className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-background/80 backdrop-blur-sm rounded-full hover:bg-background transition-colors opacity-0 group-hover:opacity-100"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setCurrentImageIndex((i) => (i === images.length - 1 ? 0 : i + 1))}
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-background/80 backdrop-blur-sm rounded-full hover:bg-background transition-colors opacity-0 group-hover:opacity-100"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>

              <div
                className="flex gap-2 sm:gap-3 overflow-x-auto pb-2"
                style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
              >
                {images.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={cn(
                      "relative w-14 h-14 sm:w-20 sm:h-20 rounded-lg overflow-hidden transition-all flex-shrink-0",
                      currentImageIndex === index
                        ? "ring-2 ring-primary ring-offset-2 ring-offset-background"
                        : "opacity-60 hover:opacity-100",
                    )}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>

              {/* Cena - desktop */}
              <div className="hidden lg:block border border-border/50 rounded-2xl p-6 bg-card/50">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-lg font-medium">{t("config.total")}</span>
                  <div className="text-right">
                    <span className="text-muted-foreground line-through text-sm mr-2">
                      {originalPrice.toLocaleString()} €
                    </span>
                    <span className="text-3xl font-bold text-primary">{totalPrice.toLocaleString()} €</span>
                  </div>
                </div>

                <Button
                  variant="luxury"
                  size="lg"
                  className="w-full gap-2"
                  onClick={addToCart}
                  disabled={isAddingToCart}
                >
                  {isAddingToCart ? <Loader2 className="w-5 h-5 animate-spin" /> : <ShoppingCart className="w-5 h-5" />}
                  {isAddingToCart ? t("config.addingToCart") : t("config.addToCart")}
                </Button>

                <p className="text-xs text-muted-foreground text-center mt-3">{t("config.priceNote")}</p>
              </div>
            </div>

            {/* Pravá strana - konfigurácia */}
            <div className="relative min-w-0">
              {/* Scroll indicator - desktop only */}
              {isDesktop && (
                <div
                  className={cn(
                    "absolute bottom-0 left-0 right-4 h-20 bg-gradient-to-t from-background via-background/80 to-transparent pointer-events-none z-10 flex items-end justify-center pb-2 transition-opacity duration-300",
                    showScrollIndicator ? "opacity-100" : "opacity-0",
                  )}
                >
                  <div className="flex flex-col items-center gap-1 text-muted-foreground animate-bounce">
                    <span className="text-xs">{t("config.scrollMore")}</span>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </div>
              )}

              {/* ConfigScrollWrapper: ScrollArea on desktop, plain div on mobile */}
              <ConfigScrollWrapper isDesktop={isDesktop} onScroll={handleScroll}>
                <div className={cn("space-y-8", isDesktop ? "pr-4 pb-24" : "pb-8")}>
                  <div>
                    <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-2">
                      {productCategory === "sauna"
                        ? selectedSaunaType?.name
                        : productCategory === "combo"
                          ? (selectedComboType?.name ?? t("config.combo.configTitle"))
                          : (selectedHotTubType?.name ?? t("config.hottub.configTitle"))}
                    </h1>
                    {productCategory === "sauna" && selectedSaunaType && (
                      <p className="text-muted-foreground mb-3">{selectedSaunaType.dimensions}</p>
                    )}
                    {productCategory === "hottub" && selectedHotTubType && (
                      <p className="text-muted-foreground mb-3">{selectedHotTubType.dimensions}</p>
                    )}
                    {productCategory === "combo" && selectedComboType && (
                      <p className="text-muted-foreground mb-3">{selectedComboType.dimensions}</p>
                    )}
                    <div className="flex items-baseline gap-3 lg:hidden">
                      <span className="text-muted-foreground line-through text-lg">
                        {originalPrice.toLocaleString()} €
                      </span>
                      <span className="text-3xl font-bold text-primary">{totalPrice.toLocaleString()} €</span>
                    </div>
                  </div>

                  {productCategory === "combo" && selectedComboType ? (
                    <div className="space-y-4">
                      {/* Step indicator */}
                      <div className="flex items-center gap-3 mb-4">
                        <button
                          onClick={() => setComboStep(1)}
                          className={cn(
                            "flex items-center gap-2 px-4 py-2 rounded-lg border-2 transition-all text-sm font-medium",
                            comboStep === 1
                              ? "border-primary bg-primary/10 text-primary"
                              : "border-border/50 text-muted-foreground hover:border-primary/30",
                          )}
                        >
                          <Flame className="w-4 h-4" />
                          {language === "en" ? "Sauna" : "Sauna"}
                        </button>
                        <ChevronRight className="w-4 h-4 text-muted-foreground" />
                        <button
                          onClick={() => setComboStep(2)}
                          className={cn(
                            "flex items-center gap-2 px-4 py-2 rounded-lg border-2 transition-all text-sm font-medium",
                            comboStep === 2
                              ? "border-primary bg-primary/10 text-primary"
                              : "border-border/50 text-muted-foreground hover:border-primary/30",
                          )}
                        >
                          💧 {language === "en" ? "Hot Tub" : "Kaďa"}
                        </button>
                      </div>

                      {/* ========== KROK 1: SAUNA ========== */}
                      {comboStep === 1 && (
                        <div className="space-y-4">
                          {/* Typ dreva */}
                          {selectedComboType.hasWoodType && selectedComboType.availableWoodTypes.length > 0 && (
                            <div>
                              <h3 className="text-sm md:text-base font-semibold text-foreground mb-2">
                                {t("config.woodType")} <span className="text-primary">*</span>
                              </h3>
                              <div className="grid grid-cols-2 gap-2 md:gap-3">
                                {selectedComboType.availableWoodTypes.map((woodId) => {
                                  const currentComboApi = apiConfig?.comboTypes?.find(
                                    (ct) => ct.id === selectedComboType.id,
                                  );
                                  const price = currentComboApi?.woodTypePrices?.[woodId] ?? 0;
                                  return (
                                    <button
                                      key={woodId}
                                      onClick={() => setComboConfig((prev) => ({ ...prev, woodType: woodId }))}
                                      className={cn(
                                        "flex flex-col items-center p-2 md:p-3 rounded-lg border-2 transition-all",
                                        comboConfig.woodType === woodId
                                          ? "border-primary bg-primary/5"
                                          : "border-border/50 hover:border-primary/50 bg-card/50",
                                      )}
                                    >
                                      <div className="w-10 h-10 md:w-14 md:h-14 rounded-md mb-1 md:mb-2 overflow-hidden">
                                        <img
                                          src={woodId === "spruce" ? spruceWoodImg : thermoWoodImg}
                                          alt={woodId}
                                          className="w-full h-full object-cover"
                                        />
                                      </div>
                                      <span className="font-medium text-center text-xs md:text-sm">
                                        {woodId === "spruce" ? t("config.woodType.spruce") : t("config.woodType.thermo")}
                                      </span>
                                      {price > 0 ? (
                                        <span className="text-[10px] md:text-xs text-primary">
                                          +{price.toLocaleString()} €
                                        </span>
                                      ) : (
                                        <span className="text-[10px] md:text-xs text-muted-foreground">
                                          {t("included")}
                                        </span>
                                      )}
                                    </button>
                                  );
                                })}
                              </div>
                            </div>
                          )}

                          {/* Typ ohrievača sauny */}
                          {selectedComboType.hasHeaterType && (
                            <div>
                              <h3 className="text-sm md:text-base font-semibold text-foreground mb-2">
                                {t("config.heater")} <span className="text-primary">*</span>
                              </h3>
                              <div className="grid grid-cols-3 gap-2 md:gap-3">
                                {saunaHeaterTypes.map((option) => (
                                  <OptionCard
                                    key={option.id}
                                    option={option}
                                    isSelected={comboConfig.heaterType === option.id}
                                    onClick={() =>
                                      setComboConfig((prev) => ({
                                        ...prev,
                                        heaterType: option.id,
                                        heaterModel: "none",
                                      }))
                                    }
                                    showImage={true}
                                  />
                                ))}
                              </div>

                              {comboConfig.heaterType === "electric" && (
                                <div className="mt-4 p-4 rounded-xl bg-card/50 border border-primary/30">
                                  <h4 className="text-sm font-medium text-foreground mb-3">
                                    {t("config.selectHeaterModel")} <span className="text-primary">*</span>
                                  </h4>
                                  {comboConfig.heaterModel === "none" && (
                                    <p className="text-xs text-amber-500 mb-3">{t("config.heaterModelRequired")}</p>
                                  )}
                                  <div className="grid grid-cols-1 gap-2">
                                    {electricHeaterModels.map((model) => (
                                      <button
                                        key={model.id}
                                        onClick={() => setComboConfig((prev) => ({ ...prev, heaterModel: model.id }))}
                                        className={cn(
                                          "flex items-center justify-between p-3 rounded-lg border-2 transition-all text-left",
                                          comboConfig.heaterModel === model.id
                                            ? "border-primary bg-primary/5"
                                            : "border-border/50 hover:border-primary/50 bg-card/30",
                                        )}
                                      >
                                        <div className="flex items-center gap-3">
                                          {comboConfig.heaterModel === model.id && (
                                            <Check className="w-4 h-4 text-primary" />
                                          )}
                                          <span className="font-medium text-sm">{model.name}</span>
                                        </div>
                                        {model.price > 0 ? (
                                          <span className="text-sm text-primary">+{model.price.toLocaleString()} €</span>
                                        ) : (
                                          <span className="text-xs text-muted-foreground">{t("included")}</span>
                                        )}
                                      </button>
                                    ))}
                                  </div>
                                </div>
                              )}

                              {comboConfig.heaterType === "wood" && (
                                <div className="mt-4 p-4 rounded-xl bg-card/50 border border-primary/30">
                                  <h4 className="text-sm font-medium text-foreground mb-3">
                                    {t("config.selectHeaterModel")} <span className="text-primary">*</span>
                                  </h4>
                                  {comboConfig.heaterModel === "none" && (
                                    <p className="text-xs text-amber-500 mb-3">{t("config.heaterModelRequired")}</p>
                                  )}
                                  <div className="grid grid-cols-1 gap-2">
                                    {woodHeaterModels.map((model) => (
                                      <button
                                        key={model.id}
                                        onClick={() => setComboConfig((prev) => ({ ...prev, heaterModel: model.id }))}
                                        className={cn(
                                          "flex items-center justify-between p-3 rounded-lg border-2 transition-all text-left",
                                          comboConfig.heaterModel === model.id
                                            ? "border-primary bg-primary/5"
                                            : "border-border/50 hover:border-primary/50 bg-card/30",
                                        )}
                                      >
                                        <div className="flex items-center gap-3">
                                          {comboConfig.heaterModel === model.id && (
                                            <Check className="w-4 h-4 text-primary" />
                                          )}
                                          <span className="font-medium text-sm">{model.name}</span>
                                        </div>
                                        {model.price > 0 ? (
                                          <span className="text-sm text-primary">+{model.price.toLocaleString()} €</span>
                                        ) : (
                                          <span className="text-xs text-muted-foreground">{t("included")}</span>
                                        )}
                                      </button>
                                    ))}
                                  </div>
                                </div>
                              )}
                            </div>
                          )}

                          {/* Okná */}
                          {selectedComboType.windowOptions.length > 0 && (
                            <div>
                              <h3 className="text-sm md:text-base font-semibold text-foreground mb-2">
                                {t("config.window")} <span className="text-primary">*</span>
                              </h3>
                              <ScrollableRow>
                                <OptionCard
                                  option={{ id: "none", name: t("config.noWindow"), price: 0 }}
                                  isSelected={comboConfig.window === "none"}
                                  onClick={() => setComboConfig((prev) => ({ ...prev, window: "none" }))}
                                />
                                {selectedComboType.windowOptions
                                  .filter((o) => o.id !== "none")
                                  .map((option) => (
                                    <OptionCard
                                      key={option.id}
                                      option={option}
                                      isSelected={comboConfig.window === option.id}
                                      onClick={() => setComboConfig((prev) => ({ ...prev, window: option.id }))}
                                      showImage={!!option.image}
                                    />
                                  ))}
                              </ScrollableRow>
                            </div>
                          )}

                          {/* LED osvetlenie */}
                          {selectedComboType.hasLed && filteredLedOptions.length > 0 && (
                            <div>
                              <h3 className="text-sm md:text-base font-semibold text-foreground mb-2">
                                {t("config.led")}
                              </h3>
                              <ScrollableRow>
                                {filteredLedOptions.map((option) => (
                                  <OptionCard
                                    key={option.id}
                                    option={option}
                                    isSelected={comboConfig.led.includes(option.id) || (option.id === "none" && comboConfig.led.length === 0)}
                                    onClick={() => {
                                      if (option.id === "none") {
                                        setComboConfig((prev) => ({ ...prev, led: [] }));
                                      } else {
                                        setComboConfig((prev) => {
                                          const newLeds = prev.led.includes(option.id)
                                            ? prev.led.filter((l) => l !== option.id)
                                            : [...prev.led.filter((l) => l !== "none"), option.id];
                                          return { ...prev, led: newLeds.length ? newLeds : [] };
                                        });
                                      }
                                    }}
                                    showImage={!!option.image}
                                  />
                                ))}
                              </ScrollableRow>
                            </div>
                          )}

                          {/* Vonkajšie LED sauny */}
                          {selectedComboType.hasExteriorLed && (
                            <div>
                              <h3 className="text-sm md:text-base font-semibold text-foreground mb-2">
                                {t("config.exteriorLed")}
                              </h3>
                              <div className="grid grid-cols-2 gap-2 md:gap-3">
                                <button
                                  onClick={() => setComboConfig((prev) => ({ ...prev, saunaExteriorLed: false }))}
                                  className={cn(
                                    "flex flex-col items-center p-2 md:p-3 rounded-lg border-2 transition-all",
                                    !comboConfig.saunaExteriorLed
                                      ? "border-primary bg-primary/5"
                                      : "border-border/50 hover:border-primary/50 bg-card/50",
                                  )}
                                >
                                  <div className="w-10 h-10 md:w-14 md:h-14 flex items-center justify-center rounded-md bg-muted/50 mb-1 md:mb-2">
                                    <X className="w-5 h-5 md:w-7 md:h-7 text-muted-foreground" />
                                  </div>
                                  <span className="font-medium text-center text-xs md:text-sm">{t("config.without")}</span>
                                  <span className="text-[10px] md:text-xs text-muted-foreground">{t("included")}</span>
                                </button>
                                <button
                                  onClick={() => setComboConfig((prev) => ({ ...prev, saunaExteriorLed: true }))}
                                  className={cn(
                                    "flex flex-col items-center p-2 md:p-3 rounded-lg border-2 transition-all",
                                    comboConfig.saunaExteriorLed
                                      ? "border-primary bg-primary/5"
                                      : "border-border/50 hover:border-primary/50 bg-card/50",
                                  )}
                                >
                                  <div className="w-10 h-10 md:w-14 md:h-14 flex items-center justify-center rounded-md bg-primary/10 mb-1 md:mb-2">
                                    <Lightbulb className="w-5 h-5 md:w-7 md:h-7 text-primary" />
                                  </div>
                                  <span className="font-medium text-center text-xs md:text-sm">
                                    {t("config.exteriorLedShort")}
                                  </span>
                                  <span className="text-[10px] md:text-xs text-primary">+{exteriorLedPrice} €</span>
                                </button>
                              </div>
                            </div>
                          )}

                          {/* Zrkadlová fólia */}
                          {selectedComboType.hasMirrorFilm && selectedComboType.mirrorFilmOptions.length > 0 && (
                            <div>
                              <h3 className="text-sm md:text-base font-semibold text-foreground mb-2">
                                {t("config.mirrorFilm")}
                              </h3>
                              <div className="grid grid-cols-2 gap-2 md:gap-3">
                                {selectedComboType.mirrorFilmOptions.map((option) => (
                                  <OptionCard
                                    key={option.id}
                                    option={option}
                                    isSelected={comboConfig.mirror === option.id}
                                    onClick={() => setComboConfig((prev) => ({ ...prev, mirror: option.id }))}
                                  />
                                ))}
                              </div>
                            </div>
                          )}

                          {/* Kovové pásy */}
                          {selectedComboType.hasMetalBands && selectedComboType.metalBandsOptions.length > 0 && (
                            <div>
                              <h3 className="text-sm md:text-base font-semibold text-foreground mb-2">
                                {t("config.metalBands")}
                              </h3>
                              <div className="grid grid-cols-2 gap-2 md:gap-3">
                                {selectedComboType.metalBandsOptions.map((option) => (
                                  <OptionCard
                                    key={option.id}
                                    option={option}
                                    isSelected={comboConfig.metal === option.id}
                                    onClick={() => setComboConfig((prev) => ({ ...prev, metal: option.id }))}
                                    showImage={!!option.image}
                                  />
                                ))}
                              </div>
                            </div>
                          )}

                          {/* Thermo obklad */}
                          {selectedComboType.hasThermoCladding && selectedComboType.thermoCladdingOptions.length > 0 && (
                            <div>
                              <h3 className="text-sm md:text-base font-semibold text-foreground mb-2">
                                {t("config.thermoCladding")}
                              </h3>
                              <div className="grid grid-cols-2 gap-2 md:gap-3">
                                {selectedComboType.thermoCladdingOptions.map((option) => (
                                  <OptionCard
                                    key={option.id}
                                    option={option}
                                    isSelected={comboConfig.thermoCladding === option.id}
                                    onClick={() => setComboConfig((prev) => ({ ...prev, thermoCladding: option.id }))}
                                    showImage={!!option.image}
                                  />
                                ))}
                              </div>
                            </div>
                          )}

                          {/* Lavice */}
                          {selectedComboType.hasBenchOptions && selectedComboType.benchOptions.length > 0 && (
                            <div>
                              <h3 className="text-sm md:text-base font-semibold text-foreground mb-2">
                                {t("config.benches")}
                              </h3>
                              <div className="grid grid-cols-2 gap-2 md:gap-3">
                                {selectedComboType.benchOptions.map((option) => (
                                  <OptionCard
                                    key={option.id}
                                    option={option}
                                    isSelected={comboConfig.bench === option.id}
                                    onClick={() => setComboConfig((prev) => ({ ...prev, bench: option.id }))}
                                    showImage={!!option.image}
                                  />
                                ))}
                              </div>
                            </div>
                          )}

                          {/* Bluetooth */}
                          {selectedComboType.hasBluetooth && saunaBluetoothOptions.length > 0 && (
                            <div>
                              <h3 className="text-sm md:text-base font-semibold text-foreground mb-2">
                                {t("config.bluetooth")}
                              </h3>
                              <ScrollableRow>
                                {saunaBluetoothOptions.map((option) => (
                                  <OptionCard
                                    key={option.id}
                                    option={option}
                                    isSelected={comboConfig.bluetooth === option.id}
                                    onClick={() => setComboConfig((prev) => ({ ...prev, bluetooth: option.id }))}
                                    showImage={!!option.image}
                                  />
                                ))}
                              </ScrollableRow>
                            </div>
                          )}

                          {/* Saunová sada */}
                          {selectedComboType.hasAccessoryKit && saunaAccessoryKitOptions.length > 0 && (
                            <div>
                              <h3 className="text-sm md:text-base font-semibold text-foreground mb-2">
                                {t("config.accessories")}
                              </h3>
                              <Notice variant="info" className="mb-3 text-xs">{t("config.accessoryKitHint")}</Notice>
                              <ScrollableRow>
                                {saunaAccessoryKitOptions.map((option) => (
                                  <OptionCard
                                    key={option.id}
                                    option={option}
                                    isSelected={comboConfig.accessoryKit === option.id}
                                    onClick={() => setComboConfig((prev) => ({ ...prev, accessoryKit: option.id }))}
                                    showImage={!!option.image}
                                  />
                                ))}
                              </ScrollableRow>
                            </div>
                          )}

                          {/* Farba exteriéru */}
                          {selectedComboType.hasColor && saunaColorOptionsTyped.length > 0 && (
                            <div>
                              <h3 className="text-sm md:text-base font-semibold text-foreground mb-2">
                                {t("config.color")}
                              </h3>
                              <p className="text-xs text-muted-foreground mb-3 italic">{t("config.colorHint")}</p>
                              <div className="grid grid-cols-4 gap-2 md:gap-3">
                                {saunaColorOptionsTyped.map((option) => (
                                  <button
                                    key={option.id}
                                    onClick={() => setComboConfig((prev) => ({ ...prev, color: option.id }))}
                                    className={cn(
                                      "flex flex-col items-center p-1.5 md:p-2 rounded-lg border-2 transition-all",
                                      comboConfig.color === option.id
                                        ? "border-primary bg-primary/5"
                                        : "border-border/50 hover:border-primary/50 bg-card/50",
                                    )}
                                  >
                                    {option.id === "none" ? (
                                      <div className="w-8 h-8 md:w-10 md:h-10 rounded-md bg-muted/50 flex items-center justify-center mb-1">
                                        <X className="w-4 h-4 md:w-5 md:h-5 text-muted-foreground" />
                                      </div>
                                    ) : (
                                      <div
                                        className="w-8 h-8 md:w-10 md:h-10 rounded-md mb-1 border border-border/30"
                                        style={{ backgroundColor: saunaColorSwatches[option.id].colorHsl }}
                                      />
                                    )}
                                    <span className="font-medium text-center text-xs">
                                      {t(`color.${option.id}`) !== `color.${option.id}`
                                        ? t(`color.${option.id}`)
                                        : option.name || saunaColorSwatches[option.id].nameFallback}
                                    </span>
                                    {option.price > 0 ? (
                                      <span className="text-xs text-primary">+{option.price.toLocaleString()} €</span>
                                    ) : (
                                      <span className="text-xs text-muted-foreground">{t("included")}</span>
                                    )}
                                  </button>
                                ))}
                              </div>
                              <Notice variant="info" className="mt-4">
                                {t("config.colorNotice")}
                              </Notice>
                            </div>
                          )}

                          {/* Tlačidlo Ďalej */}
                          <Button
                            variant="luxury"
                            size="lg"
                            className="w-full gap-2 mt-4"
                            onClick={() => setComboStep(2)}
                          >
                            {language === "en" ? "Next: Hot Tub options" : "Ďalej: Možnosti kade"}
                            <ChevronRight className="w-5 h-5" />
                          </Button>
                        </div>
                      )}

                      {/* ========== KROK 2: KAĎA ========== */}
                      {comboStep === 2 && (
                        <div className="space-y-4">
                          {/* Späť na saunu */}
                          <button
                            onClick={() => setComboStep(1)}
                            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors group text-sm"
                          >
                            <ChevronLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
                            {language === "en" ? "Back to Sauna options" : "Späť na možnosti sauny"}
                          </button>

                          {/* Ohrievač kade */}
                          {selectedComboType.hasHeater && selectedComboType.heaterOptions.length > 0 && (
                            <div>
                              <h3 className="text-sm md:text-base font-semibold text-foreground mb-2">
                                {t("config.hottubHeater")} <span className="text-primary">*</span>
                              </h3>
                              <ScrollableRow>
                                {selectedComboType.heaterOptions
                                  .filter((o) => !o.id.startsWith("electric-"))
                                  .map((option) => (
                                    <OptionCard
                                      key={option.id}
                                      option={option}
                                      isSelected={comboConfig.heater === option.id}
                                      onClick={() => setComboConfig((prev) => ({ ...prev, heater: option.id }))}
                                      showImage={!!option.image}
                                    />
                                  ))}
                              </ScrollableRow>
                            </div>
                          )}

                          {/* Elektrický ohrievač */}
                          {selectedComboType.hasHeater &&
                            selectedComboType.heaterOptions.filter((o) => o.id.startsWith("electric-")).length > 0 && (
                              <div>
                                <h3 className="text-sm md:text-base font-semibold text-foreground mb-2">
                                  {t("config.hottubElectricHeater")} <span className="text-primary">*</span>
                                </h3>
                                <ScrollableRow>
                                  <OptionCard
                                    option={{ id: "none", name: t("config.noHeater"), price: 0 }}
                                    isSelected={comboConfig.electricHeater === "none"}
                                    onClick={() => setComboConfig((prev) => ({ ...prev, electricHeater: "none" }))}
                                  />
                                  {selectedComboType.heaterOptions
                                    .filter((o) => o.id.startsWith("electric-"))
                                    .map((option) => (
                                      <OptionCard
                                        key={option.id}
                                        option={option}
                                        isSelected={comboConfig.electricHeater === option.id}
                                        onClick={() => setComboConfig((prev) => ({ ...prev, electricHeater: option.id }))}
                                        showImage={!!option.image}
                                      />
                                    ))}
                                </ScrollableRow>
                              </div>
                            )}

                          {/* Podvodné LED */}
                          {selectedComboType.hasUnderwaterLed && selectedComboType.underwaterLedOptions.length > 0 && (
                            <div>
                              <h3 className="text-sm md:text-base font-semibold text-foreground mb-2">
                                {t("config.underwaterLed")} <span className="text-primary">*</span>
                              </h3>
                              <ScrollableRow>
                                {selectedComboType.underwaterLedOptions.map((option) => (
                                  <OptionCard
                                    key={option.id}
                                    option={option}
                                    isSelected={comboConfig.underwaterLed === option.id}
                                    onClick={() => setComboConfig((prev) => ({ ...prev, underwaterLed: option.id }))}
                                    showImage={!!option.image}
                                  />
                                ))}
                              </ScrollableRow>
                            </div>
                          )}

                          {/* LED okolo kade */}
                          {selectedComboType.hasExteriorLedHottub && selectedComboType.exteriorLedOptions.length > 0 && (
                            <div>
                              <h3 className="text-sm md:text-base font-semibold text-foreground mb-2">
                                {t("config.hottubExteriorLed")} <span className="text-primary">*</span>
                              </h3>
                              <ScrollableRow>
                                {selectedComboType.exteriorLedOptions.map((option) => (
                                  <OptionCard
                                    key={option.id}
                                    option={option}
                                    isSelected={comboConfig.exteriorLed === option.id}
                                    onClick={() => setComboConfig((prev) => ({ ...prev, exteriorLed: option.id }))}
                                    showImage={!!option.image}
                                  />
                                ))}
                              </ScrollableRow>
                            </div>
                          )}

                          {/* Hydro masáž */}
                          {selectedComboType.hasHydroMassage && selectedComboType.hydroMassageOptions.length > 0 && (
                            <div>
                              <h3 className="text-sm md:text-base font-semibold text-foreground mb-2">
                                {t("config.hydroMassage")} <span className="text-primary">*</span>
                              </h3>
                              <ScrollableRow>
                                {selectedComboType.hydroMassageOptions.map((option) => (
                                  <OptionCard
                                    key={option.id}
                                    option={option}
                                    isSelected={comboConfig.hydroMassage === option.id}
                                    onClick={() => setComboConfig((prev) => ({ ...prev, hydroMassage: option.id }))}
                                    showImage={!!option.image}
                                  />
                                ))}
                              </ScrollableRow>
                            </div>
                          )}

                          {/* Kryt */}
                          {selectedComboType.hasCover && selectedComboType.coverOptions.length > 0 && (
                            <div>
                              <h3 className="text-sm md:text-base font-semibold text-foreground mb-2">
                                {t("config.cover")} <span className="text-primary">*</span>
                              </h3>
                              <ScrollableRow>
                                {selectedComboType.coverOptions.map((option) => (
                                  <OptionCard
                                    key={option.id}
                                    option={option}
                                    isSelected={comboConfig.cover === option.id}
                                    onClick={() =>
                                      setComboConfig((prev) => ({
                                        ...prev,
                                        cover: option.id,
                                        ...(option.id === "none" ? { coverColor: "none" } : {}),
                                      }))
                                    }
                                    showImage={!!option.image}
                                  />
                                ))}
                              </ScrollableRow>
                            </div>
                          )}

                          {/* Farba krytu */}
                          {selectedComboType.hasCoverColor &&
                            hotTubCoverColorOptions.length > 0 &&
                            comboConfig.cover !== "none" && (
                              <div>
                                <h3 className="text-sm md:text-base font-semibold text-foreground mb-2">
                                  {t("config.coverColor")} <span className="text-primary">*</span>
                                </h3>
                                <ScrollableRow>
                                  {hotTubCoverColorOptions.map((option) => (
                                    <OptionCard
                                      key={option.id}
                                      option={option}
                                      isSelected={comboConfig.coverColor === option.id}
                                      onClick={() => setComboConfig((prev) => ({ ...prev, coverColor: option.id }))}
                                      showImage={!!option.image}
                                    />
                                  ))}
                                </ScrollableRow>
                              </div>
                            )}

                          {/* Vzduchové bubliny */}
                          {hotTubAirBubblesOptions.length > 0 && (
                            <div>
                              <h3 className="text-sm md:text-base font-semibold text-foreground mb-2">
                                {t("config.airBubbles")} <span className="text-primary">*</span>
                              </h3>
                              <ScrollableRow>
                                {hotTubAirBubblesOptions.map((option) => (
                                  <OptionCard
                                    key={option.id}
                                    option={option}
                                    isSelected={comboConfig.airBubbles === option.id}
                                    onClick={() => setComboConfig((prev) => ({ ...prev, airBubbles: option.id }))}
                                    showImage={!!option.image}
                                  />
                                ))}
                              </ScrollableRow>
                            </div>
                          )}

                          {/* Prúdový istič */}
                          {hotTubDrainRelayOptions.length > 0 && (
                            <div>
                              <h3 className="text-sm md:text-base font-semibold text-foreground mb-2">
                                {t("config.drainRelay")} <span className="text-primary">*</span>
                              </h3>
                              <ScrollableRow>
                                {hotTubDrainRelayOptions.map((option) => (
                                  <OptionCard
                                    key={option.id}
                                    option={option}
                                    isSelected={comboConfig.drainRelay === option.id}
                                    onClick={() => setComboConfig((prev) => ({ ...prev, drainRelay: option.id }))}
                                    showImage={!!option.image}
                                  />
                                ))}
                              </ScrollableRow>
                            </div>
                          )}

                          {/* Pieskový filter */}
                          {hotTubSandFilterOptions.length > 0 && (
                            <div>
                              <h3 className="text-sm md:text-base font-semibold text-foreground mb-2">
                                {t("config.sandFilter")} <span className="text-primary">*</span>
                              </h3>
                              <ScrollableRow>
                                {hotTubSandFilterOptions.map((option) => (
                                  <OptionCard
                                    key={option.id}
                                    option={option}
                                    isSelected={comboConfig.sandFilter === option.id}
                                    onClick={() => setComboConfig((prev) => ({ ...prev, sandFilter: option.id }))}
                                    showImage={!!option.image}
                                  />
                                ))}
                              </ScrollableRow>
                            </div>
                          )}

                          {/* Elektronický kontrolér */}
                          {hotTubElectronicControllerOptions.length > 0 && (
                            <div>
                              <h3 className="text-sm md:text-base font-semibold text-foreground mb-2">
                                {t("config.electronicController")} <span className="text-primary">*</span>
                              </h3>
                              <ScrollableRow>
                                {hotTubElectronicControllerOptions.map((option) => (
                                  <OptionCard
                                    key={option.id}
                                    option={option}
                                    isSelected={comboConfig.electronicController === option.id}
                                    onClick={() =>
                                      setComboConfig((prev) => ({ ...prev, electronicController: option.id }))
                                    }
                                    showImage={!!option.image}
                                  />
                                ))}
                              </ScrollableRow>
                            </div>
                          )}

                          {/* Teplomer */}
                          {hotTubThermometerOptions.length > 0 && (
                            <div>
                              <h3 className="text-sm md:text-base font-semibold text-foreground mb-2">
                                {t("config.thermometer")} <span className="text-primary">*</span>
                              </h3>
                              <ScrollableRow>
                                {hotTubThermometerOptions.map((option) => (
                                  <OptionCard
                                    key={option.id}
                                    option={option}
                                    isSelected={comboConfig.thermometer === option.id}
                                    onClick={() => setComboConfig((prev) => ({ ...prev, thermometer: option.id }))}
                                    showImage={!!option.image}
                                  />
                                ))}
                              </ScrollableRow>
                            </div>
                          )}

                          {/* Bluetooth reproduktor */}
                          {hotTubBluetoothSpeakerOptions.length > 0 && (
                            <div>
                              <h3 className="text-sm md:text-base font-semibold text-foreground mb-2">
                                {t("config.bluetoothSpeaker")} <span className="text-primary">*</span>
                              </h3>
                              <ScrollableRow>
                                {hotTubBluetoothSpeakerOptions.map((option) => (
                                  <OptionCard
                                    key={option.id}
                                    option={option}
                                    isSelected={comboConfig.bluetoothSpeaker === option.id}
                                    onClick={() => setComboConfig((prev) => ({ ...prev, bluetoothSpeaker: option.id }))}
                                    showImage={!!option.image}
                                  />
                                ))}
                              </ScrollableRow>
                            </div>
                          )}

                          {/* Hlavový vankúš */}
                          {hotTubHeadCushionOptions.length > 0 && (
                            <div>
                              <h3 className="text-sm md:text-base font-semibold text-foreground mb-2">
                                {t("config.headCushion")} <span className="text-primary">*</span>
                              </h3>
                              <ScrollableRow>
                                {hotTubHeadCushionOptions.map((option) => (
                                  <OptionCard
                                    key={option.id}
                                    option={option}
                                    isSelected={comboConfig.headCushion === option.id}
                                    onClick={() => setComboConfig((prev) => ({ ...prev, headCushion: option.id }))}
                                    showImage={!!option.image}
                                  />
                                ))}
                              </ScrollableRow>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  ) : productCategory === "sauna" && selectedSaunaType ? (
                    <div className="space-y-4">
                      {/* Typ dreva */}
                      {selectedSaunaType.hasWoodType && selectedSaunaType.availableWoodTypes.length > 0 && (
                        <div>
                          <h3 className="text-sm md:text-base font-semibold text-foreground mb-2">
                            {t("config.woodType")} <span className="text-primary">*</span>
                          </h3>
                          <div className="grid grid-cols-2 gap-2 md:gap-3">
                            {woodTypeOptionsForModel.map((option) => (
                              <button
                                key={option.id}
                                onClick={() => setSaunaConfig((prev) => ({ ...prev, woodType: option.id }))}
                                className={cn(
                                  "flex flex-col items-center p-2 md:p-3 rounded-lg border-2 transition-all",
                                  saunaConfig.woodType === option.id
                                    ? "border-primary bg-primary/5"
                                    : "border-border/50 hover:border-primary/50 bg-card/50",
                                )}
                              >
                                <div className="w-10 h-10 md:w-14 md:h-14 rounded-md mb-1 md:mb-2 overflow-hidden">
                                  <img src={option.image} alt={option.name} className="w-full h-full object-cover" />
                                </div>
                                <span className="font-medium text-center text-xs md:text-sm">
                                  {option.id === "spruce" ? t("config.woodType.spruce") : t("config.woodType.thermo")}
                                </span>
                                {option.price > 0 ? (
                                  <span className="text-[10px] md:text-xs text-primary">
                                    +{option.price.toLocaleString()} €
                                  </span>
                                ) : (
                                  <span className="text-[10px] md:text-xs text-muted-foreground">{t("included")}</span>
                                )}
                              </button>
                            ))}
                          </div>
                          {selectedSaunaType.availableWoodTypes.length === 1 && (
                            <p className="text-xs text-muted-foreground mt-2">
                              {t("config.onlyWoodType").replace(
                                "{woodType}",
                                selectedSaunaType.availableWoodTypes[0] === "thermo"
                                  ? t("config.woodType.thermo")
                                  : t("config.woodType.spruce"),
                              )}
                            </p>
                          )}
                        </div>
                      )}

                      {/* Typ ohrievača */}
                      {selectedSaunaType.hasHeater && (
                        <div>
                          <h3 className="text-sm md:text-base font-semibold text-foreground mb-2">
                            {t("config.heater")} <span className="text-primary">*</span>
                          </h3>
                          <div className="grid grid-cols-3 gap-2 md:gap-3">
                            {saunaHeaterTypes.map((option) => (
                              <OptionCard
                                key={option.id}
                                option={option}
                                isSelected={saunaConfig.heaterType === option.id}
                                onClick={() =>
                                  setSaunaConfig((prev) => ({
                                    ...prev,
                                    heaterType: option.id,
                                    heaterModel: "none",
                                  }))
                                }
                                showImage={true}
                              />
                            ))}
                          </div>

                          {saunaConfig.heaterType === "electric" && (
                            <div className="mt-4 p-4 rounded-xl bg-card/50 border border-primary/30">
                              <h4 className="text-sm font-medium text-foreground mb-3">
                                {t("config.selectHeaterModel")} <span className="text-primary">*</span>
                              </h4>
                              {saunaConfig.heaterModel === "none" && (
                                <p className="text-xs text-amber-500 mb-3">{t("config.heaterModelRequired")}</p>
                              )}
                              <div className="grid grid-cols-1 gap-2">
                                {electricHeaterModels.map((model) => (
                                  <button
                                    key={model.id}
                                    onClick={() => setSaunaConfig((prev) => ({ ...prev, heaterModel: model.id }))}
                                    className={cn(
                                      "flex items-center justify-between p-3 rounded-lg border-2 transition-all text-left",
                                      saunaConfig.heaterModel === model.id
                                        ? "border-primary bg-primary/5"
                                        : "border-border/50 hover:border-primary/50 bg-card/30",
                                    )}
                                  >
                                    <div className="flex items-center gap-3">
                                      {saunaConfig.heaterModel === model.id && (
                                        <Check className="w-4 h-4 text-primary" />
                                      )}
                                      <span className="font-medium text-sm">{model.name}</span>
                                    </div>
                                    {model.price > 0 ? (
                                      <span className="text-sm text-primary">+{model.price.toLocaleString()} €</span>
                                    ) : (
                                      <span className="text-xs text-muted-foreground">{t("included")}</span>
                                    )}
                                  </button>
                                ))}
                              </div>
                            </div>
                          )}

                          {saunaConfig.heaterType === "wood" && (
                            <div className="mt-4 p-4 rounded-xl bg-card/50 border border-primary/30">
                              <h4 className="text-sm font-medium text-foreground mb-3">
                                {t("config.selectHeaterModel")} <span className="text-primary">*</span>
                              </h4>
                              {saunaConfig.heaterModel === "none" && (
                                <p className="text-xs text-amber-500 mb-3">{t("config.heaterModelRequired")}</p>
                              )}
                              <div className="grid grid-cols-1 gap-2">
                                {woodHeaterModels.map((model) => (
                                  <button
                                    key={model.id}
                                    onClick={() => setSaunaConfig((prev) => ({ ...prev, heaterModel: model.id }))}
                                    className={cn(
                                      "flex items-center justify-between p-3 rounded-lg border-2 transition-all text-left",
                                      saunaConfig.heaterModel === model.id
                                        ? "border-primary bg-primary/5"
                                        : "border-border/50 hover:border-primary/50 bg-card/30",
                                    )}
                                  >
                                    <div className="flex items-center gap-3">
                                      {saunaConfig.heaterModel === model.id && (
                                        <Check className="w-4 h-4 text-primary" />
                                      )}
                                      <span className="font-medium text-sm">{model.name}</span>
                                    </div>
                                    {model.price > 0 ? (
                                      <span className="text-sm text-primary">+{model.price.toLocaleString()} €</span>
                                    ) : (
                                      <span className="text-xs text-muted-foreground">{t("included")}</span>
                                    )}
                                  </button>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      )}

                      {/* LED osvetlenie (interiér) */}
                      {selectedSaunaType.hasLed && (
                        <div>
                          <h3 className="text-sm md:text-base font-semibold text-foreground mb-2">
                            {t("config.led")} <span className="text-primary">*</span>
                          </h3>
                          <div className="grid grid-cols-3 gap-2 md:gap-3">
                            {/* Bez LED = reset */}
                            <OptionCard
                              option={{ id: "none", name: t("config.noLed"), price: 0 }}
                              isSelected={ledSelected.length === 0}
                              onClick={resetLed}
                            />

                            {/* Multi možnosti */}
                            {filteredLedOptions
                              .filter((o) => o.id !== "none")
                              .map((option) => (
                                <OptionCard
                                  key={option.id}
                                  option={option}
                                  isSelected={isLedSelected(option.id)}
                                  onClick={() => toggleLed(option.id)}
                                  showImage={true}
                                />
                              ))}
                          </div>
                        </div>
                      )}

                      {/* OKNO */}
                      {selectedSaunaType?.hasWindow && selectedSaunaType.windowOptions.length > 0 && (
                        <div>
                          <h3 className="text-sm md:text-base font-semibold text-foreground mb-2">
                            {t("config.window")}
                          </h3>
                          <div className="grid grid-cols-2 gap-2 md:gap-3">
                            {selectedSaunaType.windowOptions.map((option) => (
                              <OptionCard
                                key={option.id}
                                option={option}
                                isSelected={saunaConfig.window === option.id}
                                onClick={() => setSaunaConfig((prev) => ({ ...prev, window: option.id }))}
                                showImage={!!option.image}
                              />
                            ))}
                          </div>
                        </div>
                      )}

                      {/* ZRKADLOVÁ FÓLIA */}
                      {selectedSaunaType?.hasMirrorFilm && selectedSaunaType.mirrorFilmOptions.length > 0 && (
                        <div>
                          <h3 className="text-sm md:text-base font-semibold text-foreground mb-2">
                            {t("config.mirrorFilm")}
                          </h3>
                          <div className="grid grid-cols-2 gap-2 md:gap-3">
                            {selectedSaunaType.mirrorFilmOptions.map((option) => (
                              <OptionCard
                                key={option.id}
                                option={option}
                                isSelected={saunaConfig.mirror === option.id}
                                onClick={() => setSaunaConfig((prev) => ({ ...prev, mirror: option.id }))}
                              />
                            ))}
                          </div>
                        </div>
                      )}

                      {/* KOVOVÉ PÁSY */}
                      {selectedSaunaType?.hasMetalBands && selectedSaunaType.metalBandsOptions.length > 0 && (
                        <div>
                          <h3 className="text-sm md:text-base font-semibold text-foreground mb-2">
                            {t("config.metalBands")}
                          </h3>
                          <div className="grid grid-cols-2 gap-2 md:gap-3">
                            {selectedSaunaType.metalBandsOptions.map((option) => (
                              <OptionCard
                                key={option.id}
                                option={option}
                                isSelected={saunaConfig.metal === option.id}
                                onClick={() => setSaunaConfig((prev) => ({ ...prev, metal: option.id }))}
                                showImage={!!option.image}
                              />
                            ))}
                          </div>
                        </div>
                      )}


                      {/* THERMO WOOD CLADDING */}
                      {selectedSaunaType?.hasThermoCladding && selectedSaunaType.thermoCladdingOptions.length > 0 && (
                        <div>
                          <h3 className="text-sm md:text-base font-semibold text-foreground mb-2">
                            {t("config.thermoCladding")}
                          </h3>
                          <div className="grid grid-cols-2 gap-2 md:gap-3">
                            {selectedSaunaType.thermoCladdingOptions.map((option) => (
                              <OptionCard
                                key={option.id}
                                option={option}
                                isSelected={saunaConfig.thermoCladding === option.id}
                                onClick={() => setSaunaConfig((prev) => ({ ...prev, thermoCladding: option.id }))}
                                showImage={!!option.image}
                              />
                            ))}
                          </div>
                        </div>
                      )}

                      {/* LAVICE */}
                      {selectedSaunaType?.hasBenchOptions && selectedSaunaType.benchOptions.length > 0 && (
                        <div>
                          <h3 className="text-sm md:text-base font-semibold text-foreground mb-2">
                            {t("config.benches")}
                          </h3>
                          <div className="grid grid-cols-2 gap-2 md:gap-3">
                            {selectedSaunaType.benchOptions.map((option) => (
                              <OptionCard
                                key={option.id}
                                option={option}
                                isSelected={saunaConfig.bench === option.id}
                                onClick={() => setSaunaConfig((prev) => ({ ...prev, bench: option.id }))}
                                showImage={!!option.image}
                              />
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Vonkajšie LED osvetlenie - iba pre ModulSaunu */}
                      {selectedSaunaType.hasExteriorLed && (
                        <div>
                          <h3 className="text-sm md:text-base font-semibold text-foreground mb-2">
                            {t("config.exteriorLed")}
                          </h3>
                          <div className="grid grid-cols-2 gap-2 md:gap-3">
                            <button
                              onClick={() => setSaunaConfig((prev) => ({ ...prev, exteriorLed: false }))}
                              className={cn(
                                "flex flex-col items-center p-2 md:p-3 rounded-lg border-2 transition-all",
                                !saunaConfig.exteriorLed
                                  ? "border-primary bg-primary/5"
                                  : "border-border/50 hover:border-primary/50 bg-card/50",
                              )}
                            >
                              <div className="w-10 h-10 md:w-14 md:h-14 flex items-center justify-center rounded-md bg-muted/50 mb-1 md:mb-2">
                                <X className="w-5 h-5 md:w-7 md:h-7 text-muted-foreground" />
                              </div>
                              <span className="font-medium text-center text-xs md:text-sm">{t("config.without")}</span>
                              <span className="text-[10px] md:text-xs text-muted-foreground">{t("included")}</span>
                            </button>
                            <button
                              onClick={() => setSaunaConfig((prev) => ({ ...prev, exteriorLed: true }))}
                              className={cn(
                                "flex flex-col items-center p-2 md:p-3 rounded-lg border-2 transition-all",
                                saunaConfig.exteriorLed
                                  ? "border-primary bg-primary/5"
                                  : "border-border/50 hover:border-primary/50 bg-card/50",
                              )}
                            >
                              <div className="w-10 h-10 md:w-14 md:h-14 flex items-center justify-center rounded-md bg-primary/10 mb-1 md:mb-2">
                                <Lightbulb className="w-5 h-5 md:w-7 md:h-7 text-primary" />
                              </div>
                              <span className="font-medium text-center text-xs md:text-sm">
                                {t("config.exteriorLedShort")}
                              </span>
                              <span className="text-[10px] md:text-xs text-primary">+{exteriorLedPrice} €</span>
                            </button>
                          </div>
                        </div>
                      )}

                      {/* Bluetooth reproduktor */}
                      {selectedSaunaType.hasBluetooth && (
                        <div>
                          <h3 className="text-sm md:text-base font-semibold text-foreground mb-2">
                            {t("config.bluetooth")} <span className="text-primary">*</span>
                          </h3>
                          <div className="grid grid-cols-2 gap-2 md:gap-3">
                            {saunaBluetoothOptions.map((option) => (
                              <OptionCard
                                key={option.id}
                                option={option}
                                isSelected={saunaConfig.bluetooth === option.id}
                                onClick={() => setSaunaConfig((prev) => ({ ...prev, bluetooth: option.id }))}
                                showImage={true}
                              />
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Saunová sada */}
                      {selectedSaunaType.hasAccessoryKit && (
                        <div>
                          <h3 className="text-sm md:text-base font-semibold text-foreground mb-2">
                            {t("config.accessories")} <span className="text-primary">*</span>
                          </h3>
                          <p className="text-xs text-muted-foreground mb-2 italic">{t("config.accessoryKitHint")}</p>
                          <div className="grid grid-cols-2 gap-2 md:gap-3">
                            {saunaAccessoryKitOptions.map((option) => (
                              <OptionCard
                                key={option.id}
                                option={option}
                                isSelected={saunaConfig.accessoryKit === option.id}
                                onClick={() => setSaunaConfig((prev) => ({ ...prev, accessoryKit: option.id }))}
                                showImage={true}
                              />
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Farba */}
                      {selectedSaunaType.hasColor && (
                        <div>
                          <h3 className="text-sm md:text-base font-semibold text-foreground mb-2">
                            {t("config.color")} <span className="text-primary">*</span>
                          </h3>
                          <p className="text-xs text-muted-foreground mb-3 italic">{t("config.colorHint")}</p>
                          <div className="grid grid-cols-4 gap-2 md:gap-3">
                            {saunaColorOptionsTyped.map((option) => (
                              <button
                                key={option.id}
                                onClick={() => {
                                  setSaunaConfig((prev) => ({ ...prev, color: option.id }));
                                  setCurrentImageIndex(0);
                                }}
                                className={cn(
                                  "flex flex-col items-center p-1.5 md:p-2 rounded-lg border-2 transition-all",
                                  saunaConfig.color === option.id
                                    ? "border-primary bg-primary/5"
                                    : "border-border/50 hover:border-primary/50 bg-card/50",
                                )}
                              >
                                {option.id === "none" ? (
                                  <div className="w-8 h-8 md:w-10 md:h-10 rounded-md bg-muted/50 flex items-center justify-center mb-1">
                                    <X className="w-4 h-4 md:w-5 md:h-5 text-muted-foreground" />
                                  </div>
                                ) : (
                                  <div
                                    className="w-8 h-8 md:w-10 md:h-10 rounded-md mb-1 border border-border/30"
                                    style={{ backgroundColor: saunaColorSwatches[option.id].colorHsl }}
                                  />
                                )}
                                <span className="font-medium text-center text-xs">
                                  {t(`color.${option.id}`) !== `color.${option.id}`
                                    ? t(`color.${option.id}`)
                                    : option.name || saunaColorSwatches[option.id].nameFallback}
                                </span>
                                {option.price > 0 ? (
                                  <span className="text-xs text-primary">+{option.price.toLocaleString()} €</span>
                                ) : (
                                  <span className="text-xs text-muted-foreground">{t("included")}</span>
                                )}
                              </button>
                            ))}
                          </div>
                          <Notice variant="info" className="mt-4">
                            {t("config.colorNotice")}
                          </Notice>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {/* Veľkosť */}
                      {selectedHotTubType?.hasSize && selectedHotTubType.sizeOptions.length > 0 && (
                        <div>
                          <h3 className="text-sm md:text-base font-semibold text-foreground mb-2">
                            {t("config.size")} <span className="text-primary">*</span>
                          </h3>
                          <ScrollableRow>
                            {selectedHotTubType.sizeOptions.map((option) => (
                              <OptionCard
                                key={option.id}
                                option={option}
                                isSelected={hotTubConfig.size === option.id}
                                onClick={() => setHotTubConfig((prev) => ({ ...prev, size: option.id }))}
                              />
                            ))}
                          </ScrollableRow>
                        </div>
                      )}

                      {/* Vonkajšie drevo */}
                      {selectedHotTubType?.hasExteriorWood && selectedHotTubType.exteriorWoodOptions.length > 0 && (
                        <div>
                          <h3 className="text-sm md:text-base font-semibold text-foreground mb-2">
                            {t("config.exteriorWood")} <span className="text-primary">*</span>
                          </h3>
                          <ScrollableRow>
                            {selectedHotTubType.exteriorWoodOptions.map((option) => (
                              <OptionCard
                                key={option.id}
                                option={option}
                                isSelected={hotTubConfig.exteriorWood === option.id}
                                onClick={() => setHotTubConfig((prev) => ({ ...prev, exteriorWood: option.id }))}
                                showImage={!!option.image}
                              />
                            ))}
                          </ScrollableRow>
                        </div>
                      )}

                      {/* Acrylic Liner Color */}
                      {selectedHotTubType?.acrylicLinerOptions && selectedHotTubType.acrylicLinerOptions.length > 0 && (
                        <div>
                          <h3 className="text-sm md:text-base font-semibold text-foreground mb-2">
                            {t("config.acrylicLiner")} <span className="text-primary">*</span>
                          </h3>
                          <ScrollableRow>
                            {selectedHotTubType.acrylicLinerOptions.map((option) => (
                              <OptionCard
                                key={option.id}
                                option={option}
                                isSelected={hotTubConfig.acrylicLiner === option.id}
                                onClick={() => setHotTubConfig((prev) => ({ ...prev, acrylicLiner: option.id }))}
                                showImage={!!option.image}
                              />
                            ))}
                          </ScrollableRow>
                        </div>
                      )}

                      {selectedHotTubType?.hasHeater && selectedHotTubType.heaterOptions.length > 0 && (
                        <div>
                          <h3 className="text-sm md:text-base font-semibold text-foreground mb-2">
                            {t("config.hottubHeater")} <span className="text-primary">*</span>
                          </h3>
                          <ScrollableRow>
                            {selectedHotTubType.heaterOptions
                              .filter((o) => !o.id.startsWith("electric-"))
                              .map((option) => (
                                <OptionCard
                                  key={option.id}
                                  option={option}
                                  isSelected={hotTubConfig.heater === option.id}
                                  onClick={() => setHotTubConfig((prev) => ({ ...prev, heater: option.id }))}
                                  showImage={!!option.image}
                                  description={
                                    option.id === "external-aisi316"
                                      ? language === "en"
                                        ? "with chimney, cap and protection, suitable for water with chemicals"
                                        : "s komínom, čiapkou a ochranou, vhodné pre vodu s chémiou"
                                      : undefined
                                  }
                                />
                              ))}
                          </ScrollableRow>
                        </div>
                      )}

                      {/* Elektrický ohrievač */}
                      {selectedHotTubType?.hasHeater &&
                        selectedHotTubType.heaterOptions.filter((o) => o.id.startsWith("electric-")).length > 0 && (
                          <div>
                            <h3 className="text-sm md:text-base font-semibold text-foreground mb-2">
                              {t("config.hottubElectricHeater")} <span className="text-primary">*</span>
                            </h3>
                            <ScrollableRow>
                              <OptionCard
                                option={{ id: "none", name: t("config.noHeater"), price: 0 }}
                                isSelected={hotTubConfig.electricHeater === "none"}
                                onClick={() => setHotTubConfig((prev) => ({ ...prev, electricHeater: "none" }))}
                              />
                              {selectedHotTubType.heaterOptions
                                .filter((o) => o.id.startsWith("electric-"))
                                .map((option) => (
                                  <OptionCard
                                    key={option.id}
                                    option={option}
                                    isSelected={hotTubConfig.electricHeater === option.id}
                                    onClick={() => setHotTubConfig((prev) => ({ ...prev, electricHeater: option.id }))}
                                    showImage={!!option.image}
                                  />
                                ))}
                            </ScrollableRow>
                          </div>
                        )}

                      {/* Kryt - model-specific */}
                      {selectedHotTubType?.hasCover && selectedHotTubType.coverOptions.length > 0 && (
                        <div>
                          <h3 className="text-sm md:text-base font-semibold text-foreground mb-2">
                            {t("config.cover")} <span className="text-primary">*</span>
                          </h3>
                          <ScrollableRow>
                            {selectedHotTubType.coverOptions.map((option) => (
                              <OptionCard
                                key={option.id}
                                option={option}
                                isSelected={hotTubConfig.cover === option.id}
                                onClick={() =>
                                  setHotTubConfig((prev) => ({
                                    ...prev,
                                    cover: option.id,
                                    ...(option.id === "none" ? { coverColor: "none" } : {}),
                                  }))
                                }
                                showImage={!!option.image}
                              />
                            ))}
                          </ScrollableRow>
                        </div>
                      )}

                      {/* Farba krytu */}
                      {selectedHotTubType?.hasCoverColor &&
                        hotTubCoverColorOptions.length > 0 &&
                        hotTubConfig.cover !== "none" && (
                          <div>
                            <h3 className="text-sm md:text-base font-semibold text-foreground mb-2">
                              {t("config.coverColor")} <span className="text-primary">*</span>
                            </h3>
                            <ScrollableRow>
                              {hotTubCoverColorOptions.map((option) => (
                                <OptionCard
                                  key={option.id}
                                  option={option}
                                  isSelected={hotTubConfig.coverColor === option.id}
                                  onClick={() => setHotTubConfig((prev) => ({ ...prev, coverColor: option.id }))}
                                  showImage={!!option.image}
                                />
                              ))}
                            </ScrollableRow>
                          </div>
                        )}

                      {/* Podvodné LED */}
                      {selectedHotTubType?.hasUnderwaterLed && selectedHotTubType.underwaterLedOptions.length > 0 && (
                        <div>
                          <h3 className="text-sm md:text-base font-semibold text-foreground mb-2">
                            {t("config.underwaterLed")} <span className="text-primary">*</span>
                          </h3>
                          <ScrollableRow>
                            {selectedHotTubType.underwaterLedOptions.map((option) => (
                              <OptionCard
                                key={option.id}
                                option={option}
                                isSelected={hotTubConfig.underwaterLed === option.id}
                                onClick={() => setHotTubConfig((prev) => ({ ...prev, underwaterLed: option.id }))}
                                showImage={!!option.image}
                              />
                            ))}
                          </ScrollableRow>
                        </div>
                      )}

                      {/* LED okolo kade */}
                      {selectedHotTubType?.hasExteriorLed && selectedHotTubType.exteriorLedOptions.length > 0 && (
                        <div>
                          <h3 className="text-sm md:text-base font-semibold text-foreground mb-2">
                            {t("config.hottubExteriorLed")} <span className="text-primary">*</span>
                          </h3>
                          <ScrollableRow>
                            {selectedHotTubType.exteriorLedOptions.map((option) => (
                              <OptionCard
                                key={option.id}
                                option={option}
                                isSelected={hotTubConfig.exteriorLed === option.id}
                                onClick={() => setHotTubConfig((prev) => ({ ...prev, exteriorLed: option.id }))}
                                showImage={!!option.image}
                              />
                            ))}
                          </ScrollableRow>
                        </div>
                      )}

                      {/* Hydro masáž */}
                      {selectedHotTubType?.hasHydroMassage && selectedHotTubType.hydroMassageOptions.length > 0 && (
                        <div>
                          <h3 className="text-sm md:text-base font-semibold text-foreground mb-2">
                            {t("config.hydroMassage")} <span className="text-primary">*</span>
                          </h3>
                          <ScrollableRow>
                            {selectedHotTubType.hydroMassageOptions.map((option) => (
                              <OptionCard
                                key={option.id}
                                option={option}
                                isSelected={hotTubConfig.hydroMassage === option.id}
                                onClick={() => setHotTubConfig((prev) => ({ ...prev, hydroMassage: option.id }))}
                                showImage={!!option.image}
                              />
                            ))}
                          </ScrollableRow>
                        </div>
                      )}

                      {/* Vzduchové bubliny */}
                      {hotTubAirBubblesOptions.length > 0 && (
                        <div>
                          <h3 className="text-sm md:text-base font-semibold text-foreground mb-2">
                            {t("config.airBubbles")} <span className="text-primary">*</span>
                          </h3>
                          <ScrollableRow>
                            {hotTubAirBubblesOptions.map((option) => (
                              <OptionCard
                                key={option.id}
                                option={option}
                                isSelected={hotTubConfig.airBubbles === option.id}
                                onClick={() => setHotTubConfig((prev) => ({ ...prev, airBubbles: option.id }))}
                                showImage={!!option.image}
                              />
                            ))}
                          </ScrollableRow>
                        </div>
                      )}

                      {/* Prúdový istič */}
                      {hotTubDrainRelayOptions.length > 0 && (
                        <div>
                          <h3 className="text-sm md:text-base font-semibold text-foreground mb-2">
                            {t("config.drainRelay")} <span className="text-primary">*</span>
                          </h3>
                          <ScrollableRow>
                            {hotTubDrainRelayOptions.map((option) => (
                              <OptionCard
                                key={option.id}
                                option={option}
                                isSelected={hotTubConfig.drainRelay === option.id}
                                onClick={() => setHotTubConfig((prev) => ({ ...prev, drainRelay: option.id }))}
                                showImage={!!option.image}
                              />
                            ))}
                          </ScrollableRow>
                        </div>
                      )}

                      {/* Pieskový filter */}
                      {hotTubSandFilterOptions.length > 0 && (
                        <div>
                          <h3 className="text-sm md:text-base font-semibold text-foreground mb-2">
                            {t("config.sandFilter")} <span className="text-primary">*</span>
                          </h3>
                          <ScrollableRow>
                            {hotTubSandFilterOptions.map((option) => (
                              <OptionCard
                                key={option.id}
                                option={option}
                                isSelected={hotTubConfig.sandFilter === option.id}
                                onClick={() => setHotTubConfig((prev) => ({ ...prev, sandFilter: option.id }))}
                                showImage={!!option.image}
                              />
                            ))}
                          </ScrollableRow>
                        </div>
                      )}

                      {/* Elektronický kontrolér */}
                      {hotTubElectronicControllerOptions.length > 0 && (
                        <div>
                          <h3 className="text-sm md:text-base font-semibold text-foreground mb-2">
                            {t("config.electronicController")} <span className="text-primary">*</span>
                          </h3>
                          <ScrollableRow>
                            {hotTubElectronicControllerOptions.map((option) => (
                              <OptionCard
                                key={option.id}
                                option={option}
                                isSelected={hotTubConfig.electronicController === option.id}
                                onClick={() =>
                                  setHotTubConfig((prev) => ({ ...prev, electronicController: option.id }))
                                }
                                showImage={!!option.image}
                              />
                            ))}
                          </ScrollableRow>
                        </div>
                      )}

                      {/* Teplomer */}
                      {hotTubThermometerOptions.length > 0 && (
                        <div>
                          <h3 className="text-sm md:text-base font-semibold text-foreground mb-2">
                            {t("config.thermometer")} <span className="text-primary">*</span>
                          </h3>
                          <ScrollableRow>
                            {hotTubThermometerOptions.map((option) => (
                              <OptionCard
                                key={option.id}
                                option={option}
                                isSelected={hotTubConfig.thermometer === option.id}
                                onClick={() => setHotTubConfig((prev) => ({ ...prev, thermometer: option.id }))}
                                showImage={!!option.image}
                              />
                            ))}
                          </ScrollableRow>
                        </div>
                      )}

                      {/* Bluetooth reproduktor */}
                      {hotTubBluetoothSpeakerOptions.length > 0 && (
                        <div>
                          <h3 className="text-sm md:text-base font-semibold text-foreground mb-2">
                            {t("config.bluetoothSpeaker")} <span className="text-primary">*</span>
                          </h3>
                          <ScrollableRow>
                            {hotTubBluetoothSpeakerOptions.map((option) => (
                              <OptionCard
                                key={option.id}
                                option={option}
                                isSelected={hotTubConfig.bluetoothSpeaker === option.id}
                                onClick={() => setHotTubConfig((prev) => ({ ...prev, bluetoothSpeaker: option.id }))}
                                showImage={!!option.image}
                              />
                            ))}
                          </ScrollableRow>
                        </div>
                      )}

                      {/* Hlavový vankúš */}
                      {hotTubHeadCushionOptions.length > 0 && (
                        <div>
                          <h3 className="text-sm md:text-base font-semibold text-foreground mb-2">
                            {t("config.headCushion")} <span className="text-primary">*</span>
                          </h3>
                          <ScrollableRow>
                            {hotTubHeadCushionOptions.map((option) => (
                              <OptionCard
                                key={option.id}
                                option={option}
                                isSelected={hotTubConfig.headCushion === option.id}
                                onClick={() => setHotTubConfig((prev) => ({ ...prev, headCushion: option.id }))}
                                showImage={!!option.image}
                              />
                            ))}
                          </ScrollableRow>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Mobile price summary */}
                <div className="lg:hidden border border-border/50 rounded-2xl p-6 bg-card/50">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-lg font-medium">{t("config.total")}</span>
                    <div className="text-right">
                      <span className="text-muted-foreground line-through text-sm mr-2">
                        {originalPrice.toLocaleString()} €
                      </span>
                      <span className="text-3xl font-bold text-primary">{totalPrice.toLocaleString()} €</span>
                    </div>
                  </div>

                  <Button
                    variant="luxury"
                    size="lg"
                    className="w-full gap-2"
                    onClick={addToCart}
                    disabled={isAddingToCart}
                  >
                    {isAddingToCart ? (
                      <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                      <ShoppingCart className="w-5 h-5" />
                    )}
                    {isAddingToCart ? t("config.addingToCart") : t("config.addToCart")}
                  </Button>

                  <p className="text-xs text-muted-foreground text-center mt-3">{t("config.priceNote")}</p>
                </div>
              </ConfigScrollWrapper>
            </div>
          </div>
        </div>
      </main>
      <ConfiguratorFooter />

      {/* Lightbox Modal */}
      {isLightboxOpen && (
        <div
          className="fixed inset-0 z-50 bg-background/95 backdrop-blur-sm flex items-center justify-center"
          onClick={() => setIsLightboxOpen(false)}
        >
          <button
            className="absolute top-6 right-6 p-3 bg-card/50 backdrop-blur-sm rounded-full hover:bg-card transition-colors z-10"
            onClick={() => setIsLightboxOpen(false)}
          >
            <X className="w-6 h-6" />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              setCurrentImageIndex((i) => (i === 0 ? images.length - 1 : i - 1));
            }}
            className="absolute left-6 top-1/2 -translate-y-1/2 p-3 bg-card/50 backdrop-blur-sm rounded-full hover:bg-card transition-colors z-10"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              setCurrentImageIndex((i) => (i === images.length - 1 ? 0 : i + 1));
            }}
            className="absolute right-6 top-1/2 -translate-y-1/2 p-3 bg-card/50 backdrop-blur-sm rounded-full hover:bg-card transition-colors z-10"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          <div className="max-w-5xl max-h-[85vh] w-full mx-6" onClick={(e) => e.stopPropagation()}>
            <img
              src={images[currentImageIndex]}
              alt={t("config.lightboxAlt")}
              className="w-full h-full object-contain rounded-lg"
            />

            {/* Thumbnail strip */}
            <div className="flex justify-center gap-2 mt-4 overflow-x-auto pb-2">
              {images.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={cn(
                    "relative w-16 h-16 flex-shrink-0 rounded-lg overflow-hidden transition-all",
                    currentImageIndex === index
                      ? "ring-2 ring-primary ring-offset-2 ring-offset-background"
                      : "opacity-60 hover:opacity-100",
                  )}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Option Image Zoom Modal */}
      {zoomImage && (
        <div
          className="fixed inset-0 z-50 bg-background/95 backdrop-blur-sm flex items-center justify-center"
          onClick={() => setZoomImage(null)}
        >
          <button
            className="absolute top-6 right-6 p-3 bg-card/50 backdrop-blur-sm rounded-full hover:bg-card transition-colors z-10"
            onClick={() => setZoomImage(null)}
          >
            <X className="w-6 h-6" />
          </button>
          <div className="max-w-2xl max-h-[80vh] w-full mx-6" onClick={(e) => e.stopPropagation()}>
            <img
              src={zoomImage.src}
              alt={zoomImage.alt}
              className="w-full h-full object-contain rounded-lg"
            />
            <p className="text-center text-sm text-muted-foreground mt-3">{zoomImage.alt}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Configurator;

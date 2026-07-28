import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

/**
 * LUXURELAX – Nezáväzná cenová ponuka
 *
 * Umiestni pod tlačidlo "Pridať do košíka" v konfigurátore.
 * Odosiela aktuálnu konfiguráciu na WordPress endpoint, ktorý pošle
 * e-mail zákazníkovi aj do LUXURELAX a uloží dopyt do adminu.
 *
 * Použitie:
 *   <QuoteRequestButton options={options} lang={lang} />
 *
 * `options` = ten istý objekt, ktorý sa posiela do /sauna/v1/add-to-cart
 *
 * POZN.: Modal sa renderuje cez createPortal priamo do document.body,
 * aby ho neprekrývali prvky konfigurátora (z-index / stacking context).
 */

const API = "https://www.luxurelax.sk/wp-json/sauna/v1/inquiry";

type Lang = "sk" | "en" | "hu";

interface Props {
  options: Record<string, unknown>;
  lang?: Lang;
  className?: string;
}

const T: Record<Lang, Record<string, string>> = {
  sk: {
    cta: "Poslať nezáväznú ponuku",
    title: "Nezáväzná cenová ponuka",
    intro:
      "Pošleme vám konfiguráciu e-mailom a ozveme sa telefonicky. Nič neplatíte a k ničomu sa nezaväzujete.",
    name: "Meno a priezvisko",
    email: "E-mail",
    phone: "Telefón",
    notePh: "Napríklad kedy plánujete realizáciu alebo na čo sa chcete opýtať…",
    send: "Odoslať ponuku",
    sending: "Odosielam…",
    cancel: "Zavrieť",
    okTitle: "Ponuku sme odoslali",
    okText:
      "Skontrolujte si e-mail – poslali sme vám prehľad konfigurácie. Čoskoro sa vám ozveme telefonicky.",
    required: "Vyplňte prosím meno, e-mail a telefón.",
    fail: "Odoslanie sa nepodarilo. Skúste to prosím znova.",
  },
  en: {
    cta: "Request a non-binding quote",
    title: "Non-binding quote",
    intro:
      "We will e-mail you the configuration and call you back. You pay nothing and commit to nothing.",
    name: "Full name",
    email: "E-mail",
    phone: "Phone",
    notePh: "For example your timeline or any question you have…",
    send: "Send request",
    sending: "Sending…",
    cancel: "Close",
    okTitle: "Your quote is on its way",
    okText:
      "Check your inbox – we sent you the configuration summary. We will call you shortly.",
    required: "Please fill in your name, e-mail and phone.",
    fail: "Sending failed. Please try again.",
  },
  hu: {
    cta: "Nem kötelező ajánlatkérés",
    title: "Nem kötelező érvényű ajánlat",
    intro:
      "E-mailben elküldjük a konfigurációt és telefonon jelentkezünk. Semmit nem kell fizetnie.",
    name: "Teljes név",
    email: "E-mail",
    phone: "Telefon",
    notePh: "Például a tervezett időpont vagy kérdése…",
    send: "Ajánlatkérés elküldése",
    sending: "Küldés…",
    cancel: "Bezárás",
    okTitle: "Az ajánlatot elküldtük",
    okText:
      "Nézze meg postafiókját – elküldtük a konfiguráció összefoglalóját. Hamarosan telefonon jelentkezünk.",
    required: "Kérjük, adja meg nevét, e-mail címét és telefonszámát.",
    fail: "A küldés nem sikerült. Kérjük, próbálja újra.",
  },
};

export default function QuoteRequestButton({ options, lang = "sk", className = "" }: Props) {
  const t = T[lang] ?? T.sk;

  const [open, setOpen] = useState(false);
  const [sending, setSending] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({ name: "", email: "", phone: "", note: "", website: "" });

  const set = (k: string, v: string) => setForm((f) => ({ ...f, [k]: v }));

  // zamkne scroll stránky, kým je modal otvorený
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onEsc);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onEsc);
    };
  }, [open]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!form.name.trim() || !form.email.trim() || !form.phone.trim()) {
      setError(t.required);
      return;
    }

    setSending(true);
    try {
      const res = await fetch(API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          lang,
          options,
          website: form.website, // honeypot – musí zostať prázdny
          customer: {
            name: form.name,
            email: form.email,
            phone: form.phone,
            note: form.note,
          },
        }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok || data?.ok === false) {
        setError(data?.message || t.fail);
        setSending(false);
        return;
      }

      setDone(true);
    } catch {
      setError(t.fail);
    } finally {
      setSending(false);
    }
  };

  const close = () => {
    setOpen(false);
    setTimeout(() => {
      setDone(false);
      setError("");
      setForm({ name: "", email: "", phone: "", note: "", website: "" });
    }, 200);
  };

  const inputCls =
    "w-full rounded-lg border border-[#3d3529] bg-[#1c1814] px-4 py-3 text-[#f5f5f4] placeholder-[#6d6457] outline-none focus:border-[#EEA540] transition-colors";

  const modal = (
    <div
      onClick={close}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 2147483000,
        background: "rgba(0,0,0,0.8)",
        backdropFilter: "blur(3px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "16px",
        overflowY: "auto",
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          position: "relative",
          zIndex: 1,
          width: "100%",
          maxWidth: "440px",
          background: "#161412",
          border: "1px solid #3d3529",
          borderRadius: "16px",
          padding: "26px",
          boxShadow: "0 30px 80px rgba(0,0,0,0.6)",
          maxHeight: "90vh",
          overflowY: "auto",
        }}
      >
        {done ? (
          <div style={{ textAlign: "center" }}>
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full border border-[#EEA540]/40 bg-[#EEA540]/10">
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#EEA540" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 6L9 17l-5-5" />
              </svg>
            </div>
            <h3 className="mb-2 font-serif text-xl text-[#f3ede3]">{t.okTitle}</h3>
            <p className="mb-6 text-sm leading-relaxed text-[#a89c8a]">{t.okText}</p>
            <button
              onClick={close}
              className="rounded-lg bg-gradient-to-r from-[#EEA540] to-[#98641B] px-6 py-3 font-medium text-[#161412]"
            >
              {t.cancel}
            </button>
          </div>
        ) : (
          <form onSubmit={submit}>
            <h3 className="mb-2 font-serif text-xl text-[#f3ede3]">{t.title}</h3>
            <p className="mb-5 text-sm leading-relaxed text-[#a89c8a]">{t.intro}</p>

            <div className="space-y-3">
              <input
                className={inputCls}
                placeholder={t.name}
                value={form.name}
                onChange={(e) => set("name", e.target.value)}
                autoComplete="name"
              />
              <input
                className={inputCls}
                type="email"
                placeholder={t.email}
                value={form.email}
                onChange={(e) => set("email", e.target.value)}
                autoComplete="email"
              />
              <input
                className={inputCls}
                type="tel"
                placeholder={t.phone}
                value={form.phone}
                onChange={(e) => set("phone", e.target.value)}
                autoComplete="tel"
              />
              <textarea
                className={inputCls + " min-h-[90px] resize-y"}
                placeholder={t.notePh}
                value={form.note}
                onChange={(e) => set("note", e.target.value)}
              />

              {/* honeypot – neviditeľné pole proti spamu */}
              <input
                type="text"
                tabIndex={-1}
                autoComplete="off"
                value={form.website}
                onChange={(e) => set("website", e.target.value)}
                style={{ position: "absolute", left: "-9999px", opacity: 0 }}
                aria-hidden="true"
              />
            </div>

            {error && (
              <p className="mt-3 rounded-lg border border-red-900/50 bg-red-950/40 px-4 py-2 text-sm text-red-300">
                {error}
              </p>
            )}

            <div className="mt-5 flex gap-3">
              <button
                type="button"
                onClick={close}
                className="flex-1 rounded-lg border border-[#3d3529] px-4 py-3 text-[#a89c8a] transition-colors hover:bg-white/5"
              >
                {t.cancel}
              </button>
              <button
                type="submit"
                disabled={sending}
                className="flex-1 rounded-lg bg-gradient-to-r from-[#EEA540] to-[#98641B] px-4 py-3 font-medium text-[#161412] transition-opacity disabled:opacity-60"
              >
                {sending ? t.sending : t.send}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={
          "w-full rounded-lg border border-[#EEA540]/50 bg-transparent px-6 py-3 text-[#EEA540] font-medium tracking-wide transition-colors hover:bg-[#EEA540]/10 " +
          className
        }
      >
        {t.cta}
      </button>

      {open && typeof document !== "undefined" && createPortal(modal, document.body)}
    </>
  );
}

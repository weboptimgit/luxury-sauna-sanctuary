import { useMemo, useState } from "react";
import { Search, X, Check } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { RAL_GROUPS, type RalColor } from "@/data/ralClassic";
import { useLanguage } from "@/contexts/LanguageContext";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedCode?: string;
  onSelect: (color: RalColor) => void;
}

export default function RalPickerDialog({ open, onOpenChange, selectedCode, onSelect }: Props) {
  const { t } = useLanguage();
  const [query, setQuery] = useState("");

  const filteredGroups = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return RAL_GROUPS;
    return RAL_GROUPS
      .map((g) => ({
        ...g,
        colors: g.colors.filter(
          (c) =>
            c.code.toLowerCase().includes(q) ||
            c.name.toLowerCase().includes(q),
        ),
      }))
      .filter((g) => g.colors.length > 0);
  }, [query]);

  const selected = useMemo(() => {
    if (!selectedCode) return undefined;
    for (const g of RAL_GROUPS) {
      const f = g.colors.find((c) => c.code === selectedCode);
      if (f) return f;
    }
    return undefined;
  }, [selectedCode]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl p-0 gap-0 overflow-hidden bg-card border-border">
        <DialogHeader className="p-6 pb-4 border-b border-border">
          <DialogTitle className="font-display text-2xl">{t("pergola.ral.title")}</DialogTitle>
          <DialogDescription className="text-foreground/60">
            {t("pergola.ral.description")}
          </DialogDescription>

          <div className="relative mt-3">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/40" />
            <Input
              autoFocus
              placeholder={t("pergola.ral.searchPlaceholder")}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="pl-9 pr-9 h-11 bg-background/60"
            />
            {query && (
              <button
                onClick={() => setQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-foreground/40 hover:text-foreground"
                aria-label={t("pergola.ral.clear")}
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </DialogHeader>

        <div className="max-h-[60vh] overflow-y-auto px-6 py-5 space-y-7">
          {filteredGroups.length === 0 && (
            <div className="text-center text-foreground/50 py-10 text-sm">
              Pre dopyt „{query}“ nič nenájdené.
            </div>
          )}
          {filteredGroups.map((g) => (
            <div key={g.id}>
              <div className="text-[11px] uppercase tracking-widest text-foreground/50 mb-3">
                {g.label}
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {g.colors.map((c) => {
                  const active = selectedCode === c.code;
                  return (
                    <button
                      key={c.code}
                      onClick={() => {
                        onSelect(c);
                        onOpenChange(false);
                      }}
                      className={cn(
                        "group relative rounded-lg overflow-hidden border text-left transition-all",
                        active
                          ? "border-primary shadow-[0_0_20px_hsl(var(--primary)/0.35)]"
                          : "border-border hover:border-primary/60",
                      )}
                    >
                      <div
                        className="h-16 w-full"
                        style={{
                          background: `linear-gradient(135deg, ${c.hex} 0%, ${c.hex} 60%, rgba(255,255,255,0.12) 100%), ${c.hex}`,
                        }}
                      />
                      {active && (
                        <div className="absolute top-1.5 right-1.5 w-5 h-5 rounded-full bg-primary text-primary-foreground flex items-center justify-center">
                          <Check className="w-3 h-3" />
                        </div>
                      )}
                      <div className="p-2 bg-card">
                        <div className="text-[10px] uppercase tracking-wider text-primary">
                          {c.code}
                        </div>
                        <div className="text-xs font-medium truncate">{c.name}</div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        <DialogFooter className="p-4 border-t border-border bg-background/40 sm:justify-between">
          <div className="text-xs text-foreground/60">
            {selected ? (
              <>
                Vybrané:{" "}
                <span className="text-primary font-medium">{selected.code}</span>{" "}
                <span className="text-foreground/80">{selected.name}</span>
              </>
            ) : (
              "Žiadny RAL odtieň zatiaľ vybraný"
            )}
          </div>
          <Button variant="outline" size="sm" onClick={() => onOpenChange(false)}>
            <X className="w-4 h-4" /> Zavrieť
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

import { Brain, Fingerprint, Home, Menu, ScanEye, Sparkles, X } from "lucide-react";
import { useState } from "react";
import type { Route } from "../hooks/hooks";
import { cn } from "../utils/cn";

interface HeaderProps {
  route: Route;
  navigate: (r: Route) => void;
}

export function Header({ route, navigate }: HeaderProps) {
  const [open, setOpen] = useState(false);

  const links: { id: Route; label: string; icon: typeof Home; desc: string }[] = [
    { id: "home", label: "الرئيسية", icon: Home, desc: "اختر اختبارك" },
    { id: "personality", label: "النمط النفسي العميق", icon: Brain, desc: "8 أسئلة · 16 نمطاً" },
    { id: "crime", label: "العقلية الإجرامية", icon: Fingerprint, desc: "8 أسئلة · 12 نمطاً" },
  ];

  const go = (r: Route) => {
    navigate(r);
    setOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#0b0b0e]/85 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-3 px-4">
        <button onClick={() => go("home")} className="group flex items-center gap-3 text-right">
          <span className="relative grid h-10 w-10 place-items-center overflow-hidden rounded-xl bg-gradient-to-br from-violet-600 via-indigo-600 to-amber-600 shadow-lg shadow-violet-900/40">
            <Brain className="h-5 w-5 text-white" />
            <span className="absolute inset-0 bg-gradient-to-t from-black/25 to-transparent" />
          </span>
          <span className="leading-tight">
            <span className="block font-display text-[15px] font-900 font-extrabold text-white">
              اختبارات نفسية <span className="text-gradient-gold">تفاعلية</span>
            </span>
            <span className="block text-[11px] font-medium text-slate-400">اكتشف خبايا شخصيتك بدقة عالية</span>
          </span>
        </button>

        <nav className="hidden items-center gap-2 md:flex">
          {links.map((l) => {
            const Icon = l.icon;
            const active = route === l.id;
            return (
              <button
                key={l.id}
                onClick={() => go(l.id)}
                className={cn(
                  "flex items-center gap-2 rounded-xl border px-4 py-2 text-sm font-bold transition-all",
                  active
                    ? "border-amber-500/50 bg-amber-500/10 text-amber-200 shadow-[0_0_20px_rgba(217,119,6,0.25)]"
                    : "border-transparent text-slate-300 hover:border-white/10 hover:bg-white/5 hover:text-white"
                )}
              >
                <Icon className="h-4 w-4" />
                {l.label}
              </button>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <span className="hidden items-center gap-1.5 rounded-full border border-emerald-400/30 bg-emerald-500/10 px-3 py-1.5 text-[11px] font-bold text-emerald-200 lg:flex">
            <span className="live-dot" />
            تحليل فوري مجاني
          </span>
          <button
            onClick={() => setOpen((v) => !v)}
            className="grid h-10 w-10 place-items-center rounded-xl border border-white/10 bg-white/5 text-slate-200 md:hidden"
            aria-label="القائمة"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="anim-fade-in border-t border-white/10 bg-[#0b0b0e]/95 px-4 pb-4 pt-3 backdrop-blur-xl md:hidden">
          <div className="grid gap-2">
            {links.map((l) => {
              const Icon = l.icon;
              const active = route === l.id;
              return (
                <button
                  key={l.id}
                  onClick={() => go(l.id)}
                  className={cn(
                    "flex items-center gap-3 rounded-xl border p-3 text-right transition-all",
                    active ? "border-amber-500/50 bg-amber-500/10" : "border-white/10 bg-white/[0.03]"
                  )}
                >
                  <span className={cn("grid h-9 w-9 place-items-center rounded-lg", active ? "bg-amber-500/20 text-amber-300" : "bg-white/5 text-slate-300")}>
                    <Icon className="h-4 w-4" />
                  </span>
                  <span>
                    <span className="block text-sm font-extrabold text-white">{l.label}</span>
                    <span className="block text-[11px] text-slate-400">{l.desc}</span>
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
}

export function Footer({ navigate }: { navigate: (r: Route) => void }) {
  return (
    <footer className="mt-10 border-t border-white/10 bg-black/30">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 md:grid-cols-3">
        <div>
          <div className="flex items-center gap-2.5">
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-violet-600 to-amber-600">
              <Sparkles className="h-4 w-4 text-white" />
            </span>
            <span className="font-display text-base font-extrabold text-white">اختبارات نفسية تفاعلية</span>
          </div>
          <p className="mt-3 text-sm leading-7 text-slate-400">
            منصة عربية للتحليل النفسي التفاعلي. اختباران عميقان: النمط النفسي والعقلية الإجرامية — كل اختبار في صفحته الخاصة مع تقرير مفصّل وخريطة تعافٍ.
          </p>
        </div>
        <div>
          <h4 className="mb-3 text-sm font-extrabold text-amber-300">الاختبارات</h4>
          <div className="grid gap-2">
            <button onClick={() => navigate("personality")} className="flex items-center gap-2 text-right text-sm text-slate-300 transition hover:text-amber-200">
              <Brain className="h-4 w-4 text-violet-300" /> اختبار النمط النفسي العميق
            </button>
            <button onClick={() => navigate("crime")} className="flex items-center gap-2 text-right text-sm text-slate-300 transition hover:text-amber-200">
              <ScanEye className="h-4 w-4 text-rose-300" /> تحليل العقلية الإجرامية والنفسية الخفية
            </button>
            <button onClick={() => navigate("home")} className="flex items-center gap-2 text-right text-sm text-slate-300 transition hover:text-amber-200">
              <Home className="h-4 w-4 text-emerald-300" /> الصفحة الرئيسية
            </button>
          </div>
        </div>
        <div>
          <h4 className="mb-3 text-sm font-extrabold text-amber-300">تنبيه مهم</h4>
          <p className="text-[13px] leading-7 text-slate-400">
            هذه الاختبارات لأغراض الترفيه والتوعية الذاتية فقط، ولا تُغني عن التشخيص النفسي المتخصص. النتائج تعكس ميولاً سلوكية عامة وليست أحكاماً طبية.
          </p>
        </div>
      </div>
      <div className="border-t border-white/10 py-4 text-center text-xs text-slate-500">
        جميع الحقوق محفوظة © {new Date().getFullYear()} — صُنع بشغف لفهم أعمق للذات 🧠
      </div>
    </footer>
  );
}

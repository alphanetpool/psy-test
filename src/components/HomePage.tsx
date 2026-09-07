import {
  ArrowLeft,
  BadgeCheck,
  Brain,
  Clock3,
  Fingerprint,
  ListChecks,
  LockOpen,
  Share2,
  ShieldCheck,
  Sparkles,
  Target,
  Users,
  Zap,
} from "lucide-react";
import type { Route } from "../hooks/hooks";
import { CounterBadge } from "./CounterBadge";

export function HomePage({ navigate }: { navigate: (r: Route) => void }) {
  return (
    <div>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute -left-24 top-10 h-72 w-72 rounded-full bg-violet-600/20 blur-[100px]" style={{ animation: "orbDrift 9s ease-in-out infinite" }} />
        <div className="pointer-events-none absolute -right-20 top-40 h-72 w-72 rounded-full bg-amber-600/15 blur-[100px]" style={{ animation: "orbDrift 11s ease-in-out infinite" }} />

        <div className="relative mx-auto max-w-6xl px-4 pb-10 pt-12 text-center sm:pt-16">
          <div className="anim-fade-up inline-flex items-center gap-2 rounded-full border border-violet-400/30 bg-violet-500/10 px-4 py-1.5 text-xs font-bold text-violet-200">
            <Sparkles className="h-3.5 w-3.5" />
            منصّة التحليل النفسي العربي الأولى — مجاني بالكامل
          </div>

          <h1 className="anim-fade-up stagger-1 mx-auto mt-5 max-w-3xl font-display text-3xl font-black leading-[1.5] text-white sm:text-5xl sm:leading-[1.6]">
            اكتشف <span className="text-gradient-gold">خبايا شخصيتك</span>
            <br />
            ودهاليز <span className="text-gradient-violet">عقلك الخفي</span>
          </h1>

          <p className="anim-fade-up stagger-2 mx-auto mt-4 max-w-2xl text-sm leading-8 text-slate-300 sm:text-base">
            اختباران نفسيان عميقان، كل واحد في صفحته الخاصة: الأول يكشف نمطك النفسي وسلاحك الخفي، والثاني يحلل استجابتك للسلطة والإغراء والحدود الأخلاقية. أجب بصدق… ودع التحليل يفاجئك.
          </p>

          <div className="anim-fade-up stagger-3 mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <div className="scale-95 sm:scale-100"><CounterBadge kind="personality" label="تحليلاً نفسياً هذا الأسبوع" /></div>
            <div className="scale-95 sm:scale-100"><CounterBadge kind="crime" label="تحليلاً جنائياً هذا الأسبوع" /></div>
          </div>

          <div className="anim-fade-up stagger-4 mt-6 flex flex-wrap items-center justify-center gap-2 text-[11px] font-bold text-slate-400">
            <span className="flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1.5"><Clock3 className="h-3.5 w-3.5 text-emerald-300" /> 3 دقائق فقط لكل اختبار</span>
            <span className="flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1.5"><ShieldCheck className="h-3.5 w-3.5 text-sky-300" /> سري 100% — لا نطلب أي بيانات</span>
            <span className="flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1.5"><BadgeCheck className="h-3.5 w-3.5 text-amber-300" /> تقرير مفصّل + خريطة تعافٍ</span>
          </div>
        </div>
      </section>

      {/* TEST CARDS */}
      <section className="mx-auto max-w-6xl px-4">
        <div className="mb-5 flex items-center gap-3">
          <span className="h-px flex-1 bg-gradient-to-l from-transparent via-amber-500/40 to-transparent" />
          <h2 className="flex items-center gap-2 whitespace-nowrap font-display text-lg font-extrabold text-white sm:text-xl">
            <Target className="h-5 w-5 text-amber-400" /> اختر اختبارك الآن
          </h2>
          <span className="h-px flex-1 bg-gradient-to-r from-transparent via-amber-500/40 to-transparent" />
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          {/* Personality card */}
          <article className="anim-fade-up card-hover group relative overflow-hidden rounded-3xl border border-violet-400/25 bg-gradient-to-b from-[#181a35] to-[#12142a] p-6 sm:p-7">
            <div className="pointer-events-none absolute -left-16 -top-16 h-56 w-56 rounded-full bg-violet-600/25 blur-[80px] transition-opacity group-hover:opacity-100" />
            <div className="relative">
              <div className="flex items-start justify-between gap-3">
                <span className="grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-violet-500 to-indigo-700 shadow-lg shadow-violet-900/50" style={{ animation: "floaty 4s ease-in-out infinite" }}>
                  <Brain className="h-7 w-7 text-white" />
                </span>
                <span className="rounded-full border border-violet-300/30 bg-violet-500/15 px-3 py-1 text-[11px] font-black text-violet-200">الأكثر إقبالاً 🔥</span>
              </div>

              <p className="mt-4 text-[11px] font-black tracking-wide text-violet-300">الصفحة 01 — اختبار الشخصية</p>
              <h3 className="mt-1 font-display text-xl font-black leading-9 text-white sm:text-2xl">
                اختبار النمط النفسي العميق
              </h3>
              <p className="mt-2 text-[13px] leading-7 text-slate-300">
                كشف الستار عن خبايا شخصيتك: استبيان تحليلي مبني على مقاييس السلوك والحدس البشري، يحدد فئتك ونمطك النفسي الخفي من بين 16 نمطاً بدقة عالية.
              </p>

              <div className="mt-4 grid grid-cols-3 gap-2 text-center">
                <div className="rounded-xl border border-white/10 bg-black/30 px-2 py-2.5">
                  <ListChecks className="mx-auto h-4 w-4 text-violet-300" />
                  <p className="mt-1 text-sm font-black text-white">8</p>
                  <p className="text-[10px] text-slate-400">أسئلة دقيقة</p>
                </div>
                <div className="rounded-xl border border-white/10 bg-black/30 px-2 py-2.5">
                  <Users className="mx-auto h-4 w-4 text-violet-300" />
                  <p className="mt-1 text-sm font-black text-white">16</p>
                  <p className="text-[10px] text-slate-400">نمطاً نفسياً</p>
                </div>
                <div className="rounded-xl border border-white/10 bg-black/30 px-2 py-2.5">
                  <Clock3 className="mx-auto h-4 w-4 text-violet-300" />
                  <p className="mt-1 text-sm font-black text-white">~3</p>
                  <p className="text-[10px] text-slate-400">دقائق</p>
                </div>
              </div>

              <ul className="mt-4 grid gap-2 text-[12px] text-slate-300">
                <li className="flex items-center gap-2"><Zap className="h-3.5 w-3.5 shrink-0 text-emerald-300" /> سلاحك الخفي + نمطك الاجتماعي + نزيف طاقتك</li>
                <li className="flex items-center gap-2"><LockOpen className="h-3.5 w-3.5 shrink-0 text-amber-300" /> خريطة التعافي والاتزان الكاملة بعد المشاركة</li>
              </ul>

              <button
                onClick={() => navigate("personality")}
                className="mt-5 flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-l from-violet-600 to-indigo-600 px-5 py-3.5 text-sm font-black text-white shadow-lg shadow-violet-900/40 transition hover:brightness-110 active:scale-[0.99]"
              >
                ادخل صفحة الاختبار وابدأ التحليل
                <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
              </button>
            </div>
          </article>

          {/* Crime card */}
          <article className="anim-fade-up stagger-1 card-hover group relative overflow-hidden rounded-3xl border border-rose-400/25 bg-gradient-to-b from-[#2a1420] to-[#170f18] p-6 sm:p-7">
            <div className="pointer-events-none absolute -left-16 -top-16 h-56 w-56 rounded-full bg-rose-600/20 blur-[80px] transition-opacity group-hover:opacity-100" />
            <div className="relative">
              <div className="flex items-start justify-between gap-3">
                <span className="grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-rose-600 to-red-900 shadow-lg shadow-rose-950/60" style={{ animation: "floaty 4.6s ease-in-out infinite" }}>
                  <Fingerprint className="h-7 w-7 text-white" />
                </span>
                <span className="rounded-full border border-rose-300/30 bg-rose-500/15 px-3 py-1 text-[11px] font-black text-rose-200">تحليل جريء 🕵️</span>
              </div>

              <p className="mt-4 text-[11px] font-black tracking-wide text-rose-300">الصفحة 02 — التحليل الجنائي</p>
              <h3 className="mt-1 font-display text-xl font-black leading-9 text-white sm:text-2xl">
                تحليل العقلية الإجرامية والنفسية الخفية
              </h3>
              <p className="mt-2 text-[13px] leading-7 text-slate-300">
                8 أسئلة متسلسلة تحلل استجابتك للسلطة والإغراء والانتقام والحدود الأخلاقية، ثم تستخرج نمطك السلوكي من بين 12 نمطاً مع ثغرتك المظلمة.
              </p>

              <div className="mt-4 grid grid-cols-3 gap-2 text-center">
                <div className="rounded-xl border border-white/10 bg-black/30 px-2 py-2.5">
                  <ListChecks className="mx-auto h-4 w-4 text-rose-300" />
                  <p className="mt-1 text-sm font-black text-white">8</p>
                  <p className="text-[10px] text-slate-400">سيناريوهات</p>
                </div>
                <div className="rounded-xl border border-white/10 bg-black/30 px-2 py-2.5">
                  <Users className="mx-auto h-4 w-4 text-rose-300" />
                  <p className="mt-1 text-sm font-black text-white">12</p>
                  <p className="text-[10px] text-slate-400">نمطاً سلوكياً</p>
                </div>
                <div className="rounded-xl border border-white/10 bg-black/30 px-2 py-2.5">
                  <Clock3 className="mx-auto h-4 w-4 text-rose-300" />
                  <p className="mt-1 text-sm font-black text-white">~3</p>
                  <p className="text-[10px] text-slate-400">دقائق</p>
                </div>
              </div>

              <ul className="mt-4 grid gap-2 text-[12px] text-slate-300">
                <li className="flex items-center gap-2"><Zap className="h-3.5 w-3.5 shrink-0 text-emerald-300" /> سلاحك الخفي + نمطك الاجتماعي + ثغرتك المظلمة</li>
                <li className="flex items-center gap-2"><LockOpen className="h-3.5 w-3.5 shrink-0 text-amber-300" /> خريطة التعافي والاتزان الكاملة بعد المشاركة</li>
              </ul>

              <button
                onClick={() => navigate("crime")}
                className="mt-5 flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-l from-rose-600 to-red-800 px-5 py-3.5 text-sm font-black text-white shadow-lg shadow-rose-950/50 transition hover:brightness-110 active:scale-[0.99]"
              >
                ادخل صفحة الاختبار وابدأ التحليل
                <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
              </button>
            </div>
          </article>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="mx-auto mt-10 max-w-6xl px-4">
        <div className="glass gold-border rounded-3xl p-6 sm:p-8">
          <h2 className="text-center font-display text-lg font-extrabold text-white sm:text-xl">كيف يعمل التحليل؟ <span className="text-gradient-gold">3 خطوات فقط</span></h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            {[
              { icon: ListChecks, color: "text-violet-300", bg: "bg-violet-500/15 border-violet-400/30", title: "1. أجب بصدق", desc: "8 أسئلة مركزة لكل اختبار، اختر أول إجابة تخطر ببالك دون تفكير طويل." },
              { icon: Brain, color: "text-amber-300", bg: "bg-amber-500/15 border-amber-400/30", title: "2. المعالجة الفورية", desc: "تُطابق إجاباتك مع المصفوفة النفسية لاستخراج نمطك الدقيق وتحليلك المفصّل." },
              { icon: Share2, color: "text-emerald-300", bg: "bg-emerald-500/15 border-emerald-400/30", title: "3. شارك وافتح التقرير", desc: "شارك الاختبار على فيسبوك لفك القفل والحصول على خريطة التعافي الكاملة." },
            ].map((s, i) => {
              const Icon = s.icon;
              return (
                <div key={i} className={`anim-fade-up rounded-2xl border ${s.bg} p-5 text-center`} style={{ animationDelay: `${i * 0.1}s` }}>
                  <span className="mx-auto grid h-12 w-12 place-items-center rounded-2xl bg-black/40">
                    <Icon className={`h-6 w-6 ${s.color}`} />
                  </span>
                  <h3 className="mt-3 text-sm font-black text-white">{s.title}</h3>
                  <p className="mt-1.5 text-[12px] leading-6 text-slate-300">{s.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}

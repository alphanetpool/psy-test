import {
  ArrowRight,
  BadgeCheck,
  Brain,
  CheckCircle2,
  ChevronLeft,
  Copy,
  Eye,
  Fingerprint,
  Home,
  ListChecks,
  Lock,
  LockOpen,
  Map as MapIcon,
  PartyPopper,
  RotateCcw,
  Share2,
  ShieldCheck,
  Sparkles,
  Timer,
} from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { crimeProfile, CRIME_PROCESSING, CRIME_QUESTIONS } from "../data/crime";
import { personalityProfile, PERSONALITY_PROCESSING, PERSONALITY_QUESTIONS } from "../data/personality";
import type { Route } from "../hooks/hooks";
import { cn } from "../utils/cn";
import { CounterBadge } from "./CounterBadge";

type Phase = "welcome" | "quiz" | "processing" | "result";
type LockState = "locked" | "followup" | "unlocked";

interface Result {
  title: string;
  analysis: string;
  m1: string;
  m2: string;
  m3: string;
  steps: string[];
}

interface QuizPageProps {
  testId: "personality" | "crime";
  navigate: (r: Route) => void;
}

const DIRECT_AD_LINK = "https://omg10.com/4/11749860";

export function QuizPage({ testId, navigate }: QuizPageProps) {
  const isPersonality = testId === "personality";

  const config = useMemo(() => {
    if (isPersonality) {
      return {
        pageNo: "الصفحة 01",
        badge: "اختبار النمط النفسي العميق",
        heroTitle: "اختبار النمط النفسي العميق: كشف الستار عن خبايا شخصيتك",
        heroDesc: "استبيان تحليلي مبني على مقاييس السلوك والحدس البشري.. 8 أسئلة دقيقة لتحديد فئتك ونمطك النفسي الخفي من بين 16 نمطاً بدقة عالية.",
        counterLabel: "تحليلاً نفسياً هذا الأسبوع",
        processing: PERSONALITY_PROCESSING,
        total: PERSONALITY_QUESTIONS.length,
        icon: Brain,
        gradient: "from-violet-600 to-indigo-700",
        softBg: "bg-violet-500/15",
        softBorder: "border-violet-400/30",
        softText: "text-violet-200",
        btnGradient: "from-violet-600 to-indigo-600",
        glow: "shadow-violet-900/40",
        other: { id: "crime" as Route, label: "جرّب أيضاً: تحليل العقلية الإجرامية", icon: Fingerprint },
      };
    }
    return {
      pageNo: "الصفحة 02",
      badge: "تحليل العقلية الإجرامية والنفسية الخفية",
      heroTitle: "تحليل العقلية الإجرامية والنفسية الخفية",
      heroDesc: "8 أسئلة متسلسلة لتحليل استجابتك للسلطة، الإغراء، الانتقام، والحدود الأخلاقية، ثم استخراج نمطك السلوكي والنفسي من بين 12 نمطاً.",
      counterLabel: "تحليلاً جنائياً هذا الأسبوع",
      processing: CRIME_PROCESSING,
      total: CRIME_QUESTIONS.length,
      icon: Fingerprint,
      gradient: "from-rose-600 to-red-800",
      softBg: "bg-rose-500/15",
      softBorder: "border-rose-400/30",
      softText: "text-rose-200",
      btnGradient: "from-rose-600 to-red-700",
      glow: "shadow-rose-950/50",
      other: { id: "personality" as Route, label: "جرّب أيضاً: اختبار النمط النفسي العميق", icon: Brain },
    };
  }, [isPersonality]);

  const Icon = config.icon;

  const [phase, setPhase] = useState<Phase>("welcome");
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [majorCount, setMajorCount] = useState<Record<string, number>>({ A: 0, B: 0, C: 0, D: 0 });
  const [secondarySeq, setSecondarySeq] = useState<number[]>([]);
  const [scoreAcc, setScoreAcc] = useState(0);
  const [processingIdx, setProcessingIdx] = useState(0);
  const [result, setResult] = useState<Result | null>(null);
  const [lock, setLock] = useState<LockState>("locked");
  const [copied, setCopied] = useState(false);
  const [tagFired, setTagFired] = useState(false);

  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => {
    return () => {
      timers.current.forEach(clearTimeout);
    };
  }, []);

  // reset when switching test
  useEffect(() => {
    setPhase("welcome");
    setCurrentIdx(0);
    setSelected(null);
    setMajorCount({ A: 0, B: 0, C: 0, D: 0 });
    setSecondarySeq([]);
    setScoreAcc(0);
    setProcessingIdx(0);
    setResult(null);
    setLock("locked");
    setTagFired(false);
  }, [testId]);

  const questions = isPersonality ? PERSONALITY_QUESTIONS : CRIME_QUESTIONS;
  const pct = Math.round((currentIdx / questions.length) * 100);

  const start = () => {
    setCurrentIdx(0);
    setSelected(null);
    setMajorCount({ A: 0, B: 0, C: 0, D: 0 });
    setSecondarySeq([]);
    setScoreAcc(0);
    setProcessingIdx(0);
    setResult(null);
    setLock("locked");
    setTagFired(false);
    setPhase("quiz");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSelect = (optIdx: number) => {
    if (selected !== null) return;
    setSelected(optIdx);

    timers.current.push(
      setTimeout(() => {
        if (isPersonality) {
          const chosen = PERSONALITY_QUESTIONS[currentIdx].o[optIdx];
          let nextMajor = majorCount;
          let nextSeq = secondarySeq;
          if (chosen.m) {
            nextMajor = { ...majorCount, [chosen.m]: (majorCount[chosen.m] || 0) + 1 };
            setMajorCount(nextMajor);
          }
          if (chosen.s) {
            nextSeq = [...secondarySeq, chosen.s];
            setSecondarySeq(nextSeq);
          }
          if (currentIdx < PERSONALITY_QUESTIONS.length - 1) {
            setCurrentIdx(currentIdx + 1);
            setSelected(null);
          } else {
            finishQuiz(nextMajor, nextSeq, 0);
          }
        } else {
          const nextScore = scoreAcc + (optIdx + 1);
          setScoreAcc(nextScore);
          if (currentIdx < CRIME_QUESTIONS.length - 1) {
            setCurrentIdx(currentIdx + 1);
            setSelected(null);
          } else {
            finishQuiz(majorCount, secondarySeq, nextScore);
          }
        }
      }, 320)
    );
  };

  const finishQuiz = (majors: Record<string, number>, seq: number[], score: number) => {
    setSelected(null);
    setPhase("processing");
    setProcessingIdx(0);
    window.scrollTo({ top: 0, behavior: "smooth" });

    const msgs = config.processing;
    msgs.forEach((_, i) => {
      if (i === 0) return;
      timers.current.push(setTimeout(() => setProcessingIdx(i), i * 1100));
    });
    timers.current.push(
      setTimeout(() => {
        let res: Result;
        if (isPersonality) {
          let dominant = "A";
          let maxC = -1;
          (["A", "B", "C", "D"] as const).forEach((k) => {
            if ((majors[k] || 0) > maxC) {
              maxC = majors[k] || 0;
              dominant = k;
            }
          });
          const sec = seq.length ? seq[seq.length - 1] : 1;
          const profile = personalityProfile(`${dominant}${sec}`);
          res = { title: profile.title, analysis: profile.analysis, m1: profile.strength, m2: profile.social, m3: profile.dark, steps: profile.steps };
        } else {
          const profile = crimeProfile(score);
          res = { title: `النمط المستخرج: ${profile.t}`, analysis: profile.a, m1: profile.s1, m2: profile.s2, m3: profile.s3, steps: profile.r };
        }
        setResult(res);
        setPhase("result");
        window.scrollTo({ top: 0, behavior: "smooth" });
      }, msgs.length * 1100 + 400)
    );
  };

  const shareUrl = typeof window !== "undefined" ? window.location.href : "";

  const handleShare = () => {
    const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;
    window.open(url, "_blank", "width=600,height=540");
    timers.current.push(setTimeout(() => setLock("followup"), 1200));
  };

  const handleWhatsapp = () => {
    const text = `🧠 جرّبت ${config.badge} وكانت النتيجة صادمة! جرّبه أنت أيضاً: ${shareUrl}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, "_blank");
    timers.current.push(setTimeout(() => setLock("followup"), 1200));
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      timers.current.push(setTimeout(() => setLock("followup"), 900));
    } catch {
      setCopied(false);
    }
  };

  // النقرة الأولى تفتح Direct Link والإعلانات، والنقرة الثانية تظهر التقرير النهائى
  const handleFollowup = () => {
    if (!tagFired) {
      setTagFired(true);
      window.open(DIRECT_AD_LINK, "_blank");
      return;
    }
    setLock("unlocked");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const restart = () => {
    setPhase("welcome");
    setCurrentIdx(0);
    setSelected(null);
    setMajorCount({ A: 0, B: 0, C: 0, D: 0 });
    setSecondarySeq([]);
    setScoreAcc(0);
    setProcessingIdx(0);
    setResult(null);
    setLock("locked");
    setTagFired(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const OtherIcon = config.other.icon;

  return (
    <div className="mx-auto w-full max-w-4xl px-4">
      {/* breadcrumb */}
      <div className="anim-fade-in flex flex-wrap items-center gap-2 pt-6 text-[12px]">
        <button onClick={() => navigate("home")} className="flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 font-bold text-slate-300 transition hover:border-amber-500/40 hover:text-amber-200">
          <Home className="h-3.5 w-3.5" /> الرئيسية
        </button>
        <ChevronLeft className="h-3.5 w-3.5 text-slate-500" />
        <span className={cn("flex items-center gap-1.5 rounded-full border px-3 py-1.5 font-black", config.softBorder, config.softBg, config.softText)}>
          <Icon className="h-3.5 w-3.5" /> {config.badge}
        </span>
      </div>

      {/* ================= WELCOME ================= */}
      {phase === "welcome" && (
        <div className="anim-fade-up pb-4 pt-5">
          <div className="relative overflow-hidden rounded-3xl border border-amber-500/25 bg-gradient-to-b from-[#161e2e] to-[#0d1322] p-6 text-center sm:p-10">
            <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-amber-500/10 blur-[90px]" />
            <div className="pointer-events-none absolute -left-20 bottom-0 h-56 w-56 rounded-full bg-violet-600/15 blur-[90px]" />

            <div className="relative">
              <p className="text-[11px] font-black tracking-widest text-amber-300">{config.pageNo} — صفحة مستقلة</p>
              <div className={cn("mx-auto mt-4 grid h-20 w-20 place-items-center rounded-3xl bg-gradient-to-br shadow-xl", config.gradient, config.glow)} style={{ animation: "floaty 4s ease-in-out infinite" }}>
                <Icon className="h-10 w-10 text-white" />
              </div>
              <h1 className="mx-auto mt-5 max-w-2xl font-display text-xl font-black leading-10 text-white sm:text-3xl sm:leading-[3.2rem]">
                {config.heroTitle}
              </h1>
              <p className="mx-auto mt-3 max-w-2xl text-[13px] leading-8 text-slate-300 sm:text-[15px]">{config.heroDesc}</p>

              <div className="mt-5 flex justify-center">
                <CounterBadge kind={testId} label={config.counterLabel} />
              </div>

              <div className="mx-auto mt-6 grid max-w-2xl gap-2 text-right sm:grid-cols-3">
                {[
                  { icon: ListChecks, t: "8 أسئلة مركزة", d: "اختر أول ما يخطر ببالك" },
                  { icon: Timer, t: "3 دقائق فقط", d: "تحليل فوري بدون انتظار" },
                  { icon: ShieldCheck, t: "سري وآمن", d: "بدون تسجيل أو بيانات" },
                ].map((f, i) => {
                  const FIcon = f.icon;
                  return (
                    <div key={i} className="flex items-center gap-3 rounded-2xl border border-white/10 bg-black/30 p-3">
                      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-white/5">
                        <FIcon className="h-5 w-5 text-amber-300" />
                      </span>
                      <span>
                        <span className="block text-[13px] font-black text-white">{f.t}</span>
                        <span className="block text-[11px] text-slate-400">{f.d}</span>
                      </span>
                    </div>
                  );
                })}
              </div>

              <button
                onClick={start}
                className="mx-auto mt-6 flex w-full max-w-md items-center justify-center gap-2 rounded-2xl bg-gradient-to-l from-emerald-600 to-emerald-500 px-6 py-4 text-base font-black text-white shadow-lg shadow-emerald-950/50 transition hover:brightness-110 active:scale-[0.99]"
              >
                <Sparkles className="h-5 w-5" />
                ابدأ التحليل النفسي الآن (مجاناً 🎯)
              </button>

              <button
                onClick={() => navigate(config.other.id)}
                className="mx-auto mt-3 flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-[12px] font-bold text-slate-300 transition hover:border-white/25 hover:text-white"
              >
                <OtherIcon className="h-4 w-4" />
                {config.other.label}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================= QUIZ ================= */}
      {phase === "quiz" && (
        <div className="anim-fade-in pb-4 pt-5">
          <div className="sticky top-[68px] z-20 rounded-2xl border border-white/10 bg-[#080c14]/90 p-3 shadow-xl backdrop-blur-xl">
            <div className="mb-2 flex items-center justify-between text-[12px] font-bold text-slate-200">
              <span>السؤال {currentIdx + 1} من {questions.length}</span>
              <span className="text-amber-300">{pct}%</span>
            </div>
            <div className="h-2.5 overflow-hidden rounded-full bg-slate-700/60">
              <div className="shimmer-bar h-full rounded-full transition-all duration-500" style={{ width: `${pct}%` }} />
            </div>
            <div className="mt-2.5 flex items-center gap-1.5">
              {questions.map((_, i) => (
                <span
                  key={i}
                  className={cn(
                    "h-1.5 flex-1 rounded-full transition-all",
                    i < currentIdx ? "bg-emerald-400" : i === currentIdx ? "bg-amber-400" : "bg-white/10"
                  )}
                />
              ))}
            </div>
          </div>

          <div key={currentIdx} className="anim-slide-in mt-4 overflow-hidden rounded-3xl border border-white/10 bg-[#161e2e]/80 backdrop-blur">
            <div className="border-b border-white/10 bg-black/30 px-5 py-4 sm:px-6">
              <p className="text-[11px] font-black text-amber-300">سؤال {currentIdx + 1}</p>
              <h2 className="mt-1 min-h-[3.5rem] text-base font-extrabold leading-8 text-white sm:text-lg sm:leading-9">
                {questions[currentIdx].q}
              </h2>
            </div>
            <div className="grid gap-2.5 p-4 sm:p-5">
              {questions[currentIdx].o.map((opt, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSelect(idx)}
                  disabled={selected !== null}
                  className={cn(
                    "opt-card anim-fade-up flex items-center gap-3 rounded-2xl border p-3.5 text-right text-[13px] font-bold leading-7 sm:text-sm",
                    selected === idx
                      ? "border-amber-500/70 bg-amber-500/15 text-amber-100 shadow-[0_0_24px_rgba(217,119,6,0.25)]"
                      : selected !== null
                        ? "border-white/5 bg-white/[0.02] text-slate-500"
                        : "border-white/10 bg-[#0d1424]/70 text-slate-100 hover:border-amber-500/40 hover:bg-[#1a2340]"
                  )}
                  style={{ animationDelay: `${idx * 0.06}s` }}
                >
                  <span
                    className={cn(
                      "grid h-8 w-8 shrink-0 place-items-center rounded-xl border text-[12px] font-black",
                      selected === idx ? "border-amber-400/60 bg-amber-500/25 text-amber-200" : "border-white/15 bg-black/40 text-slate-300"
                    )}
                  >
                    {selected === idx ? <CheckCircle2 className="h-4 w-4" /> : ["أ", "ب", "ج", "د"][idx]}
                  </span>
                  <span className="flex-1">{opt.t}</span>
                </button>
              ))}
            </div>
          </div>

          <p className="mt-3 text-center text-[11px] text-slate-500">💡 نصيحة: لا تفكر كثيراً — أول إجابة تخطر ببالك هي الأصدق عادة</p>
        </div>
      )}

      {/* ================= PROCESSING ================= */}
      {phase === "processing" && (
        <div className="anim-fade-in pb-4 pt-5">
          <div className="rounded-3xl border border-violet-400/25 bg-gradient-to-b from-[#161a33] to-[#0d1025] px-6 py-12 text-center sm:py-16">
            <div className="brain-pulse relative mx-auto grid h-24 w-24 place-items-center rounded-full border border-violet-300/40 bg-[radial-gradient(circle,#8b5cf6_0%,#312e81_78%)]">
              <Brain className="h-10 w-10 text-white" />
              <span className="absolute -inset-3 rounded-full border border-dashed border-violet-400/30" style={{ animation: "spinSlow 8s linear infinite" }} />
            </div>
            <h2 className="mt-6 font-display text-lg font-black text-white">جاري تحليل إجاباتك بعمق…</h2>
            <p className="anim-fade-in mt-2 min-h-[2rem] text-sm font-bold text-violet-200" key={processingIdx}>
              {config.processing[processingIdx]}
            </p>
            <div className="mx-auto mt-5 flex max-w-xs items-center justify-center gap-2">
              {config.processing.map((_, i) => (
                <span key={i} className={cn("h-2 flex-1 rounded-full transition-all duration-500", i <= processingIdx ? "bg-violet-400 shadow-[0_0_10px_rgba(139,92,246,0.7)]" : "bg-white/10")} />
              ))}
            </div>
            <div className="mx-auto mt-6 grid max-w-md gap-2 text-right text-[12px] text-slate-400">
              {["مطابقة الاستجابات مع المصفوفة النفسية", "قياس الحدس والتحكم والاتزان", "استخراج النمط الفرعي الخفي"].map((s, i) => (
                <div key={i} className={cn("flex items-center gap-2 rounded-xl border border-white/5 bg-black/30 px-3 py-2 transition-all", i <= processingIdx ? "opacity-100" : "opacity-40")}>
                  {i < processingIdx ? <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-400" /> : i === processingIdx ? <Eye className="h-4 w-4 shrink-0 animate-pulse text-amber-300" /> : <Lock className="h-4 w-4 shrink-0 text-slate-500" />}
                  {s}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ================= RESULT ================= */}
      {phase === "result" && result && (
        <div className="anim-fade-up pb-4 pt-5">
          <div className="overflow-hidden rounded-3xl border border-amber-500/30 bg-gradient-to-b from-[#1a2236] to-[#0e1424]">
            <div className="border-b border-white/10 bg-gradient-to-l from-amber-500/15 via-transparent to-violet-500/15 px-5 py-5 sm:px-7">
              <p className="flex items-center gap-1.5 text-[11px] font-black text-emerald-300">
                <BadgeCheck className="h-4 w-4" /> اكتمل التحليل بنجاح — نتيجتك جاهزة
              </p>
              <h2 className="mt-2 font-display text-lg font-black leading-9 text-white sm:text-2xl sm:leading-10">
                {result.title}
              </h2>
            </div>

            <div className="p-5 sm:p-7">
              <p className="rounded-2xl border border-white/10 bg-black/30 p-4 text-justify text-[13px] leading-8 text-slate-200 sm:text-sm">
                {result.analysis}
              </p>

              <div className="mt-4 grid gap-3 md:grid-cols-3">
                <div className="rounded-2xl border border-emerald-400/25 bg-emerald-500/[0.07] p-4">
                  <strong className="mb-2 block text-[14px] font-black text-emerald-300">🟢 السلاح الخفي</strong>
                  <span className="block text-justify text-[12px] leading-7 text-slate-300">{result.m1}</span>
                </div>
                <div className="rounded-2xl border border-sky-400/25 bg-sky-500/[0.07] p-4">
                  <strong className="mb-2 block text-[14px] font-black text-sky-300">🔵 النمط الاجتماعي</strong>
                  <span className="block text-justify text-[12px] leading-7 text-slate-300">{result.m2}</span>
                </div>
                <div className="rounded-2xl border border-amber-400/25 bg-amber-500/[0.07] p-4">
                  <strong className="mb-2 block text-[14px] font-black text-amber-300">
                    {isPersonality ? "🟡 نزيف الطاقة" : "🟡 الثغرة المظلمة / نزيف الطاقة"}
                  </strong>
                  <span className="block text-justify text-[12px] leading-7 text-slate-300">{result.m3}</span>
                </div>
              </div>

              {/* locked map */}
              <div className="relative mt-4 overflow-hidden rounded-2xl border border-white/10 bg-[#090e18]">
                <div className={cn("p-5 sm:p-6", lock === "unlocked" ? "blurred-unlock" : "blurred-lock")}>
                  <h4 className="flex items-center gap-2 text-[15px] font-black text-amber-200">
                    <MapIcon className="h-5 w-5" /> خريطة التعافي والاتزان
                  </h4>
                  <ul className="mt-3 grid gap-2.5">
                    {result.steps.map((s, i) => (
                      <li key={i} className="flex items-start gap-2.5 rounded-xl border border-white/5 bg-white/[0.03] p-3 text-[12px] leading-7 text-slate-200 sm:text-[13px]">
                        <span className="grid h-6 w-6 shrink-0 place-items-center rounded-lg bg-emerald-500/20 text-[11px] font-black text-emerald-300">{i + 1}</span>
                        {s}
                      </li>
                    ))}
                  </ul>

                  {lock === "unlocked" && (
                    <div className="anim-scale-in mt-5 rounded-2xl border border-emerald-400/30 bg-emerald-500/10 p-4 text-center">
                      <p className="flex items-center justify-center gap-2 text-sm font-black text-emerald-200">
                        <PartyPopper className="h-5 w-5" /> تم فتح تقريرك الكامل بنجاح!
                      </p>
                      <p className="mt-1 text-[12px] text-slate-300">احفظ هذه الصفحة أو شاركها مع أصدقائك ليكتشفوا أنماطهم أيضاً</p>
                      <div className="mt-3 flex flex-wrap items-center justify-center gap-2">
                        <button onClick={restart} className="flex items-center gap-1.5 rounded-xl border border-amber-500/40 bg-[#111623] px-4 py-2.5 text-[12px] font-black text-white transition hover:bg-[#1a2340]">
                          <RotateCcw className="h-4 w-4" /> إعادة الاختبار
                        </button>
                        <button onClick={() => navigate(config.other.id)} className="flex items-center gap-1.5 rounded-xl border border-white/15 bg-white/5 px-4 py-2.5 text-[12px] font-black text-white transition hover:bg-white/10">
                          <OtherIcon className="h-4 w-4" /> {config.other.label}
                        </button>
                        <button onClick={() => navigate("home")} className="flex items-center gap-1.5 rounded-xl border border-white/15 bg-white/5 px-4 py-2.5 text-[12px] font-black text-white transition hover:bg-white/10">
                          <Home className="h-4 w-4" /> الرئيسية
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                {lock === "locked" && (
                  <div className="anim-scale-in absolute inset-x-3 bottom-3 rounded-2xl border border-amber-500/40 bg-[#090c14]/95 p-4 shadow-2xl backdrop-blur sm:inset-x-5 sm:bottom-5 sm:p-5">
                    <h5 className="flex items-center gap-2 text-[13px] font-black leading-7 text-white sm:text-sm">
                      <Lock className="h-4 w-4 shrink-0 text-amber-300" />
                      النتيجة جاهزة! قم بمشاركة الاختبار على فيسبوك لفتح التقرير السيكولوجي الكامل لعقليتك
                    </h5>
                    <p className="mt-1 text-[12px] leading-6 text-slate-300">
                      اضغط مشاركة. بعد الرجوع من فيسبوك، اضغط متابعة ثم إكمال النتيجة.
                    </p>
                    <div className="mt-3 grid gap-2 sm:grid-cols-3">
                      <button
                        onClick={handleShare}
                        className="flex items-center justify-center gap-1.5 rounded-xl bg-gradient-to-l from-emerald-600 to-emerald-500 px-4 py-3 text-[13px] font-black text-white shadow transition hover:brightness-110 active:scale-[0.99]"
                      >
                        📘 مشاركة على فيسبوك لفك القفل
                      </button>
                      <button
                        onClick={handleWhatsapp}
                        className="flex items-center justify-center gap-1.5 rounded-xl border border-emerald-400/40 bg-emerald-500/10 px-4 py-3 text-[13px] font-black text-emerald-200 transition hover:bg-emerald-500/20 active:scale-[0.99]"
                      >
                        <Share2 className="h-4 w-4" /> واتساب
                      </button>
                      <button
                        onClick={handleCopy}
                        className="flex items-center justify-center gap-1.5 rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-[13px] font-black text-slate-200 transition hover:bg-white/10 active:scale-[0.99]"
                      >
                        <Copy className="h-4 w-4" /> {copied ? "تم النسخ ✓" : "نسخ الرابط"}
                      </button>
                    </div>
                  </div>
                )}

                {lock === "followup" && (
                  <div className="anim-scale-in absolute inset-x-3 bottom-3 rounded-2xl border border-emerald-400/40 bg-[#090c14]/95 p-4 shadow-2xl backdrop-blur sm:inset-x-5 sm:bottom-5 sm:p-5">
                    <h5 className="flex items-center gap-2 text-sm font-black text-white">
                      <CheckCircle2 className="h-5 w-5 text-emerald-400" /> تم رصد المشاركة بنجاح
                    </h5>
                    <p className="mt-1 text-[12px] leading-6 text-slate-300">
                      {tagFired
                        ? "✅ اضغط الزر مرة ثانية لإظهار الجزء النهائي والتقرير الكامل."
                        : "اضغط متابعة لتأكيد الإكمال، ثم اضغط مرة ثانية لإظهار الجزء النهائي."}
                    </p>
                    <button
                      onClick={handleFollowup}
                      className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-l from-emerald-600 to-emerald-500 px-4 py-3 text-sm font-black text-white shadow transition hover:brightness-110 active:scale-[0.99]"
                    >
                      <LockOpen className="h-4 w-4" />
                      {tagFired ? "إكمال النتيجة وفتح التقرير" : "متابعة"}
                    </button>
                  </div>
                )}
              </div>

              {lock !== "unlocked" && (
                <button onClick={() => navigate("home")} className="mx-auto mt-4 flex items-center gap-1.5 text-[12px] font-bold text-slate-400 transition hover:text-white">
                  <ArrowRight className="h-4 w-4" /> العودة للصفحة الرئيسية
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

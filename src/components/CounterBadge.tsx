import { Eye } from "lucide-react";
import { formatNum, useLiveCounter } from "../hooks/hooks";
import { cn } from "../utils/cn";

export function CounterBadge({ kind, label }: { kind: "personality" | "crime"; label: string }) {
  const { count, bump, floats } = useLiveCounter(kind);
  return (
    <div className="relative inline-flex max-w-full flex-wrap items-center justify-center gap-2 overflow-visible rounded-full border border-amber-500/30 bg-[#0e1523]/80 px-4 py-2 text-[13px] text-slate-200 shadow-[0_4px_18px_rgba(0,0,0,0.35)] sm:px-5 sm:text-sm">
      <span className="live-dot" />
      <Eye className="h-4 w-4 text-amber-300" />
      <span>
        تمت معالجة{" "}
        <strong className={cn("mx-1 inline-block text-base font-black text-amber-300 transition-all duration-200 sm:text-lg", bump && "count-bump")}>
          {formatNum(count)}
        </strong>
        {label}
      </span>
      {floats.map((f) => (
        <span key={f.id} className="inc-float">
          +{f.inc} جديد
        </span>
      ))}
    </div>
  );
}

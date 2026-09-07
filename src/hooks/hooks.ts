import { useCallback, useEffect, useRef, useState } from "react";

export type Route = "home" | "personality" | "crime";

export function parseHash(): Route {
  const h = window.location.hash.replace("#", "").replace("/", "").trim();
  if (h === "personality" || h === "crime") return h;
  return "home";
}

export function useHashRoute() {
  const [route, setRoute] = useState<Route>(() => (typeof window !== "undefined" ? parseHash() : "home"));

  useEffect(() => {
    const onChange = () => {
      setRoute(parseHash());
      window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
    };
    window.addEventListener("hashchange", onChange);
    return () => window.removeEventListener("hashchange", onChange);
  }, []);

  const navigate = useCallback((r: Route) => {
    const hash = r === "home" ? "#/" : `#/${r}`;
    if (window.location.hash === hash) {
      setRoute(r);
      window.scrollTo({ top: 0 });
    } else {
      window.location.hash = hash;
    }
  }, []);

  return { route, navigate };
}

export function formatNum(n: number): string {
  return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function baseCount(seed: number, mod: number, mult: number, phase: number): number {
  const now = Date.now();
  const baseMs = 1700000000000;
  const elapsedMinutes = Math.floor((now - baseMs) / (1000 * 60));
  const wave = Math.floor(Math.sin(now / 100000 + phase) * 15);
  return seed + ((elapsedMinutes % mod) * mult) + wave;
}

export function useLiveCounter(kind: "personality" | "crime") {
  const seed = kind === "personality" ? 184520 : 142890;
  const mult = kind === "personality" ? 3 : 2;
  const [count, setCount] = useState(() => baseCount(seed, 5000, mult, kind === "personality" ? 0 : 2));
  const [bump, setBump] = useState(false);
  const [floats, setFloats] = useState<{ id: number; inc: number }[]>([]);
  const idRef = useRef(0);

  useEffect(() => {
    let alive = true;
    let timer: ReturnType<typeof setTimeout>;

    const schedule = () => {
      const delay = Math.floor(Math.random() * 3000) + (kind === "personality" ? 3500 : 4000);
      timer = setTimeout(() => {
        if (!alive) return;
        const inc = Math.floor(Math.random() * 3) + 1;
        setCount((c) => c + inc);
        setBump(true);
        const id = ++idRef.current;
        setFloats((f) => [...f.slice(-2), { id, inc }]);
        setTimeout(() => {
          setFloats((f) => f.filter((x) => x.id !== id));
        }, 1200);
        setTimeout(() => setBump(false), 350);
        schedule();
      }, delay);
    };
    schedule();
    return () => {
      alive = false;
      clearTimeout(timer);
    };
  }, [kind]);

  return { count, bump, floats };
}

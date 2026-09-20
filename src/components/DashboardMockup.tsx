import { useMemo, type ComponentType } from "react";
import { cn } from "@/utils/cn";
import { LogoMark } from "./Logo";
import {
  ArrowUpRight,
  Bell,
  Box,
  CreditCard,
  Home,
  Search,
  Settings,
  Tag,
  User,
} from "./icons";

type NavItem = {
  icon: ComponentType<{ size?: number; strokeWidth?: number; className?: string }>;
  label: string;
  active?: boolean;
};

const SIDEBAR: NavItem[] = [
  { icon: Home, label: "Главная", active: true },
  { icon: CreditCard, label: "Платежи" },
  { icon: Box, label: "Товары" },
  { icon: Tag, label: "Промокоды" },
  { icon: Settings, label: "Настройки" },
];

const STATS = [
  { label: "Сегодня", value: "12 458 ₽", delta: "+32%" },
  { label: "Вчера", value: "8 902 ₽", delta: "+18%" },
  { label: "Всего", value: "342 781 ₽", delta: "+56%" },
];

const RECENT = [
  { name: "Steve_2010", item: "Привилегия VIP", amount: "+499 ₽", time: "2 мин" },
  { name: "Alexandra", item: "Набор ключей ×5", amount: "+249 ₽", time: "9 мин" },
  { name: "mrCreeper", item: "Привилегия Elite", amount: "+1 290 ₽", time: "27 мин" },
];

const SERIES = [
  0.22, 0.3, 0.26, 0.38, 0.34, 0.46, 0.42, 0.55, 0.5, 0.62, 0.58, 0.72, 0.68,
  0.84, 0.9,
];

const DAYS = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];

/** Catmull-Rom → cubic bezier smoothing */
function smoothPath(points: [number, number][]) {
  if (points.length < 2) return "";
  let d = `M ${points[0][0]} ${points[0][1]}`;
  for (let i = 0; i < points.length - 1; i++) {
    const p0 = points[i - 1] ?? points[i];
    const p1 = points[i];
    const p2 = points[i + 1];
    const p3 = points[i + 2] ?? p2;
    const c1x = p1[0] + (p2[0] - p0[0]) / 6;
    const c1y = p1[1] + (p2[1] - p0[1]) / 6;
    const c2x = p2[0] - (p3[0] - p1[0]) / 6;
    const c2y = p2[1] - (p3[1] - p1[1]) / 6;
    d += ` C ${c1x} ${c1y}, ${c2x} ${c2y}, ${p2[0]} ${p2[1]}`;
  }
  return d;
}

function RevenueChart() {
  const W = 600;
  const H = 170;
  const PAD_X = 6;
  const PAD_TOP = 18;
  const PAD_BOTTOM = 8;

  const { line, area, last } = useMemo(() => {
    const pts: [number, number][] = SERIES.map((v, i) => [
      PAD_X + (i / (SERIES.length - 1)) * (W - PAD_X * 2),
      PAD_TOP + (1 - v) * (H - PAD_TOP - PAD_BOTTOM),
    ]);
    const l = smoothPath(pts);
    const lastPt = pts[pts.length - 1];
    const a = `${l} L ${lastPt[0]} ${H} L ${pts[0][0]} ${H} Z`;
    return { line: l, area: a, last: lastPt };
  }, []);

  return (
    <div className="relative">
      <svg
        viewBox={`0 0 ${W} ${H}`}
        preserveAspectRatio="none"
        className="block h-[150px] w-full"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="chart-fill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#FFFFFF" stopOpacity="0.2" />
            <stop offset="1" stopColor="#FFFFFF" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="chart-stroke" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#FFFFFF" stopOpacity="0.45" />
            <stop offset="1" stopColor="#FFFFFF" stopOpacity="1" />
          </linearGradient>
        </defs>

        {[0.25, 0.5, 0.75, 1].map((t) => (
          <line
            key={t}
            x1={0}
            x2={W}
            y1={PAD_TOP + (1 - t) * (H - PAD_TOP - PAD_BOTTOM)}
            y2={PAD_TOP + (1 - t) * (H - PAD_TOP - PAD_BOTTOM)}
            stroke="rgba(255,255,255,0.07)"
            strokeDasharray="2 6"
            vectorEffect="non-scaling-stroke"
          />
        ))}

        <path d={area} fill="url(#chart-fill)" className="chart-area" />
        <path
          d={line}
          fill="none"
          stroke="url(#chart-stroke)"
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
          vectorEffect="non-scaling-stroke"
          pathLength={1}
          className="chart-line"
        />

        <line
          x1={last[0]}
          x2={last[0]}
          y1={last[1]}
          y2={H}
          stroke="rgba(255,255,255,0.18)"
          strokeDasharray="2 4"
          vectorEffect="non-scaling-stroke"
          className="chart-area"
        />
      </svg>

      {/* end-point marker + tooltip (HTML for crisp rendering) */}
      <div
        className="chart-area pointer-events-none absolute"
        style={{
          left: `${(last[0] / W) * 100}%`,
          top: `${(last[1] / H) * 100}%`,
          transform: "translate(-50%, -50%)",
        }}
      >
        <span className="absolute left-1/2 top-1/2 h-5 w-5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/15" />
        <span className="absolute left-1/2 top-1/2 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white shadow-[0_0_0_3px_rgba(17,19,24,0.9)]" />
        <div className="glass-dark-active absolute bottom-4 right-0 whitespace-nowrap rounded-xl px-3 py-1.5 text-[11.5px] font-medium text-white">
          12 458 ₽
        </div>
      </div>

      <div className="mt-2 flex justify-between px-1 text-[10.5px] font-medium text-white/35">
        {DAYS.map((d) => (
          <span key={d}>{d}</span>
        ))}
      </div>
    </div>
  );
}

export function DashboardMockup({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "relative w-full overflow-hidden rounded-[30px] text-white",
        className,
      )}
      style={{
        background:
          "linear-gradient(155deg, #1E2026 0%, #14161B 45%, #0E0F12 100%)",
        boxShadow:
          "inset 0 1px 0 rgba(255,255,255,0.14), inset 0 0 0 1px rgba(255,255,255,0.06), 0 70px 140px -50px rgba(17,19,24,0.55), 0 30px 60px -30px rgba(17,19,24,0.35), 0 0 0 1px rgba(17,19,24,0.35)",
      }}
      role="img"
      aria-label="Панель управления AVEON.DONATE: статистика доходов за сегодня, вчера и за всё время, график динамики доходов"
    >
      {/* glass sheen */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-20"
        style={{
          background:
            "linear-gradient(112deg, rgba(255,255,255,0.09) 0%, rgba(255,255,255,0.02) 28%, rgba(255,255,255,0) 45%), radial-gradient(700px 300px at 85% 110%, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0) 60%)",
        }}
      />

      {/* top bar */}
      <div className="relative z-10 flex h-14 items-center justify-between border-b border-white/[0.06] px-5">
        <div className="flex items-center gap-2.5">
          <LogoMark size={18} className="text-white" />
          <span className="text-[11px] font-medium uppercase tracking-[0.16em] text-white/85">
            Aveon.Donate
          </span>
        </div>
        <div className="flex items-center gap-2.5">
          <div className="glass-dark flex h-8 items-center gap-2 rounded-full pl-3 pr-2 text-[11.5px] text-white/50">
            <Search size={13} strokeWidth={1.7} />
            <span>Поиск</span>
            <span className="ml-3 rounded-md border border-white/10 px-1.5 py-0.5 text-[9.5px] text-white/40">
              ⌘K
            </span>
          </div>
          <span className="glass-dark relative flex h-8 w-8 items-center justify-center rounded-full text-white/70">
            <Bell size={14} strokeWidth={1.7} />
            <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-white" />
          </span>
          <span className="glass-dark-active flex h-8 w-8 items-center justify-center rounded-full text-white/80">
            <User size={14} strokeWidth={1.7} />
          </span>
        </div>
      </div>

      <div className="relative z-10 flex">
        {/* sidebar */}
        <aside className="flex w-[186px] shrink-0 flex-col border-r border-white/[0.06] p-3">
          <nav className="space-y-1">
            {SIDEBAR.map((item) => (
              <div
                key={item.label}
                className={cn(
                  "flex items-center gap-3 rounded-2xl px-3.5 py-2.5 text-[13px] font-medium transition-colors",
                  item.active
                    ? "glass-dark-active text-white"
                    : "text-white/50 hover:text-white/80",
                )}
              >
                <item.icon size={16} strokeWidth={1.6} />
                <span>{item.label}</span>
              </div>
            ))}
          </nav>

          <div className="mt-auto pt-6">
            <div className="glass-dark rounded-2xl p-3.5">
              <div className="flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white/60" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-white" />
                </span>
                <span className="text-[11.5px] font-medium text-white/85">
                  play.aveon.ru
                </span>
              </div>
              <p className="mt-1.5 text-[10.5px] text-white/40">
                1 248 игроков онлайн
              </p>
            </div>
          </div>
        </aside>

        {/* main */}
        <main className="min-w-0 flex-1 p-6">
          <div className="flex items-start justify-between">
            <div>
              <h4 className="text-[22px] font-medium tracking-[-0.02em]">Главная</h4>
              <p className="mt-0.5 text-[12px] text-white/45">
                Общая информация о вашем проекте
              </p>
            </div>
            <div className="glass-dark rounded-full px-3.5 py-1.5 text-[11.5px] text-white/60">
              Сегодня, 14 марта
            </div>
          </div>

          {/* stats */}
          <div className="mt-6 grid grid-cols-3 gap-3">
            {STATS.map((s) => (
              <div key={s.label} className="glass-dark rounded-[20px] p-4">
                <p className="text-[11.5px] font-medium text-white/50">{s.label}</p>
                <p className="mt-2 text-[22px] font-semibold leading-none tracking-[-0.03em] xl:text-[24px]">
                  {s.value}
                </p>
                <div className="mt-3 inline-flex items-center gap-1 rounded-full bg-white/[0.08] px-2 py-0.5 text-[10.5px] font-medium text-white/80">
                  <ArrowUpRight size={10} strokeWidth={2} />
                  {s.delta}
                </div>
              </div>
            ))}
          </div>

          {/* chart */}
          <div className="glass-dark mt-3 rounded-[20px] p-5">
            <div className="flex items-center justify-between">
              <p className="text-[13.5px] font-medium text-white/90">
                Динамика доходов
              </p>
              <div className="glass-dark flex items-center gap-0.5 rounded-full p-0.5">
                {["7 дней", "30 дней", "90 дней"].map((t, i) => (
                  <span
                    key={t}
                    className={cn(
                      "rounded-full px-2.5 py-1 text-[10.5px] font-medium",
                      i === 0 ? "bg-white text-ink" : "text-white/50",
                    )}
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
            <div className="mt-4">
              <RevenueChart />
            </div>
          </div>

          {/* recent */}
          <div className="mt-3 grid grid-cols-3 gap-3">
            {RECENT.map((r) => (
              <div
                key={r.name}
                className="glass-dark flex items-center gap-3 rounded-[18px] px-3.5 py-3"
              >
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/[0.08] text-[11px] font-semibold text-white/85">
                  {r.name.slice(0, 1).toUpperCase()}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-[12px] font-medium text-white/90">
                    {r.name}
                  </p>
                  <p className="truncate text-[10.5px] text-white/40">{r.item}</p>
                </div>
                <div className="text-right">
                  <p className="text-[12px] font-semibold text-white">{r.amount}</p>
                  <p className="text-[10px] text-white/35">{r.time}</p>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}

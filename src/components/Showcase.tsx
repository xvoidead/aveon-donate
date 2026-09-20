import dashboardBg from "@/assets/dashboard-bg.jpg";
import { DashboardMockup } from "./DashboardMockup";
import { Reveal } from "./Reveal";
import { ArrowRight, Check } from "./icons";

const POINTS = [
  "Удобный интерфейс",
  "Подробная статистика",
  "Управление товарами и категориями",
];

export function Showcase() {
  return (
    <section
      id="dashboard"
      className="relative overflow-hidden py-28 lg:py-36"
    >
      {/* backdrop */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <img
          src={dashboardBg}
          alt=""
          className="h-full w-full object-cover opacity-90"
          draggable={false}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, #F5F7FA 0%, rgba(245,247,250,0.35) 16%, rgba(245,247,250,0.15) 50%, rgba(245,247,250,0.5) 84%, #F5F7FA 100%)",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(90deg, rgba(245,247,250,0.2) 0%, rgba(245,247,250,0) 40%, rgba(245,247,250,0.35) 100%)",
          }}
        />
      </div>

      <div className="mx-auto max-w-[1360px] px-6 lg:px-10">
        <div className="grid grid-cols-12 items-center gap-y-16 lg:gap-x-6">
          {/* mockup */}
          <div className="col-span-12 lg:col-span-7">
            <Reveal className="relative">
              <div
                className="group relative lg:-ml-14 xl:-ml-24"
                style={{ perspective: 2200 }}
              >
                <div
                  className="w-full transition-transform duration-1000 [transition-timing-function:cubic-bezier(0.2,0.7,0.2,1)] [transform:rotateY(-10deg)_rotateX(4deg)_rotateZ(1deg)] lg:w-[640px] xl:w-[800px] 2xl:w-[840px] lg:group-hover:[transform:rotateY(-6deg)_rotateX(2deg)_rotateZ(0.5deg)]"
                  style={{ transformStyle: "preserve-3d" }}
                >
                  <DashboardMockup />
                </div>

                {/* floor shadow */}
                <div
                  aria-hidden="true"
                  className="absolute inset-x-12 -bottom-10 -z-10 h-24 rounded-full"
                  style={{
                    background:
                      "radial-gradient(ellipse at center, rgba(17,19,24,0.28) 0%, rgba(17,19,24,0) 70%)",
                    filter: "blur(24px)",
                  }}
                />
              </div>
            </Reveal>
          </div>

          {/* copy */}
          <div className="col-span-12 lg:col-span-5 lg:pl-8 xl:pl-14">
            <Reveal delay={120}>
              <p className="eyebrow">Удобная панель</p>
              <h2 className="display mt-6 text-[length:clamp(36px,3.9vw,56px)] text-ink">
                Полный контроль
                <br />
                в одном месте
              </h2>
              <p className="mt-7 max-w-[440px] text-[16.5px] leading-[1.65] text-muted text-pretty">
                Интуитивно понятная панель управления позволяет легко
                настраивать товары, отслеживать платежи и управлять своим
                магазином.
              </p>

              <ul className="mt-9 space-y-4">
                {POINTS.map((p) => (
                  <li key={p} className="flex items-center gap-3.5 text-[15px] text-ink/90">
                    <span className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-ink text-white shadow-[0_6px_14px_-6px_rgba(17,19,24,0.6)]">
                      <Check size={12} strokeWidth={2.25} />
                    </span>
                    {p}
                  </li>
                ))}
              </ul>

              <a
                href="#dashboard-app"
                className="glass-pill mt-11 inline-flex h-[52px] items-center gap-3 rounded-full pl-7 pr-5 text-[15px] font-medium text-ink"
              >
                Открыть демо
                <ArrowRight size={16} strokeWidth={1.75} className="text-ink/70" />
              </a>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

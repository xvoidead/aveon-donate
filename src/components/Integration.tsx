import { Reveal } from "./Reveal";
import { ArrowUpRight } from "./icons";
import { Blob, VoxelCube } from "./GlassShapes";

const STEPS = [
  {
    n: "01",
    title: "Создайте проект",
    text: "Зарегистрируйтесь и добавьте сервер в панели управления.",
  },
  {
    n: "02",
    title: "Установите плагин",
    text: "Скачайте AveonDonate.jar и положите его в папку plugins.",
  },
  {
    n: "03",
    title: "Принимайте платежи",
    text: "Товары выдаются автоматически сразу после оплаты.",
  },
];

const PLATFORMS = ["Spigot", "Paper", "Purpur", "Velocity", "BungeeCord", "Fabric"];

const TERMINAL: { kind: "cmd" | "log" | "ok" | "blank"; text: string }[] = [
  { kind: "cmd", text: "wget https://aveon.donate/plugin/AveonDonate.jar" },
  { kind: "cmd", text: "mv AveonDonate.jar plugins/" },
  { kind: "cmd", text: "/aveon connect 4821-XK2P" },
  { kind: "blank", text: "" },
  { kind: "log", text: "[AveonDonate] Подключение к панели…" },
  { kind: "log", text: "[AveonDonate] Проект #4821 · play.aveon.ru" },
  { kind: "ok", text: "[AveonDonate] Готово. Ожидание платежей" },
];

export function Integration() {
  return (
    <section id="docs" className="relative overflow-hidden py-28 lg:py-36">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <Blob
          style={{
            width: 700,
            height: 700,
            right: "-12%",
            top: "-20%",
            background:
              "radial-gradient(circle, rgba(255,255,255,1) 0%, rgba(255,255,255,0) 70%)",
          }}
        />
        <VoxelCube size={120} blur={6} opacity={0.5} style={{ left: "6%", bottom: "4%" }} />
      </div>

      <div className="mx-auto max-w-[1360px] px-6 lg:px-10">
        <div className="grid grid-cols-12 items-center gap-y-16 lg:gap-x-10">
          <div className="col-span-12 lg:col-span-5">
            <Reveal>
              <p className="eyebrow">Интеграция</p>
              <h2 className="display mt-6 text-[length:clamp(36px,3.9vw,56px)] text-ink">
                Подключение
                <br />
                за пять минут
              </h2>
              <p className="mt-7 max-w-[420px] text-[16.5px] leading-[1.65] text-muted text-pretty">
                Без договоров, настройки серверов и лишних шагов. Плагин
                берёт на себя всю работу с платежами и выдачей товаров.
              </p>
            </Reveal>

            <ol className="mt-12 space-y-8">
              {STEPS.map((s, i) => (
                <Reveal key={s.n} delay={100 + i * 90}>
                  <li className="flex gap-5">
                    <span className="glass-circle inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-[12px] font-semibold tracking-[0.04em] text-ink/80">
                      {s.n}
                    </span>
                    <div className="pt-1.5">
                      <h3 className="text-[17px] font-medium tracking-[-0.01em] text-ink">
                        {s.title}
                      </h3>
                      <p className="mt-1.5 max-w-[360px] text-[14.5px] leading-[1.6] text-muted">
                        {s.text}
                      </p>
                    </div>
                  </li>
                </Reveal>
              ))}
            </ol>

            <Reveal delay={400}>
              <a
                href="#contacts"
                className="mt-12 inline-flex items-center gap-2 text-[15px] font-medium text-ink transition-opacity hover:opacity-70"
              >
                Читать документацию
                <ArrowUpRight size={16} strokeWidth={1.75} />
              </a>
            </Reveal>
          </div>

          <div className="col-span-12 lg:col-span-7 lg:pl-6">
            <Reveal delay={160}>
              <div className="relative lg:ml-auto lg:max-w-[640px]">
                {/* soft light behind */}
                <div
                  aria-hidden="true"
                  className="absolute -inset-10 -z-10 rounded-[60px]"
                  style={{
                    background:
                      "radial-gradient(closest-side, rgba(255,255,255,0.9), rgba(255,255,255,0))",
                    filter: "blur(20px)",
                  }}
                />

                <div className="glass rounded-[32px] p-2">
                  <div
                    className="rounded-[26px] px-7 pb-8 pt-6 text-white"
                    style={{
                      background:
                        "linear-gradient(160deg, #1D1F25 0%, #121418 60%, #0E0F12 100%)",
                      boxShadow:
                        "inset 0 1px 0 rgba(255,255,255,0.12), inset 0 0 0 1px rgba(255,255,255,0.05)",
                    }}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
                        <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
                        <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
                      </div>
                      <span className="text-[11px] font-medium tracking-[0.08em] text-white/40">
                        server — console
                      </span>
                      <span className="w-12" />
                    </div>

                    <div className="mt-6 overflow-x-auto whitespace-nowrap font-mono text-[13px] leading-[1.9] no-scrollbar">
                      {TERMINAL.map((line, i) => {
                        if (line.kind === "blank") return <div key={i}>&nbsp;</div>;
                        if (line.kind === "cmd") {
                          return (
                            <div key={i} className="flex gap-3">
                              <span className="text-white/35">~ ▸</span>
                              <span className="text-white/90">{line.text}</span>
                            </div>
                          );
                        }
                        return (
                          <div key={i} className="flex gap-3">
                            <span className="text-white/35">&nbsp;&nbsp;&nbsp;</span>
                            <span
                              className={
                                line.kind === "ok" ? "text-white" : "text-white/55"
                              }
                            >
                              {line.text}
                              {line.kind === "ok" && (
                                <span className="ml-2 inline-flex h-4 w-4 -translate-y-px items-center justify-center rounded-full bg-white text-[9px] text-ink">
                                  ✓
                                </span>
                              )}
                            </span>
                          </div>
                        );
                      })}
                      <div className="mt-1 flex gap-3">
                        <span className="text-white/35">~ ▸</span>
                        <span className="inline-block h-[15px] w-[7px] translate-y-[3px] animate-pulse bg-white/70" />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 flex flex-wrap items-center gap-2">
                  {PLATFORMS.map((p) => (
                    <span
                      key={p}
                      className="glass-pill rounded-full px-4 py-1.5 text-[12.5px] font-medium text-ink/75"
                    >
                      {p}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

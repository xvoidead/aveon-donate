import { useCallback, useRef, type CSSProperties, type MouseEvent } from "react";
import heroFigure from "@/assets/hero-figure.jpg";
import { LogoMark } from "./Logo";
import { ArrowRight, Check, Cube, Sparkle } from "./icons";
import { Blob, GlassRing, VoxelCube } from "./GlassShapes";
import { useApp } from "@/context/AppContext";

const PERKS = ["Быстрая интеграция", "Поддержка 24/7", "Низкая комиссия"];

export function Hero() {
  const { user, setAuthOpen } = useApp();
  return (
    <section
      id="home"
      className="relative overflow-hidden pt-[164px] pb-24 lg:pb-32"
    >
      {/* ------- ambient background ------- */}
      <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden="true">
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(1200px 700px at 12% 0%, #FFFFFF 0%, rgba(255,255,255,0) 60%), radial-gradient(900px 600px at 88% 45%, #E9ECF1 0%, rgba(233,236,241,0) 65%), linear-gradient(180deg, #F7F8FB 0%, #F5F7FA 100%)",
          }}
        />
        <Blob
          className="animate-drift"
          style={{
            width: 640,
            height: 640,
            right: "-6%",
            top: "-8%",
            background:
              "radial-gradient(circle, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0) 70%)",
          }}
        />
        <Blob
          style={{
            width: 520,
            height: 520,
            left: "-10%",
            bottom: "-30%",
            background:
              "radial-gradient(circle, rgba(226,230,236,0.9) 0%, rgba(226,230,236,0) 70%)",
          }}
        />
        <GlassRing
          size={560}
          thickness={54}
          blur={10}
          className="opacity-70"
          style={{ right: "-10%", top: "38%" }}
        />
        <VoxelCube
          size={150}
          blur={7}
          opacity={0.55}
          style={{ left: "44%", top: "8%" }}
        />
        <VoxelCube
          size={90}
          blur={4}
          opacity={0.5}
          style={{ left: "58%", bottom: "6%" }}
        />
      </div>

      <div className="mx-auto max-w-[1360px] px-6 lg:px-10">
        <div className="grid grid-cols-12 items-center gap-y-16 lg:gap-x-8">
          {/* ------- copy ------- */}
          <div className="col-span-12 lg:col-span-6">
            <p className="eyebrow animate-fade-in opacity-0">
              Автодонат система для вашего проекта
            </p>

            <h1 className="display animate-fade-in ad-100 mt-7 text-[length:clamp(44px,5.3vw,76px)] text-ink opacity-0">
              Монетизируйте
              <br />
              свой сервер
              <br />
              без лишних забот
            </h1>

            <p className="animate-fade-in ad-200 mt-8 max-w-[470px] text-[17px] leading-[1.6] text-muted opacity-0 text-pretty">
              Aveon.Donate — современная автодонат система для
              Minecraft-серверов. Стабильные выплаты, гибкие настройки
              и&nbsp;минимальная комиссия.
            </p>

            <div className="animate-fade-in ad-300 mt-11 flex flex-wrap items-center gap-4 opacity-0">
              <button
                onClick={() => user ? (window.location.hash = "dashboard-app") : setAuthOpen(true)}
                className="btn-black inline-flex h-[54px] items-center gap-3 rounded-full pl-8 pr-6 text-[15px] font-medium"
              >
                Начать бесплатно
                <ArrowRight size={17} strokeWidth={1.75} />
              </button>
              <a
                href="#features"
                className="glass-pill inline-flex h-[54px] items-center rounded-full px-8 text-[15px] font-medium text-ink"
              >
                Узнать больше
              </a>
            </div>

            <div className="animate-fade-in ad-500 mt-12 flex flex-wrap items-center gap-x-4 gap-y-2 text-[13px] text-muted opacity-0">
              <span className="glass-circle inline-flex h-7 w-7 items-center justify-center rounded-full text-ink/70">
                <Sparkle size={13} strokeWidth={1.6} />
              </span>
              {PERKS.map((perk, i) => (
                <span key={perk} className="inline-flex items-center gap-4">
                  {i > 0 && (
                    <span
                      aria-hidden="true"
                      className="h-1 w-1 rounded-full bg-ink/30"
                    />
                  )}
                  <span>{perk}</span>
                </span>
              ))}
            </div>
          </div>

          {/* ------- visual ------- */}
          <div className="col-span-12 lg:col-span-6">
            <HeroVisual />
          </div>
        </div>
      </div>
    </section>
  );
}

function HeroVisual() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const raf = useRef<number | null>(null);

  const onMove = useCallback((e: MouseEvent<HTMLDivElement>) => {
    const el = wrapRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const mx = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
    const my = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    if (raf.current) cancelAnimationFrame(raf.current);
    raf.current = requestAnimationFrame(() => {
      el.style.setProperty("--mx", mx.toFixed(3));
      el.style.setProperty("--my", my.toFixed(3));
    });
  }, []);

  const onLeave = useCallback(() => {
    const el = wrapRef.current;
    if (!el) return;
    el.style.setProperty("--mx", "0");
    el.style.setProperty("--my", "0");
  }, []);

  return (
    <div
      ref={wrapRef}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className="animate-fade-in ad-300 relative mx-auto h-[560px] w-full max-w-[720px] opacity-0 lg:h-[640px] lg:-mr-10 xl:-mr-16"
      style={{ "--mx": 0, "--my": 0 } as CSSProperties}
    >
      {/* soft light behind the figure */}
      <div
        aria-hidden="true"
        className="absolute left-1/2 top-1/2 h-[80%] w-[80%] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0) 68%)",
          filter: "blur(30px)",
        }}
      />

      {/* 3D figure */}
      <img
        src={heroFigure}
        alt="Минималистичная 3D-фигура персонажа Minecraft в потоке жидкого стекла"
        draggable={false}
        className="absolute inset-0 h-full w-full select-none object-contain will-change-transform"
        style={{
          WebkitMaskImage:
            "radial-gradient(ellipse 50% 64% at 52% 50%, #000 40%, rgba(0,0,0,0) 82%)",
          maskImage:
            "radial-gradient(ellipse 50% 64% at 52% 50%, #000 40%, rgba(0,0,0,0) 82%)",
          transform:
            "translate3d(calc(var(--mx) * -10px), calc(var(--my) * -8px), 0) scale(1.06)",
          transition: "transform 0.9s cubic-bezier(0.2,0.7,0.2,1)",
        }}
      />

      {/* floating glass notification */}
      <div
        className="absolute left-0 top-[27%] will-change-transform sm:left-[2%] lg:left-[-4%]"
        style={{
          transform:
            "translate3d(calc(var(--mx) * 16px), calc(var(--my) * 12px), 0)",
          transition: "transform 0.9s cubic-bezier(0.2,0.7,0.2,1)",
        }}
      >
        <div className="animate-float-slow">
          <div style={{ perspective: 1400 }}>
            <div
              className="relative"
              style={{
                transform:
                  "rotateY(calc(-14deg + var(--mx) * 5deg)) rotateX(calc(7deg - var(--my) * 5deg)) rotateZ(-4deg)",
                transition: "transform 0.9s cubic-bezier(0.2,0.7,0.2,1)",
              }}
            >
              <div className="glass w-[300px] rounded-[30px] p-7 sm:w-[324px]">
                <LogoMark size={22} className="text-ink" />

                <p className="mt-7 text-[16px] font-medium tracking-[-0.01em] text-ink/85">
                  Платёж получен
                </p>
                <p className="mt-1.5 text-[44px] font-semibold leading-none tracking-[-0.035em] text-ink">
                  + 499 ₽
                </p>

                <div className="my-6 h-px bg-ink/[0.07]" />

                <div className="flex items-center gap-3">
                  <span className="glass-circle inline-flex h-9 w-9 items-center justify-center rounded-full text-ink/75">
                    <Cube size={16} strokeWidth={1.6} />
                  </span>
                  <span className="text-[13.5px] font-medium text-muted">
                    Покупка привилегии
                  </span>
                </div>
              </div>

              {/* check button */}
              <div className="absolute -right-6 -top-6">
                <div className="animate-float">
                  <button
                    type="button"
                    aria-label="Платёж подтверждён"
                    className="glass-circle inline-flex h-[68px] w-[68px] items-center justify-center rounded-full text-ink/70 transition-transform duration-500 hover:scale-[1.04]"
                  >
                    <Check size={26} strokeWidth={1.75} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

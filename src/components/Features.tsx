import type { ComponentType } from "react";
import { Reveal } from "./Reveal";
import { Bolt, Percent, Shield, Sliders } from "./icons";
import { VoxelCube } from "./GlassShapes";

type Feature = {
  icon: ComponentType<{ size?: number; strokeWidth?: number; className?: string }>;
  title: string;
  text: string;
};

const FEATURES: Feature[] = [
  {
    icon: Bolt,
    title: "Мгновенные выплаты",
    text: "Средства поступают на ваш счёт в течение нескольких секунд.",
  },
  {
    icon: Shield,
    title: "Надёжная защита",
    text: "Современные технологии и защита от фрода.",
  },
  {
    icon: Sliders,
    title: "Гибкие настройки",
    text: "Полный контроль над товарами, ценами и привилегиями.",
  },
  {
    icon: Percent,
    title: "Низкая комиссия",
    text: "Всего 3% с платежа — одна из самых выгодных комиссий на рынке.",
  },
];

export function Features() {
  return (
    <section id="features" className="relative overflow-hidden py-16 lg:py-24">
      {/* grey band */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "linear-gradient(180deg, #F5F7FA 0%, #EDF0F4 18%, #EBEEF3 82%, #F5F7FA 100%)",
        }}
      >
        <div
          className="absolute inset-x-0 top-0 h-px"
          style={{
            background:
              "linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.9) 50%, rgba(255,255,255,0) 100%)",
          }}
        />
        <VoxelCube
          size={220}
          blur={14}
          opacity={0.45}
          style={{ left: "-4%", top: "-10%" }}
        />
        <VoxelCube
          size={140}
          blur={10}
          opacity={0.4}
          style={{ right: "3%", bottom: "-18%" }}
        />
      </div>

      <div className="mx-auto max-w-[1360px] px-6 lg:px-10">
        <Reveal className="flex flex-wrap items-end justify-between gap-x-10 gap-y-6">
          <div>
            <p className="eyebrow">Возможности</p>
            <h2 className="display mt-6 text-[length:clamp(36px,3.9vw,56px)] text-ink">
              Всё, что нужно
              <br />
              для продаж
            </h2>
          </div>
          <p className="max-w-[400px] text-[16.5px] leading-[1.65] text-muted text-pretty">
            Приём платежей, выдача товаров и выплаты работают автоматически,
            пока вы занимаетесь сервером.
          </p>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {FEATURES.map((f, i) => (
            <Reveal key={f.title} delay={i * 90}>
              <article className="glass group h-full rounded-[32px] p-8 transition-transform duration-700 [transition-timing-function:cubic-bezier(0.2,0.7,0.2,1)] hover:-translate-y-1">
                <span className="glass-circle inline-flex h-14 w-14 items-center justify-center rounded-full text-ink/80 transition-transform duration-700 group-hover:scale-105">
                  <f.icon size={22} strokeWidth={1.5} />
                </span>
                <h3 className="mt-9 text-[19px] font-medium tracking-[-0.015em] text-ink">
                  {f.title}
                </h3>
                <p className="mt-3 max-w-[240px] text-[14.5px] leading-[1.6] text-muted text-pretty">
                  {f.text}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

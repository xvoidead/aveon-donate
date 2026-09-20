import cubes from "@/assets/cubes.jpg";
import { Logo } from "./Logo";
import { Reveal } from "./Reveal";
import { ArrowRight, Mail, Send } from "./icons";
import { Blob } from "./GlassShapes";

const COLUMNS: { title: string; links: { label: string; href: string }[] }[] = [
  {
    title: "Продукт",
    links: [
      { label: "Возможности", href: "#features" },
      { label: "Панель управления", href: "#dashboard" },
      { label: "Демо-магазин", href: "#server-demo" },
      { label: "Обновления", href: "#docs" },
    ],
  },
  {
    title: "Ресурсы",
    links: [
      { label: "Документация", href: "#docs" },
      { label: "API и вебхуки", href: "#docs" },
      { label: "Статус сервисов", href: "#contacts" },
      { label: "Партнёрам", href: "#contacts" },
    ],
  },
];

export function Footer() {
  return (
    <footer id="contacts" className="relative overflow-hidden pt-16 lg:pt-24">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <Blob
          style={{
            width: 800,
            height: 600,
            left: "50%",
            top: "-10%",
            transform: "translateX(-50%)",
            background:
              "radial-gradient(circle, rgba(255,255,255,1) 0%, rgba(255,255,255,0) 70%)",
          }}
        />
      </div>

      <div className="mx-auto max-w-[1360px] px-6 lg:px-10">
        {/* CTA */}
        <Reveal>
          <div className="glass relative overflow-hidden rounded-[40px]">
            <div className="grid grid-cols-12 items-center">
              <div className="col-span-12 p-10 lg:col-span-7 lg:p-16">
                <p className="eyebrow">Начните сегодня</p>
                <h2 className="display mt-6 text-[length:clamp(34px,3.6vw,52px)] text-ink">
                  Готовы монетизировать
                  <br />
                  свой сервер?
                </h2>
                <p className="mt-6 max-w-[440px] text-[16.5px] leading-[1.65] text-muted text-pretty">
                  Подключите Aveon.Donate за пять минут и сразу запустите
                  продажи на&nbsp;своём сервере.
                </p>
                <div className="mt-10 flex flex-wrap items-center gap-4">
                  <a
                    href="#dashboard-app"
                    className="btn-black inline-flex h-[54px] items-center gap-3 rounded-full pl-8 pr-6 text-[15px] font-medium"
                  >
                    Начать бесплатно
                    <ArrowRight size={17} strokeWidth={1.75} />
                  </a>
                  <a
                    href="https://t.me/aveon_support"
                    target="_blank"
                    rel="noreferrer"
                    className="glass-pill inline-flex h-[54px] items-center gap-2.5 rounded-full px-7 text-[15px] font-medium text-ink"
                  >
                    <Send size={16} strokeWidth={1.6} className="text-ink/70" />
                    Написать в Telegram
                  </a>
                </div>
              </div>

              <div className="relative col-span-12 hidden h-[420px] lg:col-span-5 lg:block">
                <img
                  src={cubes}
                  alt="Белые воксельные кубы и стеклянный куб"
                  draggable={false}
                  className="absolute inset-0 h-full w-full select-none object-cover"
                  style={{
                    WebkitMaskImage:
                      "radial-gradient(ellipse 70% 75% at 55% 50%, #000 40%, rgba(0,0,0,0) 85%)",
                    maskImage:
                      "radial-gradient(ellipse 70% 75% at 55% 50%, #000 40%, rgba(0,0,0,0) 85%)",
                  }}
                />
              </div>
            </div>
          </div>
        </Reveal>

        {/* footer grid */}
        <div className="mt-24 grid grid-cols-12 gap-y-12 lg:mt-32">
          <div className="col-span-12 lg:col-span-5">
            <Logo />
            <p className="mt-6 max-w-[320px] text-[14.5px] leading-[1.65] text-muted text-pretty">
              Автодонат система для Minecraft-серверов. Стабильные выплаты,
              гибкие настройки и минимальная комиссия.
            </p>
          </div>

          {COLUMNS.map((col) => (
            <div key={col.title} className="col-span-6 sm:col-span-4 lg:col-span-2">
              <p className="text-[12px] font-medium uppercase tracking-[0.16em] text-ink/60">
                {col.title}
              </p>
              <ul className="mt-5 space-y-3">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <a
                      href={l.href}
                      className="text-[14.5px] text-muted transition-colors hover:text-ink"
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className="col-span-12 sm:col-span-4 lg:col-span-3">
            <p className="text-[12px] font-medium uppercase tracking-[0.16em] text-ink/60">
              Контакты
            </p>
            <ul className="mt-5 space-y-3">
              <li>
                <a
                  href="mailto:support@aveon.donate"
                  className="inline-flex items-center gap-2.5 text-[14.5px] text-muted transition-colors hover:text-ink"
                >
                  <Mail size={15} strokeWidth={1.6} />
                  support@aveon.donate
                </a>
              </li>
              <li>
                <a
                  href="https://t.me/aveon_support"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2.5 text-[14.5px] text-muted transition-colors hover:text-ink"
                >
                  <Send size={15} strokeWidth={1.6} />
                  @aveon_support
                </a>
              </li>
              <li className="text-[14.5px] text-muted">Поддержка 24/7</li>
            </ul>
          </div>
        </div>

        <div className="mt-16 border-t border-ink/[.07] py-10 text-[12px] leading-relaxed text-muted">
          <div className="grid items-center gap-8 md:grid-cols-[1fr_1px_1.2fr_1fr]">
            <div>ИП Калинин Александр Алексеевич<br/>ИНН 231248651907 · ОГРНИП 326237500184621</div>
            <div className="hidden h-12 bg-ink/10 md:block" />
            <div>AVEON DIGITAL SOLUTIONS<br/>Регистрационный номер 88377 · Российская Федерация</div>
            <div className="md:text-right">© 2026 AVEON.DONATE</div>
          </div>
        </div>
      </div>
    </footer>
  );
}

import { useState, type FormEvent } from "react";
import cubes from "@/assets/cubes.jpg";
import { useApp, type Product } from "@/context/AppContext";
import { LogoMark } from "./Logo";
import { ArrowRight, Check, Cube, Search, User } from "./icons";
import { cn } from "@/utils/cn";
import { Modal } from "./Modal";

export function ServerDemo() {
  const { products, addPayment } = useApp();
  const [category, setCategory] = useState("Все товары");
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<Product | null>(null);
  const [success, setSuccess] = useState<{ id: string; player: string } | null>(null);
  const categories = ["Все товары", ...Array.from(new Set(products.map((p) => p.category)))];
  const filtered = products.filter((p) => (category === "Все товары" || p.category === category) && p.name.toLowerCase().includes(query.toLowerCase()));

  const buy = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!selected) return;
    const player = String(new FormData(event.currentTarget).get("player"));
    const payment = addPayment(player, selected);
    setSelected(null);
    setSuccess({ id: payment.id, player });
  };

  return (
    <div className="min-h-screen bg-[#f4f5f7] text-ink">
      <header className="fixed inset-x-0 top-0 z-30 border-b border-white/70 bg-white/60 backdrop-blur-2xl">
        <div className="mx-auto flex h-[74px] max-w-[1320px] items-center justify-between px-6">
          <a href="#server-demo" className="flex items-center gap-3"><span className="flex h-10 w-10 items-center justify-center rounded-xl bg-ink text-white"><Cube size={19}/></span><div><p className="text-[14px] font-semibold tracking-[.08em]">AVEON NETWORK</p><p className="text-[11px] text-muted">Minecraft 1.21</p></div></a>
          <nav className="hidden items-center gap-8 text-[13px] text-muted md:flex"><a className="text-ink" href="#store">Магазин</a><a href="#about">О сервере</a><a href="#rules">Правила</a></nav>
          <a href="#dashboard-app" className="glass-pill flex h-10 items-center gap-2 rounded-full px-4 text-[12px] font-medium"><User size={14}/>Личный кабинет</a>
        </div>
      </header>

      <main>
        <section className="relative overflow-hidden pb-24 pt-[160px]">
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_75%_35%,white_0%,transparent_45%),linear-gradient(180deg,#eef0f4,#f7f8fa)]"/>
          <div className="mx-auto grid max-w-[1320px] grid-cols-12 items-center px-6">
            <div className="col-span-12 lg:col-span-7"><p className="eyebrow">Выживание нового поколения</p><h1 className="display mt-6 text-[length:clamp(48px,6vw,86px)]">Создай свою<br/>историю.</h1><p className="mt-7 max-w-lg text-[17px] leading-relaxed text-muted">Уютный Minecraft-сервер без вайпов и привата. Уникальный мир, экономика игроков и честная игра.</p><div className="mt-10 flex flex-wrap gap-3"><button onClick={()=>navigator.clipboard?.writeText("play.aveon.ru")} className="btn-black flex h-14 items-center gap-3 rounded-full px-7 text-[14px]">play.aveon.ru <span className="text-white/45">·</span> Скопировать</button><a href="#store" className="glass-pill flex h-14 items-center rounded-full px-7 text-[14px] font-medium">Открыть магазин</a></div><div className="mt-9 flex items-center gap-3 text-[12px] text-muted"><span className="relative flex h-2 w-2"><span className="absolute h-full w-full animate-ping rounded-full bg-ink/30"/><span className="relative h-2 w-2 rounded-full bg-ink"/></span><b className="font-medium text-ink">1 248</b> игроков сейчас онлайн</div></div>
            <div className="relative col-span-12 hidden h-[510px] lg:col-span-5 lg:block"><img src={cubes} alt="Воксельный мир Aveon Network" className="absolute inset-0 h-full w-full object-cover mix-blend-multiply" style={{maskImage:"radial-gradient(ellipse,black 40%,transparent 75%)"}}/></div>
          </div>
        </section>

        <section id="store" className="mx-auto max-w-[1320px] scroll-mt-24 px-6 py-24">
          <div className="flex flex-wrap items-end justify-between gap-5"><div><p className="eyebrow">Магазин</p><h2 className="display mt-5 text-[44px]">Поддержите сервер</h2><p className="mt-3 text-sm text-muted">Покупка выдаётся автоматически в течение нескольких секунд.</p></div><label className="glass-pill flex h-12 w-64 items-center rounded-full px-4"><Search size={16} className="text-muted"/><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Найти товар" className="min-w-0 flex-1 bg-transparent px-3 text-[13px] outline-none"/></label></div>
          <div className="mt-10 flex gap-2 overflow-x-auto pb-2">{categories.map(c=><button key={c} onClick={()=>setCategory(c)} className={cn("whitespace-nowrap rounded-full px-5 py-2.5 text-[12.5px] font-medium transition",category===c?"bg-ink text-white":"glass-pill text-ink")}>{c}</button>)}</div>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">{filtered.map(p=><article key={p.id} className="glass group flex min-h-[330px] flex-col rounded-[30px] p-6 transition duration-700 hover:-translate-y-1"><div className="flex items-start justify-between"><span className="glass-circle flex h-14 w-14 items-center justify-center rounded-2xl"><LogoMark size={26}/></span>{p.popular&&<span className="rounded-full bg-ink px-3 py-1 text-[11px] uppercase tracking-[.08em] text-white">Популярное</span>}</div><p className="mt-8 text-[11px] uppercase tracking-[.12em] text-muted">{p.category}</p><h3 className="mt-2 text-[22px] font-medium">{p.name}</h3><p className="mt-2 text-[12.5px] leading-relaxed text-muted">{p.description}</p><div className="mt-auto flex items-center justify-between pt-7"><b className="text-[23px] font-semibold">{p.price} ₽</b><button onClick={()=>setSelected(p)} className="btn-black flex h-10 items-center gap-2 rounded-full px-4 text-[12px]">Купить <ArrowRight size={13}/></button></div></article>)}</div>
        </section>

        <section id="about" className="bg-ink py-24 text-white"><div className="mx-auto grid max-w-[1320px] grid-cols-1 gap-12 px-6 md:grid-cols-3"><div><p className="text-[46px] font-medium tracking-[-.04em]">4 года</p><p className="mt-2 text-sm text-white/45">создаём уютное сообщество</p></div><div><p className="text-[46px] font-medium tracking-[-.04em]">86 000+</p><p className="mt-2 text-sm text-white/45">уникальных игроков</p></div><div><p className="text-[46px] font-medium tracking-[-.04em]">99,98%</p><p className="mt-2 text-sm text-white/45">стабильность сервера</p></div></div></section>
      </main>

      <footer className="bg-[#090b0f] px-6 py-12 text-white/40"><div className="mx-auto flex max-w-[1320px] flex-col justify-between gap-6 border-t border-white/[.08] pt-9 text-[12px] sm:flex-row"><span>© 2026 Aveon Network</span><a href="#home" className="hover:text-white">Работает на AVEON.DONATE</a></div></footer>

      {selected && <Modal onClose={()=>setSelected(null)} label={`Покупка ${selected.name}`}><p className="eyebrow">Оформление покупки</p><h3 className="mt-5 text-[28px] font-medium">{selected.name}</h3><p className="mt-2 text-sm text-muted">{selected.description}</p><form onSubmit={buy} className="mt-7"><label className="text-[12px] font-medium">Никнейм игрока<input required name="player" pattern="[A-Za-z0-9_]{3,16}" placeholder="Steve" className="mt-2 h-12 w-full rounded-2xl border border-ink/10 bg-white/60 px-4 text-sm outline-none focus:border-ink/30"/></label><div className="mt-7 flex items-center justify-between"><b className="text-[25px]">{selected.price} ₽</b><button className="btn-black h-12 rounded-full px-6 text-[13px]">Оплатить картой</button></div><p className="mt-5 text-[12px] leading-relaxed text-muted">Демонстрационный платёж. Денежные средства не списываются.</p></form></Modal>}
      {success && <Modal onClose={()=>setSuccess(null)} label="Покупка оплачена" className="max-w-sm rounded-[34px] p-9 text-center"><span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-ink text-white"><Check size={27}/></span><h3 className="mt-6 text-[26px] font-medium">Покупка оплачена</h3><p className="mt-3 text-sm leading-relaxed text-muted">Товар выдан игроку <b className="font-medium text-ink">{success.player}</b>. Платёж {success.id} появился в панели.</p><button onClick={()=>setSuccess(null)} className="glass-pill mt-7 h-11 rounded-full px-6 text-sm">Продолжить</button></Modal>}
    </div>
  );
}
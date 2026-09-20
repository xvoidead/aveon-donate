import {
  useEffect,
  useRef,
  useState,
  type FormEvent,
  type InputHTMLAttributes,
  type ReactNode,
} from "react";
import { useApp, type AccountSettings, type GraphType, type StoreTemplate, type Wallet } from "@/context/AppContext";
import { cn } from "@/utils/cn";
import { Logo } from "./Logo";
import {
  ArrowRight,
  ArrowUpRight,
  Bell,
  Box,
  Check,
  Chevron,
  CreditCard,
  Home,
  Plus,
  Settings,
  Shield,
  User,
} from "./icons";

type Tab = "home" | "finance" | "stores" | "settings";
type Period = "14 дней" | "Месяц" | "Год" | "Всё время";

const navigation = [
  { id: "home" as Tab, label: "Главная", icon: Home },
  { id: "finance" as Tab, label: "Финансы", icon: CreditCard },
  { id: "stores" as Tab, label: "Магазины", icon: Box },
  { id: "settings" as Tab, label: "Настройки", icon: Settings },
];

const periodData: Record<Period, { values: number[]; labels: string[]; total: number }> = {
  "14 дней": {
    values: [38, 52, 44, 66, 58, 74, 63, 89, 78, 102, 94, 118, 112, 136],
    labels: ["1 мар", "4 мар", "7 мар", "10 мар", "14 мар"],
    total: 78_284,
  },
  "Месяц": {
    values: [34, 48, 42, 61, 58, 77, 72, 64, 82, 96, 87, 111, 93, 124, 118, 140],
    labels: ["1 фев", "8 фев", "15 фев", "22 фев", "1 мар"],
    total: 162_620,
  },
  "Год": {
    values: [28, 38, 47, 44, 62, 72, 66, 81, 91, 101, 97, 124],
    labels: ["Мар", "Май", "Июл", "Сен", "Мар"],
    total: 1_238_604,
  },
  "Всё время": {
    values: [16, 24, 31, 46, 43, 59, 70, 67, 83, 96, 116, 139, 148, 170],
    labels: ["2022", "2023", "2024", "2025", "2026"],
    total: 2_942_787,
  },
};

const templateInfo: Record<StoreTemplate, { title: string; url: string; background: string; accent: string; copy: string }> = {
  funtime: {
    title: "FunTime",
    url: "funtime.me",
    background: "linear-gradient(140deg, #0F1118 0%, #1A1E29 53%, #D4672C 180%)",
    accent: "#F17D3D",
    copy: "Динамичный магазин с выразительной игровой подачей.",
  },
  reallyworld: {
    title: "ReallyWorld",
    url: "reallyworld.ru",
    background: "linear-gradient(145deg, #090B11 0%, #121C35 58%, #365B9A 160%)",
    accent: "#74A8FF",
    copy: "Тёмный технологичный шаблон для серверных сетей.",
  },
  holyworld: {
    title: "HolyWorld",
    url: "holyworld.ru",
    background: "linear-gradient(140deg, #161411 0%, #2D2519 55%, #9D763C 165%)",
    accent: "#E5BD76",
    copy: "Атмосферная витрина с премиальной игровой эстетикой.",
  },
};

const incomeEvents = [
  { amount: 499, player: "Steve_2010", product: "Premium" },
  { amount: 990, player: "FoxLord", product: "Legend" },
  { amount: 249, player: "Alexandra", product: "5 ключей" },
];

export function DashboardPage() {
  const { user, setAuthOpen, logout } = useApp();
  const [tab, setTab] = useState<Tab>("home");
  const [profileOpen, setProfileOpen] = useState(false);

  if (!user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f1f3f6] p-6">
        <div className="glass max-w-md rounded-[32px] p-10 text-center">
          <h1 className="text-2xl font-medium tracking-tight">Войдите в аккаунт</h1>
          <p className="mt-3 text-sm leading-relaxed text-muted">Личный кабинет доступен после авторизации.</p>
          <button onClick={() => setAuthOpen(true)} className="btn-black mt-7 h-12 rounded-full px-7 text-sm">Войти</button>
          <a href="#home" className="ml-4 text-sm text-muted hover:text-ink">На главную</a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#eff1f4] text-ink">
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-[248px] flex-col border-r border-ink/[.06] bg-white/65 p-4 backdrop-blur-2xl lg:flex">
        <Logo className="px-3 py-4" textClassName="text-[12px]" />
        <p className="mt-8 px-3 text-[10px] font-medium uppercase tracking-[.15em] text-muted">Кабинет</p>
        <nav className="mt-3 space-y-1">
          {navigation.map((item) => (
            <button
              key={item.id}
              onClick={() => setTab(item.id)}
              className={cn(
                "flex w-full items-center gap-3 rounded-2xl px-3.5 py-3 text-[13px] font-medium transition",
                tab === item.id ? "bg-ink text-white shadow-lg shadow-ink/15" : "text-muted hover:bg-ink/[.045] hover:text-ink",
              )}
            >
              <item.icon size={17} />
              <span>{item.label}</span>
            </button>
          ))}
        </nav>
        <div className="mt-auto rounded-[22px] bg-ink p-4 text-white">
          <p className="text-[12px] font-medium">Нужна помощь?</p>
          <p className="mt-1 text-[11px] leading-relaxed text-white/50">Поддержка отвечает каждый день, 24/7.</p>
          <a href="mailto:support@aveon.donate" className="mt-4 inline-flex items-center gap-1.5 text-[11px] text-white/85 hover:text-white">Написать <ArrowUpRight size={12} /></a>
        </div>
      </aside>

      <div className="lg:pl-[248px]">
        <header className="sticky top-0 z-20 flex h-[76px] items-center justify-between border-b border-ink/[.055] bg-[#eff1f4]/80 px-5 backdrop-blur-2xl sm:px-8">
          <div>
            <p className="text-[10px] font-medium uppercase tracking-[.15em] text-muted">Aveon.Donate</p>
            <h1 className="mt-1 text-[18px] font-medium">{navigation.find((item) => item.id === tab)?.label}</h1>
          </div>
          <div className="flex items-center gap-2">
            <button aria-label="Уведомления" className="glass-circle flex h-10 w-10 items-center justify-center rounded-full"><Bell size={16} /></button>
            <div className="relative">
              <button onClick={() => setProfileOpen((current) => !current)} className="glass-pill flex h-10 items-center gap-2.5 rounded-full pl-2 pr-4 text-[12px] font-medium">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-ink text-white"><User size={13} /></span>
                {user.name.split(" ")[0]}
              </button>
              {profileOpen && (
                <div className="glass absolute right-0 top-12 w-56 rounded-2xl p-2 text-[13px]">
                  <div className="px-3 py-2"><p className="font-medium">{user.name}</p><p className="mt-1 truncate text-[11px] text-muted">{user.email}</p></div>
                  <button onClick={logout} className="mt-1 w-full rounded-xl px-3 py-2 text-left text-muted hover:bg-ink/[.05] hover:text-ink">Выйти из аккаунта</button>
                </div>
              )}
            </div>
          </div>
        </header>

        <main className="mx-auto max-w-[1280px] p-5 sm:p-8 lg:p-10">
          {tab === "home" && <HomeScreen />}
          {tab === "finance" && <FinanceScreen />}
          {tab === "stores" && <StoresScreen />}
          {tab === "settings" && <SettingsScreen />}
        </main>
      </div>
    </div>
  );
}

function HomeScreen() {
  const { settings, wallets, payments, stores } = useApp();
  const [period, setPeriod] = useState<Period>("14 дней");
  const [todayIncome, setTodayIncome] = useState(12_458);
  const [incoming, setIncoming] = useState<(typeof incomeEvents)[number] | null>(null);
  const [incomeVisible, setIncomeVisible] = useState(false);
  const eventIndex = useRef(0);

  useEffect(() => {
    const issue = () => {
      const event = incomeEvents[eventIndex.current % incomeEvents.length];
      eventIndex.current += 1;
      setIncoming(event);
      setIncomeVisible(true);
      setTodayIncome((current) => current + event.amount);
      window.setTimeout(() => setIncomeVisible(false), 4200);
    };
    const first = window.setTimeout(issue, 2000);
    const interval = window.setInterval(issue, 10_000);
    return () => { window.clearTimeout(first); window.clearInterval(interval); };
  }, []);

  const total = wallets.find((wallet) => wallet.currency === "RUB")?.balance ?? 0;
  const currentData = periodData[period];

  return (
    <section className="animate-fade-in">
      <div className="flex flex-wrap items-end justify-between gap-5">
        <div>
          <h2 className="text-[30px] font-medium tracking-[-.035em]">Добрый день, {settings.nickname}</h2>
          <p className="mt-2 text-sm text-muted">Доходы и состояние ваших магазинов.</p>
        </div>
        <a href="#server-demo" className="glass-pill flex h-11 items-center gap-2 rounded-full px-5 text-[13px] font-medium">Открыть демо-магазин <ArrowUpRight size={14} /></a>
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-3">
        <MetricCard label="Сегодня" value={todayIncome} suffix=" ₽" change="+32%" pulse={incomeVisible} />
        <MetricCard label="На счёте" value={Math.round(total)} suffix=" ₽" change="Доступно" />
        <MetricCard label="Магазины" value={stores.length} suffix="" change={stores.length ? "Активны" : "Создайте первый"} />
      </div>

      <div className="mt-4 grid gap-4 xl:grid-cols-[minmax(0,1.72fr)_minmax(300px,0.8fr)]">
        <div className="glass overflow-hidden rounded-[30px] p-6 sm:p-7">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div><h3 className="text-[17px] font-medium">Динамика дохода</h3><p className="mt-1 text-[11px] text-muted">{period === "14 дней" ? "Последние 14 дней" : period}</p></div>
            <PeriodSelect period={period} setPeriod={setPeriod} />
          </div>
          <div className="mt-5 flex items-end gap-3"><AnimatedNumber value={currentData.total} className="text-[28px] font-semibold tracking-[-.04em]" /><span className="pb-1 text-[14px] text-muted">₽</span><span className="mb-1 rounded-full bg-ink/[.055] px-2.5 py-1 text-[10.5px] font-medium">+18,4%</span></div>
          <RevenueGraph key={`${period}-${settings.graphType}-${settings.graphArea}`} data={currentData.values} labels={currentData.labels} type={settings.graphType} area={settings.graphArea} />
        </div>
        <div className="glass relative overflow-hidden rounded-[30px] p-6 sm:p-7">
          <div className="flex items-center justify-between"><h3 className="text-[17px] font-medium">Зачисления</h3><span className="relative flex h-2 w-2"><span className="absolute h-full w-full animate-ping rounded-full bg-ink/30"/><span className="relative h-2 w-2 rounded-full bg-ink"/></span></div>
          <p className="mt-1 text-[11px] text-muted">Обновляются в реальном времени</p>
          <div className="mt-6 space-y-4">
            {(incoming ? [incoming, ...incomeEvents.slice(0, 2)] : incomeEvents).slice(0, 3).map((item, index) => (
              <div key={`${item.player}-${index}`} className={cn("flex items-center gap-3 transition-all duration-700", incomeVisible && index === 0 && "-translate-y-1 rounded-2xl bg-white/70 p-2.5 shadow-[0_16px_30px_-24px_rgba(17,19,24,.5)]")}>
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-ink text-[12px] font-medium text-white">{item.player[0]}</span>
                <div className="min-w-0 flex-1"><p className="truncate text-[12.5px] font-medium">{item.player}</p><p className="truncate text-[10.5px] text-muted">{item.product}</p></div>
                <span className="text-[12.5px] font-semibold">+{item.amount} ₽</span>
              </div>
            ))}
          </div>
          {incomeVisible && incoming && <div className="animate-fade-in absolute bottom-5 right-5 rounded-full bg-ink px-4 py-2 text-[11px] font-medium text-white shadow-xl">+{incoming.amount} ₽ начислено</div>}
        </div>
      </div>

      <div className="glass mt-4 rounded-[28px] p-6 sm:p-7">
        <div className="flex items-center justify-between"><div><h3 className="text-[16px] font-medium">Последние продажи</h3><p className="mt-1 text-[11px] text-muted">Операции по всем магазинам</p></div><a href="#server-demo" className="text-[12px] text-muted hover:text-ink">Открыть демо <ArrowUpRight size={13} className="ml-1 inline" /></a></div>
        <div className="mt-5 grid gap-3 md:grid-cols-2 xl:grid-cols-4">{payments.slice(0, 4).map((payment) => <div key={payment.id} className="rounded-2xl bg-white/50 px-4 py-3.5"><p className="text-[12px] font-medium">{payment.player}</p><p className="mt-1 text-[10.5px] text-muted">{payment.product}</p><p className="mt-3 text-[13px] font-semibold">+{payment.amount} ₽</p></div>)}</div>
      </div>
    </section>
  );
}

function MetricCard({ label, value, suffix, change, pulse = false }: { label: string; value: number; suffix: string; change: string; pulse?: boolean }) {
  return <div className={cn("glass relative overflow-hidden rounded-[28px] p-6 transition-all duration-700", pulse && "shadow-[0_22px_45px_-28px_rgba(17,19,24,.35)]")}><p className="text-[12px] font-medium text-muted">{label}</p><div className="mt-4 flex items-end justify-between"><p className="text-[30px] font-semibold tracking-[-.04em]"><AnimatedNumber value={value} />{suffix}</p><span className="rounded-full bg-ink/[.055] px-2.5 py-1 text-[10.5px]">{change}</span></div>{pulse && <span className="absolute right-5 top-5 h-3 w-3 animate-ping rounded-full bg-ink/20"/>}</div>;
}

function AnimatedNumber({ value, className }: { value: number; className?: string }) {
  const [visible, setVisible] = useState(value);
  const previous = useRef(value);
  useEffect(() => {
    const from = previous.current;
    const delta = value - from;
    const started = performance.now();
    let frame = 0;
    const animate = (now: number) => {
      const progress = Math.min((now - started) / 800, 1);
      const eased = 1 - (1 - progress) ** 3;
      const next = Math.round(from + delta * eased);
      setVisible(next);
      if (progress < 1) frame = requestAnimationFrame(animate);
      else previous.current = value;
    };
    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [value]);
  return <span className={className}>{new Intl.NumberFormat("ru-RU").format(visible)}</span>;
}

function PeriodSelect({ period, setPeriod }: { period: Period; setPeriod: (period: Period) => void }) {
  const [open, setOpen] = useState(false);
  return <div className="relative"><button onClick={() => setOpen((current) => !current)} className="glass-pill flex items-center gap-2 rounded-full px-3.5 py-2 text-[11px] font-medium">{period}<Chevron size={13} className={cn("transition-transform", open && "rotate-90")}/></button>{open && <div className="glass absolute right-0 top-11 z-10 w-36 rounded-2xl p-1.5">{(Object.keys(periodData) as Period[]).map((option) => <button key={option} onClick={() => { setPeriod(option); setOpen(false); }} className={cn("block w-full rounded-xl px-3 py-2 text-left text-[11px]", option === period ? "bg-ink text-white" : "text-muted hover:bg-ink/[.05] hover:text-ink")}>{option}</button>)}</div>}</div>;
}

function RevenueGraph({ data, labels, type, area }: { data: number[]; labels: string[]; type: GraphType; area: boolean }) {
  const max = Math.max(...data) * 1.13;
  const points = data.map((value, index) => {
    const x = (index / Math.max(data.length - 1, 1)) * 700;
    const y = 195 - (value / max) * 170;
    return `${x},${y}`;
  }).join(" ");
  const areaPoints = `0,220 ${points} 700,220`;
  return <div className="mt-5"><svg viewBox="0 0 700 220" className="h-[240px] w-full" preserveAspectRatio="none">{[45, 95, 145, 195].map((y) => <line key={y} x1="0" x2="700" y1={y} y2={y} stroke="#111318" strokeOpacity=".07" strokeDasharray="3 7"/>)}{type === "line" ? <>{area && <polygon points={areaPoints} fill="url(#dashboard-area)" className="animate-fade-in"/>}<polyline points={points} fill="none" stroke="#111318" strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round" pathLength="1" className="animate-draw"/></> : <g>{data.map((value, index) => { const height = (value / max) * 170; const width = 700 / data.length - 9; const x = index * (700 / data.length) + 4.5; return <rect key={index} x={x} y={195 - height} width={width} height={height} rx="5" fill="#111318" opacity={0.82} className="animate-fade-in" style={{ animationDelay: `${index * 45}ms` }}/>; })}</g>}<defs><linearGradient id="dashboard-area" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#111318" stopOpacity=".18"/><stop offset="1" stopColor="#111318" stopOpacity="0"/></linearGradient></defs></svg><div className="mt-1 flex justify-between text-[10px] text-muted">{labels.map((label) => <span key={label}>{label}</span>)}</div></div>;
}

function FinanceScreen() {
  const { wallets, payments, settings } = useApp();
  const [selected, setSelected] = useState<Wallet | null>(null);
  const [withdrawn, setWithdrawn] = useState(false);
  return <PanelTitle title="Финансы" text="Счета, выплаты и история поступлений."><div className="mt-8 grid gap-4 lg:grid-cols-2">{wallets.map((wallet) => <WalletCard key={wallet.currency} wallet={wallet} onWithdraw={() => setSelected(wallet)} />)}</div><div className="glass mt-4 rounded-[30px] p-6 sm:p-7"><div className="flex flex-wrap items-center justify-between gap-3"><div><h3 className="text-[17px] font-medium">Последние поступления</h3><p className="mt-1 text-[11px] text-muted">Средства зачисляются автоматически после оплаты.</p></div><span className="rounded-full bg-ink/[.055] px-3 py-1.5 text-[11px]">Комиссия сервиса 3%</span></div><div className="mt-6 overflow-x-auto"><table className="w-full min-w-[620px] text-left"><thead className="border-b border-ink/[.06] text-[10px] uppercase tracking-[.12em] text-muted"><tr><th className="pb-3 font-medium">Операция</th><th className="pb-3 font-medium">Магазин</th><th className="pb-3 font-medium">Дата</th><th className="pb-3 text-right font-medium">Сумма</th></tr></thead><tbody>{payments.slice(0, 5).map((payment) => <tr key={payment.id} className="border-b border-ink/[.045] text-[12.5px]"><td className="py-4"><p className="font-medium">Продажа {payment.product}</p><p className="mt-1 text-[10.5px] text-muted">{payment.id} · {payment.player}</p></td><td className="py-4 text-muted">{settings.nickname || "Мой магазин"}</td><td className="py-4 text-muted">{payment.date}</td><td className="py-4 text-right font-semibold">+{formatMoney(payment.amount, "RUB")}</td></tr>)}</tbody></table></div></div>{selected && <WithdrawModal wallet={selected} close={() => setSelected(null)} complete={() => { setSelected(null); setWithdrawn(true); window.setTimeout(() => setWithdrawn(false), 3000); }} />}{withdrawn && <Toast>Заявка на выплату создана</Toast>}</PanelTitle>;
}

function WalletCard({ wallet, onWithdraw }: { wallet: Wallet; onWithdraw: () => void }) {
  const currency = wallet.currency === "RUB" ? "₽" : "€";
  const title = wallet.currency === "RUB" ? "Счёт в рублях" : "Счёт в евро";
  return <article className="relative overflow-hidden rounded-[30px] bg-ink p-7 text-white shadow-[0_30px_60px_-35px_rgba(17,19,24,.65)]"><div className="absolute right-[-12%] top-[-25%] h-48 w-48 rounded-full border-[24px] border-white/[.08]"/><div className="relative"><div className="flex items-center justify-between"><p className="text-[13px] font-medium text-white/65">{title}</p><span className="flex h-9 min-w-9 items-center justify-center rounded-full bg-white/10 px-2 text-[13px] font-medium">{currency}</span></div><p className="mt-10 text-[38px] font-semibold tracking-[-.05em]">{formatMoney(wallet.balance, wallet.currency)}</p><div className="mt-7 flex items-center justify-between border-t border-white/[.1] pt-5"><div><p className="text-[10px] uppercase tracking-[.12em] text-white/40">Ожидает</p><p className="mt-1 text-[13px] text-white/85">{formatMoney(wallet.pending, wallet.currency)}</p></div><button onClick={onWithdraw} className="rounded-full bg-white px-4 py-2 text-[11px] font-medium text-ink transition-transform hover:-translate-y-px">Вывести</button></div></div></article>;
}

function WithdrawModal({ wallet, close, complete }: { wallet: Wallet; close: () => void; complete: () => void }) {
  return <Modal title={`Вывод ${wallet.currency === "RUB" ? "рублей" : "евро"}`} close={close}><form onSubmit={(event) => { event.preventDefault(); complete(); }}><p className="text-sm leading-relaxed text-muted">Средства будут перечислены на указанные реквизиты после проверки заявки.</p><FormInput className="mt-5" name="amount" type="number" min="1" max={Math.floor(wallet.balance)} placeholder={`Сумма до ${formatMoney(wallet.balance, wallet.currency)}`} /><FormInput className="mt-3" name="details" placeholder={wallet.currency === "RUB" ? "Номер банковского счёта" : "IBAN"} /><button className="btn-black mt-5 h-12 w-full rounded-full text-sm">Создать заявку</button></form></Modal>;
}

function StoresScreen() {
  const { stores, createStore } = useApp();
  const [open, setOpen] = useState(false);
  const [created, setCreated] = useState<string | null>(null);
  return <PanelTitle title="Магазины" text="Создавайте витрины для своих Minecraft-проектов."><button onClick={() => setOpen(true)} className="btn-black absolute right-0 top-0 flex h-11 items-center gap-2 rounded-full px-5 text-[13px]"><Plus size={14} />Создать магазин</button>{stores.length === 0 ? <div className="glass mt-8 flex min-h-[350px] flex-col items-center justify-center rounded-[32px] px-6 text-center"><span className="glass-circle flex h-16 w-16 items-center justify-center rounded-3xl"><Box size={25}/></span><h3 className="mt-6 text-[22px] font-medium tracking-[-.025em]">Первый магазин ждёт вас</h3><p className="mt-2 max-w-sm text-sm leading-relaxed text-muted">Выберите шаблон, укажите адрес, и витрина будет готова к настройке.</p><button onClick={() => setOpen(true)} className="glass-pill mt-7 h-11 rounded-full px-5 text-[13px] font-medium">Выбрать шаблон</button></div> : <div className="mt-8 grid gap-4 md:grid-cols-2">{stores.map((store) => <StoreCard key={store.id} name={store.name} slug={store.slug} template={store.template} status={store.status} />)}</div>}{open && <CreateStoreModal close={() => setOpen(false)} create={(name, slug, template) => { const store = createStore({ name, slug, template }); setOpen(false); setCreated(store.name); window.setTimeout(() => setCreated(null), 3500); }} />}{created && <Toast>Магазин «{created}» опубликован</Toast>}</PanelTitle>;
}

function StoreCard({ name, slug, template, status }: { name: string; slug: string; template: StoreTemplate; status: string }) {
  const info = templateInfo[template];
  return <article className="glass overflow-hidden rounded-[30px]"><TemplatePreview template={template} compact/><div className="flex items-center justify-between p-6"><div><div className="flex items-center gap-2"><h3 className="text-[17px] font-medium">{name}</h3><span className="rounded-full bg-ink px-2 py-0.5 text-[9px] text-white">{status}</span></div><p className="mt-1 text-[11px] text-muted">{slug}.aveon.store · {info.url}</p></div><a href="#server-demo" className="glass-circle flex h-10 w-10 items-center justify-center rounded-full" aria-label="Открыть магазин"><ArrowUpRight size={15}/></a></div></article>;
}

function CreateStoreModal({ close, create }: { close: () => void; create: (name: string, slug: string, template: StoreTemplate) => void }) {
  const [template, setTemplate] = useState<StoreTemplate>("funtime");
  const submit = (event: FormEvent<HTMLFormElement>) => { event.preventDefault(); const form = new FormData(event.currentTarget); create(String(form.get("name")), String(form.get("slug")).toLowerCase().replace(/[^a-z0-9-]/g, ""), template); };
  return <Modal title="Новый магазин" close={close} wide><form onSubmit={submit}><p className="text-[13px] text-muted">Выберите дизайн витрины. Его можно заменить позже.</p><div className="mt-5 grid gap-3 sm:grid-cols-3">{(Object.keys(templateInfo) as StoreTemplate[]).map((key) => <button type="button" key={key} onClick={() => setTemplate(key)} className={cn("overflow-hidden rounded-2xl border-2 text-left transition", template === key ? "border-ink shadow-lg shadow-ink/10" : "border-transparent opacity-70 hover:opacity-100")}><TemplatePreview template={key}/><span className="block px-3 pb-3 pt-2 text-[12px] font-medium">{templateInfo[key].title}</span></button>)}</div><div className="mt-6 grid gap-3 sm:grid-cols-2"><FormInput name="name" placeholder="Название магазина" defaultValue="Мой сервер"/><div className="relative"><FormInput name="slug" pattern="[A-Za-z0-9-]+" placeholder="Адрес магазина" defaultValue="my-server"/><span className="pointer-events-none absolute right-4 top-3 text-[11px] text-muted">.aveon.store</span></div></div><button className="btn-black mt-6 flex h-12 w-full items-center justify-center gap-2 rounded-full text-sm">Создать магазин <ArrowRight size={15}/></button></form></Modal>;
}

function TemplatePreview({ template, compact = false }: { template: StoreTemplate; compact?: boolean }) {
  const info = templateInfo[template];
  return <div className={cn("relative overflow-hidden p-4 text-white", compact ? "h-32" : "h-28")} style={{ background: info.background }}><div className="absolute -right-4 -top-8 h-28 w-28 rounded-full border-[18px] border-white/10"/><div className="relative"><div className="flex items-center justify-between text-[7px] font-semibold tracking-[.1em]"><span>{info.title.toUpperCase()}</span><span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: info.accent }}/></div><div className={cn("mt-5", compact && "mt-7")}><p className="text-[13px] font-semibold">Магазин сервера</p><div className="mt-2 flex gap-1.5"><span className="h-5 w-12 rounded-md bg-white/20"/><span className="h-5 w-10 rounded-md bg-white/10"/></div></div></div></div>;
}

function SettingsScreen() {
  const { settings, saveSettings, changeEmail, changePassword, deleteAccount, logout, verifyAccount } = useApp();
  const [draft, setDraft] = useState<AccountSettings>(settings);
  const [saved, setSaved] = useState(false);
  const [saveError, setSaveError] = useState("");
  const [modal, setModal] = useState<"email" | "password" | "reset" | "delete" | "verify" | null>(null);
  useEffect(() => setDraft(settings), [settings]);
  const save = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const result = draft.email !== settings.email ? changeEmail(draft.email) : null;
    if (result) { setSaveError(result); return; }
    saveSettings(draft);
    setSaveError("");
    setSaved(true);
    window.setTimeout(() => setSaved(false), 2200);
  };

  return <PanelTitle title="Настройки" text="Личные данные и параметры отображения."><div className="mt-8 grid gap-4 xl:grid-cols-[minmax(0,1.3fr)_minmax(320px,.7fr)]"><form onSubmit={save} className="glass rounded-[30px] p-6 sm:p-7"><h3 className="text-[18px] font-medium">Основное</h3><div className="mt-6 grid gap-5 sm:grid-cols-2"><Field label="Никнейм"><FormInput value={draft.nickname} onChange={(event) => setDraft({ ...draft, nickname: event.target.value })}/></Field><Field label="Почта"><FormInput value={draft.email} type="email" onChange={(event) => setDraft({ ...draft, email: event.target.value })}/></Field></div><div className="mt-7"><p className="text-[12px] font-medium">Тип графика</p><div className="mt-3 flex gap-2"><button type="button" onClick={() => setDraft({ ...draft, graphType: "line" })} className={cn("rounded-full px-4 py-2 text-[12px] font-medium", draft.graphType === "line" ? "bg-ink text-white" : "bg-ink/[.055] text-muted hover:text-ink")}>Линия</button><button type="button" onClick={() => setDraft({ ...draft, graphType: "bar" })} className={cn("rounded-full px-4 py-2 text-[12px] font-medium", draft.graphType === "bar" ? "bg-ink text-white" : "bg-ink/[.055] text-muted hover:text-ink")}>Столбцы</button></div></div><div className="mt-7 flex items-center justify-between rounded-2xl bg-white/50 p-4"><div><p className="text-[13px] font-medium">Область</p><p className="mt-1 text-[11px] text-muted">Показывать заливку под графиком</p></div><Toggle active={draft.graphArea} setActive={(graphArea) => setDraft({ ...draft, graphArea })}/></div>{saveError && <p className="mt-4 text-[12px] text-ink">{saveError}</p>}<button className="btn-black mt-7 flex h-11 items-center gap-2 rounded-full px-6 text-[13px]">{saved ? <><Check size={14}/>Сохранено</> : "Сохранить"}</button></form>
        <div className="glass rounded-[30px] p-6 sm:p-7"><div className="flex items-start gap-3"><span className={cn("flex h-10 w-10 shrink-0 items-center justify-center rounded-full", settings.verified ? "bg-ink text-white" : "bg-ink/[.06] text-ink")}><Shield size={18}/></span><div><h3 className="text-[18px] font-medium">Безопасность</h3><p className="mt-1 text-[11px] text-muted">Защита аккаунта и выплаты</p></div></div><div className="mt-7 rounded-2xl bg-white/50 p-4"><p className="text-[13px] font-medium">Верификация</p><p className="mt-2 text-[11.5px] leading-relaxed text-muted">Для выплаты на счета в России вам требуется указать дополнительную информацию о себе.</p>{settings.verified ? <span className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-ink px-3 py-1.5 text-[10.5px] text-white"><Check size={12}/>Верификация пройдена</span> : <button onClick={() => setModal("verify")} className="glass-pill mt-4 h-9 rounded-full px-4 text-[11px] font-medium">Пройти верификацию</button>}</div></div></div>
      <div className="glass mt-4 rounded-[30px] p-6 sm:p-7"><h3 className="text-[18px] font-medium">Действия с аккаунтом</h3><div className="mt-5 divide-y divide-ink/[.06]">{[{key:"email",title:"Изменить почту",text:"Обновите адрес для входа и уведомлений."},{key:"password",title:"Изменить пароль",text:"Используйте уникальный пароль для защиты кабинета."},{key:"reset",title:"Сбросить пароль",text:"Получите инструкцию по сбросу на текущую почту."},{key:"delete",title:"Удалить аккаунт",text:"Все данные и магазины будут безвозвратно удалены."}].map((action) => <button key={action.key} onClick={() => setModal(action.key as typeof modal)} className="flex w-full items-center justify-between gap-5 py-4 text-left first:pt-0"><span><span className="block text-[13px] font-medium">{action.title}</span><span className="mt-1 block text-[11px] text-muted">{action.text}</span></span><Chevron size={16} className="shrink-0 text-muted"/></button>)}<button onClick={logout} className="flex w-full items-center justify-between py-4 pb-0 text-left"><span><span className="block text-[13px] font-medium">Выйти из аккаунта</span><span className="mt-1 block text-[11px] text-muted">Завершить текущую сессию на этом устройстве.</span></span><ArrowRight size={16} className="text-muted"/></button></div></div>
      {modal === "email" && <ChangeEmailModal close={() => setModal(null)} submit={changeEmail}/>} {modal === "password" && <ChangePasswordModal close={() => setModal(null)} submit={changePassword}/>} {modal === "reset" && <ResetModal close={() => setModal(null)} email={settings.email}/>} {modal === "delete" && <DeleteModal close={() => setModal(null)} remove={deleteAccount}/>} {modal === "verify" && <VerifyModal close={() => setModal(null)} verify={verifyAccount}/>} 
    </PanelTitle>;
}

function ChangeEmailModal({ close, submit }: { close: () => void; submit: (email: string) => string | null }) {
  const [error, setError] = useState("");
  return <Modal title="Изменить почту" close={close}><form onSubmit={(event) => { event.preventDefault(); const result = submit(String(new FormData(event.currentTarget).get("email"))); if (result) setError(result); else close(); }}><p className="text-sm text-muted">Новый адрес станет почтой для входа в кабинет.</p><FormInput className="mt-5" name="email" type="email" placeholder="new@example.ru"/>{error && <p className="mt-3 text-[12px] text-ink">{error}</p>}<button className="btn-black mt-5 h-12 w-full rounded-full text-sm">Сохранить почту</button></form></Modal>;
}

function ChangePasswordModal({ close, submit }: { close: () => void; submit: (currentPassword: string, newPassword: string) => string | null }) {
  const [error, setError] = useState("");
  return <Modal title="Изменить пароль" close={close}><form onSubmit={(event) => { event.preventDefault(); const data = new FormData(event.currentTarget); const result = submit(String(data.get("current")), String(data.get("next"))); if (result) setError(result); else close(); }}><FormInput name="current" type="password" placeholder="Текущий пароль"/><FormInput className="mt-3" name="next" type="password" minLength={6} placeholder="Новый пароль"/>{error && <p className="mt-3 text-[12px] text-ink">{error}</p>}<button className="btn-black mt-5 h-12 w-full rounded-full text-sm">Обновить пароль</button></form></Modal>;
}

function ResetModal({ close, email }: { close: () => void; email: string }) { return <Modal title="Сбросить пароль" close={close}><p className="text-sm leading-relaxed text-muted">Инструкция для сброса пароля отправлена на <b className="font-medium text-ink">{email}</b>.</p><button onClick={close} className="btn-black mt-6 h-11 w-full rounded-full text-sm">Понятно</button></Modal>; }
function DeleteModal({ close, remove }: { close: () => void; remove: () => void }) { const [value, setValue] = useState(""); return <Modal title="Удалить аккаунт" close={close}><p className="text-sm leading-relaxed text-muted">Это действие нельзя отменить. Для подтверждения введите <b className="font-medium text-ink">УДАЛИТЬ</b>.</p><FormInput className="mt-5" value={value} onChange={(event) => setValue(event.target.value)} placeholder="УДАЛИТЬ"/><button disabled={value !== "УДАЛИТЬ"} onClick={remove} className="mt-5 h-12 w-full rounded-full bg-ink text-sm text-white disabled:cursor-not-allowed disabled:opacity-30">Удалить аккаунт</button></Modal>; }
function VerifyModal({ close, verify }: { close: () => void; verify: () => void }) { return <Modal title="Верификация" close={close}><form onSubmit={(event) => { event.preventDefault(); verify(); close(); }}><p className="text-sm leading-relaxed text-muted">Укажите данные для подключения выплат на российские счета.</p><FormInput className="mt-5" name="name" placeholder="ФИО"/><FormInput className="mt-3" name="inn" pattern="[0-9]{10,12}" placeholder="ИНН"/><button className="btn-black mt-5 h-12 w-full rounded-full text-sm">Отправить на проверку</button></form></Modal>; }

function PanelTitle({ title, text, children }: { title: string; text: string; children: ReactNode }) { return <section className="relative animate-fade-in"><h2 className="text-[30px] font-medium tracking-[-.035em]">{title}</h2><p className="mt-2 text-sm text-muted">{text}</p>{children}</section>; }
function Modal({ title, close, children, wide = false }: { title: string; close: () => void; children: ReactNode; wide?: boolean }) { return <div className="fixed inset-0 z-[80] flex items-center justify-center p-5"><button className="absolute inset-0 bg-ink/25 backdrop-blur-xl" onClick={close} aria-label="Закрыть окно"/><div className={cn("glass relative max-h-[90vh] w-full overflow-y-auto rounded-[30px] p-7 shadow-[0_45px_100px_-35px_rgba(17,19,24,.45)]", wide ? "max-w-3xl" : "max-w-md")}><div className="mb-6 flex items-center justify-between"><h3 className="text-[22px] font-medium tracking-[-.025em]">{title}</h3><button onClick={close} className="flex h-8 w-8 items-center justify-center rounded-full text-xl text-muted hover:bg-ink/[.05]">×</button></div>{children}</div></div>; }
function FormInput({ className, ...props }: InputHTMLAttributes<HTMLInputElement>) { return <input required {...props} className={cn("h-11 w-full rounded-2xl border border-ink/[.08] bg-white/60 px-4 text-[13px] text-ink outline-none transition placeholder:text-muted/75 focus:border-ink/25 focus:ring-4 focus:ring-ink/[.04]", className)}/>; }
function Field({ label, children }: { label: string; children: ReactNode }) { return <label className="block text-[12px] font-medium text-ink"><span className="mb-2 block">{label}</span>{children}</label>; }
function Toggle({ active, setActive }: { active: boolean; setActive: (active: boolean) => void }) { return <button type="button" aria-pressed={active} onClick={() => setActive(!active)} className={cn("relative h-7 w-12 rounded-full transition", active ? "bg-ink" : "bg-ink/15")}><span className={cn("absolute top-1 h-5 w-5 rounded-full bg-white shadow-sm transition", active ? "left-6" : "left-1")}/></button>; }
function Toast({ children }: { children: ReactNode }) { return <div className="animate-fade-in fixed bottom-6 right-6 z-[90] rounded-full bg-ink px-5 py-3 text-[12px] font-medium text-white shadow-2xl">{children}</div>; }
function formatMoney(value: number, currency: Wallet["currency"]) { const amount = new Intl.NumberFormat("ru-RU", { minimumFractionDigits: currency === "EUR" ? 2 : value % 1 ? 2 : 0, maximumFractionDigits: 2 }).format(value); return currency === "RUB" ? `${amount} ₽` : `€${amount}`; }
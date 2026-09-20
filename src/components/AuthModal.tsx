import { useEffect, useState, type FormEvent, type InputHTMLAttributes } from "react";
import { useApp } from "@/context/AppContext";
import { LogoMark } from "./Logo";
import { ArrowRight } from "./icons";

export function AuthModal() {
  const { authOpen, setAuthOpen, login, register } = useApp();
  const [mode, setMode] = useState<"login" | "register">("login");
  const [error, setError] = useState("");

  useEffect(() => {
    if (!authOpen) return;
    const close = (event: KeyboardEvent) => event.key === "Escape" && setAuthOpen(false);
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", close);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", close);
    };
  }, [authOpen, setAuthOpen]);

  if (!authOpen) return null;

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = String(data.get("email") ?? "").trim();
    const password = String(data.get("password") ?? "");
    const result = mode === "login"
      ? login(email, password)
      : register(String(data.get("name") ?? "").trim(), email, password);
    setError(result ?? "");
    if (!result) window.location.hash = "dashboard-app";
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-5">
      <button
        className="absolute inset-0 bg-ink/25 backdrop-blur-xl"
        onClick={() => setAuthOpen(false)}
        aria-label="Закрыть окно авторизации"
      />
      <div className="glass relative w-full max-w-[430px] rounded-[36px] p-8 shadow-[0_50px_120px_-30px_rgba(17,19,24,.45)] sm:p-10">
        <button
          onClick={() => setAuthOpen(false)}
          className="absolute right-6 top-6 flex h-9 w-9 items-center justify-center rounded-full bg-ink/[.06] text-xl text-ink/55 transition-colors hover:bg-ink/10 hover:text-ink"
          aria-label="Закрыть"
        >
          ×
        </button>
        <LogoMark size={34} className="text-ink" />
        <h2 className="mt-7 text-[30px] font-medium tracking-[-.035em]">
          {mode === "login" ? "С возвращением" : "Создать аккаунт"}
        </h2>
        <p className="mt-2 text-[14px] leading-relaxed text-muted">
          {mode === "login"
            ? "Войдите в панель управления вашим сервером."
            : "Данные аккаунта сохранятся на этом устройстве."}
        </p>

        <form onSubmit={submit} className="mt-8 space-y-4">
          {mode === "register" && (
            <Field name="name" label="Ваше имя" placeholder="Александр" minLength={2} />
          )}
          <Field name="email" type="email" label="Электронная почта" placeholder="name@example.ru" />
          <Field name="password" type="password" label="Пароль" placeholder="Не менее 6 символов" minLength={6} />
          {error && <p className="rounded-2xl bg-ink/[.06] px-4 py-3 text-[13px] text-ink">{error}</p>}
          <button className="btn-black mt-2 flex h-[52px] w-full items-center justify-center gap-2 rounded-full text-[14px] font-medium">
            {mode === "login" ? "Войти" : "Зарегистрироваться"}
            <ArrowRight size={16} />
          </button>
        </form>

        <button
          onClick={() => { setMode(mode === "login" ? "register" : "login"); setError(""); }}
          className="mt-6 w-full text-center text-[13.5px] text-muted transition-colors hover:text-ink"
        >
          {mode === "login" ? "Нет аккаунта? Зарегистрироваться" : "Уже есть аккаунт? Войти"}
        </button>
      </div>
    </div>
  );
}

function Field({ label, ...props }: InputHTMLAttributes<HTMLInputElement> & { label: string }) {
  return (
    <label className="block">
      <span className="mb-2 block text-[12px] font-medium text-ink/65">{label}</span>
      <input
        required
        {...props}
        className="h-[50px] w-full rounded-2xl border border-ink/[.08] bg-white/55 px-4 text-[14px] text-ink outline-none transition focus:border-ink/25 focus:bg-white/80 focus:ring-4 focus:ring-ink/[.04]"
      />
    </label>
  );
}
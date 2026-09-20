import { useMemo } from "react";
import { cn } from "@/utils/cn";
import { Logo } from "./Logo";
import { ArrowRight } from "./icons";
import { useScrollSpy, useScrolled } from "@/hooks/useScrollSpy";
import { useApp } from "@/context/AppContext";

export const NAV = [
  { id: "home", label: "Главная" },
  { id: "features", label: "Возможности" },
  { id: "dashboard", label: "Панель" },
  { id: "docs", label: "Документация" },
  { id: "contacts", label: "Контакты" },
] as const;

export function Header() {
  const { user, setAuthOpen } = useApp();
  const ids = useMemo(() => NAV.map((n) => n.id), []);
  const active = useScrollSpy(ids);
  const scrolled = useScrolled(16);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-700",
        scrolled ? "py-3" : "py-5",
      )}
      style={{ transitionTimingFunction: "cubic-bezier(0.2,0.7,0.2,1)" }}
    >
      <div className="mx-auto max-w-[1360px] px-6 lg:px-10">
        <div
          className={cn(
            "relative grid h-14 grid-cols-[1fr_auto_1fr] items-center rounded-full px-2 transition-all duration-700",
            scrolled
              ? "glass-soft shadow-[0_18px_40px_-24px_rgba(17,19,24,0.18)]"
              : "border border-transparent bg-transparent",
          )}
          style={{ transitionTimingFunction: "cubic-bezier(0.2,0.7,0.2,1)" }}
        >
          <div className="flex items-center pl-3">
            <Logo />
          </div>

          <nav
            aria-label="Основная навигация"
            className="hidden items-center gap-9 lg:flex"
          >
            {NAV.map((item) => {
              const isActive = active === item.id;
              return (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  className={cn(
                    "relative py-2 text-[13.5px] font-medium tracking-[-0.005em] transition-colors duration-500",
                    isActive ? "text-ink" : "text-muted hover:text-ink",
                  )}
                  aria-current={isActive ? "page" : undefined}
                >
                  {item.label}
                  <span
                    aria-hidden="true"
                    className={cn(
                      "absolute inset-x-0 -bottom-0.5 mx-auto h-[1.5px] rounded-full bg-ink transition-all duration-500",
                      isActive ? "w-full opacity-100" : "w-0 opacity-0",
                    )}
                    style={{ transitionTimingFunction: "cubic-bezier(0.2,0.7,0.2,1)" }}
                  />
                </a>
              );
            })}
          </nav>

          <div className="flex items-center justify-end">
            <button
              onClick={() => user ? (window.location.hash = "dashboard-app") : setAuthOpen(true)}
              className="glass-pill inline-flex h-10 items-center gap-2 rounded-full pl-5 pr-4 text-[13.5px] font-medium text-ink"
            >
              {user ? "В кабинет" : "Войти"}
              <ArrowRight size={15} strokeWidth={1.75} className="text-ink/70" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}

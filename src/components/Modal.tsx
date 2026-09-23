import { useEffect, useRef, type ReactNode } from "react";
import { cn } from "@/utils/cn";
import { Close } from "./icons";

const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

type ModalProps = {
  onClose: () => void;
  label: string;
  children: ReactNode;
  className?: string;
};

/** Shared dialog shell: backdrop, Esc to close, scroll lock and a focus trap. */
export function Modal({ onClose, label, children, className }: ModalProps) {
  const panel = useRef<HTMLDivElement>(null);
  const closeRef = useRef(onClose);
  closeRef.current = onClose;

  useEffect(() => {
    const previous = document.activeElement as HTMLElement | null;
    const node = panel.current;
    const first = node?.querySelector<HTMLElement>("input, textarea, select") ?? node;
    first?.focus();

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeRef.current();
        return;
      }
      if (event.key !== "Tab" || !node) return;
      const items = [...node.querySelectorAll<HTMLElement>(FOCUSABLE)];
      if (items.length === 0) return;
      const start = items[0];
      const end = items[items.length - 1];
      if (event.shiftKey && document.activeElement === start) {
        event.preventDefault();
        end.focus();
      } else if (!event.shiftKey && document.activeElement === end) {
        event.preventDefault();
        start.focus();
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
      previous?.focus();
    };
  }, []);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-5">
      <div
        aria-hidden="true"
        className="animate-fade-in absolute inset-0 bg-ink/25 opacity-0 backdrop-blur-xl"
        onClick={onClose}
      />
      <div
        ref={panel}
        role="dialog"
        aria-modal="true"
        aria-label={label}
        tabIndex={-1}
        className={cn(
          "glass relative max-h-[90vh] w-full max-w-md overflow-y-auto rounded-[32px] p-8 shadow-[0_50px_120px_-30px_rgba(17,19,24,.45)] outline-none",
          className,
        )}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Закрыть"
          className="absolute right-6 top-6 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-ink/[.06] text-ink/55 transition-colors hover:bg-ink/10 hover:text-ink"
        >
          <Close size={16} strokeWidth={1.75} />
        </button>
        {children}
      </div>
    </div>
  );
}

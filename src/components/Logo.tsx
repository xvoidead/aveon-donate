import { cn } from "@/utils/cn";

export function LogoMark({
  className,
  size = 28,
}: {
  className?: string;
  size?: number;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 52"
      className={cn("shrink-0", className)}
      aria-hidden="true"
    >
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="M31.2 2.2C29.9 2.2 28.7 3 28 4.2L3 44.7C2.2 46 3.2 47.6 4.7 47.2L15.5 44.2C16.1 44 16.6 43.6 16.9 43L31 18.5L39.7 34H27.1L22.1 42.8L47.4 47.2C49.1 47.5 50.2 45.8 49.3 44.3L34.4 4.2C33.8 3 32.6 2.2 31.2 2.2Z"
      />
    </svg>
  );
}

export function Logo({
  className,
  light = false,
  markSize = 26,
  textClassName,
}: {
  className?: string;
  light?: boolean;
  markSize?: number;
  textClassName?: string;
}) {
  return (
    <a
      href="#home"
      className={cn(
        "inline-flex items-center gap-3 select-none",
        light ? "text-white" : "text-ink",
        className,
      )}
      aria-label="AVEON.DONATE — на главную"
    >
      <LogoMark size={markSize} />
      <span
        className={cn(
          "text-[13.5px] font-medium tracking-[0.14em] uppercase",
          textClassName,
        )}
      >
        Aveon.Donate
      </span>
    </a>
  );
}

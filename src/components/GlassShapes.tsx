import type { CSSProperties } from "react";
import { cn } from "@/utils/cn";

/** Soft, very light isometric cube — the only nod to Minecraft in the background. */
export function VoxelCube({
  size = 120,
  className,
  style,
  blur = 0,
  opacity = 1,
}: {
  size?: number;
  className?: string;
  style?: CSSProperties;
  blur?: number;
  opacity?: number;
}) {
  return (
    <svg
      width={size}
      height={size * 1.16}
      viewBox="0 0 100 116"
      className={cn("pointer-events-none absolute", className)}
      style={{
        filter: blur ? `blur(${blur}px)` : undefined,
        opacity,
        ...style,
      }}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="vc-top" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#FFFFFF" />
          <stop offset="1" stopColor="#F1F3F7" />
        </linearGradient>
        <linearGradient id="vc-left" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#E6E9EF" />
          <stop offset="1" stopColor="#D9DEE6" />
        </linearGradient>
        <linearGradient id="vc-right" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#D5DAE2" />
          <stop offset="1" stopColor="#C6CCD6" />
        </linearGradient>
      </defs>
      <polygon points="50,0 100,29 50,58 0,29" fill="url(#vc-top)" />
      <polygon points="0,29 50,58 50,116 0,87" fill="url(#vc-left)" />
      <polygon points="50,58 100,29 100,87 50,116" fill="url(#vc-right)" />
      <polygon
        points="50,0 100,29 50,58 0,29"
        fill="none"
        stroke="rgba(255,255,255,0.9)"
        strokeWidth="1"
      />
    </svg>
  );
}

/** Defocused liquid-glass ring. */
export function GlassRing({
  size = 520,
  thickness = 46,
  className,
  style,
  blur = 6,
}: {
  size?: number;
  thickness?: number;
  className?: string;
  style?: CSSProperties;
  blur?: number;
}) {
  return (
    <div
      aria-hidden="true"
      className={cn("pointer-events-none absolute rounded-full", className)}
      style={{
        width: size,
        height: size,
        borderWidth: thickness,
        borderStyle: "solid",
        borderColor: "rgba(255,255,255,0.55)",
        boxShadow:
          "inset 0 0 0 1px rgba(255,255,255,0.8), inset 0 30px 60px -30px rgba(17,19,24,0.12), 0 40px 80px -40px rgba(17,19,24,0.16), 0 0 0 1px rgba(17,19,24,0.03)",
        background:
          "conic-gradient(from 200deg, rgba(255,255,255,0) 0deg, rgba(255,255,255,0.35) 90deg, rgba(255,255,255,0) 180deg, rgba(255,255,255,0.25) 280deg, rgba(255,255,255,0) 360deg)",
        filter: `blur(${blur}px)`,
        ...style,
      }}
    />
  );
}

/** Large soft light blob. */
export function Blob({
  className,
  style,
}: {
  className?: string;
  style?: CSSProperties;
}) {
  return <div aria-hidden="true" className={cn("blob", className)} style={style} />;
}

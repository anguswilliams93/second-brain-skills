'use client';

import { ReactNode, useEffect, useRef, useState } from 'react';

export type ScoreDeltaKind = 'up' | 'down' | 'flat' | 'warn';

export interface ScoreDelta {
  label: string;
  kind: ScoreDeltaKind;
}

export interface ScoreCellProps {
  hero?: boolean;
  label: string;
  dotColor: string;
  value: string | number;
  unit?: string;
  delta?: ScoreDelta;
  sub?: ReactNode;
  barPct: number;
  barColor?: string;
  delay?: number;
}

function DeltaBadge({ delta }: { delta: ScoreDelta }) {
  const styles: Record<ScoreDeltaKind, React.CSSProperties> = {
    up: { background: 'color-mix(in oklab, var(--ok) 18%, transparent)', color: 'var(--ok)' },
    down: { background: 'color-mix(in oklab, var(--bad) 18%, transparent)', color: 'var(--bad)' },
    flat: { background: 'var(--bg-3)', color: 'var(--fg-3)', border: '1px solid var(--line-2)' },
    warn: { background: 'color-mix(in oklab, var(--warn) 18%, transparent)', color: 'var(--warn)' },
  };
  const char = delta.kind === 'up' ? '▲' : delta.kind === 'down' ? '▼' : delta.kind === 'warn' ? '!' : '≈';
  return (
    <span
      className='mono ml-[6px] inline-flex items-center gap-[4px] rounded-full px-[8px] py-[2px] text-[11px] font-medium tracking-[-0.003em]'
      style={styles[delta.kind]}
    >
      {char} {delta.label}
    </span>
  );
}

export function ScoreCell({
  hero,
  label,
  dotColor,
  value,
  unit,
  delta,
  sub,
  barPct,
  barColor,
  delay = 0,
}: ScoreCellProps) {
  const barRef = useRef<HTMLDivElement>(null);
  const [barAnimated, setBarAnimated] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setBarAnimated(true), delay);
    return () => clearTimeout(t);
  }, [delay]);

  const heroStyle: React.CSSProperties = hero
    ? {
        background:
          'radial-gradient(120% 180% at 0% 0%, color-mix(in oklab, var(--primary) 22%, transparent) 0%, transparent 50%), var(--bg-3)',
      }
    : {};

  return (
    <div
      className='relative border-r px-[24px] py-[22px] last:border-r-0'
      style={{ ...heroStyle, borderColor: 'var(--border)' }}
    >
      {/* Label */}
      <div
        className='mono flex items-center gap-[8px] text-[10.5px] uppercase tracking-[0.1em]'
        style={{ color: 'var(--fg-3)' }}
      >
        <span
          className='h-[8px] w-[8px] rounded-[2px]'
          style={{ background: dotColor }}
        />
        {label}
      </div>

      {/* Value line */}
      <div className='mt-[10px] flex items-baseline gap-[10px]'>
        <span
          className='inter-tight leading-none'
          style={{
            fontSize: 48,
            fontWeight: 500,
            letterSpacing: '-0.03em',
            color: hero ? 'var(--primary)' : 'var(--fg)',
          }}
        >
          {value}
        </span>
        {unit && (
          <em
            className='text-[16px] font-normal not-italic tracking-[-0.01em]'
            style={{ color: 'var(--fg-3)' }}
          >
            {unit}
          </em>
        )}
        {delta && <DeltaBadge delta={delta} />}
      </div>

      {/* Sub */}
      {sub && (
        <div
          className='mono mt-[10px] text-[12px] uppercase tracking-[0.03em]'
          style={{ color: 'var(--fg-3)' }}
        >
          {sub}
        </div>
      )}

      {/* Bottom progress bar */}
      <div
        className='absolute inset-x-[24px] bottom-[16px] h-[3px] overflow-hidden rounded-[3px]'
        style={{ background: 'var(--line-2)' }}
      >
        <div
          ref={barRef}
          className='h-full rounded-[3px]'
          style={{
            width: `${Math.min(100, Math.max(0, barPct))}%`,
            background: barColor ?? 'var(--primary)',
            transformOrigin: 'left',
            transform: barAnimated ? 'scaleX(1)' : 'scaleX(0)',
            transition: barAnimated ? 'transform 1.2s cubic-bezier(.2,.7,.2,1)' : 'none',
          }}
        />
      </div>
    </div>
  );
}

export interface ScoreboardProps {
  children?: ReactNode;
}

export function Scoreboard({ children }: ScoreboardProps) {
  return (
    <div
      className='mb-[22px] overflow-hidden rounded-[16px] border'
      style={{
        display: 'grid',
        gridTemplateColumns: '1.1fr 1fr 1fr 1fr',
        background: 'var(--bg-2)',
        borderColor: 'var(--border)',
      }}
    >
      {children}
    </div>
  );
}

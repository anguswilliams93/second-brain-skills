'use client';

import { ElementType, useRef } from 'react';
import { motion } from 'motion/react';

export interface KpiDelta {
  value: string;
  kind: 'up' | 'down' | 'flat';
}

export interface KpiCardProps {
  label: string;
  icon: ElementType;
  value: string | number;
  unit?: string;
  delta?: KpiDelta;
  desc?: string;
  spark?: number[];
}

function DeltaPill({ delta }: { delta: KpiDelta }) {
  const char = delta.kind === 'up' ? '▲' : delta.kind === 'down' ? '▼' : '≈';
  const style: React.CSSProperties =
    delta.kind === 'up'
      ? { background: 'color-mix(in oklab, var(--ok) 18%, transparent)', color: 'var(--ok)' }
      : delta.kind === 'down'
        ? { background: 'color-mix(in oklab, var(--bad) 18%, transparent)', color: 'var(--bad)' }
        : {
            background: 'var(--bg-3)',
            color: 'var(--fg-3)',
            border: '1px solid var(--line-2)',
          };
  return (
    <span
      className='mono inline-flex items-center gap-[3px] rounded-full px-[7px] py-[2px] text-[11px] font-medium'
      style={style}
    >
      {char} {delta.value}
    </span>
  );
}

function Sparkline({ values }: { values: number[] }) {
  if (values.length < 2) return null;
  const w = 80;
  const h = 28;
  const min = Math.min(...values);
  const max = Math.max(...values);
  const range = max - min || 1;
  const pts = values
    .map((v, i) => {
      const x = (i / (values.length - 1)) * w;
      const y = h - ((v - min) / range) * h;
      return `${x},${y}`;
    })
    .join(' ');

  return (
    <svg
      width={w}
      height={h}
      className='absolute bottom-[10px] right-[14px] opacity-40'
      aria-hidden
    >
      <polyline
        points={pts}
        fill='none'
        stroke='var(--chart-1)'
        strokeWidth={1.5}
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
}

export function KpiCard({ label, icon: Icon, value, unit, delta, desc, spark }: KpiCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  return (
    <motion.div
      ref={cardRef}
      whileHover={{ y: -2 }}
      transition={{ duration: 0.2 }}
      className='relative overflow-hidden rounded-[16px] border p-[18px_20px]'
      style={{
        background: 'var(--bg-2)',
        borderColor: 'var(--border)',
      }}
      onMouseEnter={() => {
        if (cardRef.current) {
          cardRef.current.style.borderColor = 'color-mix(in oklab, var(--primary) 30%, var(--border))';
          cardRef.current.style.boxShadow = 'var(--shadow-md)';
        }
      }}
      onMouseLeave={() => {
        if (cardRef.current) {
          cardRef.current.style.borderColor = 'var(--border)';
          cardRef.current.style.boxShadow = 'none';
        }
      }}
    >
      {/* Gradient underline on hover — rendered as an absolutely positioned bar */}
      <motion.div
        className='pointer-events-none absolute inset-x-0 bottom-0 h-[2px]'
        style={{ background: 'var(--gradient)' }}
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.2 }}
      />

      {/* Head row */}
      <div className='mb-[10px] flex items-center justify-between'>
        <span className='mono inline-flex items-center gap-[7px] text-[11.5px] uppercase tracking-[0.08em]' style={{ color: 'var(--fg-3)' }}>
          <span
            className='inline-grid h-[24px] w-[24px] place-items-center rounded-[7px] border'
            style={{
              background: 'var(--bg-3)',
              borderColor: 'var(--line-2)',
              color: 'var(--primary)',
            }}
          >
            <Icon size={13} weight='bold' />
          </span>
          {label}
        </span>
        {delta && <DeltaPill delta={delta} />}
      </div>

      {/* Value */}
      <div
        className='inter-tight flex items-baseline gap-[4px] leading-none'
        style={{ fontSize: 36, fontWeight: 500, letterSpacing: '-0.025em' }}
      >
        {value}
        {unit && (
          <em style={{ fontStyle: 'normal', color: 'var(--fg-3)', fontSize: 18, fontWeight: 400, letterSpacing: '-0.01em' }}>
            {unit}
          </em>
        )}
      </div>

      {/* Desc */}
      {desc && (
        <p
          className='mono mt-[8px] text-[11.5px] uppercase tracking-[-0.003em]'
          style={{ color: 'var(--fg-3)' }}
        >
          {desc}
        </p>
      )}

      {/* Sparkline */}
      {spark && spark.length >= 2 && <Sparkline values={spark} />}
    </motion.div>
  );
}

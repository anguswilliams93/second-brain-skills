'use client';

import { ReactNode } from 'react';

export interface BarRowProps {
  label: string;
  value: string | number;
  pct: number;
  delayMs?: number;
  gradientOverride?: string;
  valueClass?: string;
}

export function BarRow({ label, value, pct, delayMs = 0, gradientOverride, valueClass }: BarRowProps) {
  return (
    <div
      className='grid items-center gap-[12px] text-[12.5px]'
      style={{ gridTemplateColumns: '148px 1fr 36px' }}
    >
      <span
        className='overflow-hidden text-ellipsis whitespace-nowrap tracking-[-0.003em]'
        style={{ color: 'var(--fg-2)' }}
      >
        {label}
      </span>
      <div
        className='h-[12px] overflow-hidden rounded-[6px] border'
        style={{ background: 'var(--bg-3)', borderColor: 'var(--line-2)' }}
      >
        <span
          style={
            {
              display: 'block',
              height: '100%',
              width: `${Math.min(100, Math.max(0, pct))}%`,
              borderRadius: 6,
              background: gradientOverride ?? 'var(--gradient)',
              transformOrigin: 'left',
              animationName: 'barFill',
              animationDuration: '1.2s',
              animationTimingFunction: 'cubic-bezier(.2,.7,.2,1)',
              animationFillMode: 'both',
              animationDelay: `${delayMs}ms`,
            } as React.CSSProperties
          }
        />
      </div>
      <span
        className={`mono text-right text-[12px] font-medium ${valueClass ?? ''}`}
        style={valueClass ? undefined : { color: 'var(--fg)' }}
      >
        {value}
      </span>
    </div>
  );
}

export interface BarListProps {
  children?: ReactNode;
}

export function BarList({ children }: BarListProps) {
  return (
    <div className='mt-[4px] flex flex-col gap-[10px]'>
      {children}
    </div>
  );
}

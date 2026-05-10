'use client';

import { ElementType, ReactNode } from 'react';

export type InsTone = 'ok' | 'bad' | 'warn';

export interface InsProps {
  tone: InsTone;
  icon: ElementType;
  label: string;
  title: string;
  value: string;
  unit?: string;
  desc: string;
}

const toneColor: Record<InsTone, string> = {
  ok: 'var(--ok)',
  bad: 'var(--bad)',
  warn: 'var(--warn)',
};

export function Ins({ tone, icon: Icon, label, title, value, unit, desc }: InsProps) {
  const color = toneColor[tone];
  return (
    <div
      className='relative overflow-hidden rounded-[14px] border p-[18px]'
      style={{ background: 'var(--bg-2)', borderColor: 'var(--border)' }}
    >
      {/* Left stripe */}
      <div
        className='pointer-events-none absolute inset-y-0 left-0 w-[3px]'
        style={{ background: color }}
      />

      {/* Header */}
      <div
        className='mono flex items-center gap-[8px] text-[10.5px] uppercase tracking-[0.08em]'
        style={{ color: 'var(--fg-3)' }}
      >
        <span
          className='inline-grid h-[22px] w-[22px] place-items-center rounded-[6px] border'
          style={{ background: 'var(--bg-3)', borderColor: 'var(--line-2)', color }}
        >
          <Icon size={12} weight='bold' />
        </span>
        {label}
      </div>

      {/* Title */}
      <p
        className='mt-[10px] text-[15px] font-medium leading-[1.3] tracking-[-0.01em]'
        style={{ color: 'var(--fg)' }}
      >
        {title}
      </p>

      {/* Value */}
      <div
        className='inter-tight mt-[10px] flex items-baseline gap-[6px] leading-none'
        style={{ fontSize: 28, fontWeight: 500, letterSpacing: '-0.02em', color }}
      >
        {value}
        {unit && (
          <em
            className='mono text-[12px] not-italic uppercase tracking-[0.06em]'
            style={{ color: 'var(--fg-3)' }}
          >
            {unit}
          </em>
        )}
      </div>

      {/* Desc */}
      <p
        className='mt-[6px] text-[12.5px] leading-[1.5] tracking-[-0.003em]'
        style={{ color: 'var(--fg-3)' }}
      >
        {desc}
      </p>
    </div>
  );
}

export interface InsightsRailProps {
  children?: ReactNode;
}

export function InsightsRail({ children }: InsightsRailProps) {
  return (
    <div className='mb-[22px] grid grid-cols-3 gap-[12px]'>
      {children}
    </div>
  );
}

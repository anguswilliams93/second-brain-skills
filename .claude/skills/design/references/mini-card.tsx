'use client';

import { ElementType, ReactNode } from 'react';

export type MiniChipTone = 'ok' | 'warn' | 'info' | 'bad';

export interface MiniChipProps {
  label: string;
  tone: MiniChipTone;
}

export function MiniChip({ label, tone }: MiniChipProps) {
  const styles: Record<MiniChipTone, React.CSSProperties> = {
    ok: {
      background: 'color-mix(in oklab, var(--ok) 18%, transparent)',
      color: 'var(--ok)',
    },
    warn: {
      background: 'color-mix(in oklab, var(--warn) 18%, transparent)',
      color: 'var(--warn)',
    },
    bad: {
      background: 'color-mix(in oklab, var(--bad) 18%, transparent)',
      color: 'var(--bad)',
    },
    info: {
      background: 'var(--bg-2)',
      color: 'var(--fg-3)',
      border: '1px solid var(--line-2)',
    },
  };

  return (
    <span
      className='mono mt-[6px] inline-block rounded-full px-[7px] py-[2px] text-[10px] uppercase tracking-[0.04em]'
      style={styles[tone]}
    >
      {label}
    </span>
  );
}

export interface MiniCardProps {
  icon: ElementType;
  label: string;
  value: string;
  unit?: string;
  chip?: { label: string; tone: MiniChipTone };
}

export function MiniCard({ icon: Icon, label, value, unit, chip }: MiniCardProps) {
  return (
    <div
      className='rounded-[12px] border px-[16px] py-[14px]'
      style={{ background: 'var(--bg-3)', borderColor: 'var(--line-2)' }}
    >
      <div
        className='mono flex items-center gap-[8px] text-[11.5px] uppercase tracking-[0.04em]'
        style={{ color: 'var(--fg-3)' }}
      >
        <span
          className='inline-grid h-[20px] w-[20px] place-items-center rounded-[6px] border'
          style={{
            background: 'var(--bg-2)',
            borderColor: 'var(--line-2)',
            color: 'var(--primary)',
          }}
        >
          <Icon size={12} weight='bold' />
        </span>
        {label}
      </div>
      <div
        className='inter-tight mt-[8px] leading-none'
        style={{ fontSize: 28, fontWeight: 500, letterSpacing: '-0.02em' }}
      >
        {value}
        {unit && (
          <em
            className='mono ml-[3px] text-[12px] not-italic font-normal'
            style={{ color: 'var(--fg-3)' }}
          >
            {unit}
          </em>
        )}
      </div>
      {chip && <MiniChip label={chip.label} tone={chip.tone} />}
    </div>
  );
}

export interface MiniGridProps {
  children?: ReactNode;
}

export function MiniGrid({ children }: MiniGridProps) {
  return (
    <div className='mt-[12px] grid grid-cols-3 gap-[12px]'>
      {children}
    </div>
  );
}

export interface MiniFootProps {
  children?: ReactNode;
}

export function MiniFoot({ children }: MiniFootProps) {
  return (
    <div
      className='mt-[12px] rounded-[10px] border border-dashed px-[12px] py-[10px] text-[12px] tracking-[-0.003em]'
      style={{ background: 'var(--bg-3)', borderColor: 'var(--line-2)', color: 'var(--fg-3)' }}
    >
      {children}
    </div>
  );
}

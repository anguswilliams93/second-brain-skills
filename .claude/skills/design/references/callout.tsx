'use client';

import { ReactNode } from 'react';

export type CalloutTone = 'up' | 'down' | 'flat';

export interface CalloutProps {
  tone: CalloutTone;
  title: string;
  desc: string;
  value: string;
}

const toneStyles: Record<CalloutTone, { ci: React.CSSProperties; val: React.CSSProperties }> = {
  up: {
    ci: {
      background: 'color-mix(in oklab, var(--ok) 16%, transparent)',
      color: 'var(--ok)',
    },
    val: { color: 'var(--ok)' },
  },
  down: {
    ci: {
      background: 'color-mix(in oklab, var(--bad) 16%, transparent)',
      color: 'var(--bad)',
    },
    val: { color: 'var(--bad)' },
  },
  flat: {
    ci: {
      background: 'var(--bg-3)',
      color: 'var(--fg-3)',
      border: '1px solid var(--line-2)',
    },
    val: { color: 'var(--fg-3)' },
  },
};

const toneChar: Record<CalloutTone, string> = {
  up: '▲',
  down: '▼',
  flat: '≈',
};

export function Callout({ tone, title, desc, value }: CalloutProps) {
  const ts = toneStyles[tone];
  return (
    <div
      className='flex items-start gap-[12px] rounded-[11px] border px-[14px] py-[12px]'
      style={{ background: 'var(--bg-2)', borderColor: 'var(--line-2)' }}
    >
      {/* Icon tile */}
      <div
        className='mono grid h-[28px] w-[28px] flex-shrink-0 place-items-center rounded-[8px] text-[11px] font-semibold'
        style={ts.ci}
      >
        {toneChar[tone]}
      </div>

      {/* Text */}
      <div className='min-w-0 flex-1'>
        <p
          className='text-[13px] font-medium leading-[1.3] tracking-[-0.003em]'
          style={{ color: 'var(--fg)' }}
        >
          {title}
        </p>
        <p
          className='mt-[2px] text-[11.5px] leading-[1.4] tracking-[-0.003em]'
          style={{ color: 'var(--fg-3)' }}
        >
          {desc}
        </p>
      </div>

      {/* Value */}
      <span
        className='mono ml-auto whitespace-nowrap text-[12px] font-medium'
        style={ts.val}
      >
        {value}
      </span>
    </div>
  );
}

export interface CalloutListProps {
  children?: ReactNode;
}

export function CalloutList({ children }: CalloutListProps) {
  return <div className='flex flex-col gap-[8px]'>{children}</div>;
}

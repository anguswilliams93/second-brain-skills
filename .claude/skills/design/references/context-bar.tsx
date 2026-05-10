'use client';

import { ReactNode } from 'react';

export interface ContextTargetProps {
  initials: string;
  title: string;
  sub: string;
  onSwap?: () => void;
}

export function ContextTarget({ initials, title, sub, onSwap }: ContextTargetProps) {
  return (
    <div
      className='flex min-w-[260px] flex-1 items-center gap-[12px] rounded-[10px] border px-[14px] py-[6px] pl-[8px]'
      style={{ background: 'var(--bg-3)', borderColor: 'var(--border)' }}
    >
      {/* Initials pill */}
      <div
        className='mono grid h-[36px] w-[36px] flex-shrink-0 place-items-center rounded-[8px] text-[13px] font-semibold'
        style={{ background: 'var(--gradient)', color: 'var(--bg)' }}
      >
        {initials}
      </div>

      {/* Text */}
      <div className='min-w-0 flex-1'>
        <div
          className='text-[14px] font-semibold leading-[1.2] tracking-[-0.008em]'
          style={{ color: 'var(--fg)' }}
        >
          {title}
        </div>
        <div
          className='mono mt-[2px] text-[11.5px] uppercase tracking-[0.03em]'
          style={{ color: 'var(--fg-3)' }}
        >
          {sub}
        </div>
      </div>

      {/* Change button */}
      {onSwap && (
        <button
          type='button'
          onClick={onSwap}
          className='mono ml-auto inline-flex items-center gap-[6px] rounded-[8px] border px-[10px] py-[6px] text-[12px] transition-colors duration-150'
          style={{
            background: 'var(--bg-2)',
            borderColor: 'var(--line-2)',
            color: 'var(--fg-3)',
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLButtonElement).style.color = 'var(--fg)';
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.color = 'var(--fg-3)';
          }}
        >
          {/* arrows-left-right icon */}
          <svg
            width='12'
            height='12'
            viewBox='0 0 24 24'
            fill='none'
            stroke='currentColor'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
            aria-hidden
          >
            <path d='M7 16H3m0 0l4-4M3 16l4 4M17 8h4m0 0l-4-4m4 4l-4 4' />
          </svg>
          Change
        </button>
      )}
    </div>
  );
}

export interface ContextBarProps {
  children?: ReactNode;
}

export function ContextBar({ children }: ContextBarProps) {
  return (
    <div
      className='mb-[22px] flex flex-wrap items-center gap-[10px] rounded-[14px] border p-[10px]'
      style={{ background: 'var(--bg-2)', borderColor: 'var(--border)' }}
    >
      {children}
    </div>
  );
}

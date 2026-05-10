'use client';

import { ReactNode } from 'react';

export interface FilterRowProps {
  children?: ReactNode;
  className?: string;
}

export function FilterRow({ children, className = '' }: FilterRowProps) {
  return (
    <div className={`mb-[18px] flex flex-wrap items-center gap-[10px] ${className}`}>
      {children}
    </div>
  );
}

export interface SelectProps {
  label: string;
  value: string;
  onClick?: () => void;
  trailing?: ReactNode;
}

export function Select({ label, value, onClick, trailing }: SelectProps) {
  return (
    <button
      type='button'
      onClick={onClick}
      className='inline-flex cursor-pointer items-center gap-[8px] rounded-[9px] border px-[12px] py-[8px] text-[13px] transition-colors duration-150'
      style={{
        background: 'var(--bg-2)',
        borderColor: 'var(--border)',
        color: 'var(--fg-2)',
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLButtonElement).style.background = 'var(--bg-3)';
        (e.currentTarget as HTMLButtonElement).style.color = 'var(--fg)';
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLButtonElement).style.background = 'var(--bg-2)';
        (e.currentTarget as HTMLButtonElement).style.color = 'var(--fg-2)';
      }}
    >
      <span
        className='mono mr-[4px] text-[10.5px] uppercase tracking-[0.06em]'
        style={{ color: 'var(--fg-3)' }}
      >
        {label}
      </span>
      <strong className='font-medium' style={{ color: 'var(--fg)' }}>
        {value}
      </strong>
      {trailing}
      {/* Chevron down */}
      <svg
        width='12'
        height='12'
        viewBox='0 0 24 24'
        fill='none'
        stroke='currentColor'
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
        style={{ color: 'var(--fg-3)', marginLeft: 4 }}
        aria-hidden
      >
        <polyline points='6 9 12 15 18 9' />
      </svg>
    </button>
  );
}

export interface RangeTabsProps {
  options: string[];
  value: string;
  onChange: (v: string) => void;
}

export function RangeTabs({ options, value, onChange }: RangeTabsProps) {
  return (
    <div
      className='inline-flex gap-[2px] rounded-[10px] border p-[3px]'
      style={{ background: 'var(--bg-2)', borderColor: 'var(--border)' }}
    >
      {options.map((opt) => {
        const active = opt === value;
        return (
          <button
            key={opt}
            type='button'
            onClick={() => onChange(opt)}
            className='rounded-[7px] px-[12px] py-[6px] text-[12.5px] font-medium tracking-[-0.003em] transition-colors duration-150'
            style={
              active
                ? {
                    background: 'var(--bg-3)',
                    color: 'var(--fg)',
                    boxShadow: 'var(--shadow-sm)',
                  }
                : { color: 'var(--fg-3)' }
            }
          >
            {opt}
          </button>
        );
      })}
    </div>
  );
}

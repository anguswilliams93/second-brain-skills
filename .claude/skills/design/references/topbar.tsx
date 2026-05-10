'use client';

import { ElementType, ReactNode } from 'react';

export interface TopbarProps {
  crumb: string;
  crumbIcon?: ElementType;
  title: ReactNode;
  subtitle?: string;
  actions?: ReactNode;
}

export function Topbar({ crumb, crumbIcon: CrumbIcon, title, subtitle, actions }: TopbarProps) {
  // Support slash-separated crumbs e.g. "Admin / Buildings"
  const parts = crumb.split('/').map((p) => p.trim());

  return (
    <div className='mb-[28px] flex flex-wrap items-end justify-between gap-[20px]'>
      {/* Left column */}
      <div>
        {/* Breadcrumb */}
        <div
          className='mono mb-[4px] flex items-center gap-[6px] text-[11.5px] uppercase tracking-[0.06em]'
          style={{ color: 'var(--fg-3)' }}
        >
          {CrumbIcon && <CrumbIcon size={12} weight='bold' aria-hidden />}
          {parts.map((part, i) => (
            <span key={i} className='inline-flex items-center gap-[6px]'>
              {i > 0 && <span style={{ color: 'var(--fg-4)' }}>/</span>}
              {part}
            </span>
          ))}
        </div>

        {/* Title */}
        <h1
          className='inter-tight m-0 leading-[1.1] tracking-[-0.025em]'
          style={{ fontSize: 32, fontWeight: 500 }}
        >
          {title}
        </h1>

        {/* Subtitle */}
        {subtitle && (
          <p
            className='mt-[4px] text-[14px] tracking-[-0.003em]'
            style={{ color: 'var(--fg-3)' }}
          >
            {subtitle}
          </p>
        )}
      </div>

      {/* Right: actions slot */}
      {actions && (
        <div className='flex items-center gap-[10px]'>{actions}</div>
      )}
    </div>
  );
}

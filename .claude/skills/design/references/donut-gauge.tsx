'use client';

import { useEffect, useId, useRef, useState } from 'react';
import { ReactNode } from 'react';

const RADIUS = 54;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS; // ~339.3

export interface DonutGaugeProps {
  value: number;
  max?: number;
  label: string;
}

export function DonutGauge({ value, max = 100, label }: DonutGaugeProps) {
  const id = useId().replace(/:/g, '');
  const gradId = `dg-${id}`;
  const pct = Math.min(100, Math.max(0, (value / max) * 100));
  const offset = CIRCUMFERENCE - (pct / 100) * CIRCUMFERENCE;

  const [displayed, setDisplayed] = useState(0);
  const [animated, setAnimated] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !animated) {
          setAnimated(true);
          const duration = 1800;
          const start = performance.now();
          const target = Math.round(pct);
          const tick = (now: number) => {
            const elapsed = now - start;
            const progress = Math.min(1, elapsed / duration);
            setDisplayed(Math.round(progress * target));
            if (progress < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.3 },
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [pct, animated]);

  return (
    <div ref={ref} className='relative h-[140px] w-[140px] flex-shrink-0'>
      <svg
        width='140'
        height='140'
        viewBox='0 0 120 120'
        style={{ transform: 'rotate(-90deg)' }}
        aria-hidden
      >
        <defs>
          <linearGradient id={gradId} x1='0%' y1='0%' x2='100%' y2='0%'>
            <stop offset='0%' stopColor='var(--primary-2)' />
            <stop offset='100%' stopColor='var(--primary-3)' />
          </linearGradient>
        </defs>
        {/* Track */}
        <circle
          cx='60'
          cy='60'
          r={RADIUS}
          fill='none'
          stroke='var(--line-2)'
          strokeWidth='12'
        />
        {/* Progress */}
        <circle
          cx='60'
          cy='60'
          r={RADIUS}
          fill='none'
          stroke={`url(#${gradId})`}
          strokeWidth='12'
          strokeLinecap='round'
          strokeDasharray={CIRCUMFERENCE}
          strokeDashoffset={animated ? offset : CIRCUMFERENCE}
          style={{
            transition: animated
              ? 'stroke-dashoffset 1.8s cubic-bezier(.2,.7,.2,1)'
              : 'none',
          }}
        />
      </svg>
      {/* Center text */}
      <div className='absolute inset-0 grid place-items-center text-center'>
        <div>
          <div
            className='inter-tight leading-none'
            style={{ fontSize: 30, fontWeight: 500, letterSpacing: '-0.025em' }}
          >
            {displayed}%
          </div>
          <div
            className='mono mt-[4px] text-[10px] uppercase tracking-[0.08em]'
            style={{ color: 'var(--fg-3)' }}
          >
            {label}
          </div>
        </div>
      </div>
    </div>
  );
}

export interface DonutStatItem {
  k: string;
  v: string | number;
  unit?: string;
  tone?: 'default' | 'warn' | 'bad';
}

export interface DonutStatsProps {
  items: DonutStatItem[];
}

export function DonutStats({ items }: DonutStatsProps) {
  const toneColor = (tone?: DonutStatItem['tone']) => {
    if (tone === 'warn') return 'var(--warn)';
    if (tone === 'bad') return 'var(--bad)';
    return 'var(--fg)';
  };

  return (
    <div className='grid grid-cols-2 gap-x-[20px] gap-y-[10px]'>
      {items.map((item) => (
        <div key={item.k} className='flex flex-col'>
          <span
            className='mono text-[10px] uppercase tracking-[0.08em]'
            style={{ color: 'var(--fg-3)' }}
          >
            {item.k}
          </span>
          <span
            className='inter-tight mt-[3px] text-[18px] font-medium tracking-[-0.015em]'
            style={{ color: toneColor(item.tone) }}
          >
            {item.v}
            {item.unit && (
              <em
                className='mono ml-[2px] text-[11px] not-italic font-normal'
                style={{ color: 'var(--fg-3)' }}
              >
                {item.unit}
              </em>
            )}
          </span>
        </div>
      ))}
    </div>
  );
}

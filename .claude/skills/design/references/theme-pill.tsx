'use client';

import { useEffect, useState } from 'react';
import { Sun, Moon } from '@phosphor-icons/react';

type Theme = 'light' | 'dark';

export function ThemePill() {
  const [theme, setTheme] = useState<Theme>('dark');

  useEffect(() => {
    const stored = localStorage.getItem('bs-theme') as Theme | null;
    const initial: Theme =
      stored ?? (document.documentElement.classList.contains('dark') ? 'dark' : 'light');
    setTheme(initial);
    if (initial === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggle = (next: Theme) => {
    setTheme(next);
    if (next === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('bs-theme', next);
  };

  const segmentStyle = (seg: Theme): React.CSSProperties =>
    theme === seg
      ? {
          background: 'var(--bg-3)',
          color: 'var(--fg)',
          border: '1px solid var(--line-2)',
        }
      : { color: 'var(--fg-3)' };

  return (
    <div
      className='grid grid-cols-2 gap-[2px] rounded-[10px] border p-[3px]'
      style={{ background: 'var(--bg)', borderColor: 'var(--line-2)' }}
      role='group'
      aria-label='Colour scheme'
    >
      <button
        type='button'
        onClick={() => toggle('light')}
        className='inline-flex items-center justify-center gap-[6px] rounded-[7px] px-[8px] py-[6px] text-[11.5px] font-medium tracking-[-0.003em] transition-colors duration-150'
        style={segmentStyle('light')}
        aria-pressed={theme === 'light'}
      >
        <Sun size={12} weight='bold' aria-hidden />
        Light
      </button>
      <button
        type='button'
        onClick={() => toggle('dark')}
        className='inline-flex items-center justify-center gap-[6px] rounded-[7px] px-[8px] py-[6px] text-[11.5px] font-medium tracking-[-0.003em] transition-colors duration-150'
        style={segmentStyle('dark')}
        aria-pressed={theme === 'dark'}
      >
        <Moon size={12} weight='bold' aria-hidden />
        Dark
      </button>
    </div>
  );
}

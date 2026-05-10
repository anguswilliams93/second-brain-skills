import { ReactNode } from 'react';

export interface PanelProps {
  className?: string;
  children?: ReactNode;
}

export function Panel({ className = '', children }: PanelProps) {
  return (
    <div
      className={`relative overflow-hidden rounded-[16px] border p-[22px] ${className}`}
      style={{ background: 'var(--bg-2)', borderColor: 'var(--border)' }}
    >
      {children}
    </div>
  );
}

export interface PanelHeadProps {
  children?: ReactNode;
  className?: string;
}

export function PanelHead({ children, className = '' }: PanelHeadProps) {
  return (
    <div className={`mb-[16px] flex items-start justify-between gap-[14px] ${className}`}>
      {children}
    </div>
  );
}

export interface PanelTagProps {
  children?: ReactNode;
  className?: string;
}

export function PanelTag({ children, className = '' }: PanelTagProps) {
  return (
    <span
      className={`mono inline-flex items-center gap-[6px] rounded-full border px-[9px] py-[3px] text-[10.5px] font-medium uppercase tracking-[0.08em] ${className}`}
      style={{
        background: 'var(--bg-3)',
        color: 'var(--primary)',
        borderColor: 'var(--line-2)',
      }}
    >
      {children}
    </span>
  );
}

export interface TinyBtnProps {
  active?: boolean;
  onClick?: () => void;
  children?: ReactNode;
  className?: string;
}

export function TinyBtn({ active = false, onClick, children, className = '' }: TinyBtnProps) {
  return (
    <button
      type='button'
      onClick={onClick}
      className={`rounded-[7px] border px-[10px] py-[5px] text-[11.5px] tracking-[-0.003em] transition-colors duration-150 ${className}`}
      style={
        active
          ? {
              color: 'var(--primary)',
              borderColor: 'color-mix(in oklab, var(--primary) 40%, var(--border))',
              background: 'var(--bg)',
            }
          : {
              color: 'var(--fg-3)',
              borderColor: 'var(--border)',
              background: 'var(--bg)',
            }
      }
      onMouseEnter={(e) => {
        if (!active) {
          (e.currentTarget as HTMLButtonElement).style.color = 'var(--fg)';
          (e.currentTarget as HTMLButtonElement).style.background = 'var(--bg-3)';
        }
      }}
      onMouseLeave={(e) => {
        if (!active) {
          (e.currentTarget as HTMLButtonElement).style.color = 'var(--fg-3)';
          (e.currentTarget as HTMLButtonElement).style.background = 'var(--bg)';
        }
      }}
    >
      {children}
    </button>
  );
}

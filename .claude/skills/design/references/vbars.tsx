'use client';

export interface VBarItem {
  label: string;
  value: number;
  dim?: boolean;
}

export interface VBarsProps {
  data: VBarItem[];
  height?: number;
}

export function VBars({ data, height = 140 }: VBarsProps) {
  const max = Math.max(...data.map((d) => d.value), 1);

  return (
    <div>
      <div
        className='flex items-end gap-[6px]'
        style={{ height }}
      >
        {data.map((item, i) => {
          const pct = (item.value / max) * 100;
          return (
            <div
              key={i}
              className='flex-1 rounded-[4px_4px_0_0]'
              style={
                {
                  background: 'var(--gradient)',
                  height: `${pct}%`,
                  opacity: item.dim ? 0.3 : 0.85,
                  transformOrigin: 'bottom',
                  animationName: 'vbar',
                  animationDuration: '1s',
                  animationTimingFunction: 'cubic-bezier(.2,.7,.2,1)',
                  animationFillMode: 'both',
                  animationDelay: `${i * 0.05}s`,
                } as React.CSSProperties
              }
            />
          );
        })}
      </div>
      <div className='mt-[6px] flex justify-between'>
        {data.map((item, i) => (
          <span
            key={i}
            className='mono flex-1 text-center text-[10px] tracking-[0.04em]'
            style={{ color: 'var(--fg-3)' }}
          >
            {item.label}
          </span>
        ))}
      </div>
    </div>
  );
}

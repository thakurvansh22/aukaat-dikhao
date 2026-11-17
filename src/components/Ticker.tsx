import { Flame } from 'lucide-react';
import { formatINR, getTierForAmount, type EventRecord } from '../lib/tiers';

interface TickerProps {
  items: EventRecord[];
}

export function Ticker({ items }: TickerProps) {
  if (items.length === 0) {
    return null;
  }

  const marqueeList = [...items, ...items];

  return (
    <div className="w-full h-8 bg-[#120D21] border-b border-purple-500/25 overflow-hidden flex items-center select-none">
      <div className="shrink-0 h-full px-3 bg-amber-400 text-black font-display font-extrabold text-[11px] tracking-wider uppercase flex items-center gap-1.5 z-10">
        <Flame className="w-3.5 h-3.5 fill-black" />
        <span className="whitespace-nowrap">LIVE · INDIA</span>
      </div>
      <div className="flex-1 overflow-hidden relative">
        <div className="animate-marquee flex items-center gap-6 whitespace-nowrap text-xs font-medium text-zinc-200 px-4">
          {marqueeList.map((item, idx) => {
            const tier = getTierForAmount(item.amount);
            return (
              <span key={`${item.id}-${idx}`} className="inline-flex items-center gap-2">
                <span className="font-bold text-white">{item.name}</span>
                <span className="text-zinc-400">ne</span>
                <span
                  className="font-mono-num font-bold"
                  style={{ color: tier.accentHex }}
                >
                  ₹{formatINR(item.amount)}
                </span>
                <span className="text-zinc-400">diye</span>
                <span className="text-purple-400/70" aria-hidden="true">
                  •
                </span>
              </span>
            );
          })}
        </div>
      </div>
    </div>
  );
}

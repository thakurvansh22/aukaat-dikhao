import { motion } from 'motion/react';
import { Sparkles } from 'lucide-react';
import { formatINR, getTierForAmount, type LeaderboardEntry } from '../lib/tiers';

interface RankRowProps {
  entry: LeaderboardEntry;
  rank: number;
  isCurrentUser: boolean;
}

export function RankRow({ entry, rank, isCurrentUser }: RankRowProps) {
  const tier = getTierForAmount(entry.total);
  const isBaap = tier.id === 'baap';
  const isAmbani = tier.id === 'ambani';

  const rankBadge = () => {
    if (rank === 1) return <span className="text-xl" aria-label="Rank 1">👑</span>;
    if (rank === 2) return <span className="text-xl" aria-label="Rank 2">🥈</span>;
    if (rank === 3) return <span className="text-xl" aria-label="Rank 3">🥉</span>;
    return (
      <span className="font-mono-num font-bold text-sm text-zinc-400">
        #{rank}
      </span>
    );
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{
        layout: { type: 'spring', stiffness: 360, damping: 30 },
        duration: 0.22,
      }}
      className={`rounded-2xl p-3.5 sm:p-4 border transition-colors ${
        isBaap
          ? 'bg-gradient-to-r from-[#1D1520] via-[#171224] to-[#1D1614] tier-baap-border'
          : isCurrentUser
          ? 'bg-purple-950/35 border-purple-400/50'
          : rank === 1
          ? 'bg-[#191528] border-amber-400/40'
          : 'bg-[#12101C] border-white/10'
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3 min-w-0 flex-1">
          <div className="w-10 h-10 rounded-xl bg-[#08070E] border border-white/10 flex items-center justify-center shrink-0">
            {rankBadge()}
          </div>

          <div className="min-w-0 flex-1 space-y-0.5">
            <div className="flex items-center gap-1.5 flex-wrap">
              <span
                className={`font-display font-extrabold text-base sm:text-lg leading-tight truncate max-w-full ${
                  isBaap ? 'tier-baap-shake' : ''
                }`}
              >
                {isBaap && <span className="mr-1">👑</span>}
                <span className={tier.nameClass}>{entry.name}</span>
                {isAmbani && (
                  <Sparkles className="inline w-3.5 h-3.5 ml-1 text-amber-300 animate-pulse" />
                )}
              </span>

              {isCurrentUser && (
                <span className="text-[11px] font-bold text-purple-300">
                  · Tum
                </span>
              )}
            </div>

            <div className="flex items-center gap-1.5 text-xs text-zinc-400">
              <span className="font-semibold" style={{ color: tier.accentHex }}>
                {tier.title}
              </span>
            </div>

            {entry.message && (
              <p className="text-xs sm:text-sm text-zinc-300 pt-1 break-words">
                “{entry.message}”
              </p>
            )}
          </div>
        </div>

        <div className="text-right shrink-0 pl-2">
          <div className="font-mono-num font-extrabold text-base sm:text-lg text-amber-400">
            ₹{formatINR(entry.total)}
          </div>
          <div className="text-[11px] text-zinc-500 font-medium">
            {rank === 1 ? 'Top Dog' : `#${rank} Rank`}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

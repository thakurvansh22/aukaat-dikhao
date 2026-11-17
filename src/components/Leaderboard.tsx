import { useMemo } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { AlertTriangle, Share2 } from 'lucide-react';
import { formatINR, getTierForAmount, type LeaderboardEntry } from '../lib/tiers';
import { RankRow } from './RankRow';

interface LeaderboardProps {
  entries: LeaderboardEntry[];
  loading: boolean;
  firestoreError: string;
  currentUserName: string;
  onShareRank: () => void;
}

function LeaderboardSkeleton() {
  return (
    <div className="space-y-3" aria-label="Loading leaderboard">
      <div className="rounded-2xl border border-white/10 bg-[#12101C] p-5 animate-pulse">
        <div className="h-3 w-32 bg-white/10 rounded mb-3" />
        <div className="h-7 w-48 bg-white/10 rounded mb-2" />
        <div className="h-4 w-64 bg-white/5 rounded" />
      </div>
      {[1, 2, 3, 4].map((idx) => (
        <div
          key={idx}
          className="rounded-2xl border border-white/10 bg-[#12101C] p-4 flex items-center justify-between gap-3 animate-pulse"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/10" />
            <div className="space-y-2">
              <div className="h-4 w-32 bg-white/10 rounded" />
              <div className="h-3 w-20 bg-white/5 rounded" />
            </div>
          </div>
          <div className="h-5 w-16 bg-white/10 rounded" />
        </div>
      ))}
    </div>
  );
}

export function Leaderboard({
  entries,
  loading,
  firestoreError,
  currentUserName,
  onShareRank,
}: LeaderboardProps) {
  const totalPool = useMemo(
    () => entries.reduce((sum, item) => sum + item.total, 0),
    [entries]
  );

  const king = entries[0] ?? null;
  const kingTier = king ? getTierForAmount(king.total) : null;

  return (
    <section className="space-y-4">
      {/* #1 Animated "AAJ KA BADSHAH" Banner */}
      {!loading && king && kingTier && (
        <motion.div
          key={king.id}
          initial={{ opacity: 0.85, scale: 0.99 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative overflow-hidden rounded-2xl border border-amber-400/50 bg-gradient-to-br from-[#23192D] via-[#151121] to-[#241B0E] p-5 shadow-[0_0_36px_rgba(255,214,10,0.14)]"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1.5 min-w-0">
              <div className="inline-flex items-center gap-1.5 text-xs font-extrabold tracking-widest uppercase text-amber-400">
                <motion.span
                  animate={{ rotate: [-6, 6, -6] }}
                  transition={{ repeat: Infinity, duration: 2.2, ease: 'easeInOut' }}
                >
                  👑
                </motion.span>
                <span>AAJ KA BADSHAH</span>
              </div>

              <h2 className="font-display font-extrabold text-2xl sm:text-3xl tracking-tight truncate">
                <span className={kingTier.nameClass}>{king.name}</span>
              </h2>

              <p className="text-xs sm:text-sm text-zinc-300">
                {king.message ? `“${king.message}”` : 'Sabse upar baitha hai bhai!'}
              </p>
            </div>

            <div className="sm:text-right shrink-0 flex sm:flex-col items-baseline sm:items-end justify-between gap-2 pt-2 sm:pt-0 border-t sm:border-t-0 border-white/10">
              <span className="text-xs font-semibold text-zinc-400">
                {kingTier.title}
              </span>
              <span className="font-mono-num font-extrabold text-3xl text-amber-400">
                ₹{formatINR(king.total)}
              </span>
            </div>
          </div>
        </motion.div>
      )}

      {/* Leaderboard Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 px-1">
        <div>
          <h3 className="font-display font-extrabold text-lg sm:text-xl text-white">
            All-India Leaderboard (Top 50)
          </h3>
          <p className="text-xs text-zinc-400">
            {entries.length} Khiladi <span aria-hidden="true">·</span> Total ₹
            {formatINR(totalPool)}
          </p>
        </div>

        <button
          type="button"
          onClick={onShareRank}
          className="min-h-[38px] px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold text-zinc-200 inline-flex items-center gap-1.5 transition-colors cursor-pointer"
        >
          <Share2 className="w-3.5 h-3.5 text-amber-400" />
          <span>Share my rank</span>
        </button>
      </div>

      {firestoreError && (
        <div className="rounded-2xl bg-rose-500/10 border border-rose-500/30 p-4 flex items-start gap-3 text-xs sm:text-sm text-rose-200">
          <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
          <span>{firestoreError}</span>
        </div>
      )}

      {loading ? (
        <LeaderboardSkeleton />
      ) : entries.length === 0 ? (
        <div className="bg-[#12101C] border border-white/10 rounded-2xl p-10 text-center space-y-2">
          <div className="text-3xl">👑</div>
          <p className="font-display font-bold text-lg sm:text-xl text-white">
            Abhi koi nahi aaya. Pehla badshah ban jao!
          </p>
          <p className="text-xs sm:text-sm text-zinc-400">
            Apna naam daalo, Razorpay se pay karo, aur leaderboard par sabse upar aao.
          </p>
        </div>
      ) : (
        <div className="space-y-2.5">
          <AnimatePresence initial={false}>
            {entries.map((entry, idx) => (
              <RankRow
                key={entry.id}
                entry={entry}
                rank={idx + 1}
                isCurrentUser={
                  Boolean(currentUserName) &&
                  entry.name.toLowerCase() === currentUserName.trim().toLowerCase()
                }
              />
            ))}
          </AnimatePresence>
        </div>
      )}
    </section>
  );
}

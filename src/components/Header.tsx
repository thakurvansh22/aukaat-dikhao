import { Link } from 'react-router-dom';
import { Check, Crown, Share2, Volume2, VolumeX } from 'lucide-react';

interface HeaderProps {
  soundEnabled: boolean;
  onToggleSound: () => void;
  onShareRank: () => void;
  shareCopied: boolean;
  currentUserRank: number | null;
}

export function Header({
  soundEnabled,
  onToggleSound,
  onShareRank,
  shareCopied,
  currentUserRank,
}: HeaderProps) {
  return (
    <header className="sticky top-0 z-30 h-14 bg-[#08070E]/90 backdrop-blur-md border-b border-white/10">
      <div className="max-w-6xl mx-auto h-full px-4 flex items-center justify-between gap-4">
        <Link
          to="/"
          className="flex items-center gap-2.5 min-w-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 rounded-lg"
        >
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-400 via-amber-500 to-purple-600 flex items-center justify-center shrink-0 shadow-[0_0_16px_rgba(255,214,10,0.35)]">
            <Crown className="w-4 h-4 text-black stroke-[2.5]" />
          </div>
          <span className="font-display font-extrabold text-lg sm:text-xl tracking-tight text-white whitespace-nowrap shrink-0">
            AUKAAT <span className="text-amber-400">DIKHAO</span>
          </span>
        </Link>

        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={onShareRank}
            className="min-h-[40px] px-3 py-1.5 rounded-xl bg-purple-600/20 hover:bg-purple-600/35 border border-purple-500/40 text-purple-200 text-xs font-semibold inline-flex items-center gap-1.5 transition-colors cursor-pointer whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
            title="Copy rank flex message"
          >
            {shareCopied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-300">Copied!</span>
              </>
            ) : (
              <>
                <Share2 className="w-3.5 h-3.5 text-amber-400" />
                <span>
                  {currentUserRank ? `Share #${currentUserRank}` : 'Share Rank'}
                </span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={onToggleSound}
            aria-label={soundEnabled ? 'Mute sound effects' : 'Enable sound effects'}
            className={`min-h-[40px] min-w-[40px] px-2.5 rounded-xl border inline-flex items-center justify-center gap-1.5 text-xs font-semibold transition-colors cursor-pointer shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 ${
              soundEnabled
                ? 'bg-amber-400/15 border-amber-400/50 text-amber-300'
                : 'bg-zinc-900 border-white/10 text-zinc-400 hover:text-zinc-200'
            }`}
          >
            {soundEnabled ? (
              <Volume2 className="w-4 h-4" />
            ) : (
              <VolumeX className="w-4 h-4" />
            )}
            <span className="hidden sm:inline">
              {soundEnabled ? 'Sound On' : 'Sound Off'}
            </span>
          </button>
        </div>
      </div>
    </header>
  );
}

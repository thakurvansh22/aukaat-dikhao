import { useEffect } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { TrendingUp, X } from 'lucide-react';
import {
  formatINR,
  type ActivePopup,
  type OvertakeToast,
  type TierId,
} from '../lib/tiers';

interface PopupManagerProps {
  popup: ActivePopup | null;
  overtake: OvertakeToast | null;
  onDismissPopup: () => void;
  onDismissOvertake: () => void;
}

const FALLING_PARTICLES = Array.from({ length: 28 }, (_, i) => ({
  id: i,
  left: `${((i * 37) % 96) + 2}%`,
  delay: (i % 7) * 0.14,
  duration: 2.2 + (i % 5) * 0.35,
  rotate: (i % 2 === 0 ? 1 : -1) * (120 + (i % 4) * 60),
}));

const CONFETTI_COLORS = ['#FFD60A', '#A855F7', '#38BDF8', '#4ADE80', '#F43F5E'];

const FIREWORK_BURSTS = [
  { id: 1, x: '20%', y: '24%', color: '#FFD60A', delay: 0 },
  { id: 2, x: '78%', y: '20%', color: '#A855F7', delay: 0.25 },
  { id: 3, x: '28%', y: '72%', color: '#38BDF8', delay: 0.45 },
  { id: 4, x: '74%', y: '70%', color: '#F43F5E', delay: 0.65 },
  { id: 5, x: '50%', y: '18%', color: '#4ADE80', delay: 0.85 },
];

export function PopupManager({
  popup,
  overtake,
  onDismissPopup,
  onDismissOvertake,
}: PopupManagerProps) {
  useEffect(() => {
    if (!popup) return;
    const durationMap: Record<TierId, number> = {
      bhikari: 3600,
      chai: 4000,
      don: 4400,
      seth: 4800,
      ambani: 5000,
      baap: 5000,
    };
    const timer = window.setTimeout(onDismissPopup, durationMap[popup.tier.id]);
    return () => window.clearTimeout(timer);
  }, [popup, onDismissPopup]);

  useEffect(() => {
    if (!overtake) return;
    const timer = window.setTimeout(onDismissOvertake, 4200);
    return () => window.clearTimeout(timer);
  }, [overtake, onDismissOvertake]);

  return (
    <>
      <AnimatePresence>
        {overtake && (
          <motion.div
            key={overtake.id}
            initial={{ opacity: 0, y: 24, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.94 }}
            className="fixed bottom-4 right-4 left-4 sm:left-auto sm:max-w-sm z-40 bg-[#1A152B] border border-purple-500/60 rounded-2xl p-3.5 shadow-[0_12px_32px_rgba(0,0,0,0.65)] flex items-center justify-between gap-3"
          >
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-9 h-9 rounded-xl bg-purple-500/20 border border-purple-400/40 flex items-center justify-center shrink-0">
                <TrendingUp className="w-4 h-4 text-amber-400" />
              </div>
              <p className="text-xs sm:text-sm font-bold text-white leading-snug">
                <span className="text-amber-400">{overtake.overtaker}</span> ne{' '}
                <span className="text-purple-300">{overtake.overtaken}</span> ko peeche chhod diya!{' '}
                <span className="text-zinc-400 font-mono-num">(Now #{overtake.newRank})</span>
              </p>
            </div>
            <button
              type="button"
              onClick={onDismissOvertake}
              aria-label="Close overtake notice"
              className="p-1.5 text-zinc-400 hover:text-white cursor-pointer shrink-0"
            >
              <X className="w-4 h-4" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {popup && popup.tier.id === 'bhikari' && (
          <motion.div
            key={popup.id}
            initial={{ opacity: 0, y: -24, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className="fixed top-20 left-1/2 -translate-x-1/2 z-50 w-[92%] max-w-md bg-zinc-900 border border-zinc-700 rounded-2xl p-3.5 shadow-2xl flex items-center justify-between gap-3"
          >
            <p className="text-sm font-semibold text-zinc-200">{popup.line}</p>
            <button
              type="button"
              onClick={onDismissPopup}
              className="p-1.5 text-zinc-400 hover:text-white cursor-pointer shrink-0"
            >
              <X className="w-4 h-4" />
            </button>
          </motion.div>
        )}

        {popup && popup.tier.id === 'chai' && (
          <div
            key={popup.id}
            className="fixed inset-0 z-50 pointer-events-none flex items-center justify-center p-4"
          >
            {FALLING_PARTICLES.slice(0, 18).map((p) => (
              <motion.span
                key={p.id}
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: '105vh', opacity: [0, 1, 1, 0], rotate: p.rotate }}
                transition={{ duration: p.duration, delay: p.delay, ease: 'easeIn' }}
                style={{ left: p.left }}
                className="fixed top-0 text-2xl select-none"
              >
                💸
              </motion.span>
            ))}

            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              className="pointer-events-auto max-w-md w-full bg-[#111D18] border border-emerald-400/50 rounded-2xl p-5 shadow-[0_0_40px_rgba(74,222,128,0.25)] text-center space-y-2 relative"
            >
              <button
                type="button"
                onClick={onDismissPopup}
                className="absolute top-3 right-3 p-1.5 text-zinc-400 hover:text-white cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
              <p className="text-xs font-extrabold uppercase tracking-wider text-emerald-400">
                Chai Wala Rich
              </p>
              <p className="font-display font-extrabold text-lg text-white">
                {popup.line}
              </p>
            </motion.div>
          </div>
        )}

        {popup && popup.tier.id === 'don' && (
          <div
            key={popup.id}
            className="fixed inset-0 z-50 pointer-events-none flex items-center justify-center p-4"
          >
            {FALLING_PARTICLES.map((p) => (
              <motion.div
                key={p.id}
                initial={{ y: -30, opacity: 1 }}
                animate={{ y: '105vh', opacity: [1, 1, 0], rotate: p.rotate * 2 }}
                transition={{
                  duration: p.duration,
                  delay: p.delay * 0.7,
                  ease: 'linear',
                }}
                style={{
                  left: p.left,
                  backgroundColor: CONFETTI_COLORS[p.id % CONFETTI_COLORS.length],
                }}
                className="fixed top-0 w-2.5 h-4 rounded-sm"
              />
            ))}

            <motion.div
              initial={{ scale: 0.72, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 320, damping: 22 }}
              className="pointer-events-auto max-w-lg w-full bg-[#0E1826] border-2 border-sky-400/70 rounded-3xl p-6 shadow-[0_0_55px_rgba(56,189,248,0.35)] text-center space-y-2.5 relative"
            >
              <button
                type="button"
                onClick={onDismissPopup}
                className="absolute top-4 right-4 p-1.5 text-zinc-400 hover:text-white cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
              <p className="text-xs font-extrabold uppercase tracking-widest text-sky-400">
                🕶️ Local Don Entry
              </p>
              <h3 className="font-display font-extrabold text-2xl sm:text-3xl tier-don-name">
                {popup.name} — ₹{formatINR(popup.amount)}
              </h3>
              <p className="text-sm sm:text-base font-semibold text-zinc-100">
                {popup.line}
              </p>
            </motion.div>
          </div>
        )}

        {popup && popup.tier.id === 'seth' && (
          <div
            key={popup.id}
            className="fixed inset-0 z-50 pointer-events-none flex items-start justify-center pt-16 sm:pt-20 px-3"
          >
            {FALLING_PARTICLES.map((p) => (
              <motion.span
                key={p.id}
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: '105vh', opacity: [0, 1, 1, 0], rotate: p.rotate }}
                transition={{
                  duration: p.duration * 0.9,
                  delay: p.delay * 0.6,
                  ease: 'easeIn',
                }}
                style={{ left: p.left }}
                className="fixed top-0 text-2xl sm:text-3xl select-none"
              >
                🪙
              </motion.span>
            ))}

            <motion.div
              initial={{ y: -60, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -50, opacity: 0 }}
              className="pointer-events-auto w-full max-w-5xl rounded-2xl bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500 text-black p-4 sm:p-5 shadow-[0_0_60px_rgba(255,214,10,0.5)] border-2 border-yellow-200 flex items-center justify-between gap-4"
            >
              <div className="space-y-0.5 min-w-0">
                <p className="font-display font-extrabold text-base sm:text-xl tracking-tight">
                  🔥 SETH JI AAGAYE: {popup.name} ₹{formatINR(popup.amount)}
                </p>
                <p className="text-xs sm:text-sm font-bold text-black/80">
                  {popup.line}
                </p>
              </div>
              <button
                type="button"
                onClick={onDismissPopup}
                className="min-h-[36px] min-w-[36px] rounded-xl bg-black/15 hover:bg-black/25 text-black flex items-center justify-center cursor-pointer shrink-0"
              >
                <X className="w-4 h-4" />
              </button>
            </motion.div>
          </div>
        )}

        {popup && popup.tier.id === 'ambani' && (
          <motion.div
            key={popup.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/88 backdrop-blur-md flex items-center justify-center p-4 overflow-hidden"
          >
            {FIREWORK_BURSTS.map((fw) => (
              <motion.div
                key={fw.id}
                initial={{ scale: 0, opacity: 1 }}
                animate={{ scale: [0, 2.4, 3.2], opacity: [1, 0.85, 0] }}
                transition={{
                  duration: 1.4,
                  delay: fw.delay,
                  repeat: Infinity,
                  repeatDelay: 0.6,
                }}
                style={{ left: fw.x, top: fw.y, borderColor: fw.color }}
                className="fixed w-28 h-28 -translate-x-1/2 -translate-y-1/2 rounded-full border-4 border-dashed pointer-events-none"
              />
            ))}

            <motion.div
              initial={{ scale: 0.35, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.7, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 260, damping: 18 }}
              className="relative z-10 max-w-xl w-full text-center space-y-4 p-6 sm:p-8 rounded-3xl bg-[#140E24]/95 border border-purple-400/50 shadow-[0_0_80px_rgba(168,85,247,0.45)]"
            >
              <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-purple-300">
                💎 Ambani ka Cousin Alert 💎
              </p>
              <motion.h2
                initial={{ scale: 0.6 }}
                animate={{ scale: [0.6, 1.08, 1] }}
                transition={{ duration: 0.55 }}
                className="font-display font-extrabold text-4xl sm:text-6xl tier-ambani-name leading-tight"
              >
                {popup.name}
              </motion.h2>
              <p className="font-mono-num font-extrabold text-2xl sm:text-3xl text-amber-400">
                ₹{formatINR(popup.amount)}
              </p>
              <p className="text-sm sm:text-base font-semibold text-zinc-100">
                {popup.line}
              </p>
              <button
                type="button"
                onClick={onDismissPopup}
                className="mt-2 min-h-[44px] px-6 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold cursor-pointer"
              >
                Shabash, Band Karo
              </button>
            </motion.div>
          </motion.div>
        )}

        {popup && popup.tier.id === 'baap' && (
          <motion.div
            key={popup.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-gradient-to-b from-[#1A0D04]/95 via-[#0E0718]/95 to-black/95 backdrop-blur-md flex items-center justify-center p-4 overflow-hidden"
          >
            {FALLING_PARTICLES.map((p) => (
              <motion.span
                key={p.id}
                initial={{ y: -60, opacity: 0 }}
                animate={{ y: '108vh', opacity: [0, 1, 1, 0], rotate: p.rotate }}
                transition={{
                  duration: p.duration * 0.85,
                  delay: p.delay * 0.5,
                  repeat: Infinity,
                  ease: 'linear',
                }}
                style={{ left: p.left }}
                className="fixed top-0 text-2xl sm:text-3xl select-none pointer-events-none"
              >
                {p.id % 3 === 0 ? '👑' : p.id % 2 === 0 ? '🪙' : '✨'}
              </motion.span>
            ))}

            <motion.div
              initial={{ scale: 0.4, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 240, damping: 16 }}
              className="relative z-10 max-w-2xl w-full text-center space-y-5 p-6 sm:p-10 rounded-3xl bg-[#150E1D]/90 border-2 border-amber-400 shadow-[0_0_100px_rgba(255,214,10,0.45)]"
            >
              <p className="font-display font-extrabold text-lg sm:text-2xl tracking-wider text-amber-300">
                👑 NAYA BADSHAH: {popup.name} 👑
              </p>

              <h2 className="font-display font-extrabold text-4xl sm:text-6xl tier-baap-name leading-tight">
                {popup.name}
              </h2>

              <div className="font-mono-num font-extrabold text-3xl sm:text-5xl text-white">
                ₹{formatINR(popup.amount)}
              </div>

              <p className="text-base sm:text-lg font-bold text-amber-100 max-w-lg mx-auto">
                {popup.line}
              </p>

              <div className="max-w-xs mx-auto space-y-2 pt-2">
                <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ scaleX: 1 }}
                    animate={{ scaleX: 0 }}
                    transition={{ duration: 5, ease: 'linear' }}
                    style={{ transformOrigin: 'left' }}
                    className="h-full bg-amber-400"
                  />
                </div>
                <button
                  type="button"
                  onClick={onDismissPopup}
                  className="min-h-[42px] px-5 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-black text-xs font-extrabold cursor-pointer"
                >
                  Aukaat Maan Li (Close)
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

import { useEffect } from 'react';
import { PayForm } from '../components/PayForm';
import { Leaderboard } from '../components/Leaderboard';
import type { LeaderboardEntry } from '../lib/tiers';

interface HomePageProps {
  entries: LeaderboardEntry[];
  loadingBoard: boolean;
  firestoreError: string;
  currentUserName: string;
  onPaymentSubmitted: (name: string) => void;
  onShareRank: () => void;
}

export function HomePage({
  entries,
  loadingBoard,
  firestoreError,
  currentUserName,
  onPaymentSubmitted,
  onShareRank,
}: HomePageProps) {
  useEffect(() => {
    document.title = 'AUKAAT DIKHAO — India\'s Live Meme Leaderboard';
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 sm:py-8">
      <div className="mb-6 space-y-1.5">
        <h1 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl tracking-tight text-white text-balance">
          Paisa Bolta Hai.{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-400 to-purple-400">
            Tum Kitne Pani Mein Ho?
          </span>
        </h1>
        <p className="text-sm sm:text-base text-zinc-400 max-w-2xl">
          Naam likho, Razorpay se pay karo, aur All-India live leaderboard par #1 Badshah ban ke dikhao.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        <div className="lg:col-span-5 lg:sticky lg:top-20">
          <PayForm
            defaultName={currentUserName}
            onPaymentSubmitted={onPaymentSubmitted}
          />
        </div>

        <div className="lg:col-span-7">
          <Leaderboard
            entries={entries}
            loading={loadingBoard}
            firestoreError={firestoreError}
            currentUserName={currentUserName}
            onShareRank={onShareRank}
          />
        </div>
      </div>
    </div>
  );
}

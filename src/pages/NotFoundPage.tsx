import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export function NotFoundPage() {
  useEffect(() => {
    document.title = '404 — Page Nahi Mila | AUKAAT DIKHAO';
  }, []);

  return (
    <section className="max-w-xl mx-auto px-4 py-16 sm:py-24 text-center space-y-5">
      <div className="font-mono-num font-extrabold text-6xl sm:text-7xl text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-purple-400">
        404
      </div>
      <h1 className="font-display font-extrabold text-2xl sm:text-3xl text-white">
        Ye Page Bhi Gayab Ho Gaya!
      </h1>
      <p className="text-sm sm:text-base text-zinc-400">
        Lagta hai galat rasta pakad liya bhai. Asli aukaat toh home page par dikhti hai.
      </p>
      <Link
        to="/"
        className="min-h-[46px] px-6 py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-black font-display font-extrabold text-sm inline-flex items-center gap-2 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Leaderboard Pe Wapas Chalo</span>
      </Link>
    </section>
  );
}

import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { TIERS } from '../lib/tiers';

export function AboutPage() {
  useEffect(() => {
    document.title = 'About — AUKAAT DIKHAO';
  }, []);

  return (
    <article className="max-w-3xl mx-auto px-4 py-8 sm:py-12 space-y-6">
      <Link
        to="/"
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-400 hover:text-amber-300 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Wapas Leaderboard Pe</span>
      </Link>

      <header className="space-y-2 border-b border-white/10 pb-5">
        <h1 className="font-display font-extrabold text-3xl sm:text-4xl text-white">
          About AUKAAT DIKHAO
        </h1>
        <p className="text-sm text-amber-400 font-semibold">
          Ye sirf mazaak hai.
        </p>
      </header>

      <div className="space-y-5 text-sm sm:text-base text-zinc-300 leading-relaxed">
        <p>
          <strong className="text-white">AUKAAT DIKHAO</strong> ek tongue-in-cheek Hinglish meme experiment aur live All-India leaderboard hai. Concept ekdum simple hai: log apna naam aur ek cheeky message daalkar flex karte hain—aur jo sabse zyada total pay karta hai, woh ban jaata hai <strong className="text-amber-400">AAJ KA BADSHAH</strong>.
        </p>

        <p>
          Jaise hi aap Razorpay checkout complete karte hain, server webhook real-time mein aapka score update karta hai aur poore Desh ke open screens par live ticker aur tier-wise celebration popup chalta hai!
        </p>

        <section className="space-y-3 pt-2">
          <h2 className="font-display font-bold text-lg text-white">
            Aukaat Tiers (Rank Badges &amp; Effects)
          </h2>
          <div className="bg-[#12101C] border border-white/10 rounded-2xl divide-y divide-white/10">
            {TIERS.map((tier) => (
              <div
                key={tier.id}
                className="px-4 py-3 flex items-center justify-between gap-4"
              >
                <div>
                  <span className={`font-display font-extrabold text-base ${tier.nameClass}`}>
                    {tier.title}
                  </span>
                  <p className="text-xs text-zinc-400">{tier.subtitle}</p>
                </div>
                <span className="font-mono-num text-xs sm:text-sm font-bold text-zinc-200 shrink-0">
                  {tier.max === Infinity ? `₹${tier.min}+` : `₹${tier.min} – ₹${tier.max}`}
                </span>
              </div>
            ))}
          </div>
        </section>

        <p className="text-xs sm:text-sm text-zinc-400 pt-2">
          Yaad rakho: <strong className="text-zinc-200">Ye sirf mazaak hai. Paisa sochke dena.</strong>
        </p>
      </div>
    </article>
  );
}

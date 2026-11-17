import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export function TermsPage() {
  useEffect(() => {
    document.title = 'Terms & Conditions — AUKAAT DIKHAO';
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
          Terms &amp; Conditions
        </h1>
        <p className="text-sm text-zinc-400">
          Simple rules — padh lo taaki baad mein koi confusion na ho.
        </p>
      </header>

      <div className="space-y-5 text-sm sm:text-base text-zinc-300 leading-relaxed">
        <section className="space-y-2">
          <h2 className="font-display font-bold text-lg text-white">
            1. Entertainment-Only Digital Leaderboard
          </h2>
          <p>
            AUKAAT DIKHAO sirf mazaak aur entertainment ke liye banaya gaya ek digital leaderboard hai. Yahan kisi tarah ka physical product, service, investment, lottery, ya prize nahi diya jaata.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-display font-bold text-lg text-white">
            2. Age Requirement (18+ Only)
          </h2>
          <p>
            Payment karne ke liye aapki umar kam se kam <strong className="text-white">18 saal</strong> honi chahiye. Checkout se pehle aapko confirm karna zaroori hai ki aap 18+ hain aur apne khud ke valid payment method se pay kar rahe hain.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-display font-bold text-lg text-white">
            3. Name &amp; Message Moderation
          </h2>
          <p>
            Gaali-galoch, hate speech, harassment, doxxing, phone numbers, ya kisi bhi illegal/abusive content wale names aur messages ko bina notice ke edit ya delete kiya ja sakta hai—aur is case mein koi refund nahi milega.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-display font-bold text-lg text-white">
            4. No Guarantee of Rank Permanence
          </h2>
          <p>
            Aapka #1 ya koi bhi rank permanent nahi hai. Jaise hi koi aur user aapke total se zyada pay karega, aapka rank neeche aa jayega. Website uptime ya leaderboard permanence ki koi permanent guarantee nahi hai.
          </p>
        </section>
      </div>
    </article>
  );
}

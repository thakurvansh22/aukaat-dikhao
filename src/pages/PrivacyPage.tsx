import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export function PrivacyPage() {
  useEffect(() => {
    document.title = 'Privacy Policy — AUKAAT DIKHAO';
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
          Privacy Policy
        </h1>
        <p className="text-sm text-zinc-400">
          Hum kya data lete hain aur kya nahi — seedhi baat, no bakwaas.
        </p>
      </header>

      <div className="space-y-5 text-sm sm:text-base text-zinc-300 leading-relaxed">
        <section className="space-y-2">
          <h2 className="font-display font-bold text-lg text-white">
            1. What We Collect (Kya Store Hota Hai)
          </h2>
          <p>
            Jab aap AUKAAT DIKHAO par participate karte hain, hum sirf wohi details store karte hain jo leaderboard aur live feed dikhane ke liye zaroori hain:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-zinc-300">
            <li>
              <strong className="text-white">Display Name (Naam):</strong> Jo naam aap form mein likhte hain (publicly leaderboard aur ticker par dikhta hai).
            </li>
            <li>
              <strong className="text-white">Optional Message ("Mera bhaav"):</strong> Agar aap koi ek-line message likhte hain, woh bhi publicly leaderboard par dikhta hai.
            </li>
            <li>
              <strong className="text-white">Payment Reference / Razorpay Payment ID:</strong> Server webhook ke through payment verify karne aur duplicate entries rokne ke liye payment ID aur paid amount record hota hai.
            </li>
          </ul>
        </section>

        <section className="space-y-2">
          <h2 className="font-display font-bold text-lg text-white">
            2. Payment Processing (Razorpay)
          </h2>
          <p>
            Saare payments securely <strong className="text-amber-400">Razorpay</strong> ke through process hote hain. Hum aapka card number, CVV, bank login, ya UPI PIN kabhi bhi collect, dekh, ya store nahi karte.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-display font-bold text-lg text-white">
            3. Public Visibility &amp; Cookies
          </h2>
          <p>
            Kyunki ye ek public meme leaderboard hai, aapka chosen Naam, total ₹ amount, aur message sabko dikhta hai. Hum unnecessary ad-tracking cookies use nahi karte—sirf basic browser session state rakhte hain taaki aap apna rank share kar sakein.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-display font-bold text-lg text-white">
            4. Data Removal Requests
          </h2>
          <p>
            Agar aapko apna public display name ya message leaderboard se hatwana hai, toh{' '}
            <Link to="/contact" className="text-amber-400 underline hover:text-amber-300">
              Contact page
            </Link>{' '}
            ke zariye payment ID ke saath email karein.
          </p>
        </section>
      </div>
    </article>
  );
}

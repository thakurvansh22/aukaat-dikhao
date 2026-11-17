import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export function RefundPage() {
  useEffect(() => {
    document.title = 'Refund Policy — AUKAAT DIKHAO';
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
          Refund &amp; Cancellation Policy
        </h1>
        <p className="text-sm text-zinc-400">
          Paisa sochke dena — saari payments final hoti hain.
        </p>
      </header>

      <div className="space-y-5 text-sm sm:text-base text-zinc-300 leading-relaxed">
        <section className="space-y-2">
          <h2 className="font-display font-bold text-lg text-white">
            1. All Payments Are Final &amp; Non-Refundable
          </h2>
          <p>
            Kyunki ye ek instant digital entertainment leaderboard hai aur payment confirm hote hi aapka naam aur popup live ho jaata hai, isliye <strong className="text-amber-400">saare payments 100% final aur non-refundable hain</strong>. Rank neeche aane, mann badalne, ya galti se zyada amount daalne par refund nahi diya jaayega.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-display font-bold text-lg text-white">
            2. Exceptions (Failed or Duplicate Charges Only)
          </h2>
          <p>
            Refund sirf in 2 technical cases mein consider kiya jaata hai:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>
              <strong className="text-white">Failed Transaction:</strong> Paisa bank/UPI se kat gaya par Razorpay payment fail dikhaya aur leaderboard update nahi hua (mostly bank 5–7 working days mein auto-refund kar deta hai).
            </li>
            <li>
              <strong className="text-white">Duplicate Charge:</strong> Ek hi attempt ke liye galti se do baar paise kat gaye aur dono charge ho gaye.
            </li>
          </ul>
        </section>

        <section className="space-y-2">
          <h2 className="font-display font-bold text-lg text-white">
            3. How to Claim (Contact Within 7 Days)
          </h2>
          <p>
            Agar aapko failed ya duplicate charge ka issue aaya hai, toh payment ke <strong className="text-white">7 din ke andar</strong> apna Razorpay Payment ID, date, aur amount ke saath{' '}
            <Link to="/contact" className="text-amber-400 underline hover:text-amber-300">
              Contact page
            </Link>{' '}
            par email karein. Verify hone par eligible refund 5–7 business days mein original payment method par process kar diya jaayega.
          </p>
        </section>
      </div>
    </article>
  );
}

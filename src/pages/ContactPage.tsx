import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Check, Copy, Mail } from 'lucide-react';

const CONTACT_EMAIL = 'CONTACT_EMAIL_HERE';

export function ContactPage() {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    document.title = 'Contact Us — AUKAAT DIKHAO';
  }, []);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(CONTACT_EMAIL);
    } catch {
      // Fallback ignored
    }
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2000);
  };

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
          Contact Us
        </h1>
        <p className="text-sm text-zinc-400">
          Koi payment issue, duplicate charge, ya moderation request? Seedha email karo.
        </p>
      </header>

      <div className="bg-[#12101C] border border-white/10 rounded-2xl p-5 sm:p-6 space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-400/15 border border-amber-400/30 flex items-center justify-center shrink-0">
            <Mail className="w-5 h-5 text-amber-400" />
          </div>
          <div>
            <p className="text-xs text-zinc-400 font-medium">Support Email</p>
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="font-mono-num font-bold text-base sm:text-lg text-white hover:text-amber-400 transition-colors break-all"
            >
              {CONTACT_EMAIL}
            </a>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3 pt-1">
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="min-h-[44px] px-4 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-black font-display font-extrabold text-xs sm:text-sm inline-flex items-center gap-2 transition-colors"
          >
            <Mail className="w-4 h-4" />
            <span>Email Bhejo</span>
          </a>

          <button
            type="button"
            onClick={handleCopy}
            className="min-h-[44px] px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs sm:text-sm font-semibold text-zinc-200 inline-flex items-center gap-2 cursor-pointer transition-colors"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-emerald-400" />
                <span className="text-emerald-300">Email Copied</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4 text-purple-300" />
                <span>Copy Email</span>
              </>
            )}
          </button>
        </div>

        <p className="text-xs sm:text-sm text-zinc-400 pt-2 border-t border-white/10">
          Response time: Hum normally <strong className="text-zinc-200">48 hours</strong> ke andar reply karte hain. Payment issues ke liye apna Razorpay Payment ID aur amount zaroor likhein.
        </p>
      </div>
    </article>
  );
}

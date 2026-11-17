import React, { useState } from 'react';
import { CheckCircle2, Flame, Loader2 } from 'lucide-react';
import {
  containsProfanity,
  getTierForAmount,
  QUICK_AMOUNTS,
  TIERS,
} from '../lib/tiers';
import { createRazorpayOrder, loadRazorpayScript } from '../lib/razorpay';

interface PayFormProps {
  defaultName: string;
  onPaymentSubmitted: (name: string) => void;
}

export function PayForm({ defaultName, onPaymentSubmitted }: PayFormProps) {
  const [name, setName] = useState(defaultName);
  const [amountInput, setAmountInput] = useState('500');
  const [message, setMessage] = useState('');
  const [confirmedAgeAndTerms, setConfirmedAgeAndTerms] = useState(false);

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [successNotice, setSuccessNotice] = useState('');

  const numericAmount = Math.floor(Number(amountInput) || 0);
  const previewTier = getTierForAmount(
    Math.min(10000, Math.max(1, numericAmount || 1))
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccessNotice('');

    const cleanName = name.trim();
    const cleanMessage = message.trim().slice(0, 60);

    if (!cleanName) {
      setError('Bhai pehle apna Naam toh likho!');
      return;
    }
    if (cleanName.length > 20) {
      setError('Naam max 20 characters ka hona chahiye.');
      return;
    }
    if (containsProfanity(cleanName)) {
      setError('Bhai tameez wala naam daalo! Gaali-galoch allowed nahi hai.');
      return;
    }
    if (!numericAmount || numericAmount < 1 || numericAmount > 10000) {
      setError('Amount ₹1 se ₹10,000 ke beech hona chahiye!');
      return;
    }
    if (cleanMessage && containsProfanity(cleanMessage)) {
      setError('Message mein gaali-galoch mat daalo bhai, clean flex rakho.');
      return;
    }
    if (!confirmedAgeAndTerms) {
      setError('Aage badhne ke liye 18+ aur non-refundable checkbox tick karo.');
      return;
    }

    setSubmitting(true);

    let orderData;
    try {
      orderData = await createRazorpayOrder({
        name: cleanName,
        amount: numericAmount,
        message: cleanMessage,
      });
    } catch {
      setSubmitting(false);
      setError('Payment abhi available nahi hai, thodi der baad try karo.');
      return;
    }

    try {
      await loadRazorpayScript();
    } catch {
      setSubmitting(false);
      setError('Razorpay checkout load nahi ho paya. Internet check karke dubara try karo.');
      return;
    }

    if (!window.Razorpay) {
      setSubmitting(false);
      setError('Payment abhi available nahi hai, thodi der baad try karo.');
      return;
    }

    try {
      const rzp = new window.Razorpay({
        key: orderData.keyId,
        amount: orderData.amount,
        currency: 'INR',
        name: 'Aukaat Dikhao',
        description: 'Live Meme Leaderboard Flex',
        order_id: orderData.orderId,
        notes: orderData.notes,
        theme: {
          color: '#FFD60A',
        },
        handler: () => {
          setSubmitting(false);
          setError('');
          setSuccessNotice('Payment mil gayi! Leaderboard update ho raha hai ⏳');
          setMessage('');
          onPaymentSubmitted(cleanName);
        },
        modal: {
          ondismiss: () => {
            setSubmitting(false);
            setError('Payment cancel ho gayi! Koi baat nahi, himmat jutao aur dubara try karo.');
          },
        },
      });

      rzp.on('payment.failed', (resp) => {
        setSubmitting(false);
        const desc = resp?.error?.description;
        setError(
          desc
            ? `Payment fail ho gayi: ${desc}. Dubara try karo!`
            : 'Payment fail ho gayi! UPI ya card se dubara koshish karo.'
        );
      });

      rzp.open();
    } catch {
      setSubmitting(false);
      setError('Payment open karne mein dikkat aayi. Thodi der baad try karo.');
    }
  };

  return (
    <section className="bg-[#12101C] border border-white/10 rounded-2xl p-5 space-y-4">
      <div className="space-y-1">
        <h2 className="font-display font-extrabold text-xl text-white tracking-tight text-balance">
          Paisa Phenko, Rank Badhao
        </h2>
        <p className="text-xs text-zinc-400">
          Razorpay se instant payment karo aur All-India board par chhaa jao.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-3.5">
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label htmlFor="payer-name" className="text-xs font-semibold text-zinc-300">
              Tumhara Naam
            </label>
            <span className="text-[11px] font-mono-num text-zinc-500">
              {name.length}/20
            </span>
          </div>
          <input
            id="payer-name"
            type="text"
            value={name}
            maxLength={20}
            disabled={submitting}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Rahul_OP"
            className="w-full min-h-[46px] px-3.5 rounded-xl bg-[#08070E] border border-white/10 focus:border-amber-400 focus:outline-none text-sm font-semibold text-white placeholder:text-zinc-600 disabled:opacity-60"
          />
          <p className="mt-1.5 text-[11px] text-zinc-400">
            Same naam se dubara pay karoge toh total mein judd jayega.
          </p>
        </div>

        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label htmlFor="pay-amount" className="text-xs font-semibold text-zinc-300">
              Amount (₹1 – ₹10,000)
            </label>
            <span
              className="text-xs font-bold"
              style={{ color: previewTier.accentHex }}
            >
              {previewTier.title}
            </span>
          </div>

          <div className="relative">
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 font-mono-num font-bold text-amber-400 text-base">
              ₹
            </span>
            <input
              id="pay-amount"
              type="number"
              min={1}
              max={10000}
              step={1}
              disabled={submitting}
              value={amountInput}
              onChange={(e) => setAmountInput(e.target.value)}
              placeholder="500"
              className="w-full min-h-[48px] pl-8 pr-4 rounded-xl bg-[#08070E] border border-white/10 focus:border-amber-400 focus:outline-none text-lg font-mono-num font-bold text-white placeholder:text-zinc-600 disabled:opacity-60"
            />
          </div>

          <div className="grid grid-cols-3 sm:grid-cols-6 gap-1.5 mt-2">
            {QUICK_AMOUNTS.map((preset) => {
              const active = numericAmount === preset;
              return (
                <button
                  key={preset}
                  type="button"
                  disabled={submitting}
                  onClick={() => setAmountInput(String(preset))}
                  className={`min-h-[38px] px-2 py-1.5 rounded-lg font-mono-num text-xs font-bold transition-all cursor-pointer disabled:opacity-60 ${
                    active
                      ? 'bg-amber-400 text-black shadow-[0_0_12px_rgba(255,214,10,0.3)]'
                      : 'bg-[#08070E] border border-white/10 text-zinc-300 hover:border-amber-400/50 hover:text-white'
                  }`}
                >
                  ₹{preset}
                </button>
              );
            })}
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label htmlFor="payer-message" className="text-xs font-semibold text-zinc-300">
              Mera bhaav <span className="text-zinc-500 font-normal">(optional)</span>
            </label>
            <span className="text-[11px] font-mono-num text-zinc-500">
              {message.length}/60
            </span>
          </div>
          <input
            id="payer-message"
            type="text"
            value={message}
            maxLength={60}
            disabled={submitting}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Koi ek line flex maaro..."
            className="w-full min-h-[44px] px-3.5 rounded-xl bg-[#08070E] border border-white/10 focus:border-purple-500 focus:outline-none text-sm text-white placeholder:text-zinc-600 disabled:opacity-60"
          />
        </div>

        <label className="flex items-start gap-2.5 pt-1 cursor-pointer select-none">
          <input
            type="checkbox"
            checked={confirmedAgeAndTerms}
            disabled={submitting}
            onChange={(e) => setConfirmedAgeAndTerms(e.target.checked)}
            className="mt-0.5 w-4 h-4 rounded border-white/20 bg-[#08070E] accent-amber-400 shrink-0 cursor-pointer"
          />
          <span className="text-xs text-zinc-300 leading-relaxed">
            Main 18+ hoon aur samajhta hoon ki ye non-refundable hai.
          </span>
        </label>

        {error && (
          <p className="text-xs font-semibold text-rose-300 bg-rose-500/10 border border-rose-500/30 rounded-xl px-3.5 py-2.5">
            {error}
          </p>
        )}

        {successNotice && (
          <div className="text-xs font-semibold text-emerald-200 bg-emerald-500/15 border border-emerald-400/40 rounded-xl px-3.5 py-2.5 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{successNotice}</span>
          </div>
        )}

        <button
          type="submit"
          disabled={submitting}
          className="w-full min-h-[50px] px-6 py-3 rounded-xl bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500 hover:brightness-105 active:scale-[0.98] disabled:opacity-60 text-black font-display font-extrabold text-base tracking-wide shadow-[0_0_28px_rgba(255,214,10,0.28)] transition-all cursor-pointer flex items-center justify-center gap-2"
        >
          {submitting ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>Order Ban Raha Hai...</span>
            </>
          ) : (
            <>
              <Flame className="w-5 h-5 fill-black" />
              <span>Aukaat Dikhao</span>
            </>
          )}
        </button>
      </form>

      {/* Compact Tier Reference */}
      <div className="pt-3 border-t border-white/10">
        <p className="text-[11px] font-semibold text-zinc-400 mb-2">Aukaat Levels</p>
        <div className="grid grid-cols-2 gap-x-3 gap-y-1.5 text-xs">
          {TIERS.map((t) => (
            <div key={t.id} className="flex items-center justify-between gap-1.5 min-w-0">
              <span className={`font-bold truncate ${t.nameClass}`}>{t.title}</span>
              <span className="font-mono-num text-[11px] text-zinc-500 shrink-0">
                {t.max === Infinity ? `₹${t.min}+` : `₹${t.min}–${t.max}`}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

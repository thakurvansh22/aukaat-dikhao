import type React from 'react';

export type TierId = 'bhikari' | 'chai' | 'don' | 'seth' | 'ambani' | 'baap';

export interface TierConfig {
  id: TierId;
  title: string;
  min: number;
  max: number;
  nameClass: string;
  subtitle: string;
  accentHex: string;
  lines: string[];
}

export interface LeaderboardEntry {
  id: string;
  name: string;
  total: number;
  message: string;
  updatedAtMs: number;
}

export interface EventRecord {
  id: string;
  name: string;
  amount: number;
  message: string;
  createdAtMs: number;
}

export interface ActivePopup {
  id: string;
  name: string;
  amount: number;
  tier: TierConfig;
  line: string;
}

export interface OvertakeToast {
  id: string;
  overtaker: string;
  overtaken: string;
  newRank: number;
}

export const TIERS: TierConfig[] = [
  {
    id: 'bhikari',
    title: 'Chhota Bhikari',
    min: 1,
    max: 49,
    nameClass: 'text-zinc-400',
    subtitle: 'Chillar party',
    accentHex: '#a1a1aa',
    lines: [
      '😅 {name} ne ₹{amount} diye… bas itna? Chai bhi nahi aati isme!',
      '🪙 {name} ne ₹{amount} daale. Bhai chillar ghar bhool aaye kya?',
      '🙃 {name} ka ₹{amount} ka daan! Mandir ke bahar isse zyada milta hai.',
      '💀 {name} ne ₹{amount} bheje… network fee isse mehengi hogi!',
      '😂 {name} ne ₹{amount} lagaye. Aukaat loading… 2% complete.',
      '🤏 {name} ne ₹{amount} diye. Bhai UPI pin daalne ki mehnat kyun ki?',
    ],
  },
  {
    id: 'chai',
    title: 'Chai Wala Rich',
    min: 50,
    max: 199,
    nameClass: 'tier-chai-name',
    subtitle: 'Tapri sponsor',
    accentHex: '#4ade80',
    lines: [
      '💸 {name} ne ₹{amount} udaye! Tapri pe sabki cutting pakki!',
      '☕ {name} ne ₹{amount} phenke! Aaj samosa extra chutney ke saath!',
      '😎 {name} ne ₹{amount} diye. Mahine ke aakhri hafte mein bhi itni himmat!',
      '🛵 {name} ne ₹{amount} lagaye. Splendor ka petrol full karwa diya!',
      '💸 {name} ne ₹{amount} diye. Dost log party maangne wale hain ab!',
      '🧃 {name} ne ₹{amount} diye. Mummy kehti hai beta bada ho gaya!',
    ],
  },
  {
    id: 'don',
    title: 'Local Don',
    min: 200,
    max: 499,
    nameClass: 'tier-don-name',
    subtitle: 'Mohalle ka khauf',
    accentHex: '#38bdf8',
    lines: [
      '🕶️ {name} ne ₹{amount} thoke! Mohalle mein darr ka mahaul hai!',
      '🔥 {name} ne ₹{amount} diye! Auto wale bhi ab "Sahab" bolenge!',
      '💪 {name} ka ₹{amount} ka flex! Zomato pe bina coupon order karega aaj!',
      '🚨 {name} ne ₹{amount} chadhaye! Local Don ki entry ho chuki hai!',
      '🎉 {name} ne ₹{amount} lagaye. EMI bharke bhi itna swag!',
      '🏍️ {name} ne ₹{amount} daale. Pulsar ke silencer jaisa shor macha diya!',
    ],
  },
  {
    id: 'seth',
    title: 'Seth Ji',
    min: 500,
    max: 999,
    nameClass: 'tier-seth-name',
    subtitle: 'Tijori khul gayi',
    accentHex: '#ffd60a',
    lines: [
      '🔥 SETH JI AAGAYE: {name} ne ₹{amount} jhoke! Tijori khul gayi bhai!',
      '🪙 SETH JI KI ENTRY: {name} ₹{amount}! Waiter ko tip bhi note mein milegi!',
      '✨ SETH JI {name} ne ₹{amount} diye! AC 16° pe chalega aur darwaza khula!',
      '💰 {name} ₹{amount}! Seth Ji ne chashma pehen liya hai, sab line mein lago!',
      '🤑 SETH JI MODE ON: {name} ne ₹{amount} phenke! Chandi ke bartan nikalo!',
      '🎩 {name} ₹{amount}! Itne mein toh Goa plan cancel nahi hota!',
    ],
  },
  {
    id: 'ambani',
    title: 'Ambani ka Cousin',
    min: 1000,
    max: 4999,
    nameClass: 'tier-ambani-name',
    subtitle: 'Antilia VIP',
    accentHex: '#c084fc',
    lines: [
      '🚀 {name} ne ₹{amount} uda diye! Antilia mein guest room book hai lagta hai!',
      '💎 AMBANI KA COUSIN: {name} (₹{amount})! Jio ka tower inke naam pe hai!',
      '🎆 {name} ne ₹{amount} diye! Shaadi mein helicopter se phool barsaayega yeh!',
      '✨ {name} ₹{amount}! Papa ka business hai ya crypto ka jaadu?',
      '⚡ {name} ne ₹{amount} lagaye! Tax officer bhi status dekh ke shock hai!',
      '🥂 {name} ₹{amount}! Swag itna high ki leaderboard ka server garam ho gaya!',
    ],
  },
  {
    id: 'baap',
    title: 'AUKAAT KA BAAP',
    min: 5000,
    max: Infinity,
    nameClass: 'tier-baap-name',
    subtitle: 'Asli Badshah',
    accentHex: '#ff9500',
    lines: [
      '👑 NAYA BADSHAH: {name} (₹{amount})! Sab ghutno pe aao, Baap aaya hai!',
      '🌋 {name} ne ₹{amount} phode! Dharti hil gayi, leaderboard pighal gaya!',
      '👑 AUKAAT KA BAAP: {name} ₹{amount}! Forbes list wale phone mila rahe hain!',
      '⚡ {name} ne ₹{amount} diye! RBI se call aaya hai ki thoda dheere flex karo!',
      '🔥 {name} ₹{amount}! Ab iske aage koi kuch nahi bolega — full silence!',
      '💎 {name} ne ₹{amount} thoke! Leaderboard ab inki private property hai!',
    ],
  },
];

export const QUICK_AMOUNTS = [20, 99, 250, 500, 1500, 5000];

export function getTierForAmount(amount: number): TierConfig {
  return TIERS.find((t) => amount >= t.min && amount <= t.max) ?? TIERS[0];
}

export function formatINR(amount: number): string {
  return new Intl.NumberFormat('en-IN').format(amount);
}

export function pickRandomLine(
  tier: TierConfig,
  name: string,
  amount: number
): string {
  const raw = tier.lines[Math.floor(Math.random() * tier.lines.length)];
  return raw
    .replace(/\{name\}/g, name)
    .replace(/\{amount\}/g, formatINR(amount));
}

// Basic profanity/abuse filter (English + Hinglish)
const BLOCKED_TERMS = [
  'fuck',
  'shit',
  'bitch',
  'asshole',
  'bastard',
  'dick',
  'pussy',
  'whore',
  'slut',
  'cunt',
  'madarchod',
  'bhenchod',
  'behenchod',
  'bhosdike',
  'bhosdi',
  'chutiya',
  'chutiye',
  'gandu',
  'gaandu',
  'harami',
  'randi',
  'kamina',
  'kamine',
  'kutta',
  'kutte',
  'suar',
  'loda',
  'lauda',
  'lavda',
  'chodu',
  'mc',
  'bc',
  'mkc',
  'bkl',
  'lkb',
];

export function containsProfanity(text: string): boolean {
  const normalized = text
    .toLowerCase()
    .replace(/[0]/g, 'o')
    .replace(/[1!]/g, 'i')
    .replace(/[3]/g, 'e')
    .replace(/[@4]/g, 'a')
    .replace(/[$5]/g, 's')
    .replace(/[^a-z\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

  if (!normalized) return false;

  const words = normalized.split(' ');
  for (const word of words) {
    if (BLOCKED_TERMS.includes(word)) return true;
  }

  const compact = normalized.replace(/\s+/g, '');
  return BLOCKED_TERMS.some(
    (term) => term.length >= 4 && compact.includes(term)
  );
}

export function playTierSound(
  tierId: TierId,
  audioCtxRef: React.MutableRefObject<AudioContext | null>
): void {
  try {
    const AudioCtx =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext })
        .webkitAudioContext;
    if (!AudioCtx) return;
    if (!audioCtxRef.current) {
      audioCtxRef.current = new AudioCtx();
    }
    const ctx = audioCtxRef.current;
    if (ctx.state === 'suspended') {
      void ctx.resume();
    }
    const now = ctx.currentTime;

    const playNote = (
      freq: number,
      startOffset: number,
      duration: number,
      type: OscillatorType = 'triangle',
      gainPeak = 0.14,
      slideToFreq?: number
    ) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, now + startOffset);
      if (slideToFreq) {
        osc.frequency.exponentialRampToValueAtTime(
          slideToFreq,
          now + startOffset + duration
        );
      }
      gain.gain.setValueAtTime(0.001, now + startOffset);
      gain.gain.linearRampToValueAtTime(gainPeak, now + startOffset + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0008, now + startOffset + duration);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now + startOffset);
      osc.stop(now + startOffset + duration + 0.02);
    };

    switch (tierId) {
      case 'bhikari':
        playNote(310, 0, 0.18, 'triangle', 0.12, 210);
        playNote(200, 0.19, 0.32, 'sawtooth', 0.08, 120);
        break;
      case 'chai':
        playNote(987.77, 0, 0.08, 'sine', 0.14);
        playNote(1318.51, 0.08, 0.22, 'sine', 0.14);
        break;
      case 'don':
        playNote(440, 0, 0.1, 'triangle', 0.12);
        playNote(554.37, 0.09, 0.1, 'triangle', 0.12);
        playNote(659.25, 0.18, 0.25, 'triangle', 0.14);
        break;
      case 'seth':
        playNote(523.25, 0, 0.12, 'triangle', 0.13);
        playNote(659.25, 0.08, 0.12, 'triangle', 0.13);
        playNote(783.99, 0.16, 0.12, 'triangle', 0.13);
        playNote(1046.5, 0.24, 0.35, 'sine', 0.16);
        break;
      case 'ambani':
        playNote(160, 0, 0.2, 'sine', 0.18, 640);
        playNote(523.25, 0.2, 0.45, 'triangle', 0.12);
        playNote(659.25, 0.24, 0.45, 'triangle', 0.12);
        playNote(783.99, 0.28, 0.45, 'triangle', 0.12);
        playNote(1046.5, 0.32, 0.55, 'sine', 0.15);
        break;
      case 'baap':
        playNote(110, 0, 0.45, 'sawtooth', 0.18, 45);
        playNote(392.0, 0.08, 0.14, 'square', 0.08);
        playNote(523.25, 0.22, 0.14, 'square', 0.09);
        playNote(659.25, 0.36, 0.16, 'square', 0.09);
        playNote(783.99, 0.52, 0.65, 'triangle', 0.16);
        playNote(1046.5, 0.52, 0.7, 'sine', 0.16);
        break;
    }
  } catch {
    // Ignore audio errors
  }
}

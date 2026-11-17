import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import {
  collection,
  limit,
  onSnapshot,
  orderBy,
  query,
  Timestamp,
} from 'firebase/firestore';
import { db, getTimestampMs } from './lib/firebase';
import {
  pickRandomLine,
  playTierSound,
  getTierForAmount,
  type ActivePopup,
  type EventRecord,
  type LeaderboardEntry,
  type OvertakeToast,
} from './lib/tiers';
import { ErrorBoundary } from './components/ErrorBoundary';
import { Ticker } from './components/Ticker';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { PopupManager } from './components/PopupManager';
import { HomePage } from './pages/HomePage';
import { PrivacyPage } from './pages/PrivacyPage';
import { TermsPage } from './pages/TermsPage';
import { RefundPage } from './pages/RefundPage';
import { ContactPage } from './pages/ContactPage';
import { AboutPage } from './pages/AboutPage';
import { NotFoundPage } from './pages/NotFoundPage';

function AppShell() {
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);
  const [tickerItems, setTickerItems] = useState<EventRecord[]>([]);
  const [loadingBoard, setLoadingBoard] = useState<boolean>(true);
  const [firestoreError, setFirestoreError] = useState<string>('');
  const [currentUserName, setCurrentUserName] = useState<string>('');
  const [soundEnabled, setSoundEnabled] = useState<boolean>(false);
  const [popupQueue, setPopupQueue] = useState<ActivePopup[]>([]);
  const [overtakeToast, setOvertakeToast] = useState<OvertakeToast | null>(null);
  const [shareCopied, setShareCopied] = useState<boolean>(false);
  const [shakeScreen, setShakeScreen] = useState<boolean>(false);

  const audioCtxRef = useRef<AudioContext | null>(null);
  const pageLoadTimeRef = useRef<number>(Date.now());
  const initialEventsLoadedRef = useRef<boolean>(false);
  const seenEventIdsRef = useRef<Set<string>>(new Set());
  const initialBoardLoadedRef = useRef<boolean>(false);
  const prevBoardRef = useRef<LeaderboardEntry[]>([]);
  const lastSoundPopupIdRef = useRef<string>('');

  // Read-only real-time listener for top 50 leaderboard entries
  useEffect(() => {
    const lbQuery = query(
      collection(db, 'leaderboard'),
      orderBy('total', 'desc'),
      limit(50)
    );

    const unsub = onSnapshot(
      lbQuery,
      (snapshot) => {
        const nextList: LeaderboardEntry[] = snapshot.docs.map((docSnap) => {
          const data = docSnap.data();
          return {
            id: docSnap.id,
            name: String(data.name || docSnap.id),
            total: Number(data.total || 0),
            message: String(data.message || ''),
            updatedAtMs: getTimestampMs(data.updatedAt),
          };
        });

        // Detect live rank overtakes after initial snapshot
        if (initialBoardLoadedRef.current && prevBoardRef.current.length > 0) {
          const prevList = prevBoardRef.current;
          for (let newIdx = 0; newIdx < nextList.length; newIdx++) {
            const candidate = nextList[newIdx];
            const oldIdx = prevList.findIndex((p) => p.id === candidate.id);
            const effectiveOldIdx = oldIdx >= 0 ? oldIdx : prevList.length;
            if (
              newIdx < effectiveOldIdx &&
              prevList[newIdx] &&
              prevList[newIdx].id !== candidate.id
            ) {
              setOvertakeToast({
                id: `ov-${Date.now()}-${candidate.id}`,
                overtaker: candidate.name,
                overtaken: prevList[newIdx].name,
                newRank: newIdx + 1,
              });
              break;
            }
          }
        }

        initialBoardLoadedRef.current = true;
        prevBoardRef.current = nextList;
        setEntries(nextList);
        setLoadingBoard(false);
        setFirestoreError('');
      },
      (err) => {
        setLoadingBoard(false);
        setFirestoreError(
          `Leaderboard load nahi ho paaya: ${err.message}`
        );
      }
    );

    return () => unsub();
  }, []);

  // Read-only real-time listener for latest 10 events (ticker + live popups)
  useEffect(() => {
    const eventsQuery = query(
      collection(db, 'events'),
      orderBy('createdAt', 'desc'),
      limit(10)
    );

    const unsub = onSnapshot(
      eventsQuery,
      (snapshot) => {
        const latestTen: EventRecord[] = snapshot.docs.map((docSnap) => {
          const data = docSnap.data();
          return {
            id: docSnap.id,
            name: String(data.name || ''),
            amount: Number(data.amount || 0),
            message: String(data.message || ''),
            createdAtMs: getTimestampMs(data.createdAt),
          };
        });

        setTickerItems(latestTen);

        if (!initialEventsLoadedRef.current) {
          snapshot.docs.forEach((docSnap) => seenEventIdsRef.current.add(docSnap.id));
          initialEventsLoadedRef.current = true;
          return;
        }

        const newPopups: ActivePopup[] = [];
        for (const change of snapshot.docChanges()) {
          if (change.type !== 'added') continue;
          if (seenEventIdsRef.current.has(change.doc.id)) continue;

          seenEventIdsRef.current.add(change.doc.id);
          const data = change.doc.data();
          const hasTimestamp = data.createdAt instanceof Timestamp;
          const createdMs = hasTimestamp
            ? data.createdAt.toMillis()
            : Date.now();

          // Ignore old events created before page load
          if (createdMs < pageLoadTimeRef.current - 30000) {
            continue;
          }

          const payerName = String(data.name || 'Anonymous');
          const payAmount = Number(data.amount || 1);
          const tier = getTierForAmount(payAmount);
          const line = pickRandomLine(tier, payerName, payAmount);

          newPopups.push({
            id: `pop-${change.doc.id}-${Date.now()}`,
            name: payerName,
            amount: payAmount,
            tier,
            line,
          });
        }

        if (newPopups.length > 0) {
          setPopupQueue((prev) => [...prev, ...newPopups]);
        }
      },
      (err) => {
        console.error('Events listener error:', err);
      }
    );

    return () => unsub();
  }, []);

  const activePopup = popupQueue[0] ?? null;

  useEffect(() => {
    if (!activePopup) return;
    if (lastSoundPopupIdRef.current === activePopup.id) return;
    lastSoundPopupIdRef.current = activePopup.id;

    if (activePopup.tier.id === 'baap') {
      setShakeScreen(true);
      window.setTimeout(() => setShakeScreen(false), 750);
    }

    if (soundEnabled) {
      playTierSound(activePopup.tier.id, audioCtxRef);
    }
  }, [activePopup, soundEnabled]);

  const handleDismissPopup = useCallback(() => {
    setPopupQueue((prev) => prev.slice(1));
  }, []);

  const currentUserRank = useMemo(() => {
    if (!currentUserName.trim()) return null;
    const idx = entries.findIndex(
      (e) => e.name.toLowerCase() === currentUserName.trim().toLowerCase()
    );
    return idx >= 0 ? idx + 1 : null;
  }, [entries, currentUserName]);

  const handleToggleSound = () => {
    const next = !soundEnabled;
    setSoundEnabled(next);
    if (next) {
      playTierSound('chai', audioCtxRef);
    }
  };

  const handleShareRank = async () => {
    const text = currentUserRank
      ? `Main #${currentUserRank} hoon Aukaat Dikhao pe, tum kaha ho? 😎`
      : 'Aaja Aukaat Dikhao pe, dekhte hain kaun banta hai Aaj Ka Badshah! 👑';
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      const el = document.createElement('textarea');
      el.value = text;
      document.body.appendChild(el);
      el.select();
      document.execCommand('copy');
      document.body.removeChild(el);
    }
    setShareCopied(true);
    window.setTimeout(() => setShareCopied(false), 2200);
  };

  return (
    <div
      className={`min-h-screen flex flex-col bg-[#08070E] text-zinc-100 relative ${
        shakeScreen ? 'animate-screen-shake' : ''
      }`}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 overflow-hidden"
      >
        <div className="absolute -top-40 left-1/4 w-[420px] h-[420px] rounded-full bg-purple-700/15 blur-[130px]" />
        <div className="absolute top-1/3 right-1/5 w-[360px] h-[360px] rounded-full bg-amber-500/10 blur-[120px]" />
      </div>

      <Ticker items={tickerItems} />

      <Header
        soundEnabled={soundEnabled}
        onToggleSound={handleToggleSound}
        onShareRank={handleShareRank}
        shareCopied={shareCopied}
        currentUserRank={currentUserRank}
      />

      <main className="flex-1 w-full relative z-10">
        <Routes>
          <Route
            path="/"
            element={
              <HomePage
                entries={entries}
                loadingBoard={loadingBoard}
                firestoreError={firestoreError}
                currentUserName={currentUserName}
                onPaymentSubmitted={(name) => setCurrentUserName(name)}
                onShareRank={handleShareRank}
              />
            }
          />
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="/terms" element={<TermsPage />} />
          <Route path="/refund" element={<RefundPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>

      <Footer />

      <PopupManager
        popup={activePopup}
        overtake={overtakeToast}
        onDismissPopup={handleDismissPopup}
        onDismissOvertake={() => setOvertakeToast(null)}
      />
    </div>
  );
}

export default function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <AppShell />
      </BrowserRouter>
    </ErrorBoundary>
  );
}

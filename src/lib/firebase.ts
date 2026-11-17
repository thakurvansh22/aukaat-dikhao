import { initializeApp } from 'firebase/app';
import { getFirestore, Timestamp } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyBZQJvUBXncNEXZmhhBZegC-3ZM-L7aWwo',
  authDomain: 'aukaat-dikhao.firebaseapp.com',
  projectId: 'aukaat-dikhao',
  storageBucket: 'aukaat-dikhao.firebasestorage.app',
  messagingSenderId: '339241216604',
  appId: '1:339241216604:web:904c60402be9af8dd7d499',
};

const app = initializeApp(firebaseConfig);

// Client is strictly READ-ONLY. All Firestore writes are handled server-side by webhook.
export const db = getFirestore(app);

export function getTimestampMs(value: unknown): number {
  if (value instanceof Timestamp) {
    return value.toMillis();
  }
  if (
    value &&
    typeof value === 'object' &&
    'toMillis' in value &&
    typeof (value as { toMillis: () => number }).toMillis === 'function'
  ) {
    return (value as { toMillis: () => number }).toMillis();
  }
  return Date.now();
}

export interface CreateOrderPayload {
  name: string;
  amount: number;
  message: string;
}

export interface CreateOrderResponse {
  orderId: string;
  keyId: string;
  amount: number;
  notes?: Record<string, string>;
}

export interface RazorpayCheckoutOptions {
  key: string;
  amount: number;
  currency?: string;
  name: string;
  description?: string;
  order_id: string;
  notes?: Record<string, string>;
  theme?: {
    color?: string;
  };
  handler: (response: {
    razorpay_payment_id: string;
    razorpay_order_id: string;
    razorpay_signature: string;
  }) => void;
  modal?: {
    ondismiss?: () => void;
  };
}

export interface RazorpayInstance {
  open: () => void;
  on: (
    event: 'payment.failed',
    callback: (response: { error?: { description?: string } }) => void
  ) => void;
}

declare global {
  interface Window {
    Razorpay?: new (options: RazorpayCheckoutOptions) => RazorpayInstance;
  }
}

let razorpayScriptPromise: Promise<void> | null = null;

export function loadRazorpayScript(): Promise<void> {
  if (typeof window !== 'undefined' && window.Razorpay) {
    return Promise.resolve();
  }
  if (razorpayScriptPromise) {
    return razorpayScriptPromise;
  }

  razorpayScriptPromise = new Promise<void>((resolve, reject) => {
    const existing = document.querySelector<HTMLScriptElement>(
      'script[src="https://checkout.razorpay.com/v1/checkout.js"]'
    );
    if (existing) {
      existing.addEventListener('load', () => resolve(), { once: true });
      existing.addEventListener(
        'error',
        () => {
          razorpayScriptPromise = null;
          reject(new Error('Razorpay script failed to load'));
        },
        { once: true }
      );
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => {
      razorpayScriptPromise = null;
      reject(new Error('Razorpay script failed to load'));
    };
    document.body.appendChild(script);
  });

  return razorpayScriptPromise;
}

export async function createRazorpayOrder(
  payload: CreateOrderPayload
): Promise<CreateOrderResponse> {
  const res = await fetch('/api/create-order', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    throw new Error(`ORDER_API_ERROR_${res.status}`);
  }

  const data = (await res.json()) as Partial<CreateOrderResponse>;
  if (!data.orderId || !data.keyId || typeof data.amount !== 'number') {
    throw new Error('INVALID_ORDER_RESPONSE');
  }

  return {
    orderId: data.orderId,
    keyId: data.keyId,
    amount: data.amount,
    notes: data.notes,
  };
}

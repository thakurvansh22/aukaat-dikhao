import { recordPayment } from "../../server/firestore.js";

async function verify(body, sig, secret) {
  const enc = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw", enc.encode(secret), { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
  const mac = await crypto.subtle.sign("HMAC", key, enc.encode(body));
  const hex = [...new Uint8Array(mac)].map((b) => b.toString(16).padStart(2, "0")).join("");
  return hex === sig;
}

export async function onRequestPost({ request, env }) {
  const raw = await request.text();
  const sig = request.headers.get("x-razorpay-signature") || "";
  if (!(await verify(raw, sig, env.RAZORPAY_WEBHOOK_SECRET))) {
    return new Response("bad signature", { status: 400 });
  }
  const ev = JSON.parse(raw);
  if (ev.event !== "order.paid") return new Response("ignored", { status: 200 });

  const pay = ev.payload.payment.entity;
  const order = ev.payload.order.entity;
  const name = String(order.notes?.name || "Anonymous").slice(0, 20);
  const message = String(order.notes?.message || "").slice(0, 60);
  const amount = Math.floor(order.amount_paid / 100);

  try {
    await recordPayment(env, { payId: pay.id, name, amount, message });
    return new Response("ok", { status: 200 });
  } catch (e) {
    return new Response("error", { status: 500 }); // Razorpay will retry
  }
}
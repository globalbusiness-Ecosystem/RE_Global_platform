"use client";
import { useState } from "react";

declare global {
  interface Window { Pi: any; }
}

export function usePiPayment() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const initPi = () => {
    if (typeof window !== "undefined" && window.Pi) {
      window.Pi.init({ version: "2.0", sandbox: true }); // Testnet
      return true;
    }
    return false;
  };

  const login = async () => {
    if (!initPi()) { setError("افتح في Pi Browser"); return null; }
    try {
      const auth = await window.Pi.authenticate(
        ["username", "payments"],
        async (payment: any) => {
          await fetch("/api/pi/incomplete", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ payment }),
          });
        }
      );
      return auth.user;
    } catch (e) {
      setError("فشل تسجيل الدخول");
      return null;
    }
  };

  const pay = async (amount: number, memo: string, metadata: Record<string, any>) => {
    if (!initPi()) { setError("افتح في Pi Browser"); return null; }
    setLoading(true);
    setError(null);

    return new Promise((resolve, reject) => {
      window.Pi.createPayment({ amount, memo, metadata }, {
        onReadyForServerApproval: async (paymentId: string) => {
          try {
            await fetch("/api/pi/approve", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ paymentId }),
            });
          } catch (e) { console.error("Approval error:", e); }
        },
        onReadyForServerCompletion: async (paymentId: string, txid: string) => {
          try {
            await fetch("/api/pi/complete", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ paymentId, txid }),
            });
            setLoading(false);
            resolve({ paymentId, txid, amount, memo });
          } catch (e) { setLoading(false); reject(e); }
        },
        onCancel: () => { setLoading(false); setError("تم إلغاء الدفعة"); reject("cancelled"); },
        onError: (err: any) => { setLoading(false); setError("خطأ: " + (err?.message || "حاول مرة أخرى")); reject(err); },
      });
    });
  };

  return { login, pay, loading, error };
}

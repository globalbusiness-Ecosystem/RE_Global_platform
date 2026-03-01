"use client";
import { useState } from "react";

declare global {
  interface Window {
    Pi: any;
  }
}

export interface PaymentResult {
  paymentId: string;
  txid: string;
  amount: number;
  memo: string;
}

export function usePiPayment() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const initPi = () => {
    if (typeof window !== "undefined" && window.Pi) {
      window.Pi.init({ version: "2.0", sandbox: false });
      return true;
    }
    return false;
  };

  const login = async () => {
    if (!initPi()) {
      setError("افتح المنصة في Pi Browser");
      return null;
    }
    try {
      const auth = await window.Pi.authenticate(
        ["username", "payments"],
        (payment: any) => console.log("Incomplete payment:", payment)
      );
      return auth.user;
    } catch (e) {
      setError("فشل تسجيل الدخول");
      return null;
    }
  };

  const pay = async (
    amount: number,
    memo: string,
    metadata: Record<string, any>
  ): Promise<PaymentResult | null> => {
    if (!initPi()) {
      setError("افتح المنصة في Pi Browser");
      return null;
    }

    setLoading(true);
    setError(null);

    return new Promise((resolve, reject) => {
      window.Pi.createPayment(
        { amount, memo, metadata },
        {
          onReadyForServerApproval: (paymentId: string) => {
            console.log("Approval needed:", paymentId);
          },
          onReadyForServerCompletion: (paymentId: string, txid: string) => {
            setLoading(false);
            resolve({ paymentId, txid, amount, memo });
          },
          onCancel: () => {
            setLoading(false);
            setError("تم إلغاء الدفعة");
            reject("cancelled");
          },
          onError: (err: any) => {
            setLoading(false);
            setError("خطأ في الدفعة: " + (err?.message || "حاول مرة أخرى"));
            reject(err);
          },
        }
      );
    });
  };

  return { login, pay, loading, error };
}

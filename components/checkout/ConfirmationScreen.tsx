"use client"

import Link from "next/link"
import { CheckCircle2, Download, Share2, ArrowLeft, Home, MapPin } from "lucide-react"

interface Property {
  title: string
  location: string
  pricePi: number
  priceUSD: number
}

interface Props {
  property: Property
  paymentMethod: "pi" | "pi-usdt" | "card"
  onBack: () => void
}

const methodNames = {
  pi: "Pi Cryptocurrency",
  "pi-usdt": "Pi + USDT",
  card: "بطاقة ائتمانية",
}

export default function ConfirmationScreen({ property, paymentMethod, onBack }: Props) {
  const txId = "RE-" + Math.random().toString(36).substring(2, 10).toUpperCase()
  const date = new Date().toLocaleDateString("ar-SA", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  return (
    <div className="min-h-screen bg-background font-sans flex items-center justify-center p-4" dir="rtl">
      <div className="w-full max-w-lg">
        {/* Success card */}
        <div className="rounded-2xl border border-gold/30 bg-surface overflow-hidden">
          {/* Top banner */}
          <div className="bg-gold/10 border-b border-gold/20 px-6 py-8 flex flex-col items-center gap-4">
            <div className="relative">
              <div className="w-20 h-20 rounded-full bg-gold/20 border-2 border-gold flex items-center justify-center">
                <CheckCircle2 className="w-10 h-10 text-gold" />
              </div>
              {/* Pulse rings */}
              <div className="absolute inset-0 rounded-full border-2 border-gold/30 animate-ping" />
            </div>
            <div className="text-center">
              <h1 className="text-2xl font-bold text-foreground">تمت عملية الدفع بنجاح!</h1>
              <p className="text-muted text-sm mt-1">
                تهانينا! لقد أتممت شراء العقار بنجاح
              </p>
            </div>
          </div>

          {/* Transaction details */}
          <div className="p-6 flex flex-col gap-4">
            {/* Property info */}
            <div className="rounded-lg bg-background border border-border p-4 flex flex-col gap-2">
              <h3 className="font-bold text-foreground">{property.title}</h3>
              <div className="flex items-center gap-1.5 text-sm text-muted">
                <MapPin className="w-3.5 h-3.5 text-gold" />
                {property.location}
              </div>
            </div>

            {/* Details grid */}
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: "رقم المعاملة", value: txId },
                { label: "تاريخ الشراء", value: date },
                {
                  label: "المبلغ المدفوع",
                  value: `${property.pricePi.toLocaleString()} π`,
                },
                { label: "طريقة الدفع", value: methodNames[paymentMethod] },
              ].map((item) => (
                <div key={item.label} className="rounded-lg bg-background border border-border p-3">
                  <div className="text-xs text-muted">{item.label}</div>
                  <div className="text-sm font-semibold text-foreground mt-0.5 break-all">{item.value}</div>
                </div>
              ))}
            </div>

            {/* Status badge */}
            <div className="flex items-center justify-between rounded-lg bg-emerald-400/5 border border-emerald-400/20 px-4 py-3">
              <span className="text-sm text-muted">حالة الصفقة</span>
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-sm font-semibold text-emerald-400">مؤكدة ومسجلة</span>
              </div>
            </div>

            {/* Actions */}
            <div className="grid grid-cols-2 gap-3">
              <button className="flex items-center justify-center gap-2 border border-border rounded-lg py-2.5 text-sm text-foreground hover:border-gold/40 transition-colors">
                <Download className="w-4 h-4 text-gold" />
                تحميل العقد
              </button>
              <button className="flex items-center justify-center gap-2 border border-border rounded-lg py-2.5 text-sm text-foreground hover:border-gold/40 transition-colors">
                <Share2 className="w-4 h-4 text-gold" />
                مشاركة
              </button>
            </div>

            {/* Go home */}
            <Link
              href="/"
              className="w-full bg-gold hover:bg-gold/90 text-background font-bold py-3 rounded-lg flex items-center justify-center gap-2 transition-colors"
            >
              <Home className="w-4 h-4" />
              العودة إلى الرئيسية
            </Link>

            <button
              onClick={onBack}
              className="flex items-center justify-center gap-1.5 text-xs text-muted hover:text-gold transition-colors mx-auto"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              العودة للدفع
            </button>
          </div>
        </div>

        {/* Note */}
        <p className="text-center text-xs text-muted mt-4">
          سيتم إرسال تفاصيل الصفقة إلى بريدك الإلكتروني خلال دقائق
        </p>
      </div>
    </div>
  )
}

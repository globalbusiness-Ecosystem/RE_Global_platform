"use client"

import { ChevronLeft, Info, Tag, Percent } from "lucide-react"
import { cn } from "@/lib/utils"

interface Property {
  title: string
  priceUSD: number
  pricePi: number
}

interface OrderSummaryProps {
  property: Property
  paymentMethod: "pi" | "pi-usdt" | "card"
  step: number
  onNextStep: () => void
}

const fees = {
  pi: { platform: 0.01, transfer: 0 },
  "pi-usdt": { platform: 0.015, transfer: 0.005 },
  card: { platform: 0.02, transfer: 0.015 },
}

const methodLabels = {
  pi: "Pi فقط",
  "pi-usdt": "Pi + USDT",
  card: "بطاقة ائتمانية",
}

export default function OrderSummary({
  property,
  paymentMethod,
  step,
  onNextStep,
}: OrderSummaryProps) {
  const fee = fees[paymentMethod]
  const platformFee = Math.round(property.pricePi * fee.platform)
  const transferFee = Math.round(property.pricePi * fee.transfer)
  const total = property.pricePi + platformFee + transferFee

  return (
    <div className="sticky top-24 flex flex-col gap-4">
      {/* Main order card */}
      <div className="rounded-xl border border-gold/30 bg-surface overflow-hidden">
        {/* Header */}
        <div className="px-5 py-4 bg-gold/5 border-b border-gold/20">
          <h3 className="font-bold text-foreground text-base">ملخص الطلب</h3>
          <p className="text-xs text-muted mt-0.5">مراجعة تفاصيل الدفع</p>
        </div>

        <div className="p-5 flex flex-col gap-4">
          {/* Property name */}
          <div className="flex flex-col gap-1">
            <span className="text-xs text-muted">العقار</span>
            <span className="text-sm font-semibold text-foreground leading-tight">{property.title}</span>
          </div>

          {/* Divider */}
          <div className="border-t border-border" />

          {/* Price breakdown */}
          <div className="flex flex-col gap-2.5">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted">سعر العقار</span>
              <span className="font-semibold text-foreground">
                {property.pricePi.toLocaleString()} π
              </span>
            </div>

            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-1 text-muted">
                <span>رسوم المنصة</span>
                <Info className="w-3 h-3 text-muted/50" />
              </div>
              <span className="text-foreground">+{platformFee.toLocaleString()} π</span>
            </div>

            {transferFee > 0 && (
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted">رسوم التحويل</span>
                <span className="text-foreground">+{transferFee.toLocaleString()} π</span>
              </div>
            )}

            {/* Coupon input */}
            <div className="flex gap-2 mt-1">
              <input
                type="text"
                placeholder="كود الخصم"
                className="flex-1 bg-background border border-border rounded-lg px-3 py-2 text-xs text-foreground placeholder:text-muted focus:outline-none focus:border-gold"
              />
              <button className="bg-gold/10 hover:bg-gold/20 text-gold border border-gold/20 rounded-lg px-3 py-2 text-xs font-semibold transition-colors flex items-center gap-1">
                <Tag className="w-3 h-3" />
                تطبيق
              </button>
            </div>
          </div>

          {/* Total */}
          <div className="border-t border-border pt-4">
            <div className="flex items-center justify-between">
              <span className="font-bold text-foreground">الإجمالي</span>
              <div className="text-left">
                <div className="text-xl font-bold text-gold">{total.toLocaleString()} π</div>
                <div className="text-xs text-muted text-left">
                  ≈ ${(property.priceUSD * 1.025).toLocaleString()} USD
                </div>
              </div>
            </div>
          </div>

          {/* Payment method badge */}
          <div className="flex items-center justify-between bg-background rounded-lg px-3 py-2 border border-border">
            <span className="text-xs text-muted">طريقة الدفع</span>
            <span className="text-xs font-semibold text-gold">{methodLabels[paymentMethod]}</span>
          </div>

          {/* CTA for smaller screens */}
          {step < 3 && (
            <button
              onClick={onNextStep}
              className="w-full bg-gold hover:bg-gold/90 text-background font-bold py-3 rounded-lg flex items-center justify-center gap-2 transition-colors text-sm"
            >
              متابعة
              <ChevronLeft className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Trust badges */}
      <div className="rounded-xl border border-border bg-surface p-4 flex flex-col gap-2.5">
        <h4 className="text-xs font-semibold text-muted uppercase tracking-wider">ضمانات الحماية</h4>
        {[
          "دفع آمن ومشفر بالكامل",
          "ضمان استرداد خلال 14 يوم",
          "توثيق قانوني فوري للصفقة",
          "دعم عملاء 24/7",
        ].map((item) => (
          <div key={item} className="flex items-center gap-2 text-xs text-muted">
            <div className="w-4 h-4 rounded-full bg-gold/10 border border-gold/20 flex items-center justify-center flex-shrink-0">
              <svg className="w-2.5 h-2.5 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            {item}
          </div>
        ))}
      </div>

      {/* Pi rate */}
      <div className="rounded-xl border border-border bg-surface p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-gold font-bold text-sm">π</span>
            <span className="text-xs text-muted">سعر Pi الحالي</span>
          </div>
          <div className="text-left">
            <div className="text-sm font-bold text-foreground">$0.20</div>
            <div className="text-xs text-emerald-400 flex items-center gap-0.5 justify-end">
              <Percent className="w-2.5 h-2.5" />
              +2.4% اليوم
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

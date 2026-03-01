"use client"

import { cn } from "@/lib/utils"
import { CheckCircle2, Circle, ChevronLeft, Pencil } from "lucide-react"

type Method = "pi" | "pi-usdt" | "card"

const methods: {
  id: Method
  label: string
  desc: string
  icon: string
  badge?: string
}[] = [
  {
    id: "pi",
    label: "Pi فقط",
    desc: "ادفع بالكامل باستخدام عملة Pi",
    icon: "π",
    badge: "الأكثر شيوعاً",
  },
  {
    id: "pi-usdt",
    label: "Pi + USDT",
    desc: "ادفع جزءاً بـ Pi والباقي بـ USDT",
    icon: "π+₮",
  },
  {
    id: "card",
    label: "بطاقة ائتمانية",
    desc: "Visa / Mastercard / Mada",
    icon: "💳",
  },
]

interface PaymentMethodProps {
  isActive: boolean
  selected: Method
  onSelect: (m: Method) => void
  onNext: () => void
  onEdit: () => void
}

export default function PaymentMethod({
  isActive,
  selected,
  onSelect,
  onNext,
  onEdit,
}: PaymentMethodProps) {
  return (
    <section
      className={cn(
        "rounded-xl border bg-surface transition-all",
        isActive ? "border-gold/30" : "border-border opacity-60"
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-border">
        <div className="flex items-center gap-2">
          <span className="w-6 h-6 rounded-full bg-gold text-background text-xs font-bold flex items-center justify-center">
            2
          </span>
          <h2 className="font-semibold text-foreground text-base">طريقة الدفع</h2>
        </div>
        {!isActive && (
          <button
            onClick={onEdit}
            className="text-gold text-xs flex items-center gap-1 hover:underline"
          >
            <Pencil className="w-3 h-3" />
            تعديل
          </button>
        )}
        {isActive && <CheckCircle2 className="w-5 h-5 text-gold" />}
      </div>

      {/* Methods */}
      <div className="p-5 flex flex-col gap-3">
        {methods.map((m) => (
          <button
            key={m.id}
            onClick={() => onSelect(m.id)}
            className={cn(
              "w-full flex items-center gap-4 p-4 rounded-lg border text-right transition-all",
              selected === m.id
                ? "border-gold bg-gold/5"
                : "border-border bg-background hover:border-gold/40"
            )}
          >
            {/* Radio */}
            <div className="flex-shrink-0">
              {selected === m.id ? (
                <CheckCircle2 className="w-5 h-5 text-gold" />
              ) : (
                <Circle className="w-5 h-5 text-muted" />
              )}
            </div>

            {/* Icon */}
            <div className="w-10 h-10 rounded-lg bg-gold/10 border border-gold/20 flex items-center justify-center text-gold font-bold text-sm flex-shrink-0">
              {m.icon}
            </div>

            {/* Text */}
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-foreground">{m.label}</span>
                {m.badge && (
                  <span className="text-xs bg-gold text-background px-1.5 py-0.5 rounded font-medium">
                    {m.badge}
                  </span>
                )}
              </div>
              <p className="text-xs text-muted mt-0.5">{m.desc}</p>
            </div>
          </button>
        ))}

        {/* Pi + USDT split detail */}
        {selected === "pi-usdt" && (
          <div className="rounded-lg bg-background border border-border p-4 flex flex-col gap-3">
            <p className="text-sm text-muted">حدد نسبة الدفع بـ Pi</p>
            <input
              type="range"
              min={10}
              max={90}
              step={10}
              defaultValue={50}
              className="w-full accent-[#c9a84c]"
            />
            <div className="flex justify-between text-xs text-muted">
              <span>50% Pi</span>
              <span>50% USDT</span>
            </div>
          </div>
        )}

        {/* Card fields */}
        {selected === "card" && (
          <div className="rounded-lg bg-background border border-border p-4 flex flex-col gap-3">
            <input
              type="text"
              placeholder="رقم البطاقة"
              className="w-full bg-transparent border border-border rounded-lg px-3 py-2.5 text-sm text-foreground placeholder:text-muted focus:outline-none focus:border-gold"
            />
            <div className="grid grid-cols-2 gap-3">
              <input
                type="text"
                placeholder="MM / YY"
                className="bg-transparent border border-border rounded-lg px-3 py-2.5 text-sm text-foreground placeholder:text-muted focus:outline-none focus:border-gold"
              />
              <input
                type="text"
                placeholder="CVV"
                className="bg-transparent border border-border rounded-lg px-3 py-2.5 text-sm text-foreground placeholder:text-muted focus:outline-none focus:border-gold"
              />
            </div>
            <input
              type="text"
              placeholder="اسم حامل البطاقة"
              className="w-full bg-transparent border border-border rounded-lg px-3 py-2.5 text-sm text-foreground placeholder:text-muted focus:outline-none focus:border-gold"
            />
          </div>
        )}

        <button
          onClick={onNext}
          className="mt-2 w-full bg-gold hover:bg-gold/90 text-background font-bold py-3 rounded-lg flex items-center justify-center gap-2 transition-colors"
        >
          متابعة إلى بيانات المشتري
          <ChevronLeft className="w-4 h-4" />
        </button>
      </div>
    </section>
  )
}

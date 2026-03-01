"use client"

import { useState } from "react"
import { CheckCircle2, ChevronLeft, Pencil, Upload } from "lucide-react"
import { cn } from "@/lib/utils"

interface BuyerInfoProps {
  isActive: boolean
  onSubmit: () => void
  onEdit: () => void
}

export default function BuyerInfo({ isActive, onSubmit, onEdit }: BuyerInfoProps) {
  const [agreed, setAgreed] = useState(false)

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
            3
          </span>
          <h2 className="font-semibold text-foreground text-base">بيانات المشتري</h2>
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

      {isActive && (
        <div className="p-5 flex flex-col gap-4">
          {/* Personal info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs text-muted font-medium">الاسم الأول</label>
              <input
                type="text"
                placeholder="محمد"
                className="bg-background border border-border rounded-lg px-3 py-2.5 text-sm text-foreground placeholder:text-muted focus:outline-none focus:border-gold"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs text-muted font-medium">الاسم الأخير</label>
              <input
                type="text"
                placeholder="الأحمد"
                className="bg-background border border-border rounded-lg px-3 py-2.5 text-sm text-foreground placeholder:text-muted focus:outline-none focus:border-gold"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs text-muted font-medium">البريد الإلكتروني</label>
              <input
                type="email"
                placeholder="example@email.com"
                className="bg-background border border-border rounded-lg px-3 py-2.5 text-sm text-foreground placeholder:text-muted focus:outline-none focus:border-gold"
                dir="ltr"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs text-muted font-medium">رقم الهاتف</label>
              <input
                type="tel"
                placeholder="+966 5X XXX XXXX"
                className="bg-background border border-border rounded-lg px-3 py-2.5 text-sm text-foreground placeholder:text-muted focus:outline-none focus:border-gold"
                dir="ltr"
              />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs text-muted font-medium">الجنسية</label>
            <select className="bg-background border border-border rounded-lg px-3 py-2.5 text-sm text-foreground focus:outline-none focus:border-gold">
              <option value="">اختر الجنسية</option>
              <option>سعودي</option>
              <option>إماراتي</option>
              <option>مصري</option>
              <option>أردني</option>
              <option>أخرى</option>
            </select>
          </div>

          {/* Pi wallet */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs text-muted font-medium">عنوان محفظة Pi</label>
            <input
              type="text"
              placeholder="GXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
              className="bg-background border border-border rounded-lg px-3 py-2.5 text-sm text-foreground placeholder:text-muted focus:outline-none focus:border-gold font-mono"
              dir="ltr"
            />
          </div>

          {/* Document upload */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs text-muted font-medium">رفع الهوية / جواز السفر</label>
            <div className="border-2 border-dashed border-border rounded-lg p-5 flex flex-col items-center gap-2 hover:border-gold/40 transition-colors cursor-pointer group">
              <Upload className="w-6 h-6 text-muted group-hover:text-gold transition-colors" />
              <p className="text-sm text-muted text-center">
                اسحب الملف هنا أو{" "}
                <span className="text-gold underline">انقر للرفع</span>
              </p>
              <p className="text-xs text-muted">PDF, JPG, PNG — الحجم الأقصى 5MB</p>
            </div>
          </div>

          {/* Terms */}
          <label className="flex items-start gap-3 cursor-pointer">
            <div className="relative mt-0.5 flex-shrink-0">
              <input
                type="checkbox"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
                className="sr-only"
              />
              <div
                className={cn(
                  "w-5 h-5 rounded border-2 flex items-center justify-center transition-all",
                  agreed ? "bg-gold border-gold" : "bg-transparent border-border"
                )}
              >
                {agreed && (
                  <svg className="w-3 h-3 text-background" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </div>
            </div>
            <p className="text-sm text-muted leading-relaxed">
              أوافق على{" "}
              <span className="text-gold underline cursor-pointer">الشروط والأحكام</span>{" "}
              و{" "}
              <span className="text-gold underline cursor-pointer">سياسة الخصوصية</span>{" "}
              الخاصة بمنصة RE، وأقر بصحة البيانات المدخلة.
            </p>
          </label>

          {/* Submit */}
          <button
            onClick={onSubmit}
            disabled={!agreed}
            className={cn(
              "w-full py-3.5 rounded-lg font-bold text-base flex items-center justify-center gap-2 transition-all",
              agreed
                ? "bg-gold hover:bg-gold/90 text-background"
                : "bg-border text-muted cursor-not-allowed"
            )}
          >
            تأكيد الدفع وإتمام الشراء
            <ChevronLeft className="w-5 h-5" />
          </button>

          <p className="text-center text-xs text-muted">
            سيتم خصم المبلغ فور الضغط على زر التأكيد
          </p>
        </div>
      )}
    </section>
  )
}

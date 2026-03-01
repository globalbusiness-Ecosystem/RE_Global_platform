import Link from "next/link"
import { ShieldCheck, Lock } from "lucide-react"

export default function CheckoutHeader() {
  return (
    <header className="bg-surface border-b border-border sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-2xl font-bold text-gold tracking-widest">RE</span>
          <span className="text-xs text-muted border border-border rounded px-1.5 py-0.5">إتمام الدفع</span>
        </Link>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5 text-xs text-muted">
            <Lock className="w-3.5 h-3.5 text-gold" />
            <span>دفع آمن ومشفر</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-muted">
            <ShieldCheck className="w-3.5 h-3.5 text-gold" />
            <span>محمي بـ SSL</span>
          </div>
        </div>
      </div>
    </header>
  )
}

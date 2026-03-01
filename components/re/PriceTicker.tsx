"use client"

import { useState, useEffect } from "react"
import { TrendingUp, TrendingDown } from "lucide-react"

const initialTickers = [
  { id: "PI/USD", price: 42.85, change: +3.24, color: "var(--pi-gold)" },
  { id: "BTC/USD", price: 87420, change: +1.87, color: "#f7931a" },
  { id: "ETH/USD", price: 3245, change: -0.92, color: "#627eea" },
  { id: "USDT/USD", price: 1.0, change: +0.01, color: "#26a17b" },
  { id: "PI/BTC", price: 0.000491, change: +2.12, color: "var(--pi-gold)" },
  { id: "PI/ETH", price: 0.01320, change: +1.45, color: "var(--pi-gold)" },
  { id: "BNB/USD", price: 412.5, change: +0.73, color: "#f3ba2f" },
  { id: "SOL/USD", price: 189.4, change: +2.58, color: "#9945ff" },
]

export function PriceTicker() {
  const [tickers, setTickers] = useState(initialTickers)

  useEffect(() => {
    const interval = setInterval(() => {
      setTickers(prev => prev.map(t => ({
        ...t,
        price: t.id === "USDT/USD" ? 1.0 : +(t.price * (1 + (Math.random() - 0.5) * 0.003)).toFixed(t.price > 100 ? 2 : 6),
        change: +(t.change + (Math.random() - 0.5) * 0.05).toFixed(2),
      })))
    }, 2500)
    return () => clearInterval(interval)
  }, [])

  const tickerItems = [...tickers, ...tickers]

  return (
    <div
      className="h-8 overflow-hidden flex items-center border-b border-border relative"
      style={{ backgroundColor: "var(--surface-1)" }}
      aria-label="Live cryptocurrency prices"
    >
      {/* Live indicator */}
      <div className="absolute left-0 top-0 bottom-0 z-10 flex items-center px-2 border-r border-border" style={{ backgroundColor: "var(--surface-2)" }}>
        <div className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full animate-pulse-dot" style={{ backgroundColor: "var(--positive)" }} />
          <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Live</span>
        </div>
      </div>

      <div className="flex animate-ticker pl-28" style={{ width: "max-content" }}>
        {tickerItems.map((ticker, i) => (
          <div key={`${ticker.id}-${i}`} className="flex items-center gap-2 px-4 border-r border-border/40 h-8">
            <span className="text-[11px] font-bold text-foreground">{ticker.id}</span>
            <span className="text-[11px] font-semibold" style={{ color: ticker.color }}>
              {ticker.id.includes("PI/BTC") || ticker.id.includes("PI/ETH")
                ? ticker.price.toFixed(6)
                : ticker.price >= 100
                  ? `$${ticker.price.toLocaleString()}`
                  : `$${ticker.price.toFixed(2)}`
              }
            </span>
            <span
              className="text-[10px] font-medium flex items-center gap-0.5"
              style={{ color: ticker.change >= 0 ? "var(--positive)" : "var(--negative)" }}
            >
              {ticker.change >= 0 ? <TrendingUp className="w-2.5 h-2.5" /> : <TrendingDown className="w-2.5 h-2.5" />}
              {ticker.change >= 0 ? "+" : ""}{ticker.change}%
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

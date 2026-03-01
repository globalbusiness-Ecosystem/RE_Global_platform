"use client"

import { useState, useEffect } from "react"
import { TrendingUp, TrendingDown, Code2, BookOpen, Layers3, Trophy, Globe2 } from "lucide-react"
import { LineChart, Line, ResponsiveContainer, Tooltip } from "recharts"

const generateSparkline = (base: number, count = 12) =>
  Array.from({ length: count }, (_, i) => ({
    v: base + (Math.random() - 0.48) * base * 0.04 * (i + 1),
  }))

const cryptoPrices = [
  {
    id: "pi",
    symbol: "π PI",
    price: 42.85,
    change: +3.24,
    color: "var(--pi-gold)",
    data: generateSparkline(42),
  },
  {
    id: "btc",
    symbol: "₿ BTC",
    price: 87420,
    change: +1.87,
    color: "#f7931a",
    data: generateSparkline(87000),
  },
  {
    id: "eth",
    symbol: "Ξ ETH",
    price: 3245,
    change: -0.92,
    color: "#627eea",
    data: generateSparkline(3200),
  },
  {
    id: "usdt",
    symbol: "₮ USDT",
    price: 1.0,
    change: +0.01,
    color: "#26a17b",
    data: generateSparkline(1),
  },
]

const investors = [
  { rank: 1, name: "0x9a...3f", invested: "124,500", badge: "🥇" },
  { rank: 2, name: "Pi_King", invested: "98,200", badge: "🥈" },
  { rank: 3, name: "PropMaster", invested: "87,400", badge: "🥉" },
  { rank: 4, name: "ArabiPi", invested: "62,100", badge: "" },
  { rank: 5, name: "MetaLand", invested: "54,800", badge: "" },
]

const languages = [
  { code: "ar", label: "العربية", dir: "rtl" },
  { code: "en", label: "English", dir: "ltr" },
  { code: "fr", label: "Français", dir: "ltr" },
  { code: "es", label: "Español", dir: "ltr" },
  { code: "de", label: "Deutsch", dir: "ltr" },
  { code: "zh", label: "中文", dir: "ltr" },
]

const investmentData = Array.from({ length: 20 }, (_, i) => ({
  v: 1200 + Math.sin(i * 0.5) * 200 + i * 30 + Math.random() * 80,
}))

export function RightSidebar({ isOpen, onClose }: { isOpen?: boolean; onClose?: () => void }) {
  const [prices, setPrices] = useState(cryptoPrices)
  const [selectedLang, setSelectedLang] = useState("en")

  useEffect(() => {
    const interval = setInterval(() => {
      setPrices(prev => prev.map(p => ({
        ...p,
        price: p.id === "usdt" ? 1.0 : +(p.price * (1 + (Math.random() - 0.5) * 0.002)).toFixed(p.price > 1000 ? 0 : 2),
        change: p.id === "usdt" ? 0.01 : +(p.change + (Math.random() - 0.5) * 0.1).toFixed(2),
        data: [...p.data.slice(1), { v: p.price * (1 + (Math.random() - 0.5) * 0.01) }],
      })))
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  const formatPrice = (price: number, id: string) => {
    if (id === "btc") return `$${price.toLocaleString()}`
    if (id === "eth") return `$${price.toLocaleString()}`
    if (id === "pi") return `$${price.toFixed(2)}`
    return `$${price.toFixed(2)}`
  }

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 bg-black/60 z-30 lg:hidden" onClick={onClose} />
      )}

      <aside
        className={`
          fixed right-0 top-14 bottom-0 w-64 z-40 overflow-y-auto
          border-l border-border transition-transform duration-300
          lg:translate-x-0
          ${isOpen ? "translate-x-0" : "translate-x-full"}
        `}
        style={{ backgroundColor: "var(--sidebar)" }}
      >
        <div className="p-3 space-y-4">

          {/* Investment Stats */}
          <div className="rounded-lg p-3 border border-border" style={{ backgroundColor: "var(--surface-2)" }}>
            <div className="flex items-center justify-between mb-2">
              <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest">
                My Portfolio
              </p>
              <span className="text-[10px] px-1.5 py-0.5 rounded-full font-medium" style={{ backgroundColor: "var(--positive)", color: "white" }}>
                LIVE
              </span>
            </div>
            <div className="mb-2">
              <p className="text-xl font-bold text-foreground">π 3,847</p>
              <p className="text-xs flex items-center gap-1 mt-0.5" style={{ color: "var(--positive)" }}>
                <TrendingUp className="w-3 h-3" />
                +12.4% this month
              </p>
            </div>
            <ResponsiveContainer width="100%" height={56}>
              <LineChart data={investmentData}>
                <Line
                  type="monotone"
                  dataKey="v"
                  stroke="var(--pi-gold)"
                  strokeWidth={1.5}
                  dot={false}
                />
                <Tooltip
                  contentStyle={{ backgroundColor: "var(--surface-3)", border: "none", borderRadius: "6px", fontSize: "10px", color: "var(--foreground)" }}
                  formatter={(val: number) => [`π ${Math.round(val)}`, ""]}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Live Crypto Prices */}
          <div>
            <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest mb-2 px-0.5">
              Live Prices
            </p>
            <div className="space-y-1.5">
              {prices.map(coin => (
                <div
                  key={coin.id}
                  className="flex items-center gap-2 p-2 rounded-md border border-border"
                  style={{ backgroundColor: "var(--surface-2)" }}
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5">
                      <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: coin.color }} />
                      <p className="text-xs font-semibold text-foreground truncate">{coin.symbol}</p>
                    </div>
                    <p className="text-[10px] font-bold mt-0.5 text-foreground">{formatPrice(coin.price, coin.id)}</p>
                    <p className={`text-[9px] flex items-center gap-0.5 font-medium`} style={{ color: coin.change >= 0 ? "var(--positive)" : "var(--negative)" }}>
                      {coin.change >= 0 ? <TrendingUp className="w-2.5 h-2.5" /> : <TrendingDown className="w-2.5 h-2.5" />}
                      {coin.change >= 0 ? "+" : ""}{coin.change}%
                    </p>
                  </div>
                  <div className="w-16 h-8">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={coin.data}>
                        <Line type="monotone" dataKey="v" stroke={coin.color} strokeWidth={1.5} dot={false} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Top Investors */}
          <div>
            <div className="flex items-center gap-1.5 mb-2 px-0.5">
              <Trophy className="w-3.5 h-3.5" style={{ color: "var(--pi-gold)" }} />
              <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest">
                Top Investors
              </p>
            </div>
            <div className="space-y-1">
              {investors.map(inv => (
                <div
                  key={inv.rank}
                  className="flex items-center gap-2 px-2.5 py-1.5 rounded-md"
                  style={{ backgroundColor: inv.rank <= 3 ? "var(--surface-2)" : "transparent" }}
                >
                  <span className="text-xs w-4 text-muted-foreground font-mono">
                    {inv.badge || `#${inv.rank}`}
                  </span>
                  <span className="text-xs text-foreground flex-1 font-medium truncate">{inv.name}</span>
                  <span className="text-[10px] font-semibold" style={{ color: "var(--pi-gold)" }}>
                    π {inv.invested}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Developer Tools */}
          <div>
            <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest mb-2 px-0.5">
              Developer Tools
            </p>
            <div className="grid grid-cols-3 gap-1.5">
              {[
                { icon: Code2, label: "API" },
                { icon: Layers3, label: "SDK" },
                { icon: BookOpen, label: "Docs" },
              ].map(tool => (
                <button
                  key={tool.label}
                  className="flex flex-col items-center gap-1.5 p-2 rounded-md text-muted-foreground hover:text-foreground transition-colors border border-border hover:border-primary/40"
                  style={{ backgroundColor: "var(--surface-2)" }}
                >
                  <tool.icon className="w-4 h-4" />
                  <span className="text-[10px] font-medium">{tool.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Language Switcher */}
          <div>
            <div className="flex items-center gap-1.5 mb-2 px-0.5">
              <Globe2 className="w-3.5 h-3.5 text-muted-foreground" />
              <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest">
                Language
              </p>
            </div>
            <div className="grid grid-cols-3 gap-1.5">
              {languages.map(lang => (
                <button
                  key={lang.code}
                  onClick={() => setSelectedLang(lang.code)}
                  className={`px-2 py-1.5 rounded-md text-[11px] font-medium transition-colors border ${
                    selectedLang === lang.code ? "border-transparent" : "border-border text-muted-foreground hover:text-foreground"
                  }`}
                  style={
                    selectedLang === lang.code
                      ? { backgroundColor: "var(--pi-gold)", color: "var(--background)" }
                      : { backgroundColor: "var(--surface-2)" }
                  }
                >
                  {lang.label}
                </button>
              ))}
            </div>
          </div>

        </div>
      </aside>
    </>
  )
}

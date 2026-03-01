"use client"

import { useState } from "react"
import { PriceTicker } from "./PriceTicker"
import { PropertyCard, type Property } from "./PropertyCard"
import { Building2, Users, TrendingUp, Globe, ArrowRight, Star, Sparkles, Hotel } from "lucide-react"

const PROPERTIES: Property[] = [
  {
    id: "1",
    title: "Luxury Villa — Palm Jumeirah",
    location: "Dubai, UAE",
    price: 28500,
    priceUnit: "/ mo",
    image: "/placeholder.svg?height=176&width=320",
    beds: 5,
    baths: 4,
    area: 620,
    badge: "rent",
    tokenized: true,
    roi: "8.2%",
  },
  {
    id: "2",
    title: "Tokenized Tower Apartment",
    location: "Riyadh, Saudi Arabia",
    price: 12400,
    priceUnit: "",
    image: "/placeholder.svg?height=176&width=320",
    beds: 2,
    baths: 2,
    area: 115,
    badge: "tokenized",
    roi: "11.5%",
  },
  {
    id: "3",
    title: "Beachfront Hotel Suite",
    location: "Casablanca, Morocco",
    price: 320,
    priceUnit: "/ night",
    image: "/placeholder.svg?height=176&width=320",
    area: 85,
    badge: "hotel",
    rating: 4.8,
  },
  {
    id: "4",
    title: "Commercial Complex — CBD",
    location: "Lagos, Nigeria",
    price: 95000,
    priceUnit: "",
    image: "/placeholder.svg?height=176&width=320",
    area: 2400,
    badge: "sale",
    tokenized: true,
  },
  {
    id: "5",
    title: "Modern Studio — City Center",
    location: "Paris, France",
    price: 1850,
    priceUnit: "/ mo",
    image: "/placeholder.svg?height=176&width=320",
    beds: 1,
    baths: 1,
    area: 42,
    badge: "rent",
  },
  {
    id: "6",
    title: "Investment Land Plot",
    location: "Nairobi, Kenya",
    price: 7200,
    priceUnit: "",
    image: "/placeholder.svg?height=176&width=320",
    area: 5000,
    badge: "investment",
    roi: "14.3%",
  },
  {
    id: "7",
    title: "Penthouse — Downtown",
    location: "New York, USA",
    price: 184000,
    priceUnit: "",
    image: "/placeholder.svg?height=176&width=320",
    beds: 4,
    baths: 3,
    area: 340,
    badge: "sale",
    tokenized: true,
  },
  {
    id: "8",
    title: "Eco Resort Villa",
    location: "Bali, Indonesia",
    price: 6800,
    priceUnit: "/ mo",
    image: "/placeholder.svg?height=176&width=320",
    beds: 3,
    baths: 2,
    area: 210,
    badge: "rent",
    tokenized: true,
    roi: "9.7%",
  },
]

const PLATFORM_STATS = [
  { label: "Properties Listed", value: "2,847", icon: Building2 },
  { label: "Active Investors", value: "48,291", icon: Users },
  { label: "Total Volume (π)", value: "1.2M", icon: TrendingUp },
  { label: "Countries", value: "54", icon: Globe },
]

const SORT_OPTIONS = ["Newest", "Price: Low-High", "Price: High-Low", "ROI", "Popular"]

export function MainContent() {
  const [sortBy, setSortBy] = useState("Newest")
  const [activeView, setActiveView] = useState<"grid" | "list">("grid")

  return (
    <main className="flex-1 flex flex-col overflow-y-auto" style={{ backgroundColor: "var(--background)" }}>
      {/* Live Ticker */}
      <PriceTicker />

      {/* Hero Banner */}
      <div
        className="relative mx-3 mt-3 rounded-xl overflow-hidden"
        style={{
          background: "linear-gradient(135deg, oklch(0.18 0.02 240) 0%, oklch(0.16 0.04 80) 100%)",
          border: "1px solid var(--border)"
        }}
      >
        {/* Subtle pattern */}
        <div className="absolute inset-0 opacity-5" style={{
          backgroundImage: `radial-gradient(circle at 20% 50%, var(--pi-gold) 0%, transparent 50%), radial-gradient(circle at 80% 20%, var(--pi-gold) 0%, transparent 40%)`
        }} />

        <div className="relative p-5 md:p-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Sparkles className="w-4 h-4" style={{ color: "var(--pi-gold)" }} />
                <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: "var(--pi-gold)" }}>
                  Pi-Powered Real Estate
                </span>
              </div>
              <h1 className="text-2xl md:text-3xl font-bold text-foreground leading-tight text-balance mb-1">
                Own. Tokenize. Invest.
              </h1>
              <p className="text-sm text-muted-foreground leading-relaxed max-w-md">
                The world's first real estate marketplace powered entirely by Pi cryptocurrency.
                Buy, sell, rent, and tokenize properties globally.
              </p>
            </div>
            <div className="flex gap-2.5 flex-shrink-0">
              <button
                className="px-4 py-2 rounded-lg text-sm font-semibold transition-colors"
                style={{ backgroundColor: "var(--pi-gold)", color: "var(--background)" }}
              >
                List Property
              </button>
              <button
                className="px-4 py-2 rounded-lg text-sm font-semibold border border-border text-foreground hover:bg-secondary transition-colors flex items-center gap-1.5"
              >
                Learn More <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Stats Row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 mt-5">
            {PLATFORM_STATS.map(stat => {
              const Icon = stat.icon
              return (
                <div key={stat.label} className="flex items-center gap-2.5 px-3 py-2 rounded-lg" style={{ backgroundColor: "rgba(0,0,0,0.25)" }}>
                  <div className="w-7 h-7 rounded-md flex items-center justify-center flex-shrink-0" style={{ backgroundColor: "var(--pi-gold)", color: "var(--background)" }}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-base font-bold text-foreground leading-none">{stat.value}</p>
                    <p className="text-[10px] text-muted-foreground mt-0.5 leading-none">{stat.label}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Promo Ads Row */}
      <div className="flex gap-3 px-3 mt-3">
        {/* Tokenization Ad */}
        <div
          className="flex-1 rounded-xl p-4 border border-border relative overflow-hidden cursor-pointer hover:border-primary/30 transition-colors"
          style={{ background: "linear-gradient(135deg, oklch(0.18 0.02 80) 0%, oklch(0.14 0.02 240) 100%)" }}
        >
          <div className="flex items-start justify-between gap-3">
            <div>
              <div className="w-8 h-8 rounded-lg flex items-center justify-center mb-2" style={{ backgroundColor: "var(--pi-gold)", color: "var(--background)" }}>
                <TrendingUp className="w-4.5 h-4.5" />
              </div>
              <p className="text-sm font-bold text-foreground mb-0.5">Tokenize Your Property</p>
              <p className="text-[11px] text-muted-foreground leading-relaxed">
                Convert real estate to Pi tokens and unlock liquidity from global investors.
              </p>
            </div>
          </div>
          <button className="mt-3 text-[11px] font-semibold flex items-center gap-1" style={{ color: "var(--pi-gold)" }}>
            Start Tokenizing <ArrowRight className="w-3 h-3" />
          </button>
        </div>

        {/* Hotel Ad */}
        <div
          className="flex-1 rounded-xl p-4 border border-border relative overflow-hidden cursor-pointer hover:border-primary/30 transition-colors"
          style={{ background: "linear-gradient(135deg, oklch(0.18 0.02 300) 0%, oklch(0.14 0.02 240) 100%)" }}
        >
          <div className="flex items-start gap-3">
            <div>
              <div className="w-8 h-8 rounded-lg flex items-center justify-center mb-2" style={{ backgroundColor: "#7c3aed", color: "white" }}>
                <Hotel className="w-4.5 h-4.5" />
              </div>
              <p className="text-sm font-bold text-foreground mb-0.5">Book with Pi</p>
              <p className="text-[11px] text-muted-foreground leading-relaxed">
                Stay at 500+ partner hotels worldwide and pay exclusively with Pi.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-1 mt-3">
            {[1, 2, 3, 4, 5].map(s => (
              <Star key={s} className="w-2.5 h-2.5" fill="var(--pi-gold)" stroke="none" />
            ))}
            <span className="text-[10px] text-muted-foreground ml-1">4.9 avg</span>
          </div>
        </div>
      </div>

      {/* Property Grid Header */}
      <div className="flex items-center justify-between px-3 mt-5 mb-3">
        <div>
          <h2 className="text-sm font-bold text-foreground">Featured Properties</h2>
          <p className="text-[11px] text-muted-foreground">{PROPERTIES.length} listings found</p>
        </div>
        <div className="flex items-center gap-2">
          <select
            value={sortBy}
            onChange={e => setSortBy(e.target.value)}
            className="text-xs border border-border rounded-md px-2 py-1.5 text-foreground outline-none cursor-pointer"
            style={{ backgroundColor: "var(--surface-2)" }}
          >
            {SORT_OPTIONS.map(opt => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
          <div className="flex border border-border rounded-md overflow-hidden">
            {(["grid", "list"] as const).map(v => (
              <button
                key={v}
                onClick={() => setActiveView(v)}
                className="px-2 py-1.5 text-xs transition-colors"
                style={activeView === v ? { backgroundColor: "var(--pi-gold)", color: "var(--background)" } : { color: "var(--muted-foreground)" }}
              >
                {v === "grid" ? "⊞" : "≡"}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Property Grid */}
      <div className={`px-3 pb-8 ${activeView === "grid" ? "grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-2 gap-4" : "flex flex-col gap-3"}`}>
        {PROPERTIES.map(property => (
          <PropertyCard key={property.id} property={property} />
        ))}
      </div>
    </main>
  )
}

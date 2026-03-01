"use client"

import { useState } from "react"
import {
  Home, Tag, Key, Building2, Coins, TrendingUp,
  Layers, TreePine, Landmark, Store, ChevronDown,
  MapPin, CreditCard, SlidersHorizontal
} from "lucide-react"

const categories = [
  { id: "all", label: "All Properties", icon: Home, count: 2847 },
  { id: "sale", label: "For Sale", icon: Tag, count: 1204 },
  { id: "rent", label: "For Rent", icon: Key, count: 893 },
  { id: "hotels", label: "Hotels & Booking", icon: Building2, count: 312 },
  { id: "tokenized", label: "Tokenized Properties", icon: Coins, count: 248 },
  { id: "investment", label: "Investment Opportunities", icon: TrendingUp, count: 190 },
]

const propertyTypes = [
  { id: "apartments", label: "Apartments", icon: Layers },
  { id: "villas", label: "Villas", icon: Home },
  { id: "land", label: "Land", icon: TreePine },
  { id: "commercial", label: "Commercial", icon: Store },
]

const regions = [
  { id: "me", label: "Middle East", flag: "🌍" },
  { id: "af", label: "Africa", flag: "🌍" },
  { id: "eu", label: "Europe", flag: "🌍" },
  { id: "am", label: "America", flag: "🌎" },
  { id: "as", label: "Asia", flag: "🌏" },
]

const paymentMethods = [
  { id: "pi", label: "Pi Only" },
  { id: "pi-usdt", label: "Pi + USDT" },
  { id: "card", label: "Credit Card" },
]

export function LeftSidebar({ isOpen, onClose }: { isOpen?: boolean; onClose?: () => void }) {
  const [activeCategory, setActiveCategory] = useState("all")
  const [selectedTypes, setSelectedTypes] = useState<string[]>([])
  const [selectedRegions, setSelectedRegions] = useState<string[]>([])
  const [selectedPayment, setSelectedPayment] = useState("pi")
  const [priceRange, setPriceRange] = useState([0, 50000])
  const [filtersOpen, setFiltersOpen] = useState(true)

  const toggleType = (id: string) => {
    setSelectedTypes(prev => prev.includes(id) ? prev.filter(t => t !== id) : [...prev, id])
  }
  const toggleRegion = (id: string) => {
    setSelectedRegions(prev => prev.includes(id) ? prev.filter(r => r !== id) : [...prev, id])
  }

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-30 md:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`
          fixed left-0 top-14 bottom-0 w-64 z-40 overflow-y-auto
          border-r border-border transition-transform duration-300
          md:translate-x-0
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
        `}
        style={{ backgroundColor: "var(--sidebar)" }}
      >
        <div className="p-3 space-y-5">

          {/* Categories */}
          <nav aria-label="Property categories">
            <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest mb-2 px-1">
              Categories
            </p>
            <ul className="space-y-0.5">
              {categories.map(cat => {
                const Icon = cat.icon
                const active = activeCategory === cat.id
                return (
                  <li key={cat.id}>
                    <button
                      onClick={() => setActiveCategory(cat.id)}
                      className={`w-full flex items-center justify-between px-2.5 py-2 rounded-md text-sm transition-colors ${
                        active
                          ? "text-foreground font-medium"
                          : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                      }`}
                      style={active ? { backgroundColor: "var(--surface-3)", color: "var(--pi-gold)" } : {}}
                    >
                      <div className="flex items-center gap-2.5">
                        <Icon className="w-4 h-4 flex-shrink-0" />
                        <span className="text-xs leading-tight text-left">{cat.label}</span>
                      </div>
                      <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-medium ${
                        active ? "" : "text-muted-foreground"
                      }`} style={active ? { backgroundColor: "var(--pi-gold)", color: "var(--background)" } : { backgroundColor: "var(--surface-3)" }}>
                        {cat.count.toLocaleString()}
                      </span>
                    </button>
                  </li>
                )
              })}
            </ul>
          </nav>

          <div className="border-t border-border" />

          {/* Filters Toggle */}
          <div>
            <button
              onClick={() => setFiltersOpen(!filtersOpen)}
              className="w-full flex items-center justify-between px-1 mb-3"
            >
              <div className="flex items-center gap-1.5 text-[10px] font-semibold text-muted-foreground uppercase tracking-widest">
                <SlidersHorizontal className="w-3 h-3" />
                Filters
              </div>
              <ChevronDown className={`w-3.5 h-3.5 text-muted-foreground transition-transform ${filtersOpen ? "rotate-180" : ""}`} />
            </button>

            {filtersOpen && (
              <div className="space-y-4">

                {/* Property Type */}
                <div>
                  <p className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider mb-2 px-1">
                    Property Type
                  </p>
                  <div className="grid grid-cols-2 gap-1.5">
                    {propertyTypes.map(type => {
                      const Icon = type.icon
                      const selected = selectedTypes.includes(type.id)
                      return (
                        <button
                          key={type.id}
                          onClick={() => toggleType(type.id)}
                          className={`flex flex-col items-center gap-1 p-2 rounded-md text-xs transition-colors border ${
                            selected
                              ? "border-transparent"
                              : "border-border text-muted-foreground hover:text-foreground hover:border-border"
                          }`}
                          style={selected ? { backgroundColor: "var(--pi-gold)", color: "var(--background)", borderColor: "transparent" } : { backgroundColor: "var(--surface-2)" }}
                        >
                          <Icon className="w-4 h-4" />
                          <span>{type.label}</span>
                        </button>
                      )
                    })}
                  </div>
                </div>

                {/* Region */}
                <div>
                  <p className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider mb-2 px-1 flex items-center gap-1">
                    <MapPin className="w-3 h-3" /> Region
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {regions.map(region => {
                      const selected = selectedRegions.includes(region.id)
                      return (
                        <button
                          key={region.id}
                          onClick={() => toggleRegion(region.id)}
                          className={`px-2.5 py-1 rounded-full text-[11px] font-medium transition-colors border ${
                            selected
                              ? "border-transparent"
                              : "border-border text-muted-foreground hover:text-foreground"
                          }`}
                          style={selected ? { backgroundColor: "var(--pi-gold)", color: "var(--background)" } : { backgroundColor: "var(--surface-2)" }}
                        >
                          {region.label}
                        </button>
                      )
                    })}
                  </div>
                </div>

                {/* Price Range in Pi */}
                <div>
                  <div className="flex items-center justify-between mb-2 px-1">
                    <p className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider">
                      Price Range (π)
                    </p>
                    <span className="text-xs font-medium" style={{ color: "var(--pi-gold)" }}>
                      π {priceRange[1].toLocaleString()}
                    </span>
                  </div>
                  <input
                    type="range"
                    min={0}
                    max={100000}
                    step={500}
                    value={priceRange[1]}
                    onChange={e => setPriceRange([0, Number(e.target.value)])}
                    className="w-full h-1 rounded-full appearance-none cursor-pointer"
                    style={{
                      background: `linear-gradient(to right, var(--pi-gold) 0%, var(--pi-gold) ${priceRange[1] / 1000}%, var(--surface-3) ${priceRange[1] / 1000}%, var(--surface-3) 100%)`
                    }}
                  />
                  <div className="flex justify-between mt-1 px-1">
                    <span className="text-[10px] text-muted-foreground">π 0</span>
                    <span className="text-[10px] text-muted-foreground">π 100K</span>
                  </div>
                </div>

                {/* Payment Method */}
                <div>
                  <p className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider mb-2 px-1 flex items-center gap-1">
                    <CreditCard className="w-3 h-3" /> Payment Method
                  </p>
                  <div className="space-y-1.5">
                    {paymentMethods.map(method => (
                      <button
                        key={method.id}
                        onClick={() => setSelectedPayment(method.id)}
                        className={`w-full flex items-center gap-2.5 px-2.5 py-2 rounded-md text-xs transition-colors`}
                        style={
                          selectedPayment === method.id
                            ? { backgroundColor: "var(--surface-3)", color: "var(--pi-gold)" }
                            : { color: "var(--muted-foreground)" }
                        }
                      >
                        <div className={`w-3.5 h-3.5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                          selectedPayment === method.id ? "" : "border-muted-foreground"
                        }`} style={selectedPayment === method.id ? { borderColor: "var(--pi-gold)" } : {}}>
                          {selectedPayment === method.id && (
                            <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: "var(--pi-gold)" }} />
                          )}
                        </div>
                        {method.label}
                      </button>
                    ))}
                  </div>
                </div>

              </div>
            )}
          </div>

        </div>
      </aside>
    </>
  )
}

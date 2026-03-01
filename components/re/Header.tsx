"use client"

import { useState } from "react"
import { Bell, Search, Wallet, Menu, X, Globe } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function Header({ onMenuToggle }: { onMenuToggle?: () => void }) {
  const [searchOpen, setSearchOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-14 flex items-center justify-between px-3 md:px-4 border-b border-border"
      style={{ backgroundColor: "var(--surface-1)" }}>
      {/* Left: Hamburger (mobile) + Search */}
      <div className="flex items-center gap-2 w-[120px] md:w-[200px]">
        <button
          className="md:hidden p-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
          onClick={onMenuToggle}
          aria-label="Toggle menu"
        >
          <Menu className="w-5 h-5" />
        </button>
        {searchOpen ? (
          <div className="flex items-center gap-1 flex-1">
            <Input
              autoFocus
              placeholder="Search properties..."
              className="h-8 text-sm bg-secondary border-border text-foreground placeholder:text-muted-foreground"
            />
            <button onClick={() => setSearchOpen(false)} className="text-muted-foreground hover:text-foreground">
              <X className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <button
            onClick={() => setSearchOpen(true)}
            className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-md bg-secondary text-muted-foreground hover:text-foreground text-sm transition-colors w-full"
          >
            <Search className="w-3.5 h-3.5" />
            <span>Search properties...</span>
          </button>
        )}
        <button
          onClick={() => setSearchOpen(true)}
          className="md:hidden p-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
          aria-label="Search"
        >
          <Search className="w-4.5 h-4.5" />
        </button>
      </div>

      {/* Center: RE Logo */}
      <div className="flex items-center gap-2 absolute left-1/2 -translate-x-1/2">
        <div className="flex items-center gap-1.5">
          <div className="w-7 h-7 rounded-lg flex items-center justify-center font-bold text-sm"
            style={{ backgroundColor: "var(--pi-gold)", color: "var(--background)" }}>
            RE
          </div>
          <div className="flex flex-col leading-none">
            <span className="font-bold text-base tracking-wider text-foreground font-sans">RE</span>
            <span className="text-[9px] text-muted-foreground tracking-widest uppercase leading-none">Pi Property</span>
          </div>
        </div>
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-1.5 w-[120px] md:w-[200px] justify-end">
        {/* Pi balance chip */}
        <div className="hidden md:flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border border-border"
          style={{ backgroundColor: "var(--surface-2)", color: "var(--pi-gold)" }}>
          <span className="font-bold">π</span>
          <span className="text-foreground">1,247.5</span>
        </div>

        <button className="relative p-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors" aria-label="Notifications">
          <Bell className="w-4.5 h-4.5" />
          <span className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full" style={{ backgroundColor: "var(--pi-gold)" }} />
        </button>

        <Button size="sm" className="hidden md:flex items-center gap-1.5 h-8 px-3 text-xs font-medium"
          style={{ backgroundColor: "var(--pi-gold)", color: "var(--background)" }}>
          <Wallet className="w-3.5 h-3.5" />
          Connect Pi
        </Button>

        <div className="flex items-center gap-1 px-2 py-1 rounded-md text-xs text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors cursor-pointer">
          <Globe className="w-3.5 h-3.5" />
          <span className="hidden md:inline">EN</span>
        </div>
      </div>
    </header>
  )
}

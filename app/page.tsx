"use client"

import { useState } from "react"
import { Header } from "@/components/re/Header"
import { LeftSidebar } from "@/components/re/LeftSidebar"
import { RightSidebar } from "@/components/re/RightSidebar"
import { MainContent } from "@/components/re/MainContent"
import { PanelLeft, PanelRight } from "lucide-react"

export default function REPage() {
  const [leftOpen, setLeftOpen] = useState(false)
  const [rightOpen, setRightOpen] = useState(false)

  return (
    <div className="h-screen flex flex-col overflow-hidden" style={{ backgroundColor: "var(--background)" }}>
      {/* Fixed Header */}
      <Header onMenuToggle={() => setLeftOpen(!leftOpen)} />

      {/* Body: sidebars + main content */}
      <div className="flex flex-1 overflow-hidden pt-14">
        {/* Left Sidebar */}
        <LeftSidebar isOpen={leftOpen} onClose={() => setLeftOpen(false)} />

        {/* Main content area - offset for sidebars on desktop */}
        <div className="flex-1 overflow-y-auto md:ml-64 lg:mr-64">
          <MainContent />
        </div>

        {/* Right Sidebar */}
        <RightSidebar isOpen={rightOpen} onClose={() => setRightOpen(false)} />
      </div>

      {/* Mobile bottom bar for sidebar toggles */}
      <div
        className="fixed bottom-0 left-0 right-0 z-30 flex items-center justify-between px-4 py-2 border-t border-border lg:hidden"
        style={{ backgroundColor: "var(--surface-1)" }}
      >
        <button
          onClick={() => { setLeftOpen(!leftOpen); setRightOpen(false) }}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${leftOpen ? "" : "text-muted-foreground hover:text-foreground hover:bg-secondary"}`}
          style={leftOpen ? { backgroundColor: "var(--pi-gold)", color: "var(--background)" } : {}}
        >
          <PanelLeft className="w-4 h-4" />
          <span className="hidden sm:inline">Categories</span>
        </button>

        <div className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full animate-pulse-dot" style={{ backgroundColor: "var(--positive)" }} />
          <span className="text-xs font-bold" style={{ color: "var(--pi-gold)" }}>RE</span>
          <span className="text-[10px] text-muted-foreground">Pi Property</span>
        </div>

        <button
          onClick={() => { setRightOpen(!rightOpen); setLeftOpen(false) }}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${rightOpen ? "" : "text-muted-foreground hover:text-foreground hover:bg-secondary"}`}
          style={rightOpen ? { backgroundColor: "var(--pi-gold)", color: "var(--background)" } : {}}
        >
          <span className="hidden sm:inline">Dashboard</span>
          <PanelRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
}

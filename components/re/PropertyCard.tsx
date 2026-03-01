"use client"

import { useState } from "react"
import { Heart, MapPin, Bed, Bath, Square, Share2 } from "lucide-react"

export type BadgeType = "sale" | "rent" | "tokenized" | "hotel" | "investment"

export interface Property {
  id: string
  title: string
  location: string
  price: number
  priceUnit: string
  image: string
  beds?: number
  baths?: number
  area: number
  badge: BadgeType
  tokenized?: boolean
  roi?: string
  rating?: number
}

const badgeConfig: Record<BadgeType, { label: string; style: React.CSSProperties }> = {
  sale: { label: "For Sale", style: { backgroundColor: "#2563eb", color: "white" } },
  rent: { label: "For Rent", style: { backgroundColor: "#0891b2", color: "white" } },
  tokenized: { label: "Tokenized", style: { backgroundColor: "var(--pi-gold)", color: "var(--background)" } },
  hotel: { label: "Hotel", style: { backgroundColor: "#7c3aed", color: "white" } },
  investment: { label: "Investment", style: { backgroundColor: "var(--positive)", color: "white" } },
}

export function PropertyCard({ property }: { property: Property }) {
  const [liked, setLiked] = useState(false)
  const badge = badgeConfig[property.badge]

  return (
    <article
      className="rounded-xl overflow-hidden border border-border hover:border-primary/40 transition-all duration-200 group cursor-pointer"
      style={{ backgroundColor: "var(--card)" }}
    >
      {/* Image */}
      <div className="relative h-44 overflow-hidden">
        <img
          src={property.image}
          alt={property.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

        {/* Badge */}
        <span
          className="absolute top-2.5 left-2.5 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wide"
          style={badge.style}
        >
          {badge.label}
        </span>

        {/* Tokenized icon */}
        {property.tokenized && property.badge !== "tokenized" && (
          <span
            className="absolute top-2.5 left-[4.5rem] text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wide"
            style={badgeConfig.tokenized.style}
          >
            π Token
          </span>
        )}

        {/* Actions */}
        <div className="absolute top-2.5 right-2.5 flex gap-1.5">
          <button
            onClick={(e) => { e.stopPropagation(); setLiked(!liked) }}
            className="w-7 h-7 rounded-full flex items-center justify-center backdrop-blur-sm transition-colors"
            style={{ backgroundColor: "rgba(0,0,0,0.4)" }}
            aria-label={liked ? "Unlike" : "Like"}
          >
            <Heart
              className="w-3.5 h-3.5 transition-colors"
              fill={liked ? "#ef4444" : "none"}
              stroke={liked ? "#ef4444" : "white"}
            />
          </button>
          <button
            onClick={(e) => e.stopPropagation()}
            className="w-7 h-7 rounded-full flex items-center justify-center backdrop-blur-sm"
            style={{ backgroundColor: "rgba(0,0,0,0.4)" }}
            aria-label="Share"
          >
            <Share2 className="w-3.5 h-3.5 text-white" />
          </button>
        </div>

        {/* ROI badge */}
        {property.roi && (
          <div className="absolute bottom-2.5 right-2.5 text-[10px] font-bold px-2 py-0.5 rounded-full"
            style={{ backgroundColor: "var(--positive)", color: "white" }}>
            {property.roi} ROI
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-3">
        <h3 className="font-semibold text-sm text-foreground leading-tight mb-1 truncate">{property.title}</h3>

        <div className="flex items-center gap-1 text-muted-foreground mb-2.5">
          <MapPin className="w-3 h-3 flex-shrink-0" />
          <span className="text-[11px] truncate">{property.location}</span>
        </div>

        {/* Stats */}
        <div className="flex items-center gap-3 text-muted-foreground mb-3">
          {property.beds !== undefined && (
            <div className="flex items-center gap-1 text-[11px]">
              <Bed className="w-3 h-3" />
              <span>{property.beds}</span>
            </div>
          )}
          {property.baths !== undefined && (
            <div className="flex items-center gap-1 text-[11px]">
              <Bath className="w-3 h-3" />
              <span>{property.baths}</span>
            </div>
          )}
          <div className="flex items-center gap-1 text-[11px]">
            <Square className="w-3 h-3" />
            <span>{property.area.toLocaleString()} m²</span>
          </div>
        </div>

        {/* Price */}
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-1">
              <span className="text-base font-bold" style={{ color: "var(--pi-gold)" }}>
                π {property.price.toLocaleString()}
              </span>
              {property.priceUnit && (
                <span className="text-[10px] text-muted-foreground">{property.priceUnit}</span>
              )}
            </div>
          </div>
          <button
            className="text-[11px] font-semibold px-3 py-1.5 rounded-md transition-colors"
            style={{ backgroundColor: "var(--pi-gold)", color: "var(--background)" }}
          >
            View
          </button>
        </div>
      </div>
    </article>
  )
}

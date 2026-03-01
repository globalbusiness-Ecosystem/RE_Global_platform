import Image from "next/image"
import { BedDouble, Bath, Maximize2, MapPin, CheckCircle2 } from "lucide-react"
import { cn } from "@/lib/utils"

interface Property {
  title: string
  location: string
  type: string
  image: string
  beds: number
  baths: number
  area: number
  priceUSD: number
  pricePi: number
  badge: string
}

export default function PropertySummary({
  property,
  isActive,
}: {
  property: Property
  isActive: boolean
}) {
  return (
    <section
      className={cn(
        "rounded-xl border bg-surface transition-all",
        isActive ? "border-gold/30" : "border-border opacity-60"
      )}
    >
      {/* Section header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-border">
        <div className="flex items-center gap-2">
          <span className="w-6 h-6 rounded-full bg-gold text-background text-xs font-bold flex items-center justify-center">
            1
          </span>
          <h2 className="font-semibold text-foreground text-base">ملخص العقار</h2>
        </div>
        {isActive && <CheckCircle2 className="w-5 h-5 text-gold" />}
      </div>

      {/* Property card */}
      <div className="p-5">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-shrink-0 rounded-lg overflow-hidden w-full sm:w-48 h-36">
            <Image
              src={property.image}
              alt={property.title}
              fill
              className="object-cover"
            />
            <span className="absolute top-2 right-2 bg-gold text-background text-xs font-bold px-2 py-0.5 rounded">
              {property.type}
            </span>
          </div>

          <div className="flex-1 flex flex-col gap-2">
            <div className="flex items-start justify-between gap-2">
              <h3 className="text-foreground font-bold text-lg leading-tight">{property.title}</h3>
              <span className="text-xs bg-gold/10 text-gold border border-gold/20 px-2 py-0.5 rounded whitespace-nowrap">
                {property.badge}
              </span>
            </div>

            <div className="flex items-center gap-1.5 text-muted text-sm">
              <MapPin className="w-3.5 h-3.5 text-gold flex-shrink-0" />
              <span>{property.location}</span>
            </div>

            <div className="flex items-center gap-4 text-sm text-muted mt-1">
              <div className="flex items-center gap-1.5">
                <BedDouble className="w-4 h-4 text-gold" />
                <span>{property.beds} غرف</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Bath className="w-4 h-4 text-gold" />
                <span>{property.baths} حمامات</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Maximize2 className="w-4 h-4 text-gold" />
                <span>{property.area} م²</span>
              </div>
            </div>

            <div className="mt-auto pt-2 border-t border-border flex items-center justify-between">
              <div>
                <div className="text-gold font-bold text-xl">
                  {property.pricePi.toLocaleString()} π
                </div>
                <div className="text-muted text-xs">
                  ≈ ${property.priceUSD.toLocaleString()} USD
                </div>
              </div>
              <div className="text-xs text-emerald-400 bg-emerald-400/10 border border-emerald-400/20 px-2 py-1 rounded">
                متاح للشراء الفوري
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

"use client"

import { useState } from "react"
import CheckoutHeader from "@/components/checkout/CheckoutHeader"
import StepIndicator from "@/components/checkout/StepIndicator"
import PropertySummary from "@/components/checkout/PropertySummary"
import PaymentMethod from "@/components/checkout/PaymentMethod"
import BuyerInfo from "@/components/checkout/BuyerInfo"
import OrderSummary from "@/components/checkout/OrderSummary"
import ConfirmationScreen from "@/components/checkout/ConfirmationScreen"

export default function CheckoutPage() {
  const [step, setStep] = useState(1)
  const [paymentMethod, setPaymentMethod] = useState<"pi" | "pi-usdt" | "card">("pi")
  const [confirmed, setConfirmed] = useState(false)

  const property = {
    title: "فيلا فاخرة في دبي مارينا",
    location: "دبي مارينا، الإمارات العربية المتحدة",
    type: "للبيع",
    image: "/placeholder.svg?height=200&width=320",
    beds: 4,
    baths: 3,
    area: 320,
    priceUSD: 850000,
    pricePi: 4250000,
    badge: "مميز",
  }

  if (confirmed) {
    return <ConfirmationScreen property={property} paymentMethod={paymentMethod} onBack={() => setConfirmed(false)} />
  }

  return (
    <div className="min-h-screen bg-background font-sans" dir="rtl">
      <CheckoutHeader />

      <main className="max-w-6xl mx-auto px-4 py-8">
        <StepIndicator currentStep={step} />

        <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main checkout flow */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            {/* Step 1: Property summary */}
            <PropertySummary property={property} isActive={step >= 1} />

            {/* Step 2: Payment method */}
            <PaymentMethod
              isActive={step >= 2}
              selected={paymentMethod}
              onSelect={(m) => setPaymentMethod(m)}
              onNext={() => setStep(3)}
              onEdit={() => setStep(2)}
            />

            {/* Step 3: Buyer info */}
            <BuyerInfo
              isActive={step >= 3}
              onSubmit={() => setConfirmed(true)}
              onEdit={() => setStep(3)}
            />
          </div>

          {/* Right: Order summary */}
          <div className="lg:col-span-1">
            <OrderSummary
              property={property}
              paymentMethod={paymentMethod}
              step={step}
              onNextStep={() => setStep((s) => Math.min(s + 1, 3))}
            />
          </div>
        </div>
      </main>
    </div>
  )
}

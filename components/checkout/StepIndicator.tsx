import { Check } from "lucide-react"
import { cn } from "@/lib/utils"

const steps = [
  { id: 1, label: "ملخص العقار" },
  { id: 2, label: "طريقة الدفع" },
  { id: 3, label: "بيانات المشتري" },
]

export default function StepIndicator({ currentStep }: { currentStep: number }) {
  return (
    <div className="flex items-center justify-center gap-0">
      {steps.map((step, index) => (
        <div key={step.id} className="flex items-center">
          <div className="flex flex-col items-center gap-1.5">
            <div
              className={cn(
                "w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold border-2 transition-all",
                currentStep > step.id
                  ? "bg-gold border-gold text-background"
                  : currentStep === step.id
                  ? "bg-transparent border-gold text-gold"
                  : "bg-transparent border-border text-muted"
              )}
            >
              {currentStep > step.id ? <Check className="w-4 h-4" /> : step.id}
            </div>
            <span
              className={cn(
                "text-xs font-medium whitespace-nowrap",
                currentStep >= step.id ? "text-gold" : "text-muted"
              )}
            >
              {step.label}
            </span>
          </div>
          {index < steps.length - 1 && (
            <div
              className={cn(
                "h-0.5 w-16 md:w-24 mx-2 mb-5 transition-all",
                currentStep > step.id ? "bg-gold" : "bg-border"
              )}
            />
          )}
        </div>
      ))}
    </div>
  )
}

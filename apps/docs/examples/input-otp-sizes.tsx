import { InputOTP, InputOTPSlot } from "@/components/ui/input-otp"

const sizes = ["sm", "md", "lg"] as const

export default function InputOTPSizes() {
  return (
    <div className="flex flex-col gap-4">
      {sizes.map((size) => (
        <div key={size} className="flex flex-col gap-1">
          <label
            htmlFor={`otp-size-${size}`}
            className="text-xs text-ink-subtlest"
          >
            {size}
          </label>
          <InputOTP
            id={`otp-size-${size}`}
            size={size}
            length={4}
            defaultValue="12"
          >
            <InputOTPSlot />
            <InputOTPSlot />
            <InputOTPSlot />
            <InputOTPSlot />
          </InputOTP>
        </div>
      ))}
    </div>
  )
}

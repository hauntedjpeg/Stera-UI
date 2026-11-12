import { cn } from "@/lib/utils"
import { SiCircleNotch } from "stera-icons"

type SpinnerProps = React.ComponentProps<"svg"> & {
  icon?: React.ComponentType<React.ComponentProps<"svg">>
}

function Spinner({
  icon: Icon = SiCircleNotch,
  className,
  ...props
}: SpinnerProps) {
  return (
    <Icon
      data-slot="spinner"
      role="status"
      aria-label="Loading"
      // Attributes, not a size class, so a parent's icon size or a size-* class wins.
      width={16}
      height={16}
      className={cn(
        "animate-spin motion-reduce:animate-[spin_1.5s_linear_infinite]",
        className
      )}
      {...props}
    />
  )
}

export { Spinner }

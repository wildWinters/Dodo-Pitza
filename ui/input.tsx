import { cn } from "@/lib/utils"
import * as React from "react"
import { nunito400 } from "./button"

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "text-ellipsis placeholder:text-[16px] h-[50px] rounded-[15px] placeholder:text-[rgba(192,192,192,1)] file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 flex w-full min-w-0 bg-transparent px-3 py-1 text-base  transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40",
        nunito400.className,
        className
      )}
      {...props}
    />
  )
}
export { Input }

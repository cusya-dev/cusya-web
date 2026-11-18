import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-semibold transition-all active:scale-[0.97] disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-gradient-to-b from-cusya-500 to-cusya-600 text-primary-foreground shadow-md shadow-cusya-600/30 hover:-translate-y-0.5 hover:from-cusya-600 hover:to-cusya-700",
        outline: "border bg-white text-foreground hover:border-cusya-300 hover:bg-cusya-50",
        soft: "bg-cusya-50 text-foreground border hover:bg-cusya-100",
        light: "bg-white text-cusya-800 hover:bg-cusya-100",
      },
      size: { default: "h-11 px-5", lg: "h-14 px-6 text-base", sm: "h-9 px-3" },
    },
    defaultVariants: { variant: "default", size: "default" },
  }
);

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return <Comp ref={ref} className={cn(buttonVariants({ variant, size }), className)} {...props} />;
  }
);
Button.displayName = "Button";

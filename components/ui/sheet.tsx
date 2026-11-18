"use client";
import * as React from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { useI18n } from "@/components/i18n-provider";
import { cn } from "@/lib/utils";

export const Sheet = Dialog.Root;
export const SheetTrigger = Dialog.Trigger;
export const SheetClose = Dialog.Close;
export const SheetTitle = Dialog.Title;

export const SheetContent = React.forwardRef<
  React.ElementRef<typeof Dialog.Content>,
  React.ComponentPropsWithoutRef<typeof Dialog.Content>
>(({ className, children, ...props }, ref) => {
  const { t } = useI18n();
  return (
  <Dialog.Portal>
    <Dialog.Overlay className="fixed inset-0 z-50 bg-cusya-900/40 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=open]:fade-in-0 data-[state=closed]:fade-out-0" />
    <Dialog.Content
      ref={ref}
      aria-describedby={undefined}
      className={cn(
        "fixed inset-y-0 right-0 z-50 flex w-4/5 max-w-sm flex-col bg-white p-6 shadow-2xl duration-300 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=open]:slide-in-from-right data-[state=closed]:slide-out-to-right",
        className
      )}
      {...props}
    >
      {children}
      <Dialog.Close className="absolute right-6 top-5 rounded-xl border p-2 hover:bg-cusya-50">
        <X className="h-4 w-4" />
        <span className="sr-only">{t.nav.closeMenu}</span>
      </Dialog.Close>
    </Dialog.Content>
  </Dialog.Portal>
  );
});
SheetContent.displayName = "SheetContent";

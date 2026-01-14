import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { CheckCircle2, Info, AlertTriangle, XCircle, X } from "lucide-react";
import { cn } from "@/lib/utils";

const noticeVariants = cva(
  "relative flex items-start gap-3 w-full rounded-lg border p-4 transition-all duration-200",
  {
    variants: {
      variant: {
        success: 
          "bg-emerald-500/10 border-emerald-500/30 text-emerald-400 " +
          "[&>svg]:text-emerald-400 [&_.notice-title]:text-emerald-300",
        info: 
          "bg-sky-500/10 border-sky-500/30 text-sky-400 " +
          "[&>svg]:text-sky-400 [&_.notice-title]:text-sky-300",
        warning: 
          "bg-amber-500/10 border-amber-500/30 text-amber-400 " +
          "[&>svg]:text-amber-400 [&_.notice-title]:text-amber-300",
        error: 
          "bg-red-500/10 border-red-500/30 text-red-400 " +
          "[&>svg]:text-red-400 [&_.notice-title]:text-red-300",
      },
    },
    defaultVariants: {
      variant: "info",
    },
  }
);

const iconMap = {
  success: CheckCircle2,
  info: Info,
  warning: AlertTriangle,
  error: XCircle,
};

export interface NoticeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof noticeVariants> {
  title?: string;
  onClose?: () => void;
  showIcon?: boolean;
}

const Notice = React.forwardRef<HTMLDivElement, NoticeProps>(
  ({ className, variant = "info", title, children, onClose, showIcon = true, ...props }, ref) => {
    const Icon = iconMap[variant || "info"];

    return (
      <div
        ref={ref}
        role="alert"
        className={cn(noticeVariants({ variant }), className)}
        {...props}
      >
        {showIcon && <Icon className="h-5 w-5 shrink-0 mt-0.5" />}
        <div className="flex-1 min-w-0">
          {title && (
            <h5 className="notice-title font-semibold text-sm mb-1 leading-none tracking-tight">
              {title}
            </h5>
          )}
          {children && (
            <div className="text-sm opacity-90 leading-relaxed">
              {children}
            </div>
          )}
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="shrink-0 rounded-md p-1 opacity-70 hover:opacity-100 transition-opacity focus:outline-none focus:ring-2 focus:ring-current focus:ring-offset-2 focus:ring-offset-background"
            aria-label="Zavrieť"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>
    );
  }
);
Notice.displayName = "Notice";

export { Notice, noticeVariants };

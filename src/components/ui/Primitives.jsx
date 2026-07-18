import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, Info, XCircle } from "lucide-react";
import { cn } from "../../utils/cn";
import { useApp } from "../../context/AppContext";

export function Card({ children, className, ...props }) {
  return (
    <div
      className={cn(
        "bg-white dark:bg-cardDark rounded-card shadow-soft border border-black/[0.03] dark:border-white/5",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export function Skeleton({ className }) {
  return <div className={cn("skeleton rounded-xl", className)} />;
}

export function EmptyState({ icon: Icon, title, description, action }) {
  return (
    <div className="flex flex-col items-center justify-center text-center py-16 px-6">
      {Icon && (
        <div className="w-16 h-16 rounded-full bg-primary-50 dark:bg-primary-900/30 flex items-center justify-center mb-4">
          <Icon size={28} className="text-primary" strokeWidth={1.8} />
        </div>
      )}
      <h3 className="font-display text-lg font-semibold mb-1">{title}</h3>
      {description && <p className="text-sm text-ink/55 dark:text-white/55 max-w-xs">{description}</p>}
      {action && <div className="mt-5">{action}</div>}
    </div>
  );
}

const TOAST_STYLES = {
  success: { icon: CheckCircle2, cls: "bg-primary text-white" },
  info: { icon: Info, cls: "bg-ink text-white" },
  error: { icon: XCircle, cls: "bg-red-600 text-white" },
};

export function ToastStack() {
  const { toasts } = useApp();
  return (
    <div className="fixed top-4 left-1/2 -translate-x-1/2 z-[100] flex flex-col gap-2 items-center px-4 w-full max-w-sm pointer-events-none">
      <AnimatePresence>
        {toasts.map((t) => {
          const { icon: Icon, cls } = TOAST_STYLES[t.variant] || TOAST_STYLES.success;
          return (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: -16, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.95 }}
              className={cn("flex items-center gap-2 rounded-pill px-4 py-2.5 shadow-lift text-sm font-medium", cls)}
            >
              <Icon size={16} /> {t.message}
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}

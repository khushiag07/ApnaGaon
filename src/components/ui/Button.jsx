import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import { cn } from "../../utils/cn";

const VARIANTS = {
  primary: "bg-primary text-white hover:bg-primary-600 shadow-soft",
  secondary: "bg-primary-50 text-primary-700 hover:bg-primary-100 dark:bg-primary-900/40 dark:text-primary-200",
  accent: "bg-accent text-ink hover:bg-accent-600 shadow-soft",
  ghost: "bg-transparent text-ink hover:bg-primary-50 dark:text-white dark:hover:bg-white/5",
  outline: "bg-transparent border-2 border-primary text-primary hover:bg-primary-50 dark:text-primary-300",
  danger: "bg-red-50 text-red-600 hover:bg-red-100",
};

const SIZES = {
  sm: "text-sm px-4 py-2 gap-1.5",
  md: "text-[15px] px-5 py-3 gap-2",
  lg: "text-base px-6 py-4 gap-2",
  icon: "p-3",
};

/**
 * Primary interactive button with a subtle ripple on click.
 * Use `as="label"` etc. via `Component` prop for non-button semantics if ever needed.
 */
export default function Button({
  children,
  variant = "primary",
  size = "md",
  fullWidth = false,
  icon: Icon,
  iconRight: IconRight,
  className,
  disabled,
  loading,
  ...props
}) {
  const [ripples, setRipples] = useState([]);

  const handleClick = useCallback(
    (e) => {
      const rect = e.currentTarget.getBoundingClientRect();
      const id = Date.now();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      setRipples((r) => [...r, { id, x, y }]);
      setTimeout(() => setRipples((r) => r.filter((rp) => rp.id !== id)), 650);
      props.onClick?.(e);
    },
    [props]
  );

  return (
    <motion.button
      whileTap={{ scale: 0.97 }}
      className={cn(
        "relative overflow-hidden inline-flex items-center justify-center rounded-pill font-semibold transition-colors duration-200 select-none",
        "disabled:opacity-50 disabled:pointer-events-none",
        VARIANTS[variant],
        SIZES[size],
        fullWidth && "w-full",
        className
      )}
      disabled={disabled || loading}
      {...props}
      onClick={handleClick}
    >
      {loading ? (
        <span className="h-4 w-4 rounded-full border-2 border-current border-t-transparent animate-spin" />
      ) : (
        <>
          {Icon && <Icon size={18} strokeWidth={2.2} />}
          {children}
          {IconRight && <IconRight size={18} strokeWidth={2.2} />}
        </>
      )}
      {ripples.map((r) => (
        <span
          key={r.id}
          className="pointer-events-none absolute rounded-full bg-white/50 animate-ripple"
          style={{ left: r.x - 10, top: r.y - 10, width: 20, height: 20 }}
        />
      ))}
    </motion.button>
  );
}
